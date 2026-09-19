// Single source of truth for personal info + links used across sections.
export const site = {
  name: "Jai Kukreja",
  initials: "JK",
  tagline: "Computer Engineering student building full-stack & frontend products",
  email: "jaikukreja1403@gmail.com",
  yearShort: "3rd Year",
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
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];
