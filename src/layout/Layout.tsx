import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';

export const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
