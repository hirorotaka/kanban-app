import { IoClose, IoTrash } from 'react-icons/io5';
import { TagColorList } from '../../../data/ColorList';
import { TagEditorProps } from '../../../types/type';

export const TagEditor = ({
  editingTag,
  handleEditSubmit,
  handleEditChange,
  handleColorChange,
  handleTagListDelete,
  handleTagEditorCancel,
}: TagEditorProps) => {
  return (
    <form onSubmit={handleEditSubmit} className="px-4 py-2">
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTagEditorCancel();
          }}
          className="text-gray-300 hover:text-gray-600 focus:outline-none"
        >
          <IoClose size={20} />
        </button>
      </div>
      <h3 className="text-sm font-medium text-gray-900">タグ編集</h3>
      <input
        autoFocus
        type="text"
        value={editingTag.name}
        onChange={handleEditChange}
        className="mt-2 w-full border-b-2 border-gray-300 bg-gray-100 px-2 py-1 text-base focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-2">
        <p className="text-sm text-gray-600">色を選択:</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {TagColorList.map((color) => (
            <button
              key={color}
              type="button"
              className={`size-6 rounded-full ${color} ${
                editingTag.bgColor === color ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={() => handleTagListDelete(editingTag.id)}
          className="flex items-center rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200"
        >
          <IoTrash className="mr-1" />
          削除
        </button>
        <div className="space-x-2">
          <button
            type="submit"
            className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
          >
            保存
          </button>
        </div>
      </div>
    </form>
  );
};
