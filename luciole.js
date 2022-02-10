const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let yellowLuciole = new Image();
let greenLuciole = new Image();
yellowLuciole.src = "assets/yellowLuciole.png";
greenLuciole.src = "assets/greenLuciole.png";

export const generateRandomLuciole = () => {
  ctx.save();
  let nb = randomNumberVariableChance(10, 50);
  let isBicolor = randomNumberVariableChance(0, 5);
  let color = randomLucioleColor();
  for (let i = 0; i < 50; i++) {
    if (isBicolor === 5) color = randomLucioleColor();
    drawLuciole(color);
  }
  ctx.restore();
};

const drawLuciole = (color) => {
  let size = 30;
  let posX = Math.random() * canvas.width;
  let posY = Math.random() * canvas.height + canvas.height / 2;

  ctx.drawImage(color, posX, posY, size, size);
  //   ctx.beginPath();
  //   ctx.arc(posX, posY, size, 0, 2 * Math.PI);
  //   ctx.fillStyle = "rgba(238, 242, 20, .9)";
  //   ctx.fill();
  //   ctx.shadowBlur = 15;
  //   ctx.shadowColor = "rgba(238, 242, 20, 1)";
};

const randomLucioleColor = () => {
  const { random, floor } = Math;
  const i = floor(random() * 2);
  switch (i) {
    case 0:
      return yellowLuciole;
    case 1:
      return greenLuciole;
  }
};

const randomNumberVariableChance = (min, max) => {
  const { random, floor, abs } = Math;
  return floor(abs(random() - random()) * (1 + max - min) + min);
};
