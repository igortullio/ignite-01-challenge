import { InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

export default function Input({
  type = 'text',
  placeholder = 'Adicione uma nova tarefa',
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      {...rest}
    />
  );
}
