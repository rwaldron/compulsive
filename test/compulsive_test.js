var compulsive = require("../lib/compulsive.js");

// console.log( compulsive );


[
  [ 1000, 1000, 1000, 1000, 1000, 1000, 1000 ],
  [ 0, 100, 500, 1000, 1250, 1500, 2000, 5000 ]
].forEach(function( times, i ) {

  var key = "compulsive.wait " + i;

  exports[ key ] = {
    setUp: function( done ) {
      done();
    }
  };


  times.forEach(function( time, k ) {

    var title = time + ", " + k;

    exports[ key ][ title ] = function( test ) {
      test.expect(1);

      var calledAt = Date.now(),
          expectAt = calledAt + time;

      compulsive.wait( time, function() {
        test.equal( Date.now(), expectAt, title );
        test.done();
      });
    };
  });
})


exports[ "compulsive.loop" ] = {
  setUp: function( done ) {
    done();
  },
  loop: function( test ) {
    test.expect(5);

    var calledAt = Date.now(),
        expectAt = Date.now() + 100,
        counter = 0;



    compulsive.loop( 100, function() {
      test.equal( Date.now(), expectAt );


      expectAt = Date.now() + 100;

      if ( ++counter === 5 ) {
        this.stop();

        test.done();
      }
    });
  }
};


exports[ "compulsive.repeat" ] = {
  setUp: function( done ) {
    done();
  },
  repeat: function( test ) {
    test.expect(6);

    var calledAt = Date.now(),
        expectAt = Date.now() + 100,
        counter = 0;

    compulsive.repeat( 5, 100, function() {
      var now = Date.now();

      test.equal( now, expectAt, "counter " + counter  );

      expectAt = now + 100;

      if ( ++counter === 5 ) {
        test.ok( true, "repeat last" );
        test.done();
      }
    });
  }
};


exports[ "compulsive.queue:wait" ] = {
  setUp: function( done ) {
    done();
  },
  wait: function( test ) {
    test.expect(3);

    var calledAt = Date.now(),
        expectAt = Date.now() + 100,
        counter = 0;

    // Wait queue
    compulsive.queue([
      {
        wait: 100,
        task: function() {
          var now = Date.now();

          test.equal( now, expectAt, "queued fn 1: on time" );
          expectAt = now + 200;
        }
      },
      {
        wait: 200,
        task: function() {
          var now = Date.now();

          test.equal( now, expectAt, "queued fn 2: on time" );
          test.equal( now, calledAt + 300, "queue lapse correct" );

          test.done();
        }
      }
    ]);
  }
};

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

// exports["api"] = {
//   setUp: function(done) {
//     // setup here
//     done();
//   },
//   "no args": function(test) {
//     test.expect(1);
//     // tests here
//     test.equal( typeof compulsive, "function", "should be awesome." );
//     test.done();
//   }
// };
