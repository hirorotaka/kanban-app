import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { NavItemContext } from '../context/NavItemContext';

// バリデーションスキーマの定義
const validationSchema = z.object({
  label: z
    .string()
    .min(1, '1~20文字以内で入力してください')
    .max(20, '1~20文字以内で入力してください'),
});

// バリデーションスキーマから型を推論
export type FormValues = z.infer<typeof validationSchema>;

export const useHeader = () => {
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

  return {
    selectedItem,
    editMode,
    inputId,
    errors,
    isValid,
    register,
    trigger,
    handleSubmit,
    onSubmit,
    handleBlur,
    handleClick,
  };
};
