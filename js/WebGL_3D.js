function Test(name, config) {
	this.name = name;
	this.elemCount = 0;
	this.config = config;

	this.renderer;
	this.fps = new FPS();
	this.camera;
	this.scene;
	this.sphere=[];
};

// initialize the profiling test
Test.prototype.initTest = function() {

	// support check
	if(!Modernizr.webgl){
		this.config.result = 'unsupported';
		return false;
	}

	// renderer
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);

	// camera
	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	this.camera.position.z = 300;

	// scene
	this.scene = new THREE.Scene();

	for (var i = 0; i < this.config.stress; i++) {
		this.sphere[i] = new THREE.Mesh(new THREE.SphereGeometry(15, 100, 100),
				new THREE.MeshNormalMaterial());
		this.sphere[i].position.set(
				utility.randomMinMax(0, 300) - 150, 
				utility.randomMinMax(0, 200) - 100, 
				utility.randomMinMax(0, 40) - 20);
		this.sphere[i].overdraw = true;

		this.scene.add(this.sphere[i]);
		this.renderer.render(this.scene, this.camera);
	}
};

// run the profiling test
Test.prototype.runTest = function() {
	
	this.fps.update();

	for (var i = 0; i < this.config.stress; i++) {		
		this.sphere[i].position.set(
				utility.randomMinMax(0, 300) - 150, 
				utility.randomMinMax(0, 200) - 100, 
				utility.randomMinMax(0, 40) - 20);
		
		this.renderer.render(this.scene, this.camera);
	}
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
	
};
