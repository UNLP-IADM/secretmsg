// TODO A todos los modulos hacerle un init donde se le pase el parametro al
// querySelector. El modulo App es el encargado de inicializar cada modulo con ese parametro


// MODULO CAPTURE
var capture = (function() {
    var picture_taken = document.querySelector("#take-picture");

    return {
        init: function() {
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
    var message_placeholder = document.querySelector("#message-decoded");
    var image_placeholder = document.querySelector("#show-picture");
    var reset_button = document.querySelector("#btn-reset");

    return {
        start: function() {
            capture.init();

            reset_button.onclick = function() {
                app.cleanup();
            };
        },

        cleanup: function() {
            message_placeholder.value = '';
            image_placeholder.src = 'public/imgs/placeholder.png';
        }
    };
})();

app.start();
