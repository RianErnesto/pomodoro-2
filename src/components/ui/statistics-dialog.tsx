"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import usePomodoroLocalStorage from "@/hooks/usePomodoroLocalStorage.hook";
import { secondsToMinutes } from "@/utils/time.util";
import { Button } from "./button";
import { DialogClose } from "@radix-ui/react-dialog";

export default function StatisticsDialog({
  children,
}: {
  children: ReactNode;
}) {
  const { getStatistics, clearStatistics } = usePomodoroLocalStorage();
  const { pomodoroCounter, timeFocused, timeResting } = getStatistics();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>Statistics</DialogHeader>
        <DialogDescription>
          <p>
            Here you can see how many pomodoros you have done, how much time you
            have focused, and how much time you have rested.
          </p>
        </DialogDescription>
        <table>
          <thead>
            <tr>
              <th>Pomodoros</th>
              <th>Time Focused</th>
              <th>Time Resting</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{pomodoroCounter}</td>
              <td>{secondsToMinutes(timeFocused)} minutes</td>
              <td>{secondsToMinutes(timeResting)} minutes</td>
            </tr>
          </tbody>
        </table>
        <DialogFooter>
          <Button variant="destructive" onClick={clearStatistics}>
            Clear Statistics
          </Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
