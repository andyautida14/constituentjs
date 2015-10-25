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
    <script>
  </head>
  <body>
    <!-- Whatever here -->
  <body>
</html>
```

see [sample-global.html](sample/sample-global.html).
