"use strict";

const c = document.getElementById("canvas");
const w = 500, h = 500, pointsCount = 1000;
c.width = w;
c.height = h;
const ctx = c.getContext("2d");

const points = [];
for (let i = 0; i < pointsCount; i++) {
  points.push([getRandom(0, w), getRandom(0, h)]);
}

function getRandom(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function draw(c, n) {
  ctx.beginPath();
  ctx.lineTo(c[0], c[1]);
  ctx.lineTo(n[0], n[1]);
  ctx.globalAlpha = 0.1;
  ctx.stroke();
}

let index = 0;
let current = [0, 0];
render();
function render() {
  const next = points[index + 1];
  draw(current, next);
  current = next;
  index += 2;
  if (index >= pointsCount) {
    const imgd = ctx.getImageData(0, 0, w, h);
    const pix = imgd.data;
    const imgData = ctx.createImageData(w, h);
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i + 0] = 0;
      imgData.data[i + 1] = 0;
      imgData.data[i + 2] = 0;
      imgData.data[i + 3] = pix[i + 3] > getRandom(20, 50) ? 255 : 0;
    }
    ctx.putImageData(imgData, 0, 0);
    return;
  }
  window.requestAnimationFrame(render);
}
