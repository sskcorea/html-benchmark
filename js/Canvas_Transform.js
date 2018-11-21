function Test(name, config){
	this.name = name;
	this.config = config;
	this.ctx;
	this.fps=new FPS();
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
	var x, y;
	var temp;
	
	this.fps.update();
	

		for(var i = 0; i < this.config.stress; i++){
			temp = i % 3;
		this.ctx.save();

			x = utility.randomMinMax(0, w);
			y = utility.randomMinMax(0, h);

		this.ctx.fillStyle = utility.getRandomColor();
			if(temp == 0){
			this.ctx.rotate(utility.randomMinMax(180, 360) * Math.PI/180);	
			}else if(temp == 1){
			this.ctx.scale(utility.randomMinMax(5, 20)/10, utility.randomMinMax(5, 20)/10);
			}else{
			this.ctx.translate(100, 100);
			}
			
		this.ctx.fillRect(x, y, 100, 100);
			
		this.ctx.restore();
	}
};


// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};

