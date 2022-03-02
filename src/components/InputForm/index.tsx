import { InputHTMLAttributes } from 'react';
import styles from './style.module.scss';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string,
  id: string,
}

export function InputForm({ title, id, ...rest }: InputProps) {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{title}</label>
      <input id={id} {...rest} />
    </div>
  )
}