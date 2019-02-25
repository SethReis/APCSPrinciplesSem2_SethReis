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
  var array = getJSON();
}

function getJSON() {
  var array = [];
  var compares = 0;
  var swaps = 0;
  var time = new Date();

  $.getJSON("data.json", function(json) {
    for (var i = 0; i < json.workerdata.length; i++){
      array[i] = json.workerdata[i];
    }
    /*mySort
    var frontCount = 0;
    var backCount = array.length-1;
    var now1 = time.getTime();

    for(var i = 0; i < array.length/2; i++){
      for(var j = frontCount; j < backCount; j++){
        compares++;
        if(array[j].balance > array[j+1].balance){
          var temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
          swaps++;
        }
      }
      backCount--;
      for(var k = backCount; k > frontCount; k--){
        compares++;
        if(array[k].balance < array[k-1].balance){
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
        if (array[j].balance > array[j+1].balance){
          var temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
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
        if(array[j].balance < array[index].balance){
          index = j;
        }
      }
      var temp = array[index];
      array[index] = array[i];
      array[i] = temp;
      swaps++;
    }
    var now2 = time.getTime();
    */

    /*insertSort

    */
    var now1 = time.getTime();
    for(var i = 1; i < array.length; i++){
      for(var j = i; j > 0; j--){
        compares++;
        if(array[j].balance < array[j-1].balance){
          var temp = array[j];
          array[j] = array[j-1];
          array[j-1] = temp;
          swaps++;
        }
      }
    }
    var now2 = time.getTime();

    console.log("Time taken to complete: " + (now2 - now1) + " ms");
    console.log("Number of comparisons made: " + compares + " comparisons");
    console.log("Number of swaps made: " + swaps + " swaps");
    console.log(array);
    display(array, 0);
  });
}

function display(array, doListeners){
  //draw axes
  ctx.beginPath();
  ctx.font = "10px Arial";
  ctx.lineWidth = 4;
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.strokeStyle = 'rgb(255, 255, 255)';
  ctx.setLineDash([10, 10]);
  ctx.moveTo(10, canvas.height/2);
  ctx.fillText("Longitude (-)", 10, canvas.height/2-10);
  ctx.lineTo(canvas.width-10, canvas.height/2);
  ctx.fillText("Longitude (+)", canvas.width-85, canvas.height/2-10);
  ctx.stroke();
  ctx.setLineDash([10, 10]);
  ctx.moveTo(canvas.width/2, 10);
  ctx.fillText("Latitude (+)", canvas.width/2+5, 10);
  ctx.lineTo(canvas.width/2, canvas.height-10);
  ctx.fillText("Latitude (-)", canvas.width/2+5, canvas.height-20);
  ctx.stroke();
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.setLineDash([]);
  ctx.lineWidth = 1;
  //draw circles
  for (var m = 0; m < array.length; m++){
    var x = normalize(array[m].longitude, 100, -100)*(canvas.width/2)+canvas.width/4;
    var y = normalize(array[m].latitude, -100, 100)*(canvas.height);
    var rad = normalize(array[m].balance, array[array.length-1].balance, array[0].balance)*50;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fill();
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.stroke();
    if (doListeners === 0){
      addListener(x, y, rad, array[m], array);
    }
  }
  //draw title
  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(187, 40);
  ctx.lineTo(canvas.width-185, 40);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.font = "42px Arial";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Balance of Working Class Individuals Based on Geographical Location", 185, 40);
  ctx.font = "10px Arial";
}

function normalize(val, max, min){
  return (val - min) / (max - min);
}

function addListener(x, y, rad, array, outerArray){
  var x = x;
  var y = y;
  var rad = rad;
  var array = array;
  canvas.addEventListener('mousedown', function(event) {
    if(event.pageX > x - rad && event.pageX < x + rad && event.pageY > y - rad && event.pageY < y + rad){
      ctx.beginPath();
      ctx.rect(x, y, 150, 75);
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fill();
      ctx.strokeStyle = 'rgb(255, 255, 255)';
      ctx.stroke();
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.strokeStyle = 'rgb(0, 0, 0)';
      ctx.fillText("Name: " + array.name, x, y+10);
      ctx.fillText("Longitude: " + array.longitude, x, y+30);
      ctx.fillText("Latitude: " + array.latitude, x, y+50);
      ctx.fillText("Balance: $" + array.balance, x, y+70);
    }
  }, false);
  canvas.addEventListener('mouseup', function(event) {
    if(event.pageX > x - rad && event.pageX < x + rad && event.pageY > y - rad && event.pageY < y + rad){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      display(outerArray, 1);
    }
  }, false);
}
