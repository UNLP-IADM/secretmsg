var camara = require('./camara');
var ocrad = require('./ocrad');

module.exports = {

	getCaptura: function(){
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
