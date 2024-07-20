import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';

export type InputTagEditFormProps = {
  handleSubmit: UseFormHandleSubmit<{ label: string }, undefined>;
  onSubmit: (data: { label: string }) => void;
  register: UseFormRegister<{ label: string }>;
  trigger: UseFormTrigger<{ label: string }>;
};

export const InputTagEditForm = ({
  handleSubmit,
  onSubmit,
  register,
  trigger,
}: InputTagEditFormProps) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-2  border-b-2 border-gray-300 bg-gray-100 px-2 py-1 text-sm focus:outline-none"
    >
      <div className="grow">
        <input
          className="w-full rounded border-none  bg-gray-100 p-1  text-black outline-none"
          {...register('label', { onChange: () => trigger('label') })}
          autoFocus
          placeholder="タグを編集します"
        />
      </div>
      <div>
        <p className="text-xs text-gray-400 hover:text-gray-500">保存: Enter</p>
      </div>
    </form>
  );
};
