import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// We'll always need a scene, camera & renderer
// Scene: Like a container to hold all objects, camera's, lights
// Cameras: Mimics what human eyes see

window.onresize = () => {
  location.reload();
};

const scene = new THREE.Scene();



// Camera to see what's inside the scene
// Perspective camera mimics a human eye

// args: (field of view, aspect ratio, view frustum, view frustrum)
// field of view: amt of the world that's visible based on 360deg
// aspect ratio: based off of users browser window
// last 2 args: control which objects are visible relative to the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer: renders out the actual graphics to the scene
// Renderer needs to know which DOM element to use (canvas w id = bg)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // Makes it full screen

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xf5d1de });
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const skyTexture = new THREE.TextureLoader().load("pinkSky.jpg");
scene.background = skyTexture;

const imanTexture = new THREE.TextureLoader().load("iman.JPG");

const iman = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: imanTexture })
);

scene.add(iman);

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);

scene.add(moon);

moon.position.z = 30;
moon.position.x = -10;


function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  iman.rotation.y += 0.01;
  iman.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();

// const x = 0, y = 0;

// const heartShape = new THREE.Shape();

// heartShape.moveTo( x + 5, y + 5 );
// heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
// heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
// heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
// heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
// heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
// heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

// const geometry = new THREE.ShapeGeometry( heartShape );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const mesh = new THREE.Mesh( geometry, material ) ;
// scene.add( mesh );

// window.onresize = function()
// {
//     var canvas = document.getElementById('bg');
//     canvas.width = window.innerWidth;
//     canvas.style.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     canvas.style.height = window.innerHeight;
// }
