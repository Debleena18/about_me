import ScrollReveal from "./ScrollReveal";
import { Award, BookOpen, GraduationCap } from "lucide-react";

const Achievements = () => {
  return (
    <section id="achievements" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-primary text-sm uppercase tracking-[0.3em] mb-2">Recognition</p>
          <h2 className="font-heading text-4xl md:text-5xl mb-12">
            Achievements & <span className="text-gradient-mint">Certifications</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Awards */}
          <ScrollReveal delay={100}>
            <div className="glass-card p-6 h-full hover:border-primary/50 transition-all duration-300">
              <Award className="text-primary mb-4" size={28} />
              <h3 className="font-heading text-lg text-foreground mb-2">Client Centricity</h3>
              <p className="font-body text-xs text-primary mb-2">March 2026</p>
              <p className="font-body text-sm text-muted-foreground">
                Recognized for delivering exceptional client experience and receiving client appreciation.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-card p-6 h-full hover:border-primary/50 transition-all duration-300">
              <Award className="text-primary mb-4" size={28} />
              <h3 className="font-heading text-lg text-foreground mb-2">Efficiency Mastermind</h3>
              <p className="font-body text-xs text-primary mb-2">Nov 2025</p>
              <p className="font-body text-sm text-muted-foreground">
                Leadership recognition for effectively managing project escalations and ensuring on-time delivery.
              </p>
            </div>
          </ScrollReveal>

          {/* Certifications */}
          <ScrollReveal delay={300}>
            <div className="glass-card p-6 h-full hover:border-primary/50 transition-all duration-300">
              <BookOpen className="text-accent mb-4" size={28} />
              <h3 className="font-heading text-lg text-foreground mb-2">Certifications</h3>
              <ul className="space-y-3">
                <li className="font-body text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">▸</span>
                  Anthropic Certification- Claude 101
                </li>
                <li className="font-body text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">▸</span>
                  Azure Fundamentals (AZ-900) — Microsoft
                </li>
                <li className="font-body text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary">▸</span>
                  Frontend Web Dev with React — Coursera
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Education */}
          <ScrollReveal delay={400} className="md:col-span-2 lg:col-span-3">
            <div className="glass-card p-6">
              <GraduationCap className="text-primary mb-4" size={28} />
              <h3 className="font-heading text-lg text-foreground mb-4">Education</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-body font-bold text-foreground">Siksha 'O' Anusandhan University (ITER)</p>
                  <p className="font-body text-sm text-primary">B.Tech — Electronics & Communication Engineering</p>
                  <p className="font-body text-xs text-muted-foreground">2016 – 2020 · Bhubaneswar, India</p>
                </div>
                <div>
                  <p className="font-body font-bold text-foreground">Loyola School (ICSE)</p>
                  <p className="font-body text-sm text-primary">Higher Secondary (12th)</p>
                  <p className="font-body text-xs text-muted-foreground">2016 · Jamshedpur, India</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
