"use client";

import AskChat from "@/components/AskChat";
import { useChart } from "@/lib/ChartContext";

export default function AskPageClient() {
  const { chart } = useChart();
  return chart ? (
    <AskChat chart={chart} />
  ) : (
    <div className="grid min-h-[40vh] place-items-center text-vyoma-muted">
      Reading the sky…
    </div>
  );
}
