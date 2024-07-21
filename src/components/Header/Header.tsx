import { useHeader } from '../../hooks/useHeader';
import { EmojiPicker } from '../EmojiPicker/EmojiPicker';
import { InputHeaderForm } from '../UI/Form/InputHederForm';
import { useHeaderLavelEdit } from '../../hooks/useHeaderLavelEdit';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';

export const Header = () => {
  const { selectedItem, onIconChange, icon } = useHeader();

  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleTextareaChange,
    trigger,
    isEditMode,
    handleEditLabelClick,
  } = useHeaderLavelEdit({ selectedItem });

  if (!selectedItem) {
    return null;
  }

  return (
    <header className="bg-white p-4 shadow-lg transition-shadow">
      <div className="flex h-8 items-baseline">
        <EmojiPicker icon={icon} onChange={onIconChange} />
        {isEditMode ? (
          <div className="w-1/2">
            <InputHeaderForm
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              handleTextareaChange={handleTextareaChange}
              trigger={trigger}
            />
            {errors.label?.message && (
              <CustomErrorMessage message={errors.label.message} />
            )}
          </div>
        ) : (
          <span
            onClick={handleEditLabelClick}
            className="cursor-pointer text-2xl font-bold transition duration-300 ease-in-out hover:text-gray-700"
          >
            {selectedItem.label}
          </span>
        )}
      </div>
    </header>
  );
};
