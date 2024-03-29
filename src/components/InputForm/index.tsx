import { InputHTMLAttributes, useEffect } from 'react';
import styles from './style.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string,
  id: string,
  inputSize: "small" | "middle" | "medium" | "large",
  register: any;
  error?: any;
}

export function InputForm({ title, id, register, inputSize, error, ...rest }: InputProps) {
  const { placeholder } = rest;

  return (
    <div
      className={`${inputSize === 'small' ? styles.small : inputSize === 'medium' ? styles.medium : inputSize === 'middle' ? styles.middle : styles.large} ${error && styles.inputError}`}
    >
      <label htmlFor={id}>{title}</label>
      <input
        id={id}
        {...register}
        {...rest}
        placeholder={error ? error : placeholder}
      />
    </ div>
  )
}