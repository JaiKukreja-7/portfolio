"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.35, delayChildren: 0.3 } },
};

const line: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

/** Dark terminal card. Lines "type in" one after another when scrolled into view. */
export function Terminal({
  title,
  lines,
  cursor = true,
}: {
  title: string;
  lines: ReactNode[];
  cursor?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-[3px] border-ink bg-term text-term-fg shadow-brutal-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b-2 border-term-border bg-term-2 px-3 py-2">
        <span className="size-2.5 rounded-full bg-coral" />
        <span className="size-2.5 rounded-full bg-yellow" />
        <span className="size-2.5 rounded-full bg-lime" />
        <span className="ml-2 truncate font-mono text-[11px] text-term-muted">{title}</span>
      </div>

      <motion.ul
        variants={list}
        initial={reduceMotion ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-col gap-1.5 px-4 py-3 font-mono text-xs leading-relaxed sm:text-[13px]"
      >
        {lines.map((l, i) => (
          <motion.li key={i} variants={line} className="whitespace-pre-wrap">
            {l}
          </motion.li>
        ))}
        {cursor && (
          <motion.li variants={line} aria-hidden>
            <span className="text-term-green">$</span>{" "}
            <span className="inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] animate-blink bg-term-fg motion-reduce:animate-none" />
          </motion.li>
        )}
      </motion.ul>
    </div>
  );
}

/** Braille spinner — a "working…" indicator that never resolves to a fake result. */
export function Spinner({ className = "" }: { className?: string }) {
  const frames = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";
  const [i, setI] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), 90);
    return () => clearInterval(id);
  }, [reduceMotion, frames.length]);

  return (
    <span aria-hidden className={`inline-block w-[1ch] ${className}`}>
      {frames[i]}
    </span>
  );
}

/** Pulsing status dot + label, e.g. "● listening". */
export function Status({ label, color = "bg-term-green" }: { label: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex size-2">
        <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:animate-none ${color}`} />
        <span className={`relative inline-flex size-2 rounded-full ${color}`} />
      </span>
      {label}
    </span>
  );
}
