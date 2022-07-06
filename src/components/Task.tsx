import { Trash } from 'phosphor-react';
import { LiHTMLAttributes } from 'react';

import Button from './Button';

import styles from './Task.module.css';

export interface TaskTypes {
  id: string;
  content: string;
  completed: boolean;
}

interface TaskProps extends TaskTypes {
  changeStatusTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export function Task({
  id,
  content,
  completed,
  changeStatusTask,
  deleteTask,
  ...rest
}: TaskProps & LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li className={styles.item} {...rest}>
      <input
        className={styles.test}
        type="checkbox"
        checked={completed}
        onChange={() => changeStatusTask(id)}
      />
      <span className={completed ? styles.textCompleted : ''}>{content}</span>
      <Button
        title="Deletar task"
        icon={<Trash size={24} />}
        onClick={() => deleteTask(id)}
      />
    </li>
  );
}
