"use client";

import { motion } from "framer-motion";
import { ChartData, PlanetName } from "@/lib/types";

const POSITIONS: Record<number, string> = {
  1: "left-[37.5%] top-[37.5%] w-1/4 h-1/4 border border-[#7A5A54]",
  2: "left-0 top-0 w-1/4 h-1/4",
  3: "left-1/4 top-0 w-1/4 h-1/4",
  4: "left-1/2 top-0 w-1/4 h-1/4",
  5: "left-[75%] top-0 w-1/4 h-1/4",
  6: "left-[75%] top-1/4 w-1/4 h-1/4",
  7: "left-[75%] top-1/2 w-1/4 h-1/4",
  8: "left-[75%] top-[75%] w-1/4 h-1/4",
  9: "left-1/2 top-[75%] w-1/4 h-1/4",
  10: "left-1/4 top-[75%] w-1/4 h-1/4",
  11: "left-0 top-[75%] w-1/4 h-1/4",
  12: "left-0 top-1/2 w-1/4 h-1/4",
};

const ABBR: Record<PlanetName, string> = {
  Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me", Jupiter: "Ju",
  Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
};

export default function VedicChart({
  chart,
  onSelectHouse,
}: {
  chart: ChartData;
  onSelectHouse: (houseNum: number) => void;
}) {
  const planetsByHouse: Record<number, string[]> = {};
  (Object.entries(chart.planets) as [PlanetName, ChartData["planets"][PlanetName]][]).forEach(
    ([name, pos]) => {
      (planetsByHouse[pos.house] ??= []).push(ABBR[name]);
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto aspect-square max-w-[560px] border border-[#5E4048] bg-vyoma-dark"
    >
      {Array.from({ length: 12 }, (_, i) => i + 1).map((houseNum) => (
        <button
          key={houseNum}
          onClick={() => onSelectHouse(houseNum)}
          className={`absolute cursor-pointer border-r border-b border-[#3F2830] bg-transparent p-1.5 text-left transition-colors hover:bg-vyoma-gold/[0.08] ${POSITIONS[houseNum]}`}
        >
          <small className="block text-[9px] text-[#7E6A73]">{houseNum}</small>
          <i className="block text-[10px] not-italic text-vyoma-gold">
            {chart.houses[String(houseNum)]}
          </i>
          {(planetsByHouse[houseNum] ?? []).map((p, i) => (
            <b key={p + i} className="mr-1 text-[9px] font-semibold text-vyoma-ink">
              {p}
            </b>
          ))}
        </button>
      ))}
    </motion.div>
  );
}
