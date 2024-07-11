import { useMemo, useState } from 'react';
import { Id, Task } from '../types/type';
import { defaultTasks } from '../data/kanbanData';

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: '新しいタスク',
    };

    setTasks([...tasks, newTask]);
    return newTask;
  }

  const deleteTask = (id: Id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  };

  return { tasks, setTasks, createTask, deleteTask, updateTask, tasksIds };
};
