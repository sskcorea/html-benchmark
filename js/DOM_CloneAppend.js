function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
	this.nodeCount;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var num = 1;
	var element;
	var DOMTree;

	utility.initRandom(2311);
	DOMTree = new HTMLCreator(4, this.config.stress);

	// generate HTML DOM tree dynamically
	DOMTree.createTree(true, false);

	do {
		element = document.getElementById("id" + num);
		num++;
	} while(element != null);

	this.elemCount = 0;
	this.nodeCount = num - 2;
};

// run the profiling test
Test.prototype.runTest = function() {
	var clone;
	var node;

	for (var i = 1,j = this.nodeCount;i < this.nodeCount/2;i++, j--)
	{
		try {
			clone = document.getElementById("id"+j).cloneNode(true);
		} catch(error) {
			alert(error.message);
		}
		
		node = document.getElementById("id" + i);
		if (node == null) {
			break;
		}

		node.appendChild(clone);
		this.elemCount++;
	}
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
