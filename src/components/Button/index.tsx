import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './style.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType: "outlineWhite" | "whiteButton";
  children: ReactNode;
}

export function Button({ styleType, children }: ButtonProps) {
  return (
    styleType === "outlineWhite" ?
      (
        <button className={styles.outlineWhite}>
          {children}
        </button>
      ) : (
        <button className={styles.whiteButton}>
          {children}
        </button>
      )
  )
}