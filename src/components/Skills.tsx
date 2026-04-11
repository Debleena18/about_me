import ScrollReveal from "./ScrollReveal";

const skills = [
  {
    category: "Frontend",
    items: ["React.js", "React Native", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    category: "State & Architecture",
    items: ["Redux", "Context API", "React Hooks", "Component Architecture", "Reusable Libraries"],
  },
  {
    category: "UI Frameworks",
    items: ["Material UI", "Ant Design", "StoryBook", "Responsive Design", "Adaptive Design"],
  },
  {
    category: "Auth & Integration",
    items: ["Azure AD (SSO)", "eKYC Systems", "REST APIs", "eParichay (UID/VID)"],
  },
  {
    category: "Tools & Practices",
    items: ["Git", "Azure DevOps", "CI/CD", "Agile/Scrum", "Code Reviews"],
  },
  {
    category: "AI Tooling",
    items: ["GitHub Copilot", "CODEX", "Claude", "Generative AI"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-primary text-sm uppercase tracking-[0.3em] mb-2">What I Know</p>
          <h2 className="font-heading text-4xl md:text-5xl mb-12">
            Tech <span className="text-gradient-mint">Stack</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, i) => (
            <ScrollReveal key={group.category} delay={i * 100}>
              <div className="glass-card p-6 h-full group hover:border-primary/50 transition-all duration-300">
                <h3 className="font-heading text-lg text-primary mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-body text-xs tracking-wide group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
