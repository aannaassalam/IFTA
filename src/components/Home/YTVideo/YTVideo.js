import React from "react";
import ReactPlayer from "react-player";

const YTVideo = () => {
  return (
    <ReactPlayer
      controls
      style={{maxWidth:'100%',maxHeight:'100%'}}
      url="https://www.youtube.com/watch?v=lH9RuSgwNiQ"
    />
  );
};

export default YTVideo;
