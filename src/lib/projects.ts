// Project data for the [ 03 — PROJECTS ] section.
// Screenshots live in public/images/projects/ — swap the placeholders for real ones.
export type ProjectImage = {
  src: string;
  alt: string;
  /** Phone captures are shown framed on the accent panel instead of cropped to 16:9. */
  portrait?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  /** Short context line shown under the name (team / solo / event). */
  context: string;
  /** Big letters shown on the media panel when there is no screenshot. */
  initials?: string;
  tags?: readonly string[];
  links?: { live?: string; github?: string };
  images?: readonly ProjectImage[];
  status?: "in-progress";
  /** Accent token (bg-*) used for the media panel / index tag. */
  accent: string;
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "mockprep",
    name: "MockPrep",
    context: "Solo build",
    description:
      "AI mock interview platform. Dynamic AI question generation, ATS resume analyser, performance analytics dashboard, and a real company question bank.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Grok API", "Framer Motion"],
    images: [
      { src: "/images/projects/mockprep-1.png", alt: "MockPrep dashboard" },
      { src: "/images/projects/mockprep-2.png", alt: "MockPrep live interview session" },
      { src: "/images/projects/mockprep-3.png", alt: "MockPrep performance analytics" },
    ],
    links: {
      live: "https://mockprep-vf.vercel.app/sign-in",
      github: "https://github.com/JaiKukreja-7/MockPrep",
    },
    accent: "bg-yellow",
    featured: true,
  },
  {
    slug: "rideeasy",
    name: "RideEasy",
    initials: "RE",
    context: "Team project",
    description:
      "Zero-commission ride-hailing web app. Real-time tracking, OTP ride verification, role-based access control, and an AI-powered ride advisor.",
    links: {
      live: "https://ride-easy-v7.vercel.app/",
      github: "https://github.com/JaiKukreja-7/RideEasy",
    },
    accent: "bg-sky",
  },
  {
    slug: "blockpilot",
    name: "BlockPilot",
    context: "Smart India Hackathon 2026 · Team",
    description:
      "AI-powered automatic block planning system for Indian Railways, built for Smart India Hackathon 2026.",
    links: { github: "https://github.com/divvyesk/blockpilot" },
    images: [{ src: "/images/projects/blockpilot-preview.png", alt: "BlockPilot block planner view" }],
    accent: "bg-lime",
  },
  {
    slug: "titleguard",
    name: "PRGI TitleGuard",
    initials: "TG",
    context: "Smart India Hackathon 2026 · Team",
    description:
      "AI-powered title verification system for the Press Registrar General of India, built for Smart India Hackathon 2026.",
    links: {
      live: "https://prgi-title-verify.vercel.app/",
      github: "https://github.com/divvyesk/prgi-title-verify",
    },
    images: [
      { src: "/images/projects/titleguard-1.png", alt: "TitleGuard title verifier with a sample search" },
      { src: "/images/projects/titleguard-2.png", alt: "TitleGuard clearance pipeline and conflict verdict" },
      { src: "/images/projects/titleguard-3.png", alt: "TitleGuard similarity scoring and registry conflicts" },
    ],
    accent: "bg-violet",
  },
  {
    slug: "nutriscan",
    name: "NutriScan",
    initials: "NS",
    context: "Solo build",
    description:
      "AI food label scanner that rates a product's healthiness from a photo of its nutrition label.",
    links: {
      live: "https://nutriiscan.vercel.app/",
      github: "https://github.com/JaiKukreja-7/NutriScan",
    },
    images: [
      { src: "/images/projects/nutriscan-preview.png", alt: "NutriScan scan results screen", portrait: true },
    ],
    accent: "bg-coral",
  },
];
