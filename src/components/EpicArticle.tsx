type Section = { title: string; body: string };

export default function EpicArticle({
  kicker, title, intro, sections,
}: {
  kicker: string;
  title: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <div className="mx-auto max-w-[760px] px-[5vw] py-14 lg:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vyoma-gold">
        {kicker}
      </div>
      <h1 className="mt-2 font-serif text-[clamp(32px,4.8vw,48px)] font-medium text-vyoma-ink">
        {title}
      </h1>
      <p className="mt-5 text-[16px] leading-[1.8] text-vyoma-muted">{intro}</p>

      <div className="mt-12 flex flex-col gap-10">
        {sections.map((s, i) => (
          <div key={s.title} className="border-t border-vyoma-line pt-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-vyoma-faint">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h2 className="mt-2 font-serif text-[24px] font-medium text-vyoma-ink">{s.title}</h2>
            <p className="mt-3 text-[15px] leading-[1.85] text-vyoma-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
