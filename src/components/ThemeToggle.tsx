import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove("light");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full glass-card hover:border-primary/50 transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={18} className="text-primary" /> : <Moon size={18} className="text-primary" />}
    </button>
  );
};

export default ThemeToggle;
