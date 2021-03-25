import React from "react";
import "./GridImages.css";
import "./Grid.js"

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images
}

const bigImages = importAll(require.context('../../../images/gridLong', false, /\.(png|jpe?g|svg)$/));
const smallImages = importAll(require.context('../../../images/gridSmall', false, /\.(png|jpe?g|svg)$/));

let x1 = [];
let y1 = [];
let x2 = [];
let y2 = [];

let bigKeys = Object.keys(bigImages);
let smallKeys = Object.keys(smallImages);

function chunkArray(arr, n) {
  var chunkLength = Math.max(arr.length / n, 1);
  var chunks = [];
  for (var i = 0; i < n; i++) {
    if (chunkLength * (i + 1) <= arr.length) chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
  }
  return chunks;
}

let partedArray = chunkArray(bigKeys, 2);
console.log(partedArray);
let bigKeys1 = partedArray[0];
let bigKeys2 = partedArray[1];
partedArray = chunkArray(smallKeys, 2);
console.log(partedArray);
let smallKeys1 = partedArray[0];
let smallKeys2 = partedArray[1];

let it1 = 0;
let it2 = 0;

for (let n = 0; n < 10; n++) {
  if (n === 0) {
    x1.push(smallImages[smallKeys1[it1]].default, bigImages[bigKeys1[it1++]].default, bigImages[bigKeys1[it1]].default, smallImages[smallKeys1[it1++]].default, smallImages[smallKeys1[it1]].default, bigImages[bigKeys1[it1++]].default);
    x2.push(smallImages[smallKeys2[it2]].default, bigImages[bigKeys2[it2++]].default, bigImages[bigKeys2[it2++]].default, smallImages[smallKeys2[it2]].default, smallImages[smallKeys2[it2]].default, bigImages[bigKeys2[it2++]].default);
  } else {
    y1.push(smallImages[smallKeys1[it1]].default, bigImages[bigKeys1[it1++]].default, bigImages[bigKeys1[it1]].default, smallImages[smallKeys1[it1++]].default, smallImages[smallKeys1[it1]].default, bigImages[bigKeys1[it1++]].default);
    y2.push(smallImages[smallKeys2[it2]].default, bigImages[bigKeys2[it2++]].default, bigImages[bigKeys2[it2]].default, smallImages[smallKeys2[it2++]].default, smallImages[smallKeys2[it2]].default, bigImages[bigKeys2[it2++]].default);
  }
}

const GridImages = ({ secId }) => {
  const renderImage = () => {
    return (
      <div className="gridImages">
        {secId ? x2.map((image, index) => (
          <div
            key={index}
            id={`${secId ? `secGrid-${index}` : `${index}`}`}
            className={`gridImagesBox gridImages__${index} `}
            style={{
              background: `url("${image}")`,
              // backgroundSize: "cover",
            }}
          ></div>
        )) : x1.map((image, index) => (
          <div
            key={index}
            id={`grid-${index}`}
            className={`gridImagesBox gridImages__${index} `}
            style={{
              background: `url("${image}")`,
              // backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>
    );
  };

  return renderImage();
};

export default GridImages;
