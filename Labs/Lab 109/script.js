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
    for (var i = 0; i < json.crimes.length; i++){
      array[i] = json.crimes[i];
    }
    /* mySort
    var frontCount = 0;
    var backCount = array.length-1;

    for(var i = 0; i < array.length/2; i++){
      for(var j = frontCount; j < backCount; j++){
        if(array[j].stopandsearch.length > array[j+1].stopandsearch.length){
          var temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
        }
      }
      backCount--;
      for(var k = backCount; k > frontCount; k--){
        if(array[k].stopandsearch.length < array[k-1].stopandsearch.length){
          var temp = array[k];
          array[k] = array[k-1];
          array[k-1] = temp;
        }
      }
      frontCount++;
    }
    */

    /* bubbleSort

    */

    /* selectionSort

    */

    /* insertSort

    */
  });
}
