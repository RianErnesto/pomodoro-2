"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "./select";
import { usePomodoro } from "@/hooks/usePomodoro.hook";
import { DEFAULT_TIMERS } from "@/constants/timers.contants";

export default function QuickTimeSelect() {
  const { changePomodoroTimes, status } = usePomodoro();

  function handleSelectChange(value: string) {
    const [workingTime, restingTime] = value.split("-").map(Number);
    changePomodoroTimes(workingTime, restingTime);
  }

  return (
    <Select
      disabled={status !== "stopped"}
      defaultValue="50-10"
      onValueChange={handleSelectChange}
    >
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Quick time seletion" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time</SelectLabel>
          {DEFAULT_TIMERS.map(({ workingTime, restingTime }) => (
            <SelectItem
              key={`${workingTime}-${restingTime}`}
              value={`${workingTime}-${restingTime}`}
            >
              {`${workingTime}/${restingTime}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
