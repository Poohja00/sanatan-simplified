import { ChartApiError, ChartData, Highlight, HouseExplanation, PlanetExplanation, AskResponse, PanchangData, MatchResult } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ChartApiException extends Error {
  suggestions: string[];
  constructor(detail: ChartApiError) {
    super(detail.message);
    this.suggestions = detail.suggestions;
  }
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new ChartApiException(
      err?.detail ?? { message: "Something went wrong talking to the chart engine.", suggestions: [] }
    );
  }
  return res.json();
}

export function createChart(dob: string, tob: string, place: string) {
  return post<{ chart: ChartData; highlights: Highlight[] }>("/api/chart", { dob, tob, place });
}

export function explainHouse(chart: ChartData, house: number) {
  return post<HouseExplanation>("/api/house", { chart, house });
}

export function explainPlanet(chart: ChartData, planet: string) {
  return post<PlanetExplanation>("/api/planet", { chart, planet });
}

export function askChart(chart: ChartData, question: string) {
  return post<AskResponse>("/api/ask", { chart, question });
}

export function fetchPanchang(date: string, place: string) {
  return post<PanchangData>("/api/panchang", { date, place });
}

export type PersonInput = { dob: string; tob: string; place: string };

export function matchCharts(groom: PersonInput, bride: PersonInput) {
  return post<MatchResult>("/api/match", { groom, bride });
}

// Seeded demo birth details — same "Asha, Mumbai" identity used throughout
// the earlier static prototypes, now backed by the real engine.
export const DEMO_BIRTH = { dob: "1998-04-12", tob: "14:00", place: "Mumbai, India" };
