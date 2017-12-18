console.log("debug: main");

// FPS
var clock;
var deltaTime;

// Scene
var container;
var renderer, scene, camera;
var loader;

init();
animate();

function init()
{
	console.log("debug: init");

	// clock
	clock = new THREE.Clock();

	// container
	container = document.createElement('div');
	document.body.appendChild(container);

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	// scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color('white');

	// camera
	camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 100000);
	camera.position.z =  -5;
	camera.lookAt(scene.position);

	// listeners
	window.addEventListener('resize', onWindowResize, false);

	// loader
	loader = new THREE.ObjectLoader();
	loader.load(
		"models/scene.json", 
		onSceneLoaded
	);
}

function onSceneLoaded(obj)
{
	console.log(obj);
	scene.add(obj);
}

function onWindowResize() 
{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight );
}

function render() 
{
	renderer.render(scene, camera);
}

function animate() 
{
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	render();
}