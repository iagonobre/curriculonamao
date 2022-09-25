import { InputHTMLAttributes, useState } from 'react';
import { FiLock, FiMail, FiUser } from 'react-icons/fi'

import styles from './style.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string,
  register: any;
  error?: any;
}

export function Input({ type, onFocus, id, register, error, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  const { placeholder } = rest;

  return (
    <div className={`${focused ? `${styles.inputStyle} ${styles.focused}` : styles.inputStyle} ${error && styles.inputError}`}>
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={type}
        id={id}
        {...register}
        {...rest}
        placeholder={error ? error : placeholder}
      />
      {type === "email" ? (
        <FiMail size={22} />
      ) : (
        type === "text" ? (
          <FiUser size={22} />
        ) : (
          <FiLock size={22} />
        )
      )}
    </div>
  )
}