"use client";

import { ReactNode } from "react";
import { ChartProvider, useChart } from "@/lib/ChartContext";
import SmoothScroll from "@/lib/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import CreateChartForm from "@/components/CreateChartForm";

function GlobalCreateChartModal() {
  const { createOpen, closeCreate, setChart } = useChart();
  return (
    <Modal open={createOpen} onClose={closeCreate}>
      <CreateChartForm
        onCreated={(newChart, newHighlights) => {
          setChart(newChart, newHighlights);
          closeCreate();
        }}
      />
    </Modal>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <ChartProvider>
      <SmoothScroll>
        <Nav />
        <main>{children}</main>
        <Footer />
        <GlobalCreateChartModal />
      </SmoothScroll>
    </ChartProvider>
  );
}
