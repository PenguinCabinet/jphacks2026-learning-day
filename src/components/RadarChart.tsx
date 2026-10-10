"use client";

import { radar } from "@/data/techgrow";

// 六角レーダーチャート（SVG自作）
export default function RadarChart() {
  const S = 220;
  const C = S / 2;
  const R = 78;
  const N = radar.length;
  const angle = (i: number) => (Math.PI * 2 * i) / N - Math.PI / 2;
  const pt = (i: number, v: number) => {
    const r = (R * v) / 100;
    return `${C + r * Math.cos(angle(i))},${C + r * Math.sin(angle(i))}`;
  };
  const poly = (get: (v: number) => number) =>
    radar.map((d, i) => pt(i, get(d.value ?? 0))).join(" ");

  const polyNow = radar.map((d, i) => pt(i, d.value)).join(" ");
  const polyPrev = radar.map((d, i) => pt(i, d.prev)).join(" ");
  void poly;

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto w-full max-w-[260px]" role="img" aria-label="スキルレーダー">
      {[25, 50, 75, 100].map((v) => (
        <polygon
          key={v}
          points={radar.map((_, i) => pt(i, v)).join(" ")}
          fill="none"
          stroke="#e4e4e7"
          strokeWidth={1}
        />
      ))}
      {radar.map((d, i) => (
        <line key={d.axis} x1={C} y1={C} x2={pt(i, 100).split(",")[0]} y2={pt(i, 100).split(",")[1]} stroke="#f4f4f5" />
      ))}
      <polygon points={polyPrev} fill="#a1a1aa" fillOpacity={0.15} stroke="#a1a1aa" strokeDasharray="4 3" />
      <polygon points={polyNow} fill="#10b981" fillOpacity={0.25} stroke="#10b981" strokeWidth={2.5} />
      {radar.map((d, i) => {
        const [px, py] = pt(i, d.value).split(",").map(Number);
        return <circle key={d.axis} cx={px} cy={py} r={4} fill="#10b981" stroke="#fff" strokeWidth={2} />;
      })}
      {radar.map((d, i) => {
        const [lx, ly] = pt(i, 118).split(",").map(Number);
        return (
          <text key={d.axis} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={11} fill="#52525b" fontWeight={600}>
            {d.axis}
          </text>
        );
      })}
    </svg>
  );
}
