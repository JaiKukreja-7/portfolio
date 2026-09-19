import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { Nav } from "@/components/nav";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const title = "Jai Kukreja — Full-Stack Developer";
const description =
  "Computer Engineering student at TSEC Mumbai building full-stack & frontend products. Open to internships.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jaikukreja.vercel.app"),
  title,
  description,
  authors: [{ name: "Jai Kukreja", url: "https://github.com/JaiKukreja-7" }],
  keywords: ["Jai Kukreja", "full-stack developer", "frontend engineer", "Next.js", "React", "TSEC", "Mumbai", "internship"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Jai Kukreja",
    title,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border-[3px] focus:border-ink focus:bg-yellow focus:px-4 focus:py-2 focus:font-bold"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
