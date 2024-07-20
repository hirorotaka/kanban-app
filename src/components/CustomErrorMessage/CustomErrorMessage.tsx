import { ErrorMessageProps } from '../../types/type';

export const CustomErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="animate-bounce-in z-50">
      <div className="mt-1 rounded-md bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 shadow-2xl">
        {message}
      </div>
    </div>
  );
};
