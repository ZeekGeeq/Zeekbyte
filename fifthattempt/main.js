import { PointLight } from 'three';
import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

const spaceBackground = new THREE.TextureLoader().load("GalaxyBack.jpg");
scene.background = spaceBackground;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(10);
renderer.render(scene,camera);
const orockTexture = new THREE.TextureLoader().load("orangeRock.jpg");
const geometry = new THREE.TorusGeometry(4,0.5,8,100);
const material = new THREE.MeshStandardMaterial({map: orockTexture});
const torus = new THREE.Mesh(geometry, material);


const iceTexture = new THREE.TextureLoader().load("IceTexture.jpeg");
const torus2 = new THREE.Mesh(new THREE.TorusGeometry(3,0.5,8,100), new THREE.MeshStandardMaterial({map: iceTexture}));
scene.add(torus2);
const Zeek_texture = new THREE.TextureLoader().load('Zeek_OnB.png');
const Zeek = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), new THREE.MeshStandardMaterial({map: Zeek_texture}));

scene.add(Zeek);

scene.add(torus);

const EarthTexture = new THREE.TextureLoader().load("EARTH.jpg");
const EARTH = new THREE.Mesh(new THREE.SphereGeometry(2), new THREE.MeshStandardMaterial({map:EarthTexture}))
EARTH.position.x = -9;
EARTH.position.z = 15;
scene.add(EARTH);

const planetOneTexture = new THREE.TextureLoader().load("jupeqb.jpg");
const planetOne = new THREE.Mesh(new THREE.SphereGeometry(9), new THREE.MeshStandardMaterial({map:planetOneTexture}));
planetOne.position.x = 9;
planetOne.position.z = 50;
scene.add(planetOne)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const gridHelper = new THREE.GridHelper(200,50);

scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry_star = new THREE.SphereGeometry(0.50,24,24);
  const material_star = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const star = new THREE.Mesh(geometry_star, material_star);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(160));
  star.position.set(x,y,z);
  scene.add(star);
}
for(let i = 0; i < 200 ;i++){
  addStar();
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  planetOne.rotation.x += 0.05;
  planetOne.rotation.y += 0.075;
  planetOne.rotation.z += 0.05;
  Zeek.rotation.y += 0.01;
  Zeek.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

controls.enableRotate = false;
controls.enablePan = false; 
controls.enableZoom = false;

function animate(){
  requestAnimationFrame(animate);
  Zeek.rotation.y -= 0.0025;
  torus2.rotation.y -= 0.01;
  torus.rotation.x += 0.01;
  planetOne.rotation.y += 0.01;
  controls.update();
  renderer.render(scene,camera);
}

animate();