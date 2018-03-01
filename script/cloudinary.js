const fs = require('fs');
const cloudinary = require('cloudinary');
var listurl = ''

cloudinary.config({
  cloud_name: 'dwkgy95ov',
  api_key: '666311983959643',
  api_secret: 'FUHVGHeXtE49BIysVZZjc1deWy8'
});

cloudinary.v2.api.resources(function (error, result) {
  console.log(result.resources)
  for (var key in result.resources) {
    listurl += "- url: " +result.resources[key].url + "\n"
  }
  console.log(listurl)
  fs.writeFile("_data/cloudinary.yaml", listurl, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });
});
