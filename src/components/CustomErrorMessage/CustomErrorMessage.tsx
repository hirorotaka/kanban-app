import { IoAlertCircleOutline } from 'react-icons/io5';
import { ErrorMessageProps } from '../../types/type';

export const CustomErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="animate-bounce-in z-50">
      <div className="mt-1 rounded-md bg-orange-100 px-3 py-1 text-sm text-orange-700 shadow-2xl">
        <span className="flex items-center font-bold">
          <IoAlertCircleOutline className="mr-2 size-5" />
          {message}
        </span>
      </div>
    </div>
  );
};
