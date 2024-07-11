import { UniqueIdentifier } from '@dnd-kit/core';
import { ReactNode } from 'react';

export type NavItem = {
  id: string;
  icon: JSX.Element;
  label: string;
};

export type Column = {
  id: string;
  title: string;
  navItemId: string;
};

export type Task = {
  id: string;
  columnId: string;
  content: string;
};

export type ContextProviderProps = {
  children: ReactNode;
};

// コンテキストの型を定義
export type NavItemContextValues = {
  deleted: boolean;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavItem[];
  createNewNavItem: () => void;
  removeNavItem: (navId: string) => void;
  navCheckId: string;
  setNavCheckId: React.Dispatch<React.SetStateAction<string>>;
};

// コンテキストの型を定義
export type BoardContextValues = {
  column: {
    filterColumns: Column[];
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
    createNewColumn: (columnId: string) => void;
    updateColumn: (id: string, title: string) => void;
    deleteColumn: (id: string) => void;
    columnsIds: (UniqueIdentifier | { id: UniqueIdentifier })[];
  };
  task: {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    createTask: (columnId: string) => Task;
    deleteTask: (id: string) => void;
    updateTask: (id: string, content: string) => void;
    tasksIds: (UniqueIdentifier | { id: UniqueIdentifier })[];
  };
};

export type ColumnContainerProps = {
  column: Column;
  filterTasks: Task[] | undefined;
};

export type TaskProps = {
  task: Task;
  newTaskId?: string | null;
};

export type NavItemProps = {
  id: string;
  icon: JSX.Element;
  label: string;
};
