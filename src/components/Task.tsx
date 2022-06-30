export interface TaskTypes {
  id: string;
  content: string;
  completed: boolean;
}

interface TaskProps extends TaskTypes {
  changeStatusTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

export function Task({
  id,
  content,
  completed,
  changeStatusTask,
  deleteTask,
}: TaskProps) {
  return (
    <li className={styles.item}>
      <input
        className={styles.test}
        type="checkbox"
        checked={completed}
        onChange={() => changeStatusTask(id)}
      />
      <span className={styles.text}>{content}</span>
      <button title="Deletar comentário" onClick={() => deleteTask(id)}>
        <Trash size={24} />
      </button>
    </li>
  );
}
