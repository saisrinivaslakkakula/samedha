import SectionWrapper from "./SectionWrapper";

export default function WhyBuilt() {
  return (
    <SectionWrapper id="why" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="section-divider mb-24" />

      <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-6">
        Why
      </p>

      <h2 className="font-serif text-[clamp(2.2rem,6vw,5rem)] font-light text-text-primary leading-tight mb-12 md:mb-16">
        Because I wanted to build it.
      </h2>

      <div className="max-w-2xl space-y-5 font-sans text-text-muted text-sm md:text-base leading-relaxed">
        <p>
          Tools like this exist. Notion, Obsidian, Mem — there are products
          that do pieces of what Samedha does, and some that do more. I knew
          this going in.
        </p>
        <p>
          I built it anyway. Because there is a different kind of understanding
          that only comes from building something yourself — from choosing the
          database, debugging the vector search, wiring the first tool to call
          your own API and watching it work. That understanding is not
          available for download.
        </p>
        <p>
          Samedha is that understanding, made tangible. It is a fun project
          that became a real system. A weekend build that turned into something
          I use every day.
        </p>
        <p className="text-text-primary font-serif text-lg md:text-xl italic leading-relaxed pt-4">
          "The best reason to build something is that you want to know exactly
          how it works."
        </p>
      </div>
    </SectionWrapper>
  );
}
