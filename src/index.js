var captura = require('./captura');
var camara = require('./camara');

var btn =  document.getElementById('btn-camera')
var reset =  document.getElementById('btn-reset')
var placeholder = document.querySelector('#img_place');
var texto = document.querySelector('#texto');

var input = document.getElementById('file-1')
var video = document.querySelector('video')

camara.startWebcam();

btn.addEventListener("click", function(){
   //incio la caputra
  var data = captura.getCaptura();

  texto.innerHTML = data.texto;
  placeholder.src = data.image;


});

reset.addEventListener("click", function(){
   //incio la caputra
  texto.innerHTML = "";
  placeholder.src = "public/imgs/placeholder.png";
  video.play();

});
