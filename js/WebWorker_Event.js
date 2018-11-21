function Test(name, config){
	this.name = name;
	this.elemCount = 0;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	
	// support check
	if(!Modernizr.webworkers){
		logger.log('webworkers is not supported');
		this.resultType = 'unsupported';
		return false;
	}
};

Test.lazy = function(w){
	setTimeout(function(){
		w.terminate();	
	}, 10);
};

// run the profiling test
Test.prototype.runTest = function() {

	var w;
	for(var i = 0; i < this.config.stress * 1; i++){
		w = new Worker("js/Worker.js");
		w.onmessage = function(e){
			var p = document.createElement('p');
			p.innerText = e.data;
			document.body.appendChild(p);
		};
		w.postMessage(i);
		Test.lazy(w);
	}
	this.elemCount += this.config.stress * 1;
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};

