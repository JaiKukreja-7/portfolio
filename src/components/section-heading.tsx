// Numbered section header, e.g. "[ 01 — ABOUT ]" above "Who Am I?".
export function SectionHeading({
  number,
  label,
  title,
  className = "",
}: {
  number: string;
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <span className="section-label">
        [ {number} — {label} ]
      </span>
      <h2 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </div>
  );
}
