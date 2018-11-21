function inRange(i, w, h){
	return ((i >= 0) && (i < w * h * 4));
};

function avgNeighbors(d, w, h, i){
	var v = d[i];
	
	// cardinal directions
	var north = inRange(i - w * 4, w, h) ? d[i - w * 4] :v;
	var south = inRange(i + w * 4, w, h) ? d[i + w * 4] :v;
	var west = inRange(i - 4, w, h) ? d[i - 4] :v;
	var east = inRange(i + 4, w, h) ? d[i + 4] :v;
	
	// diagonal directions
	var ne = inRange(i - w * 4 + 4, w, h) ? d[i - w * 4 + 4] :v;
	var nw = inRange(i - w * 4 - 4, w, h) ? d[i - w * 4 - 4] :v;
	var se = inRange(i + w * 4 + 4, w, h) ? d[i + w * 4 + 4] :v;
	var sw = inRange(i + w * 4 - 4, w, h) ? d[i + w * 4 - 4] :v;
	
	// average
	var newVal = Math.floor((north + south + west + east + ne + nw + se + sw) / 9);
	
//	if(isNaN(newVal)){
//		throw new Error('NaN');
//	}
	return newVal;
};

function boxBlur(d, w, h){
	var data = [];
	var val = 0;
	for(var i=0; i < w * h *4; i++){
		val = avgNeighbors(d, w, h, i);
		data[i] = val;
	}
	
	return data;
};