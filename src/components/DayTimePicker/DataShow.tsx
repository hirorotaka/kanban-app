type DataShowProps = {
  taskStartTime: string | undefined;
  taskEndTime: string | undefined;
  setIsDateEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DataShow = ({
  taskStartTime,
  taskEndTime,
  setIsDateEdit,
}: DataShowProps) => {
  return (
    <div onClick={() => setIsDateEdit(true)}>
      {taskStartTime || taskEndTime ? (
        <span className="cursor-pointer text-sm text-gray-500 transition duration-300 ease-out hover:text-gray-400">
          期限：{taskStartTime} - {taskEndTime}
        </span>
      ) : (
        <span className="cursor-pointer text-sm text-gray-300 transition duration-300 ease-out hover:text-gray-400">
          期限 未設定
        </span>
      )}
    </div>
  );
};
