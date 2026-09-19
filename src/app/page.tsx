// Temporary token showcase — replaced by real sections in later build steps.
const swatches = [
  ["paper", "bg-paper"],
  ["paper-2", "bg-paper-2"],
  ["ink", "bg-ink"],
  ["yellow", "bg-yellow"],
  ["coral", "bg-coral"],
  ["lime", "bg-lime"],
  ["sky", "bg-sky"],
  ["violet", "bg-violet"],
  ["term", "bg-term"],
] as const;

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <span className="section-label">[ 00 — TOKENS ]</span>
        <h1 className="font-display text-5xl font-bold">Design tokens check</h1>
        <p className="text-ink-2 max-w-prose">
          Body text in Inter. Headings in Space Grotesk.{" "}
          <code className="font-mono bg-yellow px-1">Code in JetBrains Mono.</code>
        </p>
      </header>

      <section className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {swatches.map(([name, cls]) => (
          <div key={name} className="flex flex-col gap-2">
            <div className={`${cls} brutal-border h-16 shadow-brutal`} />
            <span className="font-mono text-xs">{name}</span>
          </div>
        ))}
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        <div className="brutal-card p-6">
          <h3 className="text-xl font-bold">Card</h3>
          <p className="text-ink-2 text-sm mt-2">brutal-card: 3px border + hard 4px shadow.</p>
        </div>
        <button className="brutal-card brutal-press bg-yellow p-6 text-left font-bold">
          Press me
        </button>
        <div className="brutal-border bg-term text-term-fg p-6 font-mono text-sm shadow-brutal">
          <span className="text-term-green">$</span> npm run dev
          <br />
          <span className="text-term-muted">✓ ready on localhost:3000</span>
        </div>
      </section>
    </main>
  );
}
