function Test(name, config){
	this.name = name;
	this.config = config;
	this.fps = new FPS();
};

Test.makeC = function(x, y) {
  var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
  var s = document.getElementById('svg');
  
  c.setAttributeNS(null,"fill",utility.getRandomColor());
  c.setAttributeNS(null,"stroke","black");
  c.setAttributeNS(null,"cx",x);
  c.setAttributeNS(null,"cy",y);
  c.setAttributeNS(null,"r", Math.random() * 100);
  s.setAttribute('width', utility.xy().x);
  s.setAttribute('height', utility.xy().y);
  s.appendChild(c);
};

// initialize the profiling test
Test.prototype.initTest = function() {
	
    // support check
	if(!Modernizr.svg){
		logger.log('svg is not supported');
		this.resultType = 'unsupported';
		return false;
	}
	
	var x = utility.xy().x;
	var y = utility.xy().y;
    for(var i = 0; i < this.config.stress; i++){
    	Test.makeC(Math.random() * x , Math.random() * y);
    }
};

// run the profiling test
Test.prototype.runTest = function() {
	var c = document.getElementsByTagName('circle');
	
	this.fps.update();
	
	for(var i=0; i < c.length; i++){
		c[i].setAttribute('r', Math.random() * 100);
	}
};


// Finish the profiling test and report the result
Test.prototype.closeTest = function() {
};
