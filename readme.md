# packagephobia-cli [![Build Status](https://travis-ci.org/chinanf-boy/packagephobia-cli.svg?branch=master)](https://travis-ci.org/chinanf-boy/packagephobia-cli) [![install size](https://packagephobia.now.sh/badge?p=packagephobia-cli)](https://packagephobia.now.sh/result?p=packagephobia-cli)

「 cli for [packagephobia](https://github.com/styfle/packagephobia) 」

## Install

```
npm i -g packagephobia-cli
```

> or

```
npx packagephobia-cli tap commander@2.15.0
```

<img width="66%" src="./demo.gif">

## Usage

```
packagephobia-cli tap commander
```

```
✔ tap@12.0.1
Publish Size:108kB
Install Size:21.1MB
✔ commander@2.17.1
Publish Size:60.7kB
Install Size:60.7kB
```

### `-m` flag

Can show you the pkg markdown style with install size.

```bash
packagephobia-cli express -m
```

```
✔ express@4.16.4
Publish Size:202 kB
Install Size:1.54 MB

[![install size](https://packagephobia.now.sh/badge?p=express@4.16.4)](https://packagephobia.now.sh/result?p=express@4.16.4)
```

Like this: [![install size](https://packagephobia.now.sh/badge?p=express@4.16.4)](https://packagephobia.now.sh/result?p=express@4.16.4).

## cli

```
  Usage: cli <name> [options]

  show pkg size

  Options:

    -v, --version        output the version number
    -D, --debug [debug]  debug: boolean/string  (default: false)
    -m, --markdown       show the markdown link
    -h, --help           output usage information
```

## concat

- [two-log-min](https://github.com/chinanf-boy/two-log) just two log with ora/debug

## License

MIT © [chinanf-boy](http://llever.com)
