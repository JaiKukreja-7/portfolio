// Full-bleed ticker strip: "ITEM ★ ITEM ★ …" scrolling forever.
// Pure CSS animation — the content is duplicated once and translated by -50%
// so the loop is seamless. Pauses on hover; disabled for reduced-motion users.
export function Marquee({
  items,
  separator = "★",
  speed = 40,
  reverse = false,
  tilt,
  className = "bg-yellow",
}: {
  items: readonly string[];
  separator?: string;
  /** Seconds per full loop. */
  speed?: number;
  reverse?: boolean;
  /** Slight rotation for a "taped-on" look; the overflow is clipped. `true` = left. */
  tilt?: boolean | "left" | "right";
  /** Background/text classes for the strip. */
  className?: string;
}) {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-6 pr-6 font-display text-lg font-bold uppercase tracking-wide sm:text-xl"
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-6 whitespace-nowrap">
          <span>{item}</span>
          <span aria-hidden className="text-coral">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  const strip = (
    <div
      className={`overflow-hidden border-y-[3px] border-ink py-3 ${
        tilt === "right" ? "rotate-1 scale-x-105" : tilt ? "-rotate-1 scale-x-105" : ""
      } ${className}`}
    >
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : undefined,
        }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );

  // The wrapper absorbs the rotated strip's extra width/height.
  return tilt ? <div className="overflow-hidden py-4">{strip}</div> : strip;
}
