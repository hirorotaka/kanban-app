import { useContext, useState } from 'react';
import { TaskProps } from '../../types/type';
import { IoApps, IoPencil, IoTrashOutline } from 'react-icons/io5';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BoardContext } from '../../context/BoardContext';
import { TagInput } from '../UI/Tag/TagInput';
import { TagShow } from '../UI/Tag/TagShow';
import { DayTimePicker } from '../DayTimePicker/DayTimePicker';
import { useTaskContentEdit } from '../../hooks/useTaskContentEdit';
import { TextAreaForm } from '../UI/Form/TextAreaForm';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';

export const CardTask = ({ task }: TaskProps) => {
  const { deleteTask, updateTask } = useContext(BoardContext)?.task || {};
  const { allTags } = useContext(BoardContext)?.tag || {};

  const [isGrabbing, setIsGrabbing] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [isTagEdit, setIsTagEdit] = useState(false);

  if (!updateTask || !deleteTask) {
    throw new Error('updateTask is not defined');
  }

  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleTextareaChange,
    trigger,
    isEditMode,
    handleCancelClick,
    handleEditContentClick,
  } = useTaskContentEdit({ task, updateTask });

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
    disabled: isEditMode || isTagEdit,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // タスクにひもついているタグを表示する
  const filteredTags = allTags?.filter((tag) => tag.taskId === task.id) || [];

  // タスクがドラッグ中の場合、プレースホルダーを表示
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex min-h-[120px] cursor-grab items-center rounded-xl border-2 border-blue-200 bg-white p-2.5 text-left shadow-xl"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-1 rounded-xl border-2 bg-blue-50 p-1 pb-3 shadow-lg ${isEditMode ? '' : 'hover:border-blue-200'} `}
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
          <div className={`flex ${!mouseIsOver && !isEditMode && 'hidden'}`}>
            <button
              onClick={handleEditContentClick}
              className={`rounded px-1 py-2 text-gray-400 transition duration-200 ease-in-out hover:text-gray-800`}
            >
              <IoPencil size={18} />
            </button>
            {/* タスク削除アイコンの表示 */}
            <button
              onClick={() => {
                if (!deleteTask) return;
                deleteTask(task.id);
              }}
              className={`rounded px-1 py-2 text-gray-400 transition duration-200 ease-in-out hover:text-red-500`}
            >
              <IoTrashOutline size={18} />
            </button>
          </div>
        </div>
        {/* タスクの内容表示・編集機能 */}
        <div className="mb-8 flex justify-between">
          {!isEditMode ? (
            <p
              onClick={handleEditContentClick}
              className="mt-1 size-full w-full cursor-pointer overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-all  rounded-lg px-2 text-base  transition duration-200 ease-in-out hover:text-gray-500"
            >
              {task.content}
            </p>
          ) : (
            <div className="animate-bounce-in mt-1 w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-2 shadow-xl">
              <TextAreaForm
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                trigger={trigger}
                handleTextareaChange={handleTextareaChange}
                handleCancelClick={handleCancelClick}
                isEditMode={isEditMode}
              />
              {errors.label?.message && (
                <CustomErrorMessage message={errors.label.message} />
              )}
            </div>
          )}
        </div>

        {/* タスクの期限表示・編集機能 */}
        <div className="mb-1 w-full px-2">
          <DayTimePicker task={task} updateTask={updateTask} />
        </div>

        {/* タスクのタグ表示・編集機能 */}
        <div className="w-full  px-2">
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
