function Test(name, config){
	this.name = name;
	this.config = config;
	this.fps = new FPS();
	this.ctx;
};

// initialize the profiling test
Test.prototype.initTest = function() {	
	var canvas;
	
	if(!Modernizr.canvas){
		this.config.result = 'unsupported';
		return false;
	}
	
	canvas = document.createElement('canvas');
	canvas.width = utility.xy().x;
	canvas.height = utility.xy().y;
	document.body.appendChild(canvas);
	
	if (canvas.getContext) {
		this.ctx = canvas.getContext("2d");
	}
};


// run the profiling test
Test.prototype.runTest = function() {
	var w = utility.xy().x;
	var h = utility.xy().y;
	
	this.fps.update();
	this.ctx.clearRect(0, 0, w, h);
	
		for(var i = 0; i < this.config.stress; i++){
		this.ctx.fillStyle = utility.getRandomColor();
		this.ctx.shadowBlur = utility.randomMinMax(1, 50);
		this.ctx.shadowOffsetX = utility.randomMinMax(1, 20);
		this.ctx.shadowOffsety = utility.randomMinMax(1, 20);		
		this.ctx.shadowColor = utility.getRandomColor();
		this.ctx.fillRect(
					utility.randomMinMax(0, w), 
					utility.randomMinMax(0, h), 
					utility.randomMinMax(10, w / 4),
					utility.randomMinMax(10, h / 4)
			);			
		}
};


// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};

