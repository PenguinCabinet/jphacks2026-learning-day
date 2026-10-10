// TechGrow モックデータ・型定義

export type Period = "3M" | "6M" | "1Y";

export const growthData: Record<
  Period,
  { label: string; commits: number; score: number }[]
> = {
  "3M": [
    { label: "8月", commits: 18, score: 52 },
    { label: "9月", commits: 26, score: 58 },
    { label: "10月", commits: 34, score: 66 },
    { label: "11月", commits: 41, score: 74 },
  ],
  "6M": [
    { label: "6月", commits: 9, score: 38 },
    { label: "7月", commits: 14, score: 44 },
    { label: "8月", commits: 18, score: 52 },
    { label: "9月", commits: 26, score: 58 },
    { label: "10月", commits: 34, score: 66 },
    { label: "11月", commits: 41, score: 74 },
  ],
  "1Y": [
    { label: "12月", commits: 4, score: 22 },
    { label: "2月", commits: 7, score: 28 },
    { label: "4月", commits: 11, score: 35 },
    { label: "6月", commits: 9, score: 38 },
    { label: "8月", commits: 18, score: 52 },
    { label: "10月", commits: 34, score: 66 },
    { label: "11月", commits: 41, score: 74 },
  ],
};

export type Skill = {
  name: string;
  level: number; // 0-100
  delta: number; // 3ヶ月前との差
  category: string;
  color: string;
};

export const skills: Skill[] = [
  { name: "TypeScript", level: 82, delta: 14, category: "フロントエンド", color: "bg-blue-500" },
  { name: "React / Next.js", level: 78, delta: 18, category: "フロントエンド", color: "bg-cyan-500" },
  { name: "Python", level: 64, delta: 9, category: "バックエンド", color: "bg-emerald-500" },
  { name: "SQL / DB設計", level: 48, delta: 6, category: "データベース", color: "bg-amber-500" },
  { name: "Docker / CI", level: 35, delta: 12, category: "インフラ", color: "bg-violet-500" },
  { name: "テスト", level: 28, delta: 4, category: "品質", color: "bg-rose-500" },
];

export const radar = [
  { axis: "フロント", value: 80, prev: 62 },
  { axis: "バックエンド", value: 64, prev: 55 },
  { axis: "インフラ", value: 35, prev: 23 },
  { axis: "DB", value: 48, prev: 42 },
  { axis: "テスト", value: 28, prev: 24 },
  { axis: "AI活用", value: 58, prev: 30 },
];

export type TimelineItem = {
  id: number;
  date: string;
  title: string;
  detail: string;
  tags: string[];
  kind: "github" | "study" | "ai";
};

export const initialTimeline: TimelineItem[] = [
  {
    id: 1,
    date: "2026-10-08",
    title: "Next.jsで認証機能を実装・PRマージ",
    detail: "NextAuth.js + Prismaでログインを実装。レビュー指摘のN+1を修正し、クエリを40%削減。",
    tags: ["Next.js", "Prisma", "認証"],
    kind: "github",
  },
  {
    id: 2,
    date: "2026-09-28",
    title: "卒研：推薦モデルの精度が0.71→0.78に改善",
    detail: "特徴量エンジニアリングと交差検証を導入。実験ノートを5本記録。",
    tags: ["Python", "機械学習"],
    kind: "study",
  },
  {
    id: 3,
    date: "2026-09-12",
    title: "AI分析：バックエンドの型設計が成長領域に",
    detail: "any型の使用率が32%→11%に減少。Zodによるバリデーションが定着。",
    tags: ["TypeScript", "設計"],
    kind: "ai",
  },
  {
    id: 4,
    date: "2026-08-20",
    title: "Dockerで開発環境をコンテナ化",
    detail: "docker-composeでDB・API・フロントを一括起動。READMEに手順を整備。",
    tags: ["Docker", "インフラ"],
    kind: "github",
  },
];

export const strengths = [
  {
    title: "継続的なアウトプット",
    body: "直近90日のコミットは前期間比 +62%。週3回以上のペースが定着し、学習の習慣化に成功しています。",
  },
  {
    title: "型安全な実装が定着",
    body: "TypeScriptの習得度が82点に到達。any型率の低下とテスト追加から、保守性への意識が育っています。",
  },
  {
    title: "実装→検証のサイクルが速い",
    body: "個人開発で企画からデプロイまでを2週間で完走。卒研の実験管理にも応用できています。",
  },
];

export const gaps = [
  { skill: "テスト", score: 28, comment: "単体テストのカバレッジが低め。Vitest + Testing Libraryから着手がおすすめ。" },
  { skill: "Docker / CI", score: 35, comment: "デプロイは手動が中心。GitHub Actionsでの自動化が次の伸びしろ。" },
  { skill: "SQL / DB設計", score: 48, comment: "インデックス設計とER図の経験を積むと卒研にも直結します。" },
];

export const roadmap = [
  { week: "Week 1-2", task: "Vitestで既存機能に単体テストを10件追加する", tag: "テスト" },
  { week: "Week 3-4", task: "GitHub ActionsでLint・Test・Previewデプロイを自動化", tag: "CI/CD" },
  { week: "Week 5-6", task: "卒研DBのER図を描き、N+1とインデックスを見直す", tag: "DB設計" },
];

// GitHub風草（7行 × 20列）
export function grassSeed(): number[][] {
  const base = [
    [1, 2, 0, 3, 2, 1, 4, 3, 2, 0, 1, 2, 5, 3, 4, 2, 3, 4, 5, 4],
    [0, 1, 2, 1, 3, 2, 2, 4, 1, 2, 0, 3, 2, 4, 3, 5, 2, 3, 4, 5],
    [2, 0, 1, 2, 1, 3, 3, 1, 4, 1, 2, 1, 3, 2, 5, 3, 4, 2, 5, 3],
    [1, 3, 2, 0, 2, 1, 4, 2, 3, 3, 1, 4, 1, 5, 2, 4, 3, 5, 3, 4],
    [0, 2, 3, 1, 4, 2, 1, 3, 2, 4, 3, 2, 4, 3, 4, 2, 5, 4, 2, 5],
    [2, 1, 0, 2, 1, 4, 2, 5, 1, 2, 4, 3, 2, 4, 3, 5, 4, 3, 5, 4],
    [1, 0, 2, 3, 2, 1, 3, 2, 4, 1, 2, 5, 3, 2, 5, 4, 3, 5, 4, 5],
  ];
  return base;
}
