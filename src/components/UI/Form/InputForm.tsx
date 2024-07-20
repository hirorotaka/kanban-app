import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';
import { AiOutlineEnter } from 'react-icons/ai';

export type InputFormProps = {
  formUi: string;
  handleSubmit: UseFormHandleSubmit<{ label: string }, undefined>;
  onSubmit: (data: { label: string }) => void;
  register: UseFormRegister<{ label: string }>;
  trigger: UseFormTrigger<{ label: string }>;
  errors: FieldErrors<{ label: string }>;
  handleTextareaChange: () => void;
};

export const InputForm = ({
  formUi,
  handleSubmit,
  onSubmit,
  register,
  trigger,
  handleTextareaChange,
}: InputFormProps) => {
  return (
    <div className={`${formUi}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative grow">
          <input
            className="w-full rounded border-none bg-blue-50 py-2 pl-4 pr-24 font-bold text-black shadow-2xl outline-none "
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
    </div>
  );
};
