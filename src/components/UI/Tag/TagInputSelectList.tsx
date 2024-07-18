import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { TagInputSelectListProps } from '../../../types/type';

export const TagInputSelectList = ({
  tagList,
  isTagSelected,
  handleTagListClick,
  handleTagEdit,
  popoverId,
  hoveredTagId,
  setHoveredTagId,
  tagRefs,
}: TagInputSelectListProps) => {
  return tagList.map((tag) => (
    <div
      key={tag.id}
      ref={(el) => (tagRefs.current[tag.id] = el)}
      className="flex items-center justify-between hover:bg-gray-200"
      onMouseEnter={() => setHoveredTagId(tag.id)}
      onMouseLeave={() => setHoveredTagId(null)}
    >
      <div
        className={`flex cursor-pointer items-center justify-between text-xs font-bold text-gray-800 ${
          isTagSelected(tag) ? 'cursor-not-allowed opacity-30' : ''
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (isTagSelected(tag)) return;
          handleTagListClick(tag);
        }}
      >
        <span className={`${tag.bgColor} rounded-md p-1 text-xs`}>
          {tag.name}
        </span>
      </div>
      <div>
        {(hoveredTagId === tag.id || popoverId === tag.id) && (
          <IoEllipsisHorizontalSharp
            onClick={(e) => {
              e.stopPropagation();
              handleTagEdit(tag.id);
            }}
            size={20}
            className="cursor-pointer text-gray-800 hover:opacity-60"
          />
        )}
      </div>
    </div>
  ));
};
