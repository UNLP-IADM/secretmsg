// MODULO CAMARA
var camera = (function () {

  var errorMessage =  function() {
    console.log('Error al acceder a la cámara!');
  };
  
  var initCamera = function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    video.onloadedmetadata = function(e) {
      console.log('Buenísimo');
    };
  };
  
  return {
    startCamera: function() {
      navigator.getMedia = ( navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia);
                             
      navigator.getMedia({video:true}, initCamera, errorMessage);
    }
  };
  
})();



// MODULO APP GENERAL
var app = (function () {

  function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  return {
    start: function () {
      if (hasGetUserMedia()) {
        camera.startCamera();
      } else {
        alert('getUserMedia() no es soportado en su navegador');
      };
    }
  };
})();

app.start();