import React from "react";
import ReactPlayer from "react-player";

const YTVideo = () => {
  return (
    <ReactPlayer
      controls
      style={{maxWidth:'100%',maxHeight:'100%'}}
      url="https://www.youtube.com/watch?v=5xQT7U5FBQ8"
    />
  );
};

export default YTVideo;
