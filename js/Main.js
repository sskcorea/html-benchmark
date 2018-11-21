window.onload = function() {
	var url = window.location.pathname;
	var testname = url.substring(url.lastIndexOf('/')+1).split('.')[0];
	var hash = window.location.hash;
	var config;
	var integrated = hash.indexOf('integrated') > -1 ? true : false;
	var initialized;
	var h1;

	// local configuration
	config = utility.getConfig(testname);

	// hash configuration (ex, testname#stress=1&single=200)
	if(hash !== "")
		utility.setQueryConfig(hash, config);
		
	var test = new Test(testname, config);
	var ebp = new EBPTests(test);

	// get test lists
	ebp.makeLists();

	// test page init
	initialized = test.initTest();

	// integrated test
	if(integrated){
		// go to the next
		if(initialized === false){
			ebp.GotoNext(integrated);
		// start test with callback function
		}else{
			ebp.runProfiler(function(){ ebp.GotoNext(integrated); });
		}
	}else{
		// run & navigation buttons
		ebp.makeBtns();
		ebp.btnPrev.onclick = function(){ ebp.GotoPrev(); };
		ebp.btnNext.onclick = function(){ ebp.GotoNext(); };		
		
		if(initialized === false){
			h1 = document.createElement('h1');
			h1.textContent = 'unsupported test';
			document.body.appendChild(h1);
		}else{
			ebp.btnRun.onclick = function(){ ebp.runProfiler(); };
		}
	}
};


