import React, { useEffect, useRef, useState } from 'react';
import { IoClose, IoEllipsisHorizontalSharp, IoTrash } from 'react-icons/io5';
import { generateId } from '../../../utils/utils';

type Tag = {
  id: string;
  name: string;
  taskId: string;
  bgColor: string;
  ref?: HTMLDivElement;
};

const initialTagList: Tag[] = [
  {
    id: '1',
    name: '重要',
    taskId: '',
    bgColor: 'bg-yellow-200',
  },
  {
    id: '2',
    name: '学習',
    taskId: '',
    bgColor: 'bg-orange-200',
  },
  { id: '3', name: '勉強', taskId: '', bgColor: 'bg-teal-200' },
  {
    id: '4',
    name: '緊急度 高',
    taskId: '',
    bgColor: 'bg-red-200',
  },
  {
    id: '5',
    name: '緊急度 中',
    taskId: '',
    bgColor: 'bg-amber-200',
  },
  {
    id: '6',
    name: '緊急度 低',
    taskId: '',
    bgColor: 'bg-sky-200',
  },
];

const colorOptions = [
  'bg-red-200',
  'bg-yellow-200',
  'bg-green-200',
  'bg-blue-200',
  'bg-indigo-200',
  'bg-purple-200',
  'bg-pink-200',
  'bg-amber-200',
  'bg-sky-200',
  'bg-teal-200',
  'bg-orange-200',
  'bg-rose-200',
  'bg-violet-200',
  'bg-lime-200',
];

export const TagInput = () => {
  // タグ
  const [tags, setTags] = useState<Tag[]>([]);

  // タグ一覧
  const [tagList, setTagList] = useState<Tag[]>(initialTagList);
  const [inputValue, setInputValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [popoverId, setPopoverId] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [hoveredTagId, setHoveredTagId] = useState<string | null>(null);

  const popoverRef = useRef<HTMLDivElement>(null);
  const tagInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        handlePopoverClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popoverId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagInputRef.current &&
        !tagInputRef.current.contains(event.target as Node)
      ) {
        setIsEdit(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEdit]);

  const closePopover = () => {
    setIsEdit(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const newTagName = inputValue.trim();

      // 既に存在するタグと同じ単語かどうかチェック
      const isDuplicate = [...tags, ...tagList].some(
        (tag) => tag.name === newTagName
      );

      if (!isDuplicate) {
        const newTag: Tag = {
          id: generateId(),
          name: newTagName,
          taskId: '',
          bgColor: 'bg-blue-300',
        };
        setTags([...tags, newTag]);
        setTagList([newTag, ...tagList]); // 新しいタグを先頭に追加
        setInputValue('');
      }
    }
  };

  const handleTagDelete = (id: string) => {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
  };

  const handleTagListClick = (tag: Tag) => {
    if (!tags.find((t) => t.id === tag.id)) {
      setTags([...tags, tag]);
    }
  };

  const isTagSelected = (tag: Tag) => {
    return tags.some((t) => t.id === tag.id);
  };

  const handleTagEdit = (id: string) => {
    const tagToEdit = tagList.find((tag) => tag.id === id);
    if (tagToEdit) {
      setEditingTag({ ...tagToEdit });
      setPopoverId(id);
      setPopoverPosition(calculatePopoverPosition(id));
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingTag) {
      setEditingTag({ ...editingTag, name: e.target.value });
    }
  };

  const handleColorChange = (color: string) => {
    if (editingTag) {
      const updatedEditingTag = { ...editingTag, bgColor: color };
      setEditingTag(updatedEditingTag);

      // Update tagList
      setTagList(
        tagList.map((tag) =>
          tag.id === updatedEditingTag.id ? updatedEditingTag : tag
        )
      );

      // Update tags
      setTags(
        tags.map((tag) =>
          tag.id === updatedEditingTag.id ? updatedEditingTag : tag
        )
      );
    }
  };

  const handleTagListDelete = (id: string) => {
    setTagList(tagList.filter((tag) => tag.id !== id));
    setTags(tags.filter((tag) => tag.id !== id));
    setPopoverId(null);
    setEditingTag(null);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTag) {
      const updatedTagList = tagList.map((tag) =>
        tag.id === editingTag.id ? editingTag : tag
      );
      setTagList(updatedTagList);

      // Update the tag in the tags state
      const updatedTags = tags.map((tag) =>
        tag.id === editingTag.id ? editingTag : tag
      );
      setTags(updatedTags);

      setEditingTag(null);
      setPopoverId(null);
    }
  };

  const handlePopoverClose = () => {
    setPopoverId(null);
  };

  const calculatePopoverPosition = (tagId: string) => {
    const tagRef = tagList.find((tag) => tag.id === tagId)?.ref;
    if (tagRef) {
      const { top, right } = tagRef.getBoundingClientRect();
      return { top, left: right };
    }
    return { top: 0, left: 0 };
  };

  const renderPopover = () => {
    if (!popoverId || !editingTag) return null;

    return (
      <div
        ref={popoverRef}
        className="absolute z-10 mt-2 w-64 rounded-md border-2 border-gray-300 bg-white py-1 shadow-lg"
        style={{ top: popoverPosition.top, left: popoverPosition.left }}
      >
        <form onSubmit={handleEditSubmit} className="px-4 py-2">
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
              {colorOptions.map((color) => (
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
                type="button"
                onClick={() => {
                  setEditingTag(null);
                  setPopoverId(null);
                }}
                className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-800 hover:bg-gray-300"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
              >
                保存
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div
      ref={tagInputRef}
      onClick={() => setIsEdit(true)}
      className="flex flex-col gap-2 p-2"
    >
      {isEdit ? (
        <div className="mt-2 origin-top-right scale-100 rounded-md bg-gray-100 p-2 opacity-100 shadow-2xl transition duration-500 ease-out">
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
          <div className="flex flex-wrap  gap-2">
            {tags.map((tag) => (
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
                  className="ml-2 text-white hover:text-red-500 focus:outline-none"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              autoFocus
              placeholder="一覧を選択するか作成します"
              className="mt-2 w-[90%] border-b-2 border-gray-300 bg-gray-100 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
            />

            <h3 className="mb-2 text-sm font-semibold">タグ一覧</h3>

            {tagList.length > 0 && (
              <div className="flex max-h-44 flex-col gap-1 overflow-auto">
                {tagList.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between hover:bg-gray-200"
                    onMouseEnter={() => setHoveredTagId(tag.id)}
                    onMouseLeave={() => setHoveredTagId(null)}
                  >
                    <div
                      className={`flex cursor-pointer items-center justify-between text-xs font-bold text-gray-800 ${
                        isTagSelected(tag)
                          ? 'cursor-not-allowed opacity-30'
                          : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        !isTagSelected(tag) && handleTagListClick(tag);
                      }}
                    >
                      <span className={`${tag.bgColor} rounded-md p-1 text-xs`}>
                        {tag.name}
                      </span>
                    </div>
                    <div className="relative" ref={(ref) => (tag.ref = ref)}>
                      {(hoveredTagId === tag.id || popoverId === tag.id) && (
                        <IoEllipsisHorizontalSharp
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagEdit(tag.id);
                          }}
                          size={20}
                          className="cursor-pointer text-gray-800"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
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
          onClick={() => setIsEdit(true)}
        >
          タグ無
        </span>
      )}

      {renderPopover()}
    </div>
  );
};
