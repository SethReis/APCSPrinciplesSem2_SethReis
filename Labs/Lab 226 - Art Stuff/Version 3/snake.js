function Snake(){
  this.rad = 25;
  this.c = 'rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255)  +  ')';
  this.theta = 0;
  this.snak = new JSVector(0, 0);
  // this.segs = [];
  // for (var i = 0; i < 600; i++){
  //   this.segs[i] = new JSVector(0, 0);
  // }
}

Snake.prototype.update = function(){
  this.snak = JSVector.addGetNew(mover.loc, orb.loc);
  // this.segs[0] = JSVector.addGetNew(mover.loc, orb.loc);
  // for (var i = 1; i < this.segs.length; i++){
  //   this.segs[i] = JSVector.subGetNew(this.segs[i], this.segs[i-1]);
  //   this.segs[i].setMag(2*(this.rad-(this.rad-1)));
  //   this.segs[i].add(this.segs[i-1]);
  // }
}

Snake.prototype.render = function(){
  // ctx.beginPath();
  // ctx.arc(this.snak.x,this.snak.y,this.rad,0,2*Math.PI);
  // ctx.fillStyle = this.c;
  // ctx.fill();
  // ctx.strokeStyle = this.c;
  // ctx.stroke();
  // for (var i = 0; i < this.segs.length; i++){
  //   ctx.beginPath();
  //   ctx.arc(this.segs[i].x,this.segs[i].y,this.rad-(0.04*i),0,2*Math.PI);
  //   ctx.fillStyle = this.c;
  //   ctx.fill();
  //   ctx.strokeStyle = this.c;
  //   ctx.stroke();
  // }
}
