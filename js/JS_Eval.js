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
	var cmd = 'for(var i=0;i<' + this.config.stress + ';i++){z = i*i;}';

	eval(cmd);
	this.elemCount += this.config.stress;
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
