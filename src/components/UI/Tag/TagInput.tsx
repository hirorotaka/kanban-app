import React, { useContext, useEffect, useRef, useState } from 'react';
import { generateId } from '../../../utils/utils';
import { BoardContext } from '../../../context/BoardContext';
import { Tag, TagInputProps, TagList } from '../../../types/type';
import { TagInputClose } from './TagInputClose';
import { TagInputList } from './TagInputList';
import { TagInputSelectList } from './TagInputSelectList';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';
import { useTagNameInput } from '../../../hooks/useTagNameInput';
import { InputTagForm } from '../Form/InputTagForm';
import { CustomErrorMessage } from '../../CustomErrorMessage/CustomErrorMessage';
import { InputTagEditForm } from '../Form/InputTagEditForm';
import { useTagNameEdit } from '../../../hooks/useTagNameEdit';
import { IoClose, IoTrash } from 'react-icons/io5';
import { TagColorList } from '../../../data/ColorList';

export const TagInput = ({
  filteredTags = [],
  taskId,
  isTagEdit,
  setIsTagEdit,
}: TagInputProps) => {
  const { allTags, setAllTags, tagList, setTagList } =
    useContext(BoardContext)?.tag || {};

  if (!allTags || !setAllTags || !tagList || !setTagList) {
    throw new Error('allTags or setAllTags is not defined');
  }

  // 状態管理
  const [tags, setTags] = useState<Tag[]>(filteredTags || []); // タスク毎のタグ一覧
  const [popoverId, setPopoverId] = useState<string | null>(null); // 編集中のタグのポップオーバーID
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 }); // ポップオーバーの位置
  const [editingTag, setEditingTag] = useState<TagList | null>(null); // 編集中のタグ情報
  const [hoveredTagId, setHoveredTagId] = useState<string | null>(null); // ホバー中のタグID
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<string | null>(null);

  // refの設定
  const popoverRef = useRef<HTMLDivElement>(null); // タグ編集ポップオーバーの参照
  const tagInputRef = useRef<HTMLDivElement>(null); // タグ入力フィールドの参照
  const tagRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // 各タグ要素の参照

  // ポップオーバー外クリック時の処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // モーダルが開いている場合は何もしない
      if (deleteConfirmationOpen) {
        return;
      }

      // ポップオーバーの外側をクリックした場合、ポップオーバーを閉じる
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
  }, [popoverId, deleteConfirmationOpen]);

  // タグ入力フィールド外クリック時の処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // モーダルが開いている場合は何もしない
      if (deleteConfirmationOpen) {
        return;
      }

      // タグ入力フィールドの外側をクリックした場合、タグ編集モードを終了
      if (
        tagInputRef.current &&
        !tagInputRef.current.contains(event.target as Node)
      ) {
        setIsTagEdit(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTagEdit, deleteConfirmationOpen]);

  // ポップオーバーを閉じる処理
  const closePopover = () => {
    setIsTagEdit(false);
  };

  // タグ削除処理
  const handleTagDelete = (id: string) => {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags); // タスクのタグ一覧から指定のタグを削除
    setAllTags([...allTags.filter((tag) => tag.id !== id)]); // 全てのタグ一覧から指定のタグを削除
  };

  // タグ一覧クリック処理
  const handleTagListClick = (tag: TagList) => {
    // クリックしたタグがタスクのタグ一覧に存在しない場合のみ追加
    if (!tags.find((t) => t.id === tag.id)) {
      const newTag: Tag = {
        id: generateId(),
        name: tag.name,
        taskId,
        bgColor: tag.bgColor,
        tagListId: tag.id,
      };

      setTags([...tags, newTag]); // タスクのタグ一覧に新しいタグを追加
      setAllTags([...allTags, newTag]); // 全てのタグ一覧に新しいタグを追加
    }
  };

  // タグ選択判定
  const isTagSelected = (tag: TagList) => {
    // 指定のタグがタスクのタグ一覧に存在するかどうかを判定
    return tags.some((t) => t.name === tag.name);
  };

  // タグ編集処理
  const handleTagEdit = (id: string) => {
    const tagToEdit = tagList.find((tag) => tag.id === id);
    if (tagToEdit) {
      setEditingTag({ ...tagToEdit }); // 編集中のタグ情報を設定
      setPopoverId(id); // 編集中のタグのポップオーバーIDを設定
      setPopoverPosition(calculatePopoverPosition(id)); // ポップオーバーの位置を計算して設定
    }
  };

  // タグカラー変更処理
  const handleColorChange = (color: string) => {
    if (editingTag) {
      const updatedEditingTag = { ...editingTag, bgColor: color };
      setEditingTag(updatedEditingTag); // 編集中のタグのカラーを更新
      // タグ一覧の更新
      setTagList(
        tagList.map((tag) =>
          tag.id === updatedEditingTag.id ? updatedEditingTag : tag
        )
      );
      // 全てのタグ一覧の更新
      setAllTags(
        allTags.map((tag) =>
          tag.name === updatedEditingTag.name ? { ...tag, bgColor: color } : tag
        )
      );
      // タスクのタグ一覧の更新
      setTags(
        tags.map((tag) =>
          tag.name === updatedEditingTag.name ? { ...tag, bgColor: color } : tag
        )
      );
    }
  };

  const handleTagEditorCancel = () => {
    setEditingTag(null);
    setPopoverId(null);
  };

  // タグ一覧削除処理
  const handleTagListDelete = (id: string) => {
    setTagToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    if (tagToDelete) {
      setTagList(tagList.filter((tag) => tag.id !== tagToDelete));
      setTags(tags.filter((tag) => tag.tagListId !== tagToDelete));
      setAllTags(allTags.filter((tag) => tag.tagListId !== tagToDelete));
      setPopoverId(null);
      setEditingTag(null);
    }
    setDeleteConfirmationOpen(false);
    setTagToDelete(null);
  };

  // ポップオーバー閉じる処理
  const handlePopoverClose = () => {
    setPopoverId(null); // ポップオーバーIDをリセット
  };

  // ポップオーバー位置計算
  const calculatePopoverPosition = (tagId: string) => {
    const tagRef = tagRefs.current[tagId];
    if (tagRef) {
      const { top, right } = tagRef.getBoundingClientRect(); // 指定のタグ要素の位置を取得
      return { top, left: right }; // ポップオーバーの位置を計算
    }
    return { top: 0, left: 0 };
  };

  const { register, handleSubmit, errors, onSubmit, trigger } = useTagNameInput(
    {
      tags,
      setTags,
      taskId,
    }
  );
  const {
    editRegister,
    editHandleSubmit,
    editErrors,
    editTrigger,
    onEditSubmit,
  } = useTagNameEdit({
    tags,
    setTags,
    editingTag,
    handleTagEditorCancel,
  });

  return (
    <div ref={tagInputRef} className="flex flex-col gap-2 p-2">
      <div className="mt-2 origin-top-right scale-100 rounded-md bg-gray-100 p-2 shadow-2xl">
        <TagInputClose closePopover={closePopover} />
        {/* 選択済みのタグ一覧 */}
        <div className="min-h-6">
          <div className="flex  flex-wrap gap-2">
            <TagInputList tags={tags} handleTagDelete={handleTagDelete} />
          </div>
        </div>
        <div className="flex flex-col">
          {/* タグ入力フィールド */}
          <div className="min-h-24">
            <InputTagForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              trigger={trigger}
            />
            {errors.label?.message && (
              <CustomErrorMessage message={errors.label.message} />
            )}
          </div>

          <h3 className="mb-2 text-sm font-semibold">タグ一覧</h3>
          {/* タグ選択リスト */}
          {tagList.length > 0 && (
            <div className="flex max-h-44 flex-col gap-1 overflow-auto">
              <TagInputSelectList
                tagList={tagList}
                isTagSelected={isTagSelected}
                handleTagListClick={handleTagListClick}
                handleTagEdit={handleTagEdit}
                popoverId={popoverId}
                hoveredTagId={hoveredTagId}
                setHoveredTagId={setHoveredTagId}
                tagRefs={tagRefs}
              />
            </div>
          )}
        </div>
      </div>

      {/* タグ編集ポップオーバー */}
      {popoverId && editingTag && (
        <div
          ref={popoverRef}
          className="absolute z-10 mt-2 w-72 rounded-md border-2 border-gray-300 bg-gray-100 px-4  py-2 shadow-lg"
          style={{ top: popoverPosition.top, left: popoverPosition.left }}
        >
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
          <h3 className="text-sm font-semibold text-gray-900">タグ編集</h3>
          <div className="min-h-24">
            <InputTagEditForm
              handleSubmit={editHandleSubmit}
              onSubmit={onEditSubmit}
              register={editRegister}
              trigger={editTrigger}
            />
            {editErrors.label?.message && (
              <CustomErrorMessage message={editErrors.label.message} />
            )}
          </div>

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

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => handleTagListDelete(editingTag.id)}
              className="flex items-center rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200"
            >
              <IoTrash className="mr-1" />
              削除
            </button>
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={deleteConfirmationOpen}
        onConfirm={handleDeleteConfirmation}
        onCancel={() => setDeleteConfirmationOpen(false)}
      />
    </div>
  );
};
