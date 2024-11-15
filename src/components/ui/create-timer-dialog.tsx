"use client";

import { Button } from "./button";
import { Input } from "./input";
import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import { usePomodoro } from "@/hooks/usePomodoro.hook";
import { ChangeEvent, useState } from "react";
import { Label } from "./label";

export default function CreateTimerDialog() {
  const { changePomodoroTimes, createCustomTimer } = usePomodoro();
  const [open, setOpen] = useState(false);
  const [focusTime, setFocusTime] = useState<number>(0);
  const [restTime, setRestTime] = useState<number>(0);

  function handleFocusTimeChange(event: ChangeEvent<HTMLInputElement>) {
    setFocusTime(Number(event.target.value));
  }

  function handleRestTimeChange(event: ChangeEvent<HTMLInputElement>) {
    setRestTime(Number(event.target.value));
  }

  function handleCreateTimer() {
    createCustomTimer({
      focusTime,
      restTime,
    });
    changePomodoroTimes(focusTime, restTime);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full mt-4" size="sm">
          Create custom timer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex gap-4">
          <div className="grow">
            <Label htmlFor="focus-time">Focus time</Label>
            <Input
              id="focus-time"
              type="number"
              min={0}
              value={focusTime}
              onChange={handleFocusTimeChange}
            />
          </div>
          <div className="grow">
            <Label htmlFor="rest-time">Rest time</Label>
            <Input
              id="rest-time"
              type="number"
              min={0}
              value={restTime}
              onChange={handleRestTimeChange}
            />
          </div>
        </div>
        <Button onClick={handleCreateTimer}>Create</Button>
      </DialogContent>
    </Dialog>
  );
}
