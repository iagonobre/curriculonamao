import { useFont } from "../../hooks/font";

export function AcessibilityArea({ children }) {
  const { fontSize } = useFont();

  function handleGetFontSize() {
    if (fontSize === 'normal') {
      return `
        @media (max-width: 1080px) {
          html {
            font-size: 93.75%;
          }
        }
      
        @media (max-width: 720px) {
          html {
            font-size: 87.5%;
          }
        }
      `
    }
    if (fontSize === 'medium') {
      return `
        @media (max-width: 1080px) {
          html {
            font-size: 95.75%;
          }
        }
      
        @media (max-width: 720px) {
          html {
            font-size: 89.5%;
          }
        }
      `
    }
    if (fontSize === 'large') {
      return `
        @media (max-width: 1080px) {
          font-size: 97.75%;
          color: red;
        }
      
        @media (max-width: 720px) {
          html {
            font-size: 91.5%;
          }
        }
      `
    }
  }

  const fontSizeStyle = handleGetFontSize();

  return (
    <>
      {console.log(fontSize)}
      <style jsx global>{fontSizeStyle}</style>
      {children}
    </>
  )
}