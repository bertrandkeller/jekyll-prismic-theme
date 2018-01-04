var Prismic = require('prismic-javascript');
var fs = require('fs');
var apiEndpoint = "https://tinyhouse.prismic.io/api/v2";
var YAML = require('json2yaml')
var mkdirp = require('mkdirp');


Prismic.getApi(apiEndpoint,  { }).then(function(api) {
  return api.query(
    ''
  );
}).then(function(response) {
	for (var key in response.results) {
		mkdirp("_" + response.results[key].type, function (err) {
			if (err) console.error(err)
		});
		fs.writeFile("_" + response.results[key].type + '/' + response.results[key].first_publication_date.slice(0,10) + '-' + response.results[key].data.title[0].text.trim().toLowerCase().split(' ').join('-').normalize('NFD').replace(/[\u0300-\u036f]/g, "") + ".md", YAML.stringify(response.results[key]) + '---', 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}
		});
  }
	var content = JSON.stringify(response.results)
	fs.writeFile("_data/prismic.json", content, 'utf8', function (err) {
		if (err) {
			return console.log(err);
		}
	});
	console.log("The file was saved!");
});