// log to console if 'debug' is set to 'true'
var logger = {
    log: function(msg) {
        var url = window.location + "";
        if (url.indexOf("debug=true") != -1) {
            if (typeof(console) != undefined) {
                console.log(msg);
            }
        }
    }	
};

var utility = {
	seedW: 1234,	// random number seed
	seedZ: 5678,	// random number seed

	initRandom: function(seed) {
		if (seed !== undefined) {
			this.seedW = seed;
		} else {
			this.seedW = 1234;
		}

		this.seedZ = 5678;
	},
		
	random: function() {
	    this.seedZ = 36969 * (this.seedZ & 65535) + (this.seedZ >> 16);
	    this.seedW = 18000 * (this.seedW & 65535) + (this.seedW >> 16);
	    var result = ((this.seedZ << 16) + this.seedW) & 0x7fffffff;
	    return result;
	},
	
	randomMinMax: function(min, max){
		if (min == undefined) {
	        return this.random() % max;
	    } else {
	        return (this.random() % (max-min)) + min;
	    }
	},

    getRandomColor: function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[(utility.random() % 16)];
        }
        return color;
    },

    // test function(remove later)
	generate: function() {
		var num;
		var node = document.getElementsByTagName("body");
		var childNode;
		var textNode;

		for(var i=0;i < 2000;i++) {
			num = utility.random();

			childNode = document.createElement("DIV");
			textNode = document.createTextNode(num);
			childNode.appendChild(textNode);

			document.body.appendChild(childNode);	
		}
	},
	
	setQueryConfig: function(q, c){
		var p = q.substring(1).split('&'); // minus '?'
		var pos;
		var n;
		var v;
		
		for(var i=0; i < p.length; i++){
			pos = p[i].indexOf('=');
			if(pos == -1) continue;
			
			n = p[i].substring(0, pos);
			v = p[i].substring(pos+1);
			v = decodeURIComponent(v);
			
			c[n] = Number(v);
		}
	},
	
	getConfig: function(n){
		var r=null;
		TESTLIST.forEach(function(item){
			if(item.name === n){
				r = item;
			}
		});
		
		return r;
	},
	
	xy: function(){
		var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
	    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		return { x: x, y: y};
	},
	
	getTime: function(){
		var d = new Date()
		return d - d.getTimezoneOffset()*60*1000;
//	    return new Date().getTime();
	},
	
	millisecondsToTime: function(milli)	{
	      var milliseconds = milli % 1000;
	      var seconds = Math.floor((milli / 1000) % 60);
	      var minutes = Math.floor((milli / (60 * 1000)) % 60);
	      var hour = Math.floor((milli / (60 * 60 * 1000)) % 24);
	      return hour + ":" + minutes + ":" + seconds + "." + milliseconds;
	},
};

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};
