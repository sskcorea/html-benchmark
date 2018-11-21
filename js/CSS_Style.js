function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var DOMTree;

	utility.initRandom(6153);
	DOMTree = new HTMLCreator(4, this.config.stress);

	// generate HTML DOM tree dynamically
	DOMTree.createTree(false, true);

	this.elemCount = 0;
	this.MAXSTYLESHEET = 4;

	for(var i=0;i < this.MAXSTYLESHEET;i++) {
		document.styleSheets[i].disabled = true;
	}
};

// run the profiling test
Test.prototype.runTest = function() {
	var i;

	for(i = 0;i < this.MAXSTYLESHEET;i++) {
		document.styleSheets[i].disabled = true;
	}

	i = utility.random() % this.MAXSTYLESHEET;

	document.styleSheets[i].disabled = false;
	this.elemCount++;
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
