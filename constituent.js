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

    Object.defineProperty(constituent, "extends", {
      enumerable: false,
      writable: false,
      configurable: false,
      value: function(subClass, superClass) {
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;

        Object.defineProperty(subClass.prototype, "super", {
          value: superClass.prototype,
          enumarable: false,
          writable: false,
          configurable: false
        });

        Object.defineProperty(subClass, "super", {
          value: superClass,
          enumerable: true,
          writable: false,
          configurable: false
        })
      }
    });

    Object.defineProperty(constituent, "version", {
      enumarable: true,
      writable: false,
      configurable: false,
      value: '0.1.0'
    });

    Object.defineProperty(constituent, "Class", {
      value: (function () {
      function defineProperties(target, props) {
        var key;

        for (key in props) {
          var prop = props[key];
          var descriptor = {};

          if (typeof prop === 'function') {
            descriptor.value = prop;
          }
          else if(typeof prop === 'object') {
            if (prop.hasOwnProperty('value')) {
              descriptor.value = prop.value;
              descriptor.writable = prop.writable || false;
            }
            else if (prop.hasOwnProperty('get') || prop.hasOwnProperty('set')) {
              prop.hasOwnProperty('get') ? descriptor.get = prop.get : null;
              prop.hasOwnProperty('set') ? descriptor.set = prop.set : null;
            }
            else {
              throw new Error("Object arguments for member definitions must have either have 'value', 'get' or 'set'");
            }

            descriptor.enumerable = prop.enumerable || false;
            descriptor.configurable = prop.configurable || false;
          }

          props[key] = descriptor;
        }
        
        Object.defineProperties(target, props);
      }

      return function (Constructor, protoProps, staticProps) {
        var statics = {
          extends: function(superClass) {
            constituent.extends(this, superClass);
            return this;
          }
        };

        if(staticProps) {
          var key;
          for(key in staticProps) {
            statics[key] = staticProps[key];
          }
        }

        defineProperties(Constructor, statics);
        if (protoProps) defineProperties(Constructor.prototype, protoProps);

        return Constructor;
      };
    })()
  });
}));
