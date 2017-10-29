class OrbitCircle{

  constructor(pos){
    this.pos = pos || createVector(width/2,height/4);
    this.size = 50;
    this.angle = 0;
  }

  show(){
    push();
      noFill();
      stroke(colors.prime);
      strokeWeight(3);
      translate(width/2,height/2);
      ellipse(this.pos.x,this.pos.y,this.size,this.size);
    pop();
  }
  update(){
    let radius = height*0.25;
    this.angle += 0.01;
    this.pos.x = radius * cos(this.angle);
    this.pos.y = radius * sin(this.angle);
  }
}
