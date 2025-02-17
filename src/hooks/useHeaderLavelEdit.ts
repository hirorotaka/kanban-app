import { useContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { NavItemContext } from '../context/NavItemContext';
import { NavItem } from '../types/type';

const validationMaxLength = 100;

const validationSchema = z.object({
  label: z
    .string()
    .transform((value) => value.trim()) // 先頭と末尾の空白を除去
    .refine(
      (value) => value.length > 0,
      '空白のみは入力はできません。空白で入力フォームから外れたら元の値に戻ります。'
    )
    .refine(
      (value) => value.length <= validationMaxLength,
      `1~${validationMaxLength}文字以内で入力してください`
    ),
});

// バリデーションスキーマから型を推論
export type FormValues = z.infer<typeof validationSchema>;

export type UseHeaderLavelEditProps = {
  selectedItem: NavItem | undefined;
};

export const useHeaderLavelEdit = ({
  selectedItem,
}: UseHeaderLavelEditProps) => {
  const { updateNavItem } = useContext(NavItemContext) || {};

  const [isEditMode, setIsEditMode] = useState(false);
  const [prevTitle, setPrevLabel] = useState(selectedItem?.label || '');

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

  useEffect(() => {
    if (selectedItem) {
      reset({ label: selectedItem.label });
      setPrevLabel(selectedItem.label);
    }
  }, [selectedItem, reset]);

  const handleUpdateNavItem = (label: string) => {
    if (!updateNavItem || !selectedItem) return;
    updateNavItem(selectedItem.id, { label: label });
    setPrevLabel(label);
  };

  const onSubmit = (data: FormValues) => {
    handleUpdateNavItem(data.label);
    setIsEditMode(false);
  };

  const handleTextareaChange = () => {
    const currentLabel = getValues('label');

    if (isValid && currentLabel !== prevTitle) {
      handleUpdateNavItem(currentLabel);
    } else if (!isValid) {
      setValue('label', prevTitle);
    }
    setIsEditMode(false);
    clearErrors('label');
  };

  const handleEditLabelClick = () => {
    setIsEditMode(true);
    clearErrors('label');
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleTextareaChange,
    trigger,
    isEditMode,
    handleEditLabelClick,
  };
};
