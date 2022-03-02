import { InputHTMLAttributes, useState } from 'react';
import { FiLock, FiMail, FiUser } from 'react-icons/fi'

import styles from './style.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}


export function Input({ type, onFocus, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`${focused ? `${styles.inputStyle} ${styles.focused}` : styles.inputStyle}`}>
      <input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} type={type} {...props} />
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