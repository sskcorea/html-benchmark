function Test(name, config) {
	this.name = name;
	this.config = config;
	this.circle = [];
	this.fps = new FPS();
};

// initialize the profiling test
Test.prototype.initTest = function() {

	// support check
	if (!Modernizr.svg) {
		logger.log('svg is not supported');
		this.resultType = 'unsupported';
		return false;
	}
	var x = utility.xy().x;
	var y = utility.xy().y;
	var s = document.getElementById('svg');
	s.setAttribute('width', x);
	s.setAttribute('height', y);
	for (var i = 0; i < this.config.stress; i++) {
		this.circle[i] = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.circle[i].setAttributeNS(null, "cx", x * Math.random());
		this.circle[i].setAttributeNS(null, "cy", y * Math.random());
		this.circle[i].setAttributeNS(null, "r", Math.random() * 5);
		
		this.circle[i].setAttributeNS(null, "style", "stroke: none; fill:#ffffff");
		s.appendChild(this.circle[i]);
	}

};

// run the profiling test
Test.prototype.runTest = function() {
	var newX;

	this.fps.update();

	for (var i = 0; i < this.config.stress; i++) {
		newX = Math.random() * 100 + parseInt(this.circle[i].getAttribute("cy"));

		if (newX > utility.xy().y) {
			newX = -50;
		}
		this.circle[i].setAttribute("cy", newX);
	}

};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};