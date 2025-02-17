import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTaskContentEditProps } from '../types/type';

const validationMaxLength = 500;

const validationSchema = z.object({
  label: z
    .string()
    .transform((value) => value.trim()) // 先頭と末尾の空白を除去
    .refine(
      (value) => value.length > 0,
      '空白のみの入力はできません。空白で入力フォームから外れたら元の値に戻ります。'
    )
    .refine(
      (value) => value.length <= validationMaxLength,
      `1~${validationMaxLength}文字以内で入力してください`
    ),
});

// バリデーションスキーマから型を推論
export type FormValues = z.infer<typeof validationSchema>;

export const useTaskContentEdit = ({
  task,
  updateTask,
}: useTaskContentEditProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [prevTitle, setPrevLabel] = useState(task?.content || '');

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
    defaultValues: { label: task?.content || '' },
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (task) {
      reset({ label: task.content });
      setPrevLabel(task.content);
    }
  }, [task, reset]);

  const handleUpdateTask = (label: string) => {
    if (!updateTask || !task) return;
    updateTask(task.id, { content: label });
    setPrevLabel(label);
  };

  const onSubmit = (data: FormValues) => {
    handleUpdateTask(data.label);
    setIsEditMode(false);
  };

  const handleTextareaChange = () => {
    const currentLabel = getValues('label');

    if (isValid && currentLabel !== prevTitle) {
      handleUpdateTask(currentLabel);
    } else if (!isValid) {
      setValue('label', prevTitle);
    }
    setIsEditMode(false);
    clearErrors('label');
  };

  const handleEditContentClick = () => {
    setIsEditMode(true);
    clearErrors('label');
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setValue('label', prevTitle);
  };

  return {
    isValid,
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleTextareaChange,
    trigger,
    isEditMode,
    handleCancelClick,
    handleEditContentClick,
  };
};
