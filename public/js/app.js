(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        module.exports = {

            captura: function() {
                var img = new Image();
                var video = document.querySelector('video');
                var canvas = document.createElement('canvas');
                canvas.width = 320;
                canvas.height = 400;

                var ctx = canvas.getContext('2d')
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                img.src = canvas.toDataURL("image/png");

                return img;

            },
            startWebcam: function() {
                if (navigator.getUserMedia) {
                    navigator.getUserMedia(

                        // constraints
                        {
                            video: true,
                            audio: false
                        },

                        // successCallback
                        function(localMediaStream) {
                            video = document.querySelector('video');
                            video.src = window.URL.createObjectURL(localMediaStream);
                            webcamStream = localMediaStream;
                        },

                        // errorCallback
                        function(err) {
                            console.log("The following error occured: " + err);
                        }
                    );
                } else {
                    console.log("getUserMedia not supported");
                }
            }
        }
    }, {}],
    2: [function(require, module, exports) {
        var camara = require('./camara');
        var ocrad = require('./ocrad');

        module.exports = {
            getCaptura: function() {
                var video = document.querySelector('video');
                video.pause();

                var image = camara.captura();
                var texto = ocrad.getMsgFromImg(image);

                return {
                    texto: texto,
                    image: image.src
                };
            }
        }

    }, {
        "./camara": 1,
        "./ocrad": 4
    }],
    3: [function(require, module, exports) {
        var captura = require('./captura');
        var camara = require('./camara');

        var btn = document.getElementById('btn-camera')
        var reset = document.getElementById('btn-reset')
        var placeholder = document.querySelector('#img_place');
        var texto = document.querySelector('#texto');

        var input = document.getElementById('file-1')
        var video = document.querySelector('video')

        camara.startWebcam();

        btn.addEventListener("click", function() {
            //incio la caputra
            var data = captura.getCaptura();
            texto.innerHTML = data.texto;
            placeholder.src = data.image;
        });

        reset.addEventListener("click", function() {
            //incio la caputra
            texto.innerHTML = "";
            placeholder.src = "public/imgs/placeholder.png";
            video.play();
        });
    }, {
        "./camara": 1,
        "./captura": 2
    }],
    4: [function(require, module, exports) {
        module.exports = {
            getMsgFromImg: function(img) {
                var canvas = document.createElement('canvas')
                canvas.width = 326;
                canvas.height = 214;

                var ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0)

                var image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);

                return OCRAD(image_data);
            }
        }
    }, {}]
}, {}, [3]);
