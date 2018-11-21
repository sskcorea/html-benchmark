function Test(name, config){
	this.name = name;
	this.config = config;
	this.ctx;
	this.src = ['chrome.gif', 'firefox.gif', 'ie.gif', 'opera.gif', 'safari.gif'];
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
	if (canvas.getContext) {
		this.ctx = canvas.getContext("2d");
	}
	document.body.appendChild(canvas);
};


// run the profiling test
Test.prototype.runTest = function() {
	var w = utility.xy().x;
	var h = utility.xy().y;
	var img;
	var that = this;
	
	this.fps.update();

	for(var i = 0; i < this.config.stress; i++){
			img = new Image();
		img.src='resource/images/' + this.src[i % 5];
			img.onload = (function(img){
				return function(){
				that.ctx.drawImage(img, utility.randomMinMax(0, w), utility.randomMinMax(0, h));
				};
			})(img);
		}
};


// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};

