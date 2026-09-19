"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProjectImage } from "@/lib/projects";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

/** Crossfading screenshot carousel with prev/next buttons and dot indicators. */
export function ImageCarousel({
  images,
  sizes,
  className = "",
  fit = "cover",
}: {
  images: readonly ProjectImage[];
  sizes: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);
  const current = images[index];

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-paper-2 ${className}`}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current.src}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes={sizes}
            className={fit === "contain" ? "object-contain" : "object-cover"}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
            className="brutal-border brutal-press absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center bg-white shadow-brutal-sm"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next screenshot"
            className="brutal-border brutal-press absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center bg-white shadow-brutal-sm"
          >
            <ChevronRightIcon />
          </button>

          {/* Dots + counter */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 border-2 border-ink bg-white px-2.5 py-1.5 shadow-brutal-sm">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show screenshot ${i + 1} of ${images.length}`}
                aria-current={i === index ? "true" : undefined}
                className={`size-2.5 border-2 border-ink ${i === index ? "bg-ink" : "bg-white"}`}
              />
            ))}
            <span className="ml-1 font-mono text-[10px] font-bold">
              {index + 1}/{images.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
