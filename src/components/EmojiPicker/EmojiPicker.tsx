import { useEffect, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { EmojiPickerProps, EmojiSelectEvent } from '../../types/type';

export const EmojiPicker = ({ icon, onChange }: EmojiPickerProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [isShowPicker, setIsShowPicker] = useState<boolean>(false);

  const selectEmoji = (e: EmojiSelectEvent) => {
    const emojiCode = e.unified.split('-');
    const codesArray: number[] = emojiCode.map((el) => parseInt(el, 16));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    setSelectedEmoji(emoji);
    onChange(emoji);
  };

  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  return (
    <span className="relative">
      <span
        onClick={() => setIsShowPicker(!isShowPicker)}
        className="mr-2 cursor-pointer text-center text-2xl text-blue-500"
      >
        {selectedEmoji}
      </span>
      <div
        className={`absolute left-0 z-10 ${isShowPicker ? 'block' : 'hidden'}`}
      >
        <Picker data={data} onEmojiSelect={selectEmoji} />
      </div>
    </span>
  );
};
