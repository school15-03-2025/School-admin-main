import { FC } from "react";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const Tab: FC<TabProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    {label}
  </button>
);
