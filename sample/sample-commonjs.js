var constituent = require('../constituent');

var Dog = constituent.Class(function (name) {
  // constructor
  this.name = name;
}, {
  // proto properties
  bark: function() {
    console.log(this.name + ": woof!");
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
  Labrador.parent.printVersion();
}, {
  bark: function() {
    console.log("in Labrador.bark");
    this.super.bark.apply(this, arguments);
  },
  dogsName: {
    get: function () {
      return this.name;
    },
    set: function(newName) {
      this.name = newName;
    }
  }
}).extends(Dog);

var Corgi = constituent.Class(function() {
  console.log("in Corgi constructor");
  Corgi.parent.apply(this, arguments);
}).extends(Dog)
.method("bark", function() {
  console.log("in Corgi.bark");
  this.super.bark.apply(this, arguments);
})
.staticMethod("jump", function() {
  console.log("in Corgi::jump");
});

console.log(Labrador);
var tuttie = new Labrador("tuttie");
tuttie.bark();
tuttie.dogsName = "dolly";

var doge = new Corgi("Doge");
doge.bark();
Corgi.jump();
