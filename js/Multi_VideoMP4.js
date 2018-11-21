function Test(name, config){
	this.name = name;
	this.elemCount = 0;
	this.config;
	this.config = config;
	
	this.v = [];
};

// initialize the profiling test
Test.prototype.initTest = function() {
	var s;
	
	// support check
	if(!(Modernizr.video && Modernizr.video.h264)){
		logger.log('h264 is not supported');
		this.resultType = 'unsupported';
		return false;
	}
	
	for(var i = 0; i < this.config.stress; i++){
		this.v[i] = document.createElement('video');
		this.v[i].width = 320;
		this.v[i].height = 240;
		this.v[i].volume = 0.1;
		
		s = document.createElement('source');
		s.src = 'resource/multimedia/The_philosophy_of_hacking_h264-hq.mp4';
		s.type = 'video/mp4';
		
		this.v[i].appendChild(s);
		document.body.appendChild(this.v[i]);
	}
};

// run the profiling test
Test.prototype.runTest = function() {
//	document.body.bgColor = '#000000';
	for(var i = 0; i < this.v.length; i++){
		if(this.v[i].paused)
			this.v[i].play();
		else
			this.v[i].pause();
		
	}
	this.elemCount += this.v.length;
};


// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
	for(var i = 0; i < this.v.length; i++){
		this.v[i].pause();
	}
};

