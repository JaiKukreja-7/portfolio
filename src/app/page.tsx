import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />

      {/* Temporary anchors so the nav / hero CTAs have targets.
          Replaced by real sections in later build steps. */}
      <section id="about" className="min-h-[60vh] px-6 py-24">
        <span className="section-label">[ 01 — ABOUT ]</span>
      </section>
      <section id="expertise" className="min-h-[60vh] px-6 py-24">
        <span className="section-label">[ 02 — EXPERTISE ]</span>
      </section>
      <section id="projects" className="min-h-[60vh] px-6 py-24">
        <span className="section-label">[ 03 — PROJECTS ]</span>
      </section>
      <section id="experience" className="min-h-[60vh] px-6 py-24">
        <span className="section-label">[ 04 — EXPERIENCE ]</span>
      </section>
      <section id="contact" className="min-h-[60vh] px-6 py-24">
        <span className="section-label">[ 06 — CONTACT ]</span>
      </section>
    </main>
  );
}
