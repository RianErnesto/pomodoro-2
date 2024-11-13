"use client";

import { usePomodoro } from "@/hooks/usePomodoro.hook";
import { Button } from "./button";
import { Separator } from "./separator";
import { Switch } from "./switch";
import { Label } from "./label";
import { Plus, Minus } from "lucide-react";
import { Input } from "./input";
import useConfigurations from "@/hooks/useConfigurations.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export default function Menu() {
  const {
    startCounting,
    status,
    resetCounting,
    increaseRepeats,
    decreaseRepeats,
    repeats,
  } = usePomodoro();
  const {
    changeInitialRepeats,
    configurations,
    toggleAlwaysStartWithInitialRepeats,
    toggleHideTimeOnTitle,
    changeScreenSize,
  } = useConfigurations();

  return (
    <aside className="border-l border-black/15 h-full px-4 py-2 space-y-4 dark:border-white/15">
      <div className="flex flex-col gap-2">
        <h2 className="font-extralight">Configurations</h2>
        <Separator />
        <div className="flex gap-2 items-center justify-between">
          <Label className="text-sm flex-shrink-0" htmlFor="screen-size">
            Display size
          </Label>
          <Select
            defaultValue="md"
            onValueChange={(value) =>
              changeScreenSize(value as "sm" | "md" | "lg")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Display size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">small</SelectItem>
              <SelectItem value="md">medium (default)</SelectItem>
              <SelectItem value="lg">large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <Label className="text-sm" htmlFor="hide-timer">
            Hide Timer on Title
          </Label>
          <Switch
            checked={configurations.hideTimeOnTitle}
            onCheckedChange={toggleHideTimeOnTitle}
            id="hide-timer"
          />
        </div>
        <div className="flex gap-2 items-center justify-between">
          <Label className="text-sm" htmlFor="start-with-initial-repeats">
            Start with Initial Repeats
          </Label>
          <Switch
            checked={configurations.alwaysStartWithInitialRepeats}
            onCheckedChange={toggleAlwaysStartWithInitialRepeats}
            id="start-with-initial-repeats"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-1">
          <Label className="text-sm" htmlFor="initial-repeats">
            Initial Repeats
          </Label>
          <Input
            type="number"
            id="initial-repeats"
            name="initial-repeats"
            onChange={(e) => {
              changeInitialRepeats(parseInt(e.target.value));
            }}
            defaultValue={configurations.initialRepeats}
            placeholder="Initial repeats"
          />
        </div>
      </div>
      <Separator />
      <div className="flex flex-wrap items-center justify-start gap-1">
        <Button
          onClick={decreaseRepeats}
          size="icon"
          className="h-4 w-4 rounded-sm"
        >
          <Minus size={2} />
        </Button>
        <span>{repeats}</span>
        <Button
          onClick={increaseRepeats}
          size="icon"
          className="h-4 w-4 rounded-sm"
        >
          <Plus size={2} />
        </Button>
        <span className="font-extralight"> Rounds last</span>
      </div>
      <Separator />
      <Button
        className="w-full"
        onClick={status === "stopped" ? startCounting : resetCounting}
      >
        {status === "stopped" ? "Start" : "Reset"}
      </Button>
    </aside>
  );
}
