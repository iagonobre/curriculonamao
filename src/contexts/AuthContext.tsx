import {
  createContext, ReactNode, useEffect, useState,
} from 'react';

import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import api from '../services/api';

type User = {
  id: number;
  email: string;
  name: string;
  refreshToken: string;
  admin?: boolean;
  photoURL: string;
}

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUpdateFont() {
      const { '@cnm:refreshToken': refreshToken } = parseCookies();

      if (refreshToken) {
        await refresh()
      }

      if (!refreshToken) {
        logout()
      }
    }
    getUpdateFont()
  }, []);

  async function refresh() {
    const { '@cnm:refreshToken': refreshToken } = parseCookies();
    const { '@cnm:email': email } = parseCookies();

    if (!email) {
      return logout()
    }

    const response = await api.post('/user/refresh', {
      email,
      refreshToken
    })

    const userResponse = await api.get('/user', {
      headers: { Authorization: `Bearer ${response.data.token}` }
    })

    setUser(userResponse.data)

    setCookie(undefined, '@cnm:token', response.data.token, {
      maxAge: 60 * 60 * 24 * 30, //30 days
      path: '/'
    })

    setCookie(undefined, '@cnm:refreshToken', response.data.refreshToken, {
      maxAge: 60 * 60 * 24 * 30, //30 days
      path: '/'
    })
  }

  async function login(email: string, password: string) {
    const response = await api.post('/login', {
      username: email,
      password,
    })

    setUser(response.data.user)

    setCookie(undefined, '@cnm:token', response.data.token, {
      maxAge: 60 * 60 * 24 * 30, //30 days
      path: '/'
    })

    setCookie(undefined, '@cnm:refreshToken', response.data.refreshToken, {
      maxAge: 60 * 60 * 24 * 30, //30 days
      path: '/'
    })

    setCookie(undefined, '@cnm:email', response.data.user.email, {
      path: '/'
    })

    Router.push('/app')
  }

  async function logout() {
    setUser(null);
    destroyCookie(undefined, '@cnm:email');
    destroyCookie(undefined, '@cnm:token');
    destroyCookie(undefined, '@cnm:refreshToken');

    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{
      logout,
      user,
      login,
      refresh
    }}>
      {children}
    </AuthContext.Provider>
  );
}
