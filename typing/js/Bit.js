function BitCell(x,y,n){
  this.pos = createVector(x*W,y*H);
  this.index = createVector(x,y);
  this.offset = createVector(x,y,0)
  if(n){
    this.alive = noise(this.offset.x/10,this.offset.y/10,this.offset.z);
  }

  this.neighbors=0;

  this.findNeighbors = function(){
    var total = 0;

    for(var xoff = -1; xoff<=1; xoff++){
      for(var yoff = -1; yoff<=1; yoff++){
        var x = this.index.x+xoff;
        var y = this.index.y+yoff;
        if(x>-1 && x<cols && y >-1 && y < rows){
          if(xoff==0 && yoff==0){
            total += 0;
          }else{
            var neighbor = grid[x][y].alive;
            if (neighbor == "1" ){
              total++;
            }
          }
        }
      }
    }
    this.neighbors = total;
  }

  this.show = function(){
    push();
    var num = floor(map(this.alive,0.1,0.8,0,256)).toString(16);
    var f = map(this.alive,0.1,0.8,0,361);
    colorMode(HSB)
    fill(f,180,180);
    textSize(20);
    textFont('monospace');
    textAlign(RIGHT,TOP);
    text(num,this.pos.x,this.pos.y);
    pop();
  }

  this.update = function(){
    this.offset.z +=0.01;
    this.alive = noise(this.offset.x/10,this.offset.y/10,this.offset.z);
    // switch(this.neighbors){
    //   case 2:
    //     if(this.alive == "1"){
    //       this.alive = "1";
    //     }
    //     break;
    //   case 3:
    //     this.alive = "1";
    //     break;
    //   default:
    //     this.alive = "0";
    //     break;
    //
    // }
  }
}
/*
Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
