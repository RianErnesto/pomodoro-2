"use client";

import {
  createContext,
  ReactNode,
  useRef,
  useState,
  useEffect,
  Ref,
} from "react";

interface AlarmContextType {
  playAlarm: () => void;
  stopAlarm: () => void;
  increaseVolume: () => void;
  decreaseVolume: () => void;
  volume: number;
  isPlaying: boolean;
  audioRef: Ref<HTMLAudioElement>;
  onAudioEnded: () => void;
}

export const AlarmContext = createContext<AlarmContextType>(
  {} as AlarmContextType
);

export const AlarmProvider = ({ children }: { children: ReactNode }) => {
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      console.log("Playing");
    }
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const increaseVolume = () => {
    if (volume < 100) {
      setVolume((prevState) => prevState + 10);
    }
  };

  const decreaseVolume = () => {
    if (volume > 0) {
      setVolume((prevState) => prevState - 10);
    }
  };

  const onAudioEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, []);

  return (
    <AlarmContext.Provider
      value={{
        playAlarm,
        stopAlarm,
        increaseVolume,
        decreaseVolume,
        volume,
        isPlaying,
        audioRef,
        onAudioEnded,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
};
