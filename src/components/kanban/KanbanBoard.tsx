import { ColumnContainer } from './ColumnContainer';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay, // ドラッグ中のオーバーレイを表示するコンポーネント
  DragStartEvent, // ドラッグ開始イベントの型
  PointerSensor, // ポインターセンサー（マウスやタッチイベントを検出）
  useSensor, // センサーを使用するためのフック
  useSensors, // 複数のセンサーを使用するためのフック
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useContext, useState } from 'react';
import { Column, Task } from '../../types/type';
import { CardTask } from './TaskCard';
import { IoAdd } from 'react-icons/io5';
import { BoardContext } from '../../context/BoardContext';
import { NavItemContext } from '../../context/NavItemContext';

export const KanbanBoard = () => {
  const { navCheckId } = useContext(NavItemContext)?.board || {};
  const { filterColumns, setColumns, createNewColumn, columnsIds } =
    useContext(BoardContext)?.column || {};
  const { tasks, setTasks } = useContext(BoardContext)?.task || {};

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // センサーの設定
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // ドラッグ開始に必要な距離
      },
    })
  );

  // ドラッグ開始時のイベントハンドラ
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column); // アクティブなカラムを設定
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task); // アクティブなタスクを設定
      return;
    }
  };

  // ドラッグ終了時のイベントハンドラ
  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return; // ドロップ先がない場合は終了

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return; // 同じ要素にドロップした場合は終了

    const isActiveAColumn = active.data.current?.type === 'Column';
    if (!isActiveAColumn) return; // アクティブな要素がカラムでない場合は終了

    if (setColumns) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === activeId
        );
        const overColumnIndex = columns.findIndex((col) => col.id === overId);
        return arrayMove(columns, activeColumnIndex, overColumnIndex); // カラムの順序を変更
      });
    }
  };

  const handleTaskDrop = (activeTask: Task, overTask: Task) => {
    if (!setTasks) return;
    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeTask.id);
      const overIndex = tasks.findIndex((t) => t.id === overTask.id);

      if (activeTask.columnId !== overTask.columnId) {
        // ドロップ先のタスクが別のカラムに属する場合
        tasks[activeIndex].columnId = overTask.columnId;
        return arrayMove(tasks, activeIndex, overIndex - 1);
      }

      // 同じカラム内でのドロップの場合
      return arrayMove(tasks, activeIndex, overIndex);
    });
  };

  // ドラッグ中のタスクをカラムの上にドロップした場合の処理
  const handleTaskDropOnColumn = (activeTask: Task, overColumn: Column) => {
    if (!setTasks) return;
    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeTask.id);
      tasks[activeIndex].columnId = overColumn.id;
      return arrayMove(tasks, activeIndex, activeIndex);
    });
  };

  // ドラッグオーバー時のイベントハンドラ
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItemId = active.id;
    const overItemId = over.id;

    if (draggedItemId === overItemId) return;

    const isDraggedTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isDraggedTask) return;

    if (isDraggedTask && isOverTask) {
      // ドラッグ中のタスクを別のタスクの上にドロップする場合
      const draggedTask = active.data.current?.task;
      const overTask = over.data.current?.task;
      if (draggedTask && overTask) {
        handleTaskDrop(draggedTask, overTask);
      }
    }

    if (isDraggedTask && isOverColumn) {
      // ドラッグ中のタスクをカラムの上にドロップする場合
      const draggedTask = active.data.current?.task;
      const overColumn = over.data.current?.column;
      if (draggedTask && overColumn) {
        handleTaskDropOnColumn(draggedTask, overColumn);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="overflow-x-auto p-4">
        {/* カラムを表示する */}
        <div className="flex space-x-4">
          <SortableContext items={columnsIds || []}>
            {filterColumns?.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                filterTasks={tasks?.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>
          {/* 新しいカラムを追加するボタン */}
          <div className="shrink-0">
            <button
              className="flex items-center justify-center rounded-lg bg-green-500 p-2 text-white transition duration-200 hover:opacity-80"
              onClick={() => {
                if (!createNewColumn || !navCheckId) return;
                createNewColumn(navCheckId);
              }}
            >
              <IoAdd size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* ドラッグ中の要素の表示 */}
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              filterTasks={tasks?.filter(
                (task) => task.columnId === activeColumn.id
              )}
            />
          )}
          {activeTask && <CardTask task={activeTask} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
