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
  tagId: string;
  inputType: 'input' | 'textarea';
  handleTextareaChange: () => void;
};

export const Form = ({
  formUi,
  handleSubmit,
  onSubmit,
  register,
  trigger,
  tagId,
  inputType,
  handleTextareaChange,
}: FormProps) => {
  return (
    <div className={`${formUi}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grow">
          {inputType === 'input' ? (
            <input
              className="w-full rounded border-2  bg-blue-100 font-bold text-black outline-none focus:border-blue-500"
              id={tagId}
              {...register('label', { onChange: () => trigger('label') })}
              autoFocus
              onBlur={handleTextareaChange}
            />
          ) : (
            <textarea
              className="w-full resize-none overflow-hidden rounded
              border-2 p-1 font-bold text-black outline-none focus:border-blue-500"
              id={tagId}
              {...register('label', { onChange: () => trigger('label') })}
              autoFocus
              onBlur={handleTextareaChange}
              onKeyDown={(e) => {
                const textarea = e.target as HTMLTextAreaElement;
                const currentRow = textarea.value
                  .slice(0, textarea.selectionStart)
                  .split('\n').length;

                if (e.key === 'Enter' && currentRow >= 2) {
                  e.preventDefault();
                }

                if (e.key === 'Enter' && e.shiftKey) {
                  handleTextareaChange();
                }
              }}
              rows={2}
            />
          )}
        </div>
      </form>
    </div>
  );
};
