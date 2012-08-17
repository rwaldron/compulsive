# compulsive

Time based event loop process queue

## Getting Started
Install the module with: `npm install compulsive`


## Documentation


### compulsive.wait( ms, callback )

Wait `ms`, execute `callback`.



### compulsive.loop( ms, callback )

Loop `ms`, execute `callback`.


### compulsive.peat( count, ms, callback )

Repeat `count` times, every `ms`, execute `callback`.


### compulsive.queue( list )

Queue tasks.

```js
// list
[
  {
    wait: ms,
    task: function() {}
  }
  ...
]
```



## Examples

```js
var compulsive = require('compulsive');


compulsive.wait( 10, function() {

  // Will execute in 10ms
  // ... doesn't use setTimeout.

});

compulsive.loop( 50, function( control ) {

  // Will execute every 50ms
  // ... doesn't use setTimeout or setInterval.


  // The loop can be stopped via:
  control.stop();
});

compulsive.repeat( 5, 100, function( control ) {

  // Will execute 5 times, every 100ms
  // ... doesn't use setTimeout or setInterval.


  // The repeater loop can be stopped via:
  control.stop();
});


compulsive.queue([
  {
    wait: 100,
    task: function() {
      // 100 from call to execution
    }
  },
  {
    wait: 200,
    task: function() {
      // 100 + 200 = 300ms from call to execution
    }
  }
]);


```




## Contributing
All contributions must adhere to the the [Idiomatic.js Style Guide](https://github.com/rwldrn/idiomatic.js),
by maintaining the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## License
Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>
Licensed under the MIT license.
