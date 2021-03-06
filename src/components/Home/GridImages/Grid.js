import $ from "jquery";

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
}

const bigImages = importAll(require.context('../../../images/gridLong2', false, /\.(png|jpe?g|svg)$/));
const smallImages = importAll(require.context('../../../images/gridSmall', false, /\.(png|jpe?g|svg)$/));

let x1 = [];
let y1 = [];
let x2 = [];
let y2 = [];

let bigKeys = Object.keys(bigImages);
let smallKeys = Object.keys(smallImages);

// function chunkArray(arr, n) {
//     var chunkLength = Math.max(arr.length / n, 1);
//     var chunks = [];
//     for (var i = 0; i < n; i++) {
//         if (chunkLength * (i + 1) <= arr.length) chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
//     }
//     return chunks;
// }

// let partedArray = chunkArray(bigKeys, 2);
let bigKeys1 = bigKeys;
// let bigKeys2 = partedArray[1];
// partedArray = chunkArray(smallKeys, 2);

let smallKeys1 = smallKeys;
// let smallKeys2 = partedArray[1];

let it1 = 0;
// let it2 = 0;

for (let n = 0; n < 20; n++) {
    if (n === 0) {
        x1.push(smallImages[smallKeys1[it1]].default, bigImages[bigKeys1[it1++]].default, bigImages[bigKeys1[it1]].default, smallImages[smallKeys1[it1++]].default, smallImages[smallKeys1[it1]].default, bigImages[bigKeys1[it1++]].default);
        // x2.push(smallImages[smallKeys2[it2]].default, bigImages[bigKeys2[it2++]].default, bigImages[bigKeys2[it2++]].default, smallImages[smallKeys2[it2]].default, smallImages[smallKeys2[it2]].default, bigImages[bigKeys2[it2++]].default);
    } else {
        y1.push(smallImages[smallKeys1[it1]].default, bigImages[bigKeys1[it1++]].default, bigImages[bigKeys1[it1]].default, smallImages[smallKeys1[it1++]].default, smallImages[smallKeys1[it1]].default, bigImages[bigKeys1[it1++]].default);
        // y2.push(smallImages[smallKeys2[it2]].default, bigImages[bigKeys2[it2++]].default, bigImages[bigKeys2[it2]].default, smallImages[smallKeys2[it2++]].default, smallImages[smallKeys2[it2]].default, bigImages[bigKeys2[it2++]].default);
    }
}

$(window).on('load', function () {
    let count = -1;

    let newImg1 = x1.length;
    // let newImg2 = x2.length;

    const fadeOutt = () => {
        setTimeout(function () {
            count >= x1.length - 1 ? (count = 0) : count++;
            $(`#grid-${count}`).fadeOut(800);
            // $(`#secGrid-${count}`).fadeOut(800);
            fadeIn();
        }, 800);
    };

    const fadeIn = () => {
        setTimeout(function () {
            $(`#grid-${count}`).css({
                background: `url('${y1[newImg1]}') no-repeat center center`,
            });
            // $(`#secGrid-${count}`).css({
            //     background: `url('${y2[newImg2]}') no-repeat center center`,
            // });

            newImg1 >= y1.length - 1 ? (newImg1 = 0) : newImg1++;
            // newImg2 >= y2.length - 1 ? (newImg2 = 0) : newImg2++;

            $(`#grid-${count}`).fadeIn(400);
            // $(`#secGrid-${count}`).fadeIn(400);
            fadeOutt();
        }, 700);
    };

    fadeOutt();
})



