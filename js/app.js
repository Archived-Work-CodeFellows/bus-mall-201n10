'use strict';

var totalClicks = 0;
ImageGetter.all = [];
var images = [];
var compare = [];
var compare2 = [];

function ImageGetter(name, path){
  this.name = name;
  this.path = path;
  ImageGetter.all.push(this);

}

new ImageGetter('bag', 'img/bag.jpg');
new ImageGetter('banana', 'img/banana.jpg');
new ImageGetter('bathroom', 'img/bathroom.jpg');
new ImageGetter('boots', 'img/boots.jpg');
new ImageGetter('breakfast', 'img/breakfast.jpg');
new ImageGetter('bubblegum', 'img/bubblegum.jpg');
new ImageGetter('chair', 'img/chair.jpg');
new ImageGetter('cthulhu', 'img/cthulhu.jpg');
new ImageGetter('dog-duck', 'img/dog-duck.jpg');
new ImageGetter('dragon', 'img/dragon.jpg');
new ImageGetter('pen', 'img/pen.jpg');
new ImageGetter('pet-sweep', 'img/pet-sweep.jpg');
new ImageGetter('tauntaun', 'img/tauntaun.jpg');
new ImageGetter('unicorn', 'img/unicorn.jpg');
new ImageGetter('usb', 'img/usb.gif');
new ImageGetter('water-can', 'img/water-can.jpg');
new ImageGetter('wine-glass', 'img/wine-glass.jpg');

for(var i = 0; i < 3; i++) images.push(document.getElementById('img'+(i+1)));

var eventArea = document.getElementById('images');
eventArea.addEventListener('click', imageDisplay);

function imageDisplay() {
  totalClicks++;
  var indexRand = 0;
  for(var k = 0; k < images.length; k++) compare2[k] = images[k].src;
  for(var i = 0; i < images.length; i++) {
    indexRand = Math.floor(Math.random()*ImageGetter.all.length);
    images[i].src = ImageGetter.all[indexRand].path;
    for(var j = 0; j < images.length; j++){
      if(compare2[j] === images[i].src) {
        console.log('Previous Iteration at ' + i);
        if(i === 0) {
          indexRand = Math.floor(Math.random()*ImageGetter.all.length);
          images[0].src = ImageGetter.all[indexRand].path;
        } else i--;
        break;
      }
      if(compare[j] === images[i].src) {
        console.log('Duplicate at position' + i);
        if(i === 0) {
          indexRand = Math.floor(Math.random()*ImageGetter.all.length);
          images[0].src = ImageGetter.all[indexRand].path;
        } else i--;
        break;
      }
    }
    compare[i] = images[i].src;
  }
  console.log(totalClicks);
}
imageDisplay();