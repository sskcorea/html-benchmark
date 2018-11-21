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
	var td = $('td'), 
		a = $('a'), 
		p = $('p'), 
		div = $('div:not(#BUTTON)'), 
		ol = $('ol'), 
		li = $('li'), 
		span = $('span'), 
		table = $('table');
		
	td.attr('testattr', 'test'); td.removeAttr('testattr');
	a.attr('testattr', 'test'); a.removeAttr('testattr');
	p.attr('testattr', 'test'); p.removeAttr('testattr');
	div.attr('testattr', 'test'); div.removeAttr('testattr');
	ol.attr('testattr', 'test'); ol.removeAttr('testattr');
	li.attr('testattr', 'test'); li.removeAttr('testattr');
	span.attr('testattr', 'test'); span.removeAttr('testattr');
	table.attr('testattr', 'test'); table.removeAttr('testattr');

	this.elemCount += 16;
};


// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};