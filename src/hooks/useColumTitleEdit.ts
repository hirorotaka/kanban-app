import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useColumnTitleEditProps } from '../types/type';

const validationMaxLength = 15;

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

export const useColumnTitleEdit = ({
  column,
  updateColumn,
}: useColumnTitleEditProps) => {
  const [editMode, setEditMode] = useState(false);
  const [prevTitle, setPrevLabel] = useState(column?.title || '');

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
    defaultValues: { label: column?.title || '' },
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (column) {
      reset({ label: column.title });
      setPrevLabel(column.title);
    }
  }, [column, reset]);

  const handleUpdateColumn = (label: string) => {
    if (!updateColumn || !column) return;
    updateColumn(column.id, { title: label });
    setPrevLabel(label);
  };

  const onSubmit = (data: FormValues) => {
    handleUpdateColumn(data.label);
    setEditMode(false);
  };

  const handleTextareaChange = () => {
    const currentLabel = getValues('label');

    if (isValid && currentLabel !== prevTitle) {
      handleUpdateColumn(currentLabel);
    } else if (!isValid) {
      setValue('label', prevTitle);
    }
    setEditMode(false);
    clearErrors('label');
  };

  const handleEditTitleClick = () => {
    setEditMode(true);
    clearErrors('label');
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleTextareaChange,
    trigger,
    editMode,
    handleEditTitleClick,
  };
};
