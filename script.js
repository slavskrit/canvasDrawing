"use strict";

/* global THREE */

const SPEED = 0.01;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
const mControls = new THREE.OrbitControls(camera, renderer.domElement);
const pointLight = new THREE.PointLight(0xffbf00, 2);
pointLight.position.z = 2500;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xffcf40, 1);
pointLight2.position.x = 400;
pointLight2.position.y = 400;
camera.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffdc73, 4);
pointLight3.position.x = -1000;
pointLight3.position.z = 1000;
scene.add(pointLight3);

const loader = new THREE.GLTFLoader();
const parts = {};
let partsNumber = 0;
loader.load(
  "planet.glb",
  function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.children.forEach(function (mesh, index) {
      if (mesh.isMesh) {
        mesh.material.color = 0x000000;
        mesh.material.roughness = 0.2;
        parts[index] = {
          "mesh": mesh,
          "vector": new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5,
          ),
        };
      }
    });
    partsNumber = gltf.scene.children.length;
  },
  undefined,
  function (error) {
    console.error(error);
  },
);

scene.add(pointLight);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 3;

function animate() {
  if (partsNumber > 0) {
    for (let i = 0; i < partsNumber; i++) {
      parts[i].mesh.rotateOnAxis(parts[i].vector, SPEED);
    }
  }
  mControls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);

animate();
