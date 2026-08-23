"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChartData, PlanetName } from "@/lib/types";

const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const ABBR: Record<PlanetName, string> = {
  Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me", Jupiter: "Ju",
  Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
};

/**
 * Authentic North Indian (diamond) chart geometry on a 400x400 field.
 *
 * The classical construction: a square, both diagonals, and the diamond
 * joining the four side-midpoints. That yields 4 diamond houses (1/4/7/10
 * at top/left/bottom/right centre) and 8 triangles. Houses are FIXED
 * positions and run ANTICLOCKWISE from the top-centre diamond; the signs
 * rotate through them, which is why each house shows a sign *number*.
 */
const NORTH_HOUSES: { num: number; points: string; cx: number; cy: number }[] = [
  { num: 1, points: "200,0 100,100 200,200 300,100", cx: 200, cy: 100 },
  { num: 2, points: "0,0 200,0 100,100", cx: 100, cy: 40 },
  { num: 3, points: "0,0 100,100 0,200", cx: 40, cy: 100 },
  { num: 4, points: "0,200 100,100 200,200 100,300", cx: 100, cy: 200 },
  { num: 5, points: "0,200 100,300 0,400", cx: 40, cy: 300 },
  { num: 6, points: "0,400 100,300 200,400", cx: 100, cy: 360 },
  { num: 7, points: "200,400 100,300 200,200 300,300", cx: 200, cy: 300 },
  { num: 8, points: "200,400 300,300 400,400", cx: 300, cy: 360 },
  { num: 9, points: "400,400 300,300 400,200", cx: 360, cy: 300 },
  { num: 10, points: "400,200 300,300 200,200 300,100", cx: 300, cy: 200 },
  { num: 11, points: "400,200 300,100 400,0", cx: 360, cy: 100 },
  { num: 12, points: "400,0 300,100 200,0", cx: 300, cy: 40 },
];

/**
 * South Indian chart: a 4x4 grid with the centre 2x2 blank. Here the SIGNS
 * are fixed (Aries top-left-but-one, running clockwise) and the houses
 * rotate — the inverse of the North Indian convention. The ascendant cell
 * is marked with a diagonal stroke.
 */
const SOUTH_CELLS: { signIndex: number; col: number; row: number }[] = [
  { signIndex: 11, col: 0, row: 0 }, // Pisces
  { signIndex: 0, col: 1, row: 0 },  // Aries
  { signIndex: 1, col: 2, row: 0 },  // Taurus
  { signIndex: 2, col: 3, row: 0 },  // Gemini
  { signIndex: 10, col: 0, row: 1 }, // Aquarius
  { signIndex: 3, col: 3, row: 1 },  // Cancer
  { signIndex: 9, col: 0, row: 2 },  // Capricorn
  { signIndex: 4, col: 3, row: 2 },  // Leo
  { signIndex: 8, col: 0, row: 3 },  // Sagittarius
  { signIndex: 7, col: 1, row: 3 },  // Scorpio
  { signIndex: 6, col: 2, row: 3 },  // Libra
  { signIndex: 5, col: 3, row: 3 },  // Virgo
];

type Occupant = { abbr: string; retro: boolean };

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** Planet labels laid out in rows of two, centred on a point. */
function PlanetLabels({
  occupants, cx, cy,
}: {
  occupants: Occupant[];
  cx: number;
  cy: number;
}) {
  if (!occupants.length) return null;
  const rows = chunk(occupants, 2);
  const startY = cy + 6 - ((rows.length - 1) * 15) / 2;
  return (
    <>
      {rows.map((row, r) => (
        <text
          key={r}
          x={cx}
          y={startY + r * 15}
          textAnchor="middle"
          className="fill-vyoma-ink"
          style={{ fontSize: 14, fontWeight: 600 }}
        >
          {row.map((o, i) => (
            <tspan key={o.abbr}>
              {i > 0 ? " " : ""}
              {o.abbr}
              {o.retro && (
                <tspan className="fill-vyoma-gold" style={{ fontSize: 10 }}>
                  ℞
                </tspan>
              )}
            </tspan>
          ))}
        </text>
      ))}
    </>
  );
}

