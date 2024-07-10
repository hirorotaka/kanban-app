import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';

export const BoardDelete = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 px-4 py-12">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-center">
          <RiDeleteBin6Line className="text-6xl text-red-500" />
        </div>
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
          ボードが削除されました
        </h1>
        <div className="text-center">
          <Link
            to="/"
            className="inline-block rounded-md bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition duration-200 hover:bg-blue-600"
          >
            ホームへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
};
