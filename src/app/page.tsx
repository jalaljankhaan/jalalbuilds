import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Projects } from "../components/Projects";
import { Blog } from "../components/Blog";
import { About } from "../components/About";
import { Delivery } from "../components/Delivery";
import { Contact } from "../components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Projects />
      <Delivery />
      <Blog />
      <About />
      <Contact />
    </>
  );
}
