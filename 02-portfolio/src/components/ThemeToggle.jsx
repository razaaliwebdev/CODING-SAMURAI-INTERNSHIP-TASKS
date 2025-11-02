import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="border border-muted  p-1 rounded cursor-pointer text-text"
    >
      {theme === "light" ? (
        <Moon className="md:h-5 md:w-5 h-4 w-4" />
      ) : (
        <Sun className="md:h-5 md:w-5 h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
