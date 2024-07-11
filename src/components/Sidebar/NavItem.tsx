import { IoTrashOutline } from 'react-icons/io5';
import { NavItemContext } from '../../context/NavItemContext';
import { useContext } from 'react';

export const NavItem = ({ id, icon, label }) => {
  const NavItemContextValues = useContext(NavItemContext);
  const { removeNavItem, setNavCheckId, navCheckId } =
    NavItemContextValues?.board || {};

  const handleClick = () => {
    if (setNavCheckId) {
      setNavCheckId(id);
    }
  };

  return (
    <div
      className={`flex items-center justify-between transition-colors duration-200 hover:bg-gray-200 ${
        navCheckId === id
          ? 'bg-blue-200 font-bold text-white hover:bg-blue-200'
          : ''
      }`}
    >
      <div
        onClick={handleClick}
        className="flex items-center space-x-2 rounded-md py-2 text-gray-700"
      >
        {icon}
        <span>{label}</span>
      </div>
      {navCheckId === id && (
        <button
          onClick={removeNavItem && (() => removeNavItem(id))}
          className={`rounded px-1 py-2 text-black transition duration-200 ease-in-out hover:text-red-500`}
        >
          <IoTrashOutline size={20} />
        </button>
      )}
    </div>
  );
};
