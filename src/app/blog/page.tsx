import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import BlogPostCard from "@/components/BlogPostCard";

export const metadata: Metadata = {
  title: "Blog — Astrology, Tarot & Sanatan Wisdom, Simplified",
  description:
    "Plain-language guides to Vedic astrology, tarot, and the epics of Sanatan Dharma — the Ramayana and Mahabharata, explained simply.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="bg-white px-[6vw] py-14">
      <div className="mx-auto max-w-[900px]">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
          Blog
        </div>
        <h1 className="mt-2 font-serif text-[clamp(32px,4.8vw,48px)] font-medium text-vyoma-ink-dark">
          Every article, in one place.
        </h1>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.75] text-vyoma-muted-dark">
          Astrology, tarot, and Sanatan Dharma — explained plainly, with no
          jargon wall between you and the ideas.
        </p>
        <div className="mt-10">
          {BLOG_POSTS.map((post) => (
            <BlogPostCard key={post.href} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
