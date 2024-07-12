import { Form } from '../UI/Form/Form';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';
import { useHeader } from '../../hooks/useHeader';

export const Header = () => {
  const {
    selectedItem,
    editMode,
    inputId,
    handleClick,
    handleBlur,
    handleSubmit,
    onSubmit,
    register,
    trigger,
    errors,
  } = useHeader();

  if (!selectedItem) {
    return null;
  }

  return (
    <header className="bg-white px-8 py-4 text-gray-800 shadow">
      <div className="flex items-center">
        <span className="mr-2 text-2xl text-blue-500">{selectedItem.icon}</span>
        <div onClick={handleClick} className="flex grow items-center">
          {!editMode ? (
            <h1 className="text-2xl font-bold">{selectedItem.label}</h1>
          ) : (
            <>
              <Form
                formUi="w-[500px] text-xl"
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                trigger={trigger}
                errors={errors}
                handleBlur={handleBlur}
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
      </div>
    </header>
  );
};
