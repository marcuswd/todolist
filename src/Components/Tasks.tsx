import { FormEvent, useState, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Task } from './Task';
import { TasksEmpty } from './TasksEmpty';

import styles from './Tasks.module.css';
import { PlusCircle } from 'phosphor-react';

interface allTasks {
  id: String;
  title: String;
  isComplete: Boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<allTasks[]>([]);
  const [newTask, setNewTask] = useState('');
  const [taskCompleted, setTaskCompleted] = useState<Number>(0);

  function onAddTask(event: FormEvent) {
    event.preventDefault();

    const newTaskValue: allTasks = {
      id: uuidv4(),
      title: newTask,
      isComplete: false,
    };

    setTasks([...tasks, newTaskValue]);
    setNewTask('');
  }

  function handleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    let newTask = event.target.value;
    setNewTask(newTask);
  }

  function handleRemoveTask(taskToDelete: String) {
    const TasksWithoutDeleted = tasks!.filter((task) => {
      if (task.id != taskToDelete) {
        return task;
      }
    });

    setTasks(TasksWithoutDeleted);
    countCompletedTasks();
  }

  function countCompletedTasks() {
    let completedTasks = tasks.filter((task) => {
      if (task.isComplete) return true;
    }).length;
    setTaskCompleted(completedTasks);
  }

  function handleCompleteTask(taskToComplete: String) {
    const TaskWithCompleted = tasks.filter((task) => {
      if (task.id == taskToComplete)
        return (task.isComplete = !task.isComplete);
      return task;
    });

    countCompletedTasks();
    setTasks(TaskWithCompleted);
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={onAddTask} className={styles.addTask}>
          <input
            type='text'
            value={newTask}
            onChange={handleTaskChange}
            placeholder='Adicione uma nova tarefa'
            required
          />
          <button type='submit'>
            Criar <PlusCircle size={20} />
          </button>
        </form>
      </div>
      <div className={styles.containerListaTasks}>
        <div className='container'>
          <div className={styles.headerTasks}>
            <p className={styles.TarefasCriadas}>
              Tarefas Criadas <span>{tasks!.length}</span>
            </p>
            <p className={styles.TarefasConcluidas}>
              Concluídas <span>{` ${taskCompleted} de ${tasks!.length}`}</span>
            </p>
          </div>

          <div className='listaTasks'>
            {tasks.length > 0
              ? tasks.map((task) => {
                  return (
                    <Task
                      key={task.id}
                      task={task.title}
                      taskId={task.id}
                      completed={task.isComplete}
                      onCompleteTask={handleCompleteTask}
                      onRemoveTask={handleRemoveTask}
                    />
                  );
                })
              : ''}
            {tasks.length < 1 ? <TasksEmpty /> : ''}
          </div>
        </div>
      </div>
    </>
  );
}
