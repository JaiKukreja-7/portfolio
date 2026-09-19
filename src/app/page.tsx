import { About } from "@/components/about";
import { Expertise } from "@/components/expertise";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />

      <About />
      <Expertise />
      <Projects />
      <Journey />

      {/* Temporary anchor so the nav / hero CTAs have a target. Replaced in step 7. */}
      <section id="contact" className="min-h-[60vh] px-6 py-24">
        <span className="section-label">[ 06 — CONTACT ]</span>
      </section>
    </main>
  );
}
