import { ReactNode, SelectHTMLAttributes } from 'react';
import styles from './style.module.scss';


interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string,
  id: string,
  children: ReactNode
}

export function SelectForm({ title, id, children, ...rest }: SelectProps) {
  return (
    <div className={styles.select}>
      <label htmlFor={id}>{title}</label>
      <select id={id} {...rest}>
        {children}
      </select>
    </div>
  )
}