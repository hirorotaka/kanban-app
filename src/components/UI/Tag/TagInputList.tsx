import { TagInputListProps } from '../../../types/type';

export const TagInputList = ({ tags, handleTagDelete }: TagInputListProps) => {
  return tags.map((tag) => (
    <div
      key={tag.id}
      className={`flex cursor-pointer items-center rounded-md p-1 text-xs font-bold text-gray-800 ${tag.bgColor}`}
    >
      <span>{tag.name}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleTagDelete(tag.id);
        }}
        className="ml-2 text-white transition duration-150 ease-in-out hover:text-red-500 focus:outline-none"
      >
        &times;
      </button>
    </div>
  ));
};
