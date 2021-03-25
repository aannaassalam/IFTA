import $ from "jquery";

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
let bigKeys1 = partedArray[0];
let bigKeys2 = partedArray[1];
partedArray = chunkArray(smallKeys, 2);

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

$(window).on('load', function () {
    let newImg1 = x1.length;
    let newImg2 = x2.length;
    
    const fadeIn = (self, grid) => {
        let self1 = self;
        let gridNumber = grid;
        $(self1).css({
            background: `url('${y1[newImg1]}') no-repeat center center`,
        });
        newImg1 >= y1.length - 1 && gridNumber === 1 ? (newImg1 = 0) : newImg1++;
        newImg2 >= y2.length - 1 && gridNumber === 2 ? (newImg2 = 0) : newImg2++;
        $(self1).fadeTo('fast', 1);
        setInterval(() => {
            $(self1).css({
                background: `url('${y1[newImg1]}') no-repeat center center`,
            });
            newImg1 >= y1.length - 1 && gridNumber === 1 ? (newImg1 = 0) : newImg1++;
            newImg2 >= y2.length - 1 && gridNumber === 2 ? (newImg2 = 0) : newImg2++;
            $(self1).fadeTo('fast', 1).delay('5000').fadeTo('slow', 0);
        }, 5850)
    };

    for (let start = 0; start < 6; start++) {
        setTimeout(() => {
            let self1 = $(`#grid-${start}`);
            let self2 = $(`#secGrid-${start}`);
            $(self1).fadeTo('slow', 0, fadeIn(self1, 1));
            $(self2).fadeTo('slow', 0, fadeIn(self2, 2));
        }, start * 5000);
    }
})



