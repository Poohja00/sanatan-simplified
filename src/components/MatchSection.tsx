"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { matchCharts, PersonInput } from "@/lib/api";
import { ChartApiException } from "@/lib/api";
import { MatchResult } from "@/lib/types";

const EMPTY: PersonInput = { dob: "", tob: "", place: "" };

function PersonForm({
  label,
  person,
  onChange,
}: {
  label: string;
  person: PersonInput;
  onChange: (p: PersonInput) => void;
}) {
  return (
    <div className="border border-vyoma-line bg-vyoma-surface p-5">
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-vyoma-gold">
        {label}
      </div>
      <div className="grid gap-2">
        <input
          type="date"
          value={person.dob}
          onChange={(e) => onChange({ ...person, dob: e.target.value })}
          className="border border-vyoma-line bg-vyoma-dark px-3 py-2.5 text-vyoma-ink outline-none"
        />
        <input
          type="time"
          value={person.tob}
          onChange={(e) => onChange({ ...person, tob: e.target.value })}
          className="border border-vyoma-line bg-vyoma-dark px-3 py-2.5 text-vyoma-ink outline-none"
        />
        <input
          placeholder="Birthplace (city, country)"
          value={person.place}
          onChange={(e) => onChange({ ...person, place: e.target.value })}
          className="border border-vyoma-line bg-vyoma-dark px-3 py-2.5 text-vyoma-ink outline-none placeholder:text-vyoma-faint"
        />
      </div>
    </div>
  );
}

export default function MatchSection() {
  const [groom, setGroom] = useState<PersonInput>(EMPTY);
  const [bride, setBride] = useState<PersonInput>(EMPTY);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!groom.dob || !groom.tob || !groom.place || !bride.dob || !bride.tob || !bride.place) {
      setError("Birth date, time, and place are needed for both people.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      setResult(await matchCharts(groom, bride));
    } catch (e) {
      setError(e instanceof ChartApiException ? e.message : "Couldn't reach the chart engine.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mx-auto max-w-[1180px] px-[5vw] py-20 md:px-0">
      <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-vyoma-gold">
        Horoscope Matching
      </div>
      <h2 className="my-2.5 font-serif text-[clamp(30px,4vw,42px)] font-medium leading-[1.05] text-vyoma-ink">
        See if two charts agree.
      </h2>
      <p className="max-w-[60ch] leading-[1.65] text-vyoma-muted">
        The classical 36-point Ashta-Kuta system — but unlike a raw score
        table, Sanatan Simplified tells you which single factor is actually driving the
        result.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <PersonForm label="Groom" person={groom} onChange={setGroom} />
        <PersonForm label="Bride" person={bride} onChange={setBride} />
      </div>

      {error && <p className="mt-4 text-[13px] text-[#E08B6C]">{error}</p>}

      <motion.button
        whileHover={{ opacity: 0.88 }}
        whileTap={{ scale: 0.98 }}
        onClick={submit}
        disabled={pending}
        className="mt-5 cursor-pointer rounded-md bg-vyoma-gold px-6 py-3.5 font-semibold text-vyoma-bg disabled:opacity-60"
      >
        {pending ? "Reading both charts…" : "Check compatibility →"}
      </motion.button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 border border-vyoma-line bg-vyoma-surface p-7"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-vyoma-line pb-5">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-vyoma-gold">
                  {result.verdict}
                </div>
                <div className="mt-1 font-serif text-[40px] font-medium text-vyoma-ink">
                  {result.total} <span className="text-vyoma-muted text-[22px]">/ {result.max_total}</span>
                </div>
              </div>
              <div className="text-right text-[12px] text-vyoma-muted">
                <div>Groom Moon: {result.groom_moon.sign} · {result.groom_moon.nakshatra}</div>
                <div>Bride Moon: {result.bride_moon.sign} · {result.bride_moon.nakshatra}</div>
              </div>
            </div>

            {result.overriding_factor && (
              <div
                className="mt-5 border-l-2 border-vyoma-gold bg-vyoma-dark p-4 text-[13px] leading-[1.6] text-vyoma-ink"
                style={{ boxShadow: "inset 0 0 40px -20px rgba(200,155,108,.35)" }}
              >
                <b className="text-vyoma-gold">Why this matters most: </b>
                {result.overriding_factor}
              </div>
            )}

            <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-vyoma-line bg-vyoma-line sm:grid-cols-2">
              {result.kutas.map((k) => (
                <div key={k.name} className="bg-vyoma-surface p-4">
                  <div className="flex items-baseline justify-between">
                    <b className={`text-vyoma-ink ${k.dosha ? "text-[#E08B6C]" : ""}`}>{k.name}</b>
                    <span className="font-serif text-[18px] text-vyoma-ink">
                      {k.score}<span className="text-vyoma-muted text-[12px]"> / {k.max}</span>
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-vyoma-muted">{k.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
