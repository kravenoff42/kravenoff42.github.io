/********intro animation********/
var lines = ['>designer ', '>developer ', '>coder ', '>jon craven'];
var textS = 40;
var textX = 0;
var textY = 0;
var steps = 0;
var list = '';
var txt = lines.join('.');

function type(){
  push();
    fill(colors.text);
    translate(width/2,height/2);
    push();
      let last = txt.length-1;
      if(frameCount%12==0){
        if(txt[last]=='_'){
          txt = txt.slice(0,last);
        }else{
          txt += '_';
        }
      }
      textAlign(LEFT, TOP);
      textSize(textS);
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
      text(list,textX,textY+20);
    pop();
  if(steps<txt.length && frameCount%9==0){steps++;}
  pop();
}
