function Test(name, config){
	this.name = name;
	this.elemCount = 0;
	
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var DOMTree;

	utility.initRandom(391);
	DOMTree = new HTMLCreator(this.config.maxChild, this.config.stress);

	// generate HTML DOM tree dynamically
	DOMTree.createTree(true, false);
};

// run the profiling test
Test.prototype.runTest = function() {
	var num = 1;
	var elem;

	while(1) {
		elem = $('#id' + num);
		if (elem.length == 0) {
			break;
		}else{
			elem.removeClass();
			elem.addClass('testclass');
		}

		logger.log(num++);
	}

	this.elemCount += num - 1;
};


// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};