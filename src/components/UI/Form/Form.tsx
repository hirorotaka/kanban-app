import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';

type FormProps = {
  formUi: string;
  handleSubmit: UseFormHandleSubmit<{ label: string }, undefined>;
  onSubmit: (data: { label: string }) => void;
  register: UseFormRegister<{ label: string }>;
  trigger: UseFormTrigger<{ label: string }>;
  errors: FieldErrors<{ label: string }>;
  handleBlur: () => void;
  tagId: string;
  inputType: 'input' | 'textarea';
};

export const Form = ({
  formUi,
  handleSubmit,
  onSubmit,
  register,
  trigger,
  handleBlur,
  tagId,
  inputType,
}: FormProps) => {
  return (
    <div className={`${formUi}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grow">
          {inputType === 'input' ? (
            <input
              className="w-full rounded border-2 pl-1 font-bold text-black outline-none focus:border-blue-500"
              id={tagId}
              {...register('label', { onChange: () => trigger('label') })}
              autoFocus
              onBlur={handleBlur}
            />
          ) : (
            <textarea
              className="w-full rounded border-2 p-1 font-bold text-black outline-none focus:border-blue-500"
              id={tagId}
              {...register('label', { onChange: () => trigger('label') })}
              autoFocus
              onBlur={handleBlur}
            />
          )}
        </div>
      </form>
    </div>
  );
};
