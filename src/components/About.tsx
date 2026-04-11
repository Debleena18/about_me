import ScrollReveal from "./ScrollReveal";

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-primary text-sm uppercase tracking-[0.3em] mb-2">Who I Am</p>
          <h2 className="font-heading text-4xl md:text-5xl mb-12">
            About <span className="text-gradient-mint">Me</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          <ScrollReveal delay={100} className="md:col-span-2">
            <div className="glass-card p-8 h-full">
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Senior Frontend Engineer with 5.5+ years of end-to-end experience architecting,
                designing, and delivering high-scale enterprise web applications. Proven track record
                of translating complex business requirements into production-ready React applications
                with robust state management, secure authentication flows, and reusable component architectures.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Recognized for strengthening identity compliance, improving onboarding accuracy,
                reducing production defects, and mentoring engineering teams to ship stable releases
                on Agile timelines. Currently at <span className="text-primary font-semibold">Deloitte</span>,
                previously at <span className="text-primary font-semibold">TCS</span>.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-card p-8 h-full flex flex-col gap-6">
              <div>
                <p className="font-heading text-3xl text-primary">5.5+</p>
                <p className="font-body text-sm text-muted-foreground">Years of Experience</p>
              </div>
              <div>
                <p className="font-heading text-3xl text-primary">2</p>
                <p className="font-body text-sm text-muted-foreground">Fortune 500 Clients</p>
              </div>
              <div>
                <p className="font-heading text-3xl text-primary">10+</p>
                <p className="font-body text-sm text-muted-foreground">Enterprise Projects</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
