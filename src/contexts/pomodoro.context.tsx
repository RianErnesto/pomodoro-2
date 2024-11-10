"use client";

import { TimeContextType } from "@/types/Time.type";
import { ReactNode, createContext, useEffect, useState } from "react";
import { StatusType } from "@/types/Status.type";
import { minutesToSeconds } from "@/utils/time.util";
import { PomodoroConfigurations } from "@/types/Configuration.type";
import useAlarm from "@/hooks/useAlarm.hook";

export const TimeContext = createContext<TimeContextType>(
  {} as TimeContextType
);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const { playAlarm } = useAlarm();
  const [status, setStatus] = useState<StatusType>("stopped");
  const [repeats, setRepeats] = useState<number>(1);
  const [pomodoroTimes, setPomodoroTimes] = useState<{
    focusTime: number;
    restTime: number;
  }>({
    focusTime: 1,
    restTime: 1,
  });
  const [currentCounterTime, setCurrentCounterTime] = useState<number>(
    minutesToSeconds(pomodoroTimes.focusTime)
  );
  const [configurations, setConfigurations] = useState<PomodoroConfigurations>({
    hideTimeOnTitle: false,
    initialRepeats: 1,
    alwaysStartWithInitialRepeats: true,
  });

  const increaseRepeats = () => {
    setRepeats((prevState) => prevState + 1);
  };

  const decreaseRepeats = () => {
    if (repeats > 0) setRepeats((prevState) => prevState - 1);
  };

  const startCounting = () => {
    if (pomodoroTimes.focusTime === 0) return;
    setCurrentCounterTime(() => minutesToSeconds(pomodoroTimes.focusTime));
    setStatus("working");
    if (configurations.alwaysStartWithInitialRepeats) {
      setRepeats(configurations.initialRepeats - 1);
      return;
    }
    if (repeats < 1) {
      setRepeats(0);
      return;
    }
    setRepeats((prevState) => prevState - 1);
  };

  const resetCounting = () => {
    setCurrentCounterTime(() => minutesToSeconds(pomodoroTimes.focusTime));
    setStatus("stopped");
    if (configurations.alwaysStartWithInitialRepeats) {
      setRepeats(configurations.initialRepeats);
      return;
    }
    setRepeats(1);
  };

  const changePomodoroTimes = (focusTime: number, restTime: number) => {
    setPomodoroTimes({ focusTime, restTime });
    setCurrentCounterTime(() => {
      return minutesToSeconds(focusTime);
    });
  };

  const changeInitialRepeats = (value: number) => {
    setConfigurations((prevState) => ({
      ...prevState,
      initialRepeats: value,
    }));
    setRepeats(value);
  };

  const toggleAlwaysStartWithInitialRepeats = (value: boolean) => {
    setConfigurations((prevState) => ({
      ...prevState,
      alwaysStartWithInitialRepeats: value,
    }));
  };

  const toggleHideTimeOnTitle = (value: boolean) => {
    setConfigurations((prevState) => ({
      ...prevState,
      hideTimeOnTitle: value,
    }));
  };

  useEffect(() => {
    if (status !== "stopped") {
      const interval = setInterval(() => {
        setCurrentCounterTime((prevState) => {
          if (prevState > 0) return prevState - 1;
          else {
            if (repeats >= 0) {
              if (status === "working") {
                playAlarm();
                setStatus("resting");
                return minutesToSeconds(pomodoroTimes.restTime);
              } else {
                playAlarm();
                setStatus("working");
                return minutesToSeconds(pomodoroTimes.focusTime);
              }
            } else {
              playAlarm();
              resetCounting();
              return 0;
            }
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, currentCounterTime]);

  return (
    <TimeContext.Provider
      value={{
        increaseRepeats,
        decreaseRepeats,
        currentCounterTime,
        setCurrentCounterTime,
        status,
        setStatus,
        repeats,
        setRepeats,
        startCounting,
        resetCounting,
        pomodoroTimes,
        changePomodoroTimes,
        configurations,
        toggleHideTimeOnTitle,
        changeInitialRepeats,
        toggleAlwaysStartWithInitialRepeats,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};
