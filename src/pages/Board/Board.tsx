import { useContext } from 'react';
import { Header } from '../../components/Header/Header';
import { KanbanBoard } from '../../components/kanban/KanbanBoard';
import { AppContext } from '../../context';
import { NotFound } from '../NotFound';

export const Board = () => {
  const contextValues = useContext(AppContext);
  const { navItems, navCheckId } = contextValues?.board || {};

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
