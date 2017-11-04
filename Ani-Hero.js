var divHero;
var canvas;
var divInput;
var renderedObjects = [];
var colors;

function setup() {
	textX = -(width);
  colors = {
    back: color(50,25 ,80),
    prime: color(190,85,180),
    dark: color(45,10,50),
    trim: color(45,170,190),
		text: color(255,255,255),
    rand: function(){
      switch(random([/*'back',*/'prime','dark','trim'])){
        case 'back':
          return this.back;
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
  canvas.parent(divHero);
  let r;
  switch(random(
    [/*'SquareWalker','Bubbles','SpaceFlyer','Rain','Ripples',*/'OrbitCircle','Collidiscope','ShapeZoom']
  )){
    case 'SquareWalker':
      renderedObjects.push(new SquareWalker());
      break;
    case 'OrbitCircle':
      for(let i = 1; i<=8;i++){
				renderedObjects.push(new OrbitCircle(QUARTER_PI*i));
			}
      break;
    case 'Collidiscope':
      r = floor(random(3,6));
      for(let i = 0; i<r;i++){
        renderedObjects.push(new Collidiscope());
      }
      break;
    case 'ShapeZoom':
      r = 3; //floor(random(3,6));
      for(let i = 0; i<r;i++){
        renderedObjects.push(new ShapeZoom());
      }
      break;
    case 'Ripples':
      r = 5;
      renderedObjects.push(new Ripple(0));

  }
	background(colors.back);
}

function draw() {
  background(colors.back);
  for(let i = renderedObjects.length-1;i>=0;i--){
    renderedObjects[i].show();
    let stail = renderedObjects[i].update();
    if (stail){
      renderedObjects.slice(i, 1);
    }
  }
 // console.log(renderedObjects.length);
	type();
	if(steps==12){
		fadeIn();
	}
}
