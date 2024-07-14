import { useContext, useEffect, useRef, useState } from 'react';
import { ColumnContainerProps, Task } from '../../types/type';
import { CardTask } from './TaskCard';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IoAdd, IoApps, IoPencil, IoTrashOutline } from 'react-icons/io5';
import { SortableContext } from '@dnd-kit/sortable';
import { BoardContext } from '../../context/BoardContext';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';
import { useColumnContainer } from '../../hooks/useColumnContainer';
import { InputForm } from '../UI/Form/InputForm';

export const ColumnContainer = ({
  column,
  filterTasks,
}: ColumnContainerProps) => {
  const { updateColumn, deleteColumn } = useContext(BoardContext)?.column || {};
  const { createTask, tasksIds } = useContext(BoardContext)?.task || {};
  const [isGrabbing, setIsGrabbing] = useState(false);
  const tasksContainerRef = useRef<HTMLDivElement>(null);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [newTaskId, setNewTaskId] = useState<{
    id: string;
    isNewTask: boolean;
  } | null>(null);

  if (!updateColumn) {
    throw new Error('updateColumn is not defined');
  }

  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleTextareaChange,
    trigger,
    editMode,
    handleClick,
  } = useColumnContainer({ column, updateColumn });

  // @dnd-kit/sortableを使用してカラムのドラッグ&ドロップ機能を実装
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // タスクが追加されたときのみスクロールを行う
  // React のレンダリングサイクルと仮想 DOM の更新のタイミングの差異を調整でsetTimeoutを使用
  useEffect(() => {
    if (newTaskId?.isNewTask && tasksContainerRef.current) {
      setTimeout(() => {
        tasksContainerRef.current?.scrollTo({
          top: tasksContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 0);
    }
  }, [newTaskId]);

  // カラムがドラッグ中の場合、プレースホルダーを表示
  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="flex w-[330px]"></div>
    );
  }

  return (
    <div className="w-[330px] rounded-xl" ref={setNodeRef} style={style}>
      {/* タイトル表示 */}
      <div
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        className="flex h-[40px] items-center justify-between rounded-t-xl bg-gradient-to-r from-blue-500 to-indigo-500 p-1 font-bold text-white shadow-md"
      >
        <div className="flex items-center gap-1">
          {/* ドラッグアイコン表示 */}
          <button
            {...attributes}
            {...listeners}
            className={`mr-1 text-gray-500 focus:outline-none ${
              isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={() => setIsGrabbing(true)}
            onMouseUp={() => setIsGrabbing(false)}
          >
            <IoApps size={16} color="#fff" />
          </button>
          {/* カラムのタイトル表示・編集機能 */}
          <div onClick={handleClick} className="relative flex items-center">
            <div className="cursor-pointer text-base font-bold">
              {column.title}
            </div>
            {editMode && (
              <div className="animate-bounce-in absolute left-0 top-[80%] z-50 mt-1 rounded-lg border border-gray-300 bg-white p-1 text-gray-500 shadow-2xl shadow-gray-950">
                <InputForm
                  formUi="w-[400px] text-base"
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  register={register}
                  trigger={trigger}
                  errors={errors}
                  handleTextareaChange={handleTextareaChange}
                />
                {errors.label?.message && (
                  <CustomErrorMessage message={errors.label.message} />
                )}
              </div>
            )}
          </div>
          {/* タスクの個数を表示 */}
          <span className=" rounded-full bg-white/30 px-1 text-sm font-bold text-white">
            {filterTasks?.length || 0}
          </span>
        </div>
        {/* カラム編集・削除アイコンの表示 */}
        {mouseIsOver ? (
          <div className="min-w-7">
            <button
              onClick={handleClick}
              className={`cursor-pointer rounded px-1 py-2 text-white transition duration-200 ease-in-out hover:text-red-500`}
            >
              <IoPencil size={18} />
            </button>
            <button
              onClick={() => {
                if (deleteColumn) {
                  deleteColumn(column.id);
                }
              }}
              className={`cursor-pointer rounded px-1 py-2 text-white transition duration-200 ease-in-out hover:text-red-500`}
            >
              <IoTrashOutline size={18} />
            </button>
          </div>
        ) : (
          <div className="min-w-7" />
        )}
      </div>

      {/* タスクの表示 */}
      <div
        ref={tasksContainerRef}
        className="flex flex-col  gap-4 overflow-y-auto overflow-x-hidden rounded-b-xl border-x-2 bg-white p-3 shadow-md"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {/* @dnd-kit/sortableを使用してタスクのドラッグ&ドロップ機能を実装 */}
        <SortableContext items={tasksIds || []}>
          {filterTasks?.map((task) => (
            <CardTask key={task.id} task={task} newTaskId={newTaskId} />
          ))}
        </SortableContext>
      </div>
      {/* タスク追加ボタンの表示 */}
      <div className="my-4 flex justify-center">
        <button
          className="flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-2 text-white transition duration-200 hover:from-blue-600 hover:to-indigo-600 hover:opacity-80"
          onClick={() => {
            if (!createTask) return;
            const newTask: Task = createTask(column.id);
            setNewTaskId({ id: newTask.id, isNewTask: true });
          }}
        >
          <IoAdd size={20} />
          タスクを追加
        </button>
      </div>
    </div>
  );
};
