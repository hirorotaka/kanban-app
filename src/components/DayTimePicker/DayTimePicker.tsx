import React, { useState } from 'react';
import { Task } from '../../types/type';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isToday, isAfter } from 'date-fns';
import { ja } from 'date-fns/locale';
registerLocale('ja', ja);
import './DayTimePicker.css';

import { CustomDatePickerHeader } from './CustomDatePickerHeader';

export type DayTimePickerProps = {
  task: Task;
  updateTask?: (id: string, updates: Partial<Task>) => void;
};

export const DayTimePicker = ({ task, updateTask }: DayTimePickerProps) => {
  const [endDate, setEndDate] = useState<Date | null>(task.endDate || null);
  const [isOpen, setIsOpen] = useState(false);

  const getDueDateColor = (date: Date | null) => {
    if (!date) return '';
    if (isToday(date)) return 'text-orange-500';
    if (isAfter(new Date(), date)) return 'text-red-500';
    return 'text-gray-700';
  };

  const handleChange = (e: Date | null) => {
    setEndDate(e);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
    updateTask && updateTask(task.id, { endDate: endDate });
  };

  const closeCalendar = () => {
    setIsOpen(false);
    updateTask && updateTask(task.id, { endDate: endDate });
  };

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEndDate(null);
    updateTask && updateTask(task.id, { endDate: null });
  };

  return (
    <>
      <div className="text-sm">
        <button onClick={handleClick}>
          {endDate ? (
            <span
              className={`transition duration-300 ease-out hover:opacity-70 ${getDueDateColor(endDate)}`}
            >
              <span>期限：</span>
              {format(endDate, 'yyyy/MM/dd')}
            </span>
          ) : (
            <span className="text-gray-300 transition duration-300 ease-out hover:text-gray-500">
              期限：未設定
            </span>
          )}
        </button>

        {isOpen && (
          <DatePicker
            todayButton="今日を選択"
            selected={endDate}
            onChange={handleChange}
            inline
            locale="ja"
            dateFormat="yyyy/MM/dd"
            minDate={new Date()}
            calendarClassName="shadow-2xl rounded-md text-base"
            onClickOutside={handleClickOutside}
            renderCustomHeader={(props) => (
              <CustomDatePickerHeader
                {...props}
                closeCalendar={closeCalendar}
                clearDate={clearDate}
              />
            )}
          />
        )}
      </div>
    </>
  );
};
