const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let sunLeft = new Image();
let sunRight = new Image();

sunLeft.src = `assets/sunLeft.png`;
sunRight.src = `assets/sunRight.png`;

export const generateRandomSun = () => {
  drawSun(false);
};
const drawSun = (left) => {
  if (left) ctx.drawImage(sunLeft, 0, 0);
  else ctx.drawImage(sunRight, 0, 0);
};

const randomNumberVariableChance = (min, max) => {
  const { random, floor, abs } = Math;
  return floor(abs(random() - random()) * (1 + max - min) + min);
};
