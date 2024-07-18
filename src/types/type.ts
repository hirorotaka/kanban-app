import { UniqueIdentifier } from '@dnd-kit/core';
import { ReactNode } from 'react';

export type NavItem = {
  id: string;
  icon: string;
  label: string;
};

export type Column = {
  id: string;
  title: string;
  navItemId: string;
  bgColor: string;
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
  updateNavItem: (id: string, label: string) => void;
  updateNavIcon: (id: string, icon: string) => void;
};

// コンテキストの型を定義
export type BoardContextValues = {
  column: {
    filterColumns: Column[];
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
    createNewColumn: (columnId: string) => void;
    updateColumn: (id: string, updates: Partial<Column>) => void;
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
  tag: {
    allTags: Tag[];
    setAllTags: React.Dispatch<React.SetStateAction<Tag[]>>;
    tagList: TagList[];
    setTagList: React.Dispatch<React.SetStateAction<TagList[]>>;
  };
};

export type ColumnContainerProps = {
  column: Column;
  filterTasks: Task[] | undefined;
};

export type TaskProps = {
  task: Task;
  newTaskId?: {
    id: string;
    isNewTask: boolean;
  } | null;
  setNewTaskId: React.Dispatch<
    React.SetStateAction<{
      id: string;
      isNewTask: boolean;
    } | null>
  >;
};

export type NavItemProps = {
  id: string;
  icon: JSX.Element;
  label: string;
};

export type ErrorMessageProps = {
  message: string;
};

export type useColumnContainerProps = {
  column: Column;
  updateColumn: (id: string, updates: Partial<Column>) => void;
};

export type EmojiPickerProps = {
  icon: string;
  onChange: (icon: string) => void;
};

export type EmojiSelectEvent = {
  unified: string;
};

export type DropdownMenuProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  deleteColumn: (columnId: string) => void;
  updateColumn: (id: string, updates: Partial<Column>) => void;
  columnId: string;
  handleEditTitleClick: () => void;
};

export type Tag = {
  id: string;
  name: string;
  taskId: string;
  bgColor: string;
  ref?: HTMLDivElement;
};

export type TagList = {
  id: string;
  name: string;
  bgColor: string;
  ref?: React.RefObject<HTMLDivElement>;
};
