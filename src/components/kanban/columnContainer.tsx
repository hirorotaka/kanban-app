import { useContext, useEffect, useRef, useState } from 'react';
import { ColumnContainerProps, Task } from '../../types/type';
import { CardTask } from './TaskCard';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IoAdd, IoApps, IoTrashOutline } from 'react-icons/io5';
import { SortableContext } from '@dnd-kit/sortable';
import { BoardContext } from '../../context/BoardContext';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';
import { useColumnContainer } from '../../hooks/useColumnContainer';
import { InputForm } from '../UI/Form/inputForm';

export const ColumnContainer = ({
  column,
  filterTasks,
}: ColumnContainerProps) => {
  const { updateColumn, deleteColumn } = useContext(BoardContext)?.column || {};
  const { createTask, tasksIds } = useContext(BoardContext)?.task || {};
  const [isGrabbing, setIsGrabbing] = useState(false);
  const tasksContainerRef = useRef<HTMLDivElement>(null);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const prevTasksLengthRef = useRef(filterTasks?.length || 0);
  const [newTaskId, setNewTaskId] = useState<string | null>(null);

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
    inputId,
    editMode,
    setEditMode,
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
  useEffect(() => {
    if (
      tasksContainerRef.current &&
      filterTasks &&
      filterTasks.length > prevTasksLengthRef.current
    ) {
      tasksContainerRef.current.scrollTop =
        tasksContainerRef.current.scrollHeight;
    }
    prevTasksLengthRef.current = filterTasks?.length || 0;
  }, [filterTasks?.length]);

  // カラムがドラッグ中の場合、プレースホルダーを表示
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[750px] max-h-[750px] w-[300px] flex-col rounded-xl border-2 border-blue-500 bg-white  shadow-xl"
      ></div>
    );
  }

  return (
    <div
      className="h-[750px] max-h-[750px] w-[300px] rounded-xl bg-white shadow shadow-slate-500"
      ref={setNodeRef}
      style={style}
    >
      {/* タイトル表示 */}
      <div
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        className="flex h-[60px] items-center justify-between rounded-t-xl bg-gradient-to-r from-blue-500 to-indigo-500 p-1 font-bold text-white shadow-md"
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
          <div
            onClick={() => {
              setEditMode(true);
            }}
            className="resize-none whitespace-pre-wrap break-words rounded-full p-1 text-base font-bold text-white"
          >
            {!editMode ? (
              column.title
            ) : (
              <>
                {column.title}
                <InputForm
                  formUi="w-[200px] text-sm"
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  register={register}
                  trigger={trigger}
                  errors={errors}
                  handleTextareaChange={handleTextareaChange}
                  tagId={inputId}
                  inputType="input"
                />
                {errors.label?.message && (
                  <CustomErrorMessage
                    message={errors.label.message}
                    tagId={inputId}
                  />
                )}
              </>
            )}
          </div>
          {/* タスクの個数を表示 */}
          <span className=" rounded-full bg-white/30 px-2 py-1 text-base font-bold text-white">
            {filterTasks?.length || 0}
          </span>
        </div>
        {/* カラム削除アイコンの表示 */}
        {mouseIsOver && (
          <button
            onClick={() => {
              if (deleteColumn) {
                deleteColumn(column.id);
              }
            }}
            className={`rounded px-1 py-2 text-gray-500 transition duration-200 ease-in-out hover:text-red-500`}
          >
            <IoTrashOutline size={20} />
          </button>
        )}
      </div>

      {/* タスクの表示 */}
      <div
        ref={tasksContainerRef}
        className="flex h-[630px] grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-4"
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
          className="flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-2 text-white transition duration-200 hover:from-blue-600 hover:to-indigo-600 hover:opacity-80"
          onClick={() => {
            if (!createTask) return;
            const newTask: Task = createTask(column.id);
            setNewTaskId(newTask.id);
          }}
        >
          <IoAdd size={20} />
        </button>
      </div>
    </div>
  );
};
