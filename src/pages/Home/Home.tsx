export const Home = () => {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/thumbnail.png')" }}
      ></div>
      <div className="relative z-10 max-w-4xl px-8">
        <h1 className="mb-8 text-center text-8xl font-bold">ようこそ！</h1>
        <p className="mb-12 text-center text-3xl">
          このアプリケーションでは、カンバンボードを使ってタスク管理ができます。
          サイドバーの「ボードを追加」ボタンから、新しいボードを作成してみましょう！
        </p>
      </div>
    </div>
  );
};
