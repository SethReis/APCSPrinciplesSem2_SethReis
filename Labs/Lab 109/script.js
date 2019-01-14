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
  var compares = 0;
  var swaps = 0;
  var time = new Date();

  $.getJSON("data.json", function(json) {
    for (var i = 0; i < json.crimes.length; i++){
      array[i] = json.crimes[i];
    }
    /*mySort
    var frontCount = 0;
    var backCount = array.length-1;
    var now1 = time.getTime();

    for(var i = 0; i < array.length/2; i++){
      for(var j = frontCount; j < backCount; j++){
        compares++;
        if(array[j].stopandsearch.length > array[j+1].stopandsearch.length){
          var temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
          swaps++;
        }
      }
      backCount--;
      for(var k = backCount; k > frontCount; k--){
        compares++;
        if(array[k].stopandsearch.length < array[k-1].stopandsearch.length){
          var temp = array[k];
          array[k] = array[k-1];
          array[k-1] = temp;
          swaps++;
        }
      }
      frontCount++;
    }
    var now2 = time.getTime();
    */

    /*bubbleSort
    var now1 = time.getTime();
    for (var i = array.length-1; i > 0; i--){
      for(var j = 0; j < i; j++){
        compares++;
        if (array[j].stopandsearch.length > array[j+1].stopandsearch.length){
          var temp = array[j].stopandsearch.length;
          array[j].stopandsearch.length = array[j+1].stopandsearch.length;
          array[j+1].stopandsearch.length = temp;
          swaps++;
        }
      }
    }
    var now2 = time.getTime();
    */

    /*selectionSort
    var now1 = time.getTime();
    for(var i = 0; i < array.length-1; i++){
      var index = i;
      for(var j = i+1; j < array.length; j++){
        compares++;
        if(array[j].stopandsearch.length < array[index].stopandsearch.length){
          index = j;
        }
      }
      var temp = array[index].stopandsearch.length;
      array[index].stopandsearch.length = array[i].stopandsearch.length;
      array[i].stopandsearch.length = temp;
      swaps++;
    }
    var now2 = time.getTime();
    */

    /*insertSort
    var now1 = time.getTime();
    for(var i = 1; i < array.length; i++){
      for(var j = i; j > 0; j--){
        compares++;
        if(array[j].stopandsearch.length < array[j-1].stopandsearch.length){
          var temp = array[j].stopandsearch.length;
          array[j].stopandsearch.length = array[j-1].stopandsearch.length;
          array[j-1].stopandsearch.length = temp;
          swaps++;
        }
      }
    }
    var now2 = time.getTime();
    */

    console.log("Time taken to complete: " + (now2 - now1) + " ms");
    console.log("Number of comparisons made: " + compares + " comparisons");
    console.log("Number of swaps made: " + swaps + " swaps");
    console.log(array);
  });
}
