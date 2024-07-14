import { useContext, useEffect, useState } from 'react';
import { NavItemContext } from '../context/NavItemContext';

export const useHeader = () => {
  const { navItems, navCheckId, updateNavItem } =
    useContext(NavItemContext) || {};
  const selectedItem = navItems?.find((item) => item.id === navCheckId);

  const [editValue, setEditValue] = useState(selectedItem?.label || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditValue(selectedItem?.label || '');
  }, [selectedItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleHeaderChange = () => {
    if (!selectedItem || !updateNavItem) return;
    if (editValue.trim() === '') {
      setEditValue('無題');
      updateNavItem(selectedItem.id, '無題');
    } else {
      setEditValue(editValue);
      updateNavItem(selectedItem.id, editValue);
    }
    setIsEditing(false);
  };

  const handleOnClick = () => {
    setIsEditing(true);
  };

  return {
    selectedItem,
    isEditing,
    handleChange,
    handleHeaderChange,
    handleOnClick,
    editValue,
  };
};
