class SquareWalker {
  constructor(pos) {
    this.size = 50;
    this.cols = floor(width/this.size);
    this.rows = floor(height/this.size);
    let w = this.cols*this.size;
    let h = this.rows*this.size;
    this.pos = pos || createVector(floor(w/2),floor(h/2));

  }

  show(){
    push();
      fill(colors.prime);
      noStroke();
      rect(this.pos.x,this.pos.y,this.size,this.size);
    pop();
  }

  update(){
    if(frameCount%10==0){
      switch(random(['U','D','L','R'])){
        case 'U':
          this.pos.y -= this.size;
          break;
        case 'D':
          this.pos.y += this.size;
          break;
        case 'L':
          this.pos.x -= this.size;
          break;
        case 'R':
          this.pos.x += this.size;
          break;
      }
      this.edges();
    }
  }
  edges(){
    let w = this.cols*this.size;
    let h = this.rows*this.size;
    if(this.pos.x>w){
      this.pos.x=0;
    }
    if(this.pos.x<0){
      this.pos.x = w;
    }
    if(this.pos.y>h){
      this.pos.y=0;
    }
    if(this.pos.y<0){
      this.pos.y = h;
    }
  }
}
