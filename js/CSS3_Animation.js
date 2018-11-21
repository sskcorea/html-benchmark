function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var childNode;
	var width;
	var height;
	var divTags;

	utility.initRandom(4481);

	for(var i = 0;i < (this.config.stress);i++) {
		childNode = document.createElement('DIV');
		document.body.appendChild(childNode);
	}

	divTags = document.getElementsByTagName('DIV');
	height = Math.floor((window.innerHeight-30)/ 10);
	width = Math.floor(innerWidth / 10);

	for(var i=0;i < divTags.length;i++) {
		divTags[i].style.height = height + 'px';
		divTags[i].style.width = width + 'px';
		divTags[i].style.position = 'absolute';
		// add 50 not to hide control buttons
		divTags[i].style.top = (utility.random() % (window.innerHeight-height)) + 50 + 'px';
		divTags[i].style.left = utility.random() % (window.innerWidth-width) + 'px';
		divTags[i].style.backgroundColor = utility.getRandomColor();
		divTags[i].style.WebkitAnimationDuration = (this.config.single / (utility.random()%50 + 950)).toFixed(1) + 's';
		divTags[i].style.WebkitAnimationIterationCount = Math.floor(this.config.whole / this.config.single);
	}

	this.elemCount = 0;
	this.start = false;
};

// run the profiling test
Test.prototype.runTest = function() {
	var divTags;

	divTags = document.getElementsByTagName('DIV');

	for (var i = 0;i < divTags.length;i++) {
		divTags[i].style.WebkitAnimationName = 'move';
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
