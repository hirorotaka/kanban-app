import { useEffect, useRef, useState } from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { IoClose, IoPencil, IoTrashOutline } from 'react-icons/io5';
import { gradientColors } from '../../../data/ColorList';
import { DropdownMenuProps } from '../../../types/type';

export const DropdownMenu = ({
  selectedColor,
  setSelectedColor,
  deleteColumn,
  updateColumn,
  columnId,
  handleEditTitleClick,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const handleColorChange = (color: string) => {
    updateColumn(columnId, { bgColor: color });
    setSelectedColor(color);
  };

  const handleDeleteColumn = () => {
    setIsOpen(false);
    deleteColumn(columnId);
  };

  const handleEditFormFadeIn = () => {
    setIsOpen(false);
    handleEditTitleClick();
  };

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md px-2 py-1 text-sm font-medium text-white focus:outline-none"
        onClick={togglePopover}
      >
        <GoKebabHorizontal className="size-8" />
      </button>

      <div
        className={`absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-gray-100 shadow-2xl transition duration-300 ease-out${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {isOpen && (
          <div className="py-1">
            <div className="flex justify-end">
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
            <button
              onClick={handleEditFormFadeIn}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
            >
              <IoPencil className="mr-3 size-5" />
              タイトルを編集
            </button>
            <button
              onClick={handleDeleteColumn}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
            >
              <IoTrashOutline className="mr-3 size-5" />
              グループを削除
            </button>
            <div className="mx-2 mt-1 border-t border-gray-300 pt-2">
              <p className="px-4 py-2 text-sm font-medium text-gray-700">
                カラー
              </p>
              <div className="grid grid-cols-5 gap-2 px-4 py-1">
                {gradientColors.map((color) => (
                  <button
                    key={color.value}
                    className={`size-5 rounded-sm ${color.value} ${
                      selectedColor === color.value
                        ? 'ring-2 ring-blue-500 ring-offset-2'
                        : ''
                    }`}
                    onClick={() => handleColorChange(color.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
