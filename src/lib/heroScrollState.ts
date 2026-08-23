// Mutable bridge between GSAP ScrollTrigger (DOM-driven, outside React) and
// the R3F render loop (useFrame, needs 60fps reads without React re-renders).
export const heroScrollState = { progress: 0 };
