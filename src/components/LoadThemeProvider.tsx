import { ReactNode } from "react";
import { useTheme } from "../hooks/theme";

export function LoadThemeProvider({ children }) {
  const { theme } = useTheme();

  return (
    <div data-theme={theme} id="teste" data-font="normal">
      {children}
    </div>
  )
}