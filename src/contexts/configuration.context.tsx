"use client";

import { useEffect, createContext, ReactNode, useState } from "react";
import usePomodoroLocalStorage from "@/hooks/usePomodoroLocalStorage.hook";
import {
  PomodoroConfigurations,
  ScreenSizesType,
} from "@/types/Configuration.type";
import { DEFAULT_CONFIGURATION } from "@/constants/configuration.constant";

type ConfigurationContextType = {
  changeInitialRepeats: (initialRepeats: number) => void;
  toggleAlwaysStartWithInitialRepeats: (value: boolean) => void;
  toggleHideTimeOnTitle: (value: boolean) => void;
  configurations: PomodoroConfigurations;
  changeScreenSize: (size: ScreenSizesType) => void;
  toggleDisplayVideo: (value: boolean) => void;
  toggleMuteVideo: (value: boolean) => void;
};

export const ConfigurationContext = createContext<ConfigurationContextType>(
  {} as ConfigurationContextType
);

const ConfigurationProvider = ({ children }: { children: ReactNode }) => {
  const { getConfigurations, saveConfigurations } = usePomodoroLocalStorage();
  const [configurations, setConfigurations] = useState<PomodoroConfigurations>(
    DEFAULT_CONFIGURATION
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

  const toggleDisplayVideo = (value: boolean) => {
    setConfigurations((prevState) => ({
      ...prevState,
      displayVideo: value,
    }));
  };

  const toggleMuteVideo = (value: boolean) => {
    setConfigurations((prevState) => ({
      ...prevState,
      muteVideo: value,
    }));
  };

  const changeScreenSize = (size: ScreenSizesType) => {
    setConfigurations((prevState) => ({
      ...prevState,
      screenSize: size,
    }));
  };

  useEffect(() => {
    saveConfigurations(configurations);
  }, [configurations]);

  useEffect(() => {
    const localStorageConfigs = getConfigurations();

    setConfigurations((prevState) => ({
      ...prevState,
      ...localStorageConfigs,
    }));
  }, []);

  const value: ConfigurationContextType = {
    changeInitialRepeats,
    toggleAlwaysStartWithInitialRepeats,
    toggleHideTimeOnTitle,
    configurations,
    changeScreenSize,
    toggleDisplayVideo,
    toggleMuteVideo,
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export default ConfigurationProvider;
