import { FC } from "react";
import { Input } from "./Input";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => (
  <div className="flex items-center gap-2">
    <Input
      type="date"
      value={startDate}
      onChange={(e) => onStartDateChange(e.target.value)}
      className="rounded-lg"
    />
    <span className="text-gray-500">to</span>
    <Input
      type="date"
      value={endDate}
      onChange={(e) => onEndDateChange(e.target.value)}
      className="rounded-lg"
    />
  </div>
);
