export default function Footer() {
  return (
    <footer className="py-8 md:py-10 px-6 max-w-4xl mx-auto">
      <div className="section-divider mb-8" />

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl md:text-3xl text-text-primary font-light mb-2">
            Samedha
          </p>
          <p className="font-sans text-text-muted text-sm">
            This is a living project. Come back.
          </p>
        </div>

        <p className="font-sans text-text-dim text-xs md:text-right">
          © 2026 Samedha. Built by hand.
        </p>
      </div>
    </footer>
  );
}
