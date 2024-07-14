import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useColumnContainerProps } from '../types/type';
import { useEffect, useState } from 'react';

const validationMaxLength = 15;

const validationSchema = z.object({
  label: z
    .string()
    .transform((value) => value.trim()) // 先頭と末尾の空白を除去
    .refine((value) => value.length > 0, '空白文字のみは入力できません')
    .refine(
      (value) => value.length <= validationMaxLength,
      `1~${validationMaxLength}文字以内で入力してください`
    ),
});

// バリデーションスキーマから型を推論
export type FormValues = z.infer<typeof validationSchema>;

export const useColumnContainer = ({
  column,
  updateColumn,
}: useColumnContainerProps) => {
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
    updateColumn(column.id, label);
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

  const handleClick = () => {
    setEditMode(true);
    clearErrors('label');
  };

  return {
    column,
    editMode,
    setEditMode,
    errors,
    isValid,
    register,
    trigger,
    handleSubmit,
    onSubmit,
    handleTextareaChange,
    handleClick,
  };
};
