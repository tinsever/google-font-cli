'use strict'

var util = require('util');
var async = require('async');
var pascalCase = require('pascal-case');
var systemFont = require('./system-font');
var noop = require('./noop');
var https = require('https');

function googleFont(fontData) {
	if (!(this instanceof googleFont))
		return new googleFont(fontData);

	Object.assign(this, fontData);
	this.family = fontData.familyName || fontData.family || '';
	this._fileName = pascalCase(this.getFamily());
    
	this.apiUrl = 'https://gwfh.mranftl.com/api/fonts/' + this.getFamily().toLowerCase().replace(/\s/g, '-');
}

googleFont.prototype.getFamily = function() {
	return this.family;
};

googleFont.prototype.getVariants = function() {
	if (this.variants && typeof this.variants === 'object' && !Array.isArray(this.variants)) {
		return Object.keys(this.variants);
	}
	return this.variants || [];
};

googleFont.prototype._getFileMap = function(callback) {
	var self = this;
	var options = {
		headers: { 'User-Agent': 'google-font-installer-tin' }
	};

	https.get(this.apiUrl, options, function(res) {
		if (res.statusCode !== 200) {
			return callback(new Error('GWFH API returned ' + res.statusCode + ' for ' + self.getFamily()));
		}

		var data = '';
		res.on('data', function(chunk) { data += chunk; });
		res.on('end', function() {
			try {
				var json = JSON.parse(data);
				var files = {};
				
				json.variants.forEach(function(v) {
					// Map variants to IDs
					// prioritize TTF for system installation
					if (v.ttf) {
						files[v.id] = v.ttf;
					}
				});
				callback(null, files);
			} catch (e) {
				callback(new Error('Failed to parse GWFH JSON response'));
			}
		});
	}).on('error', callback);
};

googleFont.prototype.install = function(variants, callback) {
	var self = this;
	callback = callback || noop;

	this._getFileMap(function(err, fileList) {
		if (err) return callback(err);
		
		var requested = (variants && variants.length) ? variants : Object.keys(fileList);
		var resultList = [];
		
		async.eachSeries(requested, function(v, next) {
			var norm = self._normalizeVariant(v);
			var url = fileList[norm];

			if (url) {
				console.log('[DEBUG] Installing %s from GWFH...'.yellow, norm);
				systemFont.install(url, self._fileName + '-' + norm, function(err, path) {
					if (path) resultList.push({ family: self.getFamily(), variant: norm, path: path });
					next(err);
				});
			} else {
				console.log('[DEBUG] Variant %s not found in API results'.red, norm);
				next();
			}
		}, function(err) {
			callback(err, resultList);
		});
	});
};

googleFont.prototype.saveAt = function(variants, destFolder, callback) {
	var self = this;
	callback = callback || noop;

	this._getFileMap(function(err, fileList) {
		if (err) return callback(err);
		var requested = (variants && variants.length) ? variants : Object.keys(fileList);
		var resultList = [];

		async.eachSeries(requested, function(v, next) {
			var norm = self._normalizeVariant(v);
			var url = fileList[norm];

			if (url) {
				systemFont.saveAt(url, destFolder, self._fileName + '-' + norm, function(err, path) {
					if (path) resultList.push({ family: self.getFamily(), variant: norm, path: path });
					next(err);
				});
			} else {
				next();
			}
		}, function(err) {
			callback(err, resultList);
		});
	});
};

googleFont.prototype._normalizeVariant = function(variant) {
	var v = variant.toString().trim().toLowerCase();
	if (v === '400') return 'regular';
	if (v === '400italic') return 'italic';
	return v;
};

googleFont.prototype.getCategory = function() { return this.category; };
googleFont.prototype.getCssUrl = function() {
	return 'https://fonts.googleapis.com/css?family=' + this.getFamily().replace(/\s/g, "+");
};

module.exports = googleFont;