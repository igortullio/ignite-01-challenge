import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
  icon?: React.ReactNode;
}

export default function Button({ children, icon, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} {...rest}>
      {children}
      {icon}
    </button>
  );
}
