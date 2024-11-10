"use client";

import { TimeContext } from "@/contexts/pomodoro.context";
import { TimeContextType } from "@/types/Time.type";
import { useContext } from "react";

export const usePomodoro = () => {
  const context = useContext<TimeContextType>(TimeContext);

  if (context === undefined) {
    throw new Error("useTime must be used within a TimeProvider");
  }

  return context;
};
