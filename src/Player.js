import React, { useRef, useEffect, useMemo } from "react";
import ReactPlayer from "react-player";

function Player({ video, isActive, onIntersection }) {
  const videoRef = useRef();
  const containerRef = useRef(null);
  const callbackFunction = (entries) => {
    const [entry] = entries;
    onIntersection(video.id, entry);
  };
  const options = useMemo(
    () => ({
      root: null,
      rootMargin: "0px",
      threshold: [0, 1]
    }),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  console.log(videoRef);
  return (
    <div className="react-player-wrapper" ref={containerRef}>
      <ReactPlayer
        ref={videoRef}
        playsinline={true}
        playing={isActive}
        controls={true}
        muted={true}
        url={video?.url}
        width="100%"
        height="100%"
        playIcon={
          <div
            className="play-icon"
            role="button"
            tabIndex={0}
            style={{ outline: "none" }}
          >
            {" "}
            <img src="../assets/play.png" alt="" />
          </div>
        }
        light={!isActive && video?.posterUrl}
      />
    </div>
  );
}

export default Player;
