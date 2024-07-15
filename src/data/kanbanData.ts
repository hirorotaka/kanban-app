import { Column, Task } from '../types/type';

export const defaultColumns: Column[] = [
  {
    id: 'Todo',
    title: 'Todo',
    navItemId: '5033751',
    bgColor: 'bg-red-500',
  },
  {
    id: 'Doing',
    title: 'Doing',
    navItemId: '5033751',
    bgColor: 'bg-blue-500',
  },
  {
    id: 'Done',
    title: 'Done',
    navItemId: '5033751',
    bgColor: 'bg-green-500',
  },
  {
    id: 'Todo1',
    title: 'Todo1',
    navItemId: '5033752',
    bgColor: 'bg-green-500',
  },
];

export const defaultTasks: Task[] = [
  {
    id: 1,
    columnId: 'Todo',
    content: '会議の準備',
  },
  {
    id: 2,
    columnId: 'Todo',
    content: 'プレゼンテーションの作成',
  },
  {
    id: 3,
    columnId: 'Todo',
    content: 'メールの返信',
  },
  {
    id: 4,
    columnId: 'Todo',
    content: '買い物リストの作成',
  },
  {
    id: 5,
    columnId: 'Todo',
    content: '歯医者の予約',
  },
  {
    id: 6,
    columnId: 'Doing',
    content: 'プロジェクト計画の立案',
  },
  {
    id: 7,
    columnId: 'Doing',
    content: 'コードのデバッグ',
  },
  {
    id: 8,
    columnId: 'Done',
    content: 'レポートの作成',
  },
  {
    id: 9,
    columnId: 'Done',
    content: '新しい技術の学習',
  },
  {
    id: 10,
    columnId: 'Done',
    content: 'チームミーティングの実施',
  },
  {
    id: 11,
    columnId: 'Done',
    content: 'バグの修正',
  },
  {
    id: 12,
    columnId: 'Done',
    content: 'クライアントとの電話会議',
  },
  {
    id: 13,
    columnId: 'Done',
    content: 'ドキュメントの更新',
  },
  {
    id: 14,
    columnId: 'Done',
    content: '週次レポートの提出',
  },
  {
    id: 15,
    columnId: 'Done',
    content: 'オフィス用品の注文',
  },
];
