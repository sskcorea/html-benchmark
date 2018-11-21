function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
    this.fps = new FPS();
};

function BGImage(width, height) {
	this.width = width;
	this.height = height;
	this.xAxis = 1;
	this.yAxis = 1;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var childNode;
	var windowHeight;

	utility.initRandom(541);

	this.elements = [];

	for(var i = 0;i < this.config.stress;i++) {
		childNode = document.createElement('DIV');
		document.body.appendChild(childNode);
	}

	divTags = document.getElementsByTagName('DIV');
	windowHeight = Math.floor((window.innerHeight-30) / 10);

	for(var i=0;i < divTags.length;i++) {
		var width = utility.random() % 100 + 1;
		var height = utility.random() % 100 + 1;
		this.elements[i] = new BGImage(width, height);
		this.elements[i].node = divTags[i];
		this.elements[i].background = 'url("resource/images/background' + (i+1) + '.jpg")';
															
		divTags[i].style.background = this.elements[i].background;
		divTags[i].style.backgroundRepeat = 'repeat';
		divTags[i].style.height = windowHeight + 'px';
	}

	this.elemCount = 0;
};

// run the profiling test
Test.prototype.runTest = function() {
	var node;

	this.fps.update();
	for(var i = 0;i < this.elements.length;i++) {

		// increase or decrease depending on the xAxis value
		if (this.elements[i].xAxis === 1) {
			this.elements[i].width += 2;
		} else {
			this.elements[i].width -= 2;
		}

		// increase or decrease depending on the yAxis value
		if (this.elements[i].yAxis === 1) {
			this.elements[i].height += 2;
		} else {
			this.elements[i].height -= 2;
		}

		// limit the max/min width
		if (this.elements[i].width > 100) {
			this.elements[i].width = 100;
			this.elements[i].xAxis = -1;
		} else if (this.elements[i].width < 10) {
			this.elements[i].width = 10;
			this.elements[i].xAxis = 1;
		}

		// limit the max/min height
		if (this.elements[i].height > 100) {
			this.elements[i].height = 100;
			this.elements[i].yAxis = -1;
		} else if (this.elements[i].height < 10) {
			this.elements[i].height = 10;
			this.elements[i].yAxis = 1;
		}

		node = this.elements[i].node;
		node.style.backgroundSize = this.elements[i].width + '% ' + this.elements[i].height + '%';

		this.elemCount++;
	}
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
