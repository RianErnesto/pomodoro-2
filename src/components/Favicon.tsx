"use client";

import { usePomodoro } from "@/hooks/usePomodoro.hook";

const Favicon = () => {
  const { status } = usePomodoro();

  const getFavicon = (): string => {
    switch (status) {
      case "stopped":
        return "/favicons/stopped.png";
      case "resting":
        return "/favicons/resting.png";
      case "working":
        return "/favicons/working.png";
      default:
        return "/favicons/stopped.png";
    }
  };

  return <link rel="icon" href={`${getFavicon()}`} />;
};

export default Favicon;
