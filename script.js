// Runway simulator

const far_field = 80000;
const runway_length = 4000;
const runway_width = 100;
const runway_color = 0x888888;
const grass_color = 0x006000;
const sky_color = 0x87CEEB;
const sun_color = 0xFFFFFF;

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  2,
  100000
);

// Add renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a box for runway
const geometry = new THREE.BoxGeometry(runway_length, runway_width, 1);
const material = new THREE.MeshBasicMaterial({ color: runway_color });
const rectangle = new THREE.Mesh(geometry, material);
rectangle.position.x = runway_length / 2.0;
rectangle.position.z = 0.5;
scene.add(rectangle);

// Add ground
const groundGeometry = new THREE.PlaneGeometry(far_field, far_field);
const groundMaterial = new THREE.MeshStandardMaterial({ color: grass_color });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh);

// Add sky dome
const skyDomeRadius = far_field / 2.0;
const skyDomeGeometry = new THREE.SphereGeometry(skyDomeRadius, 32, 32);
const skyDomeMaterial = new THREE.MeshBasicMaterial({
  color: sky_color,
  side: THREE.BackSide, // Render the inside of the sky dome
});
const skyDomeMesh = new THREE.Mesh(skyDomeGeometry, skyDomeMaterial);
scene.add(skyDomeMesh);

// Add light source
const directionalLight = new THREE.DirectionalLight(sun_color, 1);
directionalLight.position.set(0, 0, far_field);
scene.add(directionalLight);

// Set the default camera position and rotation
camera.rotation.order = "ZYX";
camera.position.x = -1500;
camera.position.y = 0;
camera.position.z = 75;
camera.rotation.z = -Math.PI / 2.0;
camera.rotation.y = 0;
camera.rotation.x = Math.PI / 2.0;

// Event listeners
const fovInput = document.getElementById("fov");
const xPositionSlider = document.getElementById("xPosition");
const yPositionSlider = document.getElementById("yPosition");
const zPositionSlider = document.getElementById("zPosition");
const xRotationSlider = document.getElementById("xRotation");
const yRotationSlider = document.getElementById("yRotation");
const zRotationSlider = document.getElementById("zRotation");

fovInput.addEventListener("change", function () {
  camera.fov = parseInt(this.value);
  camera.updateProjectionMatrix(); 
});

xPositionSlider.addEventListener("input", function () {
  camera.position.x = -parseFloat(this.value);
  document.getElementById("xPositionValue").textContent = this.value + " m";
});

yPositionSlider.addEventListener("input", function () {
  camera.position.y = -parseFloat(this.value);
  document.getElementById("yPositionValue").textContent = this.value + " m";;
});

zPositionSlider.addEventListener("input", function () {
  camera.position.z = parseFloat(this.value);
  document.getElementById("zPositionValue").textContent = this.value + " m";;
});

xRotationSlider.addEventListener("input", function () {
  camera.rotation.y = (parseInt(this.value) * Math.PI) / 180;
  document.getElementById("xRotationValue").textContent = this.value + " deg";
});

yRotationSlider.addEventListener("input", function () {
  camera.rotation.x = (parseInt(this.value) + 90 ) * Math.PI / 180;
  document.getElementById("yRotationValue").textContent = this.value  + " deg";
});

zRotationSlider.addEventListener("input", function () {
  camera.rotation.z = (-parseInt(this.value) - 90) * Math.PI / 180;
  document.getElementById("zRotationValue").textContent = this.value + " deg";
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

