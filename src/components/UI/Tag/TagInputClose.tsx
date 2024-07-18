import { IoClose } from 'react-icons/io5';
import { TagInputCloseProps } from '../../../types/type';

export const TagInputClose = ({ closePopover }: TagInputCloseProps) => {
  return (
    <div className="flex justify-end">
      {/* 親要素にonClickがあるので、子要素でクリックするときはイベントの伝播を防ぐためにstopPropagationを使う */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          closePopover();
        }}
        className="text-gray-300 hover:text-gray-600 focus:outline-none"
      >
        <IoClose size={20} />
      </button>
    </div>
  );
};
