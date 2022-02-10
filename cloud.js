const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let cloudType = [
  { img: new Image(), size: { width: 171, height: 136 } },
  { img: new Image(), size: { width: 165, height: 162 } },
  { img: new Image(), size: { width: 175, height: 172 } },
  { img: new Image(), size: { width: 242, height: 143 } },
  { img: new Image(), size: { width: 315, height: 136 } },
  { img: new Image(), size: { width: 251, height: 171 } },
  { img: new Image(), size: { width: 265, height: 186 } },
];

cloudType[0].img.src = `assets/cloud0.png`;
cloudType[1].img.src = `assets/cloud1.png`;
cloudType[2].img.src = `assets/cloud2.png`;
cloudType[3].img.src = `assets/cloud3.png`;
cloudType[4].img.src = `assets/cloud4.png`;
cloudType[5].img.src = `assets/cloud5.png`;
cloudType[6].img.src = `assets/cloud6.png`;

export const generateRandomCloud = () => {
  ctx.save();
  let nbCloud = randomNumberVariableChance(0, 5);
  for (let i = 0; i < nbCloud; i++) {
    drawCloud(Math.floor(Math.random() * 3), Math.random() * 200);
  }
  ctx.restore();
};
const drawCloud = (cloudTypeIndex, y) => {
  const { width, height } = calculateAspectRatioFit(
    cloudType[cloudTypeIndex].size.width,
    cloudType[cloudTypeIndex].size.height,
    110,
    110
  );
  let size = 1;
  //instead of random Y position put x lines for x max cloud and draw cloud on those line
  ctx.drawImage(
    cloudType[cloudTypeIndex].img,
    Math.random() * (canvas.width - width * size),
    y,
    width * size,
    height * size
  );
};

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

const randomNumberVariableChance = (min, max) => {
  const { random, floor, abs } = Math;
  return floor(abs(random() - random()) * (1 + max - min) + min);
};
