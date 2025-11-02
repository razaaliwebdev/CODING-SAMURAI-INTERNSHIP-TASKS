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
        <Moon className="md:h-4 md:w-4 h-3 w-3" />
      ) : (
        <Sun className="md:h-4 md:w-4 h-3 w-3" />
      )}
    </button>
  );
};

export default ThemeToggle;
