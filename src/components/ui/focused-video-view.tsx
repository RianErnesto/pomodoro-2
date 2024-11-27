"use client";

import { useEffect, useState } from "react";
import { usePomodoro } from "@/hooks/usePomodoro.hook";
import { cn } from "@/lib/utils";
import useConfigurations from "@/hooks/useConfigurations.hook";
import {
  playVideo,
  loadVideoByUrl,
  muteVideo as muteVideoFn,
  pauseVideo,
  stopVideo,
  unmuteVideo,
} from "@/utils/yt-video.utils";

export default function FocusedVideo() {
  const [player, setPlayer] = useState<unknown>(null);
  const { status } = usePomodoro();
  const {
    configurations: { displayVideo, muteVideo },
  } = useConfigurations();

  const startVideo = () => {
    playVideo(player);
    loadVideoByUrl(
      player,
      "https://www.youtube.com/embed/kns07ptr0a0?si=NRQn2u0fkwEqr5Po"
    );
  };

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.onYouTubeIframeAPIReady = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const tempPlayer = new YT.Player("player", {
        videoId: "kns07ptr0a0",
        playerVars: {
          playersinline: 1,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          showinfo: 0,
          enablejsapi: 1,
          rel: 0,
        },
      });
      setPlayer(tempPlayer);
    };
  }, []);

  useEffect(() => {
    if (!displayVideo) return;
    console.log("teste ", displayVideo);
    if (status === "resting") startVideo();
    else stopVideo(player);
  }, [status]);

  useEffect(() => {
    if (displayVideo) playVideo(player);
    else pauseVideo(player);
    console.log(displayVideo);
  }, [displayVideo]);

  useEffect(() => {
    if (muteVideo) muteVideoFn(player);
    else unmuteVideo(player);
  }, [muteVideo]);

  return (
    <div
      className={cn(
        "pointer-events-none invisible opacity-0 transition-all duration-1000",
        status === "resting" && "visible opacity-100 ",
        !displayVideo && "hidden opacity-0"
      )}
    >
      <div className={cn("absolute top-0 left-0 h-full w-full")} id="player" />
    </div>
  );
}
