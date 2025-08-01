import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                     placeholder-gray-400 dark:placeholder-gray-500
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                     dark:focus:ring-blue-400 dark:focus:border-blue-400
                     ${
                       error
                         ? "border-red-300 dark:border-red-500 focus:border-red-500 focus:ring-red-500 dark:focus:border-red-400 dark:focus:ring-red-400"
                         : ""
                     } 
                     ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
