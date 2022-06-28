import { PlusCircle, Clipboard } from 'phosphor-react';

import Button from './components/Button';
import Header from './components/Header';
import Input from './components/Input';

import styles from './App.module.css';

export default function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <form className={styles.form}>
          <Input />
          <Button icon={<PlusCircle size={20} />}>Criar</Button>
        </form>

        <div className={styles.content}>
          <header>
            <span>
              Tarefas criadas <strong>0</strong>
            </span>
            <span>
              Concluídas <strong>0</strong>
            </span>
          </header>

          <div className={styles.tasks}>
            <div className={styles.empty}>
              <Clipboard size={75} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
