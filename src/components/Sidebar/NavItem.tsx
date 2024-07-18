import { IoTrashOutline } from 'react-icons/io5';
import { NavItemContext } from '../../context/NavItemContext';
import { useContext } from 'react';
import { NavItemProps } from '../../types/type';

export const NavItem = ({ id, icon, label }: NavItemProps) => {
  const { removeNavItem, setNavCheckId, navCheckId } =
    useContext(NavItemContext) || {};

  const handleClick = () => {
    if (setNavCheckId) {
      setNavCheckId(id);
    }
  };

  return (
    <div
      className={`wave-effect flex items-center justify-between rounded-md transition duration-100 ease-in-out ${
        navCheckId === id
          ? 'bg-blue-400 font-bold text-white'
          : 'text-gray-700 hover:bg-gray-200'
      }`}
    >
      <div
        onClick={handleClick}
        className="flex grow items-center space-x-2 overflow-hidden rounded-md p-2"
      >
        <span className="shrink-0">{icon}</span>
        <span className="grow truncate">{label}</span>
      </div>
      <div className="w-7 shrink-0">
        {navCheckId === id && (
          <button
            onClick={removeNavItem && (() => removeNavItem(id))}
            className="rounded px-1 py-2 text-white transition duration-200 ease-in-out hover:text-red-500"
          >
            <IoTrashOutline size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
