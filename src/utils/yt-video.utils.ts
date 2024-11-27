export function playVideo(player: unknown) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  player?.playVideo();
}

export function pauseVideo(player: unknown) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  player?.pauseVideo();
}

export function loadVideoByUrl(player: unknown, url: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  player?.loadVideoByUrl(url, 0, "small");
}

export function stopVideo(player: unknown) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  player?.stopVideo();
}

export function muteVideo(player: unknown) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  player?.mute();
}

export function unmuteVideo(player: unknown) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  player?.unMute();
}
