"use strict";

/* global THREE */

const path = "https://threejs.org/examples/textures/cube/SwedishRoyalCastle/";
const format = ".jpg";
const urls = [
  path + "px" + format,
  path + "nx" + format,
  path + "py" + format,
  path + "ny" + format,
  path + "pz" + format,
  path + "nz" + format,
];

const reflectionCube = new THREE.CubeTextureLoader().load(urls);
const refractionCube = new THREE.CubeTextureLoader().load(urls);
refractionCube.mapping = THREE.CubeRefractionMapping;

const scene = new THREE.Scene();
scene.background = reflectionCube;
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const ambient = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff, 5);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
  color: 0xff6600,
  combine: THREE.MixOperation,
  envMap: reflectionCube,
  reflectivity: 0.1,
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
scene.add(pointLight);
scene.add(ambient);

camera.position.z = 9;

function animate() {
  cube.rotation.y += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);

animate();
