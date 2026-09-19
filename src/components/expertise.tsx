import { Fragment, type ReactNode } from "react";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Spinner, Status, Terminal } from "@/components/terminal";

// Syntax-highlight helpers for the mock snippets.
const G = ({ children }: { children: ReactNode }) => <span className="text-term-green">{children}</span>;
const Y = ({ children }: { children: ReactNode }) => <span className="text-term-yellow">{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className="text-term-cyan">{children}</span>;
const P = ({ children }: { children: ReactNode }) => <span className="text-term-pink">{children}</span>;
const M = ({ children }: { children: ReactNode }) => <span className="text-term-muted">{children}</span>;

// Keys each snippet line so the array can cross the server→client boundary cleanly.
const lines = (...nodes: ReactNode[]) => nodes.map((n, i) => <Fragment key={i}>{n}</Fragment>);

type Area = {
  title: string;
  description: string;
  accent: string; // bg-* token for the number tag
  widget: { title: string; lines: ReactNode[] };
};

const areas: Area[] = [
  {
    title: "Full-Stack Web Development",
    description:
      "Building end-to-end web apps with modern JS frameworks, from database design to responsive UI.",
    accent: "bg-yellow",
    widget: {
      title: "dev: npm run dev",
      lines: lines(
        <><G>$</G> npm run dev</>,
        <><M>db   ▸</M> <Status label="connected" /></>,
        <><M>api  ▸</M> <Status label="listening :3000" /></>,
        <><M>ui   ▸</M> <Status label="hydrated" /></>,
        <><Y>✓</Y> ready: full stack up</>,
      ),
    },
  },
  {
    title: "Frontend Engineering",
    description: "Crafting clean, responsive, accessible interfaces.",
    accent: "bg-sky",
    widget: {
      title: "button.tsx",
      lines: lines(
        <><P>export function</P> <C>Button</C>({"{"} <Y>children</Y> {"}"}) {"{"}</>,
        <>{"  "}<P>return</P> (</>,
        <>{"    "}&lt;<C>button</C> <Y>className</Y>=<G>&quot;brutal-press&quot;</G></>,
        <>{"      "}<Y>aria-label</Y>=<G>&quot;…&quot;</G>&gt;{"{"}children{"}"}&lt;/<C>button</C>&gt;</>,
        <>{"  "});</>,
        <>{"}"}</>,
      ),
    },
  },
  {
    title: "AI-Integrated Applications",
    description: "Building apps that use AI/ML APIs for real product features.",
    accent: "bg-violet",
    widget: {
      title: "ai: scan.ts",
      lines: lines(
        <><G>&gt;</G> <C>await</C> analyze(<G>&quot;label.jpg&quot;</G>)</>,
        <><M>→ extracting ingredients…</M></>,
        <><M>→ calling model endpoint…</M></>,
        <><Spinner className="text-term-yellow" /> streaming response</>,
      ),
    },
  },
  {
    title: "Team & Hackathon Projects",
    description: "Collaborative builds under deadline (SIH-style hackathon projects).",
    accent: "bg-lime",
    widget: {
      title: "git: log --graph",
      lines: lines(
        <><G>$</G> git log --oneline --graph</>,
        <><Y>*</Y>   <M>merge</M> feature/planner → main</>,
        <><M>|\</M>  </>,
        <><M>|</M> <C>*</C> <M>feat:</M> block scheduling ui</>,
        <><C>*</C> <M>|</M> <M>feat:</M> conflict detection api</>,
        <><M>|/</M>  <Status label="ship it, 36h deadline" color="bg-coral" /></>,
      ),
    },
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="scroll-mt-0">
      {/* Ticker strip separating About from Expertise */}
      <Marquee items={areas.map((a) => a.title)} tilt />

      <div className="px-6 py-24 sm:py-32">
        <div className="mx-auto flex max-w-5xl flex-col gap-14">
          <Reveal>
            <SectionHeading number="02" label="Expertise" title="What I Do" />
          </Reveal>

          <ul className="grid gap-8 md:grid-cols-2">
            {areas.map((area, i) => (
              <li key={area.title}>
                <Reveal delay={i * 0.1} className="brutal-card flex h-full flex-col gap-5 p-6">
                  <div className="flex items-start gap-4">
                    <span
                      className={`brutal-border flex size-10 shrink-0 items-center justify-center font-mono text-sm font-bold ${area.accent}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-display text-xl font-bold sm:text-2xl">{area.title}</h3>
                      <p className="text-sm leading-relaxed text-ink-2 sm:text-base">{area.description}</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Terminal title={area.widget.title} lines={area.widget.lines} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
