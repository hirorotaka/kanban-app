import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useColumnContainerProps } from '../types/type';
import { useEffect, useState } from 'react';

const varidationMaxlength = 15;

// バリデーションスキーマの定義
const validationSchema = z.object({
  label: z
    .string()
    .min(1, `1~${varidationMaxlength}文字以内で入力してください`)
    .max(
      varidationMaxlength,
      `1~${varidationMaxlength}文字以内で入力してください`
    )
    .refine((value) => value.trim().length > 0, '空白文字のみは入力できません'),
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
    watch,
  } = useForm<FormValues>({
    defaultValues: { label: column?.title || '' },
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (
        name === 'label' &&
        value.label &&
        value.label.length >= varidationMaxlength
      ) {
        setValue('label', value.label.slice(0, varidationMaxlength));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const inputId = column?.id || '';

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
    inputId,
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
