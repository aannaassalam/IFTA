import React from "react";
import "./GridImages.css";
import poster from "../../../images/black-panther-poster.jpg";
import actor from "../../../images/actor.jpg";
import tvShow from "../../../images/tvshow-poster.jpg";
import actress from "../../../images/actress.jpg";
import webSeries from "../../../images/webseries-poster.jpg";
import tvActor from "../../../images/tv-actor.jpg";
// SECOND
import poster1 from "../../../images/black-panther-poster-1.jpg";
import actor1 from "../../../images/actor-1.jpg";
import tvShow1 from "../../../images/tvshow-poster-1.jpg";
import actress1 from "../../../images/actress-1.jpg";
import webSeries1 from "../../../images/webseries-poster-1.jpg";
import tvActor1 from "../../../images/tv-actor-1.jpg";

const GridImages = () => {
  return (
    <div className="gridImages">
      {images.map((image, index) => (
        <div
          class={`gridImagesBox gridImages__${index}`}
          style={{
            background: `url('${image}') no-repeat center center`,
            backgroundSize: "cover",
          }}
        ></div>
      ))}
    </div>
  );
};

const images = [poster, actress, actor, webSeries, tvShow, tvActor];
const images2 = [
  poster,
  actress,
  actor,
  webSeries,
  tvShow,
  tvActor,
  poster1,
  actress1,
  actor1,
  webSeries1,
  tvShow1,
  tvActor1,
];

export default GridImages;
