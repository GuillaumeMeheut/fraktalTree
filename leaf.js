const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let leafType = [
  { img: new Image(), size: { width: 325, height: 173 } },
  { img: new Image(), size: { width: 325, height: 173 } },
];

leafType[0].img.src = `assets/leaf0.png`;
leafType[1].img.src = `assets/leaf1.png`;

const leafForm = [
  "ctx.arc(0, -len, leafSize, 0, Math.PI / 2)",
  "ctx.drawImage(leafType[leafFormIndex].img, 0, -len, width, height);",
  "ctx.drawImage(leafType[leafFormIndex].img, 0, -len, width, height);",
];

export const drawLeaf = (leafFormIndex, len) => {
  console.log(leafType[leafFormIndex]);
  ctx.beginPath();
  let leafSize = Math.random() * 20 + 8;
  const { width, height } = calculateAspectRatioFit(
    leafType[leafFormIndex].size.width,
    leafType[leafFormIndex].size.height,
    leafSize,
    leafSize
  );
  //   eval(leafForm[leafFormIndex]);
  ctx.arc(0, -len, leafSize, 0, Math.PI / 2);
  ctx.fill();
  ctx.restore();
  return;
};

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

const randomNumberVariableChance = (min, max) => {
  const { random, floor, abs } = Math;
  return floor(abs(random() - random()) * (1 + max - min) + min);
};
