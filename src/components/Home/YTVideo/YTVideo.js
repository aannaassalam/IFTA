import React from "react";
import YouTube from "react-youtube";

const YTVideo = () => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const videoOnReady = (event) => event.target.pauseVideo();

  return <YouTube videoId="6cdYr1rwT58" opts={opts} onReady={videoOnReady} />;
};

export default YTVideo;
