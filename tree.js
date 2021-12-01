const canvas = document.querySelector("canvas");
const btnGenerate = document.querySelector(".button1");
const btnSave = document.querySelector(".button2");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let sun = new Image();
let step;
let isCurved;
let curve;
let curve2;
let nbLeaf;
let leafSize;
//demi-circle
//circle
//star
const leafForm = [
  "ctx.arc(0, -len, leafSize, 0, Math.PI / 2)",
  "ctx.arc(0, -len, 4, 0, 2 * Math.PI)",
  `ctx.save()
  ctx.beginPath();
  ctx.translate(0, -len);
  ctx.moveTo(0,0 - 7);
  for (let i = 0; i < 5; i++) {
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, 0 - (7*3));
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, 0 - 7);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();`,
];

btnGenerate.addEventListener("click", () => {
  generateRandomTree();
});

btnSave.addEventListener("click", () => {
  saveImage();
});

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = LightenDarkenColor(color1, Math.random() * 5 - 5);
  ctx.fillStyle = LightenDarkenColor(color2, Math.random() * 30 - 30);
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(0,0,0,.5)";
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
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
  if (len < nbLeaf) {
    ctx.beginPath();
    eval(leafForm[Math.floor(Math.random() * 1)]);
    ctx.fill();
    ctx.restore();
    return;
  }
  if (step < 10) {
    console.log("test");
    saveImage();
  }

  drawTree(
    0,
    -len,
    len * 0.8,
    angle + curve,
    branchWidth * 0.6,
    color1,
    color2
  );
  drawTree(
    0,
    -len,
    len * 0.8,
    angle - curve,
    branchWidth * 0.6,
    color1,
    color2
  );
  ctx.restore();
  //   if (step % 50 === 0) saveImage();
  // console.log(step);
  step++;
}

export function generateRandomTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getRandomColor();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  step = 0;

  let centerPointX = canvas.width / 2;
  let len = Math.floor(Math.random() * 50 + 120);
  let angle = 0;
  let branchWidth = Math.random() * 70 + 1;
  let color1 = getRandomColor();
  let color2 = getRandomColor();
  curve = Math.random() * 10 + 10;
  curve2 = Math.random() * 50;
  nbLeaf = Math.random() * 12 + 8;
  leafSize = Math.random() * 20 + 8;
  isCurved = Math.floor(Math.random() * 6);

  // generateSun();

  drawTree(
    centerPointX,
    canvas.height,
    len,
    angle,
    branchWidth,
    color1,
    color2
  );
}

const generateSun = () => {
  ctx.drawImage(sun, 100, 400);

  sun.src = "assets/sun.png";
};

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
