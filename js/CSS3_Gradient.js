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
	var stressLevel;
	var width;
	var height;
	var divTags;

	utility.initRandom(7647);
	stressLevel = this.config.stress;

	childNode = document.createElement('BR');
	document.body.appendChild(childNode);
	for(var i = 0;i < (stressLevel);i++) {
		childNode = document.createElement('DIV');
		document.body.appendChild(childNode);
	}

	divTags = document.getElementsByTagName('DIV');
	height = Math.floor((window.innerHeight-30)/ 10);
	width = 10;

	for(var i=0;i < divTags.length;i++) {
		divTags[i].style.height = height + 'px';
		divTags[i].style.width = width.toFixed(2) + '%';
		divTags[i].style.float = 'right';
		//divTags[i].style.background = 'radial-gradient(to right, red, yellow)';
		divTags[i].style.background = '-webkit-radial-gradient(to right, red, yellow)';
	}

	this.elemCount = 0;
};

// run the profiling test
Test.prototype.runTest = function() {
	var num;
	var divTags;
	var numColors = [2, 3, 4, 5];
	//var gradients = ['linear-gradient', 'radial-gradient'];
	//var gradients = ['-webkit-radial-gradient', '-webkit-radial-gradient'];
	var aligns = ['to right', 'to left', 'to top', 'to bottom'];
	var styleString;

	this.fps.update();
	divTags = document.getElementsByTagName('DIV');

	for (var i = 0;i < divTags.length;i++) {
		num = numColors[utility.random()%numColors.length];
		
		if (utility.random()%2 == 0) {
			styleString = '-webkit-radial-gradient(' + aligns[utility.random()%aligns.length] + ', ';
		} else {
			styleString = '-webkit-radial-gradient(';
		}

		styleString = styleString + utility.getRandomColor();
		for (var j = 1;j < num;j++) {
			styleString = styleString + ', ' + utility.getRandomColor();
		}

		styleString += ')';
		divTags[i].style.background = styleString;
			
		this.elemCount++;
	}
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
