import {
  createContext, ReactNode, useEffect, useState,
} from 'react';


type FontContextType = {
  fontSize: 'normal' | 'medium' | 'large',
  increaseFont: () => void;
  decreaseFont: () => void;
  turnNormalFont: () => void;
}

type FontProps = 'normal' | 'medium' | 'large'
type FontPropsArray = ['normal', 'medium', 'large']

type FontContextProviderProps = {
  children: ReactNode;
}

export const FontContext = createContext({} as FontContextType);

export function FontContextProvider({ children }: FontContextProviderProps) {
  const [fontSize, setFontSize] = useState<FontProps>('normal');
  const arrayRef: FontPropsArray = ['normal', 'medium', 'large']

  useEffect(() => {
    async function getUpdateFont() {
      const fontSize = localStorage.getItem("fontSize")

      if (!fontSize) {
        return setFontSize('normal')
      }

      setFontSize(fontSize as FontProps);
      if (fontSize === 'normal') {
        document.getElementById("html").style.fontSize = '95.75%'
      } else if (fontSize === 'medium') {
        document.getElementById("html").style.fontSize = '110%'
      } else if (fontSize === 'large') {
        document.getElementById("html").style.fontSize = '120%'
      }
    }
    getUpdateFont()
  }, []);

  useEffect(() => {
    if (fontSize === 'normal') {
      document.getElementById("html").style.fontSize = '95.75%'
    } else if (fontSize === 'medium') {
      document.getElementById("html").style.fontSize = '110%'
    } else if (fontSize === 'large') {
      document.getElementById("html").style.fontSize = '120%'
    }
  }, [fontSize])

  function increaseFont() {
    const currentPosition = arrayRef.indexOf(fontSize);

    if (currentPosition < 2) {
      setFontSize(arrayRef[currentPosition + 1])
      localStorage.setItem("fontSize", arrayRef[currentPosition + 1])
    }

  }

  function decreaseFont() {
    const currentPosition = arrayRef.indexOf(fontSize);

    if (currentPosition > 0) {
      setFontSize(arrayRef[currentPosition - 1])
      localStorage.setItem("fontSize", arrayRef[currentPosition - 1])
    }

  }

  function turnNormalFont() {
    setFontSize('normal')
    localStorage.setItem("fontSize", 'normal')
    document.getElementById("html").style.fontSize = '95.75%'
  }

  return (
    <FontContext.Provider value={{
      fontSize,
      increaseFont,
      decreaseFont,
      turnNormalFont
    }}>
      {children}
    </FontContext.Provider>
  );
}
