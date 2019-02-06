/*!
 * Theme name v1.0
 * Based on Bloggerable
 */
/*!
 * Bloggerable v1.0.0 (https://blogger-starter.github.io/bloggerable)
 * Copyright 2017-2018 Igoy Nawamreh (https://twitter.com/igoynawamreh)
 * Licensed under MIT (https://github.com/blogger-starter/bloggerable/blob/master/LICENSE)
 */

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = _interopRequireDefault(require("./util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
var Example =
/*#__PURE__*/
function () {
  function Example() {
    _classCallCheck(this, Example);
  }

  _createClass(Example, null, [{
    key: "callMe",
    value: function callMe() {// console.log(Util.square(5));
      // console.log(Util.multiply(10, 5));
    }
  }]);

  return Example;
}();
/**
 * ------------------------------------------------------------------------
 * Implementation
 * ------------------------------------------------------------------------
 */


Example.callMe();
var _default = Example;
exports.default = _default;

},{"./util":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Util", {
  enumerable: true,
  get: function get() {
    return _util.default;
  }
});
Object.defineProperty(exports, "XmlJs", {
  enumerable: true,
  get: function get() {
    return _xmlJs.default;
  }
});
Object.defineProperty(exports, "Example", {
  enumerable: true,
  get: function get() {
    return _example.default;
  }
});

var _util = _interopRequireDefault(require("./util"));

var _xmlJs = _interopRequireDefault(require("../../dist/bundle/tmp/xml-js"));

var _example = _interopRequireDefault(require("./example"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../../dist/bundle/tmp/xml-js":1,"./example":2,"./util":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * --------------------------------------------------------------------------
 * Public Util
 * --------------------------------------------------------------------------
 */
var Util = {
  square: function square(number) {
    return number * number;
  },
  multiply: function multiply(x, y) {
    return x * y;
  }
};
var _default = Util;
exports.default = _default;

},{}]},{},[3])
//# sourceMappingURL=main.js.map
