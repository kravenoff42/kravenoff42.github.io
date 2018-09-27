var divHero;
var canvas;
var divInput;
var renderedObjects = [];
var objMax = 1;
var colors;
var charRef, charW, charH, totalW, charRatio;
//lines, textS, textX, textY, steps, list, txt, opacity are decalred in Typing.js

function setup() {
  if(windowWidth<textS){
    textS = windowWidth;
  }
  if(windowWidth<windowHeight){
    textS/2
  }

  charRef = select("#charRef");
  charRatio = charRef.width / charRef.height;
  charW = textS * charRatio;
  charH = textS;
  totalW = ((lines[lines.length-1].length)+1)*charW;
  textX = -(totalW/2);

  colors = {
    back: color(50,25 ,80),
    prime: color(190,85,180),
    dark: color(45,10,50),
    trim: color(45,170,190),
    text: color(255,255,255),
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
  switch(random(
      [/*'SpaceFlyer','Rain','SquareWalker',*/'Ripples','Bubbles','OrbitCircle','Collidiscope','ShapeZoom']
    )){
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

function mouseClicked(){
  if(mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 && 
    mouseY < height){
      window.location.href = 'https://www.joncraven.com/portfolio';
  }
}

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
