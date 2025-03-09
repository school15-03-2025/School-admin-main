import React, { ReactNode } from "react";

interface AlertProps {
  type?: "info" | "danger" | "success" | "warning" | "dark";
  children: ReactNode;
  title?: string; // Made title optional
  className?: string; // Made title optional
}

const alertStyles = {
  info: "text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800",
  danger:
    "text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800",
  success:
    "text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800",
  warning:
    "text-yellow-800 border-yellow-300 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800",
  dark: "text-gray-800 border-gray-300 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
};

const Alert: React.FC<AlertProps> = ({ type = "info", children, title,className }) => {
  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm rounded ${alertStyles[type]} ${className}`}
      role="alert"
    >
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
      <div>
        {title && <span className="font-medium">{title}</span>} {children}{" "}
        {/* Render title only if it exists */}
      </div>
    </div>
  );
};

export default Alert;
