import { site } from "@/lib/site";
import { SocialIcons } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-paper-2 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        {/* Wordmark + tagline */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
          <a
            href="#hero"
            aria-label={`${site.name}, back to top`}
            className="brutal-border flex size-9 shrink-0 items-center justify-center bg-yellow font-display text-sm font-bold shadow-brutal-sm"
          >
            {site.initials}
          </a>
          <div className="flex flex-col">
            <span className="font-display font-bold">{site.name}</span>
            <span className="text-sm text-ink-2">{site.tagline}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:items-end">
          <SocialIcons size="sm" />
          <span className="font-mono text-xs text-ink-2">
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
