export const TagShow = ({ filteredTags, setIsTagEdit }) => {
  return filteredTags.length > 0 ? (
    <div onClick={() => setIsTagEdit(true)} className="flex flex-wrap gap-2">
      {filteredTags?.map((tag) => (
        <div
          key={tag.id}
          className={`flex cursor-pointer items-center rounded-md p-1 text-xs font-bold text-gray-800 ${tag.bgColor}`}
        >
          <span>{tag.name}</span>
        </div>
      ))}
    </div>
  ) : (
    <span
      className="cursor-pointer text-sm text-gray-300 transition duration-300 ease-out hover:text-gray-400"
      onClick={() => setIsTagEdit(true)}
    >
      タグ無
    </span>
  );
};
