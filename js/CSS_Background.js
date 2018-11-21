function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var DOMTree;

	utility.initRandom(8449);
	DOMTree = new HTMLCreator(4, this.config.stress);

	// generate HTML DOM tree dynamically
	DOMTree.createTree(false, true);

	this.elemCount = 0;
	//config.MAXSTYLESHEET = 4;

	for(var i=0;i < this.config.MAXSTYLESHEET;i++) {
		document.styleSheets[i].disabled = true;
	}

	var i = utility.random() % this.config.MAXSTYLESHEET;
	document.styleSheets[i].disabled = false;
};

// run the profiling test
Test.prototype.runTest = function() {
	var styleList;
	var styleName = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6'];

	for(var i = 0;i < styleName.length;i++) {
		styleList = document.getElementsByClassName(styleName[i]);

		for(var j = 0;j < styleList.length;j++) {
			styleList[j].style.background = utility.getRandomColor();
			this.elemCount++;
		}
	}
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
