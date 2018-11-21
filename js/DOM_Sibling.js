function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var DOMTree;

	utility.initRandom(8413);
	DOMTree = new HTMLCreator(4, this.config.stress);

	// generate HTML DOM tree dynamically
	DOMTree.createTree(true, false);

	this.elemCount = 0;
};

Test.prototype.traverseTree1 = function(node) {
	var listChild = node.childNodes;

	for (var i = 0;i < listChild.length;i++) {
		this.traverseTree1(listChild[i]);
	}

	this.elemCount++;
};

Test.prototype.traverseTree2 = function(sibling) {
	while (sibling != null) {
		if (sibling.childNodes.length > 0) {
			this.traverseTree2(sibling.firstChild);
		}
		sibling = sibling.nextSibling;
		this.elemCount++;
	}

	this.elemCount++;
};

Test.prototype.traverseTree3 = function(sibling) {
	while (sibling != null) {
		if (sibling.childNodes.length > 0) {
			this.traverseTree3(sibling.lastChild);
		}
		
		sibling = sibling.previousSibling;
		this.elemCount++;
	}
};

// run the profiling test
Test.prototype.runTest = function() {
	this.traverseTree1(document.body);
	this.traverseTree2(document.body);
	this.traverseTree3(document.body);
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
