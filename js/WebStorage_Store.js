function Test(name, config){
	this.name = name;
	this.elemCount = 0;
	this.config = config;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	
	var ol, i;
	
	// support check
	if(!Modernizr.sessionstorage){
		logger.log('sessionstorage is not supported');
		this.resultType = 'unsupported';
		return false;
	}
	
	
	for(i = 0; i < this.config.stress; i++){
		ol = document.querySelector('ol').cloneNode(true);
		document.body.appendChild(ol);
	}
};

//Test.lazy = function(i, li){
//	setTimeout(function(){
//		window.sessionStorage.setItem(i, li.innerText);
//		li.hidden = true;			
//	}, 100);
//	
//};

// run the profiling test
Test.prototype.runTest = function() {

	var li = document.getElementsByTagName('li');
	for(var i = 0; i < li.length; i++){
//		Test.lazy(i, li[i]);
		window.sessionStorage.setItem(i, li[i].innerText);
	}
	this.elemCount += li.length;
};


// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};

