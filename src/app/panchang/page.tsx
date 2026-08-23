"use client";

import TodayPanchang from "@/components/TodayPanchang";
import { useChart } from "@/lib/ChartContext";
import { DEMO_BIRTH } from "@/lib/api";

export default function PanchangPage() {
  const { chart } = useChart();
  return (
    <div className="py-8">
      <TodayPanchang place={chart?.birth_info.place ?? DEMO_BIRTH.place} />
    </div>
  );
}
