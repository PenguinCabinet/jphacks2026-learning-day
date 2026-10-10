"use client";

type Point = { label: string; commits: number; score: number };

export default function GrowthChart({
  data,
  hover,
  onHover,
}: {
  data: Point[];
  hover: number | null;
  onHover: (i: number | null) => void;
}) {
  const W = 640;
  const H = 240;
  const PAD = 36;
  const maxCommit = Math.max(...data.map((d) => d.commits)) * 1.2;
  const maxScore = 100;

  const x = (i: number) =>
    PAD + (i * (W - PAD * 2)) / Math.max(data.length - 1, 1);
  const yCommit = (v: number) => H - PAD - (v / maxCommit) * (H - PAD * 2);
  const yScore = (v: number) => H - PAD - (v / maxScore) * (H - PAD * 2);

  const commitPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${yCommit(d.commits)}`)
    .join(" ");
  const scorePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${yScore(d.score)}`)
    .join(" ");
  const areaPath = `${commitPath} L${x(data.length - 1)},${H - PAD} L${x(0)},${
    H - PAD
  } Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[480px]"
        onMouseLeave={() => onHover(null)}
        role="img"
        aria-label="成長グラフ"
      >
        <defs>
          <linearGradient id="tg-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((t) => {
          const yy = PAD + (H - PAD * 2) * (1 - t);
          return (
            <g key={t}>
              <line x1={PAD} x2={W - PAD} y1={yy} y2={yy} stroke="#e4e4e7" strokeDasharray="4 4" />
            </g>
          );
        })}
        <path d={areaPath} fill="url(#tg-area)" />
        <path d={commitPath} fill="none" stroke="#10b981" strokeWidth={3} strokeLinecap="round" />
        <path d={scorePath} fill="none" stroke="#6366f1" strokeWidth={2.5} strokeDasharray="7 5" strokeLinecap="round" />
        {data.map((d, i) => (
          <g key={d.label}>
            <rect
              x={x(i) - 24}
              y={0}
              width={48}
              height={H}
              fill="transparent"
              onMouseEnter={() => onHover(i)}
            />
            <circle cx={x(i)} cy={yCommit(d.commits)} r={hover === i ? 6 : 4} fill="#10b981" stroke="#fff" strokeWidth={2} />
            <circle cx={x(i)} cy={yScore(d.score)} r={hover === i ? 5 : 3.5} fill="#6366f1" stroke="#fff" strokeWidth={2} />
            <text x={x(i)} y={H - 10} textAnchor="middle" fontSize={12} fill="#71717a">
              {d.label}
            </text>
          </g>
        ))}
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={PAD - 10} y2={H - PAD} stroke="#a1a1aa" strokeDasharray="3 3" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div className="mt-1 flex gap-4 text-sm">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
            ● {data[hover].label}：{data[hover].commits} commits
          </span>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
            ◆ 成長スコア {data[hover].score}点
          </span>
        </div>
      )}
    </div>
  );
}
