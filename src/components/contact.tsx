import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ExternalLinkIcon } from "@/components/icons";
import { externalProps, socials } from "@/components/social-links";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-14">
        <Reveal className="flex flex-col gap-6">
          <SectionHeading number="05" label="Contact" title="Let's Talk" />
          <p className="max-w-prose text-lg text-ink-2 sm:text-xl">
            Open to frontend and full-stack internship opportunities. Reach out, I reply fast.
          </p>
        </Reveal>

        {/* Big link cards: the site's closing CTA */}
        <ul className="grid gap-6 sm:grid-cols-2">
          {socials.map(({ label, handle, href, Icon, accent }, i) => (
            <li key={label}>
              <Reveal delay={i * 0.08} className="h-full">
                <a
                  href={href}
                  {...externalProps(href)}
                  className={`brutal-card brutal-press flex h-full items-center gap-5 p-6 sm:p-8 ${accent}`}
                >
                  <span className="brutal-border flex size-14 shrink-0 items-center justify-center bg-white shadow-brutal-sm">
                    <Icon width={26} height={26} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="font-display text-2xl font-bold sm:text-3xl">{label}</span>
                    <span className="break-all font-mono text-xs text-ink-2 sm:text-sm">{handle}</span>
                  </span>
                  <ExternalLinkIcon width={22} height={22} className="shrink-0" />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
