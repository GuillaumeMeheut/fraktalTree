const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export const generateRandomFlower = () => {
  ctx.save();
  let nb = randomNumberVariableChance(0, 5);
  for (let i = 0; i < 10; i++) {
    drawFlower();
  }
  ctx.restore();
};

const drawFlower = () => {
  let width = 30;
  let height = 100;
  let posX;
  do {
    posX = Math.random() * (canvas.width - width);
  } while (posX > canvas.width - 70 && posX < canvas.width + 70);

  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.fillStyle = "black";
  ctx.lineWidth = 3;
  //   ctx.bezierCurveTo(10, -20, -10, -20, 0, -10);
  ctx.moveTo(posX, canvas.height);
  ctx.lineTo(posX, canvas.height - 80);
  ctx.stroke();
  createPetal(30, 50);
  ctx.closePath();
};

const randomNumberVariableChance = (min, max) => {
  const { random, floor, abs } = Math;
  return floor(abs(random() - random()) * (1 + max - min) + min);
};

function createPetal(length, width) {
  const path = new Path2D();
  // draw outer line
  path.moveTo(0, 0);
  path.lineTo(length * 0.3, -width);
  path.lineTo(length * 0.8, -width);
  path.lineTo(length, 0);
  path.lineTo(length * 0.8, width);
  path.lineTo(length * 0.3, width);
  // close the path so that it goes back to start
  path.closePath();

  // create the line down the middle.
  path.moveTo(0, 0);
  path.lineTo(length, 0);

  return path;
}
