import { Trash } from 'phosphor-react';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  icon?: React.ReactNode;
}

export default function Button({ children, icon }: ButtonProps) {
  return (
    <button className={styles.button}>
      {children}
      {icon}
    </button>
  );
}
