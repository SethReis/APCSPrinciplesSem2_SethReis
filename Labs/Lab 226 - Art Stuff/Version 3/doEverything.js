window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var parts = [];
var k = 0;
var maxLine = 10;

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 0px';
  //var color = Math.floor((Math.random()*2)+1);
  //canvas.style.backgroundColor = '';
  canvas.style.backgroundColor = 'rgba(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + 0.1 + ')';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  for (var i = 0; i < 20; i++){
    parts.push(new Part(new JSVector(canvas.width/2, canvas.height/2)));
  }
  mover = new Mover();
  orb = new Orb();
  snake = new Snake();
  animate(); // Call to your animate function
}
// To do::
//  1. Declare and init variables x, y, dx, dy, radius;
function animate(){
  requestAnimationFrame(animate);
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = canvas.style.backgroundColor;
  ctx.fill();
  ctx.strokeStyle = canvas.style.backgroundColor;
  ctx.stroke();
  ctx.closePath();

  k++;
  // Looping through backwards to delete
  for (var i = parts.length-1; i >= 0; i--) {
    if (k === 10){
      parts.push(new Part(new JSVector(canvas.width/2, canvas.height/2)));
      k = 0;
    }
    var part = parts[i];
    part.update();
    part.render();
    if (part.isDead()) {
      //remove the particle
      parts.splice(i, 1);
    }
    var distance = snake.snak.distance(part.position)
    if (distance <= 200){
      var f = JSVector.subGetNew(part.position, mover.loc);
      f.normalize();
      f.mult(.3);
      mover.applyForce(f);
    }
    if (part.position.distance(snake.snak) <= 1000){
      part.makeConnections(snake);
    }
  }
  mover.update();
  mover.render();
  for(var j = 0; j < parts.length; j++){
    var part= parts[j];
    var distance = part.position.distance(snake.snak)
    if (distance <= 200){
      var f = JSVector.subGetNew(part.position, JSVector.addGetNew(mover.loc, orb.loc));
      f.normalize();
      f.mult(.3);
      part.applyForce(f);
    }
  }
  orb.update();
  orb.render();
  snake.update();
  snake.render();
}
