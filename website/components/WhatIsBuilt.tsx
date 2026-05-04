import SectionWrapper from "./SectionWrapper";

const tools = ["Claude", "ChatGPT", "Gemini"];

export default function WhatIsBuilt() {
  return (
    <SectionWrapper id="built" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="section-divider mb-24" />

      <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-6">
        What's Built
      </p>

      <h2 className="font-serif text-[clamp(2.2rem,6vw,5rem)] font-light text-text-primary leading-tight mb-12 md:mb-16">
        One memory. Every tool.
      </h2>

      {/* Visual — mobile: vertical stack, desktop: horizontal flow */}
      <div className="mb-12 md:mb-16">
        {/* Mobile layout */}
        <div className="flex flex-col items-center gap-2 md:hidden">
          {tools.map((tool) => (
            <div key={tool} className="flex flex-col items-center gap-2">
              <div className="border border-text-dim/30 rounded-xl px-6 py-3 font-sans text-sm text-text-muted w-40 text-center">
                {tool}
              </div>
              <div className="w-px h-5 bg-gradient-to-b from-text-dim/40 to-gold/40" />
            </div>
          ))}
          <div className="border border-gold/40 bg-gold/5 rounded-xl px-8 py-4 font-serif text-2xl text-gold text-center w-44">
            Samedha
          </div>
          <div className="w-px h-5 bg-gradient-to-b from-gold/60 to-teal/60" />
          <div className="border border-teal/30 bg-teal/5 rounded-xl px-6 py-3 font-sans text-sm text-teal w-40 text-center">
            Your Memory
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-center gap-6">
          {tools.map((tool) => (
            <div key={tool} className="flex items-center gap-6">
              <div className="border border-text-dim/30 rounded-xl px-5 py-3 font-sans text-sm text-text-muted">
                {tool}
              </div>
              <div className="w-8 h-px bg-gradient-to-r from-text-dim/40 to-gold/60" />
            </div>
          ))}
          <div className="border border-gold/40 bg-gold/5 rounded-xl px-6 py-4 font-serif text-xl text-gold">
            Samedha
          </div>
          <div className="w-8 h-px bg-gradient-to-r from-gold/60 to-teal/60" />
          <div className="border border-teal/30 bg-teal/5 rounded-xl px-5 py-3 font-sans text-sm text-teal">
            Your Memory
          </div>
        </div>
      </div>

      <p className="font-sans text-text-muted leading-relaxed max-w-2xl mb-6">
        Samedha is a personal memory API. Any AI tool can save to it and
        retrieve from it. Your knowledge lives in one place. It is searchable
        by meaning, not just keyword. And it is yours — self-hosted, private,
        exportable at any time.
      </p>

      <p className="font-sans text-text-muted leading-relaxed max-w-2xl mb-12 md:mb-16">
        A conversation in Claude about a career decision. Retrieved in ChatGPT
        six weeks later without re-explaining. That is what this does.
      </p>

      {/* Sambhash teaser */}
      <div className="border border-text-dim/20 rounded-2xl p-7 md:p-8 bg-surface/50 inline-flex flex-col gap-2 w-full md:w-auto">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-gold/60 animate-pulse-slow" />
          <span className="font-sans text-xs text-text-dim tracking-widest uppercase">
            Coming Soon
          </span>
        </div>
        <p className="font-serif text-2xl text-text-primary font-light">
          Sambhash
        </p>
        <p className="font-sans text-text-muted text-sm">
          A conversational interface to your Second Brain. Ask it anything.
        </p>
      </div>
    </SectionWrapper>
  );
}
