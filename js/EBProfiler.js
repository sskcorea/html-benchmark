"use strict";

function EBPTests(test) { 
	this.test = test;
	// previous test name
	this.prev = undefined;
	// next test name
	this.next = undefined;
	// test can repeat its execution during this time period
	this.totalDuration = 0;
	// test run only once during this time period
	this.singleDuration = 0;
	this.testStartTime = [];
	this.testEndTime = [];
	// the number of repeatition of a single test
	this.repeatCount = 0;
	// the starting time of the test
	this.startTime = 0;
	this.expectedNextStartTime = 0;
	this.delay = false;
	// the return value of setInterval() function
	this.timeHandler = 0;
	// header div
	this.div = null;
	this.btnPrev = null;
	this.btnRun = null;
	this.btnNext = null;
	this.txtResult = null;

	this.endCallBack;
};

EBPTests.prototype.makeBtns = function(){
	// don't use "div" tag
	this.div = document.createElement('h6');
	var reload = document.createElement('button');

	this.div.align = 'center';
	this.div.id = 'CONTROLBUTTON';

	reload.innerText = 'reload';
	reload.onclick = function(){
		location.reload();
	};

	this.btnPrev = document.createElement('button');
	this.btnPrev.innerText = 'prev';

	this.btnRun = document.createElement('button');
	this.btnRun.innerText = 'run';

	this.btnNext = document.createElement('button');
	this.btnNext.innerText = 'next';

	document.body.insertBefore(this.div, document.body.firstChild);
	document.getElementById('CONTROLBUTTON').appendChild(this.btnPrev);
	document.getElementById('CONTROLBUTTON').appendChild(this.btnRun);
	document.getElementById('CONTROLBUTTON').appendChild(reload);
	document.getElementById('CONTROLBUTTON').appendChild(this.btnNext);
};

// initialize EBPTest object.
// connect prev and next link to the test HTML.
EBPTests.prototype.makeLists = function () {
	var index = 0;
	logger.log("initProfiler()");

	for (index = 0;index < TESTLIST.length;index++) {
		if (TESTLIST[index].name === this.test.name) {
			// name is found in the list
			break;
		}
	}

	if (index === TESTLIST.length) {
		// no element with this 'name'
		return;
	}

	// set next test name
	if (this.next === undefined) {
		if (index+1 === TESTLIST.length) {
			// this is the last profiling test.
			this.next = undefined;
		} else {
			this.next = TESTLIST[index+1].name;
		}
	} else {
		this.next = next;
	}

	// set previous test name
	if (this.prev === undefined) {
		if (index === 0) {
			// this is the first profiling test.
			this.prev = undefined;
		} else {
			this.prev = TESTLIST[index-1].name;
		}
	} else {
		this.prev = prev;
	}

	// set total test time
	this.totalDuration = TESTLIST[index].whole;

	// set single test time
	this.singleDuration = TESTLIST[index].single;

	console.log("prev:"+this.prev+" next:"+this.next);
};

//called when thr 'run' button is clicked
EBPTests.prototype.runProfiler = function(cb) {
	var that = this;
	// call back function
	this.endCallBack = cb;

	if(this.div)
		this.div.style.display = 'none';

	this.repeatCount = 0;

	// get the current time
	this.startTime = utility.getTime();
	// give 50msec gap
	this.expectedNextStartTime = this.startTime + 50;

	logger.log("runProfiler()");
		
	// start test
	this.timeHandler = window.setInterval(function(){
		that.startTest();
	}, this.singleDuration);
	this.startTest();
};

// go to the previous profiling HTML page
EBPTests.prototype.GotoPrev = function() {
	if (this.prev === undefined) {
		alert("this is the first test");
	} else {
		var url = this.prev + ".html";
		window.open(url, "_self");
	}
};

// go to the next profiling HTML page	
EBPTests.prototype.GotoNext = function(integrated) {
	if(integrated){
		var url = this.next + ".html#integrated";
		window.open(url, "_self");
	}else{
		if (this.next === undefined) {
			alert("this is the last test");
		} else {
			var url = this.next + ".html";
			window.open(url, "_self");
		}		
	}
};

