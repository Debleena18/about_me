import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <button
          onClick={() => handleClick("#hero")}
          className="font-heading text-xl text-primary tracking-wider"
        >
          DS.
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide uppercase"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/Debleena_Sarkar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full border border-primary text-primary font-body text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-card mt-2 mx-4 rounded-xl p-6 animate-slide-up">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="block w-full text-left py-3 text-muted-foreground hover:text-primary transition-colors font-body uppercase text-sm tracking-wide"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/Debleena_Sarkar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center px-5 py-2 rounded-full border border-primary text-primary font-body text-sm"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
