var flattenFolder = require( './index' );

var json = flattenFolder( 'example', {
	outputFile: 'data.json'
});

module.exports = json;
