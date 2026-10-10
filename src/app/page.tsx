"use client";

import { useMemo, useState } from "react";

// ---- モック ----
const kpis = [
  { icon: "◷", iconBg: "bg-emerald-50 text-emerald-600", value: "32.5", unit: "時間", label: "今月の学習時間", delta: "▲ 12% 前月比", deltaCls: "text-emerald-600" },
  { icon: "▶", iconBg: "bg-blue-50 text-blue-600", value: "48", unit: "", label: "今月のコミット", delta: "▲ 8% 前月比", deltaCls: "text-emerald-600" },
  { icon: "▣", iconBg: "bg-violet-50 text-violet-600", value: "6", unit: "", label: "習得中の技術", delta: "▲ 2 新規", deltaCls: "text-emerald-600" },
  { icon: "⚑", iconBg: "bg-amber-50 text-amber-600", value: "18", unit: "日間", label: "継続学習", delta: "▲ 3日 更新中", deltaCls: "text-emerald-600" },
];

const series = {
  frontend: [22, 30, 38, 45, 55, 63, 72],
  backend: [15, 22, 28, 34, 40, 48, 55],
  infra: [8, 12, 18, 24, 30, 36, 42],
};
const months = ["8月", "9月", "10月", "11月", "12月", "1月", "2月"];

const timelineInit = [
  { date: "08.10", color: "bg-blue-500", title: "Python基礎コースを修了", desc: "50時間の学習・演習課題を完走" },
  { date: "08.05", color: "bg-cyan-400", title: "初の個人開発アプリを公開", desc: "React + FirebaseでTODOアプリをリリース" },
  { date: "08.01", color: "bg-orange-400", title: "GitHubで初コミット・初PRを体験", desc: "ブランチ運用とレビューを学ぶ" },
];

const skillBars = [
  { icon: "🐍", name: "Python", desc: "コンフォートゾーンを抜け出す挑戦", pct: 78, bar: "bg-blue-500" },
  { icon: "⚛", name: "React", desc: "コンポーネント設計を学習中", pct: 62, bar: "bg-cyan-400" },
  { icon: "🗄", name: "DB", desc: "SQLの基礎をマスター", pct: 45, bar: "bg-orange-400" },
];

const repos = [
  { name: "techgrow-app", meta: "12 commits", date: "2日前", dot: "bg-emerald-500" },
  { name: "sotsuken-note", meta: "8 commits", date: "5日前", dot: "bg-blue-500" },
  { name: "portfolio", meta: "5 commits", date: "1週間前", dot: "bg-orange-400" },
];

const nav = [
  { icon: "⌂", label: "ダッシュボード", active: true },
  { icon: "◈", label: "スキル分析", active: false },
  { icon: "☰", label: "学習タイムライン", active: false },
  { icon: "✎", label: "学習記録", active: false, badge: "3" },
  { icon: "✦", label: "AIからの提案", active: false },
];

function MiniLineChart() {
  const W = 560, H = 190, PAD = 28;
  const max = 80;
  const x = (i: number) => PAD + (i * (W - PAD * 2)) / (months.length - 1);
  const y = (v: number) => H - PAD - (v / max) * (H - PAD * 2);
  const path = (arr: number[]) => arr.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[20, 40, 60, 80].map((v) => (
        <g key={v}>
          <line x1={PAD} x2={W - 10} y1={y(v)} y2={y(v)} stroke="#eef0ee" />
          <text x={2} y={y(v) + 4} fontSize={10} fill="#a3a8a3">{v}%</text>
        </g>
      ))}
      {[
        { d: series.frontend, c: "#10b981" },
        { d: series.backend, c: "#3b82f6" },
        { d: series.infra, c: "#f59e0b" },
      ].map((s, k) => (
        <g key={k}>
          <path d={path(s.d)} fill="none" stroke={s.c} strokeWidth={2.5} strokeLinecap="round" />
          {s.d.map((v, i) => (
            <circle key={i} cx={x(i)} cy={y(v)} r={3} fill={s.c} stroke="#fff" strokeWidth={1.5} />
          ))}
        </g>
      ))}
      {months.map((m, i) => (
        <text key={m} x={x(i)} y={H - 6} textAnchor="middle" fontSize={10} fill="#8a8f8a">{m}</text>
      ))}
    </svg>
  );
}

