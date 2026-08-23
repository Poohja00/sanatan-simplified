"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createChart, DEMO_BIRTH } from "@/lib/api";
import { ChartData, Highlight } from "@/lib/types";

type ChartContextValue = {
  chart: ChartData | null;
  highlights: Highlight[];
  apiDown: boolean;
  setChart: (chart: ChartData, highlights: Highlight[]) => void;
  createOpen: boolean;
  openCreate: () => void;
  closeCreate: () => void;
};

const ChartContext = createContext<ChartContextValue | null>(null);

export function ChartProvider({ children }: { children: ReactNode }) {
  const [chart, setChartState] = useState<ChartData | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [apiDown, setApiDown] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    createChart(DEMO_BIRTH.dob, DEMO_BIRTH.tob, DEMO_BIRTH.place)
      .then(({ chart, highlights }) => {
        setChartState(chart);
        setHighlights(highlights);
      })
      .catch(() => setApiDown(true));
  }, []);

  return (
    <ChartContext.Provider
      value={{
        chart,
        highlights,
        apiDown,
        setChart: (c, h) => {
          setChartState(c);
          setHighlights(h);
        },
        createOpen,
        openCreate: () => setCreateOpen(true),
        closeCreate: () => setCreateOpen(false),
      }}
    >
      {children}
    </ChartContext.Provider>
  );
}

export function useChart() {
  const ctx = useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used inside ChartProvider");
  return ctx;
}
