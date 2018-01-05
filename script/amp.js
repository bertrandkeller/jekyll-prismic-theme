var fs = require('fs');
var mkdirp = require('mkdirp');

fs.rename('_layouts/defaultamp.html', '_layouts/default.html', function(err) {
	if ( err ) console.log('ERROR: ' + err);
});