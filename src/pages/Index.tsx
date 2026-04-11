import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import CursorGlitter from "@/components/CursorGlitter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CursorGlitter />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Achievements />
      <Contact />
    </div>
  );
};

export default Index;
