onmessage = function(e){
  var r = e.data;
    
  var s = r + "] worker!";
  postMessage(s);
};