export function getTimeFromSeconds(seconds: number): {
  hour: number;
  minute: number;
  second: number;
} {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  return { hour, minute, second };
}

export function secondsToLocalTimeString(seconds: number): string {
  const { hour, minute, second } = getTimeFromSeconds(seconds);

  return `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`;
}

export function minutesToSeconds(minutes: number): number {
  return minutes * 60;
}

export function secondsToMinutes(seconds: number): number {
  return parseFloat((seconds / 60).toFixed(2));
}

export function formatTime(time: number): string {
  return time.toString().padStart(2, "0");
}
