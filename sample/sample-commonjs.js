var constituent = require('../constituent');

// create a Class
var Dog = constituent.Class(function (name) {
  // constructor
  console.log("in Dog constructor");
  this.name = name;
}, {
  // proto properties
  bark: function(breed) {
    console.log(this.name + "(" + breed + "): woof!");
  }
}, {
  // static properties
  printVersion: function() {
    console.log(constituent.version);
  }
});

var Labrador = constituent.Class(function() {
  console.log("in Labrador constructor");
  Labrador.parent.apply(this, arguments);
}, {
  bark: function() {
    this.super.bark.call(this, "labrador");
  },
  dogsName: {
    get: function () {
      return this.name;
    },
    set: function(newName) {
      this.name = newName;
    }
  }
}).extends(Dog); // <-- inherits from Dog

var Corgi = constituent.Class(function() {
  console.log("in Corgi constructor");
  Corgi.parent.apply(this, arguments);
}).extends(Dog)
.method("bark", function() {
  this.super.bark.call(this, "corgi");
})
.staticMethod("jump", function() {
  console.log("in Corgi::jump");
});

// instantiation
var tuttie = new Labrador("tuttie");
var doge = new Corgi("Doge");

// method invocations
tuttie.bark();
doge.bark();

// using accessors
tuttie.dogsName = "tuttie 2";
console.log(tuttie.dogsName);

// static methods
Dog.printVersion();
Corgi.jump();

// static methods shall not be heritable
try {
  Corgi.printVersion();
} catch (err) {
  console.log(err.message, "--> static methods are not inheritable");
}

// does not support multiple inheritance
try {
  var Chihuahua = constituent.Class(function() {}).extends(Dog).extends(Dog);
} catch (err) {
  console.log(err.message);
}
