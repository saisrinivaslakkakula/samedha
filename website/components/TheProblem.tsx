import SectionWrapper from "./SectionWrapper";

export default function TheProblem() {
  return (
    <SectionWrapper id="idea" className="py-28 px-6 max-w-4xl mx-auto">
      <div className="section-divider mb-28" />

      <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-6">
        The Idea
      </p>

      <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light text-text-primary leading-tight mb-16">
        The problem no one talks about.
      </h2>

      <div className="space-y-16 max-w-2xl">
        {/* Beat 1 */}
        <div className="flex gap-6">
          <span className="font-serif text-5xl text-text-dim font-light leading-none mt-1 shrink-0">
            01
          </span>
          <div>
            <h3 className="font-serif text-2xl text-text-primary mb-3">
              Your AI forgets you.
            </h3>
            <p className="font-sans text-text-muted leading-relaxed">
              Every insight worked through in a Claude session, every career
              decision reasoned out in ChatGPT, every research thread in Gemini
              — gone when the tab closes. The tools are powerful. The memory
              is not. You re-introduce yourself every single conversation.
            </p>
          </div>
        </div>

        {/* Beat 2 */}
        <div className="flex gap-6">
          <span className="font-serif text-5xl text-text-dim font-light leading-none mt-1 shrink-0">
            02
          </span>
          <div>
            <h3 className="font-serif text-2xl text-text-primary mb-3">
              The tools don't talk to each other.
            </h3>
            <p className="font-sans text-text-muted leading-relaxed">
              Something understood in Claude cannot be recalled in ChatGPT.
              A career reflection in one tool is invisible to another.
              There is no shared layer. There is no continuity. Your knowledge
              is scattered across a dozen chat windows with no owner.
            </p>
          </div>
        </div>

        {/* Beat 3 — Karpathy */}
        <div className="flex gap-6">
          <span className="font-serif text-5xl text-text-dim font-light leading-none mt-1 shrink-0">
            03
          </span>
          <div>
            <h3 className="font-serif text-2xl text-text-primary mb-3">
              The signal.
            </h3>
            <p className="font-sans text-text-muted leading-relaxed">
              Andrej Karpathy — co-founder of OpenAI, the person who built the
              neural net curriculum half the industry learned from — wrote about
              the idea of a second brain. A personal knowledge layer that
              persists. That knows you. That sits underneath all the tools and
              holds the thread.
            </p>
            <p className="font-sans text-text-muted leading-relaxed mt-4">
              That idea sat with me. And I built it.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
