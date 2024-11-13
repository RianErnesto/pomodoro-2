"use client";

import { LocalStorageKeys } from "@/types/Localstorage.enum";
import { PomodoroConfigurations } from "@/types/Configuration.type";
import { DEFAULT_CONFIGURATION } from "@/constants/configuration.constant";
import { StatisticsType } from "@/types/Statistics.type";
import { useState, useEffect } from "react";

export default function usePomodoroLocalStorage() {
  const [storage, setStorage] = useState<Storage | null>(null);

  function sumSecondsFocused(value: number): void {
    const currentValue = parseInt(
      storage?.getItem(LocalStorageKeys.TIME_FOCUSED) || "0",
      10
    );
    storage?.setItem(
      LocalStorageKeys.TIME_FOCUSED,
      String(currentValue + value)
    );
  }

  function sumSecondsResting(value: number): void {
    const currentValue = parseInt(
      storage?.getItem(LocalStorageKeys.TIME_RESTING) || "0",
      10
    );
    storage?.setItem(
      LocalStorageKeys.TIME_RESTING,
      String(currentValue + value)
    );
  }

  function sumPomodoroCounter(): void {
    const currentValue = parseInt(
      storage?.getItem(LocalStorageKeys.POMODORO_COUNTER) || "0",
      10
    );
    storage?.setItem(
      LocalStorageKeys.POMODORO_COUNTER,
      String(currentValue + 1)
    );
  }

  function setScreenSize(size: "sm" | "md" | "lg") {
    storage?.setItem(LocalStorageKeys.SCREEN_SIZE, size);
  }

  function saveConfigurations(configurations: PomodoroConfigurations): void {
    storage?.setItem(
      LocalStorageKeys.POMODORO_CONFIGURATIONS,
      JSON.stringify(configurations)
    );
  }

  function getConfigurations(): PomodoroConfigurations {
    const configurationsString = storage?.getItem(
      LocalStorageKeys.POMODORO_CONFIGURATIONS
    );

    if (!configurationsString) {
      saveConfigurations(DEFAULT_CONFIGURATION);
      return DEFAULT_CONFIGURATION;
    }

    return JSON.parse(configurationsString);
  }

  function getStatistics(): StatisticsType {
    return {
      timeFocused: parseInt(
        storage?.getItem(LocalStorageKeys.TIME_FOCUSED) || "0",
        10
      ),
      timeResting: parseInt(
        storage?.getItem(LocalStorageKeys.TIME_RESTING) || "0",
        10
      ),
      pomodoroCounter: parseInt(
        storage?.getItem(LocalStorageKeys.POMODORO_COUNTER) || "0",
        10
      ),
    };
  }

  function clearStatistics(): void {
    storage?.removeItem(LocalStorageKeys.TIME_FOCUSED);
    storage?.removeItem(LocalStorageKeys.TIME_RESTING);
    storage?.removeItem(LocalStorageKeys.POMODORO_COUNTER);
  }

  useEffect(() => {
    setStorage(window.localStorage);
  }, []);

  return {
    sumSecondsFocused,
    sumSecondsResting,
    sumPomodoroCounter,
    saveConfigurations,
    getConfigurations,
    getStatistics,
    clearStatistics,
    setScreenSize,
  };
}
