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
    let yRadius = height*0.35;
    let xRadius = yRadius*2;

    this.angle += 0.01;
    this.pos.x = xRadius * cos(this.angle);
    this.pos.y = yRadius * sin(this.angle);
    this.size = map(this.pos.y,-yRadius, yRadius,30,70);
  }
}
