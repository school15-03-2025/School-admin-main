import React, { ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "default"
    | "alternative"
    | "dark"
    | "light"
    | "green"
    | "red"
    | "yellow"
    | "purple";
  size?: "small" | "medium" | "large";
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "medium",
  loading = false,
  children,
  className = "",
  disabled,
  ...rest
}) => {
  // Base styles applied to all buttons
  const baseClasses = "font-medium rounded-lg me-2 mb-2 focus:outline-none";

  // Variant-specific styles
  let variantClasses = "";
  switch (variant) {
    case "alternative":
      variantClasses =
        "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
      break;
    case "dark":
      variantClasses =
        "text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";
      break;
    case "light":
      variantClasses =
        "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
      break;
    case "green":
      variantClasses =
        "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
      break;
    case "red":
      variantClasses =
        "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
      break;
    case "yellow":
      variantClasses =
        "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900";
      break;
    case "purple":
      variantClasses =
        "text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
      break;
    case "default":
    default:
      variantClasses =
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
      break;
  }

  // Size-specific styles
  let sizeClasses = "";
  switch (size) {
    case "small":
      sizeClasses = "px-3 py-1.5 text-xs";
      break;
    case "large":
      sizeClasses = "px-6 py-3 text-lg";
      break;
    case "medium":
    default:
      sizeClasses = "px-5 py-2.5 text-sm";
      break;
  }

  // Disable button if it's loading or already disabled
  const isDisabled = loading || disabled;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      disabled={isDisabled}
      {...rest}
    >
      <div className="flex justify-center gap-4">
        {loading ? <Spinner /> : null}
        {children}
      </div>
    </button>
  );
};

export default Button;
