"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Elements that switch the cursor into its "hover" shape.
const INTERACTIVE =
  'a, button, [role="button"], input[type="button"], input[type="submit"], select, summary, [data-cursor="pointer"]';
// Elements where the native cursor is better (I-beam, or we can't track inside them).
const NATIVE = 'input, textarea, select, [contenteditable=""], [contenteditable="true"], iframe';

type Mode = "default" | "hover" | "press";

/**
 * Neobrutalist cursor for mouse users. Mounted once in the root layout.
 * Renders nothing on touch devices or when the user prefers reduced motion,
 * and only hides the native cursor while the custom one is actually on screen.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [colors, setColors] = useState({ ink: "#111111", yellow: "#ffd93d", coral: "#ff6b6b" });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Slight lag so the cursor "chases" the pointer instead of snapping to it.
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  const lastTarget = useRef<Element | null>(null);
  const pressed = useRef(false);

  // Only mouse-like pointers that can hover.
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pull colours from the design tokens so the cursor stays in sync with the theme.
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
    setColors({
      ink: read("--color-ink", "#111111"),
      yellow: read("--color-yellow", "#ffd93d"),
      coral: read("--color-coral", "#ff6b6b"),
    });
  }, []);

  const active = finePointer && !reduceMotion;

  useEffect(() => {
    if (!active) return;

    const modeFor = (t: Element | null): Mode =>
      pressed.current ? "press" : t?.closest(INTERACTIVE) ? "hover" : "default";

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target instanceof Element ? e.target : null;
      lastTarget.current = t;
      if (!t || t.closest(NATIVE)) {
        setVisible(false); // hand back to the native cursor
        return;
      }
      setVisible(true);
      setMode(modeFor(t));
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      pressed.current = true;
      setMode("press");
    };
    const onUp = () => {
      pressed.current = false;
      setMode(modeFor(lastTarget.current));
    };
    const hide = () => setVisible(false);
    // Pointer left the window (relatedTarget is null when leaving the document entirely).
    const onOut = (e: MouseEvent) => e.relatedTarget === null && hide();
    const onVisibility = () => document.hidden && hide();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", hide);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", hide);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active, x, y]);

  // Hide the native cursor only while ours is on screen (see globals.css).
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("custom-cursor", active && visible);
    return () => root.classList.remove("custom-cursor");
  }, [active, visible]);

  if (!active) return null;

  const shapes: Record<Mode, Record<string, string | number>> = {
    default: {
      width: 14,
      height: 14,
      rotate: 0,
      backgroundColor: colors.yellow,
      boxShadow: `3px 3px 0 0 ${colors.ink}`,
    },
    // Hollow diamond that frames the link instead of covering it.
    hover: {
      width: 40,
      height: 40,
      rotate: 45,
      backgroundColor: "rgba(0, 0, 0, 0)",
      boxShadow: `4px 4px 0 0 ${colors.ink}`,
    },
    press: {
      width: 22,
      height: 22,
      rotate: 45,
      backgroundColor: colors.coral,
      boxShadow: `1px 1px 0 0 ${colors.ink}`,
    },
  };

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        // `translate` (CSS property) centres the shape; Framer's `rotate` uses `transform`, so they combine.
        className="-translate-x-1/2 -translate-y-1/2 border-[3px] border-ink"
        initial={false}
        animate={shapes[mode]}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </motion.div>
  );
}
