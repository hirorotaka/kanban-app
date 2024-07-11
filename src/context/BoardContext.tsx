import { createContext, useContext, useMemo, useState } from 'react';
import {
  BoardContextValues,
  Column,
  ContextProviderProps,
  Task,
} from '../types/type';
import { defaultColumns, defaultTasks } from '../data/kanbanData';
import { generateId } from '../utils/utils';
import { NavItemContext } from './NavItemContext';
import { UniqueIdentifier } from '@dnd-kit/core';

// 初期値を設定してコンテキストを作成
export const BoardContext = createContext<BoardContextValues | undefined>(
  undefined
);

export const BoardProvider = ({ children }: ContextProviderProps) => {
  const NavItemContextValues = useContext(NavItemContext);
  const { navCheckId } = NavItemContextValues?.board || {};

  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const columnsIds: (UniqueIdentifier | { id: UniqueIdentifier })[] = useMemo(
    () => columns.map((col) => col.id),
    [columns]
  );

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const tasksIds: string[] = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  //カラムのCRUD ここから
  const createNewColumn = (boarId: string) => {
    const newColumn: Column = {
      id: `${generateId()}-${columns.length + 1}`,
      title: `新しいカラム ${columns.length + 1}`,
      navItemId: boarId,
    };
    setColumns([...columns, newColumn]);
  };

  const updateColumn = (id: string, title: string) => {
    const newColumns: Column[] = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  };

  const deleteColumn = (id: string) => {
    const newColumns: Column[] = columns.filter((col) => col.id !== id);
    setColumns(newColumns);
  };
  // カラムのCRUD ここまで

  // タスクのCRUD ここから
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
    const newTasks: Task[] = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id: string, content: string) => {
    const newTasks: Task[] = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  };
  // タスクのCRUD ここまで

  // 絞り込みされたカラムを取得
  const filterColumns = useMemo(
    () => columns.filter((col) => col.navItemId === navCheckId),
    [columns, navCheckId]
  );

  // 最終的プロバイダーに渡す値を定義
  const contextValues: BoardContextValues = {
    column: {
      filterColumns,
      setColumns,
      createNewColumn,
      updateColumn,
      deleteColumn,
      columnsIds,
    },
    task: {
      tasks,
      setTasks,
      createTask,
      deleteTask,
      updateTask,
      tasksIds,
    },
  };

  return (
    <BoardContext.Provider value={contextValues}>
      {children}
    </BoardContext.Provider>
  );
};
