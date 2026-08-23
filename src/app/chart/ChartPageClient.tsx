"use client";

import { useState } from "react";
import VedicChart from "@/components/VedicChart";
import Highlights from "@/components/Highlights";
import HouseDetail from "@/components/HouseDetail";
import Modal from "@/components/Modal";
import { useChart } from "@/lib/ChartContext";

export default function ChartPageClient() {
  const { chart, highlights, apiDown, openCreate } = useChart();
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);

  return (
    <>
      {apiDown && (
        <div className="border-b border-vyoma-line bg-vyoma-surface px-[5vw] py-3 text-center text-[13px] text-[#E08B6C]">
          Can&rsquo;t reach the chart engine right now — real charts will load once it&rsquo;s back.
        </div>
      )}

      <section className="mx-auto max-w-[900px] px-[5vw] py-14 md:px-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-vyoma-gold">
              My Chart
            </div>
            <h1 className="mt-2 font-serif text-[clamp(34px,5vw,52px)] font-medium text-vyoma-ink">
              {chart ? `D1 — Lagna chart` : "Reading the sky…"}
            </h1>
            {chart && (
              <p className="mt-1 text-[13px] text-vyoma-muted">
                {chart.birth_info.place} · Ascendant {chart.ascendant.sign}
              </p>
            )}
          </div>
          <button
            onClick={openCreate}
            className="cursor-pointer rounded-md border border-[#513643] px-5 py-3 font-semibold text-vyoma-ink"
          >
            Create your chart →
          </button>
        </div>

        <div className="mt-8 border border-vyoma-line bg-vyoma-surface p-6">
          {chart ? (
            <VedicChart chart={chart} onSelectHouse={setSelectedHouse} />
          ) : (
            <div className="mx-auto grid aspect-square max-w-[560px] place-items-center text-vyoma-muted">
              Reading the sky…
            </div>
          )}
        </div>
      </section>

      <Highlights highlights={highlights} />

      <Modal open={selectedHouse !== null} onClose={() => setSelectedHouse(null)}>
        {selectedHouse !== null && chart && (
          <HouseDetail chart={chart} houseNum={selectedHouse} />
        )}
      </Modal>
    </>
  );
}
