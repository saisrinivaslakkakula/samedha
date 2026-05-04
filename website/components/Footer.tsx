export default function Footer() {
  return (
    <footer className="py-20 px-6 max-w-4xl mx-auto">
      <div className="section-divider mb-16" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-serif text-3xl text-text-primary font-light mb-2">
            Samedha
          </p>
          <p className="font-sans text-text-muted text-sm">
            This is a living project. Come back.
          </p>
        </div>

        <div className="text-right">
          <p className="font-sans text-text-dim text-xs">
            © 2026 Samedha. Built by hand.
          </p>
        </div>
      </div>
    </footer>
  );
}
