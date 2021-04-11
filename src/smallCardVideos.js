import Player from "./Player";

const SmallCardVideos = ({ video, isActive, onIntersection }) => {
  return (
    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-4">
      {/* eslint-disable-next-line react/self-closing-comp */}

      <>
        <a
          className="video-thumbnail-card"
          target="_blank"
          href={`/videos/${video.id}`}
          rel="noreferrer"
        >
          <Player
            video={video}
            isActive={isActive}
            onIntersection={onIntersection}
          />
        </a>
      </>
    </div>
  );
};

export default SmallCardVideos;
