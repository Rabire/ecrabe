export const getIsVideoWatchedByUser = (
  userWatchedUntil = 0,
  videoDuration: number
) => userWatchedUntil >= videoDuration * 0.9; // if user watched 90% of the video
