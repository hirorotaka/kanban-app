import { createContext, useState } from 'react';
import { defaultNavItems } from '../data/navItems';
import { generateId } from '../utils/utils';
import { IoHome } from 'react-icons/io5';
import { ContextProviderProps, ContextValues } from '../types/type';

// 初期値を設定してコンテキストを作成
export const AppContext = createContext<ContextValues | undefined>(undefined);

const ContextProvider = ({ children }: ContextProviderProps) => {
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

  // ボードを削除したときに。削除しましたページへ遷移。
  // レンダリングの関係でuseEffectを使用する。
  const removeNavItem = (navId: string) => {
    setDeleted(true);
    setNavItems((navItems) => navItems.filter((item) => item.id !== navId));
  };

  // 最終的プロバイダーに渡す値を定義
  const contextValues: ContextValues = {
    board: {
      deleted,
      setDeleted,
      navItems,
      createNewNavItem,
      removeNavItem,
      navCheckId,
      setNavCheckId,
    },
  };
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;
