import { site } from "@/lib/site";
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, MailIcon } from "@/components/icons";

// One list for Hero, Contact and Footer. `handle` is the human-readable form.
export const socials = [
  { label: "Email", handle: site.email, href: `mailto:${site.email}`, Icon: MailIcon, accent: "bg-yellow" },
  { label: "LinkedIn", handle: "in/jai-kukreja-b06716244", href: site.socials.linkedin, Icon: LinkedInIcon, accent: "bg-sky" },
  { label: "GitHub", handle: "@JaiKukreja-7", href: site.socials.github, Icon: GitHubIcon, accent: "bg-paper" },
  { label: "LeetCode", handle: "@jaikukreja1403", href: site.socials.leetcode, Icon: LeetCodeIcon, accent: "bg-lime" },
] as const;

export const externalProps = (href: string) =>
  href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" };

/** Compact bordered icon row (Hero + Footer). */
export function SocialIcons({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-9" : "size-11";
  return (
    <ul className="flex gap-3">
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            {...externalProps(href)}
            aria-label={label}
            title={label}
            className={`brutal-border brutal-press flex ${box} items-center justify-center bg-white shadow-brutal-sm hover:bg-sky`}
          >
            <Icon width={size === "sm" ? 16 : 20} height={size === "sm" ? 16 : 20} />
          </a>
        </li>
      ))}
    </ul>
  );
}
