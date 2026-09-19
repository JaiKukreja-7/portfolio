"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks, site, type SectionId } from "@/lib/site";
import { CloseIcon, MenuIcon } from "@/components/icons";

/** Tracks which section currently sits in the middle band of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        // Pick the first section (in DOM order) that is inside the band.
        const current = sections.find((s) => visible.get(s.id));
        setActive((current?.id as SectionId | undefined) ?? null);
      },
      // Band from 35% down to 45% up — a section is "active" when it crosses it.
      { rootMargin: "-35% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

function OpenToWorkPill({ className = "" }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`brutal-border brutal-press items-center gap-2 bg-lime px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider shadow-brutal-sm ${className}`}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-ink" />
      </span>
      Open to Work
    </a>
  );
}

export function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Close the drawer on Escape and whenever we cross to the desktop layout.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const linkClass = (id: SectionId) =>
    `px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
      active === id ? "bg-ink text-paper" : "hover:bg-yellow"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-4 before:bg-paper sm:px-6">
      <nav
        aria-label="Primary"
        className="brutal-card mx-auto flex max-w-5xl items-center justify-between gap-4 px-3 py-2 sm:px-4"
      >
        {/* Wordmark */}
        <a
          href="#hero"
          aria-label={`${site.name}, back to top`}
          className="brutal-border brutal-press flex size-9 items-center justify-center bg-yellow font-display text-sm font-bold shadow-brutal-sm"
        >
          {site.initials}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "location" : undefined}
                className={linkClass(l.id)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <OpenToWorkPill className="hidden sm:inline-flex" />

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="brutal-border brutal-press flex size-9 items-center justify-center bg-white shadow-brutal-sm md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="brutal-card mx-auto mt-3 max-w-5xl p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.id ? "location" : undefined}
                    className={`block ${linkClass(l.id)} py-3 text-sm`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <OpenToWorkPill className="mt-3 flex w-full justify-center sm:hidden" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
