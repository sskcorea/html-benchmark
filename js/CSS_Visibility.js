function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var DOMTree;

	utility.initRandom(15272);
	DOMTree = new HTMLCreator(4, this.config.stress);

	// generate HTML DOM tree dynamically
	DOMTree.createTree(false, true);

	this.elemCount = 0;
	this.MAXSTYLESHEET = 4;

	for(var i=0;i < this.MAXSTYLESHEET;i++) {
		document.styleSheets[i].disabled = true;
	}

	var i = utility.random() % this.MAXSTYLESHEET;
	document.styleSheets[i].disabled = false;
}


// run the profiling test
Test.prototype.runTest = function() {
	var styleList;
	var styleName = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6'];
	var visibilityOption = ['hidden', 'collapse', 'visible', 'initial', 'inherit'];
	var option;

	for(var i = 0;i < styleName.length;i++) {
		styleList = document.getElementsByClassName(styleName[i]);
		option = visibilityOption[utility.random() % 5];

		for(var j = 0;j < styleList.length;j++) {
			styleList[j].style.visibility = option;
			this.elemCount++;
		}
	}
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
