import ScrollReveal from "./ScrollReveal";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Deloitte",
    role: "Senior Frontend Developer",
    period: "May 2024 – Present",
    projects: [
      {
        name: "BPCL — Customer Enrollment & eKYC Onboarding",
        bullets: [
          "Independently architected dual-workflow onboarding system (eKYC + manual enrollment) for PMUY 3.0 rollout across nationwide LPG distribution",
          "Engineered eParichay identity authentication with UID/VID verification, biometric validation, and OTP-based MFA",
          "Designed Redux-based state persistence layer auto-populating Aadhaar-verified data, reducing data-entry errors at scale",
          "Built dynamic form engine and optimized client-side routing for configurable high-scale enrollment workflows",
          "Mentored junior and mid-level engineers through code reviews, elevating team-wide code quality",
        ],
      },
      {
        name: "HSBC — Enterprise Data Viewer Platform",
        bullets: [
          "Spearheaded React-based enterprise data visualization platform for secure, role-based customer asset management",
          "Implemented Azure AD SSO integration, strengthening authentication security and identity governance",
          "Designed centralized Redux workflows for cross-module data handling and stability",
        ],
      },
    ],
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Frontend Developer",
    period: "Nov 2020 – May 2024",
    projects: [
      {
        name: "Enterprise Web & Mobile Applications",
        bullets: [
          "Engineered responsive, high-performance enterprise web and React Native mobile apps serving millions of users",
          "Built and maintained reusable component libraries adopted across multiple product verticals",
          "Implemented structured Redux state management enhancing maintainability and scalability",
          "Partnered with UX designers and product owners in cross-functional Agile teams",
        ],
      },
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-primary text-sm uppercase tracking-[0.3em] mb-2">My Journey</p>
          <h2 className="font-heading text-4xl md:text-5xl mb-12">
            Work <span className="text-gradient-mint">Experience</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.company} delay={i * 150}>
                <div className="pl-12 md:pl-20 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-2 md:left-6 top-2 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  <div className="glass-card p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <Briefcase size={18} className="text-primary" />
                      <h3 className="font-heading text-2xl text-foreground">{exp.company}</h3>
                    </div>
                    <p className="font-body text-primary font-semibold mb-1">{exp.role}</p>
                    <p className="font-body text-sm text-muted-foreground mb-6">{exp.period}</p>

                    {exp.projects.map((project) => (
                      <div key={project.name} className="mb-6 last:mb-0">
                        <h4 className="font-body font-bold text-accent mb-3">{project.name}</h4>
                        <ul className="space-y-2">
                          {project.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-3 font-body text-sm text-muted-foreground leading-relaxed">
                              <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
