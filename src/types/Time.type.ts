import { StatusType } from "./Status.type";
import { PomodoroConfigurations } from "./Configuration.type";

export type TimeType = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type TimeContextType = {
  /**
   * Time to be displayed on the counter in seconds
   * @type {number}
   */
  currentCounterTime: number;
  setCurrentCounterTime: (time: number) => void;
  repeats: number;
  setRepeats: (repeats: number) => void;
  startCounting: () => void;
  resetCounting: () => void;
  status: StatusType;
  setStatus: (status: StatusType) => void;
  increaseRepeats: () => void;
  decreaseRepeats: () => void;
  changePomodoroTimes: (focusTime: number, restTime: number) => void;
  pomodoroTimes: {
    focusTime: number;
    restTime: number;
  };
  configurations: PomodoroConfigurations;
  toggleHideTimeOnTitle: (value: boolean) => void;
  toggleAlwaysStartWithInitialRepeats: (value: boolean) => void;
  changeInitialRepeats: (value: number) => void;
};
