export type ScreenSizesType = "sm" | "md" | "lg";

export interface PomodoroConfigurations {
  /**
   * Hide time on title
   * @default false
   */
  hideTimeOnTitle: boolean;
  /**
   * Display video on resting moment
   * @default true
   */
  displayVideo: boolean;
  /**
   * Mute video on resting moment
   * @default false
   */
  muteVideo: boolean;
  /**
   * Initial repeats
   * @default 1
   */
  initialRepeats: number;
  /**
   * Always start with initial repeats
   * @default true
   */
  alwaysStartWithInitialRepeats: boolean;
  /**
   * Screen size
   * @default "md"
   */
  screenSize: ScreenSizesType;
}
