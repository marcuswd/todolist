import { ClipboardText } from 'phosphor-react';
import styles from './TasksEmpty.module.css';

export function TasksEmpty() {
  return (
    <>
      <div className={styles.empty}>
        <ClipboardText className={styles.iconEmpty} size={56} weight="light" />
        <p><strong>Você não tem tarefas cadastradas</strong></p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div> 
    </>
  )
}