function Part(position){
  this.acceleration = new JSVector(0, 0);
  this.velocity = new JSVector(Math.random()*10-5, Math.random()*10-5);
  this.position = position.copy();
  this.lifespan = 1000.0;
  this.rad = Math.random()*15+10;
  this.star = 'rgba(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',';
}

Part.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.velocity.limit(3);
  this.lifespan -= 2;
  if(this.position.x + this.rad >= canvas.width || this.position.x - this.rad <= 0){
    this.position.x = canvas.width-this.position.x;
  }
  if(this.position.y + this.rad >= canvas.height || this.position.y - this.rad <= 0){
    this.position.y= canvas.height-this.position.y;
  }
}

Part.prototype.render = function(){
  // ctx.beginPath();
  // ctx.ellipse(this.position.x, this.position.y, this.rad, this.rad, 0, 0, 2*Math.PI);
  // this.c = this.star + this.lifespan/1000.0 + ')';
  // ctx.fillStyle = this.c;
  // ctx.fill();
  // ctx.strokeStyle = this.c;
  // ctx.stroke();
}

Part.prototype.makeConnections = function(otherBall){
  for (var r = 0; r < maxLine; r++){
    ctx.beginPath();
    ctx.moveTo((this.position.x)+(this.rad*Math.cos(Math.PI/2+r*(Math.PI/(maxLine/2)))),
               (this.position.y)+(this.rad*Math.sin(Math.PI/2+r*(Math.PI/(maxLine/2)))));
    ctx.arcTo((this.position.x)+(this.rad*Math.cos(Math.PI/2+r*(Math.PI/(maxLine/2)))),
              (this.position.y)+(this.rad*Math.sin(Math.PI/2+r*(Math.PI/(maxLine/2)))),
              (otherBall.position.x)+(otherBall.rad*Math.cos(Math.PI+Math.PI/2+r*(Math.PI/(maxLine/2)))),
              (otherBall.position.y)+(otherBall.rad*Math.sin(Math.PI+Math.PI/2+r*(Math.PI/(maxLine/2)))),
              100);
    //ctx.strokeStyle = 'rgba(0, 0, 0, 255)';
    ctx.strokeStyle = this.star + this.lifespan/1000.0 + ')';
    ctx.stroke();
  }
}

Part.prototype.isDead = function(){
  if (this.lifespan < 0.0) {
    return true;
  } else {
    return false;
  }
}

Part.prototype.applyForce = function(f){
  this.acceleration.add(f);
}
