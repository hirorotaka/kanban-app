import { Link, useParams } from 'react-router-dom';
import { PlusIcon } from '../UI/icons/PlusIcon';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { useContext, useEffect } from 'react';
import { NavItemContext } from '../../context/NavItemContext';

export const Sidebar = () => {
  const { navItems, setNavCheckId, createNewNavItem } =
    useContext(NavItemContext) || {};
  const { boardId } = useParams();

  useEffect(() => {
    if (!navItems || !setNavCheckId) return;
    const selectedItem = navItems.find((item) => item.id === boardId);
    if (selectedItem) {
      setNavCheckId(selectedItem.id);
    } else {
      setNavCheckId('');
    }
  }, [boardId, navItems, setNavCheckId]);

  return (
    <div className=" flex h-screen  min-w-[250px]  max-w-[250px] flex-col border-r bg-gray-100 p-4">
      <Link to="/" className="wave-effect">
        <Logo />
      </Link>
      <div className="grow space-y-1">
        {navItems?.map((item, index) => (
          <Link to={`board/${item.id}`} key={index}>
            <NavItem icon={item.icon} label={item.label} id={item.id} />
          </Link>
        ))}
        <button
          onClick={createNewNavItem}
          className="wave-effect mt-8 flex items-center justify-center space-x-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-blue-500"
        >
          <PlusIcon />
          <span>ボードを追加</span>
        </button>
      </div>
    </div>
  );
};
