import { EventHandler, FormEvent, useState, DragEvent } from 'react';
import { PlusCircle, Clipboard } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

import Button from './components/Button';
import Header from './components/Header';
import Input from './components/Input';
import { Task, TaskTypes } from './components/Task';

import styles from './App.module.css';
import { useLocalStorage } from './lib/localStorage';

export default function App() {
  const [tasks, setTasks] = useLocalStorage<TaskTypes[]>('TODO_TASKS', []);
  const [newContentTask, setNewContentTask] = useState('');
  const [dragItem, setDragItem] = useState<TaskTypes>();

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

  function handleDragStart(itemDragIndex: number) {
    setDragItem(tasks[itemDragIndex]);
  }

  function handleDragOver(itemDragOverIndex: number) {
    const draggedOverItem = tasks[itemDragOverIndex];

    // if the item is dragged over itself, ignore
    if (dragItem?.id === draggedOverItem.id) return;

    // filter out the currently dragged item
    const newItems = tasks.filter((item) => item.id !== dragItem?.id);

    // add the dragged item after the dragged over item
    newItems.splice(tasks.indexOf(draggedOverItem), 0, dragItem!);

    setTasks(newItems);
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
          <Button
            type="submit"
            icon={<PlusCircle size={24} />}
            disabled={!newContentTask}
          >
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
              {tasks.map(({ id, ...rest }, index) => (
                <Task
                  key={id}
                  id={id}
                  changeStatusTask={handleChangeStatusTask}
                  deleteTask={handleDeleteTask}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(event) => {
                    event.preventDefault();
                    handleDragOver(index);
                  }}
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
