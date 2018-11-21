function Test(name, config){
	this.name = name;
	this.elemCount;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	this.elemCount = 0;
};

function TestFunc(n) {
	var a = (utility.random() % 100) + 1;
	var b = (utility.random() % 100) + 1;

	return n * a / b;
};

// run the profiling test
Test.prototype.runTest = function() {
	for (var i=0;i < this.config.stress;i++) {
		TestFunc(i);
	}

	this.elemCount += this.config.stress;
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
