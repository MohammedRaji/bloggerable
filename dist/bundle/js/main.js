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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hello = hello;

function hello() {
  return 'Hello';
}

},{}],2:[function(require,module,exports){
"use strict";

var _hello = require("./hello");

var val = (0, _hello.hello)(); // console.log(val);

},{"./hello":1}]},{},[2])
//# sourceMappingURL=main.js.map
