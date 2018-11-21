function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var DOMTree;

	utility.initRandom(391);
	DOMTree = new HTMLCreator(4, this.config.stress);

	// generate HTML DOM tree dynamically
	DOMTree.createTree(true, false);

	this.elemCount = 0;
};

// run the profiling test
Test.prototype.runTest = function() {
	var num = 1;
	var elem;

	while(1) {
		elem = document.getElementById("id" + num);
		if (elem == null) {
			break;
		}

		// set attribute
		elem.setAttribute("test_attr","attr"+num);
		num++; 
	}

	num = 1;
	while(1) {
		elem = document.getElementById("id" + num);
		if (elem == null) {
			break;
		}

		// get attribute
		emp = elem.getAttribute("test_attr");
		elem.removeAttribute("test_attr");
		num++;
	}

	this.elemCount += (num - 1);
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
