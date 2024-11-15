"use client";

import { usePomodoro } from "@/hooks/usePomodoro.hook";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Command, CommandGroup, CommandItem, CommandList } from "./command";
import { useState } from "react";
import { Button } from "./button";
import { Check } from "lucide-react";
import CreateTimerDialog from "./create-timer-dialog";

export default function QuickTimeSelect() {
  const [open, setOpen] = useState(false);
  const { changePomodoroTimes, timers, pomodoroTimes } = usePomodoro();
  const [value, setValue] = useState(
    `${pomodoroTimes.focusTime}-${pomodoroTimes.restTime}`
  );

  function handleSelectChange(value: string) {
    const [workingTime, restingTime] = value.split("-").map(Number);
    changePomodoroTimes(workingTime, restingTime);
    setOpen(false);
    setValue(value);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          {value
            ? `${
                timers.find(
                  (timer) => `${timer.focusTime}-${timer.restTime}` === value
                )?.focusTime
              }-${
                timers.find(
                  (timer) => `${timer.focusTime}-${timer.restTime}` === value
                )?.restTime
              }`
            : "Quick time selection"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup>
              {timers.map((timer) => (
                <CommandItem
                  key={`${timer.focusTime}-${timer.restTime}`}
                  value={`${timer.focusTime}-${timer.restTime}`}
                  onSelect={handleSelectChange}
                >
                  {`${timer.focusTime}-${timer.restTime}`}
                  {value === `${timer.focusTime}-${timer.restTime}` && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </CommandItem>
              ))}
              <CreateTimerDialog />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
