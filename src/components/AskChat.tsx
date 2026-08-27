"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { askChart } from "@/lib/api";
import { ChartData } from "@/lib/types";

type Msg = { role: "user" | "assistant"; text: string };

const QUICK = [
  "What does my Saturn mean?",
  "What about career?",
  "Tell me about relationships.",
];

export default function AskChat({ chart }: { chart: ChartData }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: 'Ask me about your chart — for example, "What does my Saturn mean?"',
    },
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || pending) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setPending(true);
    try {
      const answer = await askChart(chart, q);
      setMessages((m) => [...m, { role: "assistant", text: answer.short_answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Couldn't reach the chart engine just now — try again in a moment." },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="border-y border-vyoma-line bg-vyoma-surface-2">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-14 px-[5vw] py-20 md:grid-cols-[0.8fr_1.2fr] md:px-0">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-vyoma-gold">
            Ask My Chart
          </div>
          <h2 className="my-2.5 font-serif text-[42px] font-medium text-vyoma-ink">
            Start with a question.
          </h2>
          <p className="leading-[1.65] text-vyoma-muted">
            Ask naturally. Sanatan Simplified keeps relevant chart factors in view and
            explains the traditional reasoning behind an answer.
          </p>
        </div>

        <div className="border border-vyoma-line bg-vyoma-surface p-4">
          <div className="h-[260px] space-y-2 overflow-y-auto">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`max-w-[80%] border border-vyoma-line p-3 leading-[1.5] ${
                    m.role === "user"
                      ? "ml-auto border-vyoma-gold bg-vyoma-gold text-vyoma-bg"
                      : "bg-vyoma-surface text-vyoma-ink"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {pending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-[80%] border border-vyoma-line bg-vyoma-surface p-3 text-vyoma-muted"
                >
                  Reading the chart…
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="my-3 flex flex-wrap gap-1.5">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={pending}
                className="cursor-pointer rounded-sm border border-vyoma-line px-2.5 py-2 text-[11px] text-vyoma-ink transition-colors hover:border-vyoma-gold disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about your chart..."
              className="flex-1 border border-vyoma-line bg-vyoma-dark px-3 py-3 text-vyoma-ink outline-none placeholder:text-vyoma-faint"
            />
            <button
              onClick={() => send()}
              disabled={pending}
              className="cursor-pointer bg-vyoma-gold px-4 py-3 font-semibold text-vyoma-bg disabled:opacity-60"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
