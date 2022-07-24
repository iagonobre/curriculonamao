import {
  createContext, ReactNode, useEffect, useState,
} from 'react';

type ThemeContextType = {
  theme: 'dark' | 'light';
  changeTheme: () => void;
}

type ThemeType = 'dark' | 'light';

type ThemeContextProvider = {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider({ children }: ThemeContextProvider) {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    async function getUpdateTheme() {
      const theme = localStorage.getItem("theme")

      if (!theme) {
        return setTheme('light')
      }

      setTheme(theme as ThemeType);
    }
    getUpdateTheme()
  }, []);

  function changeTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    localStorage.setItem("theme", theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{
      changeTheme,
      theme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
