import { ReactNode } from "react";
import { useTheme } from "../hooks/theme";

export function LoadThemeProvider({ children }) {
  const { theme } = useTheme();

  return (
    <div className="teste" data-theme={theme} >
      {children}
    </div>
  )
}