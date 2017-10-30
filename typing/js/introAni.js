/********intro animation********/
var titleAni = document.getElementById("titleAni");
var mycursor = document.getElementById("cursor");
var txt = document.getElementById("text");
var entered = document.getElementById("entered");
var lines = ['designer', 'developer', 'coder', 'jon craven'];
var letter = 0;
var word = 0;

var stop = false;

function toggleHide(elem){
  // console.log("toggleHide()");
  if(elem.classList.contains('hide')){

    elem.classList.remove('hide');
  } else {
    elem.classList.add('hide');
  }
}

function blink(){
  toggleHide(mycursor);
}

function type(){
  if(word<lines.length){
    var ln=lines[word];
    if(letter<ln.length){
      var string = ln.slice(0, letter);
      txt.innerHTML = string;
      letter++;
    }else if(letter==ln.length){
      var string = ln.slice();
      txt.innerHTML = string;
      letter++;
    }else{
      if(word==lines.length-1){
      }else{
        var string = ln.slice();
        txt.innerHTML = "";
        entered.innerHTML += ">"+string+"<br/>";
        letter = 0;
        word++;
      }
    }
  }
}
