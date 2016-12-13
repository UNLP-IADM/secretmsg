// MODULO CAPTURE
var capture = (function() {
    var picture_taken, open_capture;

    bindCapture = function(selector) {
        open_capture = document.querySelector(selector);
        open_capture.addEventListener("click", function(e) {
            if (picture_taken) {
                picture_taken.click();
            }
            e.preventDefault();
        }, false);
    };

    bindCaptured = function(selector) {
        picture_taken = document.querySelector(selector);
        picture_taken.onchange = function(event) {
            var files = event.target.files,
                file;

            if (files && files.length > 0) {
                file = files[0];


                var reader = new FileReader();
        				reader.onload = function(){
        					var img = new Image();
        					img.src = reader.result;
        					img.onload = function(){
                    message = ocrad.decode(img);
                    Message.display(message);
                    Picture.display(img.src);
        					}
        				}
        				reader.readAsDataURL(file);


                // var img, canvas, context;
                // img = new Image();
                // img.src = URL.createObjectURL(file);
                //
                // img.onload = function() {
                //     canvas = document.createElement('canvas');
                //     canvas.width = img.width * 0.5;
                //     canvas.height = img.height * 0.5;
                //     context = canvas.getContext('2d');
                //     context.drawImage(img, 0, 0, canvas.width, canvas.height);
                //
                //     message = ocrad.decode(canvas);
                //     Message.display(message);
                //     Picture.display(img.src);
                // };
            }
        };
    };

    return {
        init: function(input_selector, action_selector) {
            bindCapture(action_selector);
            bindCaptured(input_selector);
        }
    }
})();


// MODULO PICTURE
var Picture = (function() {
    var picture;

    return {
        init: function(selector) {
            picture = document.querySelector(selector);
        },
        display: function(image) {
            picture.src = image;
        },
        reset: function() {
            picture.src = 'public/imgs/placeholder.png';
        }
    }
})();


// MODULO MESSAGE
var Message = (function() {
    var message;

    return {
        init: function(selector) {
            message = document.querySelector(selector);
            this.reset();
        },
        display: function(text) {
            message.innerHTML = text;
        },
        reset: function() {
            message.innerHTML = '<i>Haga click en la cámara para tomar o seleccionar una fotografía. A continuación, el sistema intentará reconocer el texto presente.</i>';
        }
    }
})();


// MODULO OCRAD
var ocrad = (function() {
    return {
        decode: function(canvas) {
            // document.querySelector('#take-picture-button').className += " fa-spin";
            msg = OCRAD(canvas);
            // document.querySelector('#take-picture-button').classList.remove("fa-spin");
            return msg;
        }
    };
})();



// MODULO APP
var app = (function() {

    return {
        init: function() {
            document.querySelector("#btn-reset").addEventListener("click", function() {
                app.cleanup();
            }, false);

            Message.init("#message-decoded");
            Picture.init("#show-picture");
            capture.init("#take-picture", "#take-picture-button");
        },

        cleanup: function() {
            Message.reset();
            Picture.reset();
        }
    };
})();

app.init();
