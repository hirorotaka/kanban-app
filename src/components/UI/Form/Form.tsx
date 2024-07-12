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
  inputId: string;
};

export const Form = ({
  formUi,
  handleSubmit,
  onSubmit,
  register,
  trigger,
  handleBlur,
  inputId,
}: FormProps) => {
  return (
    <div className={`${formUi}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grow">
          <input
            className="w-full rounded border-2 pl-1 font-bold text-black outline-none focus:border-blue-500"
            id={inputId}
            {...register('label', { onChange: () => trigger('label') })}
            autoFocus
            onBlur={handleBlur}
          />
        </div>
      </form>
    </div>
  );
};
