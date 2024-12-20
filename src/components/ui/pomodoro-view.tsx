"use client";

import { usePomodoro } from "@/hooks/usePomodoro.hook";
import { ReactNode } from "react";
import { getTimeFromSeconds, formatTime } from "@/utils/time.util";
import { stringToCapitalized } from "@/utils/string.util";
import Alarm from "../Alarm";
import useAlarm from "@/hooks/useAlarm.hook";
import useConfigurations from "@/hooks/useConfigurations.hook";
import { cn } from "@/lib/utils";

function Card({ children }: { children: ReactNode }) {
  const { configurations } = useConfigurations();

  return (
    <div
      className={cn(
        "border-4 border-black bg-black/60 rounded-xl px-5 py-3 text-7xl dark:border-white",
        {
          "px-3 py-2 text-3xl": configurations.screenSize === "sm",
          "px-7 py-4 text-9xl": configurations.screenSize === "lg",
        }
      )}
    >
      {children}
    </div>
  );
}

export default function PomodoroView() {
  const { currentCounterTime, status } = usePomodoro();
  const { isPlaying, audioRef, onAudioEnded } = useAlarm();

  return (
    <div className="flex items-center justify-center relative">
      <audio
        onEnded={onAudioEnded}
        ref={audioRef}
        src="/audio/scanning-sci-fi-alarm.wav"
        preload="auto"
      />
      <div className="flex flex-col items-start justify-center gap-2">
        <div>{stringToCapitalized(status)}</div>
        <Card>
          <div>
            <span>
              {formatTime(getTimeFromSeconds(currentCounterTime).hour)}
            </span>
            <span>:</span>
            <span>
              {formatTime(getTimeFromSeconds(currentCounterTime).minute)}
            </span>
            <span>:</span>
            <span>
              {formatTime(getTimeFromSeconds(currentCounterTime).second)}
            </span>
          </div>
        </Card>
        {isPlaying && <Alarm />}
      </div>
    </div>
  );
}
