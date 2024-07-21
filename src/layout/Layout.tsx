import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { useState } from 'react';

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div className="flex h-screen bg-gray-800">
        <div className="flex flex-col items-center justify-center px-2 py-6">
          {isOpen ? (
            <GoSidebarExpand
              size={36}
              onClick={toggleSidebar}
              className="cursor-pointer rounded-md text-white transition-colors duration-300 hover:text-gray-400"
            />
          ) : (
            <GoSidebarCollapse
              size={36}
              onClick={toggleSidebar}
              className="cursor-pointer rounded-md text-white transition-colors duration-300 hover:text-gray-400"
            />
          )}
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isOpen ? 'w-64' : 'w-0'
          } bg-white shadow-lg`}
        >
          <Sidebar />
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
