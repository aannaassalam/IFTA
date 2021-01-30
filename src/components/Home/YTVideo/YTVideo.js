import React from "react";
import ReactPlayer from "react-player";

const YTVideo = () => {
  return (
    <ReactPlayer
      controls
      style={{maxWidth:'100%',maxHeight:'100%'}}
      url="https://www.youtube.com/watch?v=6cdYr1rwT58&t=3s"
    />
  );
};

export default YTVideo;
