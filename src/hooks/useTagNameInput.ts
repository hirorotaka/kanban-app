import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { generateId } from '../utils/utils';
import { Tag, TagList } from '../types/type';
import { BoardContext } from '../context/BoardContext';
import { useContext } from 'react';

const validationMaxLength = 20;

const validationSchema = z.object({
  label: z
    .string()
    .transform((value) => value.trim()) // 先頭と末尾の空白を除去
    .refine((value) => value.length > 0, '文字無・空白のみは入力できません')
    .refine(
      (value) => value.length <= validationMaxLength,
      `1~${validationMaxLength}文字以内で入力してください`
    ),
});

export type FormValues = z.infer<typeof validationSchema>;

export type useTagNameInputProps = {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  taskId: string;
};

export const useTagNameInput = ({
  tags,
  setTags,
  taskId,
}: useTagNameInputProps) => {
  const { allTags, setAllTags, tagList, setTagList } =
    useContext(BoardContext)?.tag || {};

  if (!allTags || !setAllTags || !tagList || !setTagList) {
    throw new Error('allTags or setAllTags is not defined');
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    clearErrors,
    setError,
    trigger,
  } = useForm<FormValues>({
    defaultValues: { label: '' },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {
    const newTagName = data.label.trim();
    // 既に存在するタグと同じ単語かどうかチェック
    const isDuplicate = [...tags, ...tagList].some(
      (tag) => tag.name.toLowerCase() === newTagName.toLowerCase()
    );

    if (isDuplicate) {
      setError('label', {
        type: 'manual',
        message: '既に同じ名前のタグが存在します',
      });
      return;
    }

    const newTagList: TagList = {
      id: generateId(),
      name: newTagName,
      bgColor: 'bg-blue-300',
    };

    const newTag: Tag = {
      id: generateId(),
      name: newTagName,
      taskId,
      bgColor: 'bg-blue-300',
      tagListId: newTagList.id,
    };

    setTags([...tags, newTag]); // タスクのタグ一覧に新しいタグを追加
    setAllTags([...allTags, newTag]); // 全てのタグ一覧に新しいタグを追加
    setTagList([newTagList, ...tagList]); // タグ一覧の先頭に新しいタグを追加

    reset();
  };

  return {
    isValid,
    register,
    handleSubmit,
    errors,
    onSubmit,
    trigger,
    setValue,
    clearErrors,
  };
};
