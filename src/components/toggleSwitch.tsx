import { useState } from "react";

interface ToggleSwitchProps {
  isOn?: boolean; // Control state externally
  onChange?: (state: boolean) => void; // Callback when toggled
  onColor?: string;
  offColor?: string;
  circleColor?: string;
}

export default function ToggleSwitch({
  isOn = false,
  onChange,
  onColor = "bg-gray-700",
  offColor = "bg-gray-300",
  circleColor = "bg-white",
}: ToggleSwitchProps) {
  const [internalState, setInternalState] = useState(isOn);

  const toggleSwitch = () => {
    const newState = !internalState;
    setInternalState(newState);
    onChange?.(newState);
  };

  return (
    <div
      onClick={toggleSwitch}
      className={`w-7 h-4 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300
        ${internalState ? onColor : offColor}`}
    >
      <div
        className={`w-3 h-3 rounded-full shadow-md transform transition-transform duration-300
          ${internalState ? "translate-x-3" : "translate-x-0"} ${circleColor}`}
      />
    </div>
  );
}
