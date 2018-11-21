function Test(name, config){
	this.name = name;
	this.elemCount = 0;
	this.config = config;
	
	this.a = [];
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var s;
	
	// support check
	if(!(Modernizr.audio && Modernizr.audio.ogg)){
		logger.log('ogg is not supported');
		this.resultType = 'unsupported';
		return false;
	}
	
	for(var i = 0; i < this.config.stress; i++){
		this.a[i] = document.createElement('audio');
		this.a[i].textContent = 'not supported';
		this.a[i].controls = true;
		this.a[i].volume = 0;
		
		s = document.createElement('source');
		s.src = 'resource/multimedia/Epoq-Lepidoptera.ogg';
		s.type = 'audio/ogg';
		
		this.a[i].appendChild(s);
		document.body.appendChild(this.a[i]);
	}
};

// run the profiling test
Test.prototype.runTest = function() {

	for(var i = 0; i < this.a.length; i++){
		if(this.a[i].paused)
			this.a[i].play();
		else
			this.a[i].pause();
	}
	this.elemCount += this.a.length;
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
	for(var i = 0; i < this.a.length; i++){
		this.a[i].pause();
	}
};

