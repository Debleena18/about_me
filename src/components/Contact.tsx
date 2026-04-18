import ScrollReveal from "./ScrollReveal";
import { Mail, LinkedIn, GitHub, MapPin, Heart } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-primary text-sm uppercase tracking-[0.3em] mb-2">Let's Connect</p>
          <h2 className="font-heading text-4xl md:text-5xl mb-4">
            Get In <span className="text-gradient-mint">Touch</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mb-12">
            I'm open to new opportunities, collaborations, and conversations about frontend architecture.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScrollReveal delay={100}>
            <a
              href="mailto:sarkardebleena18@gmail.com"
              className="glass-card p-6 flex flex-col items-center text-center gap-3 hover:border-primary/50 transition-all duration-300 group hover:scale-105 hover:-translate-y-1"
            >
              <Mail className="text-primary group-hover:scale-110 transition-transform" size={28} />
              <p className="font-body text-sm text-muted-foreground">sarkardebleena18@gmail.com</p>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <a
              href="https://www.linkedin.com/in/debleena-sarkar/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 flex flex-col items-center text-center gap-3 hover:border-primary/50 transition-all duration-300 group hover:scale-105 hover:-translate-y-1"
            >
              <LinkedIn className="text-primary group-hover:scale-110 transition-transform" size={28} />
              <p className="font-body text-sm text-muted-foreground">LinkedIn</p>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <a
              href="https://github.com/Debleena18"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 flex flex-col items-center text-center gap-3 hover:border-primary/50 transition-all duration-300 group hover:scale-105 hover:-translate-y-1"
            >
              <GitHub className="text-primary group-hover:scale-110 transition-transform" size={28} />
              <p className="font-body text-sm text-muted-foreground">GitHub</p>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="glass-card p-6 flex flex-col items-center text-center gap-3 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <MapPin className="text-primary" size={28} />
              <p className="font-body text-sm text-muted-foreground">Kolkata, India</p>
            </div>
          </ScrollReveal>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border/30 text-center">
          <p className="font-body text-xs text-muted-foreground flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Debleena Sarkar. Built with <Heart size={12} className="text-primary inline animate-pulse" /> React + TypeScript.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
