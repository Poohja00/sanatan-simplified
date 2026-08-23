"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { ChartProvider, useChart } from "@/lib/ChartContext";
import SmoothScroll from "@/lib/SmoothScroll";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
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

function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // The marketing homepage keeps its full-bleed cinematic layout; every
  // in-product page gets the sidebar.
  const isMarketing = pathname === "/";

  if (isMarketing) {
    return (
      <>
        <Nav />
        <main>{children}</main>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="sticky top-0 hidden h-screen border-r border-vyoma-line bg-vyoma-bg-2 lg:block">
        <Sidebar />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[260px] border-r border-vyoma-line bg-vyoma-bg-2">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="min-w-0">
        <Nav onOpenMenu={() => setMobileOpen(true)} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <ChartProvider>
      <SmoothScroll>
        <Shell>{children}</Shell>
        <GlobalCreateChartModal />
      </SmoothScroll>
    </ChartProvider>
  );
}
