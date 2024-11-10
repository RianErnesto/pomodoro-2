"use client";

import { usePomodoro } from "@/hooks/usePomodoro.hook";
import { secondsToLocalTimeString } from "@/utils/time.util";

const Title = () => {
  const { status, currentCounterTime, configurations } = usePomodoro();

  const getStatus = () => {
    switch (status) {
      case "working":
        return "Working";
      case "resting":
        return "Resting";
      case "stopped":
        return "Stopped";
    }
  };

  if (configurations.hideTimeOnTitle) {
    return <title>{`${getStatus()}`}</title>;
  }

  return (
    <title>
      {`${getStatus()} - ${secondsToLocalTimeString(currentCounterTime)}`}
    </title>
  );
};

export default Title;
