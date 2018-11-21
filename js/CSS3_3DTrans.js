function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
	this.fps = new FPS();
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var childNode;
	var windowHeight;
	var width;
	var height;
	var divTags;

	utility.initRandom(15153);

	for(var i = 0;i < (this.config.stress);i++) {
		childNode = document.createElement('DIV');
		document.body.appendChild(childNode);
	}

	divTags = document.getElementsByTagName('DIV');
	height = Math.floor((window.innerHeight-30)/ 5);
	width = Math.floor(innerWidth / 5);

	for(var i=0;i < divTags.length;i++) {
		divTags[i].style.height = height + 'px';
		divTags[i].style.width = width + 'px';
		divTags[i].style.position = 'absolute';
		// add 50 not to hide control buttons
		divTags[i].style.top = (utility.random() % (window.innerHeight-height)) + 50 + 'px';
		divTags[i].style.left = utility.random() % (window.innerWidth-width) + 'px';
		divTags[i].style.backgroundColor = utility.getRandomColor();
		divTags[i].style.transitionDuration = (this.config.singleDuration / 1000).toFixed(1) + 's';
	}

	this.elemCount = 0;
	this.distance = height;
};

// run the profiling test
Test.prototype.runTest = function() {
	var divTags;
	var angle;      // rotate angle
	var scale;      // scale
	var transit;    // translation
	var sign;
	var type;
	var axises = ['X', 'Y', 'Z'];
	var axis;

	this.fps.update();
	type = utility.random() % 3;
	divTags = document.getElementsByTagName('DIV');

	for (var i = 0;i < divTags.length;i++) {
		axis = axises[utility.random() % axises.length];

		switch (type) {
		case 0: // rotate
			angle = (utility.random() % 180) + 180;
			divTags[i].style.WebkitTransform = 'rotate' + axis + '(' + angle + 'deg)';
			break;

		case 1: // scale
			scale = (utility.random() % 16) * 0.1;
			divTags[i].style.WebkitTransform = 'scale' + axis + '(' + scale.toFixed(1) + ')';
			break;

		case 2: // translate
			sign = utility.random() % 2;
			if (sign == 1) {
				divTags[i].style.WebkitTransform = 'translate' + axis + '(' + this.distance + 'px)';
			} else {
				divTags[i].style.WebkitTransform = 'translate' + axis + '(-' + this.distance + 'px)';
			}
			break;
		}

		this.elemCount++;
	}
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
	var divTags;
	divTags = document.getElementsByTagName('DIV');

	for (var i = 0;i < divTags.length;i++) {
		divTags[i].style.display = 'none';
	}
};
