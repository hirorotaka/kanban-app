import React, { useEffect, useRef } from 'react';
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

export type TextAreaContentFormProps = {
  handleSubmit: UseFormHandleSubmit<{ label: string }, undefined>;
  onSubmit: (data: { label: string }) => void;
  register: UseFormRegister<{ label: string }>;
  trigger: UseFormTrigger<{ label: string }>;
  handleTextareaChange: () => void;
  handleCancelClick: () => void;
  isEditMode: boolean;
};

export const TextAreaContentForm = ({
  handleSubmit,
  onSubmit,
  register,
  trigger,
  handleTextareaChange,
  handleCancelClick,
  isEditMode,
}: TextAreaContentFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        handleTextareaChange();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditMode, handleTextareaChange]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCancelClick();
          }}
          className="p-2 text-gray-300 hover:text-gray-500 focus:outline-none"
        >
          <IoClose size={24} />
        </button>
      </div>
      <textarea
        placeholder="タスクを追加してください。"
        className="min-h-[200px] w-full resize-none whitespace-pre-wrap break-all rounded border-none text-black outline-none"
        {...register('label', { onChange: () => trigger('label') })}
        autoFocus
        onKeyDown={handleKeyDown}
      />
      <div className="text-xs text-gray-300 hover:text-gray-500">
        <p>保存: Shift + Enter または フォーカスアウト時</p>
        <p>改行: Enter</p>
        <p>閉じる: 元の値に戻る</p>
      </div>
    </form>
  );
};
