import { useContext } from 'react';
import { NavItemContext } from '../../context/NavItemContext';

export const Header = () => {
  const contextValues = useContext(NavItemContext);
  const { navItems, navCheckId } = contextValues?.board || {};
  const selectedItem = navItems?.find((item) => item.id === navCheckId);

  if (!selectedItem) {
    return null;
  }
  return (
    <header className="bg-white p-6 text-gray-800 shadow">
      <div className="flex items-center">
        <span className="mr-2 text-2xl text-blue-500">{selectedItem.icon}</span>
        <h1 className="text-3xl font-bold">{selectedItem.label}</h1>
      </div>
    </header>
  );
};
