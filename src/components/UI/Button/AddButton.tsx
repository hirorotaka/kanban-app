import { IoAdd } from 'react-icons/io5';
import { AddButtonProps } from '../../../types/type';

export const AddButton = ({ onClickCreateTask, bgColor }: AddButtonProps) => (
  <button
    className={`${bgColor} flex items-center justify-center rounded-lg p-2 text-white transition duration-200 hover:opacity-80`}
    onClick={onClickCreateTask}
  >
    <IoAdd size={20} />
  </button>
);
