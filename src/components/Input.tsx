import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: "small" | "medium" | "large"; // Added size prop
  secureEntry?: boolean; // New secureEntry prop
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      secureEntry,
      size = "medium",
      className = "",
      type,
      ...props
    },
    ref
  ) => {
    // Determine padding based on size
    const sizeClasses = {
      small: "p-1 text-xs",
      medium: "p-2 text-sm",
      large: "p-3 text-lg",
    };

    // If secureEntry is true, override input type to "password"
    const inputType = secureEntry ? "password" : type || "text";

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <input
          ref={ref}
          type={inputType}
          className={`rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? "border-red-500" : ""
          } ${sizeClasses[size]} ${className}`} // Apply size classes
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
