function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var DOMTree;

	utility.initRandom(2423);
	DOMTree = new HTMLCreator(4, this.config.stress);

	// generate HTML DOM tree dynamically
	DOMTree.createTree(false, false);

	this.elemCount = 0;
};

// run the profiling test
Test.prototype.runTest = function() {
	var num = 1;
	var elem;
	var tag = ['TD', 'A', 'P', 'DIV', 'OL', 'LI', 'SPAN', 'TABLE'];    

	for (var i=0;i < tag.length;i++) {
		elem = document.getElementsByTagName(tag[i]);
		if (elem == null) {
			break;;
		}

		for (var j=0;j < elem.length;j++) {
			elem[j].setAttribute("test_attr","attr"+num);
			num++; 
		}
	}

	for (var i=0;i < tag.length;i++) {
		elem = document.getElementsByTagName(tag[i]);
		if (elem == null) {
			break;;
		}

		for (var j=0;j < elem.length;j++) {
			elem[j].getAttribute("test_attr");
			elem[j].removeAttribute("test_attr");
		}
	}

	this.elemCount += (num - 1);
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
