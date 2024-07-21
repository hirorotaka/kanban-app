import { useContext, useEffect, useState } from 'react';
import { NavItemContext } from '../context/NavItemContext';

export const useHeader = () => {
  const { navItems, navCheckId, updateNavItem } =
    useContext(NavItemContext) || {};

  if (!navItems || !navCheckId || !updateNavItem) {
    throw new Error('navItems or navCheckId or updateNavItem is not defined');
  }

  const selectedItem = navItems?.find((item) => item.id === navCheckId);

  const [icon, setIcon] = useState('');

  const onIconChange = (icon: string) => {
    if (!selectedItem || !updateNavItem) return;
    updateNavItem(selectedItem.id, { icon: icon });
  };

  useEffect(() => {
    if (!selectedItem) return;
    setIcon(selectedItem?.icon);
  }, [selectedItem]);

  return {
    selectedItem,
    onIconChange,
    icon,
  };
};
