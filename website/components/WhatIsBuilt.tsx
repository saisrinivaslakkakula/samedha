import SectionWrapper from "./SectionWrapper";

const tools = ["ChatGPT", "Claude", "Gemini"];

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

      {/* Flow diagram — tools converge into Samedha → Your Memory */}
      <div className="flex items-center justify-center gap-0 mb-12 md:mb-16">

        {/* Left column: three tools stacked */}
        <div className="flex flex-col gap-3 md:gap-4">
          {tools.map((tool) => (
            <div
              key={tool}
              className="border border-text-dim/30 rounded-xl px-5 md:px-6 py-2.5 md:py-3 font-sans text-sm text-text-muted text-center min-w-[96px] md:min-w-[108px]"
            >
              {tool}
            </div>
          ))}
        </div>

        {/* Converging arrows */}
        <div className="flex flex-col gap-3 md:gap-4 mx-1 md:mx-2">
          {tools.map((tool) => (
            <div key={tool} className="flex items-center h-[38px] md:h-[42px]">
              <svg
                width="40"
                height="2"
                viewBox="0 0 40 2"
                className="text-text-dim/50"
              >
                <line x1="0" y1="1" x2="34" y2="1" stroke="currentColor" strokeWidth="1" />
                <polygon points="34,0 40,1 34,2" fill="currentColor" />
              </svg>
            </div>
          ))}
        </div>

        {/* Samedha node */}
        <div className="border border-gold/50 bg-gold/5 rounded-xl px-5 md:px-7 py-4 md:py-5 font-serif text-lg md:text-xl text-gold text-center self-center">
          Samedha
        </div>

        {/* Arrow to Your Memory */}
        <div className="flex items-center mx-1 md:mx-2">
          <svg
            width="40"
            height="2"
            viewBox="0 0 40 2"
            className="text-gold/50"
          >
            <line x1="0" y1="1" x2="34" y2="1" stroke="currentColor" strokeWidth="1" />
            <polygon points="34,0 40,1 34,2" fill="currentColor" />
          </svg>
        </div>

        {/* Your Memory node */}
        <div className="border border-teal/30 bg-teal/5 rounded-xl px-4 md:px-6 py-2.5 md:py-3 font-sans text-sm text-teal text-center self-center">
          Your Memory
        </div>
      </div>

      <p className="font-sans text-text-muted leading-relaxed max-w-2xl mb-6 text-sm md:text-base">
        Samedha is a personal memory API. Any AI tool can save to it and
        retrieve from it. Your knowledge lives in one place. It is searchable
        by meaning, not just keyword. And it is yours — self-hosted, private,
        exportable at any time.
      </p>

      <p className="font-sans text-text-muted leading-relaxed max-w-2xl mb-12 md:mb-16 text-sm md:text-base">
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
