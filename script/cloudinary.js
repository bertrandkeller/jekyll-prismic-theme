const fs          = require('fs');
const cloudinary  = require('cloudinary');
const request     = require('request');
const fileExists  = require('file-exists');
const imagePath   = 'images/';

// Download file form external URI
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

cloudinary.config({
  cloud_name: 'dwkgy95ov',
  api_key: '666311983959643',
  api_secret: 'FUHVGHeXtE49BIysVZZjc1deWy8'
});

cloudinary.v2.api.resources(function (error, result) {
  let imageList = '',
      imageUrl = '',
      imageName = '',
      imageFolder = '',
      imageThumb = '';

  for (var key in result.resources) {
    imageUrl = result.resources[key].url.split('/')
    imageName = imageUrl.pop()
    imageFolder = imageUrl.pop()
    imageThumb = 'http://res.cloudinary.com/dwkgy95ov/image/upload/t_media_lib_thumb/' + imageFolder + '/' + imageName

    imageExist = fileExists.sync(imagePath + imageName)
    if (!imageExist) {
        download(imageThumb, imagePath + imageName, function(){
          console.log(imageName + 'uploaded from cloudinary');
        });
      }

    imageList += "- name: " + imageName + "\n" + "  folder: " + imageFolder +  "\n"
  }
  fs.writeFile("_data/cloudinary.yml", imageList, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });
});
