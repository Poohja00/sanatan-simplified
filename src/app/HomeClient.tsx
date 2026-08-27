"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/lib/blog";
import BlogPostCard from "@/components/BlogPostCard";

const TOPIC_CARDS = [
  { href: "/explore", glyph: "☾", title: "Astrology", desc: "Planets, signs, houses and more." },
  { href: "/tarot", glyph: "♢", title: "Tarot", desc: "Card meanings, spreads and guidance." },
  { href: "/horoscope", glyph: "☉", title: "Horoscope", desc: "Daily guidance for your rashi." },
  { href: "/match", glyph: "♡", title: "Compatibility", desc: "Relationships, matches and more." },
  { href: "/panchang", glyph: "◐", title: "Panchang", desc: "Tithi, Nakshatra, Yoga and more." },
  { href: "/wisdom", glyph: "ॐ", title: "Wisdom", desc: "Ramayana, Mahabharata and more." },
];

const PROMISES = [
  { title: "Simple Language", desc: "No jargon. Just clear and friendly explanations." },
  { title: "Practical Insights", desc: "Real-life guidance you can use every day." },
  { title: "Accurate & Reliable", desc: "Built on authentic knowledge and study." },
  { title: "Holistic Approach", desc: "Mind, emotions, relationships and growth." },
  { title: "For Everyone", desc: "Beginner or advanced, there's something for all." },
];

const TOPICS_COVERED = [
  { href: "/explore", label: "Zodiac Signs", desc: "Know each sign inside out." },
  { href: "/explore/planets", label: "Planets", desc: "Their meaning and influence." },
  { href: "/explore/houses", label: "Houses", desc: "Areas of life in your chart." },
  { href: "/moon", label: "Moon Phases", desc: "What each phase means for you." },
  { href: "/tarot", label: "Tarot Cards", desc: "Meanings, symbols and stories." },
  { href: "/explore/nakshatras", label: "Nakshatras", desc: "The 27 lunar mansions." },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
      {sent ? (
        <p className="text-[14px] text-vyoma-gold">You&rsquo;re on the list.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setSent(true);
          }}
          className="flex flex-1 gap-2"
        >
          <input
            type="email"
            required
            placeholder="Your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-sm border border-vyoma-line-light bg-white px-4 py-3 text-[13px] text-vyoma-ink-dark outline-none placeholder:text-vyoma-muted-dark"
          />
          <button
            type="submit"
            className="cursor-pointer whitespace-nowrap rounded-sm bg-vyoma-gold px-5 py-3 text-[13px] font-semibold text-vyoma-bg"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}

export default function HomeClient() {
  return (
    <>
      <section
        className="relative flex min-h-[80vh] items-center overflow-hidden bg-vyoma-bg px-[6vw] py-24"
        style={{
          backgroundImage: "url(/images/hero-sunset.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(11,9,8,0.82) 0%, rgba(11,9,8,0.55) 45%, rgba(11,9,8,0.25) 100%)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-[1180px]"
        >
          <div className="max-w-[600px]">
            <h1 className="font-serif text-[clamp(38px,5.6vw,58px)] font-medium leading-[1.1] text-vyoma-ink">
              Insights that <span className="text-vyoma-gold">illuminate</span> your path.
            </h1>
            <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.75] text-vyoma-muted">
              Explore simple, practical and meaningful articles on
              astrology, tarot, and Sanatan Dharma. Ancient wisdom, modern
              clarity.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-vyoma-gold px-7 py-3.5 text-[14px] font-semibold text-vyoma-bg transition-transform hover:scale-[1.02]"
            >
              Explore Blog →
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="bg-white px-[6vw] py-16">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TOPIC_CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col items-center gap-2 rounded-sm border border-vyoma-line-light px-4 py-6 text-center transition-colors hover:border-vyoma-gold"
            >
              <span className="text-[22px] text-vyoma-gold">{c.glyph}</span>
              <span className="text-[13px] font-medium text-vyoma-ink-dark group-hover:text-vyoma-gold">
                {c.title}
              </span>
              <span className="text-[11px] leading-[1.4] text-vyoma-muted-dark">{c.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-vyoma-ivory px-[6vw] py-20">
        <div className="mx-auto max-w-[1080px] rounded-sm border border-vyoma-line-light/70 bg-white/60 p-9 sm:p-12">
          <h2 className="font-serif text-[clamp(26px,3.6vw,36px)] font-medium text-vyoma-ink-dark">
            What is this blog?
          </h2>
          <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.8] text-vyoma-muted-dark">
            This is your space to understand Sanatan Dharma and Vedic
            astrology the simplest way possible. We break down complex
            topics into easy-to-read guides that anyone can follow and
            relate to — no prior knowledge required.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-5">
            {PROMISES.map((p) => (
              <div key={p.title}>
                <div className="text-[13px] font-semibold text-vyoma-ink-dark">{p.title}</div>
                <p className="mt-1 text-[12px] leading-[1.5] text-vyoma-muted-dark">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-[6vw] py-20">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="font-serif text-[clamp(24px,3.4vw,32px)] font-medium text-vyoma-ink-dark">
            Topics we cover
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {TOPICS_COVERED.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group rounded-sm border border-vyoma-line-light p-5 transition-colors hover:border-vyoma-gold"
              >
                <div className="text-[14px] font-medium text-vyoma-ink-dark group-hover:text-vyoma-gold">
                  {t.label}
                </div>
                <p className="mt-1 text-[12px] text-vyoma-muted-dark">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vyoma-ivory px-[6vw] py-20">
        <div className="mx-auto max-w-[900px]">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-[clamp(24px,3.4vw,32px)] font-medium text-vyoma-ink-dark">
              Latest from the blog
            </h2>
            <Link href="/blog" className="whitespace-nowrap text-[13px] font-semibold text-vyoma-gold hover:opacity-80">
              View all articles →
            </Link>
          </div>
          <div className="mt-8">
            {BLOG_POSTS.slice(0, 4).map((post) => (
              <BlogPostCard key={post.href} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-[6vw] py-16">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 rounded-sm border border-vyoma-line-light bg-vyoma-ivory p-8 sm:flex-row">
          <div>
            <div className="text-[15px] font-medium text-vyoma-ink-dark">Stay inspired.</div>
            <p className="text-[13px] text-vyoma-muted-dark">New articles and cosmic updates, occasionally.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
