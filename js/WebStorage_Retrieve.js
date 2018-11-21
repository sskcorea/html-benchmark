function Test(name, config){
	this.name = name;
	this.elemCount = 0;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	
	// support check
	if(!Modernizr.sessionstorage){
		logger.log('sessionstorage is not supported');
		this.resultType = 'unsupported';
		return false;
	}	
};

// run the profiling test
Test.prototype.runTest = function() {
	
	var p;
	for(var i = 0; i < window.sessionStorage.length; i++){
		p = document.createElement('p');
		p.innerText = i + ') ' + window.sessionStorage[i];
		document.body.appendChild(p);
	}
	this.elemCount += window.sessionStorage.length;
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};

