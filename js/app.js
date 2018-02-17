'use strict';

var totalClicks = 0;
ImageGetter.all = [];
var images = [];
var compare = [];
var compare2 = [];
var randomIndex = [];
var imgName = ['Bag','Banana','Bathroom','Boots','Breakfast','Bubblegum','Chair','Cthulhu','Dog-duck','Dragon','Pen','Pet-sweep','Tauntaun','Unicorn','Usb','Water-can','Wine-glass'];

function ImageGetter(name){
  this.name = name;
  this.path = '';
  this.clicked = 0;
  this.viewed = 0;
  ImageGetter.all.push(this);
  this.pathMaker = function(){
    var firstLetter = name.slice(0,1).toLowerCase();
    if(firstLetter+name.slice(1,name.length) === 'usb') return this.path ='img/'+ firstLetter + name.slice(1,name.length) + '.gif';
    else return this.path ='img/'+ firstLetter + name.slice(1,name.length) + '.jpg';
  };
  this.pathMaker();
}
ImageGetter.prototype.dataGetter = function(clicked,viewed) {
  this.clicked = clicked;
  this.viewed = viewed;
};

(function getLocalStorage() {
  if(localStorage.dataStore) {

    var dataStore = localStorage.getItem('dataStore');
    var data = JSON.parse(dataStore);

    for(var info of data) {
      var recall = new ImageGetter(info.name);
      recall.dataGetter(info.clicked,info.viewed);
    }
    totalClicks = 25;
  } else imageInit();
})();

function imageInit() {
  for(var i = 0; i < imgName.length; i++) new ImageGetter(imgName[i]);
}

for(var i = 0; i < 3; i++) images.push(document.getElementById('img'+(i+1)));

var eventArea = document.getElementById('images');
eventArea.addEventListener('click', imageDisplay);

function chartDisplay() {
  var clicks = [];
  var views = [];
  var ctx = document.getElementById('chart').getContext('2d');

  for(var i = 0; i < ImageGetter.all.length; i++) {
    clicks.push(ImageGetter.all[i].clicked);
    views.push(ImageGetter.all[i].viewed);
  }

  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: imgName,
      datasets: [{
        label: '# of votes',
        data: clicks,
        backgroundColor: 'rgba(120,200,65,0.25)',
        hoverBackgroundColor: 'rgba(120,200,65,0.15)'
      }, {
        label: '# of views',
        data: views,
        backgroundColor: 'rgba(185,130,150,0.25)'
      }]
    },
    options: {
      scales: {
        xAxes: [{ stacked: true}],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function imageDisplay() {
  var indexRand = 0;
  for(var k = 0; k < images.length; k++) compare2[k] = randomIndex[k];

  for(var i = 0; i < images.length; i++) {
    indexRand = Math.floor(Math.random()*ImageGetter.all.length);
    randomIndex[i] = indexRand;
    for(var j = 0; j < images.length; j++){
      if(compare2[j] === randomIndex[i] || compare[j] === randomIndex[i]) {
        if(i === 0) {
          do{
            indexRand = Math.floor(Math.random()*ImageGetter.all.length);
            randomIndex[0] = indexRand;
          }
          while (compare[0] === randomIndex[0]);
        } else i--;
        break;
      }
    }
    compare[i] = randomIndex[i];
  }
  for(i = 0; i < 3; i++) images[i].src = ImageGetter.all[randomIndex[i]].path;
  if(totalClicks < 25) {
    for(i = 0; i < images.length; i++) ImageGetter.all[randomIndex[i]].viewed++;
  }

  images[0].onclick = function (){
    ImageGetter.all[randomIndex[0]].clicked++;
    totalClicks++;
  };
  images[1].onclick = function (){
    ImageGetter.all[randomIndex[1]].clicked++;
    totalClicks++;
  };
  images[2].onclick = function (){
    ImageGetter.all[randomIndex[2]].clicked++;
    totalClicks++;
  };
  if(totalClicks === 25) {
    chartDisplay();
    eventArea.removeEventListener('click',imageDisplay);
    var dataStore = JSON.stringify(ImageGetter.all);
    localStorage.setItem('dataStore', dataStore);

    var clear = document.createElement('button');
    clear.setAttribute('id','clear-storage');
    clear.textContent = 'Want to restart?';
    var mainEl = document.getElementById('storage-button');
    mainEl.appendChild(clear);

    clear.addEventListener('click',clearLocalStorage);
  }
  function clearLocalStorage() {
    localStorage.clear();
    location.reload();
  }
}
imageDisplay();