function Grass() {
  const rows = useMemo(() => {
    const preset = [3, 1, 4, 2, 5, 2, 4, 3, 1, 2, 5, 3, 4, 2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4];
    return Array.from({ length: 7 }, (_, r) =>
      Array.from({ length: 24 }, (_, c) => (preset[(r * 7 + c) % preset.length] + r + c) % 6)
    );
  }, []);
  const cls = ["bg-[#ebedeb]", "bg-emerald-100", "bg-emerald-200", "bg-emerald-300", "bg-emerald-400", "bg-emerald-600"];
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
      {rows.map((row, r) => row.map((v, c) => (
        <div key={`${r}-${c}`} className={`h-[11px] w-[11px] rounded-[3px] ${cls[v]}`} />
      )))}
    </div>
  );
}

export default function Home() {
  const [timeline, setTimeline] = useState(timelineInit);
  const [open, setOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");

  const addRecord = () => {
    if (!formTitle.trim()) return;
    setTimeline((t) => [
      { date: "02.14", color: "bg-emerald-500", title: formTitle.trim(), desc: formDesc.trim() || "学習記録を追加" },
      ...t,
    ]);
    setFormTitle("");
    setFormDesc("");
    setOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f4f6f4] text-zinc-800">
      {/* ===== サイドバー ===== */}
      <aside className="hidden w-56 shrink-0 flex-col bg-white px-4 py-5 md:flex">
        <div className="flex items-center gap-2 px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-black text-white">T</div>
          <p className="text-[15px] font-extrabold tracking-tight">TechGrow</p>
        </div>
        <nav className="mt-6 space-y-1">
          {nav.map((n) => (
            <a
              key={n.label}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold ${
                n.active ? "bg-emerald-50 text-emerald-700" : "text-zinc-500 hover:bg-zinc-50"
              }`}
            >
              <span className="w-5 text-center">{n.icon}</span>
              {n.label}
              {n.badge && (
                <span className="ml-auto rounded-full bg-emerald-500 px-1.5 text-[10px] font-bold text-white">{n.badge}</span>
              )}
            </a>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-emerald-50/70 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">↗</div>
          <p className="mt-2 text-[12px] font-bold leading-5">小さな一歩が、<br />大きな自信に。</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">T</div>
            <p className="text-[11px] text-zinc-500">継続を応援しています</p>
          </div>
        </div>
      </aside>

      {/* ===== メイン ===== */}
      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6">
        {/* ヘッダー */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium text-zinc-400">ダッシュボード</p>
            <h1 className="mt-0.5 text-xl font-extrabold tracking-tight sm:text-[22px]">
              あなたの成長を、見えるかたちに。
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-500 shadow-sm ring-1 ring-zinc-100">
              2026年2月 ▾
            </span>
            <button className="rounded-full bg-zinc-200/70 p-2 text-sm" aria-label="通知">🔔</button>
            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-emerald-500 px-4 py-2 text-[13px] font-bold text-white shadow-sm hover:bg-emerald-600"
            >
              ＋ 学習を記録
            </button>
          </div>
        </div>

        {/* KPI */}
        <section className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
              <div className="flex items-center gap-2">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${k.iconBg}`}>{k.icon}</span>
              </div>
              <p className="mt-2 text-[26px] font-extrabold leading-none tracking-tight">
                {k.value} <span className="text-[13px] font-semibold text-zinc-500">{k.unit}</span>
              </p>
              <p className="mt-1.5 text-[12px] text-zinc-500">{k.label}</p>
              <p className={`mt-0.5 text-[11px] font-bold ${k.deltaCls}`}>{k.delta}</p>
            </div>
          ))}
        </section>

        {/* 中段：グラフ＋AI */}
        <section className="mt-3 grid gap-3 xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-[14px] font-extrabold">技術領域別の取得状況</h2>
              <div className="flex gap-1 rounded-full bg-zinc-100 p-0.5 text-[11px] font-bold text-zinc-500">
                {["月", "四半期", "年"].map((t, i) => (
                  <span key={t} className={`rounded-full px-3 py-1 ${i === 0 ? "bg-white text-zinc-800 shadow-sm" : ""}`}>{t}</span>
                ))}
              </div>
            </div>
            <p className="mt-0.5 text-[11px] text-zinc-400">各スキルの習得度を時系列で可視化しています</p>
            <div className="mt-3"><MiniLineChart /></div>
            <div className="mt-2 flex flex-wrap gap-4 text-[11px] font-semibold text-zinc-500">
              <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />フロントエンド</span>
              <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-500" />バックエンド</span>
              <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500" />インフラ</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
            <p className="flex items-center gap-1.5 text-[12px] font-bold text-zinc-500">
              <span className="text-emerald-500">✦</span> AIからのアドバイス
            </p>
            <h3 className="mt-1.5 text-[17px] font-extrabold tracking-tight">実装から、提案へ。</h3>
            <p className="mt-1 text-[12px] leading-5 text-zinc-500">
              基礎は十分です。次は設計・提案力を伸ばすフェーズ。卒研テーマを小さく切り出して発信してみましょう。
            </p>
            <ul className="mt-3 space-y-2.5 text-[12px]">
              {[
                { icon: "◎", t: "今月の重点", d: "バックエンドのAPI設計・DB操作を重点的に" },
                { icon: "▤", t: "おすすめ教材", d: "SQL入門ドリル・設計ドキュメントの書き方" },
                { icon: "✈", t: "次のステップ", d: "API仕様書を書いてレビューをもらおう" },
              ].map((a) => (
                <li key={a.t} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[12px]">{a.icon}</span>
                  <div>
                    <p className="font-bold">{a.t}</p>
                    <p className="text-zinc-500">{a.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full rounded-xl bg-zinc-900 py-2.5 text-[13px] font-bold text-white hover:bg-zinc-700">
              AIからの提案を見る →
            </button>
          </div>
        </section>

        {/* 下段 */}
        <section className="mt-3 grid gap-3 xl:grid-cols-3">
          {/* タイムライン */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-[14px] font-extrabold">
                <span className="text-emerald-500">◉</span> 成長タイムライン
              </h2>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] font-semibold text-zinc-400">すべて見る</a>
            </div>
            <ol className="mt-4 space-y-5">
              {timeline.map((t, i) => (
                <li key={`${t.title}-${i}`} className="relative flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`h-2.5 w-2.5 rounded-full ${t.color}`} />
                    {i !== timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-zinc-200" />}
                  </div>
                  <div className="-mt-1">
                    <p className="text-[11px] font-bold text-zinc-400">{t.date}</p>
                    <p className="text-[13px] font-bold">{t.title}</p>
                    <p className="text-[11px] text-zinc-500">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* 習得スキル */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-[14px] font-extrabold">
                <span className="text-emerald-500">▣</span> 習得スキル
              </h2>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] font-semibold text-zinc-400">詳細</a>
            </div>
            <div className="mt-4 space-y-4">
              {skillBars.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-lg">{s.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className="text-[13px] font-bold">{s.name}</p>
                      <p className="text-[12px] font-extrabold">{s.pct}%</p>
                    </div>
                    <p className="truncate text-[11px] text-zinc-400">{s.desc}</p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                      <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
            <h2 className="flex items-center gap-1.5 text-[14px] font-extrabold">
              <span>◍</span> GitHub活動
            </h2>
            <div className="mt-3 grid grid-cols-3 rounded-xl bg-zinc-50 py-2.5 text-center">
              {[{ v: "44", l: "Commits" }, { v: "6", l: "PR" }, { v: "3", l: "Issues" }].map((s) => (
                <div key={s.l}>
                  <p className="text-lg font-extrabold">{s.v}</p>
                  <p className="text-[10px] text-zinc-400">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 overflow-x-auto"><Grass /></div>
            <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
              <span>過去6ヶ月</span><span>Less □ □ □ □ ■ More</span>
            </div>
            <ul className="mt-3 space-y-2">
              {repos.map((r) => (
                <li key={r.name} className="flex items-center gap-2.5 rounded-xl border border-zinc-100 px-3 py-2">
                  <span className={`h-2 w-2 rounded-full ${r.dot}`} />
                  <p className="text-[12px] font-bold">{r.name}</p>
                  <p className="ml-auto text-[11px] text-zinc-400">{r.meta}・{r.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* 記録モーダル */}
      {open && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-extrabold">学習を記録</h3>
            <p className="mt-1 text-xs text-zinc-500">記録はタイムラインに即時反映されます</p>
            <input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="例：SQLのJOINをマスターした"
              className="mt-4 w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
            />
            <textarea
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              rows={3}
              placeholder="内容メモ（例：ドリル20問・つまずき点など）"
              className="mt-2 w-full resize-none rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
            />
            <div className="mt-4 flex gap-2">
              <button onClick={() => setOpen(false)} className="flex-1 rounded-xl bg-zinc-100 py-2.5 text-sm font-bold text-zinc-600">
                キャンセル
              </button>
              <button
                onClick={addRecord}
                disabled={!formTitle.trim()}
                className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-white disabled:opacity-40"
              >
                記録する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
