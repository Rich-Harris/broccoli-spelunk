# broccoli-spelunk

Flatten a folder to a .js/.json representation of its contents, a la [spelunk](http://github.com/Rich-Harris/spelunk).


Installation
------------

```
$ npm install broccoli-spelunk
```


Usage
-----

In your brocfile.js (or, if you're using [grunt-broccoli](https://github.com/quandl/grunt-broccoli) for example, in your target's `config` property), add something like the following:

```js
var flattenFolder = require( 'broccoli-spelunk' );

var json = flattenFolder( 'data', {
	outputFile: 'data.json'
});

module.exports = json;
```

This will recursively read all the files and folders inside the `data` folder, flattening them to a JavaScript object representation. This data can be output as **JSON**, **AMD**, **Common JS**, or as an **ES6 module**.


Example
-------

First, you will need to have `broccoli-cli` installed:

```
$ npm i -g broccoli-cli
```

Clone this repo, run `npm i` to install dependencies, then run `broccoli serve`. This will flatten the contents of the `example` folder.

Browse to [localhost:4200/data.json](http://localhost:4200/data.json) to see the result. As you add, edit and remove files inside the `example` folder, keep refreshing this URL (or install [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) for Chrome so you don't have to) to see the JSON file updated.


Options
-------

Here are some example options. They are all blank by default except `mode`, which defaults to 'json'.

```js
tree = flattenFolder( inputTree, {
	// This is the only required option. If you're using a mode other
	// than 'json', be sure to change the file extension to '.js'
	outputFile: 'data.json',

	// To exclude files, pass in a string or array of patterns to ignore.
	// You can use minimatch glob patterns
	exclude: '**/README.md'

	// Supported options are 'json', 'amd', 'cjs' and 'es6'.
	// The default is 'json'
	mode: 'json',

	// These options only apply to 'json' mode, and are treated as the
	// second and third arguments to `JSON.stringify`

	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_native_JSON#The_replacer_parameter
	replacer: null,
	space: '  '
});
```


Credits
-------

* [Jo Liss](https://twitter.com/jo_liss) created [broccoli](https://github.com/broccolijs/broccoli) and the [broccoli-writer](https://github.com/broccolijs/broccoli-writer) utility which this plugin uses
* [Marcello Bastéa-Forte](https://twitter.com/marcello3d) wrote [node-tosource](https://github.com/marcello3d/node-tosource) which this plugin uses to serialize objects
* [Substack](https://twitter.com/substack) wrote [node-mkdirp](https://github.com/substack/node-mkdirp), which makes dealing with the filesystem bearable
* [Jake Archibald](https://twitter.com/jaffathecake) created the [es6-promise](https://github.com/jakearchibald/es6-promise) polyfill


Contributing & feedback
-----------------------

Issues and pull requests welcome. I'm [@Rich_Harris](http://twitter.com/Rich_Harris) on Twitter.


License
-------

MIT.
