import Link from "next/link";
import { BlogPost } from "@/lib/blog";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={post.href}
      className="group flex flex-col gap-4 border-b border-vyoma-line-light py-6 first:pt-0 last:border-b-0 sm:flex-row sm:items-center"
    >
      <div
        className="h-[110px] w-full shrink-0 rounded-sm sm:w-[160px]"
        style={{
          background: `linear-gradient(135deg, hsl(${post.hue} 45% 22%), hsl(${post.hue + 30} 55% 12%))`,
        }}
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-[19px] font-medium text-vyoma-ink-dark group-hover:text-vyoma-gold">
          {post.title}
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-[1.6] text-vyoma-muted-dark">{post.desc}</p>
        <div className="mt-2.5 flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-vyoma-gold">
          <span>{post.category}</span>
          <span className="text-vyoma-muted-dark">·</span>
          <span className="normal-case tracking-normal text-vyoma-muted-dark">{post.readMins} min read</span>
        </div>
      </div>
    </Link>
  );
}
