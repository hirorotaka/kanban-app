// CustomDatePickerHeader.tsx
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { IoCalendarClear, IoClose } from 'react-icons/io5';

type CustomDatePickerHeaderProps = ReactDatePickerCustomHeaderProps & {
  closeCalendar: () => void;
  clearDate: (e: React.MouseEvent) => void;
};

export const CustomDatePickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  closeCalendar,
  clearDate,
}: CustomDatePickerHeaderProps) => (
  <>
    <div className="flex justify-between">
      <button
        onClick={clearDate}
        className="ml-1 flex items-center justify-center rounded bg-red-500 px-2 py-1 text-xs text-white transition duration-300 ease-out hover:bg-red-600"
      >
        <IoCalendarClear size={16} className="mr-1" />
        日付をクリア
      </button>
      <button
        onClick={closeCalendar}
        className="p-1 text-white hover:text-gray-400 focus:outline-none"
      >
        <IoClose size={16} />
      </button>
    </div>
    <div className="flex items-center justify-between p-2 text-white">
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {'<'}
      </button>
      <span className="text-lg font-bold text-white">
        {format(date, 'yyyy年MM月', { locale: ja })}
      </span>
      <div className="flex items-center">
        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          {'>'}
        </button>
      </div>
    </div>
  </>
);
