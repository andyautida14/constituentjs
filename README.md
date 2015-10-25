# Constituent JS
A small and simple class library for Javascript.

## Usage

### Importing

*in CommonJS:*
```javascript
var constituent = require('/path/to/constituent');

// or
var constituent = require('constituent');
```

see [sample-commonjs.js](sample/sample-commonjs.js).

*in RequireJS:*
```javascript
require.config({
  paths: {
    constituent: '/path/to/constituent'
  }
});
require(['constituent'], function (constituent) {
  // your code here
});
```

see [sample-require.html](sample/sample-require.html) and [sample-require-config.js](sample/sample-require-config.js).

*in browser's global namespace:*
```html
<!DOCTYPE html>
<html>
  <head>
    <script src="path/to/constituent.js"></script>
    <script>
    // now accessible via 'constituent' variable
    </script>
  </head>
  <body>
    <!-- Whatever here -->
  </body>
</html>
```

see [sample-global.html](sample/sample-global.html).

### Class definition
```javascript
var Class = constituent.Class;

function Dog (name) {
  this.name = name;
}

Class(Dog)
.method("bark", function (breed) { // <-- method definition
  console.log(this.name + " (" + breed + "): woof!")
})
.staticMethod("wagTail", function () { // <-- static method definition
  console.log("Not much. Just wagging the tail.");
});
```

### Inheritance
```javascript
function Labrador () {
  Labrador.parent.apply(this, arguments);
}

Class(Labrador)
.extends(Dog) // <-- inherits from Dog
.method("bark", function () { // <-- overriding Dog.bark
  this.super.bark.call(this, "labrador"); // invoking Dog.bark using 'this' as context
});
```

### Instantiation and method invocation
```javascript
var tuttie = new Labrador("tuttie");
tuttie.bark();
Dog.wagTail(); // <-- static method invocation
```

## Licence
[The MIT License](LICENSE)