// this function is call repeatedly by setInterval() funciton
// until the remained time is too short to run another test.
EBPTests.prototype.startTest = function() {
	var startTime;
	var endTime;
	var singleElapsedTime;
	var totalElapsedTime;

	// set start time
	this.testStartTime[this.repeatCount] = startTime = utility.getTime();

	// run test
	this.test.runTest();

	// set end time
	this.testEndTime[this.repeatCount] = endTime = utility.getTime();

	if (this.repeatCount !== 0 && startTime > this.expectedNextStartTime) {
		// the previous test was running in background after returning from this.test.runTest()

		// reset the test end time
		this.testEndTime[this.repeatCount-1] = startTime;

		// there is delay because of backgroud job
		this.delay = true;
	}

	this.repeatCount++;
	singleElapsedTime = endTime - startTime;
	totalElapsedTime = endTime - this.testStartTime[0];

	if (singleElapsedTime > this.singleDuration) {
		// the test time exceeds its predefined duration(singleDuration)

		// calculated the expected next starting time of the test
		// gives 50msec spare time considering internal operation delays
		this.expectedNextStartTime = endTime + 50;
		
		if (this.totalDuration - totalElapsedTime < singleElapsedTime)
		{
			// remaining time is too short for more test
			window.clearInterval(this.timeHandler);
			this.submitResult();
		}
	}
	else {
		// calculated the expected start time of the next test
		// gives 50msec spare time considering internal operation delays
		this.expectedNextStartTime = startTime + this.singleDuration + 50;
		
		if (this.totalDuration - totalElapsedTime < this.singleDuration)
		{
			// remaining time is too short for more test
			window.clearInterval(this.timeHandler);
			this.submitResult();
		}
	}
};

// After finishing profiling test, sum up the result
EBPTests.prototype.submitResult = function() {
	var i;
	var total = 0;
	var averageDuration = 0;
	var operationsPerSec = 0;
	var start, end;
		
	if(this.div)
		this.div.style.display = 'block';

	this.test.closeTest();

	if (this.delay === true) {
		// if there was a delay, remove the last test result
		this.repeatCount--;
	}

	if(this.test.config.result === 'time'){
	for (i = 0;i < this.repeatCount;i++) {
		total += (this.testEndTime[i] - this.testStartTime[i]);
		logger.log("s:"+this.testStartTime[i]+" e:"+this.testEndTime[i]+" diff:"+(this.testEndTime[i]-this.testStartTime[i]));
	}

		// get the average duration of the profiling test.
		averageDuration = (total / this.repeatCount).toFixed(1);
		operationsPerSec = (this.test.elemCount * 1000 / total).toFixed(1);
		
		if(this.endCallBack === undefined){
			
			this.showResult(this.test.name);
		this.showResult('test count: ' + this.repeatCount);
		this.showResult('average test time: ' + averageDuration + ' ms');
		this.showResult('run per seconds: ' + operationsPerSec + ' run/s');
		
		}else{  // for integrated test
		
			start = utility.millisecondsToTime(this.testStartTime[0]);
			end = utility.millisecondsToTime(this.testEndTime[this.repeatCount > 0 ? this.repeatCount-1:0]);
			
			window.localStorage.setObject(new Date().getTime(), {
				'name': this.test.name,
				'result': this.test.config.result,
				'start': start,
				'time': 'average test time: ' + averageDuration + ' ms',
				'run':'run per seconds: ' + operationsPerSec + ' run/s',
				'end': end,
			});
			this.endCallBack();
			
		}    		
	}else if(this.test.config.result === 'fps'){		
		
		if(this.endCallBack === undefined){
			
			this.showResult(this.test.name);
			this.showResult('average fps: ' + this.test.fps.getAvgFPS());
			
		}else{
			
			window.localStorage.setObject(new Date().getTime(), {
				'name': this.test.name,
				'result': this.test.config.result,
				'fps': 'average fps: ' + this.test.fps.getAvgFPS(),
			});
			this.endCallBack();
			
		}
	}else if(this.test.config.result === 'unsupported'){
		if(this.endCallBack === undefined){
			
			this.showResult(this.test.name);
			this.showResult('unsupported');
		
		}else{
			
			window.localStorage.setObject(this.test.name, {
				'name': this.test.name,
				'result': this.test.config.result,
			});
		this.endCallBack();
			
		}
	}
};

// Display test result to the top of profiling HTML page
EBPTests.prototype.showResult = function(result) {
	var childNode = document.createElement('div');
	var textNode = document.createTextNode(result);
	childNode.appendChild(textNode);

	if(this.txtResult == null){
		this.txtResult = document.createElement('div');
		this.txtResult.className = 'rstContainer';
	}

	this.txtResult.appendChild(childNode);
	this.txtResult.appendChild(document.createElement('br'));

	document.body.insertBefore(this.txtResult, document.body.firstChild);
};
