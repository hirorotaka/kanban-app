import { TagInputFieldProps } from '../../../types/type';

export const TagInputField = ({
  inputValue,
  handleInputChange,
  handleInputKeyDown,
}: TagInputFieldProps) => {
  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
      autoFocus
      placeholder="一覧を選択するか作成します"
      className="mt-2  border-b-2 border-gray-300 bg-gray-100 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
    />
  );
};
