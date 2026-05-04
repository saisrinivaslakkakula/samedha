import SectionWrapper from "./SectionWrapper";

export default function TheName() {
  return (
    <SectionWrapper id="name" className="py-28 px-6 max-w-4xl mx-auto">
      <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-6">
        The Name
      </p>

      <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light text-text-primary leading-tight mb-16">
        Where it comes from.
      </h2>

      {/* Etymology breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-text-dim/20 rounded-2xl overflow-hidden mb-16">
        <div className="bg-bg p-8 flex flex-col gap-3">
          <span className="font-serif text-4xl text-gold font-light">सै</span>
          <span className="font-sans text-text-muted text-xs tracking-widest uppercase">Sai</span>
          <p className="font-sans text-text-muted text-sm leading-relaxed">
            From the builder's name. A personal stake in every memory stored.
          </p>
        </div>
        <div className="bg-bg p-8 flex flex-col gap-3">
          <span className="font-serif text-4xl text-gold font-light">मेधा</span>
          <span className="font-sans text-text-muted text-xs tracking-widest uppercase">Medha</span>
          <p className="font-sans text-text-muted text-sm leading-relaxed">
            Sanskrit — the faculty of retaining what is learned. Intellect.
            Cognitive memory. One of the oldest words for the thing this does.
          </p>
        </div>
        <div className="bg-surface p-8 flex flex-col gap-3">
          <span className="font-serif text-4xl text-gold-light font-light">सामेधा</span>
          <span className="font-sans text-text-muted text-xs tracking-widest uppercase">Samedha</span>
          <p className="font-sans text-text-muted text-sm leading-relaxed">
            The combination. A name that is both personal and exact — meaning
            the very thing it was built to be.
          </p>
        </div>
      </div>

      <p className="font-serif text-xl text-text-muted leading-relaxed max-w-2xl italic">
        "The happy accident was that the name I chose for a personal project
        turned out to be the most precise description of it. In Sanskrit,{" "}
        <em className="text-text-primary not-italic">medha</em> is not just
        memory — it is the capacity to learn, retain, and synthesise. That is
        exactly what this is."
      </p>
    </SectionWrapper>
  );
}
