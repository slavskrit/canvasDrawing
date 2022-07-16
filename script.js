"use strict";

const c = document.getElementById("canvas");
const w = 500, h = 500, pointsCount = 5000;
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
  ctx.globalAlpha = getRandom(0, 100) / 100;
  ctx.stroke();
}

let index = 0;
let current = [0, 0];
function render() {
  window.requestAnimationFrame(render);
  const next = points[index + 1];
  draw(current, next);
  current = next;
  index += 2;
  if (index == pointsCount) {
    index = 0;
    ctx.clearRect(0, 0, w, h);
  }
}

render();
