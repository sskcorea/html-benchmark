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
	var ar = new Array();

	for (var i=0;i < this.config.stress;i++) {
		if(i%3 == 0){
			ar[i] = i; 
		}else if(i%3 == 1){
			ar.push(i);
		}else if(i%3 == 2){
			ar.unshift(i);
		}
	}

	this.elemCount += this.config.stress;
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};

