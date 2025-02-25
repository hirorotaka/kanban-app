import { createContext, useContext, useMemo, useState } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { NavItemContext } from './NavItemContext';
import { generateId } from '../utils/utils';
import {
  defaultColumns,
  defaultTasks,
  initialTagList,
} from '../data/kanbanData';
import {
  BoardContextValues,
  Column,
  ContextProviderProps,
  Tag,
  TagList,
  Task,
} from '../types/type';

// 初期値を設定してコンテキストを作成
export const BoardContext = createContext<BoardContextValues | undefined>(
  undefined
);

export const BoardProvider = ({ children }: ContextProviderProps) => {
  const { navCheckId } = useContext(NavItemContext) || {};

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
      title: `新しいグループ ${columns.length + 1}`,
      navItemId: boarId,
      bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    };
    setColumns([...columns, newColumn]);
  };

  const updateColumn = (id: string, updates: Partial<Column>) => {
    const newColumns: Column[] = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, ...updates };
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
      content: '無題',
      endDate: null,
    };

    setTasks([...tasks, newTask]);
    return newTask;
  }

  const deleteTask = (id: string) => {
    const newTasks: Task[] = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const newTasks: Task[] = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, ...updates };
    });

    setTasks(newTasks);
  };

  // タスクのCRUD ここまで

  // タグとタグリストの管理
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [tagList, setTagList] = useState<TagList[]>(initialTagList);
  // タグ

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
    tag: {
      allTags,
      setAllTags,
      tagList,
      setTagList,
    },
  };

  return (
    <BoardContext.Provider value={contextValues}>
      {children}
    </BoardContext.Provider>
  );
};
