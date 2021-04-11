import React, { useCallback, useMemo, useState } from "react";
import { smallVideos } from "./libs/videos";
import SmallCardVideos from "./smallCardVideos";

export default function Home() {
  const [activeVideoId, setActiveVideoId] = useState(undefined);
  const visiblePlayers = useMemo(() => new Map(), []);
  const handleIntersection = useCallback(
    (videoId, entry) => {
      if (entry.isIntersecting) {
        visiblePlayers.set(videoId, entry);
      } else {
        visiblePlayers.delete(videoId);
      }

      let lastEntry = {
        videoId: null,
        intersectionRatio: 0
      };

      visiblePlayers.forEach((intersection, intersectionVideoId) => {
        if (intersection.intersectionRatio > lastEntry.intersectionRatio) {
          lastEntry = {
            videoId: intersectionVideoId,
            intersectionRatio: intersection.intersectionRatio
          };
        }
      });

      if (lastEntry.intersectionRatio === 1) {
        setActiveVideoId(lastEntry.videoId);
      }
    },
    [visiblePlayers]
  );
  return (
    <div className="page_details">
      <div className="past-events">
        <div className="divider" />

        <div className="past-events_header">
          <span>Small Videos</span>
        </div>

        <div className="past-events_body">
          <div className="video-card">
            {smallVideos.map((video) => {
              return (
                <SmallCardVideos
                  video={video}
                  key={video.id}
                  isActive={video.id === activeVideoId}
                  onIntersection={handleIntersection}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
