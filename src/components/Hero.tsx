import profilePhoto from "@/assets/profile-photo.png";
import animatedAvatar from "@/assets/animated-avatar.png";
import { Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  // Start with the animated avatar on load, flip every 2s
  const [showAvatar, setShowAvatar] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAvatar((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background orbs - fairy dust clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float stagger-3" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-primary/3 rounded-full blur-2xl animate-float stagger-5" />
        {/* Fairy sparkle dots */}
        <div className="absolute top-10 right-10 w-2 h-2 bg-primary rounded-full animate-fairy-twinkle" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-accent rounded-full animate-fairy-twinkle stagger-2" />
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-primary rounded-full animate-fairy-twinkle stagger-4" />
        <div className="absolute top-20 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-fairy-twinkle stagger-1" />
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-primary rounded-full animate-fairy-twinkle stagger-3" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-accent rounded-full animate-fairy-twinkle stagger-5" />
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-fairy-twinkle stagger-2" />
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text side */}
        <div className="animate-slide-up">
          <p className="font-body text-primary text-sm uppercase tracking-[0.3em] mb-4 animate-pulse-glow hidden md:inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/20">
            <Sparkles size={14} className="animate-fairy-twinkle" />
            Hello, I'm
            <Sparkles size={14} className="animate-fairy-twinkle stagger-2" />
          </p>
          <h1 className="font-heading text-5xl md:text-7xl leading-tight mb-4 mt-10 md:mt-0">
            Debleena
            <br />
            <span className="text-gradient-mint">Sarkar</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-white mb-2">
            Senior Frontend Engineer
          </p>
          <p className="font-body text-white max-w-md mb-8 leading-relaxed">
            5.5+ years architecting high-scale enterprise React applications.
            Turning complex business requirements into elegant, performant interfaces.
          </p>
          <div className="flex gap-4 flex-wrap mb-8">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group px-8 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold hover:glow-mint transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-accent/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </a>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3 rounded-full border border-primary text-primary font-body font-semibold hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              My Journey
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            <a href="https://github.com/Debleena18" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-card hover:border-primary/50 hover:scale-110 transition-all duration-300 group">
              <Github size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/debleena-sarkar/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-card hover:border-primary/50 hover:scale-110 transition-all duration-300 group">
              <Linkedin size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a href="mailto:sarkardebleena18@gmail.com" className="p-3 rounded-full glass-card hover:border-primary/50 hover:scale-110 transition-all duration-300 group">
              <Mail size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        {/* Photo side */}
        <div className="flex justify-center animate-slide-up stagger-2">
          <div className="relative">
            {/* Fairy ring glow behind the photo */}
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-110 animate-pulse-glow" />
            
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full photo-glow-card group cursor-pointer [perspective:1000px]">
              <div
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                  showAvatar ? "" : "[transform:rotateY(180deg)]"
                }`}
              >
                {/* Front: animated avatar */}
                <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-primary/30 [backface-visibility:hidden]">
                  <img
                    src={animatedAvatar}
                    alt="Animated coder avatar"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-accent/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Back: real photo */}
                <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-primary/30 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <img
                    src={profilePhoto}
                    alt="Debleena Sarkar"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-accent/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>

            {/* Floating badges - spread around the circle */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 glass-card px-4 py-2 rounded-full animate-float">
              <span className="text-primary font-body font-bold text-sm">5.5+ yrs</span>
            </div>
            <div className="absolute top-8 -right-12 glass-card px-4 py-2 rounded-full animate-float stagger-2">
              <span className="text-accent font-body font-bold text-sm">React Expert</span>
            </div>
            <div className="absolute bottom-8 -right-14 glass-card px-4 py-2 rounded-full animate-float stagger-4">
              <span className="text-primary font-body font-bold text-sm">JavaScript</span>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-card px-4 py-2 rounded-full animate-float stagger-3">
              <span className="text-accent font-body font-bold text-sm">Web Developer</span>
            </div>
            <div className="absolute bottom-8 -left-12 glass-card px-4 py-2 rounded-full animate-float stagger-5">
              <span className="text-primary font-body font-bold text-sm">TypeScript</span>
            </div>
            <div className="absolute top-8 -left-10 glass-card px-4 py-2 rounded-full animate-float stagger-1">
              <span className="text-accent font-body font-bold text-sm">Frontend</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <Sparkles size={14} className="text-primary animate-fairy-twinkle" />
        <span className="font-body text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
