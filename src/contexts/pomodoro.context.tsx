"use client";

import { TimeContextType, TimerType } from "@/types/Time.type";
import { ReactNode, createContext, useEffect, useState } from "react";
import { StatusType } from "@/types/Status.type";
import { minutesToSeconds } from "@/utils/time.util";
import useAlarm from "@/hooks/useAlarm.hook";
import { getDateDiffInSeconds, sumMinutesToDate } from "@/utils/date.util";
import usePomodoroLocalStorage from "@/hooks/usePomodoroLocalStorage.hook";
import useConfigurations from "@/hooks/useConfigurations.hook";
import { DEFAULT_TIMERS } from "@/constants/timers.contants";

export const TimeContext = createContext<TimeContextType>(
  {} as TimeContextType
);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const { configurations } = useConfigurations();
  const {
    sumPomodoroCounter,
    sumSecondsFocused,
    sumSecondsResting,
    saveConfigurations,
  } = usePomodoroLocalStorage();
  const { playAlarm } = useAlarm();
  const [status, setStatus] = useState<StatusType>("stopped");
  const [repeats, setRepeats] = useState<number>(1);
  const [pomodoroTimes, setPomodoroTimes] = useState<{
    focusTime: number;
    restTime: number;
  }>({
    focusTime: 50,
    restTime: 10,
  });
  const [currentCounterTime, setCurrentCounterTime] = useState<number>(
    minutesToSeconds(pomodoroTimes.focusTime)
  );
  const [runningDate, setRunningDate] = useState<Date>(new Date());
  const [timers, setTimers] = useState<TimerType[]>([...DEFAULT_TIMERS]);

  const increaseRepeats = () => {
    setRepeats((prevState) => prevState + 1);
  };

  const decreaseRepeats = () => {
    if (repeats > 0) setRepeats((prevState) => prevState - 1);
  };

  const startCounting = () => {
    if (pomodoroTimes.focusTime === 0) return;
    setRunningDate(sumMinutesToDate(new Date(), pomodoroTimes.focusTime));
    setCurrentCounterTime(() => minutesToSeconds(pomodoroTimes.focusTime));
    setStatus("working");
    if (configurations.alwaysStartWithInitialRepeats) {
      setRepeats(configurations.initialRepeats);
      return;
    }
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

  function checkRunning() {
    const currentTime = new Date();
    const diffInSeconds = getDateDiffInSeconds(runningDate, currentTime);

    // Simply reduce timer
    if (diffInSeconds >= 1) {
      setCurrentCounterTime(() => diffInSeconds);
      if (status === "working") sumSecondsFocused(1);
      if (status === "resting") sumSecondsResting(1);
      return;
    }

    playAlarm();

    if (repeats >= 0 && status === "working") {
      setStatus("resting");
      setRunningDate(() =>
        sumMinutesToDate(currentTime, pomodoroTimes.restTime)
      );
      setCurrentCounterTime(() => minutesToSeconds(pomodoroTimes.restTime));
      return;
    }

    if (repeats > 0 && status === "resting") {
      setStatus("working");
      setRunningDate(() =>
        sumMinutesToDate(currentTime, pomodoroTimes.focusTime)
      );
      decreaseRepeats();
      setCurrentCounterTime(() => minutesToSeconds(pomodoroTimes.focusTime));
      sumPomodoroCounter();
      return;
    }

    resetCounting();
    sumPomodoroCounter();
    return;
  }

  function createCustomTimer(timer: TimerType) {
    setTimers((prevState) => [...prevState, timer]);
  }

  useEffect(() => {
    if (status !== "stopped") {
      const interval = setInterval(() => {
        checkRunning();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, currentCounterTime]);

  useEffect(() => {
    saveConfigurations(configurations);
  }, [configurations]);

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
        timers,
        createCustomTimer,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};
