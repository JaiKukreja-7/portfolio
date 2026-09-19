import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Expertise } from "@/components/expertise";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />

      <About />
      <Expertise />
      <Projects />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
