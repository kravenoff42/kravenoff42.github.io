function Collidiscope(layers,sym,spin,rotation) {
  this.corners = floor(random(3,13));
  this.radius = random(5,width/4);
  this.shapeAngle = random(TWO_PI);
  this.sym = sym || random([3,4,6,8]);
  this.orbitRadius = random(width/3);
  this.orbitAngle = random(TWO_PI);;
  this.spin = spin || map(random(),0,1,-0.02,0.02);
  this.rotation = rotation || map(random(),0,1,-0.008,0.008);
  this.stroke = colors.rand();
  this.strokeWeight = floor(random(5));
  this.fill = colors.rand();
}

Collidiscope.prototype.show = function(){
  push();
    translate(width/2,height/2);
    if(this.radius<30){
      fill(this.fill);
    }else{
      noFill();
    }
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
Collidiscope.prototype.update = function(){
  this.orbitAngle = (this.orbitAngle + this.rotation)%TWO_PI;
  this.shapeAngle = (this.shapeAngle + this.spin)%TWO_PI;
}

Collidiscope.prototype.drawShape = function(x,y,orbAngle){
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
Collidiscope.prototype.newObj = function(){
  	renderedObjects.push(new Collidiscope(renderedObjects.length));
}
