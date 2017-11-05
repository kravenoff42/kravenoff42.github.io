function ShapeZoom(layers,sym,spin,rotation){
  this.corners = floor(random(3,13));
  this.radius = 1;
  this.shapeAngle = random(TWO_PI);
  this.sym = sym || 1; //random([3,4,6,8]);
  this.orbitRadius = 0;
  this.orbitAngle = random(TWO_PI);;
  this.spin = spin || map(random(),0,1,-0.02,0.02);
  this.rotation = rotation || map(random(),0,1,-0.008,0.008);
  this.stroke = colors.rand();
  this.strokeWeight = floor(random(5));
}
ShapeZoom.prototype.show = function(){
  push();
    translate(width/2,height/2);
    noFill();
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    for(let j = 1;j<=this.sym+1;j++){
      let orbAngle = this.orbitAngle + map(j, 1, this.sym+1, 0, TWO_PI);
      let posX = this.orbitRadius * cos(orbAngle);
      let posY = this.orbitRadius * sin(orbAngle);
      this.drawShape(posX,posY,orbAngle);
    }
  pop();
}
ShapeZoom.prototype.update = function(){
  this.orbitAngle = (this.orbitAngle + this.rotation)%TWO_PI;
  this.shapeAngle = (this.shapeAngle + this.spin)%TWO_PI;
  this.radius = (this.radius * 1.05)%(width/2);
  this.orbitRadius = (this.orbitRadius *1.1)%(width/2);
}

ShapeZoom.prototype.drawShape = function(x,y,orbAngle){
  push();
    translate(x,y);

    beginShape();
    for(let i = 0;i<this.corners;i++){
      let angle = orbAngle + this.shapeAngle + map(i, 0, this.corners, 0, TWO_PI);
      let x = this.radius * cos(angle);
      let y = this.radius * sin(angle);
      vertex(x,y);
    }
    endShape(CLOSE);
  pop();
}
ShapeZoom.prototype.newObj = function(){
  	renderedObjects.push(new ShapeZoom(renderedObjects.length));
}
