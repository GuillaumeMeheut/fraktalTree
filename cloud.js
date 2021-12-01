const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const drawCloud = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, 60, Math.PI * 0.5, Math.PI * 1.5);
  ctx.arc(x + 70, y - 60, 70, Math.PI * 1, Math.PI * 1.85);
  ctx.arc(x + 152, y - 45, 50, Math.PI * 1.37, Math.PI * 1.91);
  ctx.arc(x + 200, y, 60, Math.PI * 1.5, Math.PI * 0.5);
  ctx.moveTo(x + 200, y + 60);
  ctx.lineTo(x, y + 60);
  ctx.strokeStyle = "#FFFFFF";
  ctx.stroke();
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
};
