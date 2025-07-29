import { Button } from "../ui/Button";
import { AlertCircle, CheckCircle } from "lucide-react";

interface HeaderProps {
  onSave: () => void;
  isValid: boolean;
  validationMessage?: string;
}

export const Header = ({ onSave, isValid, validationMessage }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          BiteSpeed Chatbot Flow Builder
        </h1>

        <div className="flex items-center space-x-4">
          {/* Validation Status */}
          <div className="flex items-center space-x-2">
            {isValid ? (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Flow is valid</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-red-600">
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
            className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
          >
            Save Flow
          </Button>
        </div>
      </div>
    </header>
  );
};
