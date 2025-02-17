import { Column, TagList, Task } from '../types/type';

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

// defaultColumns と initialTagList は変更なし

export const defaultTasks: Task[] = [
  {
    id: '1',
    columnId: 'Todo',
    content: '会議の準備',
    endDate: new Date('2025-04-02'),
  },
  {
    id: '2',
    columnId: 'Todo',
    content: 'プレゼンテーションの作成',
    endDate: new Date('2025-02-04'),
  },
  {
    id: '3',
    columnId: 'Todo',
    content: 'メールの返信',
  },
  {
    id: '4',
    columnId: 'Todo',
    content: '買い物リストの作成',
  },
  {
    id: '5',
    columnId: 'Todo',
    content: '歯医者の予約',
    endDate: new Date('2025-03-10'),
  },
  {
    id: '6',
    columnId: 'Doing',
    content: 'プロジェクト計画の立案',
    endDate: new Date('2025-03-12'),
  },
  {
    id: '7',
    columnId: 'Doing',
    content: 'コードのデバッグ',
    endDate: new Date('2025-03-14'),
  },
  {
    id: '8',
    columnId: 'Done',
    content: 'レポートの作成',
    endDate: new Date('2025-03-16'),
  },
  {
    id: '9',
    columnId: 'Done',
    content: '新しい技術の学習',
    endDate: new Date('2025-03-18'),
  },
  {
    id: '10',
    columnId: 'Done',
    content: 'チームミーティングの実施',
    endDate: new Date('2025-03-20'),
  },
  {
    id: '11',
    columnId: 'Done',
    content: 'バグの修正',
    endDate: new Date('2025-03-22'),
  },
  {
    id: '12',
    columnId: 'Done',
    content: 'クライアントとの電話会議',
    endDate: new Date('2025-03-24'),
  },
  {
    id: '13',
    columnId: 'Done',
    content: 'ドキュメントの更新',
    endDate: new Date('2025-03-26'),
  },
  {
    id: '14',
    columnId: 'Done',
    content: '週次レポートの提出',
    endDate: new Date('2025-03-28'),
  },
  {
    id: '15',
    columnId: 'Done',
    content: 'オフィス用品の注文',
    endDate: new Date('2025-03-30'),
  },
];

export const initialTagList: TagList[] = [
  {
    id: '1',
    name: '重要',
    bgColor: 'bg-yellow-200',
  },
  {
    id: '2',
    name: '学習',
    bgColor: 'bg-orange-200',
  },
  { id: '3', name: '勉強', bgColor: 'bg-teal-200' },
  {
    id: '4',
    name: '緊急度 高',
    bgColor: 'bg-red-200',
  },
  {
    id: '5',
    name: '緊急度 中',
    bgColor: 'bg-amber-200',
  },
  {
    id: '6',
    name: '緊急度 低',
    bgColor: 'bg-sky-200',
  },
];
