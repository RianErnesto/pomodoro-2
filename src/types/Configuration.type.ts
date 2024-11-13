export interface PomodoroConfigurations {
  /**
   * Hide time on title
   * @default false
   */
  hideTimeOnTitle: boolean;
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
   * @default "sm"
   */
  screenSize: "sm" | "md" | "lg";
}
