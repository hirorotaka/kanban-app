import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';
import { useHeader } from '../../hooks/useHeader';
import { InputForm } from '../UI/Form/InputForm';

export const Header = () => {
  const {
    selectedItem,
    editMode,
    handleClick,
    handleTextareaChange,
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
    <header className="relative bg-white p-4 shadow-lg transition-shadow">
      <div className="flex items-center">
        <span className="mr-2 text-2xl text-blue-500">{selectedItem.icon}</span>
        <div onClick={handleClick} className="relative flex items-center">
          <h1 className="text-2xl font-bold">{selectedItem.label}</h1>
          {editMode && (
            <div className="animate-bounce-in absolute left-0 top-[80%] z-50 mt-1 rounded-lg border border-gray-300 bg-white p-1 text-gray-500 shadow-2xl shadow-gray-950">
              <InputForm
                formUi="w-[600px] text-base"
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                trigger={trigger}
                errors={errors}
                handleTextareaChange={handleTextareaChange}
              />
              {errors.label?.message && (
                <CustomErrorMessage message={errors.label.message} />
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
