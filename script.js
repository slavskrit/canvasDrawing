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

function draw(p, i) {
  ctx.beginPath();
  ctx.moveTo(w / 2, h / 2);
  ctx.lineTo(p[i][0], p[i][1]);
  ctx.globalAlpha = getRandom(0, i % pointsCount) / 1000;
  ctx.stroke();
}

let index = 0;

function render() {
  window.requestAnimationFrame(render);
  draw(points, index);
  index += 1;
  if (index == pointsCount) {
    index = 0;
    ctx.clearRect(0, 0, w, h);
  }
}

render();
