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
  endDate?: Date | null;
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
  updateNavItem: (id: string, updates: Partial<NavItem>) => void;
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
    updateTask: (id: string, updates: Partial<Task>) => void;
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
};

export type NavItemProps = {
  id: string;
  icon: string;
  label: string;
};

export type ErrorMessageProps = {
  message: string;
};

export type useColumnTitleEditProps = {
  column: Column;
  updateColumn: (id: string, updates: Partial<Column>) => void;
};

export type useTaskContentEditProps = {
  task: Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
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
  tagListId: string;
};

export type TagList = {
  id: string;
  name: string;
  bgColor: string;
};

export type TagInputProps = {
  filteredTags: Tag[] | undefined;
  taskId: string;
  isTagEdit: boolean;
  setIsTagEdit: (value: boolean) => void;
};

export type TagInputCloseProps = {
  closePopover: () => void;
};

export type TagInputFieldProps = {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type TagInputListProps = {
  tags: Tag[];
  handleTagDelete: (id: string) => void;
};

export type TagInputSelectListProps = {
  tagList: TagList[];
  isTagSelected: (tag: TagList) => boolean;
  handleTagListClick: (tag: TagList) => void;
  handleTagEdit: (id: string) => void;
  popoverId: string | null;
  hoveredTagId: string | null;
  setHoveredTagId: React.Dispatch<React.SetStateAction<string | null>>;
  tagRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
};

export type TagEditorProps = {
  editingTag: TagList;
  handleEditSubmit: (e: React.FormEvent) => void;
  handleColorChange: (value: string) => void;
  handleTagListDelete: (id: string) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagEditorCancel: () => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

export type TagShowProps = {
  filteredTags: Tag[];
  setIsTagEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
