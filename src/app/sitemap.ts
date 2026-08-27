import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/today", priority: 0.95, changeFrequency: "daily" },
    { path: "/chart", priority: 0.9, changeFrequency: "weekly" },
    { path: "/chart/planets", priority: 0.8, changeFrequency: "weekly" },
    { path: "/chart/aspects", priority: 0.7, changeFrequency: "weekly" },
    { path: "/panchang", priority: 0.9, changeFrequency: "daily" },
    { path: "/moon", priority: 0.85, changeFrequency: "daily" },
    { path: "/transits", priority: 0.85, changeFrequency: "daily" },
    { path: "/ask", priority: 0.8, changeFrequency: "monthly" },
    { path: "/match", priority: 0.8, changeFrequency: "monthly" },
    { path: "/horoscope", priority: 0.9, changeFrequency: "daily" },
    { path: "/tarot", priority: 0.85, changeFrequency: "daily" },
    { path: "/wisdom", priority: 0.8, changeFrequency: "monthly" },
    { path: "/wisdom/ramayana", priority: 0.85, changeFrequency: "monthly" },
    { path: "/wisdom/mahabharata", priority: 0.85, changeFrequency: "monthly" },
    { path: "/explore", priority: 0.75, changeFrequency: "monthly" },
    { path: "/explore/planets", priority: 0.7, changeFrequency: "monthly" },
    { path: "/explore/houses", priority: 0.7, changeFrequency: "monthly" },
    { path: "/explore/nakshatras", priority: 0.7, changeFrequency: "monthly" },
    // privacy/terms/contact are marked noindex (thin placeholder content
    // right now) and deliberately excluded here — add back once they have
    // real content.
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
