import styles from './Task.module.css';
import { Circle, CheckCircle, Trash } from 'phosphor-react';

interface TaskInfo {
  taskId: String;
  task: String;
  completed: Boolean;
  onRemoveTask: (task: String) => void;
  onCompleteTask: (key: String) => void;
}

export function Task({
  taskId,
  task,
  completed,
  onCompleteTask,
  onRemoveTask,
}: TaskInfo) {
  const completedTask = !completed ? '' : `${styles.completed}`;
  const classesTask = `${styles.task} ${completedTask}`;

  function handleDeleteTask() {
    onRemoveTask(taskId);
  }

  function handleCompleteTask() {
    onCompleteTask(taskId);
  }
  return (
    <div className={classesTask}>
      {completed ? (
        <button onClick={handleCompleteTask} className={styles.check}>
          <CheckCircle weight='fill' />
        </button>
      ) : (
        <button onClick={handleCompleteTask} className={styles.check}>
          <Circle weight='duotone' />
        </button>
      )}

      <p>{task}</p>
      <button onClick={handleDeleteTask} className={styles.delete}>
        <Trash />
      </button>
    </div>
  );
}
