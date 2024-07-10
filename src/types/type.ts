import { ReactNode } from 'react';

export type NavItem = {
  id: string;
  icon: JSX.Element;
  label: string;
};

export type ContextProviderProps = {
  children: ReactNode;
};

// コンテキストの型を定義
export type ContextValues = {
  board: {
    deleted: boolean;
    setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    navItems: NavItem[];
    createNewNavItem: () => void;
    removeNavItem: (navId: string) => void;
    navCheckId: string;
    setNavCheckId: React.Dispatch<React.SetStateAction<string>>;
  };
};