export default function VedicChart({
  chart,
  onSelectHouse,
}: {
  chart: ChartData;
  onSelectHouse: (houseNum: number) => void;
}) {
  const [style, setStyle] = useState<"north" | "south">("north");
  const [hovered, setHovered] = useState<number | null>(null);

  const occupantsByHouse: Record<number, Occupant[]> = {};
  (Object.entries(chart.planets) as [PlanetName, ChartData["planets"][PlanetName]][]).forEach(
    ([name, pos]) => {
      (occupantsByHouse[pos.house] ??= []).push({
        abbr: ABBR[name],
        retro: pos.retrograde && name !== "Rahu" && name !== "Ketu",
      });
    }
  );

  const ascIndex = chart.ascendant.sign_index;
  // House N holds the sign N-1 steps on from the ascendant.
  const signIndexForHouse = (h: number) => (ascIndex + h - 1) % 12;
  // Inverse, for the South Indian layout where signs are the fixed frame.
  const houseForSignIndex = (s: number) => ((s - ascIndex + 12) % 12) + 1;

  const stroke = "#5E4048";
  const cell = 100;

  return (
    <div className="mx-auto max-w-[560px]">
      <div className="mb-3 flex justify-center gap-1">
        {(["north", "south"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`cursor-pointer rounded-full border px-3 py-1 text-[11px] transition-colors ${
              style === s
                ? "border-vyoma-gold text-vyoma-gold"
                : "border-vyoma-line text-vyoma-muted hover:text-vyoma-ink"
            }`}
          >
            {s === "north" ? "North Indian" : "South Indian"}
          </button>
        ))}
      </div>

      <motion.svg
        key={style}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        viewBox="0 0 400 400"
        className="w-full bg-vyoma-dark"
        role="img"
        aria-label={`${style === "north" ? "North" : "South"} Indian style Vedic birth chart`}
      >
        {style === "north" ? (
          <>
            <rect x="0" y="0" width="400" height="400" fill="none" stroke={stroke} strokeWidth="1.5" />
            <line x1="0" y1="0" x2="400" y2="400" stroke={stroke} strokeWidth="1" />
            <line x1="400" y1="0" x2="0" y2="400" stroke={stroke} strokeWidth="1" />
            <polygon points="200,0 400,200 200,400 0,200" fill="none" stroke={stroke} strokeWidth="1" />

            {NORTH_HOUSES.map((h) => {
              const signIdx = signIndexForHouse(h.num);
              return (
                <g key={h.num}>
                  {hovered === h.num && (
                    <polygon points={h.points} className="fill-vyoma-gold" opacity={0.07} />
                  )}
                  <text
                    x={h.cx}
                    y={h.cy - 10}
                    textAnchor="middle"
                    className="fill-vyoma-gold"
                    style={{ fontSize: 13 }}
                  >
                    {signIdx + 1}
                  </text>
                  <PlanetLabels occupants={occupantsByHouse[h.num] ?? []} cx={h.cx} cy={h.cy} />
                  <polygon
                    points={h.points}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => onSelectHouse(h.num)}
                    onMouseEnter={() => setHovered(h.num)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <title>{`House ${h.num} — ${SIGNS[signIdx]}`}</title>
                  </polygon>
                </g>
              );
            })}
          </>
        ) : (
          <>
            {SOUTH_CELLS.map((c) => {
              const houseNum = houseForSignIndex(c.signIndex);
              const x = c.col * cell;
              const y = c.row * cell;
              const isAsc = houseNum === 1;
              return (
                <g key={c.signIndex}>
                  <rect
                    x={x}
                    y={y}
                    width={cell}
                    height={cell}
                    fill={hovered === houseNum ? "rgba(198,166,107,0.07)" : "transparent"}
                    stroke={stroke}
                    strokeWidth="1"
                  />
                  {isAsc && (
                    <line
                      x1={x}
                      y1={y}
                      x2={x + 28}
                      y2={y + 28}
                      stroke="#c6a66b"
                      strokeWidth="1.5"
                    />
                  )}
                  <text
                    x={x + cell / 2}
                    y={y + 20}
                    textAnchor="middle"
                    className="fill-vyoma-gold"
                    style={{ fontSize: 11 }}
                  >
                    {SIGNS[c.signIndex].slice(0, 3)}
                  </text>
                  <PlanetLabels
                    occupants={occupantsByHouse[houseNum] ?? []}
                    cx={x + cell / 2}
                    cy={y + cell / 2 + 4}
                  />
                  <text
                    x={x + cell - 8}
                    y={y + cell - 8}
                    textAnchor="end"
                    className="fill-vyoma-faint"
                    style={{ fontSize: 9 }}
                  >
                    {houseNum}
                  </text>
                  <rect
                    x={x}
                    y={y}
                    width={cell}
                    height={cell}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => onSelectHouse(houseNum)}
                    onMouseEnter={() => setHovered(houseNum)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <title>{`House ${houseNum} — ${SIGNS[c.signIndex]}`}</title>
                  </rect>
                </g>
              );
            })}
          </>
        )}
      </motion.svg>

      <p className="mt-3 text-center text-[11px] text-vyoma-faint">
        {style === "north"
          ? "Houses are fixed; numbers show which sign falls in each. Lagna is the top diamond."
          : "Signs are fixed; the diagonal marks your Lagna. Small numbers are house positions."}
      </p>
    </div>
  );
}
