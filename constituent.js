'use strict';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory((root.constituent = {}));
    }
}(this, function (exports) {
  var constituent = exports;
  var constituentProps = {};

  constituentProps.version = {
    enumarable: true,
    value: '0.1.0'
  };

  constituentProps.extends = {
    value: function(subClass, superClass) {
      if ("parent" in subClass) {
        throw new Error("Does not support multiple inheritance");
      }

      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;

      Object.defineProperty(subClass.prototype, "super", {
        value: superClass.prototype
      });

      Object.defineProperty(subClass, "parent", {
        value: superClass,
        enumerable: true
      });
    }
  };

  constituentProps.extend = {
    value: function (target, args) {
      if(args.length !== 2) {
        throw new Error("method() requires 2 arguments, " + arguments.length + " given");
      }

      if(typeof args[0] === 'string' && typeof args[1] === 'function') {
        Object.defineProperty(target, args[0], {value: args[1]});
      }
      else if(typeof args[0] === 'string' && typeof args[1] === 'object') {
        if (!(typeof args[1].value === 'function'
        || typeof args[1].get === 'function'
        || typeof args[2].set === 'function')) {
          throw new Error("method() object argument's value, get or set property must always be a function");
        }
        Object.defineProperty(target, args[0], args[1]);
      }
      else {
        throw new Exception("invalid argument for method()");
      }
    }
  }

  constituentProps.Class = {
    value: (function () {
      var statics = {
        extends: function(superClass) {
          constituent.extends(this, superClass);
          return this;
        },
        method: function() {
          constituent.extend(this.prototype, arguments);
          return this;
        },
        staticMethod: function() {
          constituent.extend(this, arguments);
          return this;
        }
      };

      function extend(obj, src) {
        Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
        return obj;
      }

      function getStatics(staticProps) {
        var props = {};

        Object.keys(statics).forEach(function(key) {
          if(staticProps) {
            if(key in staticProps) {
              throw new Error("'" + key + "' is a reserved keyword");
            }
          }
          props[key] = statics[key];
        })

        return (staticProps) ? extend(props, staticProps) : props;
      }

      function defineProperties(target, props) {
        Object.keys(props).forEach(function(key) {
          var prop = props[key];

          if(typeof prop === 'function') {
            props[key] = { value: prop };
          }
        });

        Object.defineProperties(target, props);
      }

      return function (Constructor, protoProps, staticProps) {
        defineProperties(Constructor, getStatics(staticProps));
        if (protoProps) defineProperties(Constructor.prototype, protoProps);

        return Constructor;
      };
    })()
  };

  Object.defineProperties(constituent, constituentProps);
}));
