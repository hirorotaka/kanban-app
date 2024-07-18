import { useContext, useEffect, useRef, useState } from 'react';
import { TaskProps } from '../../types/type';
import { IoApps, IoPencil, IoTrashOutline } from 'react-icons/io5';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BoardContext } from '../../context/BoardContext';
import { TagInput } from '../UI/Tag/TagInput';
import { TagShow } from '../UI/Tag/TagShow';

export const CardTask = ({ task, newTaskId, setNewTaskId }: TaskProps) => {
  const { deleteTask, updateTask } = useContext(BoardContext)?.task || {};
  const { allTags } = useContext(BoardContext)?.tag || {};

  const [editMode, setEditMode] = useState(false);
  const [prevContent, setPrevContent] = useState(task.content);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [isTagEdit, setIsTagEdit] = useState(false);

  // @dnd-kit/sortableを使用してタスクのドラッグ&ドロップ機能を実装
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // 編集モードを切り替える関数
  const handleEditMode = () => {
    setEditMode(true);
  };

  // タスクの内容を更新する関数
  const handleUpdateTask = (content: string) => {
    if (!updateTask) return;
    if (content.trim() === '') {
      updateTask(task.id, prevContent);
    } else {
      updateTask(task.id, content);
      setPrevContent(content);
    }
  };

  useEffect(() => {
    if (newTaskId?.id === task.id && newTaskId.isNewTask) {
      console.log('newTaskId', newTaskId);
      setEditMode(true);
    }
  }, [newTaskId]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editMode && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        task.content.length,
        task.content.length
      );
    }
  }, [editMode]);

  // タスクにひもついているタグを表示する
  const filteredTags = allTags?.filter((tag) => tag.taskId === task.id);

  // タスクがドラッグ中の場合、プレースホルダーを表示
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex min-h-[120px] cursor-grab items-center rounded-xl border-2 border-blue-500 bg-white p-2.5 text-left shadow-xl"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-1 rounded-xl border-2 bg-blue-100 p-1 pb-3 shadow-lg ${editMode ? '' : 'hover:border-blue-500'} `}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div className="flex flex-col">
        {/* ドラッグアイコンを上部に移動 */}
        <div className="flex min-h-9 justify-between">
          <button
            {...attributes}
            {...listeners}
            className={`text-gray-500 focus:outline-none ${
              isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={() => setIsGrabbing(true)}
            onMouseUp={() => setIsGrabbing(false)}
          >
            <IoApps size={18} />
          </button>
          {/* タスク削除アイコンの表示 */}
          <div className={`flex ${!mouseIsOver && !editMode && 'hidden'}`}>
            <button
              onClick={handleEditMode}
              className={`rounded px-1 py-2 text-gray-500 transition duration-200 ease-in-out hover:text-red-500`}
            >
              <IoPencil size={18} />
            </button>
            <button
              onClick={() => {
                if (!deleteTask) return;
                deleteTask(task.id);
              }}
              className={`rounded px-1 py-2 text-gray-500 transition duration-200 ease-in-out hover:text-red-500`}
            >
              <IoTrashOutline size={18} />
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          {/* タスクの内容表示・編集機能 */}
          <div className="grow">
            {!editMode ? (
              <p
                className=" size-full overflow-y-auto overflow-x-hidden  whitespace-pre-wrap break-words px-2 text-base"
                style={{ wordBreak: 'break-word' }}
              >
                {task.content}
              </p>
            ) : (
              <textarea
                placeholder="空白のときは、元の内容に戻ります"
                ref={textareaRef}
                className="w-full resize-none whitespace-pre-wrap break-words rounded border-2 py-1 text-base outline-none focus:border-blue-500"
                value={task.content}
                onChange={(e) => {
                  if (!updateTask) return;
                  updateTask(task.id, e.target.value);
                }}
                onBlur={() => {
                  handleUpdateTask(task.content);
                  setEditMode(false);
                  setNewTaskId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.shiftKey) {
                    handleUpdateTask(task.content);
                    setEditMode(false);
                    setNewTaskId(null);
                  }
                }}
                style={{ lineHeight: '1.5', minHeight: '100px' }}
              />
            )}
          </div>
        </div>
        <div className="w-full  p-2">
          {/* タスクのタグ表示・編集機能 */}
          {isTagEdit ? (
            <TagInput
              filteredTags={filteredTags}
              taskId={task.id}
              isTagEdit={isTagEdit}
              setIsTagEdit={setIsTagEdit}
            />
          ) : (
            <TagShow filteredTags={filteredTags} setIsTagEdit={setIsTagEdit} />
          )}
        </div>
      </div>
    </div>
  );
};
