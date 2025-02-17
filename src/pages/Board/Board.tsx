import { useContext } from 'react';
import { NavItemContext } from '../../context/NavItemContext';
import { Header } from '../../components/Header/Header';
import { KanbanBoard } from '../../components/kanban/KanbanBoard';
import { NotFound } from '../NotFound/NotFound';

export const Board = () => {
  const { navItems, navCheckId } = useContext(NavItemContext) || {};

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
