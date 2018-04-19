var sharp = require('sharp');
var request = require('request');

module.exports.ImageResizer = (event, context, callback) => {
  // var url = event.data.query.url
  var url = "https://upload.wikimedia.org/wikipedia/commons/e/e0/Large_Scaled_Forest_Lizard.jpg"

  request.get({url: url, encoding:null}, function (error, response, body) {
      if (error){
          return callback(error);
      }

      if (response.statusCode != 200) {
        return callback('Invalid url: code ' + response.statusCode + ' (' + url + ')');
      }

      if(response.headers['content-type'].match(/image/)) {
        sharp(body)
          .resize(500)
          .toFile('small.jpg', (err, info) => {
            var resizedImges = {
              statusCode: 200,
              body: {
                message: 'Serverless all day!',
                images: {
                  small: "https://image.com/small.jpg",
                  medium: "https://image.com/medium.jpg",
                  large: "https://image.com/large.jpg",
                  extraLarge: "https://image.com/extralarge.jpg"
                }
              }
            };

            callback(null, resizedImges);
        });
      } else {
        console.log('Not an image - no need to resize');
      }
  });
}