function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var DOMTree;

	utility.initRandom(1713);
	DOMTree = new HTMLCreator(4, this.config.stress);

	// generate HTML DOM tree dynamically
	DOMTree.createTree(true, false);

	this.elemCount = 0;
};

// run the profiling test
Test.prototype.runTest = function() {
	var num = 1;
	var element;
	var childNode;
	var textNode;

	while(1) {
		element = document.getElementById("id" + num);
		if (element == null) {
			break;
		}

		childNode = document.createElement("DIV");
		textNode = document.createTextNode("test");
		childNode.appendChild(textNode);
		
		element.appendChild(childNode);
		num++;
	}

	this.elemCount += (num - 1);
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
