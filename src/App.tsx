import { FormEvent, useState } from 'react';
import { PlusCircle, Clipboard } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

import Button from './components/Button';
import Header from './components/Header';
import Input from './components/Input';
import { Task, TaskTypes } from './components/Task';

import styles from './App.module.css';

export default function App() {
  const [newContentTask, setNewContentTask] = useState('');
  const [tasks, setTasks] = useState<TaskTypes[]>([]);

  function handleAddTask(event: FormEvent) {
    event.preventDefault();

    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        content: newContentTask,
        completed: false,
      },
    ]);

    setNewContentTask('');
  }

  function handleChangeStatusTask(id: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });

    setTasks(newTasks);
  }

  function handleDeleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleAddTask}>
          <Input
            value={newContentTask}
            onChange={(event) => setNewContentTask(event.target.value)}
          />
          <Button type="submit" icon={<PlusCircle size={20} />}>
            Criar
          </Button>
        </form>

        <div className={styles.content}>
          <header>
            <span>
              Tarefas criadas <strong>{tasks.length}</strong>
            </span>
            <span>
              Concluídas
              <strong>{tasks.filter((task) => task.completed).length}</strong>
            </span>
          </header>

          {tasks.length ? (
            <ul>
              {tasks.map(({ id, ...rest }) => (
                <Task
                  key={id}
                  id={id}
                  changeStatusTask={handleChangeStatusTask}
                  deleteTask={handleDeleteTask}
                  {...rest}
                />
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              <Clipboard size={75} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
