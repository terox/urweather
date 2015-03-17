# Your Weather
> Small approach to unify all weather stations in a NodeJS way

**Your Weather** is a small library that try to get a normalized way to access to personal
weather stations information.

## Requeriments

* node 0.10.x (It works).
* node-hid dependencies [depending on your system](https://github.com/node-hid/node-hid#prerequisites).

**Note:** ```0.11.x``` and ```0.12.x``` don't work properly in node-hid yet. You can use [NVM](https://github.com/creationix/nvm) to
switch between node versions. Remember if you use NVM, you must replace ```/usr/local/bin/node``` with the correct version: NPM packet manager by default use this path. It not use the local version of node installed by NVM in your working directory.

## Installation

```
npm install urweather --save
```

```javascript
// file: weather.js

var urweather = require('urweather');

var station = urweather.create('wh1080', {
  interval : 60,
  debug    : false
});

station.on('data', function( data , duration ) {

  console.log(data);

});

station.listen();
```

## Run the script

* Unix based system:
```
sudo node weather.js
```

## License
Some parts of this repository are
[MIT License](https://github.com/terox/urweather/blob/master/LICENSE.md)
© [David Pérez Terol](http://www.github.com/terox)

Read the licenses for each adapter in [adapters/](https://github.com/terox/urweather/blob/master/adapters)
