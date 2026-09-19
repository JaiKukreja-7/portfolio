"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { site } from "@/lib/site";
import { ArrowDownIcon } from "@/components/icons";
import { SocialIcons } from "@/components/social-links";

const badges = [
  { emoji: "🎓", label: site.yearShort },
  { emoji: "💻", label: "Full-Stack" },
  { emoji: "🚀", label: "Open to Internships" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Dot-grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(var(--color-ink-3)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <motion.div
        variants={container}
        initial={reduceMotion ? "show" : "hidden"}
        animate="show"
        className="flex w-full max-w-4xl flex-col items-center text-center"
      >
        {/* Badges */}
        <motion.ul variants={item} className="flex flex-wrap justify-center gap-2">
          {badges.map((b) => (
            <li
              key={b.label}
              className="brutal-border bg-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm"
            >
              <span className="mr-1.5">{b.emoji}</span>
              {b.label}
            </li>
          ))}
        </motion.ul>

        {/* Greeting */}
        <motion.p variants={item} className="mt-10 font-mono text-sm text-ink-2 sm:text-base">
          <span className="text-coral">{">"}</span> Hello World 👋
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="mt-3 font-display text-6xl font-bold leading-none sm:text-7xl md:text-8xl"
        >
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 -z-10 h-4 bg-yellow sm:h-6" aria-hidden />
            {site.name}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg text-ink-2 sm:text-xl md:text-2xl"
        >
          {site.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="brutal-border brutal-press bg-yellow px-6 py-3 font-display text-base font-bold shadow-brutal"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="brutal-border brutal-press bg-white px-6 py-3 font-display text-base font-bold shadow-brutal"
          >
            Let&apos;s Talk
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={item} className="mt-8">
          <SocialIcons />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to next section"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-2 [@media(max-height:700px)]:hidden"
      >
        Scroll
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="brutal-border flex size-9 items-center justify-center bg-white shadow-brutal-sm"
        >
          <ArrowDownIcon width={16} height={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
