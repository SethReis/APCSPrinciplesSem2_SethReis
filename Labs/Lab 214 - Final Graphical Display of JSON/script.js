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
  display(array);
}

function getJSON() {
  var array = [];
  var compares = 0;
  var swaps = 0;
  var time = new Date();

  $.getJSON("data.json", function(json) {
    for (var i = 0; i < json.countrydata.length; i++){
      array[i] = json.countrydata[i];
    }
    /*mySort
    var frontCount = 0;
    var backCount = array.length-1;
    var now1 = time.getTime();

    for(var i = 0; i < array.length/2; i++){
      for(var j = frontCount; j < backCount; j++){
        compares++;
        if(array[j].total > array[j+1].total){
          var temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
          swaps++;
        }
      }
      backCount--;
      for(var k = backCount; k > frontCount; k--){
        compares++;
        if(array[k].total < array[k-1].total){
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
        if (array[j].total > array[j+1].total){
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
        if(array[j].total < array[index].total){
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
        if(array[j].total < array[j-1].total){
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
    display(array);
  });
}

function display(array){
  var females = "Females";
  ctx.beginPath();
  ctx.rect(50, 50, 10, canvas.height-100);
  ctx.rect(50, canvas.height-50, canvas.width-100, 10);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fill();
  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.stroke();
  ctx.fillText("Males", canvas.width/2-20, canvas.height-25);
  for (var i = 0; i < 7; i++){
    ctx.fillText(females.substr(i, 1), 30, (canvas.height/2-30)+8*i);
  }
  for (var m = 0; m < array.length; m++){
    var x = normalize(array[m].males, array[array.length-1].males, array[0].males)*(canvas.width-250)+100;
    var y = normalize(array[m].females, array[0].females, array[array.length-1].females)*(canvas.height-200)+100;
    var rad = normalize(array[m].total, array[array.length-1].total, array[0].total)*50;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fill();
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.stroke();
    addListener(x, y, rad, array[m]);
  }
}

function normalize(val, max, min){
  return (val - min) / (max - min);
}

function addListener(x, y, rad, array){
  var x = x;
  var y = y;
  var rad = rad;
  var array = array;
  canvas.addEventListener('mousedown', function(event) {
    if(event.pageX > x - rad && event.pageX < x + rad && event.pageY > y - rad && event.pageY < y + rad){
      ctx.beginPath();
      ctx.rect(x, y, 100 + array.country.length*5, 75);
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fill();
      ctx.strokeStyle = 'rgb(255, 255, 255)';
      ctx.stroke();
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.strokeStyle = 'rgb(0, 0, 0)';
      ctx.fillText("Country: " + array.country, x, y+10);
      ctx.fillText("Males: " + array.males, x, y+30);
      ctx.fillText("Females: " + array.females, x, y+50);
      ctx.fillText("Total Pop.: " + array.total, x, y+70);
    }
  }, false);
  canvas.addEventListener('mouseup', function(event) {
    if(event.pageX > x - rad && event.pageX < x + rad && event.pageY > y - rad && event.pageY < y + rad){
      ctx.beginPath();
      ctx.clearRect(x-1, y-1, (100 + array.country.length*5)+2, 75+2);
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.strokeStyle = 'rgb(0, 0, 0)';
      ctx.arc(x, y, rad, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }, false);
}
