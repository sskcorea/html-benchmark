function SortLocalStorage() {
	if (localStorage.length > 0) {
		var localStorageArray = new Array();
		for (var i = 0; i < localStorage.length; i++) {
			localStorageArray[i] = localStorage.key(i);
		}
	}
	var sortedArray = localStorageArray.sort(function(a,b){return a-b;});
	return sortedArray;
}

window.onload = function() {
	var p;
	var d;
	var o;

	var data = {
		labels : [],
		datasets : [ {
			label : "time",
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,0.8)",
			highlightFill : "rgba(151,187,205,0.75)",
			highlightStroke : "rgba(151,187,205,1)",
			data : []
		}, ]
	};

	var data2 = {
		labels : [],
		datasets : [ {
			label : "run per secs",
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,0.8)",
			highlightFill : "rgba(151,187,205,0.75)",
			highlightStroke : "rgba(151,187,205,1)",
			data : []
		}, ]
	};

	var data3 = {
		labels : [],
		datasets : [ {
			label : "average fps",
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,0.8)",
			highlightFill : "rgba(151,187,205,0.75)",
			highlightStroke : "rgba(151,187,205,1)",
			data : []
		}, ]
	};
	var options = {
		// Boolean - Whether the scale should start at zero, or an order of
		// magnitude down from the lowest value
		scaleBeginAtZero : true,

		// Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,

		// String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.05)",

		// Number - Width of the grid lines
		scaleGridLineWidth : 1,

		// Boolean - If there is a stroke on each bar
		barShowStroke : true,

		// Number - Pixel width of the bar stroke
		barStrokeWidth : 2,

		// Number - Spacing between each of the X value sets
		barValueSpacing : 5,

		// Number - Spacing between data sets within X values
		barDatasetSpacing : 1,

		// String - A legend template
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	};
	var girdData1 = [];
	var girdData3 = [];
	var ti = 0;
	var fi = 0;
	var keys = SortLocalStorage();
	var value = 0;
	for (var i = 0; i < keys.length; i++) {
		o = window.localStorage.getObject(keys[i]);

		p = document.createElement('a');
		p.className = 'rstContainer2';
		p.href = o.name + '.html';

		// chart data
		switch (o.result) {
		case 'time': {
			// average execution time
			data.labels[ti] = o.name;
			
			value = o.time.match(/[^\D]\d*\.?\d*/)[0]; 
			if (value !== null){
				data.datasets[0].data[ti] = value;
				girdData1[ti] = [keys[i], '<a href="' + o.name + '.html">' + o.name + '</a>', value, o.start, o.end, o.run];
			}

			// run per sec
			data2.labels[ti] = o.name;
			if (o.run.match(/[^\D]\d*\.?\d*/) !== null)
				data2.datasets[0].data[ti] = o.run.match(/[^\D]\d*\.?\d*/)[0];
			ti++;
			break;
		}
		case 'fps': {
			// average execution time
			data3.labels[fi] = o.name;
			
			value = o.fps.match(/[^\D]\d*\.?\d*/)[0];
			if (value !== null){
				data3.datasets[0].data[fi] = value;
				girdData3[fi] = [keys[i], '<a href="' + o.name + '.html">' + o.name + '</a>', value];
			}
			
			fi++;
			break;
		}
		}

		// each results
		/*for ( var v in o) {
			// 'result' is only for the type checking
			if (v !== 'result') {
				d = document.createElement('div');
				d.appendChild(document.createTextNode(o[v]));
				d.appendChild(document.createElement('br'));
				p.appendChild(d);
			}
		}
		document.body.appendChild(p);
		document.body.appendChild(document.createElement('br'));*/
	}

	// chart!
	var ct1 = document.getElementById("chart1");
	ct1.setAttribute('width', utility.xy().x - 10);
	ct1.style.marginLeft = '10px';
	var ctx1 = ct1.getContext("2d");
	new Chart(ctx1).Bar(data, options);

	if (data.datasets[0].data.length === 0) {
		document.getElementsByTagName('h1')[0].style.display = 'none';
		ct1.style.display = 'none';
	}else{
		$('#gridTime').DataTable({
			paging: false,
			searching: false,
			ordering: true,
			info: false,
			"data": girdData1,
			"columns": [
				{ "title": "id", "visible": false },
				{ "title": "Name" },
				{ "title": "Avg Time" },
				{ "title": "Start Time" },
				{ "title": "End Time" },
				{ "title": "Remarks" },
			]
		} );
	}

	var ct2 = document.getElementById("chart2");
	ct2.setAttribute('width', utility.xy().x - 10);
	ct2.style.marginLeft = '10px';
	var ctx2 = ct2.getContext("2d");
	new Chart(ctx2).Bar(data2, options);

	// temporarily closed
	// if(data2.datasets[0].data.length === 0){
	document.getElementsByTagName('h1')[1].style.display = 'none';
	ct2.style.display = 'none';
	// }

	var ct3 = document.getElementById("chart3");
	ct3.setAttribute('width', utility.xy().x - 10);
	ct3.style.marginLeft = '10px';
	var ctx3 = ct3.getContext("2d");
	new Chart(ctx3).Bar(data3, options);

	if (data3.datasets[0].data.length === 0) {
		document.getElementsByTagName('h1')[2].style.display = 'none';
		ct3.style.display = 'none';
	}else{
		$('#gridFPS').DataTable({
			paging: false,
			searching: false,
			ordering: true,
			info: false,
			"data": girdData3,
			"columns": [
				{ "title": "id", "visible": false },
				{ "title": "Name" },
				{ "title": "FPS" },
			]
		} );
	}
};