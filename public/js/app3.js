// MODULO CAMERA
var camera = (function () {
  var picture = document.querySelector("#take-picture");
  
  var initCamera = function() {
    picture.onchange = function (event) {
      var files = event.target.files,file;
      if (files && files.length > 0) {
        file = files[0];
      }
      console.log('FOTO CARGADA');
      picture.show();
    };  
  };
  
  return {
    startCamera: function() {
      initCamera();
    }
  }
})();

// MODULO PICTURE
var picture = (function () {
  var picture = document.querySelector("#show-picture");
  var imgURL = window.URL.createObjectURL(file);
  
  return {
    show: function() {
      console.log('MOSTRANDO LA FOTO');
      picture.src = imgURL;
    }
  }
})();


// MODULO GENERAL
var app = (function () {
  
  return {
    start: function () {
      camera.startCamera();
    }
  };
})();

app.start();