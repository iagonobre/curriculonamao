import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './style.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: "outline";
  children: ReactNode;
}

export function Button({ styleType, children, ...props }: ButtonProps) {
  return (
    styleType === "outline" ?
      (
        <button className={styles.outline} {...props}>
          {children}
        </button>
      ) : (
        <button className={styles.buttonStyle} {...props}>
          {children}
        </button>
      )
  )
}