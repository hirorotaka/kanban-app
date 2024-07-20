import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Tag, TagList } from '../types/type';
import { BoardContext } from '../context/BoardContext';
import { useContext, useEffect } from 'react';

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
  editingTag: TagList | null;
  handleTagEditorCancel: () => void;
};

export const useTagNameEdit = ({
  tags,
  setTags,
  editingTag,
  handleTagEditorCancel,
}: UseTagNameInputProps) => {
  const { allTags, setAllTags, tagList, setTagList } =
    useContext(BoardContext)?.tag || {};

  if (!allTags || !setAllTags || !tagList || !setTagList) {
    throw new Error('allTags or setAllTags is not defined');
  }

  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    formState: { errors: editErrors },
    reset: editReset,
    setValue: editSetValue,
    setError: editSetError,
    trigger: editTrigger,
  } = useForm<FormValues>({
    defaultValues: { label: editingTag ? editingTag.name : '' },
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    editReset();
    if (editingTag) {
      editSetValue('label', editingTag.name);
    } else {
      editSetValue('label', '');
    }
  }, [editingTag?.name, editSetValue, editReset]);

  const checkDuplicate = (newTagName: string): boolean => {
    return [...tags, ...tagList].some(
      (tag) => tag.name.toLowerCase() === newTagName.toLowerCase()
    );
  };

  const handleDuplicate = () => {
    editSetError('label', {
      type: 'manual',
      message: '既に同じ名前のタグが存在します',
    });
  };

  const updateExistingTag = (newTagName: string) => {
    const updatedTagList = tagList.map((tag) =>
      tag.id === editingTag!.id ? { ...tag, name: newTagName } : tag
    );
    setTagList(updatedTagList);

    const updatedAllTags = allTags.map((tag) =>
      tag.tagListId === editingTag!.id ? { ...tag, name: newTagName } : tag
    );
    setAllTags(updatedAllTags);

    const updatedTags = tags.map((tag) =>
      tag.tagListId === editingTag!.id ? { ...tag, name: newTagName } : tag
    );
    setTags(updatedTags);

    handleTagEditorCancel();
  };

  const onEditSubmit = (data: FormValues) => {
    const newTagName = data.label.trim();

    if (checkDuplicate(newTagName)) {
      handleDuplicate();
      return;
    }

    updateExistingTag(newTagName);

    editReset();
  };

  return {
    editRegister,
    editHandleSubmit,
    editErrors,
    editTrigger,
    onEditSubmit,
  };
};
