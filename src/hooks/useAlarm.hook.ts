"use client";

import { useContext } from "react";
import { AlarmContext } from "@/contexts/alarm.context";

export default function useAlarm() {
  const context = useContext(AlarmContext);

  if (!context) {
    throw new Error("useAlarm must be used within an AlarmProvider");
  }

  return context;
}
