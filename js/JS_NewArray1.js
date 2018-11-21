function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	this.elemCount = 0;
};

// run the profiling test
Test.prototype.runTest = function() {
	for (var i=0;i < this.config.stress;i++) {
		var a1 = [];
		var a2 = new Array();
		var a3 = new Array(this.config.stress);
	}

	var a4 = new Array();
	for (var i=0;i < this.config.stress;i++) {
		a4[i] = i;
	}

	this.elemCount += (2*this.config.stress);
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
