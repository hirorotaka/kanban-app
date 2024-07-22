import { IoTrashOutline } from 'react-icons/io5';
import { TrashIconProps } from '../../../types/type';

export const TrashIcon = ({ onClickDelete, TextColor }: TrashIconProps) => (
  <button
    onClick={onClickDelete}
    className={`rounded px-1 py-2 ${TextColor} transition duration-200 ease-in-out hover:text-red-500`}
  >
    <IoTrashOutline size={18} />
  </button>
);
