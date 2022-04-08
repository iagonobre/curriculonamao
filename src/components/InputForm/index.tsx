import { InputHTMLAttributes } from 'react';
import styles from './style.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string,
  id: string,
  inputSize: "small" | "middle" | "medium" | "large"
}

export function InputForm({ title, id, inputSize, ...rest }: InputProps) {
  return (
    <div
      className={inputSize === 'small' ? styles.small : inputSize === 'medium' ? styles.medium : inputSize === 'middle' ? styles.middle : styles.large}
    >
      <label htmlFor={id}>{title}</label>
      <input id={id} {...rest} />
    </ div>
  )
}