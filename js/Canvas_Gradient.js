function Test(name, config) {
	this.name = name;
	this.config = config;
	this.ctx;
	this.fps = new FPS();
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
	var width = w / 5;
	var height = width; 
	var r = width / 2;
	var x, y;
	var grd;
	
	this.fps.update();
		
	this.ctx.clearRect(0, 0, w, h);
		
		for(var i = 0; i < this.config.stress; i++){
			
			if(i > 0){
				x = i * width % w;
				y = Math.floor(i * width / w) * height;				
			}else{
				x = 0;
				y = 0;
			}
			
			if(i % 2 == 0){
			grd = this.ctx.createRadialGradient(x + r, y + r, 0, x + r, y + r, r);
				grd.addColorStop(0, utility.getRandomColor());
				grd.addColorStop(1, utility.getRandomColor());
			}else{
			grd = this.ctx.createLinearGradient(x, y, x + width, y);
				grd.addColorStop(0, utility.getRandomColor());
				grd.addColorStop(1, utility.getRandomColor());				
			}
		this.ctx.fillStyle = grd;
		this.ctx.fillRect( x, y, width, height);			
	}
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
