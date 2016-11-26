module.exports = {

	getMsgFromImg: function (img){

	  var canvas = document.createElement('canvas')
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    var image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return OCRAD(image_data);


	}
}
