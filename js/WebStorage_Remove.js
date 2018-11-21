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
	
	// sessionStorage
	if(window.sessionStorage){
	}else{
		alert('This browser does NOT support sessionStorage');
	}
	
	// localStorage
	if(window.localStorage){
	}else{
		alert('This browser does NOT support localStorage');
	}
	
	for(i = 0; i < this.config.stress; i++){
		ol = document.querySelector('ol').cloneNode(true);
		document.body.appendChild(ol);
	}
};

// run the profiling test
Test.prototype.runTest = function() {

	var li = document.getElementsByTagName('li');
	for(var i = 0; i < li.length; i++){
		window.sessionStorage.setItem(i, li[i].innerText);
		window.sessionStorage.removeItem(i);
	}
	this.elemCount += li.length;
};


// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};

