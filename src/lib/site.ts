// Single source of truth for personal info + links used across sections.
export const site = {
  name: "Jai Kukreja",
  initials: "JK",
  tagline: "Computer Engineering student building full-stack & frontend products",
  email: "jaikukreja1403@gmail.com",
  location: "Mumbai, India",
  college: "Thadomal Shahani Engineering College (TSEC)",
  yearShort: "3rd Year",
  year: "3rd Year, Computer Engineering",
  // Served from public/resume.pdf — replace that file to update the CV.
  resumeUrl: "/resume.pdf",
  // Drop the real portrait at public/images/profile.jpg (portrait orientation, ~800x1000).
  photo: {
    src: "/images/profile.jpg",
    alt: "Jai Kukreja, Computer Engineering student at TSEC Mumbai",
  },
  bio: "Computer Engineering student at Thadomal Shahani Engineering College (TSEC), Mumbai, currently in my third year. I build full-stack web products end-to-end, from UI to backend, and I'm actively looking for frontend and full-stack development internships.",
  socials: {
    github: "https://github.com/JaiKukreja-7",
    linkedin: "https://www.linkedin.com/in/jai-kukreja-b06716244",
    leetcode: "https://leetcode.com/u/jaikukreja1403/",
  },
} as const;

// Section order drives both the nav links and the scroll-spy.
export const navLinks = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];
