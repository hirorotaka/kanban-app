import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-lg bg-white px-4 py-8 shadow-md">
        <h1 className="mb-4 text-4xl font-bold text-blue-500">404</h1>
        <p className="mb-6 text-xl text-gray-800">
          お探しのページは存在しません。
        </p>
        <Link
          to="/"
          className="inline-block rounded-md bg-blue-500 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-600"
        >
          ホームへ戻る
        </Link>
      </div>
    </div>
  );
};
