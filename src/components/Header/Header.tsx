import { useContext, useState, useEffect } from 'react';
import { NavItemContext } from '../../context/NavItemContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '../UI/Form/Form';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';

// バリデーションスキーマの定義
const validationSchema = z.object({
  label: z
    .string()
    .min(1, '1~20文字以内で入力してください')
    .max(20, '1~20文字以内で入力してください'),
});

// バリデーションスキーマから型を推論
export type FormValues = z.infer<typeof validationSchema>;

export const Header = () => {
  const { navItems, navCheckId, updateNavItem } =
    useContext(NavItemContext) || {};
  const selectedItem = navItems?.find((item) => item.id === navCheckId);

  const [editMode, setEditMode] = useState(false);
  const [prevLabel, setPrevLabel] = useState(selectedItem?.label || '');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    clearErrors,
    getValues,
    trigger,
  } = useForm<FormValues>({
    defaultValues: { label: selectedItem?.label || '' },
    resolver: zodResolver(validationSchema),
  });

  const inputId = selectedItem?.id || '';

  useEffect(() => {
    if (selectedItem) {
      reset({ label: selectedItem.label });
      setPrevLabel(selectedItem.label);
    }
  }, [selectedItem, reset]);

  const handleUpdateNavItem = (label: string) => {
    if (!updateNavItem || !selectedItem) return;
    updateNavItem(selectedItem.id, label);
    setPrevLabel(label);
  };

  const onSubmit = (data: FormValues) => {
    handleUpdateNavItem(data.label);
    setEditMode(false);
  };

  const handleBlur = () => {
    const currentLabel = getValues('label');

    if (isValid && currentLabel !== prevLabel) {
      handleUpdateNavItem(currentLabel);
    } else if (!isValid) {
      setValue('label', prevLabel);
    }
    setEditMode(false);
  };

  const handleClick = () => {
    setEditMode(true);
    clearErrors('label');
  };

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
                inputId={inputId}
              />
              {errors.label?.message && (
                <CustomErrorMessage
                  message={errors.label.message}
                  inputId={inputId}
                />
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
