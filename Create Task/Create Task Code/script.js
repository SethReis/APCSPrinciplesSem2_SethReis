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
  var firstFiveTotals = [];
  var megaTotals = [];
  var tiesTotals = [];
  for (var i = 0; i < 75; i++){
    firstFiveTotals[i] = 0;
  }
  for (var i = 0; i < 52; i++){
    megaTotals[i] = 0;
  }
  for (var i = 0; i < 5; i++){
    tiesTotals[i] = 0;
  }
  var compares = 0;
  var swaps = 0;

  $.getJSON("data.json", function(json) {
    for (var i = 0; i < json.data.length; i++){
      array[i] = json.data[i];
    }
    /*mySort
    var frontCount = 0;
    var backCount = array.length-1;
    console.time("Time Taken To Complete Sorting");

    for(var i = 0; i < array.length/2; i++){
      for(var j = frontCount; j < backCount; j++){
        compares++;
        if(array[j][11] > array[j+1][11] || array[j+1][11] === null){
          var temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
          swaps++;
        }
      }
      backCount--;
      for(var k = backCount; k > frontCount; k--){
        compares++;
        if(array[k][11] < array[k-1][11] || array[k][11] === null){
          var temp = array[k];
          array[k] = array[k-1];
          array[k-1] = temp;
          swaps++;
        }
      }
      frontCount++;
    }
    console.timeEnd("Time Taken To Complete Sorting");
    */

    /*bubbleSort
    console.time("Time Taken To Complete Sorting");
    for (var i = array.length-1; i > 0; i--){
      for(var j = 0; j < i; j++){
        compares++;
        if (array[j][11] > array[j+1][11] || array[j+1][11] === null){
          var temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
          swaps++;
        }
      }
    }
    console.timeEnd("Time Taken To Complete Sorting");
    */

    /*selectionSort
    console.time("Time Taken To Complete Sorting");
    for(var i = 0; i < array.length-1; i++){
      var index = i;
      for(var j = i+1; j < array.length; j++){
        compares++;
        if(array[j][11] < array[index][11] || array[j][11] === null){
          index = j;
        }
      }
      var temp = array[index];
      array[index] = array[i];
      array[i] = temp;
      swaps++;
    }
    console.timeEnd("Time Taken To Complete Sorting");
    */

    /*insertSort

    */
    console.time("Time Taken To Complete Sorting");
    for(var i = 1; i < array.length; i++){
      for(var j = i; j > 0; j--){
        compares++;
        if(array[j][11] < array[j-1][11] || array[j][11] === null){
          var temp = array[j];
          array[j] = array[j-1];
          array[j-1] = temp;
          swaps++;
        }
      }
    }
    console.timeEnd("Time Taken To Complete Sorting");

    //1-75, mega 1-52, final for ties 2-5
    for (var i = 0; i < array.length; i++){
      for(var j = 0; j < 15; j=j+3){
        firstFiveTotals[parseInt(array[i][9].substring(j, j+2))-1]++;
      }
      megaTotals[parseInt(array[i][10])-1]++;
      if (array[i][11] === null){
        tiesTotals[0]++;
      } else {
        tiesTotals[parseInt(array[i][11])-1]++;
      }
    }

    console.log("Number of comparisons made: " + compares + " comparisons");
    console.log("Number of swaps made: " + swaps + " swaps");
    display(firstFiveTotals, megaTotals, tiesTotals, 0);
  });
}

function display(firstFiveArray, megaArray, tiesArray, doListeners){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //draw bargraphs
  for (var m = 0; m < firstFiveArray.length; m++){
    var x = m*10+100;
    var y = firstFiveArray[m];
    ctx.rect(x, canvas.height/2, 5, -y);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fill();
    if (doListeners === 0){
      addListener(x, canvas.height/2, x+5, canvas.height/2-y, firstFiveArray[m], firstFiveArray, megaArray, tiesArray);
    }
  }
  for (var m = 0; m < megaArray.length; m++){
    var x = m*10+200;
    var y = megaArray[m];
    ctx.rect(x, canvas.height/2+300, 5, -y);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fill();
    if (doListeners === 0){
      addListener(x, canvas.height/2+300, x+5, canvas.height/2+300-y, megaArray[m], firstFiveArray, megaArray, tiesArray);
    }
  }
  for (var m = 0; m < tiesArray.length; m++){
    var x = m*10+1200;
    var y = tiesArray[m];
    ctx.rect(x, canvas.height/2+450, 5, -y);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fill();
    if (doListeners === 0){
      addListener(x, canvas.height/2+450, x+5, canvas.height/2+450-y, tiesArray[m], firstFiveArray, megaArray, tiesArray);
    }
  }
}

function normalize(val, max, min){
  return (val - min) / (max - min);
}

function addListener(x, y, otherX, otherY, array, firstFiveArray, megaArray, tiesArray){
  var x = x;
  var y = y;
  var otherX = otherX;
  var otherY = otherY;
  canvas.addEventListener('mousedown', function(event) {
    if(event.pageX > x && event.pageX < otherX && event.pageY < y && event.pageY > otherY){
      ctx.beginPath();
      ctx.rect(event.pageX, event.pageY, 150, 75);
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fill();
      ctx.strokeStyle = 'rgb(255, 255, 255)';
      ctx.stroke();
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.strokeStyle = 'rgb(0, 0, 0)';
    }
  }, false);
  canvas.addEventListener('mouseup', function(event) {
    if(event.pageX > x && event.pageX < otherX && event.pageY < y && event.pageY > otherY){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      display(firstFiveArray, megaArray, tiesArray, 1);
    }
  }, false);
}
