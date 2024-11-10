"use client";

import useAlarm from "@/hooks/useAlarm.hook";
import { Button } from "./ui/button";
import { useEffect } from "react";

export default function Alarm() {
  const { stopAlarm, playAlarm } = useAlarm();

  useEffect(() => {
    playAlarm();
  }, []);

  return (
    <Button className="w-full font-bold" onClick={stopAlarm}>
      STOP ALARM
    </Button>
  );
}
