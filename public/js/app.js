// MODULO CAPTURE
var capture = (function() {
    var picture_taken = document.querySelector("#take-picture");

    return {
        init: function() {
            console.log('Camera: Se inicio el modulo');

            picture_taken.onchange = function(event) {

                var files = event.target.files,
                    file;

                if (files && files.length > 0) {
                    file = files[0];

                    picture.display(file);
                    ocrad.decode(file);
                }

            };
        }
    }
})();


// MODULO PICTURE
var picture = (function() {
    var picture = document.querySelector("#show-picture");

    return {
        display: function(file) {
            picture.src = window.URL.createObjectURL(file);
        }
    }
})();


// MODULO OCRAD
var ocrad = (function() {
    var message = document.querySelector("#message-decoded");

    return {
        decode: function(image_file) {
            var img = new Image;
            img.src = URL.createObjectURL(image_file);
            img.onload = function() {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                message.value = OCRAD(canvas);
            };
        }
    };
})();


// MODULO APP
var app = (function() {
    var message = document.querySelector("#message-decoded");

    return {
        start: function() {
            capture.init();
        },

        cleanup: function() {
            message.value = '';
        }
    };
})();

app.start();
