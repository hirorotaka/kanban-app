import { createContext, useState } from 'react';
import { defaultNavItems } from '../data/navItems';
import { generateId } from '../utils/utils';
import { IoHome } from 'react-icons/io5';
import {
  ContextProviderProps,
  NavItem,
  NavItemContextValues,
} from '../types/type';

// 初期値を設定してコンテキストを作成
export const NavItemContext = createContext<NavItemContextValues | undefined>(
  undefined
);

const NavItemProvider = ({ children }: ContextProviderProps) => {
  const [navItems, setNavItems] = useState(defaultNavItems);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [navCheckId, setNavCheckId] = useState('');

  const createNewNavItem = () => {
    const newNavItem = {
      id: generateId(),
      icon: <IoHome />,
      label: 'default',
    };
    setNavItems([...navItems, newNavItem]);
  };

  const updateNavItem = (id: string, label: string) => {
    const newNavItems: NavItem[] = navItems.map((navItem) => {
      if (navItem.id !== id) return navItem;
      return { ...navItem, label };
    });

    setNavItems(newNavItems);
  };

  // ボードを削除したときに。削除しましたページへ遷移。
  // レンダリングの関係でuseEffectを使用する。
  const removeNavItem = (navId: string) => {
    setDeleted(true);
    setNavItems((navItems) => navItems.filter((item) => item.id !== navId));
  };

  // 最終的プロバイダーに渡す値を定義
  const contextValues: NavItemContextValues = {
    deleted,
    setDeleted,
    navItems,
    createNewNavItem,
    removeNavItem,
    navCheckId,
    setNavCheckId,
    updateNavItem,
  };
  return (
    <NavItemContext.Provider value={contextValues}>
      {children}
    </NavItemContext.Provider>
  );
};

export default NavItemProvider;
