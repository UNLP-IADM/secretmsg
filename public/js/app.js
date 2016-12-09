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

                picture.display(file);
                ocrad.decode(file, message.display);
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
var picture = (function() {
    var picture;

    return {
        init: function(selector) {
            picture = document.querySelector(selector);
        },
        display: function(file) {
            picture.src = window.URL.createObjectURL(file);
        },
        reset: function() {
            picture.src = 'public/imgs/placeholder.png';
        }
    }
})();


// MODULO MESSAGE
var message = (function() {
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
            message.innerHTML = '<i>Haga click en la camara y tome una fotografía o selecciones una imágen de su carrete. A continuación el sistema intentará reconocer el texto presente.</i>';
        }
    }
})();


// MODULO OCRAD
var ocrad = (function() {
    var img, canvas, context;

    return {
        decode: function(image_file, callback) {
            img = new Image;
            img.src = URL.createObjectURL(image_file);
            img.onload = function() {
                canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                context = canvas.getContext('2d');
                context.drawImage(img, 0, 0, canvas.width, canvas.height);

                msg = OCRAD(canvas);
                callback(msg);
            };
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

            message.init("#message-decoded");
            picture.init("#show-picture");
            capture.init("#take-picture", "#take-picture-button");
        },

        cleanup: function() {
            message.reset();
            picture.reset();
        }
    };
})();

app.init();
