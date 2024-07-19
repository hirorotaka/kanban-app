import React, { useContext, useEffect, useRef, useState } from 'react';
import { generateId } from '../../../utils/utils';
import { BoardContext } from '../../../context/BoardContext';
import { Tag, TagInputProps, TagList } from '../../../types/type';
import { TagEditor } from './TagEditor';
import { TagInputClose } from './TagInputClose';
import { TagInputList } from './TagInputList';
import { TagInputField } from './TagInputField';
import { TagInputSelectList } from './TagInputSelectList';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';

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
  const [inputValue, setInputValue] = useState(''); // タグ入力フィールドの値
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
      console.log(isTagEdit, deleteConfirmationOpen);
      console.log(
        tagInputRef.current &&
          !tagInputRef.current.contains(event.target as Node)
      );
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

  // タグ入力フィールドの変更処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // タグ入力フィールドのキー押下処理
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const newTagName = inputValue.trim();

      // 既に存在するタグと同じ単語かどうかチェック
      const isDuplicate = [...tags, ...tagList].some(
        (tag) => tag.name === newTagName
      );

      if (!isDuplicate) {
        const newTagList: TagList = {
          id: generateId(),
          name: newTagName,
          bgColor: 'bg-blue-300',
        };

        const newTag: Tag = {
          id: generateId(),
          name: newTagName,
          taskId,
          bgColor: 'bg-blue-300',
          tagListId: newTagList.id,
        };

        setTags([...tags, newTag]); // タスクのタグ一覧に新しいタグを追加
        setAllTags([...allTags, newTag]); // 全てのタグ一覧に新しいタグを追加
        setTagList([newTagList, ...tagList]); // タグ一覧の先頭に新しいタグを追加
        setInputValue(''); // 入力フィールドクリア
      }
    }
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

  // タグ編集変更処理
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingTag) {
      setEditingTag({ ...editingTag, name: e.target.value }); // 編集中のタグ名を更新
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

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTag) {
      const updatedTagList = tagList.map((tag) =>
        tag.id === editingTag.id ? editingTag : tag
      );
      setTagList(updatedTagList);

      // Update allTags
      const updatedAllTags = allTags.map((tag) =>
        tag.tagListId === editingTag.id ? { ...tag, ...editingTag } : tag
      );
      setAllTags(updatedAllTags);

      // Update tags
      const updatedTags = tags.map((tag) =>
        tag.tagListId === editingTag.id ? { ...tag, ...editingTag } : tag
      );
      setTags(updatedTags);

      setEditingTag(null);
      setPopoverId(null);
    }
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

  return (
    <div ref={tagInputRef} className="flex flex-col gap-2 p-2">
      <div className="mt-2 origin-top-right scale-100 rounded-md bg-gray-100 p-2 shadow-2xl">
        <TagInputClose closePopover={closePopover} />
        {/* 選択済みのタグ一覧 */}
        <div className="flex flex-wrap gap-2">
          <TagInputList tags={tags} handleTagDelete={handleTagDelete} />
        </div>
        <div className="flex flex-col">
          {/* タグ入力フィールド */}
          <TagInputField
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleInputKeyDown={handleInputKeyDown}
          />
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
          className="absolute z-10 mt-2 w-64 rounded-md border-2 border-gray-300 bg-white py-1 shadow-lg"
          style={{ top: popoverPosition.top, left: popoverPosition.left }}
        >
          <TagEditor
            editingTag={editingTag}
            handleEditSubmit={handleEditSubmit}
            handleEditChange={handleEditChange}
            handleColorChange={handleColorChange}
            handleTagListDelete={handleTagListDelete}
            handleTagEditorCancel={handleTagEditorCancel}
          />
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
