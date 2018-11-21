FPS = function(){
	this.then=0;
	this.elapsedTime=0;
	this.elemCount=0;
};

FPS.prototype.update = function(){
	var now = (new Date()).getTime();
	if(this.then !==0){		
		this.elapsedTime += now - this.then;
		this.elemCount++;
	}
	
	this.then = now;
};

FPS.prototype.getAvgFPS = function(){
	return Math.floor( Math.min(1000.0 / (this.elapsedTime / this.elemCount), 60) ) ;
};