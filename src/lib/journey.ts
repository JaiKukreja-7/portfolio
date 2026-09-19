// Entries for the [ 04 — JOURNEY ] timeline, oldest first. Keep these short.
export type JourneyEntry = {
  time: string;
  title: string;
  description: string;
  /** Related project names, rendered as chips linking to #projects. */
  projects?: readonly string[];
  status?: "milestone" | "ongoing";
  accent: string; // bg-* token for the timeline node
};

export const journey: readonly JourneyEntry[] = [
  {
    time: "2026",
    title: "Smart India Hackathon 2026",
    description:
      "Competing across three team problem statements — an AI railway block planner, a title verification system for PRGI, and VeriBid AI for CPCL/MoPNG.",
    projects: ["BlockPilot", "PRGI TitleGuard", "VeriBid AI"],
    status: "milestone",
    accent: "bg-yellow",
  },
  {
    time: "Now",
    title: "Shipping personal full-stack projects",
    description:
      "Building and launching end-to-end products while in my third year at TSEC, Mumbai.",
    projects: ["MockPrep", "RideEasy", "NutriScan"],
    status: "ongoing",
    accent: "bg-lime",
  },
];
