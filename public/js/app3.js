// MODULO CAMERA
var camera = (function () {
  var picture = document.querySelector("#take-picture");
  var takenPicture = [];

  function initCamera() {
    picture.onchange = function (event) {
      var files = event.target.files, takenPicture;
      if (files && files.length > 0) {
        takenPicture = files[0];
      }
      pictureReader.show(takenPicture);
    };
  };
  
  return {
    startCamera: function() {
      initCamera();
    }
  }
  
})();

// MODULO PICTUREREADER
var pictureReader = (function () {
  var showPicture = document.querySelector('#show-picture');
  var fileReader = new FileReader();
  
  var readFile = function(pic) {
    fileReader.onload = function (event) {
        showPicture.src = event.target.result;
    };
    fileReader.readAsDataURL(pic);
  } 
  
  return {
    show: function(pic) {
      readFile(pic);
      recognizer.decode(pic);
    }
  }
})();


// MODULO RECOGNIZER
var recognizer = (function () {
  
  function decode_image (image) {
    
    var img = new Image();
    img.src = document.querySelector('#show-picture').src;

    var canvass = document.createElement('canvas');
    canvass.width = 320;
    canvass.height = 400;

    var ctx = canvass.getContext('2d');
    ctx.drawImage(img, 0, 0, canvass.width, canvass.height);

    img.src = canvass.toDataURL("image/png");
    image = img;  
    

    var canvas = document.createElement('canvas');
    canvas.width = 326;
    canvas.height = 214;
    var context = canvas.getContext('2d');


    context.drawImage(image, 0, 0);

    var imageData = context.getImageData(0, 0, img.width, img.height);

    var string = OCRAD(imageData);
    var texto = document.querySelector('#message');
    texto.innerHTML = string;
  }
  
  return {
    decode: function(image) {
      decode_image(image);
    }
  }
  
})( );


// MODULO GENERAL
var app = (function () {
  
  return {
    start: function () {
      camera.startCamera();
    }
  };
})();

app.start();