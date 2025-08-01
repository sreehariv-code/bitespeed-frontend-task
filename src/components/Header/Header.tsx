import { Button } from "../ui/Button";
import { AlertCircle, CheckCircle, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

interface HeaderProps {
  onSave: () => void;
  isValid: boolean;
  validationMessage?: string;
}

export const Header = ({ onSave, isValid, validationMessage }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === "light") return <Sun className="w-4 h-4" />;
    if (theme === "dark") return <Moon className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  return (
    <header className="bg-blue-50 dark:bg-[#161616] border-b border-blue-200 dark:border-gray-600 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-blue-900 dark:text-gray-100">
          BiteSpeed Chatbot Flow Builder
        </h1>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:cursor-pointer bg-blue-100 dark:bg-gray-800 hover:bg-blue-200 dark:hover:bg-gray-700 transition-colors text-blue-600 dark:text-gray-400"
            title={`Current theme: ${theme}`}
          >
            {getThemeIcon()}
          </button>

          {/* Validation Status */}
          <div className="flex items-center space-x-2">
            {isValid ? (
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-300">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Flow is valid</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-300">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {validationMessage || "Flow has disconnected nodes"}
                </span>
              </div>
            )}
          </div>

          <Button
            onClick={onSave}
            disabled={!isValid}
            className={
              !isValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }
          >
            Save Flow
          </Button>
        </div>
      </div>
    </header>
  );
};
