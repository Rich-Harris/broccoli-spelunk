var Writer = require( 'broccoli-writer' ),
	Promise = require( 'es6-promise' ).Promise,
	spelunk = require( 'spelunk' ),
	fs = require( 'fs' ),
	path = require( 'path' ),
	mkdirp = require( 'mkdirp' ),
	tosource = require( 'tosource' );


var SpelunkCompiler = function ( inputTree, options ) {
	var key;

	if ( !( this instanceof SpelunkCompiler ) ) {
		return new SpelunkCompiler( inputTree, options );
	}

	this.inputTree = inputTree;

	for ( key in options ) {
		if ( options.hasOwnProperty( key ) ) {
			this[ key ] = options[ key ];
		}
	}

	if ( !this.mode ) {
		this.mode = 'json';
	}

	if ( !this.outputFile ) {
		throw new Error( 'broccoli-spelunk: You must specify an output file' );
	}
};

SpelunkCompiler.prototype = Object.create( Writer.prototype );
SpelunkCompiler.prototype.constructor = SpelunkCompiler;

SpelunkCompiler.prototype.write = function ( readTree, destDir ) {
	var self = this;

	return new Promise( function ( fulfil, reject ) {
		readTree( self.inputTree ).then( function ( srcDir ) {
			spelunk( srcDir, {
				exclude: self.exclude
			}, function ( err, result ) {
				var mode = self.mode, stringified;

				if ( err ) throw err;

				switch ( mode ) {
					case 'json':
						stringified = JSON.stringify( result, self.replacer, self.space );
						break;

					case 'amd':
						stringified = 'define(function(){\nreturn ' + tosource( result ) + ';\n});';
						break;

					case 'cjs':
						stringified = 'module.exports = ' + tosource( result ) + ';';
						break;

					case 'es6':
						stringified = 'export default ' + tosource( result ) + ';';
						break;

					default:
						throw new Error( 'broccoli-spelunk supports the following modes: json, amd, cjs, es6' );
				}

				mkdirp( path.join( destDir, self.outputFile, '..' ), function ( err ) {
					if ( err ) throw err;

					fs.writeFile( path.join( destDir, self.outputFile ), stringified, function ( err, result ) {
						if ( err ) throw err;
						fulfil();
					});
				});
			});
		});
	});
};

module.exports = SpelunkCompiler;
