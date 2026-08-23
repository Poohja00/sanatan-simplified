"use client";

import { useEffect, useState } from "react";

export function useDeviceCapability() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setReduceMotion(motionQuery.matches);
      setIsMobile(widthQuery.matches);
    };
    update();
    motionQuery.addEventListener("change", update);
    widthQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      widthQuery.removeEventListener("change", update);
    };
  }, []);

  return { reduceMotion, isMobile };
}
