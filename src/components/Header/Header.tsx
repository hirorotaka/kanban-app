import { useContext, useState, useEffect } from 'react';
import { NavItemContext } from '../../context/NavItemContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormErrorMessage } from '../ErrorMessage/FormErrorMessage';

// バリデーションスキーマの定義
const validationSchema = z.object({
  label: z
    .string()
    .min(1, '1~20文字以内で入力してください')
    .max(20, '1~20文字以内で入力してください'),
});

// バリデーションスキーマから型を推論
type FormValues = z.infer<typeof validationSchema>;

export const Header = () => {
  // NavItemContextからnavItems, navCheckId, updateNavItemを取得
  const { navItems, navCheckId, updateNavItem } =
    useContext(NavItemContext) || {};
  // 選択されたアイテムを取得
  const selectedItem = navItems?.find((item) => item.id === navCheckId);

  // 編集モードの状態を管理
  const [editMode, setEditMode] = useState(false);
  // 前回のラベルの状態を管理
  const [prevLabel, setPrevLabel] = useState(selectedItem?.label || '');

  // useFormフックを使用してフォームの状態を管理
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

  // 選択されたアイテムが変更された場合、フォームの状態をリセット
  useEffect(() => {
    if (selectedItem) {
      reset({ label: selectedItem.label });
      setPrevLabel(selectedItem.label);
    }
  }, [selectedItem, reset]);

  // ナビゲーションアイテムを更新する関数
  const handleUpdateNavItem = (label: string) => {
    if (!updateNavItem || !selectedItem) return;
    updateNavItem(selectedItem.id, label);
    setPrevLabel(label);
  };

  // フォームの送信時の処理
  const onSubmit = (data: FormValues) => {
    handleUpdateNavItem(data.label);
    setEditMode(false);
  };

  // フォーカスが外れたときの処理
  const handleBlur = () => {
    const currentLabel = getValues('label');
    if (isValid && currentLabel !== prevLabel) {
      handleUpdateNavItem(currentLabel);
    } else if (!isValid) {
      setValue('label', prevLabel);
    }
    setEditMode(false);
  };

  // クリック時の処理
  const handleClick = () => {
    setEditMode(true);
    clearErrors('label');
  };

  // 選択されたアイテムがない場合、nullを返す
  if (!selectedItem) {
    return null;
  }

  return (
    <header className="bg-white px-8 py-4 text-gray-800 shadow">
      <div className="flex items-center">
        {/* 選択されたアイテムのアイコンを表示 */}
        <span className="mr-2 text-2xl text-blue-500">{selectedItem.icon}</span>
        <div onClick={handleClick} className="flex min-h-10 grow items-center">
          {!editMode ? (
            // 編集モードでない場合、選択されたアイテムのラベルを表示
            <h1 className="text-2xl font-bold">{selectedItem.label}</h1>
          ) : (
            // 編集モードの場合、フォームを表示
            <div className="relative w-[500px]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center"
              >
                <div className="relative grow">
                  <input
                    className="w-full rounded border-2 pl-1 text-2xl font-bold text-black outline-none focus:border-blue-500"
                    id="name"
                    {...register('label', { onChange: () => trigger('label') })}
                    autoFocus
                    onBlur={handleBlur}
                  />
                  {errors.label?.message && (
                    <FormErrorMessage
                      message={errors.label.message}
                      inputId="name"
                    />
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
