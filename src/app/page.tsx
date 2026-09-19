import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Expertise } from "@/components/expertise";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Marquee } from "@/components/marquee";
import { Projects } from "@/components/projects";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />

      {/* Signature ticker strips — kept selective: here, inside Expertise, and before Journey. */}
      <Marquee
        items={[site.name, "Full-Stack Developer", "TSEC Mumbai", "Open to Internships"]}
        className="bg-ink text-paper"
        speed={35}
      />

      <About />
      <Expertise />
      <Projects />

      <Marquee items={projects.map((p) => p.name)} tilt="right" reverse className="bg-sky" speed={30} />

      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
