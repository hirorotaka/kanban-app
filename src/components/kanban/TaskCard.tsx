import { useContext, useEffect, useState } from 'react';
import { TaskProps } from '../../types/type';
import { IoApps, IoTrashOutline } from 'react-icons/io5';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BoardContext } from '../../context/BoardContext';

export const CardTask = ({ task, newTaskId }: TaskProps) => {
  const { deleteTask, updateTask } = useContext(BoardContext)?.task || {};

  const [editMode, setEditMode] = useState(false);
  const [prevContent, setPrevContent] = useState(task.content);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [highlighted, setHighlighted] = useState(false);

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
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
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

  // 新しいタスクが追加されたときにハイライトする
  useEffect(() => {
    if (newTaskId === task.id) {
      setHighlighted(true);
    }
    return () => {
      setHighlighted(false);
    };
  }, [newTaskId]);

  // タスクがドラッグ中の場合、プレースホルダーを表示
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex h-full min-h-[120px] cursor-grab items-center rounded-xl border-4 border-blue-500 bg-white p-2.5 text-left shadow-xl"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-4 rounded-xl border-2 bg-blue-100 p-2 shadow-md hover:shadow-xl ${highlighted ? 'animate-highlight' : 'border-transparent'}`}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex min-h-[60px] w-[220px] items-center">
          {/* ドラッグアイコン表示 */}
          <button
            {...attributes}
            {...listeners}
            className={`mx-2 text-gray-500 focus:outline-none ${
              isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={() => setIsGrabbing(true)}
            onMouseUp={() => setIsGrabbing(false)}
          >
            <IoApps size={16} />
          </button>
          {/* タスクの内容表示・編集機能 */}
          <div onClick={() => setEditMode(true)} className="grow font-bold">
            {!editMode ? (
              <p
                className="my-auto min-h-[100px] overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words px-2 py-1"
                style={{ lineHeight: '1.5' }}
              >
                {task.content}
              </p>
            ) : (
              <textarea
                className="min-h-[100px] w-full resize-none whitespace-pre-wrap break-words rounded border px-2 py-1 outline-none focus:border-blue-500"
                value={task.content}
                onChange={(e) => {
                  if (!updateTask) return;
                  updateTask(task.id, e.target.value);
                }}
                autoFocus
                onBlur={() => {
                  handleUpdateTask(task.content);
                  toggleEditMode();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.shiftKey) {
                    handleUpdateTask(task.content);
                    toggleEditMode();
                  }
                }}
                style={{ lineHeight: '1.5' }}
              />
            )}
          </div>
        </div>
        {/* タスク削除アイコンの表示 */}
        {mouseIsOver && !editMode ? (
          <div className="min-w-7">
            <button
              onClick={() => {
                if (!deleteTask) return;
                deleteTask(task.id);
              }}
              className={`rounded px-1 py-2 text-gray-500 transition duration-200 ease-in-out hover:text-red-500`}
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        ) : (
          <div className="min-w-7" />
        )}
      </div>
    </div>
  );
};
