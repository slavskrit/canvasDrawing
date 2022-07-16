"use strict";

const c = document.getElementById("canvas");

c.width = 500;
c.height = 500;

const ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(20, 20);
ctx.lineTo(220, 20);
ctx.lineTo(490, 20);
ctx.stroke();
