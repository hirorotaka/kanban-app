import { useMemo, useState } from 'react';
import { Column, Id } from '../types/type';
import { defaultColumns } from '../data/kanbanData';
import { generateId } from '../utils/utils';

export const useColumn = (boardId: Id) => {
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const createNewColumn = (boarId: Id) => {
    const newColumn = {
      id: `${generateId()}-${columns.length + 1}`,
      title: `新しいカラム ${columns.length + 1}`,
      navItemId: boarId,
    };
    setColumns([...columns, newColumn]);
  };

  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  };

  const deleteColumn = (id: Id) => {
    setColumns(columns.filter((col) => col.id !== id));
  };

  const filterColumns = useMemo(
    () => columns.filter((col) => col.navItemId === boardId),
    [columns, boardId]
  );

  return {
    filterColumns,
    setColumns,
    createNewColumn,
    updateColumn,
    deleteColumn,
    columnsId,
  };
};
