import SectionWrapper from "./SectionWrapper";

export default function TheName() {
  return (
    <SectionWrapper id="name" className="py-12 px-6 max-w-4xl mx-auto">
      <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-6">
        The Name
      </p>

      <h2 className="font-serif text-[clamp(2.2rem,6vw,5rem)] font-light text-text-primary leading-tight mb-6 md:mb-8">
        Where it comes from.
      </h2>

      {/* Equation: Sai + Medha = Samedha */}
      {/* Mobile: vertical stack. Desktop: horizontal row with operators */}
      <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-0 mb-6 md:mb-8">

        {/* Sai */}
        <div className="bg-surface border border-text-dim/20 rounded-2xl md:rounded-r-none md:rounded-l-2xl p-7 md:p-8 flex flex-col gap-3 flex-1">
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

        {/* + */}
        <div className="hidden md:flex items-center justify-center px-3 border-y border-text-dim/20 bg-bg">
          <span className="font-serif text-3xl text-gold font-light">+</span>
        </div>
        <div className="flex md:hidden items-center justify-center py-1">
          <span className="font-serif text-2xl text-gold font-light">+</span>
        </div>

        {/* Medha */}
        <div className="bg-surface border border-text-dim/20 md:border-x-0 rounded-2xl md:rounded-none p-7 md:p-8 flex flex-col gap-3 flex-1">
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

        {/* = */}
        <div className="hidden md:flex items-center justify-center px-3 border-y border-text-dim/20 bg-bg">
          <span className="font-serif text-3xl text-gold-light font-light">=</span>
        </div>
        <div className="flex md:hidden items-center justify-center py-1">
          <span className="font-serif text-2xl text-gold-light font-light">=</span>
        </div>

        {/* Samedha */}
        <div className="bg-gold/5 border border-gold/25 rounded-2xl md:rounded-l-none md:rounded-r-2xl p-7 md:p-8 flex flex-col gap-3 flex-1">
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
