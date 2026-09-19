import { journey, type JourneyEntry } from "@/lib/journey";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

function Node({ entry }: { entry: JourneyEntry }) {
  const ongoing = entry.status === "ongoing";
  return (
    <span
      className={`brutal-border relative z-10 flex size-6 items-center justify-center shadow-brutal-sm ${entry.accent}`}
    >
      {ongoing && (
        <span className="absolute inline-flex size-full animate-ping bg-lime opacity-60 motion-reduce:animate-none" />
      )}
    </span>
  );
}

function Entry({ entry }: { entry: JourneyEntry }) {
  return (
    <div className="relative grid grid-cols-[1.5rem_1fr] gap-x-5 sm:grid-cols-[5rem_1.5rem_1fr]">
      {/* Timeframe — left column on sm+, inline chip below */}
      <span className="section-label hidden pt-1.5 text-right sm:block">{entry.time}</span>

      <div className="flex justify-center pt-1">
        <Node entry={entry} />
      </div>

      <div className="brutal-card flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="brutal-border bg-paper px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider sm:hidden">
            {entry.time}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
              entry.status === "ongoing" ? "bg-lime" : "bg-yellow"
            }`}
          >
            {entry.status === "ongoing" && (
              <span className="size-1.5 animate-pulse rounded-full bg-ink motion-reduce:animate-none" />
            )}
            {entry.status === "ongoing" ? "Ongoing" : "Milestone"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl font-bold sm:text-2xl">{entry.title}</h3>
          <p className="leading-relaxed text-ink-2">{entry.description}</p>
        </div>

        {entry.projects && (
          <ul className="flex flex-wrap gap-2">
            {entry.projects.map((p) => (
              <li key={p}>
                <a
                  href="#projects"
                  className="inline-block border-2 border-ink bg-paper px-2 py-0.5 font-mono text-[11px] font-bold transition-colors hover:bg-yellow"
                >
                  {p}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="px-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-14">
        <Reveal>
          <SectionHeading number="04" label="Journey" title="My Journey" />
        </Reveal>

        <div className="relative mx-auto w-full max-w-3xl">
          {/* Vertical rail: sits behind the nodes (centre of the 1.5rem node column) */}
          <div
            aria-hidden
            className="absolute bottom-6 top-2 left-[calc(0.75rem-1.5px)] w-[3px] bg-ink sm:left-[calc(5rem+1.25rem+0.75rem-1.5px)]"
          />

          <ol className="flex flex-col gap-10">
            {journey.map((entry, i) => (
              <li key={entry.title}>
                <Reveal delay={i * 0.1}>
                  <Entry entry={entry} />
                </Reveal>
              </li>
            ))}

            {/* Open-ended next stop */}
            <li>
              <Reveal delay={journey.length * 0.1}>
                <div className="grid grid-cols-[1.5rem_1fr] items-center gap-x-5 sm:grid-cols-[5rem_1.5rem_1fr]">
                  <span className="section-label hidden text-right sm:block">Next</span>
                  <div className="flex justify-center">
                    <span className="relative z-10 size-6 border-[3px] border-dashed border-ink bg-paper" />
                  </div>
                  <a
                    href="#contact"
                    className="section-label group inline-flex items-center gap-2 text-ink-2 hover:text-ink"
                  >
                    <span className="sm:hidden">Next:</span> your team here?
                    <span className="inline-block h-[1em] w-[0.55em] animate-blink bg-ink-2 motion-reduce:animate-none group-hover:bg-ink" />
                  </a>
                </div>
              </Reveal>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
