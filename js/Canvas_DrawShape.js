function Test(name, config){
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
	var temp;
	
	this.fps.update();
	
	var rect = function(c){
		c.fillRect(
				utility.randomMinMax(0, w), 
				utility.randomMinMax(0, h), 
				utility.randomMinMax(10, w / 4),
				utility.randomMinMax(10, h / 4)
		);		
	};
	var circle = function(c){
		var r = utility.random() % w/2;
		c.beginPath();
		c.strokeStyle = utility.getRandomColor();
		c.arc(w / 2, h / 2, r, 0, 2 * Math.PI, false);
		c.stroke();
	};
	
	var line = function(c){
		var x = utility.randomMinMax(0, w);
		var y = utility.randomMinMax(0, h);
		c.beginPath();
		c.moveTo(x, y);
		c.lineTo(y, x);
		c.stroke();
	};
	
	this.ctx.clearRect(0, 0, w, h);	
	for(var i = 0; i < this.config.stress; i++){
			temp = i % 3;
		this.ctx.fillStyle = utility.getRandomColor();
			if(temp == 0){
			rect(this.ctx);	
			}else if(temp ==1){
			circle(this.ctx);	
			}else{
			line(this.ctx);
		}
	}
};


// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};

