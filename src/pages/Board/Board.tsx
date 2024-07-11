import { useContext } from 'react';
import { Header } from '../../components/Header/Header';
import { KanbanBoard } from '../../components/kanban/KanbanBoard';
import { NavItemContext } from '../../context/NavItemContext';
import { NotFound } from '../NotFound';

export const Board = () => {
  const NavItemContextValues = useContext(NavItemContext);
  const { navItems, navCheckId } = NavItemContextValues?.board || {};

  const selectedItem = navItems?.find((item) => item.id === navCheckId);

  return selectedItem ? (
    <div>
      <Header />
      <KanbanBoard />
    </div>
  ) : (
    <NotFound />
  );
};
