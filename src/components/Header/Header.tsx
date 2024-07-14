import { useHeader } from '../../hooks/useHeader';

export const Header = () => {
  const {
    selectedItem,
    isEditing,
    handleChange,
    handleHeaderChange,
    handleOnClick,
    editValue,
  } = useHeader();

  if (!selectedItem) {
    return null;
  }

  return (
    <header className="bg-white p-4 shadow-lg transition-shadow">
      <div className="flex  items-center ">
        <span className="mr-2 text-2xl text-blue-500">{selectedItem.icon}</span>
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
