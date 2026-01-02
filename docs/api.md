# APIs

First of all you have to install the module in you NodeJS project:
```bash
$ npm install google-font-cli --save
```
And then you can require it in your code:
```js
var GoogleFontList = require('google-font-cli');
```

### GoogleFontList

**GoogleFontList** is a class that downloads the font list from google-webfonts-helper.
```js
var GoogleFontList = require('google-font-cli');
var fontList = new GoogleFontList();
```
<a id="google-font-list-events"></a>

#### Events
###### `'success'`
Emitted when the Font List is downloaded from google-webfonts-helper and the data are converted, stored and processed. Callback contains only one argument for convenience: the object itself
###### `'error'`
Emitter if something go wrong in downloading, coverting or processing data. The Callback argument is the error object.

<a id="google-font-list-properties"></a>
#### Public properties
###### `data` [Array]
Array of GoogleFont instances, a class that extends the data provided by google-webfonts-helper. Empty until 'success' event.

<a id="google-font-list-methods"></a>
#### Public methods

###### `downloadList()`
Download the list from google-webfonts-helper. Called internally, but public for convenience if someone prefers to use the object without downloading the list (ex. cached data).

###### `populate(jsonData)`
- _jsonData_ [Array] An array of font objects.

Populate the object `data` property with an array of GoogleFont instances, based on the data provided by google-webfonts-helper.

###### `clone()`
- Returns [GoogleFontList] A new instance of GoogleFontList

Return a new instance of the object, with the same `data` properties.

###### `searchFont(term, field, callback)`
- term [String] The string to search for.
- field [String] The property of the GoogleFont instance to test.
- callback(err, fontList) [Function] Mandatory callback with optional error obj and a new instance of GoogleFontList with the searched subset of Fonts

Function with callback used to search a font inside the object `data` property: it's case insensitive, words order insensitive and test if the field CONTAIN that words (ex. `source sans`, `source Sans` and `sans source` will produce the same result).

###### `searchFontByName(term, callback)`
- term [String] The string to search for.
- callback(err, fontList) [Function] Mandatory callback with optional error obj and a new instance of GoogleFontList with the searched subset of Fonts

Same as searchFont, but specific for the Family property. (the font name)

###### `searchFontByType(term, callback)`
- term [String] The string to search for.
- callback(err, fontList) [Function] Mandatory callback with optional error obj and a new instance of GoogleFontList with the searched subset of Fonts

Same as searchFont, but specific for the Category property. (for instance serif, sans-serif, display, etc)

###### `getFont(term, field, callback)`
- term [String] The string to search for.
- field [String] The property of the GoogleFont instance to test.
- callback(err, fontList) [Function] Mandatory callback with optional error obj and a new instance of GoogleFontList with the searched subset of Fonts

Function with callback used to get a specific font where a field and the term exactly match (case insensitive)

###### `getFontByName(term, callback)`
- term [String] The string to search for.
- callback(err, fontList) [Function] Mandatory callback with optional error obj and a new instance of GoogleFontList with the searched subset of Fonts

Same as getFont, but specific for the Family property. (the font name)

###### `getFontByType(term, callback)`
- term [String] The string to search for.
- callback(err, fontList) [Function] Mandatory callback with optional error obj and a new instance of GoogleFontList with the searched subset of Fonts

Same as getFont, but specific for the Category property. (for instance serif, sans-serif, display, etc)

###### `getFirst()`
- Returns [GoogleFont|Boolean] If not empty, return the first GoogleFont instance inside
GoogleFontList `data` property, else return false.

###### `isSingle()`
- Returns [Boolean] Returns true if the is only one GoogleFont in GoogleFontList `data` property, else return false.

###### `forEachFont(fn, callback)`
- fn(el, index) [Function] The function to execute for each element of the list, with element and index as parameters.
- callback(err) [Function] Optional callback that will be executed after the end of the loop

Execture fn foreach GoogleFOnt in GoogleFontList `data` property. It's async.


### GoogleFont
Class that extends data structure provided by google-webfonts-helper.

It's instanced by the populate method of GoogleFontList, called internally by the constructor or by parseRawData method.

**Every object inside the `data` property of [GoogleFontList](#googlefontlist) is an instance of this class.**

<a id="google-font-properties"></a>
#### Public properties

| Property | Type | Description |
|----------|------|-------------|
| `family` | String | The font family name (e.g., "Open Sans") |
| `category` | String | Font category (e.g., sans-serif, serif, monospace) |
| `version` | String | The version of the font |
| `lastModified` | String | Last modification date |
| `subsets` | Array | Available character subsets for the font |
| `variants` | Array | Available weights (e.g., ['300', 'regular', '700']) |
| `files` | Object | URLs to font files for each variant |

<a id="google-font-methods"></a>
#### Public methods

###### `getFamily()` `getCategory()` `getVariants()` `getSubsets()` `getVersion()` `getLastMod()` `getFileList()` `getCssUrl()`
Method to access to the public properties: it's a better idea use them insteed the properties for a future-proof reason. Maybe someday google will decide to changhe his properties names.
All returns the type of the property, except `GetLastMod()` that return a new Date instance.

##### `hasVariant(variant)`
- variant [String] The name of a variant (300, 500, etc);
- Returns [Boolean] true if the font has that variant, else returns false.

##### `getFiles(variants)`
- variants [String|Array] A string of the variant or an array with multiple variants.
- Returns [Boolean] Returns an object with key the requested variant and value the respetive file (or false if the is no file for that variant).

##### `saveAt(variants, destFolder, callback)`
- variants [String|Array] A string of the variant or an array with multiple variants.
- destFolder [String] A valid path of the destination folder for the file download.
- callback(err, result) [Function] Optional callback with eventually an error obj and and the result Array of Objects.
    - result [Array] An Array containing one object for each downloaded file, with the following properties:
        - _family_: the downloaded font family
        - _variant_: the downloaded variant
        - _path_: the path of the downloaded file

Download specified variants of the font in the destination folder directory.

##### `download(variants, callback)`
- variants [String|Array] A string of the variant or an array with multiple variants.
- callback(err, result) [Function] Optional callback with eventually an error obj and and the result Array of Objects.
    - result [Array] An Array containing one object for each downloaded file, with the following properties:
        - _family_: the downloaded font family
        - _variant_: the downloaded variant
        - _path_: the path of the downloaded file

Download specified variants of the font in the current directory (where the script is called).

##### `install(variants, callback)`
- variants [String|Array] A string of the variant or an array with multiple variants.
- callback(err, result) [Function] Optional callback with eventually an error obj and and the result Array of Objects.
    - result [Array] An Array containing one object for each installed file, with the following properties:
        - _family_: the installed font family
        - _variant_: the installed variant
        - _path_: the path of the installed file

Install specified variants of the font. The destination folder depends on the platform used:
- Linux: _~/.local/share/fonts/_
- OSX: _~/Library/Fonts/_
- Windows: The file is not copied into c:\Windows\Fonts, but is used a WScript that install the font invoking the font install windows function.

<a id="api-examples"></a>
### Examples
```js
var GoogleFontlist = require('google-font-cli');
var fontList = new GoogleFontList();

fontList.on('success', function(){
	this.searchFontByName('Source Sans Pro', function(err, filteredList) {
		if (err)
			throw err;
		filteredList.getFirst().download(['300', '400'], function(err, result){
			if (err)
				throw err;
			result.forEach(function(el, index){
				console.log('Variant %s of %s downloaded in %s', el.variant, el.family, el.path);
			})
		});
	})
})

fontList.on('error', function(err){
	throw err;
})
```
