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

	utility.initRandom(5417);

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
	this.height = height;
	this.width = width;
};

// run the profiling test
Test.prototype.runTest = function() {
	var num;
	var divTags;
	// rotate angle
	var angle;
	// scale
	var xScale, yScale;
	// skew angle
	var xAngle, yAngle;
	// translation
	var xTransit, yTransit;
	// plus(1) or minus(0)
	var sign;
	var type;

	this.fps.update();
	type = utility.random() % 4;
	divTags = document.getElementsByTagName('DIV');

	for (var i = 0;i < divTags.length;i++) {
		switch (type) {
		case 0: // rotate
			angle = (utility.random() % 180) + 180;
			divTags[i].style.WebkitTransform = 'rotate(' + angle + 'deg)';
			break;

		case 1: // scale
			xScale = (utility.random() % 16) * 0.1;
			yScale = (utility.random() % 16) * 0.1;
			divTags[i].style.WebkitTransform = 'scale(' + xScale.toFixed(1) + ', ' + yScale.toFixed(1) + ')';
			break;

		case 2: // skew
			xAngle = utility.random() % 100;
			yAngle = utility.random() % 100;
			divTags[i].style.WebkitTransform = 'skew(' + xAngle + 'deg, ' + yAngle + 'deg)';
			break;

		case 3: // translate
			sign = utility.random() % 2;
			if (sign == 1) {
				divTags[i].style.WebkitTransform = 'translate(' + this.width + 'px, ' + this.height + 'px)';
			} else {
				divTags[i].style.WebkitTransform = 'translate(-' + this.width + 'px, -' + this.height + 'px)';
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
