import SectionWrapper from "./SectionWrapper";

export default function TheFuture() {
  return (
    <SectionWrapper id="future" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="section-divider mb-24" />

      <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-6">
        The Future
      </p>

      <h2 className="font-serif text-[clamp(2.2rem,6vw,5rem)] font-light text-text-primary leading-tight mb-12 md:mb-16">
        Where this goes.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-text-dim/20 rounded-2xl overflow-hidden">
        {/* For Me */}
        <div className="bg-bg p-8 md:p-10 flex flex-col gap-6">
          <div>
            <span className="font-sans text-xs text-gold tracking-widest uppercase">
              For Me
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-text-primary mt-2 font-light">
              The cyborg build.
            </h3>
          </div>

          <p className="font-sans text-text-muted leading-relaxed text-sm">
            Samedha is not a product yet. It is infrastructure. The plan is to
            wire every tool I use into a single layer of persistent context —
            so that switching between Claude, ChatGPT, or Gemini feels like
            switching tabs, not starting over.
          </p>

          <ul className="font-sans text-sm text-text-muted space-y-3">
            {[
              "WhatsApp — message my Second Brain like a contact",
              "Voice notes → memories, transcribed and indexed",
              "Weekly digests of what I've learned and decided",
              "A version of me that never forgets",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-gold mt-0.5 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* For You */}
        <div className="bg-surface p-8 md:p-10 flex flex-col gap-6">
          <div>
            <span className="font-sans text-xs text-teal tracking-widest uppercase">
              For You
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-text-primary mt-2 font-light">
              The digital twin.
            </h3>
          </div>

          <p className="font-sans text-text-muted leading-relaxed text-sm">
            What if the people who want to reach you could talk to a version of
            you — trained on your actual knowledge, values, and experience —
            when you're not available?
          </p>

          <ul className="font-sans text-sm text-text-muted space-y-3">
            {[
              "Ask Samedha questions I would answer",
              "Schedule time with me through my digital twin",
              "Drop a thought — it reaches me when I'm ready",
              "As my knowledge grows, so does the twin",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-teal mt-0.5 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-sans text-text-dim text-xs leading-relaxed mt-auto pt-2">
            This is a long game. The twin is only as good as the memory behind
            it. That is what is being built right now.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
