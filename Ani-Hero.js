var divHero;
var canvas;
var divInput;
var renderedObjects = [];
var objMax = 1;
var colors;
var charRef, charW, charH, totalW, charRatio;
var script;
//lines, textS, textX, textY, steps, list, txt, opacity are decalred in Typing.js

function setup() {
  if(windowWidth<textS){
    textS = windowWidth;
  }
  if(windowWidth<windowHeight){
    textS/2
  }
  let anchor = document.getElementById("link");
  anchor.addEventListener("touchstart", ()=>{window.location.href = anchor.href});



  charRef = select("#charRef");
  charRatio = charRef.width / charRef.height;
  charW = textS * charRatio;
  charH = textS;
  totalW = ((lines[lines.length-1].length)+1)*charW;
  textX = -(totalW/2);

  colors = {
    back: color(222, 252, 253),
    prime: color(29, 196, 202),
    dark: color(6, 41, 42),
    second: color(246, 29, 127),
    third: color(4, 255, 58),
    trim: color(14, 149, 143),
    text: color(0, 0, 0),
    rand: function(){
    switch(random(['prime','dark','trim'])){
      case 'prime':
        return this.prime;
      case 'dark':
        return this.dark;
      case 'trim':
        return this.trim;
      case 'text':
        return this.text;
      }
    }
  };
  divHero = select('#ani-hero');
  divInput = select('#input');
  canvas = createCanvas(windowWidth, windowHeight);
  divHero.html = "";
  canvas.parent(divHero);
//   canvas.mouseClicked(redirect);

  switch(animation){
    case 'SquareWalker':
      objMax = floor(random(3,6));
      for(let i = 0; i<objMax;i++){
        renderedObjects.push(new SquareWalker());
      }
      break;
    case 'OrbitCircle':
      objMax = 8;
      for(let i = 1; i<=objMax;i++){
        renderedObjects.push(new OrbitCircle(QUARTER_PI*i));
      }
      break;
    case 'Collidiscope':
      objMax = floor(random(3,6));
      for(let i = 0; i<objMax;i++){
        renderedObjects.push(new Collidiscope());
      }
      break;
    case 'ShapeZoom':
      objMax = 3;
      for(let i = 0; i<objMax;i++){
        renderedObjects.push(new ShapeZoom());
      }
      break;
    case 'Ripples':
      console.log('Ripples');
      objMax = floor(random(5,8));
      renderedObjects.push(new Ripple());
      break;
    case 'Bubbles':
      console.log('Bubbles');
      objMax = 30;
      renderedObjects.push(new Bubble());
      break;
  }
  background(colors.back);
}

// function redirect(){
//   window.location.href = 'https://www.joncraven.com/portfolio';
// }

function draw() {
  background(colors.back);
  for(let i = renderedObjects.length-1; i>=0 ;i--){
    renderedObjects[i].show();
  }
  for(let i = renderedObjects.length-1; i>=0 ;i--){
    renderedObjects[i].show();
    let stail = renderedObjects[i].update();
    if (stail===true){
      renderedObjects.splice(i, 1);
    }else if(stail=="new" && renderedObjects.length < objMax){
      renderedObjects[i].newObj();
      break;
    }
  }
  type();
  if(steps==12){
  fadeIn();
  }
}
