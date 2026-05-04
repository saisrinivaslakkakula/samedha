import SectionWrapper from "./SectionWrapper";

export default function TheProblem() {
  return (
    <SectionWrapper id="idea" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="section-divider mb-24" />

      <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-6">
        The Idea
      </p>

      <h2 className="font-serif text-[clamp(2.2rem,6vw,5rem)] font-light text-text-primary leading-tight mb-12 md:mb-16">
        The problem no one talks about.
      </h2>

      <div className="space-y-12 md:space-y-16 max-w-2xl">
        {/* Beat 1 */}
        <div className="flex gap-5 md:gap-6">
          <span className="font-serif text-4xl md:text-5xl text-text-dim font-light leading-none mt-1 shrink-0">
            01
          </span>
          <div>
            <h3 className="font-serif text-xl md:text-2xl text-text-primary mb-3">
              Your AI forgets you.
            </h3>
            <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed">
              Every insight worked through in a Claude session, every career
              decision reasoned out in ChatGPT, every research thread in Gemini
              — gone when the tab closes. The tools are powerful. The memory
              is not. You re-introduce yourself every single conversation.
            </p>
          </div>
        </div>

        {/* Beat 2 */}
        <div className="flex gap-5 md:gap-6">
          <span className="font-serif text-4xl md:text-5xl text-text-dim font-light leading-none mt-1 shrink-0">
            02
          </span>
          <div>
            <h3 className="font-serif text-xl md:text-2xl text-text-primary mb-3">
              The tools don't talk to each other.
            </h3>
            <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed">
              Something understood in Claude cannot be recalled in ChatGPT.
              A career reflection in one tool is invisible to another.
              There is no shared layer. There is no continuity. Your knowledge
              is scattered across a dozen chat windows with no owner.
            </p>
          </div>
        </div>

        {/* Beat 3 — Karpathy */}
        <div className="flex gap-5 md:gap-6">
          <span className="font-serif text-4xl md:text-5xl text-text-dim font-light leading-none mt-1 shrink-0">
            03
          </span>
          <div>
            <h3 className="font-serif text-xl md:text-2xl text-text-primary mb-3">
              Then the man himself spoke.
            </h3>
            <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed">
              Honestly, I'd been sitting with this problem for a while. The
              scattered context, the tool-switching, the starting over — it
              bothered me, but not enough to act. Then Andrej Karpathy did what
              he always does: took something I'd been vaguely feeling and
              structured it so clearly I had no excuse left.
            </p>
            <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed mt-4">
              He wrote about the idea of a personal second brain — a knowledge
              layer that persists underneath all the tools, that actually knows
              you. The man co-founded OpenAI and somehow still finds time to
              crystallise the exact thought you needed. That was the push.
              I stopped thinking about it and built it.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
