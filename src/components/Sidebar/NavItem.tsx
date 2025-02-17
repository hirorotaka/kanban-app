import { useContext, useState } from 'react';
import { NavItemContext } from '../../context/NavItemContext';
import { DeleteConfirmationModal } from '../UI/Modal/DeleteConfirmationModal';
import { IoTrashOutline } from 'react-icons/io5';
import { NavItemProps } from '../../types/type';

export const NavItem = ({ id, icon, label }: NavItemProps) => {
  const { removeNavItem, setNavCheckId, navCheckId } =
    useContext(NavItemContext) || {};
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

  // タグ一覧削除処理
  const handleBoardDeleteClick = (id: string) => {
    setBoardToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    if (boardToDelete && removeNavItem) {
      removeNavItem(id);
    }
    setDeleteConfirmationOpen(false);
    setBoardToDelete(null);
  };

  const handleClick = () => {
    if (setNavCheckId) {
      setNavCheckId(id);
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-between rounded-md transition duration-100 ease-in-out ${
          navCheckId === id
            ? 'bg-blue-400 font-bold text-white'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        <div
          onClick={handleClick}
          className=" wave-effect flex grow items-center space-x-2 overflow-hidden rounded-md p-2"
        >
          <span className="shrink-0">{icon}</span>
          <span className="grow truncate">{label}</span>
        </div>
        <div className=" wave-effect w-7 shrink-0">
          {navCheckId === id && (
            <button
              onClick={() => handleBoardDeleteClick(id)}
              className="rounded px-1 py-2 text-white transition duration-200 ease-in-out hover:text-red-500"
            >
              <IoTrashOutline size={20} />
            </button>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteConfirmationOpen}
        onConfirm={handleDeleteConfirmation}
        onCancel={() => setDeleteConfirmationOpen(false)}
        message="本当にこのボードを削除しますか？"
      />
    </>
  );
};
