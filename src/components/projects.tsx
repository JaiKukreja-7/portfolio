import Image from "next/image";
import { projects, type Project } from "@/lib/projects";
import { ImageCarousel } from "@/components/image-carousel";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ExternalLinkIcon, GitHubIcon } from "@/components/icons";

/* ---------- Building blocks ---------- */

function InitialsPanel({ project, className = "" }: { project: Project; className?: string }) {
  // Stand-in for a screenshot: striped accent panel with the project's initials.
  const initials = project.initials ?? project.name.slice(0, 2).toUpperCase();

  return (
    <div
      className={`relative flex aspect-video w-full items-center justify-center overflow-hidden ${project.accent} ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 [background-image:repeating-linear-gradient(135deg,var(--color-ink)_0_2px,transparent_2px_14px)]"
      />
      <span className="relative font-display text-7xl font-bold tracking-tight sm:text-8xl">
        {initials}
      </span>
      <span className="section-label absolute bottom-3 left-4 text-ink">
        {project.slug}
      </span>
    </div>
  );
}

function Media({
  project,
  sizes,
  className = "",
  fit = "cover",
}: {
  project: Project;
  sizes: string;
  className?: string;
  /** "contain" shows the whole screenshot (letterboxed on paper-2) when the slot isn't 16:9. */
  fit?: "cover" | "contain";
}) {
  if (!project.images?.length) return <InitialsPanel project={project} className={className} />;
  if (project.images.length === 1) {
    const img = project.images[0];
    return (
      <div className={`relative aspect-video w-full overflow-hidden bg-paper-2 ${className}`}>
        <Image src={img.src} alt={img.alt} fill sizes={sizes} className={fit === "contain" ? "object-contain" : "object-cover"} />
      </div>
    );
  }
  return <ImageCarousel images={project.images} sizes={sizes} className={className} fit={fit} />;
}

function Links({ links }: { links: NonNullable<Project["links"]> }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.live && (
        <a
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-border brutal-press inline-flex items-center gap-2 bg-yellow px-4 py-2 font-display text-sm font-bold shadow-brutal-sm"
        >
          Live
          <ExternalLinkIcon width={16} height={16} />
        </a>
      )}
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-border brutal-press inline-flex items-center gap-2 bg-white px-4 py-2 font-display text-sm font-bold shadow-brutal-sm"
        >
          <GitHubIcon width={16} height={16} />
          GitHub
        </a>
      )}
    </div>
  );
}

function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t} className="border-2 border-ink bg-paper px-2 py-0.5 font-mono text-[11px] font-bold">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Header({ project, index }: { project: Project; index: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span
          className={`brutal-border flex size-8 shrink-0 items-center justify-center font-mono text-xs font-bold ${project.accent}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="section-label">{project.context}</span>
        {project.status === "in-progress" && (
          <span className="ml-auto inline-flex items-center gap-1.5 border-2 border-ink bg-coral px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
            <span className="size-1.5 animate-pulse rounded-full bg-ink motion-reduce:animate-none" />
            In Progress
          </span>
        )}
      </div>
      <h3 className="font-display text-2xl font-bold sm:text-3xl">{project.name}</h3>
    </div>
  );
}

/* ---------- Cards ---------- */

const cardClass =
  "brutal-card flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg";

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`${cardClass} lg:grid lg:grid-cols-[1.25fr_1fr]`}>
      <div className="border-b-[3px] border-ink lg:border-b-0 lg:border-r-[3px]">
        <Media
          project={project}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="lg:aspect-auto lg:h-full lg:min-h-80"
          fit="contain"
        />
      </div>
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <Header project={project} index={index} />
        <p className="leading-relaxed text-ink-2">{project.description}</p>
        {project.tags && <Tags tags={project.tags} />}
        {project.links && <div className="mt-auto pt-2"><Links links={project.links} /></div>}
      </div>
    </article>
  );
}

function Card({ project, index }: { project: Project; index: number }) {
  return (
    <article className={cardClass}>
      <div className="border-b-[3px] border-ink">
        <Media project={project} sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <Header project={project} index={index} />
        <p className="leading-relaxed text-ink-2">{project.description}</p>
        {project.tags && <Tags tags={project.tags} />}
        {project.links && <div className="mt-auto pt-2"><Links links={project.links} /></div>}
      </div>
    </article>
  );
}

/* ---------- Section ---------- */

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-14">
        <Reveal>
          <SectionHeading number="03" label="Projects" title="What I Built" />
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 2) * 0.1}
              className={p.featured ? "md:col-span-2" : undefined}
            >
              {p.featured ? <FeaturedCard project={p} index={i} /> : <Card project={p} index={i} />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
