'use strict';

let scene,
    camera,
    renderer,
    controls;

let particles,
    donut;

let width = window.innerWidth,
    height = window.innerHeight;

const colors = [0xf43192, 0xF3F3F3, 0x18c1ee];

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.lookAt(scene.position);
  camera.position.z = 500;

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0xe5e5e5);
  renderer.shadowMap.enabled = true;
  
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  
  const ambientLight = new THREE.AmbientLight();
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight();
  light.position.set(200, 100, 200);
  light.castShadow = true;
  light.shadow.camera.left = -100;
  light.shadow.camera.right = 100;
  light.shadow.camera.top = 100;
  light.shadow.camera.bottom = -100;
  scene.add(light);
  
  drawParticles();
  drawDonut();
  var loader = new THREE.FontLoader();

  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
    var geometry = new THREE.TextGeometry( 'Hello three.js!', {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelSegments: 5
    } );
  } );
  document.getElementById('world').appendChild(renderer.domElement);

  window.addEventListener('resize', onResize);
}

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  particles.rotation.x += 0.0001;
  particles.rotation.y -= 0.0001;
  donut.rotation.y += 0.001;
  renderer.render(scene, camera);
}

function drawParticles() {
  particles = new THREE.Group();
  scene.add(particles);
  const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
  
    const material = new THREE.MeshPhongMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      shading: THREE.FlatShading
    });
    
  
  for (let i = 0; i < 200; i ++) {
    const material = new THREE.MeshPhongMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      shading: THREE.FlatShading
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((Math.random() - 0.5) * 750,
                      (Math.random() - 0.5) * 750,
                      (Math.random() - 0.5) * 750);
    mesh.rotation.set((Math.random() - 0.5) * 200,
                      (Math.random() - 0.5) * 500,
                      (Math.random() - 0.5) * 500);
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    particles.add(mesh);
  }
}

function drawDonut() {
  donut = new THREE.Group();
  donut.rotation.set(0.4, 0.3, 0);
  scene.add(donut);
  
  const donutBaseGeometry = new THREE.TorusGeometry(120, 60, 8, 30);
  const donutBaseMeterial = new THREE.MeshStandardMaterial({
    color: 0xc1b7a0, //91e7ff
    shading: THREE.FlatShading
  });
  const donutBase = new THREE.Mesh(donutBaseGeometry, donutBaseMeterial);
  donutBase.position.set(0, 40, 0)
  donutBase.rotateX(80);
  donutBase.castShadow = true;
  donutBase.receiveShadow = true;
  donut.add(donutBase);
  
  
  const icingGeometry = new THREE.TorusGeometry(116, 60, 30, 18);
  const icingMeterial = new THREE.MeshStandardMaterial({
    color: 0x6549C0,
    shading: THREE.FlatShading
  });
  const icing = new THREE.Mesh(icingGeometry, icingMeterial);
  icing.position.set(0, 51, 0)
  icing.rotateX(80);
  icing.castShadow = true;
  icing.receiveShadow = true;
  donut.add(icing);
  
}