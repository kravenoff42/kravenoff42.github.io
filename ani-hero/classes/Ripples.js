class Ripple {
  constructor(index) {
    let x = random(width);
    let y = random(height);
    this.index = index;
    this.pos = createVector(x,y);
    this.radius = 1;
    this.stroke = colors.rand();
  }
  show(){
    push();
      noFill();
      stroke(this.stroke);
      strokeWeight(2);
      ellipse(this.pos.x,this.pos.y,this.radius*2,this.radius*2);
    pop();
  }
  update(){
    let i = renderedObjects.length;
    let time = floor(random(30,60));
    this.radius = (this.radius * 1.025)%width/2;
    if(frameCount%time==0){
      renderedObjects.push(new Ripple(i));
    }
    if(i>20){
      return true;
    }else{
      return false;
    }
    // if(random()<0.005 && i<20){
    //   renderedObjects.push(new Ripple(i));
    // }
  }
}
