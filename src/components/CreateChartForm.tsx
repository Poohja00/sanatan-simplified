"use client";

import { useState } from "react";
import { createChart, ChartApiException } from "@/lib/api";
import { ChartData, Highlight } from "@/lib/types";

export default function CreateChartForm({
  onCreated,
}: {
  onCreated: (chart: ChartData, highlights: Highlight[]) => void;
}) {
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [place, setPlace] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  async function submit() {
    if (!dob || !tob || !place.trim()) {
      setError("Date of birth, time, and birthplace are all needed to cast a chart.");
      setSuggestions([]);
      return;
    }
    setPending(true);
    setError(null);
    setSuggestions([]);
    try {
      const { chart, highlights } = await createChart(dob, tob, place);
      onCreated(chart, highlights);
    } catch (e) {
      if (e instanceof ChartApiException) {
        setError(e.message);
        setSuggestions(e.suggestions);
      } else {
        setError("Couldn't reach the chart engine. Is the API running?");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-vyoma-gold">
        Create your chart
      </div>
      <h2 className="my-2.5 font-serif text-[32px] font-medium text-vyoma-ink">
        Start with your birth details.
      </h2>
      <p className="leading-[1.65] text-vyoma-muted">
        Real Vedic calculation — Swiss Ephemeris, sidereal, whole-sign houses.
        Nothing leaves your browser except these three fields.
      </p>
      <div className="mt-5 grid gap-2.5">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border border-vyoma-line bg-vyoma-dark px-3 py-3 text-vyoma-ink outline-none"
        />
        <input
          type="time"
          value={tob}
          onChange={(e) => setTob(e.target.value)}
          className="border border-vyoma-line bg-vyoma-dark px-3 py-3 text-vyoma-ink outline-none"
        />
        <input
          placeholder="Birthplace (city, country)"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="border border-vyoma-line bg-vyoma-dark px-3 py-3 text-vyoma-ink outline-none placeholder:text-vyoma-faint"
        />
      </div>

      {error && (
        <div className="mt-3 text-[13px] text-[#E08B6C]">
          {error}
          {suggestions.length > 0 && (
            <div className="mt-1 text-vyoma-muted">
              Did you mean:{" "}
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setPlace(s)}
                  className="cursor-pointer underline decoration-dotted underline-offset-2 hover:text-vyoma-gold"
                >
                  {s}
                  {i < suggestions.length - 1 ? ", " : ""}
                </button>
              ))}
              ?
            </div>
          )}
        </div>
      )}

      <button
        onClick={submit}
        disabled={pending}
        className="mt-4 w-full cursor-pointer bg-vyoma-gold py-3.5 font-semibold text-vyoma-bg disabled:opacity-60"
      >
        {pending ? "Reading the sky…" : "Create my chart →"}
      </button>
      <div className="mt-5 border-l-2 border-vyoma-gold pl-3 leading-[1.5] text-vyoma-muted">
        <b className="text-vyoma-ink">Sanatan Simplified</b>
        <br />
        See the chart. Understand the pattern. Ask anything.
      </div>
    </div>
  );
}
