import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import api from '../services/api';

type User = {
  user: {
    id: number;
    email: string;
    name: string;
    refreshToken: string;
    admin?: boolean;
  };
  token: string;
  refreshToken: string;
}

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  refresh: (refreshToken: string) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUpdateFont() {
      const user = localStorage.getItem("user")

      if (user) {
        setUser(JSON.parse(user));
      }
    }
    getUpdateFont()
  }, []);

  async function refresh(refreshToken: string) {
    try {
      const response = await api.post('/user/refresh', {
        email: user.user.email,
        refreshToken,
      })

      const updatedUser = await api.get('/user', {
        headers: { Authorization: `Bearer ${response.data.token}` }
      })

      setUser(updatedUser.data)
      localStorage.setItem("user", JSON.stringify(user))
    } catch (err) {
      //tratar erro
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await api.post('/login', {
        username: email,
        password,
      })

      setUser(response.data)
      localStorage.setItem("user", JSON.stringify(user))
    } catch (err) {
      //tratar erro
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      refresh
    }}>
      {children}
    </AuthContext.Provider>
  );
}
