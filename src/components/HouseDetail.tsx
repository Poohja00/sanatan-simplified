"use client";

import { useEffect, useState } from "react";
import { ChartData, HouseExplanation } from "@/lib/types";
import { explainHouse } from "@/lib/api";

export default function HouseDetail({
  chart,
  houseNum,
}: {
  chart: ChartData;
  houseNum: number;
}) {
  const [info, setInfo] = useState<HouseExplanation | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setInfo(null);
    setError(false);
    explainHouse(chart, houseNum)
      .then(setInfo)
      .catch(() => setError(true));
  }, [chart, houseNum]);

  if (error) {
    return <p className="text-vyoma-muted">Couldn&rsquo;t reach the chart engine. Is the API running?</p>;
  }
  if (!info) {
    return <p className="text-vyoma-muted">Reading the chart…</p>;
  }

  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-vyoma-gold">
        House {info.house} · {info.traditional_name}
      </div>
      <h2 className="my-2 font-serif text-[32px] font-medium text-vyoma-ink">
        {info.name}
      </h2>
      <p className="leading-[1.7] text-vyoma-muted">{info.what_you_see}</p>
      <p className="mt-3 leading-[1.7] text-vyoma-ink">{info.in_simple_words}</p>
      <div className="mt-4 border-l-2 border-vyoma-gold pl-3 text-[13px] leading-[1.5] text-vyoma-muted">
        {info.why}
      </div>
    </div>
  );
}
