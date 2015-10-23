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
    value: '0.0.1'
  };

  constituentProps.extends = {
    value: function(subClass, superClass) {
      if (Object.hasOwnProperty(subClass, "super")) {
        throw new Error("Does not support multiple inheritance");
      }

      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;

      Object.defineProperty(subClass.prototype, "super", {
        value: superClass.prototype
      });

      Object.defineProperty(subClass, "super", {
        value: superClass,
        enumerable: true
      });
    }
  };

  constituentProps.Class = {
    value: (function () {
      function defineProperties(target, props) {
        var privates = Object.create(target);

        for (var key in props) {
          var prop = props[key];

          if (typeof prop === 'function') {
            props[key] = {
              value: prop
            }
          }
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
          for(var key in staticProps) {
            statics[key] = staticProps[key];
          }
        }

        defineProperties(Constructor, statics);
        if (protoProps) defineProperties(Constructor.prototype, protoProps);

        return Constructor;
      };
    })()
  };

  Object.defineProperties(constituent, constituentProps);
}));
