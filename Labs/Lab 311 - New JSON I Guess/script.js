window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight*13;
  ctx = canvas.getContext('2d'); // This is the context
  var array = getJSON();
}

function getJSON() {
  var array = [];
  var moviesArray = [];
  var compares = 0;
  var swaps = 0;
  var placement = 0;
  var time = new Date();

  for (var i = 0; i < 119; i++){
    moviesArray[i] = new Array;
  }

  $.getJSON("movies.json", function(json) {
    for (var i = 0; i < json.movies.length; i++){
      array[i] = json.movies[i];
    }
    /*mySort
    var frontCount = 0;
    var backCount = array.length-1;
    console.time("Time Taken To Complete Sorting");

    for(var i = 0; i < array.length/2; i++){
      for(var j = frontCount; j < backCount; j++){
        compares++;
        if(array[j].year > array[j+1].year){
          var temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
          swaps++;
        }
      }
      backCount--;
      for(var k = backCount; k > frontCount; k--){
        compares++;
        if(array[k].year < array[k-1].year){
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
        if (array[j].year > array[j+1].year){
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
        if(array[j].year < array[index].year){
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
        if(array[j].year < array[j-1].year){
          var temp = array[j];
          array[j] = array[j-1];
          array[j-1] = temp;
          swaps++;
        }
      }
    }
    console.timeEnd("Time Taken To Complete Sorting");

    for(var k = 0; k < 118; k++){
      while(array[placement].year < 1901+k){
        moviesArray[k].push(array[placement]);
        placement++;
      }
    }
    for(var k = placement; k < array.length; k++){
      moviesArray[118].push(array[k]);
    }

    console.log("Number of comparisons made: " + compares + " comparisons");
    console.log("Number of swaps made: " + swaps + " swaps");
    console.log(moviesArray);
    display(moviesArray, 0);
  });
}

function display(array, doListeners){
  //draw boxes
  for(var i = 0; i < 120/4; i++){
    for(var j = 0; j < 4; j++){
      ctx.beginPath();
      ctx.rect(40+400*j, 40+400*i, 400, 400);
      ctx.strokeStyle = 'rgb(0, 0, 0)';
      ctx.stroke();
    }
  }

  //draw title
  ctx.font = "36px Arial";
  ctx.fillText("Genre Distribution Of", 55, 80);
  ctx.fillText("American Movies Over", 55, 140);
  ctx.fillText("The Past Century+", 55, 200);
  ctx.font = "10px Arial";

  // //draw key
  // ctx.font = "36px Arial";
  // ctx.fillText("Genre Distribution Of", 55, 180);
  // ctx.fillText("American Movies Over", 55, 240);
  // ctx.fillText("The Past Century+", 55, 300);
  // ctx.font = "10px Arial";

  //draw box titles
  var theYear = 1900;
  ctx.font = "36px Arial";
  ctx.fillText(theYear, 590, 80);
  theYear++;
  ctx.fillText(theYear, 990, 80);
  theYear++;
  ctx.fillText(theYear, 1390, 80);
  theYear++;
  for(var i = 0; i < 116/4; i++){
    for(var j = 0; j < 4; j++){
      ctx.fillText(theYear, ((40+400*j)+((40+400*(j+1))))/2-50, 480+400*i);
      theYear++;
    }
  }
  ctx.font = "10px Arial";

  // //draw bar graphs
  // for (var m = 0; m < array.length; m++){
  //   var x = normalize(array[m].longitude, 100, -100)*(canvas.width/2)+canvas.width/4;
  //   var y = normalize(array[m].latitude, -100, 100)*(canvas.height);
  //   var rad = normalize(array[m].balance, array[array.length-1].balance, array[0].balance)*50;
  //   ctx.beginPath();
  //   ctx.arc(x, y, rad, 0, 2 * Math.PI);
  //   ctx.fillStyle = 'rgb(0, 0, 0)';
  //   ctx.fill();
  //   ctx.strokeStyle = 'rgb(0, 0, 0)';
  //   ctx.stroke();
  //   if (doListeners === 0){
  //     addListener(x, y, rad, array[m], array);
  //   }
  // }
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
