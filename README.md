Google Font CLI
=============

[![npm version](https://img.shields.io/npm/v/google-font-cli.svg)](https://www.npmjs.com/package/google-font-cli)
[![GitHub stars](https://img.shields.io/github/stars/tinsever/google-font-cli.svg)](https://github.com/tinsever/google-font-cli/stargazers)
[![Downloads](https://img.shields.io/npm/dm/google-font-cli.svg)](https://www.npmjs.com/package/google-font-cli)

![how gfcli works](https://raw.githubusercontent.com/tinsever/google-font-cli/master/gfcli.gif)

> This tool uses [google-webfonts-helper](https://gwfh.mranftl.com/) to access Google Fonts without requiring an API key.

Google Font CLI is a Node.js CLI & module that lets you Search, Download and Install fonts offered by Google Fonts.

## Why use this?

- **Cross-platform**: Automatic installation for Linux, macOS, and Windows
- **Smart Search**: Fuzzy matching for font names makes finding fonts effortless
- **Developer Friendly**: Use as a CLI or integrate as a Node.js library
- **Multiple Formats**: Support for both TTF and WOFF2 formats

You can use it in two ways:
- install the module system wide and use the Command Line Interface (CLI)
- require the module in your project and use the APIs

# Quick start
After installing it via [npm](#npm) or [homebrew tap](#homebrew-using-tap) you can use the CLI!
```bash
$ gfcli install "Open Sans" -v regular,700
```

### Table of content
- [Prerequisites](#prerequisites)
- [Install](#install)
	- [npm](#npm)
	- [homebrew](#homebrew-using-tap)
- [CLI](#cli)
	- [Search a font](#search-a-font)
	- [Caching](#caching)
	- [Download a font](#download-a-font)
	- [Install a font](#install-a-font)
	- [Copy font CSS URL](#copy-font-css-url)
	- [Examples](#cli-examples)
- [Documentation](#documentation)
	- [Architecture](#architecture--integration)
	- [Development](#development--testing)
	- [Performance](#performance--caching)
	- [FAQ](#faq--troubleshooting)
	- [API Reference](docs/api.md)

<br>

## Font installation footnote
In Linux and OSX, the font will be installed in the user's font directory (~/.local/share/fonts for Linux, ~/Library/Fonts for OSX).
In Windows, due to the fact that font installation require some register modifications, I prefered to create a little WScript (a windows script that use ActiveX windows interface) and spawn a `cscript` process to install the font in a _'windows native way'_.

# Installation
You can install gfcli using...
## npm
or anything that can access npm such as bun!
```bash
$ npm install -g google-font-cli
```

## homebrew using tap
```bash
$ brew tap tinsever/google-font-cli
$ brew install gfcli
```


# CLI

From your terminal emulator, you can use the command `gfcli`

### Caching

- The Google Fonts metadata list is cached for 24h at `~/.gfcli/cache.json`.
- Use `--refresh-cache` on any command to force a fresh download.
- If the cache is valid, commands skip the download step for faster startup.

### Search a font

```
$ gfcli search [family_name]
```
The search is really permissive, so you can specify only few characters and view all the font families that contains these characters. Words order is also not important.
For instance, search for _Source Sans_ or _Sans Source_ will produce the same result.

### Download a font

```
$ gfcli download [family_name|"family1,family2"] [-d|--dest destination_folder] [-v|--variants comma_separated_variants] [--ttf|--woff2] [--refresh-cache]
```

If **family_name** will match more than one family, nothing will be downloaded: a list of alternatives will help you better specify the font family name.

Download command accepts these options:
- `-d` or `--dest` let you specify the folder where to download the fonts. If this option is omitted the fonts will be download in the folder in which the command was called (or in the home directory if this folder is not writable by the user)
- `-v` or `--variants` let you specify which variants of the font will be downloaded. You have to write each variant separated by the other with a comma. For example `$ gfcli download Source Sans Pro -v 300,400`. If omitted, all variants will be downloaded.
- `--ttf` downloads the font in TTF format (default)
- `--woff2` downloads the font in WOFF2 format (optimized for web use)
- Multiple families: pass a comma-separated list in quotes, e.g. `$ gfcli download "Inter,Roboto" --woff2 -d ./fonts`
- `--refresh-cache` forces a fresh font list download and ignores the local cache

### Install a font
```
$ gfcli install [family_name|"family1,family2"] [-v|--variants comma_separated_variants] [--refresh-cache]
```

If **family_name** will match more than one family, nothing will be installed: a list of alternatives will help you better specify the font family name.

Install command accepts only one option:
- `-v` or `--variants` let you specify which variants of the font will be installed. You have to write each variant separated by the other with a comma. For example `$ gfcli install Source Sans Pro -v 300,400`. If omitted, all variants will be downloaded.
- Multiple families: pass a comma-separated list in quotes, e.g. `$ gfcli install "Inter,Roboto" -v 400,700`
- `--refresh-cache` forces a fresh font list download and ignores the local cache

### Copy font CSS url
```
$ gfcli copy [family_name] [-v|--variants comma_separeted_variants]
```

If **family_name** will match more than one family, nothing will be copied: a list of alternatives will help you better specify the font family name.

<a id="cli-examples"></a>
### Examples

**Search the _source_ keyword**
```
$ gfcli search source

Search results for: "source"

 * Source Code Pro
    Category: monospace
    Variants: 200, 300, regular, 500, 600, 700, 900
    CSS Url: https://fonts.googleapis.com/css?family=Source+Code+Pro
 * Source Sans Pro
    Category: sans-serif
    Variants: 200, 200italic, 300, 300italic, regular, italic, 600, 600italic, 700, 700italic, 900, 900italic
    CSS Url: https://fonts.googleapis.com/css?family=Source+Sans+Pro
 * Source Serif Pro
    Category: serif
    Variants: regular, 600, 700
    CSS Url: https://fonts.googleapis.com/css?family=Source+Serif+Pro
```

**Download Source Sans Pro 600 and 700italic**
```
$ gfcli download source sans pro -v 600,700italic

Source Sans Pro variant 600 downloaded in /home/user/someFolder/SourceSansPro-600.ttf
Source Sans Pro variant 700italic downloaded in /home/user/someFolder/SourceSansPro-700italic.ttf
```

**Download Inter in WOFF2 format**
```
$ gfcli download inter --woff2

Inter variant regular downloaded in /home/user/someFolder/Inter-regular.woff2
Inter variant 100 downloaded in /home/user/someFolder/Inter-100.woff2
Inter variant 200 downloaded in /home/user/someFolder/Inter-200.woff2
...
```

**Download Inter and Roboto in one command (WOFF2)**
```
$ gfcli download "Inter,Roboto" --woff2 -d ./fonts
```

**Install Inter and Roboto with selected variants**
```
$ gfcli install "Inter,Roboto" -v regular,700
```

**Force refresh of the cached font list**
```
$ gfcli search inter --refresh-cache
```

**Install Lato 100**
```
$ gfcli install lato -v 100

Lato variant 100 downloaded in /home/user/.local/share/fonts/Lato-100.ttf

```

**Copy font url for Work Sans variants 200, normal and 600**
```
$ gfcli copy work sans -v 200,400,600

"work sans" font url has been copied to your clipboard.

```
(*https://fonts.googleapis.com/css?family=Work+Sans:200,400,600* will be available in your clipboard)

## Prerequisites

- Node.js 14+ (LTS) recommended.
- Windows: run the CLI with administrative privileges when installing system fonts.

## Documentation

- [Architecture & Integration](docs/architecture.md)
- [Development & Testing](docs/development.md)
- [Performance & Caching](docs/performance.md)
- [FAQ & Troubleshooting](docs/faq.md)
- [Contributing](CONTRIBUTE.md)
- [API Reference](docs/api.md)