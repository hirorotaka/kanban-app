import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';

export type InputHeaderProps = {
  handleSubmit: UseFormHandleSubmit<{ label: string }, undefined>;
  onSubmit: (data: { label: string }) => void;
  register: UseFormRegister<{ label: string }>;
  trigger: UseFormTrigger<{ label: string }>;
  handleTextareaChange: () => void;
};

export const InputHeaderForm = ({
  handleSubmit,
  onSubmit,
  register,
  trigger,
  handleTextareaChange,
}: InputHeaderProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-2xl font-bold">
      <div className="relative grow">
        <input
          className="w-full rounded border-none font-bold text-black outline-none "
          {...register('label', { onChange: () => trigger('label') })}
          autoFocus
          onBlur={handleTextareaChange}
        />
      </div>
      <div>
        <p className="text-xs text-gray-400 hover:text-gray-500">
          保存: Enter または フォーカスアウト時
        </p>
      </div>
    </form>
  );
};
