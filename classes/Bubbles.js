function Bubble(){
  this.size = random(50,100);
//   let d = this.radius*2;
  let x = random(width);
  let y = random(height+this.size,height+this.size*2);
  this.pos = createVector(x,y);
  this.stroke = colors.rand();
  this.opacity = 255;
  this.scatter = 0;
}
Bubble.prototype.show = function(){
  push();
    noFill();
    let r = red(this.stroke);
    let g = green(this.stroke);
    let b = blue(this.stroke);
    let a = this.opacity;
    let c = color(r,g,b,a);
    stroke(c);
    strokeWeight(2);
    ellipse(this.pos.x,this.pos.y,this.size,this.size);
  pop();
}
Bubble.prototype.update = function(){
//   let d = this.radius*2;
  this.pos.y = this.pos.y - 2;
  this.scatter += 0.0001;
  let xoff = map(noise(this.pos.y/100,this.scatter),0,1,-2,2);
  this.pos.x += xoff;
  if(this.pos.y < this.size && this.opacity>0){
    this.opacity = this.opacity - 15;
  }
  if(frameCount%30===0){ 
     return "new";
  }
  if(this.pos.y< -this.size){
    return true;
  }else{
    return false;
  }
}
Bubble.prototype.newObj = function(){
  renderedObjects.push(new Bubble(renderedObjects.length));
}