function Ripple(){
  let x = random(width);
  let y = random(height);
  this.pos = createVector(x,y);
  this.radius = random(1,3);
  this.stroke = colors.rand();
  this.time = floor(random(20,40));
  this.opacity = 255;
}
Ripple.prototype.show = function(){
  push();
    noFill();
    let r = red(this.stroke);
    let g = green(this.stroke);
    let b = blue(this.stroke);
    let a = this.opacity;
    let c = color(r,g,b,a);
    stroke(c);
    strokeWeight(2);
    ellipse(this.pos.x,this.pos.y,this.radius*2,this.radius*2);
  pop();
}
Ripple.prototype.update = function(){
  this.radius = this.radius * 1.05;
  if(this.radius>width*0.15 && this.opacity>0){
    this.opacity = this.opacity - 15;
  }
  if(frameCount%30===0){ return "new";};
  if(this.radius>width*0.5){
    return true;
  }else{
    return false;
  }
}
Ripple.prototype.newObj = function(){
  	renderedObjects.push(new Ripple(renderedObjects.length));
}