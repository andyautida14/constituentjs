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
  Labrador.super.apply(this, arguments);
  Labrador.super.printVersion();
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

console.log(Labrador);
var tuttie = new Labrador("tuttie");
tuttie.bark();
tuttie.dogsName = "dolly";
console.log(tuttie.dogsName, tuttie.name);
