import { useMemo, useState } from 'react';
import { Task } from '../types/type';
import { defaultTasks } from '../data/kanbanData';
import { generateId } from '../utils/utils';

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  function createTask(columnId: string) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: '新しいタスク',
    };

    setTasks([...tasks, newTask]);
    return newTask;
  }

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id: string, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  };

  return { tasks, setTasks, createTask, deleteTask, updateTask, tasksIds };
};
