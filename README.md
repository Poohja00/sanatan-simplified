# VYOMA

Understand your cosmic map. A premium Vedic astrology site — real birth-chart
calculation, daily panchang, an "Ask My Chart" interpreter, and Ashta-Kuta
horoscope matching, built on Next.js, Tailwind, and a Three.js hero.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Three.js / React Three Fiber / drei — the hero's celestial scene
- Framer Motion, GSAP + ScrollTrigger, Lenis — animation and scroll

## Running locally

This app is the frontend only. Chart, panchang, ask, and matching all call
a separate Python API (Swiss Ephemeris + a Lal Kitab–informed interpretation
layer) — see that project's own README for setup.

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to point at the API (defaults to
`http://localhost:8000` for local development).

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```
