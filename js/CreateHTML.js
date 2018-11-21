// HTMLCreater creates HTML DOM tree
function HTMLCreator(maxChild, maxDepth) {
	this.maxChild = maxChild;
	this.maxBodyChild = 0;
	this.maxDepth = maxDepth;
	this.hasID = false;
	this.hasStyle = false;

	this.ID = 1;
	this.newTag = ['TD', 'A', 'P', 'DIV', 'OL', 'LI', 'SPAN', 'TABLE'];
	this.divStyle = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6'];
	this.pStyle = ['style1', 'style2'];
	this.spanStyle = ['style1', 'style2'];
	this.tdStyle = ['style1', 'style2'];
	this.liStyle = ['style1', 'style2'];
} 

// Create DOM tree with the number of 'maxChild' child nodes and 'maxDepth' tree depth.
HTMLCreator.prototype.createTree = function(hasID, hasStyle) {
	var ret = true;

	this.maxBodyChild = document.body.children.length + this.maxChild;

	if (hasID === true) {
		this.hasID = true;
	}

	if (hasStyle === true) {
		this.hasStyle = true;
	}

	while(ret) {
		ret = this.traverseTree(document.body, 1);
	}
};

// Add id attribute to the leaf node
HTMLCreator.prototype.addLeafNodeID = function(node) {
	if (node.children.length != 0) {
		for (var i=0;i < node.children.length;i++) {
			if (node.children[i].tagName == 'SCRIPT' || 
				node.children[i].id == 'CONTROLBUTTON' ||
				node.children[i].nodeType != 1) {
				continue;
			}
				
			this.addLeafNodeID(node.children[i]);
		}
	} else {
		node.id = "id" + this.ID;
		this.ID++;
	}
};

// Traverse DOM tree to find leaf node and add id attribute
HTMLCreator.prototype.findLeaf = function() {
	var num;

	if (depth > this.maxDepth) {
		return false;
	}

	if (node.tagName == 'BODY') {
		if (node.children.length < this.maxBodyChild) {
			this.addChild(node);
			return true;
		}
	// 'A' and 'P' tag does not have child nodes
	} else if (node.tagName != 'A' && node.tagName != 'P') {
		if (node.children.length < this.maxChild) {
			this.addChild(node);
			return true;
		}
	} else {
		return true;
	}

	do {
		num = this.getRandom(node.children.length);
	} while(node.children[num].tagName == 'SCRIPT' || 
			node.children[num].id == 'CONTROLBUTTON' ||
			node.children[num].nodeType != 1);

	return this.traverseTree(node.children[num], depth+1);
};



// Traverse DOM tree to create child nodes
HTMLCreator.prototype.traverseTree = function(node, depth) {
	var num;

	if (depth > this.maxDepth) {
		return false;
	}

	if (node.tagName == 'BODY') {
		if (node.children.length < this.maxBodyChild) {
			this.addChild(node);
			return true;
		}
	// 'A' and 'P' tag does not have child nodes
	} else if (node.tagName != 'A' && node.tagName != 'P') {
		if (node.children.length < this.maxChild) {
			this.addChild(node);
			return true;
		}
	}
	else {
		return true;
	}

	do {
		num = this.getRandom(node.children.length);
	} while(node.children[num].tagName == 'SCRIPT' || 
			node.children[num].id == 'CONTROLBUTTON' ||
			node.children[num].nodeType != 1);

	return this.traverseTree(node.children[num], depth+1);
};

// Add id attribute to the tag
HTMLCreator.prototype.addID = function(node) {
	node.id = "id" + this.ID;
	this.ID++;
};

// Add CSS style to each element
HTMLCreator.prototype.addStyle = function(node, tag) {
	if(tag == "DIV") {
		num = this.getRandom(this.divStyle.length);
		node.className = this.divStyle[num];
	}
	else if (tag == "P") {
		num = this.getRandom(this.pStyle.length);
		node.className = this.pStyle[num];
	}
	else if (tag == "SPAN") {
		num = this.getRandom(this.spanStyle.length);
		node.className = this.spanStyle[num];
	}
	else if (tag == "TD") {
		num = this.getRandom(this.tdStyle.length);
		node.className = this.tdStyle[num];
	}
	else if (tag == "LI") {
		num = this.getRandom(this.liStyle.length);
		node.className = this.liStyle[num];
	}
};

// add child node to the current node element.
HTMLCreator.prototype.addChild = function(node) {
	var num;

	if (node.tagName == 'TABLE') {
		// if the current node is <table>, <td> tag should be allocated.
		newTag = this.newTag[0];
	} else {
		if (node.children.length == 0) {
			// the first child should not be <a> or <p> tag.
			num = this.getRandom(this.newTag.length, 3);
		} else {
			num = this.getRandom(this.newTag.length, 1);
		}   
		newTag = this.newTag[num];
	}

	// decide legth of string
	num = this.getRandom(10, 2);
	var rndString = this.getString(num);
	var childNode = document.createElement(newTag);
	var textnode = document.createTextNode(rndString);

	childNode.appendChild(textnode);

	if (this.hasID === true) {
		this.addID(childNode);
	}

	if (this.hasStyle === true) {
		this.addStyle(childNode, newTag);
	}

	node.appendChild(childNode);
}; 

// Get the random number between min and max
HTMLCreator.prototype.getRandom = function(max, min) {
	if (min == undefined) {
		return utility.random() % max;
	} else {
		return (utility.random() % (max-min)) + min;
	}
};

// Get the random string with the maximum string length 'max'
HTMLCreator.prototype.getString = function(max) {
	var randomString = '';
	var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var num;

	for (var i = 0;i < max;i++) {
		num = this.getRandom(charSet.length);
		randomString += charSet.substring(num, num+1);
	}

	return randomString;
};



