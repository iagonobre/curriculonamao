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

    }
    getUpdateFont()
  }, []);

  function increaseFont() {
    const currentPosition = arrayRef.indexOf(fontSize);

    if (currentPosition < 2) {
      setFontSize(arrayRef[currentPosition + 1])

      localStorage.setItem("fontSize", fontSize)
    }

    console.log(fontSize)
  }

  function decreaseFont() {
    const currentPosition = arrayRef.indexOf(fontSize);

    if (currentPosition > 0) {
      setFontSize(arrayRef[currentPosition - 1])
      localStorage.setItem("fontSize", fontSize)

      console.log(fontSize)
    }
  }

  function turnNormalFont() {
    setFontSize('normal')

    localStorage.setItem("fontSize", fontSize)
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
