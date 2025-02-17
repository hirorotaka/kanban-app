import { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { BoardContext } from '../context/BoardContext';
import { generateId } from '../utils/utils';
import { Tag, TagList } from '../types/type';

const validationMaxLength = 20;

const validationSchema = z.object({
  label: z
    .string()
    .transform((value) => value.trim())
    .refine((value) => value.length > 0, '文字無・空白のみの\n入力はできません')
    .refine(
      (value) => value.length <= validationMaxLength,
      `1~${validationMaxLength}文字以内で入力してください`
    ),
});

export type FormValues = z.infer<typeof validationSchema>;

type UseTagNameInputProps = {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  taskId: string;
};

export const useTagNameInput = ({
  tags,
  setTags,
  taskId,
}: UseTagNameInputProps) => {
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
    getValues,
  } = useForm<FormValues>({
    defaultValues: { label: '' },
    resolver: zodResolver(validationSchema),
  });

  const checkDuplicate = (newTagName: string): boolean => {
    return [...tags, ...tagList].some(
      (tag) => tag.name.toLowerCase() === newTagName.toLowerCase()
    );
  };

  const handleDuplicate = () => {
    setError('label', {
      type: 'manual',
      message: '既に同じ名前のタグが存在します',
    });
  };

  const createNewTag = (newTagName: string) => {
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

    setTags([...tags, newTag]);
    setAllTags([...allTags, newTag]);
    setTagList([newTagList, ...tagList]);
  };

  const onSubmit = (data: FormValues) => {
    const newTagName = data.label.trim();

    if (checkDuplicate(newTagName)) {
      handleDuplicate();
      return;
    }
    createNewTag(newTagName);
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
    getValues,
  };
};
