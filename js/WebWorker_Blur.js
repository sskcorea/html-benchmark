var ctx;
var cnt = 0;

function Test(name, config){
	this.name = name;
	this.elemCount = 0;
	this.config = config;
	this.resultType = 'time'; // type: time or fps
	
	this.img;
	this.ws = [];
};

Test.prototype.load = function(url){
	var c = document.createElement('canvas');
	ctx = c.getContext('2d');
	var img = new Image();
	
	img.src = url;
	img.onload = function(){
		c.width = img.width;
		c.height = img.height;
		ctx.drawImage(img, 0, 0);
		
		window.imgdata = ctx.getImageData(0, 0, img.width, img.height);
	};
	
	document.getElementById('imgContainer').appendChild(c);
	
	this.img = img;
};

// initialize the profiling test
Test.prototype.initTest = function() {
	
	// support check
	if(!Modernizr.webworkers){
		logger.log('webworkers is not supported');
		this.resultType = 'unsupported';
		return false;
	}
	
	this.load(this.config.url);
};

Test.prototype.blurTask = function(worker, i, w, h){
	var x = i * w;
	var y = 0;
	var d = ctx.getImageData(x, y, w, h).data;
	
	worker.postMessage({
		'type': 'blur',
		'd': d,
		'w': w,
		'h': h,
		'x': x,
	});
	cnt++;
};

Test.prototype.messageHandler = function(e){
	var t = e.data.type;
	
	switch(t){
	case('process'):
		var d = ctx.createImageData(e.data.w, e.data.h);
		for(var i=0; i < d.data.length; i++){
			var b = e.data.d[i];
			if(b == null || b > 255 || b < 0){
				return;
			}
			
			d.data[i] = b;
		}
		
		ctx.putImageData(d, e.data.x, 0);
		
		Test.prototype.blurTask(e.target, e.target.index, e.target.width, e.target.height);
		break;
	default:
		break;
	}
};


// run the profiling test
Test.prototype.runTest = function() {
	if(!this.img.complete)
		return;
	
	var width = this.img.width / this.config.stress;
	
	if(this.ws.length > 0){
		for(var j = 0; j < this.ws.length; j++){
			this.ws[j].terminate();
		}
	}
	
	for(var i=0; i < this.config.stress; i++){
		var w = new Worker('js/BlurWorker.js');
		w.addEventListener('message', this.messageHandler, true);
		w.index = i;
		w.width = width;
		w.height = this.img.height;
		this.ws[i] = w;
		
		this.blurTask(w, i, width, this.img.height);
	}
};

// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
	for(var i = 0; i < this.ws.length; i++){
		this.ws[i].terminate();	
	}
	this.elemCount = cnt;
};

