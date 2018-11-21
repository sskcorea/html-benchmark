importScripts('blur.js');

function messageHanlder(e){
	var t = e.data.type;
	
	switch(t){
	case('blur'):
		var d = e.data.d;
		d = boxBlur(d, e.data.w, e.data.h, e.data.x);
		
		postMessage({
			'type': 'process',
			'd': d,
			'w': e.data.w,
			'h': e.data.h,
			'x': e.data.x
		});
		break;
	default:
		break;
	}
};

addEventListener('message', messageHanlder, true);