import { StatusType } from "./Status.type";

export type TimeType = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type TimerType = {
  focusTime: number;
  restTime: number;
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
  pomodoroTimes: TimerType;
  timers: TimerType[];
  createCustomTimer: (timers: TimerType) => void;
};
