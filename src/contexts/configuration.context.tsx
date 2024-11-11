"use client";

import { useEffect, createContext, ReactNode, useState } from "react";
import usePomodoroLocalStorage from "@/hooks/usePomodoroLocalStorage.hook";
import { PomodoroConfigurations } from "@/types/Configuration.type";

type ConfigurationContextType = {
  changeInitialRepeats: (initialRepeats: number) => void;
  toggleAlwaysStartWithInitialRepeats: (value: boolean) => void;
  toggleHideTimeOnTitle: (value: boolean) => void;
  configurations: PomodoroConfigurations;
};

export const ConfigurationContext = createContext<ConfigurationContextType>(
  {} as ConfigurationContextType
);

const ConfigurationProvider = ({ children }: { children: ReactNode }) => {
  const { getConfigurations, saveConfigurations } = usePomodoroLocalStorage();
  const [configurations, setConfigurations] = useState<PomodoroConfigurations>(
    getConfigurations()
  );

  function changeInitialRepeats(initialRepeats: number) {
    setConfigurations((prevState) => ({
      ...prevState,
      initialRepeats,
    }));
  }

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
    saveConfigurations(configurations);
  }, [configurations]);

  const value: ConfigurationContextType = {
    changeInitialRepeats,
    toggleAlwaysStartWithInitialRepeats,
    toggleHideTimeOnTitle,
    configurations,
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export default ConfigurationProvider;
