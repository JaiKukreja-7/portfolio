import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ArrowDownIcon } from "@/components/icons";

const facts = [
  { key: "college", value: site.college },
  { key: "year", value: site.year },
  { key: "location", value: site.location },
  { key: "status", value: "Open to internships" },
];

export function About() {
  return (
    <section id="about" className="px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-5xl items-start gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
        {/* Left: label, heading, bio, CV */}
        <Reveal className="flex flex-col gap-8">
          <SectionHeading number="01" label="About" title="Who Am I?" />

          <p className="max-w-prose text-lg leading-relaxed text-ink-2 sm:text-xl">
            {site.bio}
          </p>

          <div>
            <a
              href={site.resumeUrl}
              className="brutal-border brutal-press inline-flex items-center gap-2 bg-coral px-6 py-3 font-display text-base font-bold shadow-brutal"
            >
              <ArrowDownIcon width={18} height={18} />
              CV
            </a>
          </div>
        </Reveal>

        {/* Right: pinned portrait + quick-facts card */}
        <div className="flex flex-col gap-10">
          <Reveal delay={0.1} className="flex justify-center md:justify-start">
            {/* Polaroid-style frame, slightly tilted like a pinned photo */}
            <figure className="brutal-border relative w-64 -rotate-2 bg-white p-3 pb-2 shadow-brutal transition-transform duration-200 hover:rotate-0 sm:w-72">
              {/* Tape strip */}
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-3 border-2 border-ink/40 bg-yellow/90"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-ink bg-sky">
                <Image
                  src={site.photo.src}
                  alt={site.photo.alt}
                  fill
                  sizes="(min-width: 640px) 288px, 256px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-center font-mono text-xs text-ink-2">
                {site.initials.toLowerCase()}.jpg
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="brutal-card bg-yellow p-6 sm:p-8">
              <p className="section-label mb-5">{"// quick_facts.json"}</p>
              <dl className="flex flex-col gap-4 font-mono text-sm">
                {facts.map((f) => (
                  <div key={f.key} className="flex flex-col gap-1 border-b-2 border-ink/20 pb-4 last:border-b-0 last:pb-0">
                    <dt className="text-xs uppercase tracking-wider text-ink-2">{f.key}</dt>
                    <dd className="font-bold">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
