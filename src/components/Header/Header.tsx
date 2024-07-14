import { useEffect, useState } from 'react';
import { useHeader } from '../../hooks/useHeader';
import { EmojiPicker } from '../EmojiPicker/EmojiPicker';

export const Header = () => {
  const {
    selectedItem,
    isEditing,
    handleChange,
    handleHeaderChange,
    handleOnClick,
    editValue,
    onIconChange,
  } = useHeader();

  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (!selectedItem) return;
    setIcon(selectedItem?.icon);
  }, [selectedItem]);

  if (!selectedItem) {
    return null;
  }

  return (
    <header className="bg-white p-4 shadow-lg transition-shadow">
      <div className="flex items-center">
        <EmojiPicker icon={icon} onChange={onIconChange} />
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={handleChange}
            onBlur={handleHeaderChange}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleHeaderChange();
              }
            }}
            className="w-3/4 rounded border border-none text-2xl font-bold caret-blue-500 outline-none"
          />
        ) : (
          <span onClick={handleOnClick} className="text-2xl font-bold">
            {selectedItem.label}
          </span>
        )}
      </div>
    </header>
  );
};
