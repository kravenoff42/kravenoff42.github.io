/********intro animation********/
var lines = ['>designer ', '>developer ', '>coder ', '>jon craven'];
var textS = 50;
var textX = 0;
var textY = 0;
var steps = 0;
var list = '';
var txt = lines.join('.');
var opacity = 0;

function fadeIn(){
  push();
    let r = red(colors.text);
    let g = green(colors.text);
    let b = blue(colors.text);
    let a = opacity;
    let c = color(r,g,b,a);
    fill(c);
    translate(width/2,height/2);
    textAlign(CENTER);
    textSize(textS/2);
    textStyle(BOLD);
    textFont('Courier New');
    text("<enter>",0,70);
  pop();
  if(opacity<255 && frameCount%3===0){opacity+=10;}
}
function type(){
  push();
    fill(colors.text);
    translate(width/2,height/2);
    push();
      let last = txt.length-1;
      if(frameCount%12===0){
        if(txt[last]=='_'){
          txt = txt.slice(0,last);
        }else{
          txt += '_';
        }
      }
      textAlign(LEFT, TOP);
      textSize(textS);
      
      textStyle(BOLD);
      textFont('Courier New');
      text(txt.slice(0,steps),textX,textY);
    pop();
  if(txt[steps]=='.'){
      list += txt.slice(0,steps)+'\n';
      steps++;
      txt = txt.slice(steps);
      steps = 0;
    }else if(txt[steps]=='>'){
      steps++;
    }
    push();
      textAlign(LEFT, BOTTOM);
      textSize(textS*0.75);
      textStyle(BOLD);
      textFont('Courier New');
      text(list,textX,textY+20);
    pop();
  if(steps<txt.length && frameCount%7===0){steps++;}
  pop();
}
