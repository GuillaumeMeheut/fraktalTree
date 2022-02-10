import { generateRandomCloud } from "./cloud.js";
import { generateRandomLuciole } from "./luciole.js";
import { generateRandomSun } from "./sun.js";
import { generateRandomMoon } from "./moon.js";

const canvas = document.querySelector("canvas");
const btnGenerate = document.querySelector(".button1");
const btnSave = document.querySelector(".button2");
canvas.width = 1000;
canvas.height = 1000;
const ctx = canvas.getContext("2d");

let step;
let day;
let isCurved;
let curve;
let curve2;
let nbLeaf;
let leafSize;
let sunOrMoon;

const DayColors = ["#C51F31", "#1B325F", "#F3A5AF", "#58B272", "#FBD46A"];
const NightColors = ["#301A4D", "#410C0C", "#0E2B15", "#0E0F0D", "#0A0F2C"];

btnGenerate.addEventListener("click", () => {
  generateRandomTree();
});

btnSave.addEventListener("click", () => {
  saveImage();
});

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  curve = Math.random() * 10 + 10;
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  // ctx.fillStyle = LightenDarkenColor(color2, Math.random() * 30 - 30);
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(0,0,0,.5)";
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  //curved tree or not
  if (isCurved) {
    if (angle > 0) {
      ctx.bezierCurveTo(curve2, -len / 2, curve2, -len / 2, 0, -len);
    } else {
      ctx.bezierCurveTo(curve2, -len / 2, -curve2, -len / 2, 0, -len);
    }
  } else {
    ctx.lineTo(0, -len);
  }
  ctx.stroke();

  if (branchWidth > 10) {
    ctx.save();
    ctx.clip();

    ctx.fillStyle = LightenDarkenColor(color1, 40);
    // ctx.fillRect(0, -len, 140, 140);
    ctx.arc(0, -len, 255, 0, Math.PI / 2);

    ctx.restore();
  }

  //draw leaf
  if (len < nbLeaf) {
    if (typeof color2 !== "string")
      ctx.fillStyle = color2[Math.floor(Math.random() * color2.length)];
    else ctx.fillStyle = getRandomColor();
    ctx.beginPath();
    leafSize = Math.random() * 20 + 8;
    ctx.arc(0, -len, leafSize, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  //  draw insect
  // if (branchWidth > 50) {
  //   ctx.drawImage(insect, -20, -len + 40, 20, 20);
  // }

  //  draw fruit
  // if (step % 40 === 0 && step > 500 && branchWidth < 20) {
  //   ctx.save();
  //   ctx.rotate(1);
  //   ctx.drawImage(pear, 0, -len, 20, 20);
  //   ctx.restore();
  // }

  drawTree(
    0,
    -len,
    len * 0.8,
    angle + curve,
    branchWidth * (Math.random() * 0.05 + 0.55),
    color1,
    color2
  );

  drawTree(
    0,
    -len,
    len * 0.8,
    angle - curve,
    branchWidth * (Math.random() * 0.05 + 0.55),
    color1,
    color2
  );
  ctx.restore();
  step++;
}

export function generateRandomTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  step = 0;

  let centerPointX = canvas.width / 2;
  let len = Math.floor(Math.random() * 50 + 125);
  let angle = 0;
  let branchWidth = Math.random() * 70 + 1;
  let color1 = getRandomColor();
  let color2 = multiColor();
  curve = Math.random() * 10 + 10;
  curve2 = Math.random() * 60;
  nbLeaf = Math.random() * 13 + 9;
  leafSize = Math.random() * 20 + 8;
  isCurved = Math.floor(Math.random() * 6);
  day = Math.floor(Math.random() * 2);
  console.log(day);
  if (Math.floor(Math.random() * 10) === 0) sunOrMoon = true;
  else sunOrMoon = false;
  let bgColor;
  if (day) bgColor = DayColors[Math.floor(Math.random() * DayColors.length)];
  else bgColor = NightColors[Math.floor(Math.random() * NightColors.length)];

  //draw
  //bg
  let gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    50,
    canvas.width / 2,
    canvas.height / 2,
    canvas.height / 2
  );

  // Add three color stops
  gradient.addColorStop(0, LightenDarkenColor(bgColor, 25));
  gradient.addColorStop(0.9, bgColor);
  gradient.addColorStop(1, bgColor);

  // Set the fill style and draw a rectangle
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ctx.fillStyle = bgColor;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  // generateRandomFlower();

  if (!day) {
    generateRandomLuciole();
    if (sunOrMoon) generateRandomMoon();
  } else {
    if (sunOrMoon) generateRandomSun();
  }
  // generateRandomCloud();

  drawTree(
    centerPointX,
    canvas.height + 20,
    len,
    angle,
    branchWidth,
    color1,
    color2
  );
}

const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const saveImage = (id) => {
  let image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
  btnSave.download = `image${id}.jpg`;
  btnSave.href = image; // it will save locally
};

const multiColor = () => {
  const percent = Math.random() * 100;

  //55% chance
  if (percent <= 55) return [getRandomColor()];
  //25% chance
  else if (percent <= 80) return [getRandomColor(), getRandomColor()];
  //15% chance
  else if (percent <= 95)
    return [getRandomColor(), getRandomColor(), getRandomColor()];
  //5% chance
  else return "multicolor";
};
const LightenDarkenColor = (color, taux) => {
  let usePound = false;
  if (color[0] == "#") {
    color = color.slice(1);
    usePound = true;
  }
  let num = parseInt(color, 16);
  let r = (num >> 16) + taux;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00ff) + taux;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000ff) + taux;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

const randomNumberVariableChance = (min, max) => {
  const { random, floor, abs } = Math;
  return floor(abs(random() - random()) * (1 + max - min) + min);
};
