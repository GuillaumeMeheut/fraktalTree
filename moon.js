const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let moonLeft = new Image();
let moonRight = new Image();

moonLeft.src = `assets/moonLeft.png`;
moonRight.src = `assets/moonRight.png`;

export const generateRandomMoon = () => {
  drawMoon(true);
};
const drawMoon = (left) => {
  if (left) ctx.drawImage(moonLeft, 0, 0);
  else ctx.drawImage(moonRight, 500, 0);
};
