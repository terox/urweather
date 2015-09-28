# Your Weather
> Small approach to unify all weather stations in a NodeJS way

**Your Weather** is a small library that try to get a normalized way to access to personal
weather stations information.

## Requeriments

* node 0.x or 4.1.x branch.
* node-hid dependencies [depending on your system](https://github.com/node-hid/node-hid#prerequisites).

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
