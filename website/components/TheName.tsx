import SectionWrapper from "./SectionWrapper";

export default function TheName() {
  return (
    <SectionWrapper id="name" className="py-24 px-6 max-w-4xl mx-auto">
      <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-6">
        The Name
      </p>

      <h2 className="font-serif text-[clamp(2.2rem,6vw,5rem)] font-light text-text-primary leading-tight mb-12 md:mb-16">
        Where it comes from.
      </h2>

      {/* Etymology breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-text-dim/20 rounded-2xl overflow-hidden mb-12 md:mb-16">
        <div className="bg-bg p-7 md:p-8 flex flex-col gap-3">
          <span className="font-serif text-5xl md:text-6xl text-gold font-light tracking-wide">
            Sai
          </span>
          <span className="font-sans text-text-muted text-xs tracking-widest uppercase">
            The builder
          </span>
          <p className="font-sans text-text-muted text-sm leading-relaxed">
            From the builder's name. A personal stake in every memory stored.
          </p>
        </div>

        <div className="bg-bg p-7 md:p-8 flex flex-col gap-3">
          <span className="font-serif text-5xl md:text-6xl text-gold font-light tracking-wide">
            Medha
          </span>
          <span className="font-sans text-text-muted text-xs tracking-widest uppercase">
            Sanskrit — intellect
          </span>
          <p className="font-sans text-text-muted text-sm leading-relaxed">
            The faculty of retaining what is learned. Cognitive memory.
            One of the oldest words for the thing this does.
          </p>
        </div>

        <div className="bg-surface p-7 md:p-8 flex flex-col gap-3">
          <span className="font-serif text-5xl md:text-6xl text-gold-light font-light tracking-wide">
            Samedha
          </span>
          <span className="font-sans text-text-muted text-xs tracking-widest uppercase">
            The combination
          </span>
          <p className="font-sans text-text-muted text-sm leading-relaxed">
            A name that is both personal and exact — meaning
            the very thing it was built to be.
          </p>
        </div>
      </div>

      <p className="font-serif text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl italic">
        "The happy accident was that the name I chose for a personal project
        turned out to be the most precise description of it. In Sanskrit,{" "}
        <em className="text-text-primary not-italic">medha</em> is not just
        memory — it is the capacity to learn, retain, and synthesise. That is
        exactly what this is."
      </p>
    </SectionWrapper>
  );
}
