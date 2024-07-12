import { useRef, useEffect, useState } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { ErrorMessageProps } from '../../types/type';

export const CustomErrorMessage = ({ message, inputId }: ErrorMessageProps) => {
  const [position, setPosition] = useState({ top: 0, right: 0, width: 0 });
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      const inputElement = document.getElementById(inputId);
      if (inputElement && messageRef.current) {
        const rect = inputElement.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY,
          right: window.innerWidth - rect.right,
          width: rect.width,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [inputId]);

  return (
    <div
      ref={messageRef}
      className="animate-bounce-in fixed z-10"
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`,
        width: `${position.width}px`,
      }}
    >
      <div className="mt-1 rounded-md bg-orange-200 px-3 py-1 text-sm text-orange-700 shadow-2xl">
        <span className="flex items-center font-bold">
          <IoAlertCircleOutline className="mr-2 size-5" />
          {message}
        </span>
      </div>
    </div>
  );
};
