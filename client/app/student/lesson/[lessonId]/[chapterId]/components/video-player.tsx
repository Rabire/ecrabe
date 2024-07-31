import { PRIMARY_COLOR } from "@/lib/utils";
import Artplayer from "artplayer";
import { useEffect, useRef } from "react";

type Props = {
  hightestCheckpoint?: number;
  url: string | null;
  poster?: string;
  isRestricted?: boolean;
  onProgress?: (currentTime: number) => void;
};

const VideoPlayer = ({
  hightestCheckpoint = 0,
  url,
  poster,
  isRestricted,
  onProgress,
}: Props) => {
  const artRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef(0);
  const hightestCheckpointRef = useRef(hightestCheckpoint);

  useEffect(() => {
    if (!url || !artRef.current) return;

    const player = new Artplayer({
      container: artRef.current,
      url,
      poster: poster || "",
      theme: PRIMARY_COLOR,
      fullscreen: true,
      lang: "fr",
    });

    player.on("video:timeupdate", () => {
      const currentTime = Math.round(player.currentTime);

      lastTimeRef.current = currentTime;

      const checkPointNeedUpdate = currentTime > hightestCheckpointRef.current;

      if (checkPointNeedUpdate) {
        hightestCheckpointRef.current = currentTime;
      }

      if (currentTime % 10 === 0 && onProgress && checkPointNeedUpdate) {
        onProgress(currentTime);
      }
    });

    player.on("video:ended", () => {
      const currentTime = Math.round(player.currentTime);

      const checkPointNeedUpdate = currentTime >= hightestCheckpointRef.current;

      if (onProgress && checkPointNeedUpdate) {
        onProgress(currentTime);
      }
    });

    player.on("seek", (newTime) => {
      if (!isRestricted) return;

      const canGoTo = hightestCheckpointRef.current > newTime;

      if (!canGoTo) {
        player.seek = lastTimeRef.current;
      }
    });

    return () => {
      player.destroy(false);
    };
  }, [url]);

  return <div ref={artRef} className="aspect-video" />;
};

export default VideoPlayer;
