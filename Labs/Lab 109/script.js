window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d'); // This is the context
  getJSON();
}

function getJSON() {
  var array = [];
  $.getJSON("data.json", function(json) {
    for (var i = 0; i < json.length; i++){
      array[i] = json[i];
    }
  });
}
