function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
	this.nodeCount;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var num = 1;
	var DOMTree;

	utility.initRandom(7171);
	DOMTree = new HTMLCreator(4, this.config.stress);

	// generate HTML DOM tree dynamically
	DOMTree.createTree(true, false);

	do {
		element = document.getElementById("id" + num);
		num++;
	} while(element != null);

	this.nodeCount = num - 2;
	this.elemCount = 0;
	this.REPLACECOUNT = 10;
};

// run the profiling test
Test.prototype.runTest = function() {
	var nodeA, numA;
	var nodeB, numB;
	var childNode;
	var textNode;

	// add <DIV> tags to the leaf nodes
	for(var i = 0;i < this.REPLACECOUNT;i++) {
		do {
			numA = (utility.random() % this.nodeCount) + 1;

			nodeA = document.getElementById("id" + numA);
			if (nodeA == null) {
				alert("getElementById error : can not find id" + numA);
				return;
			}
		} while (nodeA.children.length == 0);

		do {
			numB = (utility.random() % this.nodeCount) + 1;

			nodeB = document.getElementById("id" + numB);
			if (nodeB == null) {
				alert("getElementById error : can not find id" + numB);
				return;
			}
		} while (nodeA == nodeB);

		//console.log("# of child : "+nodeA.children.length+" 1st: "+nodeA.children[0]+" ---"+nodeA.children[0]);
		nodeA.replaceChild(nodeB, nodeA.childNodes[0]);

		childNode = document.createElement("DIV");
		textNode = document.createTextNode("test");
		childNode.appendChild(textNode);

		nodeA.insertBefore(childNode, nodeA.childNodes[0]);
		this.elemCount++;
	}
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
