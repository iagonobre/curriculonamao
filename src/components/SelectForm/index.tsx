import { ReactNode, SelectHTMLAttributes } from 'react';
import styles from './style.module.scss';


interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string,
  id: string,
  children: ReactNode,
  register: any
}

export function SelectForm({ title, id, register, children, ...rest }: SelectProps) {
  return (
    <div className={styles.select}>
      <label htmlFor={id}>{title}</label>
      <select id={id} {...rest} {...register}>
        {children}
      </select>
    </div>
  )
}