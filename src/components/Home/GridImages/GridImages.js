import React from "react";
import "./GridImages.css";
import poster from "../../../images/black-panther-poster.jpg";
import actor from "../../../images/saif-ali-khan.jpg";
import actor2 from "../../../images/actor.jpg"
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
import $ from "jquery";

const GridImages = ({ secId }) => {
  let count = -1;
  let newImg = x.length; //6

  const fadeOutt = () => {
    let interval = setInterval(function () {
      count >= x.length - 1 ? (count = 0) : count++;

      $(`#${count}`).fadeOut(800);
      $(`#secGrid-${count}`).fadeOut(800);

      clearInterval(interval);
      fadeIn();
    }, 800);
  };

  const fadeIn = () => {
    let interval = setInterval(function () {
      $(`#${count}`).css({
        background: `url('${y[newImg]}') no-repeat center center`,
      });
      $(`#secGrid-${count}`).css({
        background: `url('${y[newImg]}') no-repeat center center`,
      });
      newImg >= y.length - 1 ? (newImg = 0) : newImg++;

      $(`#${count}`).fadeIn(400);
      $(`#secGrid-${count}`).fadeIn(400);

      clearInterval(interval);
      fadeOutt();
    }, 700);
  };

  const renderImage = () => {
    fadeOutt();
    return (
      <div className="gridImages">
        {x.map((image, index) => (
          <div
            key={index}
            id={`${secId ? `secGrid-${index}` : `${index}`}`}
            className={`gridImagesBox gridImages__${index} fadeInOut-${index}`}
            style={{
              background: `url('${image}') no-repeat center center contain`,
              // backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>
    );
  };

  return renderImage();
};

const x = [poster, actress, actor, webSeries, tvShow, tvActor];
const y = [
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
  poster1,
  actress1,
  actor2,
  webSeries1,
  tvShow1,
  tvActor1,
];

export default GridImages;
