/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ (function(module) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ (function(module) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./src/live2d/Framework/src/cubismdefaultparameterid.ts":
/*!**************************************************************!*\
  !*** ./src/live2d/Framework/src/cubismdefaultparameterid.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismDefaultParameterId: function() { return /* binding */ CubismDefaultParameterId; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismdefaultparameterid */ "./src/live2d/Framework/src/cubismdefaultparameterid.ts");
const CubismDefaultParameterId = Object.freeze({
    HitAreaPrefix: 'HitArea',
    HitAreaHead: 'Head',
    HitAreaBody: 'Body',
    PartsIdCore: 'Parts01Core',
    PartsArmPrefix: 'Parts01Arm_',
    PartsArmLPrefix: 'Parts01ArmL_',
    PartsArmRPrefix: 'Parts01ArmR_',
    ParamAngleX: 'ParamAngleX',
    ParamAngleY: 'ParamAngleY',
    ParamAngleZ: 'ParamAngleZ',
    ParamEyeLOpen: 'ParamEyeLOpen',
    ParamEyeLSmile: 'ParamEyeLSmile',
    ParamEyeROpen: 'ParamEyeROpen',
    ParamEyeRSmile: 'ParamEyeRSmile',
    ParamEyeBallX: 'ParamEyeBallX',
    ParamEyeBallY: 'ParamEyeBallY',
    ParamEyeBallForm: 'ParamEyeBallForm',
    ParamBrowLY: 'ParamBrowLY',
    ParamBrowRY: 'ParamBrowRY',
    ParamBrowLX: 'ParamBrowLX',
    ParamBrowRX: 'ParamBrowRX',
    ParamBrowLAngle: 'ParamBrowLAngle',
    ParamBrowRAngle: 'ParamBrowRAngle',
    ParamBrowLForm: 'ParamBrowLForm',
    ParamBrowRForm: 'ParamBrowRForm',
    ParamMouthForm: 'ParamMouthForm',
    ParamMouthOpenY: 'ParamMouthOpenY',
    ParamCheek: 'ParamCheek',
    ParamBodyAngleX: 'ParamBodyAngleX',
    ParamBodyAngleY: 'ParamBodyAngleY',
    ParamBodyAngleZ: 'ParamBodyAngleZ',
    ParamBreath: 'ParamBreath',
    ParamArmLA: 'ParamArmLA',
    ParamArmRA: 'ParamArmRA',
    ParamArmLB: 'ParamArmLB',
    ParamArmRB: 'ParamArmRB',
    ParamHandL: 'ParamHandL',
    ParamHandR: 'ParamHandR',
    ParamHairFront: 'ParamHairFront',
    ParamHairSide: 'ParamHairSide',
    ParamHairBack: 'ParamHairBack',
    ParamHairFluffy: 'ParamHairFluffy',
    ParamShoulderY: 'ParamShoulderY',
    ParamBustX: 'ParamBustX',
    ParamBustY: 'ParamBustY',
    ParamBaseX: 'ParamBaseX',
    ParamBaseY: 'ParamBaseY',
    ParamNONE: 'NONE:',
});

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.HitAreaBody = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.HitAreaBody;
    Live2DCubismFramework.HitAreaHead = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.HitAreaHead;
    Live2DCubismFramework.HitAreaPrefix = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.HitAreaPrefix;
    Live2DCubismFramework.ParamAngleX = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamAngleX;
    Live2DCubismFramework.ParamAngleY = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamAngleY;
    Live2DCubismFramework.ParamAngleZ = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamAngleZ;
    Live2DCubismFramework.ParamArmLA = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamArmLA;
    Live2DCubismFramework.ParamArmLB = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamArmLB;
    Live2DCubismFramework.ParamArmRA = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamArmRA;
    Live2DCubismFramework.ParamArmRB = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamArmRB;
    Live2DCubismFramework.ParamBaseX = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBaseX;
    Live2DCubismFramework.ParamBaseY = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBaseY;
    Live2DCubismFramework.ParamBodyAngleX = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBodyAngleX;
    Live2DCubismFramework.ParamBodyAngleY = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBodyAngleY;
    Live2DCubismFramework.ParamBodyAngleZ = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBodyAngleZ;
    Live2DCubismFramework.ParamBreath = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBreath;
    Live2DCubismFramework.ParamBrowLAngle = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBrowLAngle;
    Live2DCubismFramework.ParamBrowLForm = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBrowLForm;
    Live2DCubismFramework.ParamBrowLX = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBrowLX;
    Live2DCubismFramework.ParamBrowLY = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBrowLY;
    Live2DCubismFramework.ParamBrowRAngle = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBrowRAngle;
    Live2DCubismFramework.ParamBrowRForm = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBrowRForm;
    Live2DCubismFramework.ParamBrowRX = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBrowRX;
    Live2DCubismFramework.ParamBrowRY = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBrowRY;
    Live2DCubismFramework.ParamBustX = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBustX;
    Live2DCubismFramework.ParamBustY = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamBustY;
    Live2DCubismFramework.ParamCheek = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamCheek;
    Live2DCubismFramework.ParamEyeBallForm = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamEyeBallForm;
    Live2DCubismFramework.ParamEyeBallX = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamEyeBallX;
    Live2DCubismFramework.ParamEyeBallY = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamEyeBallY;
    Live2DCubismFramework.ParamEyeLOpen = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamEyeLOpen;
    Live2DCubismFramework.ParamEyeLSmile = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamEyeLSmile;
    Live2DCubismFramework.ParamEyeROpen = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamEyeROpen;
    Live2DCubismFramework.ParamEyeRSmile = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamEyeRSmile;
    Live2DCubismFramework.ParamHairBack = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamHairBack;
    Live2DCubismFramework.ParamHairFluffy = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamHairFluffy;
    Live2DCubismFramework.ParamHairFront = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamHairFront;
    Live2DCubismFramework.ParamHairSide = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamHairSide;
    Live2DCubismFramework.ParamHandL = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamHandL;
    Live2DCubismFramework.ParamHandR = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamHandR;
    Live2DCubismFramework.ParamMouthForm = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamMouthForm;
    Live2DCubismFramework.ParamMouthOpenY = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamMouthOpenY;
    Live2DCubismFramework.ParamNONE = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamNONE;
    Live2DCubismFramework.ParamShoulderY = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.ParamShoulderY;
    Live2DCubismFramework.PartsArmLPrefix = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.PartsArmLPrefix;
    Live2DCubismFramework.PartsArmPrefix = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.PartsArmPrefix;
    Live2DCubismFramework.PartsArmRPrefix = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.PartsArmRPrefix;
    Live2DCubismFramework.PartsIdCore = _cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_0__.CubismDefaultParameterId.PartsIdCore;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/cubismframeworkconfig.ts":
/*!***********************************************************!*\
  !*** ./src/live2d/Framework/src/cubismframeworkconfig.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSM_LOG_LEVEL: function() { return /* binding */ CSM_LOG_LEVEL; },
/* harmony export */   CSM_LOG_LEVEL_DEBUG: function() { return /* binding */ CSM_LOG_LEVEL_DEBUG; },
/* harmony export */   CSM_LOG_LEVEL_ERROR: function() { return /* binding */ CSM_LOG_LEVEL_ERROR; },
/* harmony export */   CSM_LOG_LEVEL_INFO: function() { return /* binding */ CSM_LOG_LEVEL_INFO; },
/* harmony export */   CSM_LOG_LEVEL_OFF: function() { return /* binding */ CSM_LOG_LEVEL_OFF; },
/* harmony export */   CSM_LOG_LEVEL_VERBOSE: function() { return /* binding */ CSM_LOG_LEVEL_VERBOSE; },
/* harmony export */   CSM_LOG_LEVEL_WARNING: function() { return /* binding */ CSM_LOG_LEVEL_WARNING; }
/* harmony export */ });
const CSM_LOG_LEVEL_VERBOSE = 0;
const CSM_LOG_LEVEL_DEBUG = 1;
const CSM_LOG_LEVEL_INFO = 2;
const CSM_LOG_LEVEL_WARNING = 3;
const CSM_LOG_LEVEL_ERROR = 4;
const CSM_LOG_LEVEL_OFF = 5;
const CSM_LOG_LEVEL = CSM_LOG_LEVEL_VERBOSE;


/***/ }),

/***/ "./src/live2d/Framework/src/cubismmodelsettingjson.ts":
/*!************************************************************!*\
  !*** ./src/live2d/Framework/src/cubismmodelsettingjson.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismModelSettingJson: function() { return /* binding */ CubismModelSettingJson; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _icubismmodelsetting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icubismmodelsetting */ "./src/live2d/Framework/src/icubismmodelsetting.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/cubismjson */ "./src/live2d/Framework/src/utils/cubismjson.ts");
/* harmony import */ var _cubismmodelsettingjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cubismmodelsettingjson */ "./src/live2d/Framework/src/cubismmodelsettingjson.ts");




const Version = 'Version';
const FileReferences = 'FileReferences';
const Groups = 'Groups';
const Layout = 'Layout';
const HitAreas = 'HitAreas';
const Moc = 'Moc';
const Textures = 'Textures';
const Physics = 'Physics';
const Pose = 'Pose';
const Expressions = 'Expressions';
const Motions = 'Motions';
const UserData = 'UserData';
const Name = 'Name';
const FilePath = 'File';
const Id = 'Id';
const Ids = 'Ids';
const Target = 'Target';
const Idle = 'Idle';
const TapBody = 'TapBody';
const PinchIn = 'PinchIn';
const PinchOut = 'PinchOut';
const Shake = 'Shake';
const FlickHead = 'FlickHead';
const Parameter = 'Parameter';
const SoundPath = 'Sound';
const FadeInTime = 'FadeInTime';
const FadeOutTime = 'FadeOutTime';
const CenterX = 'CenterX';
const CenterY = 'CenterY';
const X = 'X';
const Y = 'Y';
const Width = 'Width';
const Height = 'Height';
const LipSync = 'LipSync';
const EyeBlink = 'EyeBlink';
const InitParameter = 'init_param';
const InitPartsVisible = 'init_parts_visible';
const Val = 'val';
var FrequestNode;
(function (FrequestNode) {
    FrequestNode[FrequestNode["FrequestNode_Groups"] = 0] = "FrequestNode_Groups";
    FrequestNode[FrequestNode["FrequestNode_Moc"] = 1] = "FrequestNode_Moc";
    FrequestNode[FrequestNode["FrequestNode_Motions"] = 2] = "FrequestNode_Motions";
    FrequestNode[FrequestNode["FrequestNode_Expressions"] = 3] = "FrequestNode_Expressions";
    FrequestNode[FrequestNode["FrequestNode_Textures"] = 4] = "FrequestNode_Textures";
    FrequestNode[FrequestNode["FrequestNode_Physics"] = 5] = "FrequestNode_Physics";
    FrequestNode[FrequestNode["FrequestNode_Pose"] = 6] = "FrequestNode_Pose";
    FrequestNode[FrequestNode["FrequestNode_HitAreas"] = 7] = "FrequestNode_HitAreas";
})(FrequestNode || (FrequestNode = {}));
class CubismModelSettingJson extends _icubismmodelsetting__WEBPACK_IMPORTED_MODULE_0__.ICubismModelSetting {
    constructor(buffer, size) {
        super();
        this._json = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_3__.CubismJson.create(buffer, size);
        if (this._json) {
            this._jsonValue = new _type_csmvector__WEBPACK_IMPORTED_MODULE_2__.csmVector();
            this._jsonValue.pushBack(this._json.getRoot().getValueByString(Groups));
            this._jsonValue.pushBack(this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Moc));
            this._jsonValue.pushBack(this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Motions));
            this._jsonValue.pushBack(this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Expressions));
            this._jsonValue.pushBack(this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Textures));
            this._jsonValue.pushBack(this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Physics));
            this._jsonValue.pushBack(this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Pose));
            this._jsonValue.pushBack(this._json.getRoot().getValueByString(HitAreas));
        }
    }
    release() {
        _utils_cubismjson__WEBPACK_IMPORTED_MODULE_3__.CubismJson["delete"](this._json);
        this._jsonValue = null;
    }
    GetJson() {
        return this._json;
    }
    getModelFileName() {
        if (!this.isExistModelFile()) {
            return '';
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_Moc).getRawString();
    }
    getTextureCount() {
        if (!this.isExistTextureFiles()) {
            return 0;
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getSize();
    }
    getTextureDirectory() {
        const texturePath = this._jsonValue
            .at(FrequestNode.FrequestNode_Textures)
            .getValueByIndex(0)
            .getRawString();
        const pathArray = texturePath.split('/');
        const arrayLength = pathArray.length - 1;
        let textureDirectoryStr = '';
        for (let i = 0; i < arrayLength; i++) {
            textureDirectoryStr += pathArray[i];
            if (i < arrayLength - 1) {
                textureDirectoryStr += '/';
            }
        }
        return textureDirectoryStr;
    }
    getTextureFileName(index) {
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Textures)
            .getValueByIndex(index)
            .getRawString();
    }
    getHitAreasCount() {
        if (!this.isExistHitAreas()) {
            return 0;
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getSize();
    }
    getHitAreaId(index) {
        return _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.CubismFramework.getIdManager().getId(this._jsonValue
            .at(FrequestNode.FrequestNode_HitAreas)
            .getValueByIndex(index)
            .getValueByString(Id)
            .getRawString());
    }
    getHitAreaName(index) {
        return this._jsonValue
            .at(FrequestNode.FrequestNode_HitAreas)
            .getValueByIndex(index)
            .getValueByString(Name)
            .getRawString();
    }
    getPhysicsFileName() {
        if (!this.isExistPhysicsFile()) {
            return '';
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_Physics).getRawString();
    }
    getPoseFileName() {
        if (!this.isExistPoseFile()) {
            return '';
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_Pose).getRawString();
    }
    getExpressionCount() {
        if (!this.isExistExpressionFile()) {
            return 0;
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getSize();
    }
    getExpressionName(index) {
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Expressions)
            .getValueByIndex(index)
            .getValueByString(Name)
            .getRawString();
    }
    getExpressionFileName(index) {
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Expressions)
            .getValueByIndex(index)
            .getValueByString(FilePath)
            .getRawString();
    }
    getMotionGroupCount() {
        if (!this.isExistMotionGroups()) {
            return 0;
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getKeys()
            .getSize();
    }
    getMotionGroupName(index) {
        if (!this.isExistMotionGroups()) {
            return null;
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getKeys()
            .at(index);
    }
    getMotionCount(groupName) {
        if (!this.isExistMotionGroupName(groupName)) {
            return 0;
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getSize();
    }
    getMotionFileName(groupName, index) {
        if (!this.isExistMotionGroupName(groupName)) {
            return '';
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(FilePath)
            .getRawString();
    }
    getMotionSoundFileName(groupName, index) {
        if (!this.isExistMotionSoundFile(groupName, index)) {
            return '';
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(SoundPath)
            .getRawString();
    }
    getMotionFadeInTimeValue(groupName, index) {
        if (!this.isExistMotionFadeIn(groupName, index)) {
            return -1.0;
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(FadeInTime)
            .toFloat();
    }
    getMotionFadeOutTimeValue(groupName, index) {
        if (!this.isExistMotionFadeOut(groupName, index)) {
            return -1.0;
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(FadeOutTime)
            .toFloat();
    }
    getUserDataFile() {
        if (!this.isExistUserDataFile()) {
            return '';
        }
        return this._json
            .getRoot()
            .getValueByString(FileReferences)
            .getValueByString(UserData)
            .getRawString();
    }
    getLayoutMap(outLayoutMap) {
        const map = this._json
            .getRoot()
            .getValueByString(Layout)
            .getMap();
        if (map == null) {
            return false;
        }
        let ret = false;
        for (const ite = map.begin(); ite.notEqual(map.end()); ite.preIncrement()) {
            outLayoutMap.setValue(ite.ptr().first, ite.ptr().second.toFloat());
            ret = true;
        }
        return ret;
    }
    getEyeBlinkParameterCount() {
        if (!this.isExistEyeBlinkParameters()) {
            return 0;
        }
        let num = 0;
        for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            const refI = this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
                continue;
            }
            if (refI.getValueByString(Name).getRawString() == EyeBlink) {
                num = refI.getValueByString(Ids).getVector().getSize();
                break;
            }
        }
        return num;
    }
    getEyeBlinkParameterId(index) {
        if (!this.isExistEyeBlinkParameters()) {
            return null;
        }
        for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            const refI = this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
                continue;
            }
            if (refI.getValueByString(Name).getRawString() == EyeBlink) {
                return _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.CubismFramework.getIdManager().getId(refI.getValueByString(Ids).getValueByIndex(index).getRawString());
            }
        }
        return null;
    }
    getLipSyncParameterCount() {
        if (!this.isExistLipSyncParameters()) {
            return 0;
        }
        let num = 0;
        for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            const refI = this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
                continue;
            }
            if (refI.getValueByString(Name).getRawString() == LipSync) {
                num = refI.getValueByString(Ids).getVector().getSize();
                break;
            }
        }
        return num;
    }
    getLipSyncParameterId(index) {
        if (!this.isExistLipSyncParameters()) {
            return null;
        }
        for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            const refI = this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
                continue;
            }
            if (refI.getValueByString(Name).getRawString() == LipSync) {
                return _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.CubismFramework.getIdManager().getId(refI.getValueByString(Ids).getValueByIndex(index).getRawString());
            }
        }
        return null;
    }
    isExistModelFile() {
        const node = this._jsonValue.at(FrequestNode.FrequestNode_Moc);
        return !node.isNull() && !node.isError();
    }
    isExistTextureFiles() {
        const node = this._jsonValue.at(FrequestNode.FrequestNode_Textures);
        return !node.isNull() && !node.isError();
    }
    isExistHitAreas() {
        const node = this._jsonValue.at(FrequestNode.FrequestNode_HitAreas);
        return !node.isNull() && !node.isError();
    }
    isExistPhysicsFile() {
        const node = this._jsonValue.at(FrequestNode.FrequestNode_Physics);
        return !node.isNull() && !node.isError();
    }
    isExistPoseFile() {
        const node = this._jsonValue.at(FrequestNode.FrequestNode_Pose);
        return !node.isNull() && !node.isError();
    }
    isExistExpressionFile() {
        const node = this._jsonValue.at(FrequestNode.FrequestNode_Expressions);
        return !node.isNull() && !node.isError();
    }
    isExistMotionGroups() {
        const node = this._jsonValue.at(FrequestNode.FrequestNode_Motions);
        return !node.isNull() && !node.isError();
    }
    isExistMotionGroupName(groupName) {
        const node = this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName);
        return !node.isNull() && !node.isError();
    }
    isExistMotionSoundFile(groupName, index) {
        const node = this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(SoundPath);
        return !node.isNull() && !node.isError();
    }
    isExistMotionFadeIn(groupName, index) {
        const node = this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(FadeInTime);
        return !node.isNull() && !node.isError();
    }
    isExistMotionFadeOut(groupName, index) {
        const node = this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(FadeOutTime);
        return !node.isNull() && !node.isError();
    }
    isExistUserDataFile() {
        const node = this._json
            .getRoot()
            .getValueByString(FileReferences)
            .getValueByString(UserData);
        return !node.isNull() && !node.isError();
    }
    isExistEyeBlinkParameters() {
        if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() ||
            this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
            return false;
        }
        for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
            if (this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i)
                .getValueByString(Name)
                .getRawString() == EyeBlink) {
                return true;
            }
        }
        return false;
    }
    isExistLipSyncParameters() {
        if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() ||
            this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
            return false;
        }
        for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
            if (this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i)
                .getValueByString(Name)
                .getRawString() == LipSync) {
                return true;
            }
        }
        return false;
    }
    _json;
    _jsonValue;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModelSettingJson = _cubismmodelsettingjson__WEBPACK_IMPORTED_MODULE_4__.CubismModelSettingJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/effect/cubismbreath.ts":
/*!*********************************************************!*\
  !*** ./src/live2d/Framework/src/effect/cubismbreath.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BreathParameterData: function() { return /* binding */ BreathParameterData; },
/* harmony export */   CubismBreath: function() { return /* binding */ CubismBreath; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismbreath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismbreath */ "./src/live2d/Framework/src/effect/cubismbreath.ts");
class CubismBreath {
    static create() {
        return new CubismBreath();
    }
    static delete(instance) {
        if (instance != null) {
            instance = null;
        }
    }
    setParameters(breathParameters) {
        this._breathParameters = breathParameters;
    }
    getParameters() {
        return this._breathParameters;
    }
    updateParameters(model, deltaTimeSeconds) {
        this._currentTime += deltaTimeSeconds;
        const t = this._currentTime * 2.0 * 3.14159;
        for (let i = 0; i < this._breathParameters.getSize(); ++i) {
            const data = this._breathParameters.at(i);
            model.addParameterValueById(data.parameterId, data.offset + data.peak * Math.sin(t / data.cycle), data.weight);
        }
    }
    constructor() {
        this._currentTime = 0.0;
    }
    _breathParameters;
    _currentTime;
}
class BreathParameterData {
    constructor(parameterId, offset, peak, cycle, weight) {
        this.parameterId = parameterId == undefined ? null : parameterId;
        this.offset = offset == undefined ? 0.0 : offset;
        this.peak = peak == undefined ? 0.0 : peak;
        this.cycle = cycle == undefined ? 0.0 : cycle;
        this.weight = weight == undefined ? 0.0 : weight;
    }
    parameterId;
    offset;
    peak;
    cycle;
    weight;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.BreathParameterData = _cubismbreath__WEBPACK_IMPORTED_MODULE_0__.BreathParameterData;
    Live2DCubismFramework.CubismBreath = _cubismbreath__WEBPACK_IMPORTED_MODULE_0__.CubismBreath;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/effect/cubismeyeblink.ts":
/*!***********************************************************!*\
  !*** ./src/live2d/Framework/src/effect/cubismeyeblink.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismEyeBlink: function() { return /* binding */ CubismEyeBlink; },
/* harmony export */   EyeState: function() { return /* binding */ EyeState; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _cubismeyeblink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismeyeblink */ "./src/live2d/Framework/src/effect/cubismeyeblink.ts");

class CubismEyeBlink {
    static create(modelSetting = null) {
        return new CubismEyeBlink(modelSetting);
    }
    static delete(eyeBlink) {
        if (eyeBlink != null) {
            eyeBlink = null;
        }
    }
    setBlinkingInterval(blinkingInterval) {
        this._blinkingIntervalSeconds = blinkingInterval;
    }
    setBlinkingSetting(closing, closed, opening) {
        this._closingSeconds = closing;
        this._closedSeconds = closed;
        this._openingSeconds = opening;
    }
    setParameterIds(parameterIds) {
        this._parameterIds = parameterIds;
    }
    getParameterIds() {
        return this._parameterIds;
    }
    updateParameters(model, deltaTimeSeconds) {
        this._userTimeSeconds += deltaTimeSeconds;
        let parameterValue;
        let t = 0.0;
        switch (this._blinkingState) {
            case EyeState.EyeState_Closing:
                t =
                    (this._userTimeSeconds - this._stateStartTimeSeconds) /
                        this._closingSeconds;
                if (t >= 1.0) {
                    t = 1.0;
                    this._blinkingState = EyeState.EyeState_Closed;
                    this._stateStartTimeSeconds = this._userTimeSeconds;
                }
                parameterValue = 1.0 - t;
                break;
            case EyeState.EyeState_Closed:
                t =
                    (this._userTimeSeconds - this._stateStartTimeSeconds) /
                        this._closedSeconds;
                if (t >= 1.0) {
                    this._blinkingState = EyeState.EyeState_Opening;
                    this._stateStartTimeSeconds = this._userTimeSeconds;
                }
                parameterValue = 0.0;
                break;
            case EyeState.EyeState_Opening:
                t =
                    (this._userTimeSeconds - this._stateStartTimeSeconds) /
                        this._openingSeconds;
                if (t >= 1.0) {
                    t = 1.0;
                    this._blinkingState = EyeState.EyeState_Interval;
                    this._nextBlinkingTime = this.determinNextBlinkingTiming();
                }
                parameterValue = t;
                break;
            case EyeState.EyeState_Interval:
                if (this._nextBlinkingTime < this._userTimeSeconds) {
                    this._blinkingState = EyeState.EyeState_Closing;
                    this._stateStartTimeSeconds = this._userTimeSeconds;
                }
                parameterValue = 1.0;
                break;
            case EyeState.EyeState_First:
            default:
                this._blinkingState = EyeState.EyeState_Interval;
                this._nextBlinkingTime = this.determinNextBlinkingTiming();
                parameterValue = 1.0;
                break;
        }
        if (!CubismEyeBlink.CloseIfZero) {
            parameterValue = -parameterValue;
        }
        for (let i = 0; i < this._parameterIds.getSize(); ++i) {
            model.setParameterValueById(this._parameterIds.at(i), parameterValue);
        }
    }
    constructor(modelSetting) {
        this._blinkingState = EyeState.EyeState_First;
        this._nextBlinkingTime = 0.0;
        this._stateStartTimeSeconds = 0.0;
        this._blinkingIntervalSeconds = 4.0;
        this._closingSeconds = 0.1;
        this._closedSeconds = 0.05;
        this._openingSeconds = 0.15;
        this._userTimeSeconds = 0.0;
        this._parameterIds = new _type_csmvector__WEBPACK_IMPORTED_MODULE_0__.csmVector();
        if (modelSetting == null) {
            return;
        }
        for (let i = 0; i < modelSetting.getEyeBlinkParameterCount(); ++i) {
            this._parameterIds.pushBack(modelSetting.getEyeBlinkParameterId(i));
        }
    }
    determinNextBlinkingTiming() {
        const r = Math.random();
        return (this._userTimeSeconds + r * (2.0 * this._blinkingIntervalSeconds - 1.0));
    }
    _blinkingState;
    _parameterIds;
    _nextBlinkingTime;
    _stateStartTimeSeconds;
    _blinkingIntervalSeconds;
    _closingSeconds;
    _closedSeconds;
    _openingSeconds;
    _userTimeSeconds;
    static CloseIfZero = true;
}

var EyeState;
(function (EyeState) {
    EyeState[EyeState["EyeState_First"] = 0] = "EyeState_First";
    EyeState[EyeState["EyeState_Interval"] = 1] = "EyeState_Interval";
    EyeState[EyeState["EyeState_Closing"] = 2] = "EyeState_Closing";
    EyeState[EyeState["EyeState_Closed"] = 3] = "EyeState_Closed";
    EyeState[EyeState["EyeState_Opening"] = 4] = "EyeState_Opening";
})(EyeState || (EyeState = {}));

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismEyeBlink = _cubismeyeblink__WEBPACK_IMPORTED_MODULE_1__.CubismEyeBlink;
    Live2DCubismFramework.EyeState = _cubismeyeblink__WEBPACK_IMPORTED_MODULE_1__.EyeState;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/effect/cubismpose.ts":
/*!*******************************************************!*\
  !*** ./src/live2d/Framework/src/effect/cubismpose.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismPose: function() { return /* binding */ CubismPose; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   PartData: function() { return /* binding */ PartData; }
/* harmony export */ });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/cubismjson */ "./src/live2d/Framework/src/utils/cubismjson.ts");
/* harmony import */ var _cubismpose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cubismpose */ "./src/live2d/Framework/src/effect/cubismpose.ts");



const Epsilon = 0.001;
const DefaultFadeInSeconds = 0.5;
const FadeIn = 'FadeInTime';
const Link = 'Link';
const Groups = 'Groups';
const Id = 'Id';
class CubismPose {
    static create(pose3json, size) {
        const ret = new CubismPose();
        const json = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__.CubismJson.create(pose3json, size);
        const root = json.getRoot();
        if (!root.getValueByString(FadeIn).isNull()) {
            ret._fadeTimeSeconds = root
                .getValueByString(FadeIn)
                .toFloat(DefaultFadeInSeconds);
            if (ret._fadeTimeSeconds <= 0.0) {
                ret._fadeTimeSeconds = DefaultFadeInSeconds;
            }
        }
        const poseListInfo = root.getValueByString(Groups);
        const poseCount = poseListInfo.getSize();
        for (let poseIndex = 0; poseIndex < poseCount; ++poseIndex) {
            const idListInfo = poseListInfo.getValueByIndex(poseIndex);
            const idCount = idListInfo.getSize();
            let groupCount = 0;
            for (let groupIndex = 0; groupIndex < idCount; ++groupIndex) {
                const partInfo = idListInfo.getValueByIndex(groupIndex);
                const partData = new PartData();
                const parameterId = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(partInfo.getValueByString(Id).getRawString());
                partData.partId = parameterId;
                if (!partInfo.getValueByString(Link).isNull()) {
                    const linkListInfo = partInfo.getValueByString(Link);
                    const linkCount = linkListInfo.getSize();
                    for (let linkIndex = 0; linkIndex < linkCount; ++linkIndex) {
                        const linkPart = new PartData();
                        const linkId = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(linkListInfo.getValueByIndex(linkIndex).getString());
                        linkPart.partId = linkId;
                        partData.link.pushBack(linkPart);
                    }
                }
                ret._partGroups.pushBack(partData.clone());
                ++groupCount;
            }
            ret._partGroupCounts.pushBack(groupCount);
        }
        _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__.CubismJson["delete"](json);
        return ret;
    }
    static delete(pose) {
        if (pose != null) {
            pose = null;
        }
    }
    updateParameters(model, deltaTimeSeconds) {
        if (model != this._lastModel) {
            this.reset(model);
        }
        this._lastModel = model;
        if (deltaTimeSeconds < 0.0) {
            deltaTimeSeconds = 0.0;
        }
        let beginIndex = 0;
        for (let i = 0; i < this._partGroupCounts.getSize(); i++) {
            const partGroupCount = this._partGroupCounts.at(i);
            this.doFade(model, deltaTimeSeconds, beginIndex, partGroupCount);
            beginIndex += partGroupCount;
        }
        this.copyPartOpacities(model);
    }
    reset(model) {
        let beginIndex = 0;
        for (let i = 0; i < this._partGroupCounts.getSize(); ++i) {
            const groupCount = this._partGroupCounts.at(i);
            for (let j = beginIndex; j < beginIndex + groupCount; ++j) {
                this._partGroups.at(j).initialize(model);
                const partsIndex = this._partGroups.at(j).partIndex;
                const paramIndex = this._partGroups.at(j).parameterIndex;
                if (partsIndex < 0) {
                    continue;
                }
                model.setPartOpacityByIndex(partsIndex, j == beginIndex ? 1.0 : 0.0);
                model.setParameterValueByIndex(paramIndex, j == beginIndex ? 1.0 : 0.0);
                for (let k = 0; k < this._partGroups.at(j).link.getSize(); ++k) {
                    this._partGroups.at(j).link.at(k).initialize(model);
                }
            }
            beginIndex += groupCount;
        }
    }
    copyPartOpacities(model) {
        for (let groupIndex = 0; groupIndex < this._partGroups.getSize(); ++groupIndex) {
            const partData = this._partGroups.at(groupIndex);
            if (partData.link.getSize() == 0) {
                continue;
            }
            const partIndex = this._partGroups.at(groupIndex).partIndex;
            const opacity = model.getPartOpacityByIndex(partIndex);
            for (let linkIndex = 0; linkIndex < partData.link.getSize(); ++linkIndex) {
                const linkPart = partData.link.at(linkIndex);
                const linkPartIndex = linkPart.partIndex;
                if (linkPartIndex < 0) {
                    continue;
                }
                model.setPartOpacityByIndex(linkPartIndex, opacity);
            }
        }
    }
    doFade(model, deltaTimeSeconds, beginIndex, partGroupCount) {
        let visiblePartIndex = -1;
        let newOpacity = 1.0;
        const phi = 0.5;
        const backOpacityThreshold = 0.15;
        for (let i = beginIndex; i < beginIndex + partGroupCount; ++i) {
            const partIndex = this._partGroups.at(i).partIndex;
            const paramIndex = this._partGroups.at(i).parameterIndex;
            if (model.getParameterValueByIndex(paramIndex) > Epsilon) {
                if (visiblePartIndex >= 0) {
                    break;
                }
                visiblePartIndex = i;
                newOpacity = model.getPartOpacityByIndex(partIndex);
                newOpacity += deltaTimeSeconds / this._fadeTimeSeconds;
                if (newOpacity > 1.0) {
                    newOpacity = 1.0;
                }
            }
        }
        if (visiblePartIndex < 0) {
            visiblePartIndex = 0;
            newOpacity = 1.0;
        }
        for (let i = beginIndex; i < beginIndex + partGroupCount; ++i) {
            const partsIndex = this._partGroups.at(i).partIndex;
            if (visiblePartIndex == i) {
                model.setPartOpacityByIndex(partsIndex, newOpacity);
            }
            else {
                let opacity = model.getPartOpacityByIndex(partsIndex);
                let a1;
                if (newOpacity < phi) {
                    a1 = (newOpacity * (phi - 1)) / phi + 1.0;
                }
                else {
                    a1 = ((1 - newOpacity) * phi) / (1.0 - phi);
                }
                const backOpacity = (1.0 - a1) * (1.0 - newOpacity);
                if (backOpacity > backOpacityThreshold) {
                    a1 = 1.0 - backOpacityThreshold / (1.0 - newOpacity);
                }
                if (opacity > a1) {
                    opacity = a1;
                }
                model.setPartOpacityByIndex(partsIndex, opacity);
            }
        }
    }
    constructor() {
        this._fadeTimeSeconds = DefaultFadeInSeconds;
        this._lastModel = null;
        this._partGroups = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
        this._partGroupCounts = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
    }
    _partGroups;
    _partGroupCounts;
    _fadeTimeSeconds;
    _lastModel;
}
class PartData {
    constructor(v) {
        this.parameterIndex = 0;
        this.partIndex = 0;
        this.link = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
        if (v != undefined) {
            this.partId = v.partId;
            for (const ite = v.link.begin(); ite.notEqual(v.link.end()); ite.preIncrement()) {
                this.link.pushBack(ite.ptr().clone());
            }
        }
    }
    assignment(v) {
        this.partId = v.partId;
        for (const ite = v.link.begin(); ite.notEqual(v.link.end()); ite.preIncrement()) {
            this.link.pushBack(ite.ptr().clone());
        }
        return this;
    }
    initialize(model) {
        this.parameterIndex = model.getParameterIndex(this.partId);
        this.partIndex = model.getPartIndex(this.partId);
        model.setParameterValueByIndex(this.parameterIndex, 1);
    }
    clone() {
        const clonePartData = new PartData();
        clonePartData.partId = this.partId;
        clonePartData.parameterIndex = this.parameterIndex;
        clonePartData.partIndex = this.partIndex;
        clonePartData.link = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
        for (let ite = this.link.begin(); ite.notEqual(this.link.end()); ite.increment()) {
            clonePartData.link.pushBack(ite.ptr().clone());
        }
        return clonePartData;
    }
    partId;
    parameterIndex;
    partIndex;
    link;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismPose = _cubismpose__WEBPACK_IMPORTED_MODULE_3__.CubismPose;
    Live2DCubismFramework.PartData = _cubismpose__WEBPACK_IMPORTED_MODULE_3__.PartData;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/icubismmodelsetting.ts":
/*!*********************************************************!*\
  !*** ./src/live2d/Framework/src/icubismmodelsetting.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ICubismModelSetting: function() { return /* binding */ ICubismModelSetting; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _icubismmodelsetting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icubismmodelsetting */ "./src/live2d/Framework/src/icubismmodelsetting.ts");
class ICubismModelSetting {
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.ICubismModelSetting = _icubismmodelsetting__WEBPACK_IMPORTED_MODULE_0__.ICubismModelSetting;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/id/cubismid.ts":
/*!*************************************************!*\
  !*** ./src/live2d/Framework/src/id/cubismid.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismId: function() { return /* binding */ CubismId; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _type_csmstring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/csmstring */ "./src/live2d/Framework/src/type/csmstring.ts");
/* harmony import */ var _cubismid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismid */ "./src/live2d/Framework/src/id/cubismid.ts");

class CubismId {
    getString() {
        return this._id;
    }
    constructor(id) {
        if (typeof id === 'string') {
            this._id = new _type_csmstring__WEBPACK_IMPORTED_MODULE_0__.csmString(id);
            return;
        }
        this._id = id;
    }
    isEqual(c) {
        if (typeof c === 'string') {
            return this._id.isEqual(c);
        }
        else if (c instanceof _type_csmstring__WEBPACK_IMPORTED_MODULE_0__.csmString) {
            return this._id.isEqual(c.s);
        }
        else if (c instanceof CubismId) {
            return this._id.isEqual(c._id.s);
        }
        return false;
    }
    isNotEqual(c) {
        if (typeof c == 'string') {
            return !this._id.isEqual(c);
        }
        else if (c instanceof _type_csmstring__WEBPACK_IMPORTED_MODULE_0__.csmString) {
            return !this._id.isEqual(c.s);
        }
        else if (c instanceof CubismId) {
            return !this._id.isEqual(c._id.s);
        }
        return false;
    }
    _id;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismId = _cubismid__WEBPACK_IMPORTED_MODULE_1__.CubismId;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/id/cubismidmanager.ts":
/*!********************************************************!*\
  !*** ./src/live2d/Framework/src/id/cubismidmanager.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismIdManager: function() { return /* binding */ CubismIdManager; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _cubismid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismid */ "./src/live2d/Framework/src/id/cubismid.ts");
/* harmony import */ var _cubismidmanager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubismidmanager */ "./src/live2d/Framework/src/id/cubismidmanager.ts");


class CubismIdManager {
    constructor() {
        this._ids = new _type_csmvector__WEBPACK_IMPORTED_MODULE_0__.csmVector();
    }
    release() {
        for (let i = 0; i < this._ids.getSize(); ++i) {
            this._ids.set(i, void 0);
        }
        this._ids = null;
    }
    registerIds(ids) {
        for (let i = 0; i < ids.length; i++) {
            this.registerId(ids[i]);
        }
    }
    registerId(id) {
        let result = null;
        if ('string' == typeof id) {
            if ((result = this.findId(id)) != null) {
                return result;
            }
            result = new _cubismid__WEBPACK_IMPORTED_MODULE_1__.CubismId(id);
            this._ids.pushBack(result);
        }
        else {
            return this.registerId(id.s);
        }
        return result;
    }
    getId(id) {
        return this.registerId(id);
    }
    isExist(id) {
        if ('string' == typeof id) {
            return this.findId(id) != null;
        }
        return this.isExist(id.s);
    }
    findId(id) {
        for (let i = 0; i < this._ids.getSize(); ++i) {
            if (this._ids.at(i).getString().isEqual(id)) {
                return this._ids.at(i);
            }
        }
        return null;
    }
    _ids;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismIdManager = _cubismidmanager__WEBPACK_IMPORTED_MODULE_2__.CubismIdManager;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/live2dcubismframework.ts":
/*!***********************************************************!*\
  !*** ./src/live2d/Framework/src/live2dcubismframework.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Constant: function() { return /* binding */ Constant; },
/* harmony export */   CubismFramework: function() { return /* binding */ CubismFramework; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   LogLevel: function() { return /* binding */ LogLevel; },
/* harmony export */   Option: function() { return /* binding */ Option; },
/* harmony export */   csmDelete: function() { return /* binding */ csmDelete; },
/* harmony export */   strtod: function() { return /* binding */ strtod; }
/* harmony export */ });
/* harmony import */ var _id_cubismidmanager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id/cubismidmanager */ "./src/live2d/Framework/src/id/cubismidmanager.ts");
/* harmony import */ var _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rendering/cubismrenderer */ "./src/live2d/Framework/src/rendering/cubismrenderer.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/cubismjson */ "./src/live2d/Framework/src/utils/cubismjson.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");




function strtod(s, endPtr) {
    let index = 0;
    for (let i = 1;; i++) {
        const testC = s.slice(i - 1, i);
        if (testC == 'e' || testC == '-' || testC == 'E') {
            continue;
        }
        const test = s.substring(0, i);
        const number = Number(test);
        if (isNaN(number)) {
            break;
        }
        index = i;
    }
    let d = parseFloat(s);
    if (isNaN(d)) {
        d = NaN;
    }
    endPtr[0] = s.slice(index);
    return d;
}
let s_isStarted = false;
let s_isInitialized = false;
let s_option = null;
let s_cubismIdManager = null;
const Constant = Object.freeze({
    vertexOffset: 0,
    vertexStep: 2,
});
function csmDelete(address) {
    if (!address) {
        return;
    }
    address = void 0;
}
class CubismFramework {
    static startUp(option = null) {
        if (s_isStarted) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CubismLogInfo)('CubismFramework.startUp() is already done.');
            return s_isStarted;
        }
        s_option = option;
        if (s_option != null) {
            Live2DCubismCore.Logging.csmSetLogFunction(s_option.logFunction);
        }
        s_isStarted = true;
        if (s_isStarted) {
            const version = Live2DCubismCore.Version.csmGetVersion();
            const major = (version & 0xff000000) >> 24;
            const minor = (version & 0x00ff0000) >> 16;
            const patch = version & 0x0000ffff;
            const versionNumber = version;
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CubismLogInfo)(`Live2D Cubism Core version: {0}.{1}.{2} ({3})`, ('00' + major).slice(-2), ('00' + minor).slice(-2), ('0000' + patch).slice(-4), versionNumber);
        }
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CubismLogInfo)('CubismFramework.startUp() is complete.');
        return s_isStarted;
    }
    static cleanUp() {
        s_isStarted = false;
        s_isInitialized = false;
        s_option = null;
        s_cubismIdManager = null;
    }
    static initialize(memorySize = 0) {
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CSM_ASSERT)(s_isStarted);
        if (!s_isStarted) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CubismLogWarning)('CubismFramework is not started.');
            return;
        }
        if (s_isInitialized) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CubismLogWarning)('CubismFramework.initialize() skipped, already initialized.');
            return;
        }
        _utils_cubismjson__WEBPACK_IMPORTED_MODULE_3__.Value.staticInitializeNotForClientCall();
        s_cubismIdManager = new _id_cubismidmanager__WEBPACK_IMPORTED_MODULE_0__.CubismIdManager();
        Live2DCubismCore.Memory.initializeAmountOfMemory(memorySize);
        s_isInitialized = true;
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CubismLogInfo)('CubismFramework.initialize() is complete.');
    }
    static dispose() {
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CSM_ASSERT)(s_isStarted);
        if (!s_isStarted) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CubismLogWarning)('CubismFramework is not started.');
            return;
        }
        if (!s_isInitialized) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CubismLogWarning)('CubismFramework.dispose() skipped, not initialized.');
            return;
        }
        _utils_cubismjson__WEBPACK_IMPORTED_MODULE_3__.Value.staticReleaseNotForClientCall();
        s_cubismIdManager.release();
        s_cubismIdManager = null;
        _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismRenderer.staticRelease();
        s_isInitialized = false;
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CubismLogInfo)('CubismFramework.dispose() is complete.');
    }
    static isStarted() {
        return s_isStarted;
    }
    static isInitialized() {
        return s_isInitialized;
    }
    static coreLogFunction(message) {
        if (!Live2DCubismCore.Logging.csmGetLogFunction()) {
            return;
        }
        Live2DCubismCore.Logging.csmGetLogFunction()(message);
    }
    static getLoggingLevel() {
        if (s_option != null) {
            return s_option.loggingLevel;
        }
        return LogLevel.LogLevel_Off;
    }
    static getIdManager() {
        return s_cubismIdManager;
    }
    constructor() { }
}
class Option {
    logFunction;
    loggingLevel;
}
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["LogLevel_Verbose"] = 0] = "LogLevel_Verbose";
    LogLevel[LogLevel["LogLevel_Debug"] = 1] = "LogLevel_Debug";
    LogLevel[LogLevel["LogLevel_Info"] = 2] = "LogLevel_Info";
    LogLevel[LogLevel["LogLevel_Warning"] = 3] = "LogLevel_Warning";
    LogLevel[LogLevel["LogLevel_Error"] = 4] = "LogLevel_Error";
    LogLevel[LogLevel["LogLevel_Off"] = 5] = "LogLevel_Off";
})(LogLevel || (LogLevel = {}));

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.Constant = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_4__.Constant;
    Live2DCubismFramework.csmDelete = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_4__.csmDelete;
    Live2DCubismFramework.CubismFramework = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_4__.CubismFramework;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/math/cubismmath.ts":
/*!*****************************************************!*\
  !*** ./src/live2d/Framework/src/math/cubismmath.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismMath: function() { return /* binding */ CubismMath; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismvector2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismvector2 */ "./src/live2d/Framework/src/math/cubismvector2.ts");
/* harmony import */ var _cubismmath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismmath */ "./src/live2d/Framework/src/math/cubismmath.ts");

class CubismMath {
    static Epsilon = 0.00001;
    static range(value, min, max) {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    }
    static sin(x) {
        return Math.sin(x);
    }
    static cos(x) {
        return Math.cos(x);
    }
    static abs(x) {
        return Math.abs(x);
    }
    static sqrt(x) {
        return Math.sqrt(x);
    }
    static cbrt(x) {
        if (x === 0) {
            return x;
        }
        let cx = x;
        const isNegativeNumber = cx < 0;
        if (isNegativeNumber) {
            cx = -cx;
        }
        let ret;
        if (cx === Infinity) {
            ret = Infinity;
        }
        else {
            ret = Math.exp(Math.log(cx) / 3);
            ret = (cx / (ret * ret) + 2 * ret) / 3;
        }
        return isNegativeNumber ? -ret : ret;
    }
    static getEasingSine(value) {
        if (value < 0.0) {
            return 0.0;
        }
        else if (value > 1.0) {
            return 1.0;
        }
        return 0.5 - 0.5 * this.cos(value * Math.PI);
    }
    static max(left, right) {
        return left > right ? left : right;
    }
    static min(left, right) {
        return left > right ? right : left;
    }
    static degreesToRadian(degrees) {
        return (degrees / 180.0) * Math.PI;
    }
    static radianToDegrees(radian) {
        return (radian * 180.0) / Math.PI;
    }
    static directionToRadian(from, to) {
        const q1 = Math.atan2(to.y, to.x);
        const q2 = Math.atan2(from.y, from.x);
        let ret = q1 - q2;
        while (ret < -Math.PI) {
            ret += Math.PI * 2.0;
        }
        while (ret > Math.PI) {
            ret -= Math.PI * 2.0;
        }
        return ret;
    }
    static directionToDegrees(from, to) {
        const radian = this.directionToRadian(from, to);
        let degree = this.radianToDegrees(radian);
        if (to.x - from.x > 0.0) {
            degree = -degree;
        }
        return degree;
    }
    static radianToDirection(totalAngle) {
        const ret = new _cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2();
        ret.x = this.sin(totalAngle);
        ret.y = this.cos(totalAngle);
        return ret;
    }
    static quadraticEquation(a, b, c) {
        if (this.abs(a) < CubismMath.Epsilon) {
            if (this.abs(b) < CubismMath.Epsilon) {
                return -c;
            }
            return -c / b;
        }
        return -(b + this.sqrt(b * b - 4.0 * a * c)) / (2.0 * a);
    }
    static cardanoAlgorithmForBezier(a, b, c, d) {
        if (this.sqrt(a) < CubismMath.Epsilon) {
            return this.range(this.quadraticEquation(b, c, d), 0.0, 1.0);
        }
        const ba = b / a;
        const ca = c / a;
        const da = d / a;
        const p = (3.0 * ca - ba * ba) / 3.0;
        const p3 = p / 3.0;
        const q = (2.0 * ba * ba * ba - 9.0 * ba * ca + 27.0 * da) / 27.0;
        const q2 = q / 2.0;
        const discriminant = q2 * q2 + p3 * p3 * p3;
        const center = 0.5;
        const threshold = center + 0.01;
        if (discriminant < 0.0) {
            const mp3 = -p / 3.0;
            const mp33 = mp3 * mp3 * mp3;
            const r = this.sqrt(mp33);
            const t = -q / (2.0 * r);
            const cosphi = this.range(t, -1.0, 1.0);
            const phi = Math.acos(cosphi);
            const crtr = this.cbrt(r);
            const t1 = 2.0 * crtr;
            const root1 = t1 * this.cos(phi / 3.0) - ba / 3.0;
            if (this.abs(root1 - center) < threshold) {
                return this.range(root1, 0.0, 1.0);
            }
            const root2 = t1 * this.cos((phi + 2.0 * Math.PI) / 3.0) - ba / 3.0;
            if (this.abs(root2 - center) < threshold) {
                return this.range(root2, 0.0, 1.0);
            }
            const root3 = t1 * this.cos((phi + 4.0 * Math.PI) / 3.0) - ba / 3.0;
            return this.range(root3, 0.0, 1.0);
        }
        if (discriminant == 0.0) {
            let u1;
            if (q2 < 0.0) {
                u1 = this.cbrt(-q2);
            }
            else {
                u1 = -this.cbrt(q2);
            }
            const root1 = 2.0 * u1 - ba / 3.0;
            if (this.abs(root1 - center) < threshold) {
                return this.range(root1, 0.0, 1.0);
            }
            const root2 = -u1 - ba / 3.0;
            return this.range(root2, 0.0, 1.0);
        }
        const sd = this.sqrt(discriminant);
        const u1 = this.cbrt(sd - q2);
        const v1 = this.cbrt(sd + q2);
        const root1 = u1 - v1 - ba / 3.0;
        return this.range(root1, 0.0, 1.0);
    }
    constructor() { }
}


var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMath = _cubismmath__WEBPACK_IMPORTED_MODULE_1__.CubismMath;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/math/cubismmatrix44.ts":
/*!*********************************************************!*\
  !*** ./src/live2d/Framework/src/math/cubismmatrix44.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismMatrix44: function() { return /* binding */ CubismMatrix44; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmatrix44 */ "./src/live2d/Framework/src/math/cubismmatrix44.ts");
class CubismMatrix44 {
    constructor() {
        this._tr = new Float32Array(16);
        this.loadIdentity();
    }
    static multiply(a, b, dst) {
        const c = new Float32Array([
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0,
        ]);
        const n = 4;
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
                for (let k = 0; k < n; ++k) {
                    c[j + i * 4] += a[k + i * 4] * b[j + k * 4];
                }
            }
        }
        for (let i = 0; i < 16; ++i) {
            dst[i] = c[i];
        }
    }
    loadIdentity() {
        const c = new Float32Array([
            1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
            1.0,
        ]);
        this.setMatrix(c);
    }
    setMatrix(tr) {
        for (let i = 0; i < 16; ++i) {
            this._tr[i] = tr[i];
        }
    }
    getArray() {
        return this._tr;
    }
    getScaleX() {
        return this._tr[0];
    }
    getScaleY() {
        return this._tr[5];
    }
    getTranslateX() {
        return this._tr[12];
    }
    getTranslateY() {
        return this._tr[13];
    }
    transformX(src) {
        return this._tr[0] * src + this._tr[12];
    }
    transformY(src) {
        return this._tr[5] * src + this._tr[13];
    }
    invertTransformX(src) {
        return (src - this._tr[12]) / this._tr[0];
    }
    invertTransformY(src) {
        return (src - this._tr[13]) / this._tr[5];
    }
    translateRelative(x, y) {
        const tr1 = new Float32Array([
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            x,
            y,
            0.0,
            1.0,
        ]);
        CubismMatrix44.multiply(tr1, this._tr, this._tr);
    }
    translate(x, y) {
        this._tr[12] = x;
        this._tr[13] = y;
    }
    translateX(x) {
        this._tr[12] = x;
    }
    translateY(y) {
        this._tr[13] = y;
    }
    scaleRelative(x, y) {
        const tr1 = new Float32Array([
            x,
            0.0,
            0.0,
            0.0,
            0.0,
            y,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
        ]);
        CubismMatrix44.multiply(tr1, this._tr, this._tr);
    }
    scale(x, y) {
        this._tr[0] = x;
        this._tr[5] = y;
    }
    multiplyByMatrix(m) {
        CubismMatrix44.multiply(m.getArray(), this._tr, this._tr);
    }
    clone() {
        const cloneMatrix = new CubismMatrix44();
        for (let i = 0; i < this._tr.length; i++) {
            cloneMatrix._tr[i] = this._tr[i];
        }
        return cloneMatrix;
    }
    _tr;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMatrix44 = _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/math/cubismmodelmatrix.ts":
/*!************************************************************!*\
  !*** ./src/live2d/Framework/src/math/cubismmodelmatrix.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismModelMatrix: function() { return /* binding */ CubismModelMatrix; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmatrix44 */ "./src/live2d/Framework/src/math/cubismmatrix44.ts");
/* harmony import */ var _cubismmodelmatrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismmodelmatrix */ "./src/live2d/Framework/src/math/cubismmodelmatrix.ts");

class CubismModelMatrix extends _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44 {
    constructor(w, h) {
        super();
        this._width = w !== undefined ? w : 0.0;
        this._height = h !== undefined ? h : 0.0;
        this.setHeight(2.0);
    }
    setWidth(w) {
        const scaleX = w / this._width;
        const scaleY = scaleX;
        this.scale(scaleX, scaleY);
    }
    setHeight(h) {
        const scaleX = h / this._height;
        const scaleY = scaleX;
        this.scale(scaleX, scaleY);
    }
    setPosition(x, y) {
        this.translate(x, y);
    }
    setCenterPosition(x, y) {
        this.centerX(x);
        this.centerY(y);
    }
    top(y) {
        this.setY(y);
    }
    bottom(y) {
        const h = this._height * this.getScaleY();
        this.translateY(y - h);
    }
    left(x) {
        this.setX(x);
    }
    right(x) {
        const w = this._width * this.getScaleX();
        this.translateX(x - w);
    }
    centerX(x) {
        const w = this._width * this.getScaleX();
        this.translateX(x - w / 2.0);
    }
    setX(x) {
        this.translateX(x);
    }
    centerY(y) {
        const h = this._height * this.getScaleY();
        this.translateY(y - h / 2.0);
    }
    setY(y) {
        this.translateY(y);
    }
    setupFromLayout(layout) {
        const keyWidth = 'width';
        const keyHeight = 'height';
        const keyX = 'x';
        const keyY = 'y';
        const keyCenterX = 'center_x';
        const keyCenterY = 'center_y';
        const keyTop = 'top';
        const keyBottom = 'bottom';
        const keyLeft = 'left';
        const keyRight = 'right';
        for (const ite = layout.begin(); ite.notEqual(layout.end()); ite.preIncrement()) {
            const key = ite.ptr().first;
            const value = ite.ptr().second;
            if (key == keyWidth) {
                this.setWidth(value);
            }
            else if (key == keyHeight) {
                this.setHeight(value);
            }
        }
        for (const ite = layout.begin(); ite.notEqual(layout.end()); ite.preIncrement()) {
            const key = ite.ptr().first;
            const value = ite.ptr().second;
            if (key == keyX) {
                this.setX(value);
            }
            else if (key == keyY) {
                this.setY(value);
            }
            else if (key == keyCenterX) {
                this.centerX(value);
            }
            else if (key == keyCenterY) {
                this.centerY(value);
            }
            else if (key == keyTop) {
                this.top(value);
            }
            else if (key == keyBottom) {
                this.bottom(value);
            }
            else if (key == keyLeft) {
                this.left(value);
            }
            else if (key == keyRight) {
                this.right(value);
            }
        }
    }
    _width;
    _height;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModelMatrix = _cubismmodelmatrix__WEBPACK_IMPORTED_MODULE_1__.CubismModelMatrix;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/math/cubismtargetpoint.ts":
/*!************************************************************!*\
  !*** ./src/live2d/Framework/src/math/cubismtargetpoint.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismTargetPoint: function() { return /* binding */ CubismTargetPoint; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmath */ "./src/live2d/Framework/src/math/cubismmath.ts");
/* harmony import */ var _cubismtargetpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismtargetpoint */ "./src/live2d/Framework/src/math/cubismtargetpoint.ts");

const FrameRate = 30;
const Epsilon = 0.01;
class CubismTargetPoint {
    constructor() {
        this._faceTargetX = 0.0;
        this._faceTargetY = 0.0;
        this._faceX = 0.0;
        this._faceY = 0.0;
        this._faceVX = 0.0;
        this._faceVY = 0.0;
        this._lastTimeSeconds = 0.0;
        this._userTimeSeconds = 0.0;
    }
    update(deltaTimeSeconds) {
        this._userTimeSeconds += deltaTimeSeconds;
        const faceParamMaxV = 40.0 / 10.0;
        const maxV = (faceParamMaxV * 1.0) / FrameRate;
        if (this._lastTimeSeconds == 0.0) {
            this._lastTimeSeconds = this._userTimeSeconds;
            return;
        }
        const deltaTimeWeight = (this._userTimeSeconds - this._lastTimeSeconds) * FrameRate;
        this._lastTimeSeconds = this._userTimeSeconds;
        const timeToMaxSpeed = 0.15;
        const frameToMaxSpeed = timeToMaxSpeed * FrameRate;
        const maxA = (deltaTimeWeight * maxV) / frameToMaxSpeed;
        const dx = this._faceTargetX - this._faceX;
        const dy = this._faceTargetY - this._faceY;
        if (_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.abs(dx) <= Epsilon && _cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.abs(dy) <= Epsilon) {
            return;
        }
        const d = _cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.sqrt(dx * dx + dy * dy);
        const vx = (maxV * dx) / d;
        const vy = (maxV * dy) / d;
        let ax = vx - this._faceVX;
        let ay = vy - this._faceVY;
        const a = _cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.sqrt(ax * ax + ay * ay);
        if (a < -maxA || a > maxA) {
            ax *= maxA / a;
            ay *= maxA / a;
        }
        this._faceVX += ax;
        this._faceVY += ay;
        {
            const maxV = 0.5 *
                (_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.sqrt(maxA * maxA + 16.0 * maxA * d - 8.0 * maxA * d) -
                    maxA);
            const curV = _cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.sqrt(this._faceVX * this._faceVX + this._faceVY * this._faceVY);
            if (curV > maxV) {
                this._faceVX *= maxV / curV;
                this._faceVY *= maxV / curV;
            }
        }
        this._faceX += this._faceVX;
        this._faceY += this._faceVY;
    }
    getX() {
        return this._faceX;
    }
    getY() {
        return this._faceY;
    }
    set(x, y) {
        this._faceTargetX = x;
        this._faceTargetY = y;
    }
    _faceTargetX;
    _faceTargetY;
    _faceX;
    _faceY;
    _faceVX;
    _faceVY;
    _lastTimeSeconds;
    _userTimeSeconds;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismTargetPoint = _cubismtargetpoint__WEBPACK_IMPORTED_MODULE_1__.CubismTargetPoint;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/math/cubismvector2.ts":
/*!********************************************************!*\
  !*** ./src/live2d/Framework/src/math/cubismvector2.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismVector2: function() { return /* binding */ CubismVector2; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismvector2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismvector2 */ "./src/live2d/Framework/src/math/cubismvector2.ts");
class CubismVector2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.x = x == undefined ? 0.0 : x;
        this.y = y == undefined ? 0.0 : y;
    }
    add(vector2) {
        const ret = new CubismVector2(0.0, 0.0);
        ret.x = this.x + vector2.x;
        ret.y = this.y + vector2.y;
        return ret;
    }
    substract(vector2) {
        const ret = new CubismVector2(0.0, 0.0);
        ret.x = this.x - vector2.x;
        ret.y = this.y - vector2.y;
        return ret;
    }
    multiply(vector2) {
        const ret = new CubismVector2(0.0, 0.0);
        ret.x = this.x * vector2.x;
        ret.y = this.y * vector2.y;
        return ret;
    }
    multiplyByScaler(scalar) {
        return this.multiply(new CubismVector2(scalar, scalar));
    }
    division(vector2) {
        const ret = new CubismVector2(0.0, 0.0);
        ret.x = this.x / vector2.x;
        ret.y = this.y / vector2.y;
        return ret;
    }
    divisionByScalar(scalar) {
        return this.division(new CubismVector2(scalar, scalar));
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    getDistanceWith(a) {
        return Math.sqrt((this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y));
    }
    dot(a) {
        return this.x * a.x + this.y * a.y;
    }
    normalize() {
        const length = Math.pow(this.x * this.x + this.y * this.y, 0.5);
        this.x = this.x / length;
        this.y = this.y / length;
    }
    isEqual(rhs) {
        return this.x == rhs.x && this.y == rhs.y;
    }
    isNotEqual(rhs) {
        return !this.isEqual(rhs);
    }
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismVector2 = _cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/math/cubismviewmatrix.ts":
/*!***********************************************************!*\
  !*** ./src/live2d/Framework/src/math/cubismviewmatrix.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismViewMatrix: function() { return /* binding */ CubismViewMatrix; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmatrix44 */ "./src/live2d/Framework/src/math/cubismmatrix44.ts");
/* harmony import */ var _cubismviewmatrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismviewmatrix */ "./src/live2d/Framework/src/math/cubismviewmatrix.ts");

class CubismViewMatrix extends _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44 {
    constructor() {
        super();
        this._screenLeft = 0.0;
        this._screenRight = 0.0;
        this._screenTop = 0.0;
        this._screenBottom = 0.0;
        this._maxLeft = 0.0;
        this._maxRight = 0.0;
        this._maxTop = 0.0;
        this._maxBottom = 0.0;
        this._maxScale = 0.0;
        this._minScale = 0.0;
    }
    adjustTranslate(x, y) {
        if (this._tr[0] * this._maxLeft + (this._tr[12] + x) > this._screenLeft) {
            x = this._screenLeft - this._tr[0] * this._maxLeft - this._tr[12];
        }
        if (this._tr[0] * this._maxRight + (this._tr[12] + x) < this._screenRight) {
            x = this._screenRight - this._tr[0] * this._maxRight - this._tr[12];
        }
        if (this._tr[5] * this._maxTop + (this._tr[13] + y) < this._screenTop) {
            y = this._screenTop - this._tr[5] * this._maxTop - this._tr[13];
        }
        if (this._tr[5] * this._maxBottom + (this._tr[13] + y) >
            this._screenBottom) {
            y = this._screenBottom - this._tr[5] * this._maxBottom - this._tr[13];
        }
        const tr1 = new Float32Array([
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            x,
            y,
            0.0,
            1.0,
        ]);
        _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44.multiply(tr1, this._tr, this._tr);
    }
    adjustScale(cx, cy, scale) {
        const maxScale = this.getMaxScale();
        const minScale = this.getMinScale();
        const targetScale = scale * this._tr[0];
        if (targetScale < minScale) {
            if (this._tr[0] > 0.0) {
                scale = minScale / this._tr[0];
            }
        }
        else if (targetScale > maxScale) {
            if (this._tr[0] > 0.0) {
                scale = maxScale / this._tr[0];
            }
        }
        const tr1 = new Float32Array([
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            cx,
            cy,
            0.0,
            1.0,
        ]);
        const tr2 = new Float32Array([
            scale,
            0.0,
            0.0,
            0.0,
            0.0,
            scale,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
        ]);
        const tr3 = new Float32Array([
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            -cx,
            -cy,
            0.0,
            1.0,
        ]);
        _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44.multiply(tr3, this._tr, this._tr);
        _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44.multiply(tr2, this._tr, this._tr);
        _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44.multiply(tr1, this._tr, this._tr);
    }
    setScreenRect(left, right, bottom, top) {
        this._screenLeft = left;
        this._screenRight = right;
        this._screenBottom = bottom;
        this._screenTop = top;
    }
    setMaxScreenRect(left, right, bottom, top) {
        this._maxLeft = left;
        this._maxRight = right;
        this._maxTop = top;
        this._maxBottom = bottom;
    }
    setMaxScale(maxScale) {
        this._maxScale = maxScale;
    }
    setMinScale(minScale) {
        this._minScale = minScale;
    }
    getMaxScale() {
        return this._maxScale;
    }
    getMinScale() {
        return this._minScale;
    }
    isMaxScale() {
        return this.getScaleX() >= this._maxScale;
    }
    isMinScale() {
        return this.getScaleX() <= this._minScale;
    }
    getScreenLeft() {
        return this._screenLeft;
    }
    getScreenRight() {
        return this._screenRight;
    }
    getScreenBottom() {
        return this._screenBottom;
    }
    getScreenTop() {
        return this._screenTop;
    }
    getMaxLeft() {
        return this._maxLeft;
    }
    getMaxRight() {
        return this._maxRight;
    }
    getMaxBottom() {
        return this._maxBottom;
    }
    getMaxTop() {
        return this._maxTop;
    }
    _screenLeft;
    _screenRight;
    _screenTop;
    _screenBottom;
    _maxLeft;
    _maxRight;
    _maxTop;
    _maxBottom;
    _maxScale;
    _minScale;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismViewMatrix = _cubismviewmatrix__WEBPACK_IMPORTED_MODULE_1__.CubismViewMatrix;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/model/cubismmoc.ts":
/*!*****************************************************!*\
  !*** ./src/live2d/Framework/src/model/cubismmoc.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismMoc: function() { return /* binding */ CubismMoc; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");
/* harmony import */ var _cubismmodel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismmodel */ "./src/live2d/Framework/src/model/cubismmodel.ts");
/* harmony import */ var _cubismmoc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubismmoc */ "./src/live2d/Framework/src/model/cubismmoc.ts");


class CubismMoc {
    static create(mocBytes, shouldCheckMocConsistency) {
        let cubismMoc = null;
        if (shouldCheckMocConsistency) {
            const consistency = this.hasMocConsistency(mocBytes);
            if (!consistency) {
                (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_0__.CubismLogError)(`Inconsistent MOC3.`);
                return cubismMoc;
            }
        }
        const moc = Live2DCubismCore.Moc.fromArrayBuffer(mocBytes);
        if (moc) {
            cubismMoc = new CubismMoc(moc);
            cubismMoc._mocVersion = Live2DCubismCore.Version.csmGetMocVersion(moc, mocBytes);
        }
        return cubismMoc;
    }
    static delete(moc) {
        moc._moc._release();
        moc._moc = null;
        moc = null;
    }
    createModel() {
        let cubismModel = null;
        const model = Live2DCubismCore.Model.fromMoc(this._moc);
        if (model) {
            cubismModel = new _cubismmodel__WEBPACK_IMPORTED_MODULE_1__.CubismModel(model);
            cubismModel.initialize();
            ++this._modelCount;
        }
        return cubismModel;
    }
    deleteModel(model) {
        if (model != null) {
            model.release();
            model = null;
            --this._modelCount;
        }
    }
    constructor(moc) {
        this._moc = moc;
        this._modelCount = 0;
        this._mocVersion = 0;
    }
    release() {
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_0__.CSM_ASSERT)(this._modelCount == 0);
        this._moc._release();
        this._moc = null;
    }
    getLatestMocVersion() {
        return Live2DCubismCore.Version.csmGetLatestMocVersion();
    }
    getMocVersion() {
        return this._mocVersion;
    }
    static hasMocConsistency(mocBytes) {
        const isConsistent = Live2DCubismCore.Moc.prototype.hasMocConsistency(mocBytes);
        return isConsistent === 1 ? true : false;
    }
    _moc;
    _modelCount;
    _mocVersion;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMoc = _cubismmoc__WEBPACK_IMPORTED_MODULE_2__.CubismMoc;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/model/cubismmodel.ts":
/*!*******************************************************!*\
  !*** ./src/live2d/Framework/src/model/cubismmodel.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismModel: function() { return /* binding */ CubismModel; },
/* harmony export */   DrawableColorData: function() { return /* binding */ DrawableColorData; },
/* harmony export */   DrawableCullingData: function() { return /* binding */ DrawableCullingData; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   PartColorData: function() { return /* binding */ PartColorData; }
/* harmony export */ });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rendering/cubismrenderer */ "./src/live2d/Framework/src/rendering/cubismrenderer.ts");
/* harmony import */ var _type_csmmap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/csmmap */ "./src/live2d/Framework/src/type/csmmap.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");
/* harmony import */ var _cubismmodel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cubismmodel */ "./src/live2d/Framework/src/model/cubismmodel.ts");





class DrawableColorData {
    constructor(isOverwritten = false, color = new _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismTextureColor()) {
        this.isOverwritten = isOverwritten;
        this.Color = color;
    }
    isOverwritten;
    Color;
}
class PartColorData {
    constructor(isOverwritten = false, color = new _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismTextureColor()) {
        this.isOverwritten = isOverwritten;
        this.Color = color;
    }
    isOverwritten;
    Color;
}
class DrawableCullingData {
    constructor(isOverwritten = false, isCulling = false) {
        this.isOverwritten = isOverwritten;
        this.isCulling = isCulling;
    }
    isOverwritten;
    isCulling;
}
class CubismModel {
    update() {
        this._model.update();
        this._model.drawables.resetDynamicFlags();
    }
    getPixelsPerUnit() {
        if (this._model == null) {
            return 0.0;
        }
        return this._model.canvasinfo.PixelsPerUnit;
    }
    getCanvasWidth() {
        if (this._model == null) {
            return 0.0;
        }
        return (this._model.canvasinfo.CanvasWidth / this._model.canvasinfo.PixelsPerUnit);
    }
    getCanvasHeight() {
        if (this._model == null) {
            return 0.0;
        }
        return (this._model.canvasinfo.CanvasHeight / this._model.canvasinfo.PixelsPerUnit);
    }
    saveParameters() {
        const parameterCount = this._model.parameters.count;
        const savedParameterCount = this._savedParameters.getSize();
        for (let i = 0; i < parameterCount; ++i) {
            if (i < savedParameterCount) {
                this._savedParameters.set(i, this._parameterValues[i]);
            }
            else {
                this._savedParameters.pushBack(this._parameterValues[i]);
            }
        }
    }
    getMultiplyColor(index) {
        if (this.getOverwriteFlagForModelMultiplyColors() ||
            this.getOverwriteFlagForDrawableMultiplyColors(index)) {
            return this._userMultiplyColors.at(index).Color;
        }
        const color = this.getDrawableMultiplyColor(index);
        return color;
    }
    getScreenColor(index) {
        if (this.getOverwriteFlagForModelScreenColors() ||
            this.getOverwriteFlagForDrawableScreenColors(index)) {
            return this._userScreenColors.at(index).Color;
        }
        const color = this.getDrawableScreenColor(index);
        return color;
    }
    setMultiplyColorByTextureColor(index, color) {
        this.setMultiplyColorByRGBA(index, color.R, color.G, color.B, color.A);
    }
    setMultiplyColorByRGBA(index, r, g, b, a = 1.0) {
        this._userMultiplyColors.at(index).Color.R = r;
        this._userMultiplyColors.at(index).Color.G = g;
        this._userMultiplyColors.at(index).Color.B = b;
        this._userMultiplyColors.at(index).Color.A = a;
    }
    setScreenColorByTextureColor(index, color) {
        this.setScreenColorByRGBA(index, color.R, color.G, color.B, color.A);
    }
    setScreenColorByRGBA(index, r, g, b, a = 1.0) {
        this._userScreenColors.at(index).Color.R = r;
        this._userScreenColors.at(index).Color.G = g;
        this._userScreenColors.at(index).Color.B = b;
        this._userScreenColors.at(index).Color.A = a;
    }
    getPartMultiplyColor(partIndex) {
        return this._userPartMultiplyColors.at(partIndex).Color;
    }
    getPartScreenColor(partIndex) {
        return this._userPartScreenColors.at(partIndex).Color;
    }
    setPartColor(partIndex, r, g, b, a, partColors, drawableColors) {
        partColors.at(partIndex).Color.R = r;
        partColors.at(partIndex).Color.G = g;
        partColors.at(partIndex).Color.B = b;
        partColors.at(partIndex).Color.A = a;
        if (partColors.at(partIndex).isOverwritten) {
            for (let i = 0; i < this._partChildDrawables.at(partIndex).getSize(); ++i) {
                const drawableIndex = this._partChildDrawables.at(partIndex).at(i);
                drawableColors.at(drawableIndex).Color.R = r;
                drawableColors.at(drawableIndex).Color.G = g;
                drawableColors.at(drawableIndex).Color.B = b;
                drawableColors.at(drawableIndex).Color.A = a;
            }
        }
    }
    setPartMultiplyColorByTextureColor(partIndex, color) {
        this.setPartMultiplyColorByRGBA(partIndex, color.R, color.G, color.B, color.A);
    }
    setPartMultiplyColorByRGBA(partIndex, r, g, b, a) {
        this.setPartColor(partIndex, r, g, b, a, this._userPartMultiplyColors, this._userMultiplyColors);
    }
    setPartScreenColorByTextureColor(partIndex, color) {
        this.setPartScreenColorByRGBA(partIndex, color.R, color.G, color.B, color.A);
    }
    setPartScreenColorByRGBA(partIndex, r, g, b, a) {
        this.setPartColor(partIndex, r, g, b, a, this._userPartScreenColors, this._userScreenColors);
    }
    getOverwriteFlagForModelMultiplyColors() {
        return this._isOverwrittenModelMultiplyColors;
    }
    getOverwriteFlagForModelScreenColors() {
        return this._isOverwrittenModelScreenColors;
    }
    setOverwriteFlagForModelMultiplyColors(value) {
        this._isOverwrittenModelMultiplyColors = value;
    }
    setOverwriteFlagForModelScreenColors(value) {
        this._isOverwrittenModelScreenColors = value;
    }
    getOverwriteFlagForDrawableMultiplyColors(drawableindex) {
        return this._userMultiplyColors.at(drawableindex).isOverwritten;
    }
    getOverwriteFlagForDrawableScreenColors(drawableindex) {
        return this._userScreenColors.at(drawableindex).isOverwritten;
    }
    setOverwriteFlagForDrawableMultiplyColors(drawableindex, value) {
        this._userMultiplyColors.at(drawableindex).isOverwritten = value;
    }
    setOverwriteFlagForDrawableScreenColors(drawableindex, value) {
        this._userScreenColors.at(drawableindex).isOverwritten = value;
    }
    getOverwriteColorForPartMultiplyColors(partIndex) {
        return this._userPartMultiplyColors.at(partIndex).isOverwritten;
    }
    getOverwriteColorForPartScreenColors(partIndex) {
        return this._userPartScreenColors.at(partIndex).isOverwritten;
    }
    setOverwriteColorForPartColors(partIndex, value, partColors, drawableColors) {
        partColors.at(partIndex).isOverwritten = value;
        for (let i = 0; i < this._partChildDrawables.at(partIndex).getSize(); ++i) {
            const drawableIndex = this._partChildDrawables.at(partIndex).at(i);
            drawableColors.at(drawableIndex).isOverwritten = value;
            if (value) {
                drawableColors.at(drawableIndex).Color.R =
                    partColors.at(partIndex).Color.R;
                drawableColors.at(drawableIndex).Color.G =
                    partColors.at(partIndex).Color.G;
                drawableColors.at(drawableIndex).Color.B =
                    partColors.at(partIndex).Color.B;
                drawableColors.at(drawableIndex).Color.A =
                    partColors.at(partIndex).Color.A;
            }
        }
    }
    setOverwriteColorForPartMultiplyColors(partIndex, value) {
        this._userPartMultiplyColors.at(partIndex).isOverwritten = value;
        this.setOverwriteColorForPartColors(partIndex, value, this._userPartMultiplyColors, this._userMultiplyColors);
    }
    setOverwriteColorForPartScreenColors(partIndex, value) {
        this._userPartScreenColors.at(partIndex).isOverwritten = value;
        this.setOverwriteColorForPartColors(partIndex, value, this._userPartScreenColors, this._userScreenColors);
    }
    getDrawableCulling(drawableIndex) {
        if (this.getOverwriteFlagForModelCullings() ||
            this.getOverwriteFlagForDrawableCullings(drawableIndex)) {
            return this._userCullings.at(drawableIndex).isCulling;
        }
        const constantFlags = this._model.drawables.constantFlags;
        return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(constantFlags[drawableIndex]);
    }
    setDrawableCulling(drawableIndex, isCulling) {
        this._userCullings.at(drawableIndex).isCulling = isCulling;
    }
    getOverwriteFlagForModelCullings() {
        return this._isOverwrittenCullings;
    }
    setOverwriteFlagForModelCullings(isOverwrittenCullings) {
        this._isOverwrittenCullings = isOverwrittenCullings;
    }
    getOverwriteFlagForDrawableCullings(drawableIndex) {
        return this._userCullings.at(drawableIndex).isOverwritten;
    }
    setOverwriteFlagForDrawableCullings(drawableIndex, isOverwrittenCullings) {
        this._userCullings.at(drawableIndex).isOverwritten = isOverwrittenCullings;
    }
    getModelOapcity() {
        return this._modelOpacity;
    }
    setModelOapcity(value) {
        this._modelOpacity = value;
    }
    getModel() {
        return this._model;
    }
    getPartIndex(partId) {
        let partIndex;
        const partCount = this._model.parts.count;
        for (partIndex = 0; partIndex < partCount; ++partIndex) {
            if (partId == this._partIds.at(partIndex)) {
                return partIndex;
            }
        }
        if (this._notExistPartId.isExist(partId)) {
            return this._notExistPartId.getValue(partId);
        }
        partIndex = partCount + this._notExistPartId.getSize();
        this._notExistPartId.setValue(partId, partIndex);
        this._notExistPartOpacities.appendKey(partIndex);
        return partIndex;
    }
    getPartId(partIndex) {
        const partId = this._model.parts.ids[partIndex];
        return _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(partId);
    }
    getPartCount() {
        const partCount = this._model.parts.count;
        return partCount;
    }
    setPartOpacityByIndex(partIndex, opacity) {
        if (this._notExistPartOpacities.isExist(partIndex)) {
            this._notExistPartOpacities.setValue(partIndex, opacity);
            return;
        }
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__.CSM_ASSERT)(0 <= partIndex && partIndex < this.getPartCount());
        this._partOpacities[partIndex] = opacity;
    }
    setPartOpacityById(partId, opacity) {
        const index = this.getPartIndex(partId);
        if (index < 0) {
            return;
        }
        this.setPartOpacityByIndex(index, opacity);
    }
    getPartOpacityByIndex(partIndex) {
        if (this._notExistPartOpacities.isExist(partIndex)) {
            return this._notExistPartOpacities.getValue(partIndex);
        }
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__.CSM_ASSERT)(0 <= partIndex && partIndex < this.getPartCount());
        return this._partOpacities[partIndex];
    }
    getPartOpacityById(partId) {
        const index = this.getPartIndex(partId);
        if (index < 0) {
            return 0;
        }
        return this.getPartOpacityByIndex(index);
    }
    getParameterIndex(parameterId) {
        let parameterIndex;
        const idCount = this._model.parameters.count;
        for (parameterIndex = 0; parameterIndex < idCount; ++parameterIndex) {
            if (parameterId != this._parameterIds.at(parameterIndex)) {
                continue;
            }
            return parameterIndex;
        }
        if (this._notExistParameterId.isExist(parameterId)) {
            return this._notExistParameterId.getValue(parameterId);
        }
        parameterIndex =
            this._model.parameters.count + this._notExistParameterId.getSize();
        this._notExistParameterId.setValue(parameterId, parameterIndex);
        this._notExistParameterValues.appendKey(parameterIndex);
        return parameterIndex;
    }
    getParameterCount() {
        return this._model.parameters.count;
    }
    getParameterType(parameterIndex) {
        return this._model.parameters.types[parameterIndex];
    }
    getParameterMaximumValue(parameterIndex) {
        return this._model.parameters.maximumValues[parameterIndex];
    }
    getParameterMinimumValue(parameterIndex) {
        return this._model.parameters.minimumValues[parameterIndex];
    }
    getParameterDefaultValue(parameterIndex) {
        return this._model.parameters.defaultValues[parameterIndex];
    }
    getParameterValueByIndex(parameterIndex) {
        if (this._notExistParameterValues.isExist(parameterIndex)) {
            return this._notExistParameterValues.getValue(parameterIndex);
        }
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__.CSM_ASSERT)(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        return this._parameterValues[parameterIndex];
    }
    getParameterValueById(parameterId) {
        const parameterIndex = this.getParameterIndex(parameterId);
        return this.getParameterValueByIndex(parameterIndex);
    }
    setParameterValueByIndex(parameterIndex, value, weight = 1.0) {
        if (this._notExistParameterValues.isExist(parameterIndex)) {
            this._notExistParameterValues.setValue(parameterIndex, weight == 1
                ? value
                : this._notExistParameterValues.getValue(parameterIndex) *
                    (1 - weight) +
                    value * weight);
            return;
        }
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__.CSM_ASSERT)(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        if (this._model.parameters.maximumValues[parameterIndex] < value) {
            value = this._model.parameters.maximumValues[parameterIndex];
        }
        if (this._model.parameters.minimumValues[parameterIndex] > value) {
            value = this._model.parameters.minimumValues[parameterIndex];
        }
        this._parameterValues[parameterIndex] =
            weight == 1
                ? value
                : (this._parameterValues[parameterIndex] =
                    this._parameterValues[parameterIndex] * (1 - weight) +
                        value * weight);
    }
    setParameterValueById(parameterId, value, weight = 1.0) {
        const index = this.getParameterIndex(parameterId);
        this.setParameterValueByIndex(index, value, weight);
    }
    addParameterValueByIndex(parameterIndex, value, weight = 1.0) {
        this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) + value * weight);
    }
    addParameterValueById(parameterId, value, weight = 1.0) {
        const index = this.getParameterIndex(parameterId);
        this.addParameterValueByIndex(index, value, weight);
    }
    multiplyParameterValueById(parameterId, value, weight = 1.0) {
        const index = this.getParameterIndex(parameterId);
        this.multiplyParameterValueByIndex(index, value, weight);
    }
    multiplyParameterValueByIndex(parameterIndex, value, weight = 1.0) {
        this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) *
            (1.0 + (value - 1.0) * weight));
    }
    getDrawableIndex(drawableId) {
        const drawableCount = this._model.drawables.count;
        for (let drawableIndex = 0; drawableIndex < drawableCount; ++drawableIndex) {
            if (this._drawableIds.at(drawableIndex) == drawableId) {
                return drawableIndex;
            }
        }
        return -1;
    }
    getDrawableCount() {
        const drawableCount = this._model.drawables.count;
        return drawableCount;
    }
    getDrawableId(drawableIndex) {
        const parameterIds = this._model.drawables.ids;
        return _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(parameterIds[drawableIndex]);
    }
    getDrawableRenderOrders() {
        const renderOrders = this._model.drawables.renderOrders;
        return renderOrders;
    }
    getDrawableTextureIndices(drawableIndex) {
        return this.getDrawableTextureIndex(drawableIndex);
    }
    getDrawableTextureIndex(drawableIndex) {
        const textureIndices = this._model.drawables.textureIndices;
        return textureIndices[drawableIndex];
    }
    getDrawableDynamicFlagVertexPositionsDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(dynamicFlags[drawableIndex]);
    }
    getDrawableVertexIndexCount(drawableIndex) {
        const indexCounts = this._model.drawables.indexCounts;
        return indexCounts[drawableIndex];
    }
    getDrawableVertexCount(drawableIndex) {
        const vertexCounts = this._model.drawables.vertexCounts;
        return vertexCounts[drawableIndex];
    }
    getDrawableVertices(drawableIndex) {
        return this.getDrawableVertexPositions(drawableIndex);
    }
    getDrawableVertexIndices(drawableIndex) {
        const indicesArray = this._model.drawables.indices;
        return indicesArray[drawableIndex];
    }
    getDrawableVertexPositions(drawableIndex) {
        const verticesArray = this._model.drawables.vertexPositions;
        return verticesArray[drawableIndex];
    }
    getDrawableVertexUvs(drawableIndex) {
        const uvsArray = this._model.drawables.vertexUvs;
        return uvsArray[drawableIndex];
    }
    getDrawableOpacity(drawableIndex) {
        const opacities = this._model.drawables.opacities;
        return opacities[drawableIndex];
    }
    getDrawableMultiplyColor(drawableIndex) {
        const multiplyColors = this._model.drawables.multiplyColors;
        const index = drawableIndex * 4;
        const multiplyColor = new _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismTextureColor();
        multiplyColor.R = multiplyColors[index];
        multiplyColor.G = multiplyColors[index + 1];
        multiplyColor.B = multiplyColors[index + 2];
        multiplyColor.A = multiplyColors[index + 3];
        return multiplyColor;
    }
    getDrawableScreenColor(drawableIndex) {
        const screenColors = this._model.drawables.screenColors;
        const index = drawableIndex * 4;
        const screenColor = new _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismTextureColor();
        screenColor.R = screenColors[index];
        screenColor.G = screenColors[index + 1];
        screenColor.B = screenColors[index + 2];
        screenColor.A = screenColors[index + 3];
        return screenColor;
    }
    getDrawableParentPartIndex(drawableIndex) {
        return this._model.drawables.parentPartIndices[drawableIndex];
    }
    getDrawableBlendMode(drawableIndex) {
        const constantFlags = this._model.drawables.constantFlags;
        return Live2DCubismCore.Utils.hasBlendAdditiveBit(constantFlags[drawableIndex])
            ? _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismBlendMode.CubismBlendMode_Additive
            : Live2DCubismCore.Utils.hasBlendMultiplicativeBit(constantFlags[drawableIndex])
                ? _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismBlendMode.CubismBlendMode_Multiplicative
                : _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismBlendMode.CubismBlendMode_Normal;
    }
    getDrawableInvertedMaskBit(drawableIndex) {
        const constantFlags = this._model.drawables.constantFlags;
        return Live2DCubismCore.Utils.hasIsInvertedMaskBit(constantFlags[drawableIndex]);
    }
    getDrawableMasks() {
        const masks = this._model.drawables.masks;
        return masks;
    }
    getDrawableMaskCounts() {
        const maskCounts = this._model.drawables.maskCounts;
        return maskCounts;
    }
    isUsingMasking() {
        for (let d = 0; d < this._model.drawables.count; ++d) {
            if (this._model.drawables.maskCounts[d] <= 0) {
                continue;
            }
            return true;
        }
        return false;
    }
    getDrawableDynamicFlagIsVisible(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasIsVisibleBit(dynamicFlags[drawableIndex]);
    }
    getDrawableDynamicFlagVisibilityDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(dynamicFlags[drawableIndex]);
    }
    getDrawableDynamicFlagOpacityDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasOpacityDidChangeBit(dynamicFlags[drawableIndex]);
    }
    getDrawableDynamicFlagRenderOrderDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(dynamicFlags[drawableIndex]);
    }
    getDrawableDynamicFlagBlendColorDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasBlendColorDidChangeBit(dynamicFlags[drawableIndex]);
    }
    loadParameters() {
        let parameterCount = this._model.parameters.count;
        const savedParameterCount = this._savedParameters.getSize();
        if (parameterCount > savedParameterCount) {
            parameterCount = savedParameterCount;
        }
        for (let i = 0; i < parameterCount; ++i) {
            this._parameterValues[i] = this._savedParameters.at(i);
        }
    }
    initialize() {
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__.CSM_ASSERT)(this._model);
        this._parameterValues = this._model.parameters.values;
        this._partOpacities = this._model.parts.opacities;
        this._parameterMaximumValues = this._model.parameters.maximumValues;
        this._parameterMinimumValues = this._model.parameters.minimumValues;
        {
            const parameterIds = this._model.parameters.ids;
            const parameterCount = this._model.parameters.count;
            this._parameterIds.prepareCapacity(parameterCount);
            for (let i = 0; i < parameterCount; ++i) {
                this._parameterIds.pushBack(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(parameterIds[i]));
            }
        }
        const partCount = this._model.parts.count;
        {
            const partIds = this._model.parts.ids;
            this._partIds.prepareCapacity(partCount);
            for (let i = 0; i < partCount; ++i) {
                this._partIds.pushBack(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(partIds[i]));
            }
            this._userPartMultiplyColors.prepareCapacity(partCount);
            this._userPartScreenColors.prepareCapacity(partCount);
            this._partChildDrawables.prepareCapacity(partCount);
        }
        {
            const drawableIds = this._model.drawables.ids;
            const drawableCount = this._model.drawables.count;
            this._userMultiplyColors.prepareCapacity(drawableCount);
            this._userScreenColors.prepareCapacity(drawableCount);
            this._userCullings.prepareCapacity(drawableCount);
            const userCulling = new DrawableCullingData(false, false);
            {
                for (let i = 0; i < partCount; ++i) {
                    const multiplyColor = new _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismTextureColor(1.0, 1.0, 1.0, 1.0);
                    const screenColor = new _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismTextureColor(0.0, 0.0, 0.0, 1.0);
                    const userMultiplyColor = new PartColorData(false, multiplyColor);
                    const userScreenColor = new PartColorData(false, screenColor);
                    this._userPartMultiplyColors.pushBack(userMultiplyColor);
                    this._userPartScreenColors.pushBack(userScreenColor);
                    this._partChildDrawables.pushBack(new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector());
                    this._partChildDrawables.at(i).prepareCapacity(drawableCount);
                }
            }
            {
                for (let i = 0; i < drawableCount; ++i) {
                    const multiplyColor = new _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismTextureColor(1.0, 1.0, 1.0, 1.0);
                    const screenColor = new _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismTextureColor(0.0, 0.0, 0.0, 1.0);
                    const userMultiplyColor = new DrawableColorData(false, multiplyColor);
                    const userScreenColor = new DrawableColorData(false, screenColor);
                    this._drawableIds.pushBack(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(drawableIds[i]));
                    this._userMultiplyColors.pushBack(userMultiplyColor);
                    this._userScreenColors.pushBack(userScreenColor);
                    this._userCullings.pushBack(userCulling);
                    const parentIndex = this.getDrawableParentPartIndex(i);
                    if (parentIndex >= 0) {
                        this._partChildDrawables.at(parentIndex).pushBack(i);
                    }
                }
            }
        }
    }
    constructor(model) {
        this._model = model;
        this._parameterValues = null;
        this._parameterMaximumValues = null;
        this._parameterMinimumValues = null;
        this._partOpacities = null;
        this._savedParameters = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
        this._parameterIds = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
        this._drawableIds = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
        this._partIds = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
        this._isOverwrittenModelMultiplyColors = false;
        this._isOverwrittenModelScreenColors = false;
        this._isOverwrittenCullings = false;
        this._modelOpacity = 1.0;
        this._userMultiplyColors = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
        this._userScreenColors = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
        this._userCullings = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
        this._userPartMultiplyColors = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
        this._userPartScreenColors = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
        this._partChildDrawables = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
        this._notExistPartId = new _type_csmmap__WEBPACK_IMPORTED_MODULE_2__.csmMap();
        this._notExistParameterId = new _type_csmmap__WEBPACK_IMPORTED_MODULE_2__.csmMap();
        this._notExistParameterValues = new _type_csmmap__WEBPACK_IMPORTED_MODULE_2__.csmMap();
        this._notExistPartOpacities = new _type_csmmap__WEBPACK_IMPORTED_MODULE_2__.csmMap();
    }
    release() {
        this._model.release();
        this._model = null;
    }
    _notExistPartOpacities;
    _notExistPartId;
    _notExistParameterValues;
    _notExistParameterId;
    _savedParameters;
    _isOverwrittenModelMultiplyColors;
    _isOverwrittenModelScreenColors;
    _userMultiplyColors;
    _userScreenColors;
    _userPartScreenColors;
    _userPartMultiplyColors;
    _partChildDrawables;
    _model;
    _parameterValues;
    _parameterMaximumValues;
    _parameterMinimumValues;
    _partOpacities;
    _modelOpacity;
    _parameterIds;
    _partIds;
    _drawableIds;
    _isOverwrittenCullings;
    _userCullings;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModel = _cubismmodel__WEBPACK_IMPORTED_MODULE_5__.CubismModel;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/model/cubismmodeluserdata.ts":
/*!***************************************************************!*\
  !*** ./src/live2d/Framework/src/model/cubismmodeluserdata.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismModelUserData: function() { return /* binding */ CubismModelUserData; },
/* harmony export */   CubismModelUserDataNode: function() { return /* binding */ CubismModelUserDataNode; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _type_csmstring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmstring */ "./src/live2d/Framework/src/type/csmstring.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _cubismmodeluserdatajson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cubismmodeluserdatajson */ "./src/live2d/Framework/src/model/cubismmodeluserdatajson.ts");
/* harmony import */ var _cubismmodeluserdata__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cubismmodeluserdata */ "./src/live2d/Framework/src/model/cubismmodeluserdata.ts");




const ArtMesh = 'ArtMesh';
class CubismModelUserDataNode {
    targetType;
    targetId;
    value;
}
class CubismModelUserData {
    static create(buffer, size) {
        const ret = new CubismModelUserData();
        ret.parseUserData(buffer, size);
        return ret;
    }
    static delete(modelUserData) {
        if (modelUserData != null) {
            modelUserData.release();
            modelUserData = null;
        }
    }
    getArtMeshUserDatas() {
        return this._artMeshUserDataNode;
    }
    parseUserData(buffer, size) {
        let json = new _cubismmodeluserdatajson__WEBPACK_IMPORTED_MODULE_3__.CubismModelUserDataJson(buffer, size);
        const typeOfArtMesh = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(ArtMesh);
        const nodeCount = json.getUserDataCount();
        for (let i = 0; i < nodeCount; i++) {
            const addNode = new CubismModelUserDataNode();
            addNode.targetId = json.getUserDataId(i);
            addNode.targetType = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(json.getUserDataTargetType(i));
            addNode.value = new _type_csmstring__WEBPACK_IMPORTED_MODULE_1__.csmString(json.getUserDataValue(i));
            this._userDataNodes.pushBack(addNode);
            if (addNode.targetType == typeOfArtMesh) {
                this._artMeshUserDataNode.pushBack(addNode);
            }
        }
        json.release();
        json = void 0;
    }
    constructor() {
        this._userDataNodes = new _type_csmvector__WEBPACK_IMPORTED_MODULE_2__.csmVector();
        this._artMeshUserDataNode = new _type_csmvector__WEBPACK_IMPORTED_MODULE_2__.csmVector();
    }
    release() {
        for (let i = 0; i < this._userDataNodes.getSize(); ++i) {
            this._userDataNodes.set(i, null);
        }
        this._userDataNodes = null;
    }
    _userDataNodes;
    _artMeshUserDataNode;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModelUserData = _cubismmodeluserdata__WEBPACK_IMPORTED_MODULE_4__.CubismModelUserData;
    Live2DCubismFramework.CubismModelUserDataNode = _cubismmodeluserdata__WEBPACK_IMPORTED_MODULE_4__.CubismModelUserDataNode;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/model/cubismmodeluserdatajson.ts":
/*!*******************************************************************!*\
  !*** ./src/live2d/Framework/src/model/cubismmodeluserdatajson.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismModelUserDataJson: function() { return /* binding */ CubismModelUserDataJson; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/cubismjson */ "./src/live2d/Framework/src/utils/cubismjson.ts");
/* harmony import */ var _cubismmodeluserdatajson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubismmodeluserdatajson */ "./src/live2d/Framework/src/model/cubismmodeluserdatajson.ts");


const Meta = 'Meta';
const UserDataCount = 'UserDataCount';
const TotalUserDataSize = 'TotalUserDataSize';
const UserData = 'UserData';
const Target = 'Target';
const Id = 'Id';
const Value = 'Value';
class CubismModelUserDataJson {
    constructor(buffer, size) {
        this._json = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_1__.CubismJson.create(buffer, size);
    }
    release() {
        _utils_cubismjson__WEBPACK_IMPORTED_MODULE_1__.CubismJson["delete"](this._json);
    }
    getUserDataCount() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(UserDataCount)
            .toInt();
    }
    getTotalUserDataSize() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalUserDataSize)
            .toInt();
    }
    getUserDataTargetType(i) {
        return this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(i)
            .getValueByString(Target)
            .getRawString();
    }
    getUserDataId(i) {
        return _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(i)
            .getValueByString(Id)
            .getRawString());
    }
    getUserDataValue(i) {
        return this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(i)
            .getValueByString(Value)
            .getRawString();
    }
    _json;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModelUserDataJson = _cubismmodeluserdatajson__WEBPACK_IMPORTED_MODULE_2__.CubismModelUserDataJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/model/cubismusermodel.ts":
/*!***********************************************************!*\
  !*** ./src/live2d/Framework/src/model/cubismusermodel.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismUserModel: function() { return /* binding */ CubismUserModel; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _effect_cubismbreath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../effect/cubismbreath */ "./src/live2d/Framework/src/effect/cubismbreath.ts");
/* harmony import */ var _effect_cubismeyeblink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../effect/cubismeyeblink */ "./src/live2d/Framework/src/effect/cubismeyeblink.ts");
/* harmony import */ var _effect_cubismpose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../effect/cubismpose */ "./src/live2d/Framework/src/effect/cubismpose.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _math_cubismmodelmatrix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math/cubismmodelmatrix */ "./src/live2d/Framework/src/math/cubismmodelmatrix.ts");
/* harmony import */ var _math_cubismtargetpoint__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../math/cubismtargetpoint */ "./src/live2d/Framework/src/math/cubismtargetpoint.ts");
/* harmony import */ var _motion_cubismexpressionmotion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../motion/cubismexpressionmotion */ "./src/live2d/Framework/src/motion/cubismexpressionmotion.ts");
/* harmony import */ var _motion_cubismmotion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../motion/cubismmotion */ "./src/live2d/Framework/src/motion/cubismmotion.ts");
/* harmony import */ var _motion_cubismmotionmanager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../motion/cubismmotionmanager */ "./src/live2d/Framework/src/motion/cubismmotionmanager.ts");
/* harmony import */ var _physics_cubismphysics__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../physics/cubismphysics */ "./src/live2d/Framework/src/physics/cubismphysics.ts");
/* harmony import */ var _rendering_cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../rendering/cubismrenderer_webgl */ "./src/live2d/Framework/src/rendering/cubismrenderer_webgl.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");
/* harmony import */ var _cubismmoc__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./cubismmoc */ "./src/live2d/Framework/src/model/cubismmoc.ts");
/* harmony import */ var _cubismmodeluserdata__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cubismmodeluserdata */ "./src/live2d/Framework/src/model/cubismmodeluserdata.ts");
/* harmony import */ var _cubismusermodel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./cubismusermodel */ "./src/live2d/Framework/src/model/cubismusermodel.ts");














class CubismUserModel {
    isInitialized() {
        return this._initialized;
    }
    setInitialized(v) {
        this._initialized = v;
    }
    isUpdating() {
        return this._updating;
    }
    setUpdating(v) {
        this._updating = v;
    }
    setDragging(x, y) {
        this._dragManager.set(x, y);
    }
    setAcceleration(x, y, z) {
        this._accelerationX = x;
        this._accelerationY = y;
        this._accelerationZ = z;
    }
    getModelMatrix() {
        return this._modelMatrix;
    }
    setOpacity(a) {
        this._opacity = a;
    }
    getOpacity() {
        return this._opacity;
    }
    loadModel(buffer, shouldCheckMocConsistency = false) {
        this._moc = _cubismmoc__WEBPACK_IMPORTED_MODULE_12__.CubismMoc.create(buffer, shouldCheckMocConsistency);
        if (this._moc == null) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_11__.CubismLogError)('Failed to CubismMoc.create().');
            return;
        }
        this._model = this._moc.createModel();
        if (this._model == null) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_11__.CubismLogError)('Failed to CreateModel().');
            return;
        }
        this._model.saveParameters();
        this._modelMatrix = new _math_cubismmodelmatrix__WEBPACK_IMPORTED_MODULE_4__.CubismModelMatrix(this._model.getCanvasWidth(), this._model.getCanvasHeight());
    }
    loadMotion = (buffer, size, name, onFinishedMotionHandler) => _motion_cubismmotion__WEBPACK_IMPORTED_MODULE_7__.CubismMotion.create(buffer, size, onFinishedMotionHandler);
    loadExpression(buffer, size, name) {
        return _motion_cubismexpressionmotion__WEBPACK_IMPORTED_MODULE_6__.CubismExpressionMotion.create(buffer, size);
    }
    loadPose(buffer, size) {
        this._pose = _effect_cubismpose__WEBPACK_IMPORTED_MODULE_2__.CubismPose.create(buffer, size);
    }
    loadUserData(buffer, size) {
        this._modelUserData = _cubismmodeluserdata__WEBPACK_IMPORTED_MODULE_13__.CubismModelUserData.create(buffer, size);
    }
    loadPhysics(buffer, size) {
        this._physics = _physics_cubismphysics__WEBPACK_IMPORTED_MODULE_9__.CubismPhysics.create(buffer, size);
    }
    isHit(drawableId, pointX, pointY) {
        const drawIndex = this._model.getDrawableIndex(drawableId);
        if (drawIndex < 0) {
            return false;
        }
        const count = this._model.getDrawableVertexCount(drawIndex);
        const vertices = this._model.getDrawableVertices(drawIndex);
        let left = vertices[0];
        let right = vertices[0];
        let top = vertices[1];
        let bottom = vertices[1];
        for (let j = 1; j < count; ++j) {
            const x = vertices[_live2dcubismframework__WEBPACK_IMPORTED_MODULE_3__.Constant.vertexOffset + j * _live2dcubismframework__WEBPACK_IMPORTED_MODULE_3__.Constant.vertexStep];
            const y = vertices[_live2dcubismframework__WEBPACK_IMPORTED_MODULE_3__.Constant.vertexOffset + j * _live2dcubismframework__WEBPACK_IMPORTED_MODULE_3__.Constant.vertexStep + 1];
            if (x < left) {
                left = x;
            }
            if (x > right) {
                right = x;
            }
            if (y < top) {
                top = y;
            }
            if (y > bottom) {
                bottom = y;
            }
        }
        const tx = this._modelMatrix.invertTransformX(pointX);
        const ty = this._modelMatrix.invertTransformY(pointY);
        return left <= tx && tx <= right && top <= ty && ty <= bottom;
    }
    getModel() {
        return this._model;
    }
    getRenderer() {
        return this._renderer;
    }
    createRenderer(maskBufferCount = 1) {
        if (this._renderer) {
            this.deleteRenderer();
        }
        this._renderer = new _rendering_cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_10__.CubismRenderer_WebGL();
        this._renderer.initialize(this._model, maskBufferCount);
    }
    deleteRenderer() {
        if (this._renderer != null) {
            this._renderer.release();
            this._renderer = null;
        }
    }
    motionEventFired(eventValue) {
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_11__.CubismLogInfo)('{0}', eventValue.s);
    }
    static cubismDefaultMotionEventCallback(caller, eventValue, customData) {
        const model = customData;
        if (model != null) {
            model.motionEventFired(eventValue);
        }
    }
    constructor() {
        this._moc = null;
        this._model = null;
        this._motionManager = null;
        this._expressionManager = null;
        this._eyeBlink = null;
        this._breath = null;
        this._modelMatrix = null;
        this._pose = null;
        this._dragManager = null;
        this._physics = null;
        this._modelUserData = null;
        this._initialized = false;
        this._updating = false;
        this._opacity = 1.0;
        this._lipsync = true;
        this._lastLipSyncValue = 0.0;
        this._dragX = 0.0;
        this._dragY = 0.0;
        this._accelerationX = 0.0;
        this._accelerationY = 0.0;
        this._accelerationZ = 0.0;
        this._mocConsistency = false;
        this._debugMode = false;
        this._renderer = null;
        this._motionManager = new _motion_cubismmotionmanager__WEBPACK_IMPORTED_MODULE_8__.CubismMotionManager();
        this._motionManager.setEventCallback(CubismUserModel.cubismDefaultMotionEventCallback, this);
        this._expressionManager = new _motion_cubismmotionmanager__WEBPACK_IMPORTED_MODULE_8__.CubismMotionManager();
        this._dragManager = new _math_cubismtargetpoint__WEBPACK_IMPORTED_MODULE_5__.CubismTargetPoint();
    }
    release() {
        if (this._motionManager != null) {
            this._motionManager.release();
            this._motionManager = null;
        }
        if (this._expressionManager != null) {
            this._expressionManager.release();
            this._expressionManager = null;
        }
        if (this._moc != null) {
            this._moc.deleteModel(this._model);
            this._moc.release();
            this._moc = null;
        }
        this._modelMatrix = null;
        _effect_cubismpose__WEBPACK_IMPORTED_MODULE_2__.CubismPose["delete"](this._pose);
        _effect_cubismeyeblink__WEBPACK_IMPORTED_MODULE_1__.CubismEyeBlink["delete"](this._eyeBlink);
        _effect_cubismbreath__WEBPACK_IMPORTED_MODULE_0__.CubismBreath["delete"](this._breath);
        this._dragManager = null;
        _physics_cubismphysics__WEBPACK_IMPORTED_MODULE_9__.CubismPhysics["delete"](this._physics);
        _cubismmodeluserdata__WEBPACK_IMPORTED_MODULE_13__.CubismModelUserData["delete"](this._modelUserData);
        this.deleteRenderer();
    }
    _moc;
    _model;
    _motionManager;
    _expressionManager;
    _eyeBlink;
    _breath;
    _modelMatrix;
    _pose;
    _dragManager;
    _physics;
    _modelUserData;
    _initialized;
    _updating;
    _opacity;
    _lipsync;
    _lastLipSyncValue;
    _dragX;
    _dragY;
    _accelerationX;
    _accelerationY;
    _accelerationZ;
    _mocConsistency;
    _debugMode;
    _renderer;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismUserModel = _cubismusermodel__WEBPACK_IMPORTED_MODULE_14__.CubismUserModel;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/motion/acubismmotion.ts":
/*!**********************************************************!*\
  !*** ./src/live2d/Framework/src/motion/acubismmotion.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACubismMotion: function() { return /* binding */ ACubismMotion; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/cubismmath */ "./src/live2d/Framework/src/math/cubismmath.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");
/* harmony import */ var _acubismmotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./acubismmotion */ "./src/live2d/Framework/src/motion/acubismmotion.ts");



class ACubismMotion {
    static delete(motion) {
        motion.release();
        motion = null;
    }
    constructor() {
        this._fadeInSeconds = -1.0;
        this._fadeOutSeconds = -1.0;
        this._weight = 1.0;
        this._offsetSeconds = 0.0;
        this._firedEventValues = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
    }
    release() {
        this._weight = 0.0;
    }
    updateParameters(model, motionQueueEntry, userTimeSeconds) {
        if (!motionQueueEntry.isAvailable() || motionQueueEntry.isFinished()) {
            return;
        }
        if (!motionQueueEntry.isStarted()) {
            motionQueueEntry.setIsStarted(true);
            motionQueueEntry.setStartTime(userTimeSeconds - this._offsetSeconds);
            motionQueueEntry.setFadeInStartTime(userTimeSeconds);
            const duration = this.getDuration();
            if (motionQueueEntry.getEndTime() < 0) {
                motionQueueEntry.setEndTime(duration <= 0 ? -1 : motionQueueEntry.getStartTime() + duration);
            }
        }
        let fadeWeight = this._weight;
        const fadeIn = this._fadeInSeconds == 0.0
            ? 1.0
            : _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) /
                this._fadeInSeconds);
        const fadeOut = this._fadeOutSeconds == 0.0 || motionQueueEntry.getEndTime() < 0.0
            ? 1.0
            : _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) /
                this._fadeOutSeconds);
        fadeWeight = fadeWeight * fadeIn * fadeOut;
        motionQueueEntry.setState(userTimeSeconds, fadeWeight);
        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CSM_ASSERT)(0.0 <= fadeWeight && fadeWeight <= 1.0);
        this.doUpdateParameters(model, userTimeSeconds, fadeWeight, motionQueueEntry);
        if (motionQueueEntry.getEndTime() > 0 &&
            motionQueueEntry.getEndTime() < userTimeSeconds) {
            motionQueueEntry.setIsFinished(true);
        }
    }
    setFadeInTime(fadeInSeconds) {
        this._fadeInSeconds = fadeInSeconds;
    }
    setFadeOutTime(fadeOutSeconds) {
        this._fadeOutSeconds = fadeOutSeconds;
    }
    getFadeOutTime() {
        return this._fadeOutSeconds;
    }
    getFadeInTime() {
        return this._fadeInSeconds;
    }
    setWeight(weight) {
        this._weight = weight;
    }
    getWeight() {
        return this._weight;
    }
    getDuration() {
        return -1.0;
    }
    getLoopDuration() {
        return -1.0;
    }
    setOffsetTime(offsetSeconds) {
        this._offsetSeconds = offsetSeconds;
    }
    getFiredEvent(beforeCheckTimeSeconds, motionTimeSeconds) {
        return this._firedEventValues;
    }
    setFinishedMotionHandler = (onFinishedMotionHandler) => (this._onFinishedMotion = onFinishedMotionHandler);
    getFinishedMotionHandler = () => this._onFinishedMotion;
    isExistModelOpacity() {
        return false;
    }
    getModelOpacityIndex() {
        return -1;
    }
    getModelOpacityId(index) {
        return null;
    }
    getModelOpacityValue() {
        return 1.0;
    }
    _fadeInSeconds;
    _fadeOutSeconds;
    _weight;
    _offsetSeconds;
    _firedEventValues;
    _onFinishedMotion;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.ACubismMotion = _acubismmotion__WEBPACK_IMPORTED_MODULE_3__.ACubismMotion;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/motion/cubismexpressionmotion.ts":
/*!*******************************************************************!*\
  !*** ./src/live2d/Framework/src/motion/cubismexpressionmotion.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismExpressionMotion: function() { return /* binding */ CubismExpressionMotion; },
/* harmony export */   ExpressionBlendType: function() { return /* binding */ ExpressionBlendType; },
/* harmony export */   ExpressionParameter: function() { return /* binding */ ExpressionParameter; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/cubismjson */ "./src/live2d/Framework/src/utils/cubismjson.ts");
/* harmony import */ var _acubismmotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./acubismmotion */ "./src/live2d/Framework/src/motion/acubismmotion.ts");
/* harmony import */ var _cubismexpressionmotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cubismexpressionmotion */ "./src/live2d/Framework/src/motion/cubismexpressionmotion.ts");




const ExpressionKeyFadeIn = 'FadeInTime';
const ExpressionKeyFadeOut = 'FadeOutTime';
const ExpressionKeyParameters = 'Parameters';
const ExpressionKeyId = 'Id';
const ExpressionKeyValue = 'Value';
const ExpressionKeyBlend = 'Blend';
const BlendValueAdd = 'Add';
const BlendValueMultiply = 'Multiply';
const BlendValueOverwrite = 'Overwrite';
const DefaultFadeTime = 1.0;
class CubismExpressionMotion extends _acubismmotion__WEBPACK_IMPORTED_MODULE_3__.ACubismMotion {
    static create(buffer, size) {
        const expression = new CubismExpressionMotion();
        expression.parse(buffer, size);
        return expression;
    }
    doUpdateParameters(model, userTimeSeconds, weight, motionQueueEntry) {
        for (let i = 0; i < this._parameters.getSize(); ++i) {
            const parameter = this._parameters.at(i);
            switch (parameter.blendType) {
                case ExpressionBlendType.ExpressionBlendType_Add: {
                    model.addParameterValueById(parameter.parameterId, parameter.value, weight);
                    break;
                }
                case ExpressionBlendType.ExpressionBlendType_Multiply: {
                    model.multiplyParameterValueById(parameter.parameterId, parameter.value, weight);
                    break;
                }
                case ExpressionBlendType.ExpressionBlendType_Overwrite: {
                    model.setParameterValueById(parameter.parameterId, parameter.value, weight);
                    break;
                }
                default:
                    break;
            }
        }
    }
    parse(buffer, size) {
        const json = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__.CubismJson.create(buffer, size);
        const root = json.getRoot();
        this.setFadeInTime(root.getValueByString(ExpressionKeyFadeIn).toFloat(DefaultFadeTime));
        this.setFadeOutTime(root.getValueByString(ExpressionKeyFadeOut).toFloat(DefaultFadeTime));
        const parameterCount = root
            .getValueByString(ExpressionKeyParameters)
            .getSize();
        this._parameters.prepareCapacity(parameterCount);
        for (let i = 0; i < parameterCount; ++i) {
            const param = root
                .getValueByString(ExpressionKeyParameters)
                .getValueByIndex(i);
            const parameterId = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(param.getValueByString(ExpressionKeyId).getRawString());
            const value = param
                .getValueByString(ExpressionKeyValue)
                .toFloat();
            let blendType;
            if (param.getValueByString(ExpressionKeyBlend).isNull() ||
                param.getValueByString(ExpressionKeyBlend).getString() == BlendValueAdd) {
                blendType = ExpressionBlendType.ExpressionBlendType_Add;
            }
            else if (param.getValueByString(ExpressionKeyBlend).getString() ==
                BlendValueMultiply) {
                blendType = ExpressionBlendType.ExpressionBlendType_Multiply;
            }
            else if (param.getValueByString(ExpressionKeyBlend).getString() ==
                BlendValueOverwrite) {
                blendType = ExpressionBlendType.ExpressionBlendType_Overwrite;
            }
            else {
                blendType = ExpressionBlendType.ExpressionBlendType_Add;
            }
            const item = new ExpressionParameter();
            item.parameterId = parameterId;
            item.blendType = blendType;
            item.value = value;
            this._parameters.pushBack(item);
        }
        _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__.CubismJson["delete"](json);
    }
    constructor() {
        super();
        this._parameters = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
    }
    _parameters;
}
var ExpressionBlendType;
(function (ExpressionBlendType) {
    ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Add"] = 0] = "ExpressionBlendType_Add";
    ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Multiply"] = 1] = "ExpressionBlendType_Multiply";
    ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Overwrite"] = 2] = "ExpressionBlendType_Overwrite";
})(ExpressionBlendType || (ExpressionBlendType = {}));
class ExpressionParameter {
    parameterId;
    blendType;
    value;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismExpressionMotion = _cubismexpressionmotion__WEBPACK_IMPORTED_MODULE_4__.CubismExpressionMotion;
    Live2DCubismFramework.ExpressionBlendType = _cubismexpressionmotion__WEBPACK_IMPORTED_MODULE_4__.ExpressionBlendType;
    Live2DCubismFramework.ExpressionParameter = _cubismexpressionmotion__WEBPACK_IMPORTED_MODULE_4__.ExpressionParameter;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/motion/cubismmotion.ts":
/*!*********************************************************!*\
  !*** ./src/live2d/Framework/src/motion/cubismmotion.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismMotion: function() { return /* binding */ CubismMotion; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _math_cubismmath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/cubismmath */ "./src/live2d/Framework/src/math/cubismmath.ts");
/* harmony import */ var _type_csmstring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/csmstring */ "./src/live2d/Framework/src/type/csmstring.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");
/* harmony import */ var _acubismmotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./acubismmotion */ "./src/live2d/Framework/src/motion/acubismmotion.ts");
/* harmony import */ var _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cubismmotioninternal */ "./src/live2d/Framework/src/motion/cubismmotioninternal.ts");
/* harmony import */ var _cubismmotionjson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cubismmotionjson */ "./src/live2d/Framework/src/motion/cubismmotionjson.ts");
/* harmony import */ var _cubismmotion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cubismmotion */ "./src/live2d/Framework/src/motion/cubismmotion.ts");







const EffectNameEyeBlink = 'EyeBlink';
const EffectNameLipSync = 'LipSync';
const TargetNameModel = 'Model';
const TargetNameParameter = 'Parameter';
const TargetNamePartOpacity = 'PartOpacity';
const IdNameOpacity = 'Opacity';
const UseOldBeziersCurveMotion = false;
function lerpPoints(a, b, t) {
    const result = new _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionPoint();
    result.time = a.time + (b.time - a.time) * t;
    result.value = a.value + (b.value - a.value) * t;
    return result;
}
function linearEvaluate(points, time) {
    let t = (time - points[0].time) / (points[1].time - points[0].time);
    if (t < 0.0) {
        t = 0.0;
    }
    return points[0].value + (points[1].value - points[0].value) * t;
}
function bezierEvaluate(points, time) {
    let t = (time - points[0].time) / (points[3].time - points[0].time);
    if (t < 0.0) {
        t = 0.0;
    }
    const p01 = lerpPoints(points[0], points[1], t);
    const p12 = lerpPoints(points[1], points[2], t);
    const p23 = lerpPoints(points[2], points[3], t);
    const p012 = lerpPoints(p01, p12, t);
    const p123 = lerpPoints(p12, p23, t);
    return lerpPoints(p012, p123, t).value;
}
function bezierEvaluateBinarySearch(points, time) {
    const x_error = 0.01;
    const x = time;
    let x1 = points[0].time;
    let x2 = points[3].time;
    let cx1 = points[1].time;
    let cx2 = points[2].time;
    let ta = 0.0;
    let tb = 1.0;
    let t = 0.0;
    let i = 0;
    for (let var33 = true; i < 20; ++i) {
        if (x < x1 + x_error) {
            t = ta;
            break;
        }
        if (x2 - x_error < x) {
            t = tb;
            break;
        }
        let centerx = (cx1 + cx2) * 0.5;
        cx1 = (x1 + cx1) * 0.5;
        cx2 = (x2 + cx2) * 0.5;
        const ctrlx12 = (cx1 + centerx) * 0.5;
        const ctrlx21 = (cx2 + centerx) * 0.5;
        centerx = (ctrlx12 + ctrlx21) * 0.5;
        if (x < centerx) {
            tb = (ta + tb) * 0.5;
            if (centerx - x_error < x) {
                t = tb;
                break;
            }
            x2 = centerx;
            cx2 = ctrlx12;
        }
        else {
            ta = (ta + tb) * 0.5;
            if (x < centerx + x_error) {
                t = ta;
                break;
            }
            x1 = centerx;
            cx1 = ctrlx21;
        }
    }
    if (i == 20) {
        t = (ta + tb) * 0.5;
    }
    if (t < 0.0) {
        t = 0.0;
    }
    if (t > 1.0) {
        t = 1.0;
    }
    const p01 = lerpPoints(points[0], points[1], t);
    const p12 = lerpPoints(points[1], points[2], t);
    const p23 = lerpPoints(points[2], points[3], t);
    const p012 = lerpPoints(p01, p12, t);
    const p123 = lerpPoints(p12, p23, t);
    return lerpPoints(p012, p123, t).value;
}
function bezierEvaluateCardanoInterpretation(points, time) {
    const x = time;
    const x1 = points[0].time;
    const x2 = points[3].time;
    const cx1 = points[1].time;
    const cx2 = points[2].time;
    const a = x2 - 3.0 * cx2 + 3.0 * cx1 - x1;
    const b = 3.0 * cx2 - 6.0 * cx1 + 3.0 * x1;
    const c = 3.0 * cx1 - 3.0 * x1;
    const d = x1 - x;
    const t = _math_cubismmath__WEBPACK_IMPORTED_MODULE_1__.CubismMath.cardanoAlgorithmForBezier(a, b, c, d);
    const p01 = lerpPoints(points[0], points[1], t);
    const p12 = lerpPoints(points[1], points[2], t);
    const p23 = lerpPoints(points[2], points[3], t);
    const p012 = lerpPoints(p01, p12, t);
    const p123 = lerpPoints(p12, p23, t);
    return lerpPoints(p012, p123, t).value;
}
function steppedEvaluate(points, time) {
    return points[0].value;
}
function inverseSteppedEvaluate(points, time) {
    return points[1].value;
}
function evaluateCurve(motionData, index, time) {
    const curve = motionData.curves.at(index);
    let target = -1;
    const totalSegmentCount = curve.baseSegmentIndex + curve.segmentCount;
    let pointPosition = 0;
    for (let i = curve.baseSegmentIndex; i < totalSegmentCount; ++i) {
        pointPosition =
            motionData.segments.at(i).basePointIndex +
                (motionData.segments.at(i).segmentType ==
                    _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionSegmentType.CubismMotionSegmentType_Bezier
                    ? 3
                    : 1);
        if (motionData.points.at(pointPosition).time > time) {
            target = i;
            break;
        }
    }
    if (target == -1) {
        return motionData.points.at(pointPosition).value;
    }
    const segment = motionData.segments.at(target);
    return segment.evaluate(motionData.points.get(segment.basePointIndex), time);
}
class CubismMotion extends _acubismmotion__WEBPACK_IMPORTED_MODULE_4__.ACubismMotion {
    static create(buffer, size, onFinishedMotionHandler) {
        const ret = new CubismMotion();
        ret.parse(buffer, size);
        ret._sourceFrameRate = ret._motionData.fps;
        ret._loopDurationSeconds = ret._motionData.duration;
        ret._onFinishedMotion = onFinishedMotionHandler;
        return ret;
    }
    doUpdateParameters(model, userTimeSeconds, fadeWeight, motionQueueEntry) {
        if (this._modelCurveIdEyeBlink == null) {
            this._modelCurveIdEyeBlink =
                _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(EffectNameEyeBlink);
        }
        if (this._modelCurveIdLipSync == null) {
            this._modelCurveIdLipSync =
                _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(EffectNameLipSync);
        }
        if (this._modelCurveIdOpacity == null) {
            this._modelCurveIdOpacity =
                _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(IdNameOpacity);
        }
        let timeOffsetSeconds = userTimeSeconds - motionQueueEntry.getStartTime();
        if (timeOffsetSeconds < 0.0) {
            timeOffsetSeconds = 0.0;
        }
        let lipSyncValue = Number.MAX_VALUE;
        let eyeBlinkValue = Number.MAX_VALUE;
        const MaxTargetSize = 64;
        let lipSyncFlags = 0;
        let eyeBlinkFlags = 0;
        if (this._eyeBlinkParameterIds.getSize() > MaxTargetSize) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__.CubismLogDebug)('too many eye blink targets : {0}', this._eyeBlinkParameterIds.getSize());
        }
        if (this._lipSyncParameterIds.getSize() > MaxTargetSize) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__.CubismLogDebug)('too many lip sync targets : {0}', this._lipSyncParameterIds.getSize());
        }
        const tmpFadeIn = this._fadeInSeconds <= 0.0
            ? 1.0
            : _math_cubismmath__WEBPACK_IMPORTED_MODULE_1__.CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) /
                this._fadeInSeconds);
        const tmpFadeOut = this._fadeOutSeconds <= 0.0 || motionQueueEntry.getEndTime() < 0.0
            ? 1.0
            : _math_cubismmath__WEBPACK_IMPORTED_MODULE_1__.CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) /
                this._fadeOutSeconds);
        let value;
        let c, parameterIndex;
        let time = timeOffsetSeconds;
        if (this._isLoop) {
            while (time > this._motionData.duration) {
                time -= this._motionData.duration;
            }
        }
        const curves = this._motionData.curves;
        for (c = 0; c < this._motionData.curveCount &&
            curves.at(c).type ==
                _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionCurveTarget.CubismMotionCurveTarget_Model; ++c) {
            value = evaluateCurve(this._motionData, c, time);
            if (curves.at(c).id == this._modelCurveIdEyeBlink) {
                eyeBlinkValue = value;
            }
            else if (curves.at(c).id == this._modelCurveIdLipSync) {
                lipSyncValue = value;
            }
            else if (curves.at(c).id == this._modelCurveIdOpacity) {
                this._modelOpacity = value;
                model.setModelOapcity(this.getModelOpacityValue());
            }
        }
        let parameterMotionCurveCount = 0;
        for (; c < this._motionData.curveCount &&
            curves.at(c).type ==
                _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter; ++c) {
            parameterMotionCurveCount++;
            parameterIndex = model.getParameterIndex(curves.at(c).id);
            if (parameterIndex == -1) {
                continue;
            }
            const sourceValue = model.getParameterValueByIndex(parameterIndex);
            value = evaluateCurve(this._motionData, c, time);
            if (eyeBlinkValue != Number.MAX_VALUE) {
                for (let i = 0; i < this._eyeBlinkParameterIds.getSize() && i < MaxTargetSize; ++i) {
                    if (this._eyeBlinkParameterIds.at(i) == curves.at(c).id) {
                        value *= eyeBlinkValue;
                        eyeBlinkFlags |= 1 << i;
                        break;
                    }
                }
            }
            if (lipSyncValue != Number.MAX_VALUE) {
                for (let i = 0; i < this._lipSyncParameterIds.getSize() && i < MaxTargetSize; ++i) {
                    if (this._lipSyncParameterIds.at(i) == curves.at(c).id) {
                        value += lipSyncValue;
                        lipSyncFlags |= 1 << i;
                        break;
                    }
                }
            }
            let v;
            if (curves.at(c).fadeInTime < 0.0 && curves.at(c).fadeOutTime < 0.0) {
                v = sourceValue + (value - sourceValue) * fadeWeight;
            }
            else {
                let fin;
                let fout;
                if (curves.at(c).fadeInTime < 0.0) {
                    fin = tmpFadeIn;
                }
                else {
                    fin =
                        curves.at(c).fadeInTime == 0.0
                            ? 1.0
                            : _math_cubismmath__WEBPACK_IMPORTED_MODULE_1__.CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) /
                                curves.at(c).fadeInTime);
                }
                if (curves.at(c).fadeOutTime < 0.0) {
                    fout = tmpFadeOut;
                }
                else {
                    fout =
                        curves.at(c).fadeOutTime == 0.0 ||
                            motionQueueEntry.getEndTime() < 0.0
                            ? 1.0
                            : _math_cubismmath__WEBPACK_IMPORTED_MODULE_1__.CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) /
                                curves.at(c).fadeOutTime);
                }
                const paramWeight = this._weight * fin * fout;
                v = sourceValue + (value - sourceValue) * paramWeight;
            }
            model.setParameterValueByIndex(parameterIndex, v, 1.0);
        }
        {
            if (eyeBlinkValue != Number.MAX_VALUE) {
                for (let i = 0; i < this._eyeBlinkParameterIds.getSize() && i < MaxTargetSize; ++i) {
                    const sourceValue = model.getParameterValueById(this._eyeBlinkParameterIds.at(i));
                    if ((eyeBlinkFlags >> i) & 0x01) {
                        continue;
                    }
                    const v = sourceValue + (eyeBlinkValue - sourceValue) * fadeWeight;
                    model.setParameterValueById(this._eyeBlinkParameterIds.at(i), v);
                }
            }
            if (lipSyncValue != Number.MAX_VALUE) {
                for (let i = 0; i < this._lipSyncParameterIds.getSize() && i < MaxTargetSize; ++i) {
                    const sourceValue = model.getParameterValueById(this._lipSyncParameterIds.at(i));
                    if ((lipSyncFlags >> i) & 0x01) {
                        continue;
                    }
                    const v = sourceValue + (lipSyncValue - sourceValue) * fadeWeight;
                    model.setParameterValueById(this._lipSyncParameterIds.at(i), v);
                }
            }
        }
        for (; c < this._motionData.curveCount &&
            curves.at(c).type ==
                _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity; ++c) {
            parameterIndex = model.getParameterIndex(curves.at(c).id);
            if (parameterIndex == -1) {
                continue;
            }
            value = evaluateCurve(this._motionData, c, time);
            model.setParameterValueByIndex(parameterIndex, value);
        }
        if (timeOffsetSeconds >= this._motionData.duration) {
            if (this._isLoop) {
                motionQueueEntry.setStartTime(userTimeSeconds);
                if (this._isLoopFadeIn) {
                    motionQueueEntry.setFadeInStartTime(userTimeSeconds);
                }
            }
            else {
                if (this._onFinishedMotion) {
                    this._onFinishedMotion(this);
                }
                motionQueueEntry.setIsFinished(true);
            }
        }
        this._lastWeight = fadeWeight;
    }
    setIsLoop(loop) {
        this._isLoop = loop;
    }
    isLoop() {
        return this._isLoop;
    }
    setIsLoopFadeIn(loopFadeIn) {
        this._isLoopFadeIn = loopFadeIn;
    }
    isLoopFadeIn() {
        return this._isLoopFadeIn;
    }
    getDuration() {
        return this._isLoop ? -1.0 : this._loopDurationSeconds;
    }
    getLoopDuration() {
        return this._loopDurationSeconds;
    }
    setParameterFadeInTime(parameterId, value) {
        const curves = this._motionData.curves;
        for (let i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
                curves.at(i).fadeInTime = value;
                return;
            }
        }
    }
    setParameterFadeOutTime(parameterId, value) {
        const curves = this._motionData.curves;
        for (let i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
                curves.at(i).fadeOutTime = value;
                return;
            }
        }
    }
    getParameterFadeInTime(parameterId) {
        const curves = this._motionData.curves;
        for (let i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
                return curves.at(i).fadeInTime;
            }
        }
        return -1;
    }
    getParameterFadeOutTime(parameterId) {
        const curves = this._motionData.curves;
        for (let i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
                return curves.at(i).fadeOutTime;
            }
        }
        return -1;
    }
    setEffectIds(eyeBlinkParameterIds, lipSyncParameterIds) {
        this._eyeBlinkParameterIds = eyeBlinkParameterIds;
        this._lipSyncParameterIds = lipSyncParameterIds;
    }
    constructor() {
        super();
        this._sourceFrameRate = 30.0;
        this._loopDurationSeconds = -1.0;
        this._isLoop = false;
        this._isLoopFadeIn = true;
        this._lastWeight = 0.0;
        this._motionData = null;
        this._modelCurveIdEyeBlink = null;
        this._modelCurveIdLipSync = null;
        this._modelCurveIdOpacity = null;
        this._eyeBlinkParameterIds = null;
        this._lipSyncParameterIds = null;
        this._modelOpacity = 1.0;
    }
    release() {
        this._motionData = void 0;
        this._motionData = null;
    }
    parse(motionJson, size) {
        this._motionData = new _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionData();
        let json = new _cubismmotionjson__WEBPACK_IMPORTED_MODULE_6__.CubismMotionJson(motionJson, size);
        this._motionData.duration = json.getMotionDuration();
        this._motionData.loop = json.isMotionLoop();
        this._motionData.curveCount = json.getMotionCurveCount();
        this._motionData.fps = json.getMotionFps();
        this._motionData.eventCount = json.getEventCount();
        const areBeziersRestructed = json.getEvaluationOptionFlag(_cubismmotionjson__WEBPACK_IMPORTED_MODULE_6__.EvaluationOptionFlag.EvaluationOptionFlag_AreBeziersRistricted);
        if (json.isExistMotionFadeInTime()) {
            this._fadeInSeconds =
                json.getMotionFadeInTime() < 0.0 ? 1.0 : json.getMotionFadeInTime();
        }
        else {
            this._fadeInSeconds = 1.0;
        }
        if (json.isExistMotionFadeOutTime()) {
            this._fadeOutSeconds =
                json.getMotionFadeOutTime() < 0.0 ? 1.0 : json.getMotionFadeOutTime();
        }
        else {
            this._fadeOutSeconds = 1.0;
        }
        this._motionData.curves.updateSize(this._motionData.curveCount, _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionCurve, true);
        this._motionData.segments.updateSize(json.getMotionTotalSegmentCount(), _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionSegment, true);
        this._motionData.points.updateSize(json.getMotionTotalPointCount(), _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionPoint, true);
        this._motionData.events.updateSize(this._motionData.eventCount, _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionEvent, true);
        let totalPointCount = 0;
        let totalSegmentCount = 0;
        for (let curveCount = 0; curveCount < this._motionData.curveCount; ++curveCount) {
            if (json.getMotionCurveTarget(curveCount) == TargetNameModel) {
                this._motionData.curves.at(curveCount).type =
                    _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
            }
            else if (json.getMotionCurveTarget(curveCount) == TargetNameParameter) {
                this._motionData.curves.at(curveCount).type =
                    _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter;
            }
            else if (json.getMotionCurveTarget(curveCount) == TargetNamePartOpacity) {
                this._motionData.curves.at(curveCount).type =
                    _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity;
            }
            else {
                (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__.CubismLogWarning)('Warning : Unable to get segment type from Curve! The number of "CurveCount" may be incorrect!');
            }
            this._motionData.curves.at(curveCount).id =
                json.getMotionCurveId(curveCount);
            this._motionData.curves.at(curveCount).baseSegmentIndex =
                totalSegmentCount;
            this._motionData.curves.at(curveCount).fadeInTime =
                json.isExistMotionCurveFadeInTime(curveCount)
                    ? json.getMotionCurveFadeInTime(curveCount)
                    : -1.0;
            this._motionData.curves.at(curveCount).fadeOutTime =
                json.isExistMotionCurveFadeOutTime(curveCount)
                    ? json.getMotionCurveFadeOutTime(curveCount)
                    : -1.0;
            for (let segmentPosition = 0; segmentPosition < json.getMotionCurveSegmentCount(curveCount);) {
                if (segmentPosition == 0) {
                    this._motionData.segments.at(totalSegmentCount).basePointIndex =
                        totalPointCount;
                    this._motionData.points.at(totalPointCount).time =
                        json.getMotionCurveSegment(curveCount, segmentPosition);
                    this._motionData.points.at(totalPointCount).value =
                        json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                    totalPointCount += 1;
                    segmentPosition += 2;
                }
                else {
                    this._motionData.segments.at(totalSegmentCount).basePointIndex =
                        totalPointCount - 1;
                }
                const segment = json.getMotionCurveSegment(curveCount, segmentPosition);
                switch (segment) {
                    case _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionSegmentType.CubismMotionSegmentType_Linear: {
                        this._motionData.segments.at(totalSegmentCount).segmentType =
                            _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionSegmentType.CubismMotionSegmentType_Linear;
                        this._motionData.segments.at(totalSegmentCount).evaluate =
                            linearEvaluate;
                        this._motionData.points.at(totalPointCount).time =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                        this._motionData.points.at(totalPointCount).value =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                        totalPointCount += 1;
                        segmentPosition += 3;
                        break;
                    }
                    case _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionSegmentType.CubismMotionSegmentType_Bezier: {
                        this._motionData.segments.at(totalSegmentCount).segmentType =
                            _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionSegmentType.CubismMotionSegmentType_Bezier;
                        if (areBeziersRestructed || UseOldBeziersCurveMotion) {
                            this._motionData.segments.at(totalSegmentCount).evaluate =
                                bezierEvaluate;
                        }
                        else {
                            this._motionData.segments.at(totalSegmentCount).evaluate =
                                bezierEvaluateCardanoInterpretation;
                        }
                        this._motionData.points.at(totalPointCount).time =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                        this._motionData.points.at(totalPointCount).value =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                        this._motionData.points.at(totalPointCount + 1).time =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 3);
                        this._motionData.points.at(totalPointCount + 1).value =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 4);
                        this._motionData.points.at(totalPointCount + 2).time =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 5);
                        this._motionData.points.at(totalPointCount + 2).value =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 6);
                        totalPointCount += 3;
                        segmentPosition += 7;
                        break;
                    }
                    case _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionSegmentType.CubismMotionSegmentType_Stepped: {
                        this._motionData.segments.at(totalSegmentCount).segmentType =
                            _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionSegmentType.CubismMotionSegmentType_Stepped;
                        this._motionData.segments.at(totalSegmentCount).evaluate =
                            steppedEvaluate;
                        this._motionData.points.at(totalPointCount).time =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                        this._motionData.points.at(totalPointCount).value =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                        totalPointCount += 1;
                        segmentPosition += 3;
                        break;
                    }
                    case _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped: {
                        this._motionData.segments.at(totalSegmentCount).segmentType =
                            _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped;
                        this._motionData.segments.at(totalSegmentCount).evaluate =
                            inverseSteppedEvaluate;
                        this._motionData.points.at(totalPointCount).time =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                        this._motionData.points.at(totalPointCount).value =
                            json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                        totalPointCount += 1;
                        segmentPosition += 3;
                        break;
                    }
                    default: {
                        (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__.CSM_ASSERT)(0);
                        break;
                    }
                }
                ++this._motionData.curves.at(curveCount).segmentCount;
                ++totalSegmentCount;
            }
        }
        for (let userdatacount = 0; userdatacount < json.getEventCount(); ++userdatacount) {
            this._motionData.events.at(userdatacount).fireTime =
                json.getEventTime(userdatacount);
            this._motionData.events.at(userdatacount).value =
                json.getEventValue(userdatacount);
        }
        json.release();
        json = void 0;
        json = null;
    }
    getFiredEvent(beforeCheckTimeSeconds, motionTimeSeconds) {
        this._firedEventValues.updateSize(0);
        for (let u = 0; u < this._motionData.eventCount; ++u) {
            if (this._motionData.events.at(u).fireTime > beforeCheckTimeSeconds &&
                this._motionData.events.at(u).fireTime <= motionTimeSeconds) {
                this._firedEventValues.pushBack(new _type_csmstring__WEBPACK_IMPORTED_MODULE_2__.csmString(this._motionData.events.at(u).value.s));
            }
        }
        return this._firedEventValues;
    }
    isExistModelOpacity() {
        for (let i = 0; i < this._motionData.curveCount; i++) {
            const curve = this._motionData.curves.at(i);
            if (curve.type != _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionCurveTarget.CubismMotionCurveTarget_Model) {
                continue;
            }
            if (curve.id.getString().s.localeCompare(IdNameOpacity) == 0) {
                return true;
            }
        }
        return false;
    }
    getModelOpacityIndex() {
        if (this.isExistModelOpacity()) {
            for (let i = 0; i < this._motionData.curveCount; i++) {
                const curve = this._motionData.curves.at(i);
                if (curve.type != _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionCurveTarget.CubismMotionCurveTarget_Model) {
                    continue;
                }
                if (curve.id.getString().s.localeCompare(IdNameOpacity) == 0) {
                    return i;
                }
            }
        }
        return -1;
    }
    getModelOpacityId(index) {
        if (index != -1) {
            const curve = this._motionData.curves.at(index);
            if (curve.type == _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_5__.CubismMotionCurveTarget.CubismMotionCurveTarget_Model) {
                if (curve.id.getString().s.localeCompare(IdNameOpacity) == 0) {
                    return _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(curve.id.getString().s);
                }
            }
        }
        return null;
    }
    getModelOpacityValue() {
        return this._modelOpacity;
    }
    _sourceFrameRate;
    _loopDurationSeconds;
    _isLoop;
    _isLoopFadeIn;
    _lastWeight;
    _motionData;
    _eyeBlinkParameterIds;
    _lipSyncParameterIds;
    _modelCurveIdEyeBlink;
    _modelCurveIdLipSync;
    _modelCurveIdOpacity;
    _modelOpacity;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotion = _cubismmotion__WEBPACK_IMPORTED_MODULE_7__.CubismMotion;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/motion/cubismmotioninternal.ts":
/*!*****************************************************************!*\
  !*** ./src/live2d/Framework/src/motion/cubismmotioninternal.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismMotionCurve: function() { return /* binding */ CubismMotionCurve; },
/* harmony export */   CubismMotionCurveTarget: function() { return /* binding */ CubismMotionCurveTarget; },
/* harmony export */   CubismMotionData: function() { return /* binding */ CubismMotionData; },
/* harmony export */   CubismMotionEvent: function() { return /* binding */ CubismMotionEvent; },
/* harmony export */   CubismMotionPoint: function() { return /* binding */ CubismMotionPoint; },
/* harmony export */   CubismMotionSegment: function() { return /* binding */ CubismMotionSegment; },
/* harmony export */   CubismMotionSegmentType: function() { return /* binding */ CubismMotionSegmentType; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismmotioninternal */ "./src/live2d/Framework/src/motion/cubismmotioninternal.ts");

var CubismMotionCurveTarget;
(function (CubismMotionCurveTarget) {
    CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_Model"] = 0] = "CubismMotionCurveTarget_Model";
    CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_Parameter"] = 1] = "CubismMotionCurveTarget_Parameter";
    CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_PartOpacity"] = 2] = "CubismMotionCurveTarget_PartOpacity";
})(CubismMotionCurveTarget || (CubismMotionCurveTarget = {}));
var CubismMotionSegmentType;
(function (CubismMotionSegmentType) {
    CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Linear"] = 0] = "CubismMotionSegmentType_Linear";
    CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Bezier"] = 1] = "CubismMotionSegmentType_Bezier";
    CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Stepped"] = 2] = "CubismMotionSegmentType_Stepped";
    CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_InverseStepped"] = 3] = "CubismMotionSegmentType_InverseStepped";
})(CubismMotionSegmentType || (CubismMotionSegmentType = {}));
class CubismMotionPoint {
    time = 0.0;
    value = 0.0;
}
class CubismMotionSegment {
    constructor() {
        this.evaluate = null;
        this.basePointIndex = 0;
        this.segmentType = 0;
    }
    evaluate;
    basePointIndex;
    segmentType;
}
class CubismMotionCurve {
    constructor() {
        this.type = CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
        this.segmentCount = 0;
        this.baseSegmentIndex = 0;
        this.fadeInTime = 0.0;
        this.fadeOutTime = 0.0;
    }
    type;
    id;
    segmentCount;
    baseSegmentIndex;
    fadeInTime;
    fadeOutTime;
}
class CubismMotionEvent {
    fireTime = 0.0;
    value;
}
class CubismMotionData {
    constructor() {
        this.duration = 0.0;
        this.loop = false;
        this.curveCount = 0;
        this.eventCount = 0;
        this.fps = 0.0;
        this.curves = new _type_csmvector__WEBPACK_IMPORTED_MODULE_0__.csmVector();
        this.segments = new _type_csmvector__WEBPACK_IMPORTED_MODULE_0__.csmVector();
        this.points = new _type_csmvector__WEBPACK_IMPORTED_MODULE_0__.csmVector();
        this.events = new _type_csmvector__WEBPACK_IMPORTED_MODULE_0__.csmVector();
    }
    duration;
    loop;
    curveCount;
    eventCount;
    fps;
    curves;
    segments;
    points;
    events;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionCurve = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__.CubismMotionCurve;
    Live2DCubismFramework.CubismMotionCurveTarget = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__.CubismMotionCurveTarget;
    Live2DCubismFramework.CubismMotionData = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__.CubismMotionData;
    Live2DCubismFramework.CubismMotionEvent = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__.CubismMotionEvent;
    Live2DCubismFramework.CubismMotionPoint = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__.CubismMotionPoint;
    Live2DCubismFramework.CubismMotionSegment = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__.CubismMotionSegment;
    Live2DCubismFramework.CubismMotionSegmentType = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__.CubismMotionSegmentType;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/motion/cubismmotionjson.ts":
/*!*************************************************************!*\
  !*** ./src/live2d/Framework/src/motion/cubismmotionjson.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismMotionJson: function() { return /* binding */ CubismMotionJson; },
/* harmony export */   EvaluationOptionFlag: function() { return /* binding */ EvaluationOptionFlag; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _type_csmstring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmstring */ "./src/live2d/Framework/src/type/csmstring.ts");
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/cubismjson */ "./src/live2d/Framework/src/utils/cubismjson.ts");
/* harmony import */ var _cubismmotionjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cubismmotionjson */ "./src/live2d/Framework/src/motion/cubismmotionjson.ts");



const Meta = 'Meta';
const Duration = 'Duration';
const Loop = 'Loop';
const AreBeziersRestricted = 'AreBeziersRestricted';
const CurveCount = 'CurveCount';
const Fps = 'Fps';
const TotalSegmentCount = 'TotalSegmentCount';
const TotalPointCount = 'TotalPointCount';
const Curves = 'Curves';
const Target = 'Target';
const Id = 'Id';
const FadeInTime = 'FadeInTime';
const FadeOutTime = 'FadeOutTime';
const Segments = 'Segments';
const UserData = 'UserData';
const UserDataCount = 'UserDataCount';
const TotalUserDataSize = 'TotalUserDataSize';
const Time = 'Time';
const Value = 'Value';
class CubismMotionJson {
    constructor(buffer, size) {
        this._json = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__.CubismJson.create(buffer, size);
    }
    release() {
        _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__.CubismJson["delete"](this._json);
    }
    getMotionDuration() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(Duration)
            .toFloat();
    }
    isMotionLoop() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(Loop)
            .toBoolean();
    }
    getEvaluationOptionFlag(flagType) {
        if (EvaluationOptionFlag.EvaluationOptionFlag_AreBeziersRistricted == flagType) {
            return this._json
                .getRoot()
                .getValueByString(Meta)
                .getValueByString(AreBeziersRestricted)
                .toBoolean();
        }
        return false;
    }
    getMotionCurveCount() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(CurveCount)
            .toInt();
    }
    getMotionFps() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(Fps)
            .toFloat();
    }
    getMotionTotalSegmentCount() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalSegmentCount)
            .toInt();
    }
    getMotionTotalPointCount() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalPointCount)
            .toInt();
    }
    isExistMotionFadeInTime() {
        return !this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(FadeInTime)
            .isNull();
    }
    isExistMotionFadeOutTime() {
        return !this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(FadeOutTime)
            .isNull();
    }
    getMotionFadeInTime() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(FadeInTime)
            .toFloat();
    }
    getMotionFadeOutTime() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(FadeOutTime)
            .toFloat();
    }
    getMotionCurveTarget(curveIndex) {
        return this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(Target)
            .getRawString();
    }
    getMotionCurveId(curveIndex) {
        return _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(Id)
            .getRawString());
    }
    isExistMotionCurveFadeInTime(curveIndex) {
        return !this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(FadeInTime)
            .isNull();
    }
    isExistMotionCurveFadeOutTime(curveIndex) {
        return !this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(FadeOutTime)
            .isNull();
    }
    getMotionCurveFadeInTime(curveIndex) {
        return this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(FadeInTime)
            .toFloat();
    }
    getMotionCurveFadeOutTime(curveIndex) {
        return this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(FadeOutTime)
            .toFloat();
    }
    getMotionCurveSegmentCount(curveIndex) {
        return this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(Segments)
            .getVector()
            .getSize();
    }
    getMotionCurveSegment(curveIndex, segmentIndex) {
        return this._json
            .getRoot()
            .getValueByString(Curves)
            .getValueByIndex(curveIndex)
            .getValueByString(Segments)
            .getValueByIndex(segmentIndex)
            .toFloat();
    }
    getEventCount() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(UserDataCount)
            .toInt();
    }
    getTotalEventValueSize() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalUserDataSize)
            .toInt();
    }
    getEventTime(userDataIndex) {
        return this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(userDataIndex)
            .getValueByString(Time)
            .toFloat();
    }
    getEventValue(userDataIndex) {
        return new _type_csmstring__WEBPACK_IMPORTED_MODULE_1__.csmString(this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(userDataIndex)
            .getValueByString(Value)
            .getRawString());
    }
    _json;
}
var EvaluationOptionFlag;
(function (EvaluationOptionFlag) {
    EvaluationOptionFlag[EvaluationOptionFlag["EvaluationOptionFlag_AreBeziersRistricted"] = 0] = "EvaluationOptionFlag_AreBeziersRistricted";
})(EvaluationOptionFlag || (EvaluationOptionFlag = {}));

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionJson = _cubismmotionjson__WEBPACK_IMPORTED_MODULE_3__.CubismMotionJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/motion/cubismmotionmanager.ts":
/*!****************************************************************!*\
  !*** ./src/live2d/Framework/src/motion/cubismmotionmanager.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismMotionManager: function() { return /* binding */ CubismMotionManager; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmotionqueuemanager */ "./src/live2d/Framework/src/motion/cubismmotionqueuemanager.ts");
/* harmony import */ var _cubismmotionmanager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismmotionmanager */ "./src/live2d/Framework/src/motion/cubismmotionmanager.ts");

class CubismMotionManager extends _cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_0__.CubismMotionQueueManager {
    constructor() {
        super();
        this._currentPriority = 0;
        this._reservePriority = 0;
    }
    getCurrentPriority() {
        return this._currentPriority;
    }
    getReservePriority() {
        return this._reservePriority;
    }
    setReservePriority(val) {
        this._reservePriority = val;
    }
    startMotionPriority(motion, autoDelete, priority) {
        if (priority == this._reservePriority) {
            this._reservePriority = 0;
        }
        this._currentPriority = priority;
        return super.startMotion(motion, autoDelete, this._userTimeSeconds);
    }
    updateMotion(model, deltaTimeSeconds) {
        this._userTimeSeconds += deltaTimeSeconds;
        const updated = super.doUpdateMotion(model, this._userTimeSeconds);
        if (this.isFinished()) {
            this._currentPriority = 0;
        }
        return updated;
    }
    reserveMotion(priority) {
        if (priority <= this._reservePriority ||
            priority <= this._currentPriority) {
            return false;
        }
        this._reservePriority = priority;
        return true;
    }
    _currentPriority;
    _reservePriority;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionManager = _cubismmotionmanager__WEBPACK_IMPORTED_MODULE_1__.CubismMotionManager;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/motion/cubismmotionqueueentry.ts":
/*!*******************************************************************!*\
  !*** ./src/live2d/Framework/src/motion/cubismmotionqueueentry.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismMotionQueueEntry: function() { return /* binding */ CubismMotionQueueEntry; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _acubismmotion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./acubismmotion */ "./src/live2d/Framework/src/motion/acubismmotion.ts");
/* harmony import */ var _cubismmotionqueueentry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismmotionqueueentry */ "./src/live2d/Framework/src/motion/cubismmotionqueueentry.ts");

class CubismMotionQueueEntry {
    constructor() {
        this._autoDelete = false;
        this._motion = null;
        this._available = true;
        this._finished = false;
        this._started = false;
        this._startTimeSeconds = -1.0;
        this._fadeInStartTimeSeconds = 0.0;
        this._endTimeSeconds = -1.0;
        this._stateTimeSeconds = 0.0;
        this._stateWeight = 0.0;
        this._lastEventCheckSeconds = 0.0;
        this._motionQueueEntryHandle = this;
        this._fadeOutSeconds = 0.0;
        this._isTriggeredFadeOut = false;
    }
    release() {
        if (this._autoDelete && this._motion) {
            _acubismmotion__WEBPACK_IMPORTED_MODULE_0__.ACubismMotion["delete"](this._motion);
        }
    }
    setFadeOut(fadeOutSeconds) {
        this._fadeOutSeconds = fadeOutSeconds;
        this._isTriggeredFadeOut = true;
    }
    startFadeOut(fadeOutSeconds, userTimeSeconds) {
        const newEndTimeSeconds = userTimeSeconds + fadeOutSeconds;
        this._isTriggeredFadeOut = true;
        if (this._endTimeSeconds < 0.0 ||
            newEndTimeSeconds < this._endTimeSeconds) {
            this._endTimeSeconds = newEndTimeSeconds;
        }
    }
    isFinished() {
        return this._finished;
    }
    isStarted() {
        return this._started;
    }
    getStartTime() {
        return this._startTimeSeconds;
    }
    getFadeInStartTime() {
        return this._fadeInStartTimeSeconds;
    }
    getEndTime() {
        return this._endTimeSeconds;
    }
    setStartTime(startTime) {
        this._startTimeSeconds = startTime;
    }
    setFadeInStartTime(startTime) {
        this._fadeInStartTimeSeconds = startTime;
    }
    setEndTime(endTime) {
        this._endTimeSeconds = endTime;
    }
    setIsFinished(f) {
        this._finished = f;
    }
    setIsStarted(f) {
        this._started = f;
    }
    isAvailable() {
        return this._available;
    }
    setIsAvailable(v) {
        this._available = v;
    }
    setState(timeSeconds, weight) {
        this._stateTimeSeconds = timeSeconds;
        this._stateWeight = weight;
    }
    getStateTime() {
        return this._stateTimeSeconds;
    }
    getStateWeight() {
        return this._stateWeight;
    }
    getLastCheckEventSeconds() {
        return this._lastEventCheckSeconds;
    }
    setLastCheckEventSeconds(checkSeconds) {
        this._lastEventCheckSeconds = checkSeconds;
    }
    isTriggeredFadeOut() {
        return this._isTriggeredFadeOut;
    }
    getFadeOutSeconds() {
        return this._fadeOutSeconds;
    }
    _autoDelete;
    _motion;
    _available;
    _finished;
    _started;
    _startTimeSeconds;
    _fadeInStartTimeSeconds;
    _endTimeSeconds;
    _stateTimeSeconds;
    _stateWeight;
    _lastEventCheckSeconds;
    _fadeOutSeconds;
    _isTriggeredFadeOut;
    _motionQueueEntryHandle;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionQueueEntry = _cubismmotionqueueentry__WEBPACK_IMPORTED_MODULE_1__.CubismMotionQueueEntry;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/motion/cubismmotionqueuemanager.ts":
/*!*********************************************************************!*\
  !*** ./src/live2d/Framework/src/motion/cubismmotionqueuemanager.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismMotionQueueManager: function() { return /* binding */ CubismMotionQueueManager; },
/* harmony export */   InvalidMotionQueueEntryHandleValue: function() { return /* binding */ InvalidMotionQueueEntryHandleValue; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismmotionqueueentry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmotionqueueentry */ "./src/live2d/Framework/src/motion/cubismmotionqueueentry.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubismmotionqueuemanager */ "./src/live2d/Framework/src/motion/cubismmotionqueuemanager.ts");


class CubismMotionQueueManager {
    constructor() {
        this._userTimeSeconds = 0.0;
        this._eventCallBack = null;
        this._eventCustomData = null;
        this._motions = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
    }
    release() {
        for (let i = 0; i < this._motions.getSize(); ++i) {
            if (this._motions.at(i)) {
                this._motions.at(i).release();
                this._motions.set(i, null);
            }
        }
        this._motions = null;
    }
    startMotion(motion, autoDelete, userTimeSeconds) {
        if (motion == null) {
            return InvalidMotionQueueEntryHandleValue;
        }
        let motionQueueEntry = null;
        for (let i = 0; i < this._motions.getSize(); ++i) {
            motionQueueEntry = this._motions.at(i);
            if (motionQueueEntry == null) {
                continue;
            }
            motionQueueEntry.setFadeOut(motionQueueEntry._motion.getFadeOutTime());
        }
        motionQueueEntry = new _cubismmotionqueueentry__WEBPACK_IMPORTED_MODULE_0__.CubismMotionQueueEntry();
        motionQueueEntry._autoDelete = autoDelete;
        motionQueueEntry._motion = motion;
        this._motions.pushBack(motionQueueEntry);
        return motionQueueEntry._motionQueueEntryHandle;
    }
    isFinished() {
        for (let ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
            let motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
                ite = this._motions.erase(ite);
                continue;
            }
            const motion = motionQueueEntry._motion;
            if (motion == null) {
                motionQueueEntry.release();
                motionQueueEntry = null;
                ite = this._motions.erase(ite);
                continue;
            }
            if (!motionQueueEntry.isFinished()) {
                return false;
            }
            else {
                ite.preIncrement();
            }
        }
        return true;
    }
    isFinishedByHandle(motionQueueEntryNumber) {
        for (let ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.increment()) {
            const motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
                continue;
            }
            if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber &&
                !motionQueueEntry.isFinished()) {
                return false;
            }
        }
        return true;
    }
    stopAllMotions() {
        for (let ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
            let motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
                ite = this._motions.erase(ite);
                continue;
            }
            motionQueueEntry.release();
            motionQueueEntry = null;
            ite = this._motions.erase(ite);
        }
    }
    getCubismMotionQueueEntry(motionQueueEntryNumber) {
        for (let ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.preIncrement()) {
            const motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
                continue;
            }
            if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber) {
                return motionQueueEntry;
            }
        }
        return null;
    }
    setEventCallback(callback, customData = null) {
        this._eventCallBack = callback;
        this._eventCustomData = customData;
    }
    doUpdateMotion(model, userTimeSeconds) {
        let updated = false;
        for (let ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
            let motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
                ite = this._motions.erase(ite);
                continue;
            }
            const motion = motionQueueEntry._motion;
            if (motion == null) {
                motionQueueEntry.release();
                motionQueueEntry = null;
                ite = this._motions.erase(ite);
                continue;
            }
            motion.updateParameters(model, motionQueueEntry, userTimeSeconds);
            updated = true;
            const firedList = motion.getFiredEvent(motionQueueEntry.getLastCheckEventSeconds() -
                motionQueueEntry.getStartTime(), userTimeSeconds - motionQueueEntry.getStartTime());
            for (let i = 0; i < firedList.getSize(); ++i) {
                this._eventCallBack(this, firedList.at(i), this._eventCustomData);
            }
            motionQueueEntry.setLastCheckEventSeconds(userTimeSeconds);
            if (motionQueueEntry.isFinished()) {
                motionQueueEntry.release();
                motionQueueEntry = null;
                ite = this._motions.erase(ite);
            }
            else {
                if (motionQueueEntry.isTriggeredFadeOut()) {
                    motionQueueEntry.startFadeOut(motionQueueEntry.getFadeOutSeconds(), userTimeSeconds);
                }
                ite.preIncrement();
            }
        }
        return updated;
    }
    _userTimeSeconds;
    _motions;
    _eventCallBack;
    _eventCustomData;
}
const InvalidMotionQueueEntryHandleValue = -1;

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionQueueManager = _cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_2__.CubismMotionQueueManager;
    Live2DCubismFramework.InvalidMotionQueueEntryHandleValue = _cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_2__.InvalidMotionQueueEntryHandleValue;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/physics/cubismphysics.ts":
/*!***********************************************************!*\
  !*** ./src/live2d/Framework/src/physics/cubismphysics.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismPhysics: function() { return /* binding */ CubismPhysics; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   Options: function() { return /* binding */ Options; },
/* harmony export */   PhysicsOutput: function() { return /* binding */ PhysicsOutput; }
/* harmony export */ });
/* harmony import */ var _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/cubismmath */ "./src/live2d/Framework/src/math/cubismmath.ts");
/* harmony import */ var _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/cubismvector2 */ "./src/live2d/Framework/src/math/cubismvector2.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cubismphysicsinternal */ "./src/live2d/Framework/src/physics/cubismphysicsinternal.ts");
/* harmony import */ var _cubismphysicsjson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cubismphysicsjson */ "./src/live2d/Framework/src/physics/cubismphysicsjson.ts");
/* harmony import */ var _cubismphysics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cubismphysics */ "./src/live2d/Framework/src/physics/cubismphysics.ts");





const PhysicsTypeTagX = 'X';
const PhysicsTypeTagY = 'Y';
const PhysicsTypeTagAngle = 'Angle';
const AirResistance = 5.0;
const MaximumWeight = 100.0;
const MovementThreshold = 0.001;
const MaxDeltaTime = 5.0;
class CubismPhysics {
    static create(buffer, size) {
        const ret = new CubismPhysics();
        ret.parse(buffer, size);
        ret._physicsRig.gravity.y = 0;
        return ret;
    }
    static delete(physics) {
        if (physics != null) {
            physics.release();
            physics = null;
        }
    }
    parse(physicsJson, size) {
        this._physicsRig = new _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsRig();
        let json = new _cubismphysicsjson__WEBPACK_IMPORTED_MODULE_4__.CubismPhysicsJson(physicsJson, size);
        this._physicsRig.gravity = json.getGravity();
        this._physicsRig.wind = json.getWind();
        this._physicsRig.subRigCount = json.getSubRigCount();
        this._physicsRig.fps = json.getFps();
        this._physicsRig.settings.updateSize(this._physicsRig.subRigCount, _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsSubRig, true);
        this._physicsRig.inputs.updateSize(json.getTotalInputCount(), _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsInput, true);
        this._physicsRig.outputs.updateSize(json.getTotalOutputCount(), _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsOutput, true);
        this._physicsRig.particles.updateSize(json.getVertexCount(), _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsParticle, true);
        this._currentRigOutputs.clear();
        this._previousRigOutputs.clear();
        let inputIndex = 0, outputIndex = 0, particleIndex = 0;
        for (let i = 0; i < this._physicsRig.settings.getSize(); ++i) {
            this._physicsRig.settings.at(i).normalizationPosition.minimum =
                json.getNormalizationPositionMinimumValue(i);
            this._physicsRig.settings.at(i).normalizationPosition.maximum =
                json.getNormalizationPositionMaximumValue(i);
            this._physicsRig.settings.at(i).normalizationPosition.defalut =
                json.getNormalizationPositionDefaultValue(i);
            this._physicsRig.settings.at(i).normalizationAngle.minimum =
                json.getNormalizationAngleMinimumValue(i);
            this._physicsRig.settings.at(i).normalizationAngle.maximum =
                json.getNormalizationAngleMaximumValue(i);
            this._physicsRig.settings.at(i).normalizationAngle.defalut =
                json.getNormalizationAngleDefaultValue(i);
            this._physicsRig.settings.at(i).inputCount = json.getInputCount(i);
            this._physicsRig.settings.at(i).baseInputIndex = inputIndex;
            for (let j = 0; j < this._physicsRig.settings.at(i).inputCount; ++j) {
                this._physicsRig.inputs.at(inputIndex + j).sourceParameterIndex = -1;
                this._physicsRig.inputs.at(inputIndex + j).weight = json.getInputWeight(i, j);
                this._physicsRig.inputs.at(inputIndex + j).reflect =
                    json.getInputReflect(i, j);
                if (json.getInputType(i, j) == PhysicsTypeTagX) {
                    this._physicsRig.inputs.at(inputIndex + j).type =
                        _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsSource.CubismPhysicsSource_X;
                    this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue =
                        getInputTranslationXFromNormalizedParameterValue;
                }
                else if (json.getInputType(i, j) == PhysicsTypeTagY) {
                    this._physicsRig.inputs.at(inputIndex + j).type =
                        _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsSource.CubismPhysicsSource_Y;
                    this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue =
                        getInputTranslationYFromNormalizedParamterValue;
                }
                else if (json.getInputType(i, j) == PhysicsTypeTagAngle) {
                    this._physicsRig.inputs.at(inputIndex + j).type =
                        _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsSource.CubismPhysicsSource_Angle;
                    this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue =
                        getInputAngleFromNormalizedParameterValue;
                }
                this._physicsRig.inputs.at(inputIndex + j).source.targetType =
                    _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
                this._physicsRig.inputs.at(inputIndex + j).source.id =
                    json.getInputSourceId(i, j);
            }
            inputIndex += this._physicsRig.settings.at(i).inputCount;
            this._physicsRig.settings.at(i).outputCount = json.getOutputCount(i);
            this._physicsRig.settings.at(i).baseOutputIndex = outputIndex;
            const currentRigOutput = new PhysicsOutput();
            currentRigOutput.outputs.resize(this._physicsRig.settings.at(i).outputCount);
            const previousRigOutput = new PhysicsOutput();
            previousRigOutput.outputs.resize(this._physicsRig.settings.at(i).outputCount);
            for (let j = 0; j < this._physicsRig.settings.at(i).outputCount; ++j) {
                currentRigOutput.outputs.set(j, 0.0);
                previousRigOutput.outputs.set(j, 0.0);
                this._physicsRig.outputs.at(outputIndex + j).destinationParameterIndex =
                    -1;
                this._physicsRig.outputs.at(outputIndex + j).vertexIndex =
                    json.getOutputVertexIndex(i, j);
                this._physicsRig.outputs.at(outputIndex + j).angleScale =
                    json.getOutputAngleScale(i, j);
                this._physicsRig.outputs.at(outputIndex + j).weight =
                    json.getOutputWeight(i, j);
                this._physicsRig.outputs.at(outputIndex + j).destination.targetType =
                    _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
                this._physicsRig.outputs.at(outputIndex + j).destination.id =
                    json.getOutputDestinationId(i, j);
                if (json.getOutputType(i, j) == PhysicsTypeTagX) {
                    this._physicsRig.outputs.at(outputIndex + j).type =
                        _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsSource.CubismPhysicsSource_X;
                    this._physicsRig.outputs.at(outputIndex + j).getValue =
                        getOutputTranslationX;
                    this._physicsRig.outputs.at(outputIndex + j).getScale =
                        getOutputScaleTranslationX;
                }
                else if (json.getOutputType(i, j) == PhysicsTypeTagY) {
                    this._physicsRig.outputs.at(outputIndex + j).type =
                        _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsSource.CubismPhysicsSource_Y;
                    this._physicsRig.outputs.at(outputIndex + j).getValue =
                        getOutputTranslationY;
                    this._physicsRig.outputs.at(outputIndex + j).getScale =
                        getOutputScaleTranslationY;
                }
                else if (json.getOutputType(i, j) == PhysicsTypeTagAngle) {
                    this._physicsRig.outputs.at(outputIndex + j).type =
                        _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsSource.CubismPhysicsSource_Angle;
                    this._physicsRig.outputs.at(outputIndex + j).getValue =
                        getOutputAngle;
                    this._physicsRig.outputs.at(outputIndex + j).getScale =
                        getOutputScaleAngle;
                }
                this._physicsRig.outputs.at(outputIndex + j).reflect =
                    json.getOutputReflect(i, j);
            }
            this._currentRigOutputs.pushBack(currentRigOutput);
            this._previousRigOutputs.pushBack(previousRigOutput);
            outputIndex += this._physicsRig.settings.at(i).outputCount;
            this._physicsRig.settings.at(i).particleCount = json.getParticleCount(i);
            this._physicsRig.settings.at(i).baseParticleIndex = particleIndex;
            for (let j = 0; j < this._physicsRig.settings.at(i).particleCount; ++j) {
                this._physicsRig.particles.at(particleIndex + j).mobility =
                    json.getParticleMobility(i, j);
                this._physicsRig.particles.at(particleIndex + j).delay =
                    json.getParticleDelay(i, j);
                this._physicsRig.particles.at(particleIndex + j).acceleration =
                    json.getParticleAcceleration(i, j);
                this._physicsRig.particles.at(particleIndex + j).radius =
                    json.getParticleRadius(i, j);
                this._physicsRig.particles.at(particleIndex + j).position =
                    json.getParticlePosition(i, j);
            }
            particleIndex += this._physicsRig.settings.at(i).particleCount;
        }
        this.initialize();
        json.release();
        json = void 0;
        json = null;
    }
    stabilization(model) {
        let totalAngle;
        let weight;
        let radAngle;
        let outputValue;
        const totalTranslation = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2();
        let currentSetting;
        let currentInputs;
        let currentOutputs;
        let currentParticles;
        let parameterValues;
        let parameterMaximumValues;
        let parameterMinimumValues;
        let parameterDefaultValues;
        parameterValues = model.getModel().parameters.values;
        parameterMaximumValues = model.getModel().parameters.maximumValues;
        parameterMinimumValues = model.getModel().parameters.minimumValues;
        parameterDefaultValues = model.getModel().parameters.defaultValues;
        if ((this._parameterCaches?.length ?? 0) < model.getParameterCount()) {
            this._parameterCaches = new Float32Array(model.getParameterCount());
        }
        if ((this._parameterInputCaches?.length ?? 0) < model.getParameterCount()) {
            this._parameterInputCaches = new Float32Array(model.getParameterCount());
        }
        for (let j = 0; j < model.getParameterCount(); ++j) {
            this._parameterCaches[j] = parameterValues[j];
            this._parameterInputCaches[j] = parameterValues[j];
        }
        for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
            totalAngle = { angle: 0.0 };
            totalTranslation.x = 0.0;
            totalTranslation.y = 0.0;
            currentSetting = this._physicsRig.settings.at(settingIndex);
            currentInputs = this._physicsRig.inputs.get(currentSetting.baseInputIndex);
            currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
            currentParticles = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
            for (let i = 0; i < currentSetting.inputCount; ++i) {
                weight = currentInputs[i].weight / MaximumWeight;
                if (currentInputs[i].sourceParameterIndex == -1) {
                    currentInputs[i].sourceParameterIndex = model.getParameterIndex(currentInputs[i].source.id);
                }
                currentInputs[i].getNormalizedParameterValue(totalTranslation, totalAngle, parameterValues[currentInputs[i].sourceParameterIndex], parameterMinimumValues[currentInputs[i].sourceParameterIndex], parameterMaximumValues[currentInputs[i].sourceParameterIndex], parameterDefaultValues[currentInputs[i].sourceParameterIndex], currentSetting.normalizationPosition, currentSetting.normalizationAngle, currentInputs[i].reflect, weight);
                this._parameterCaches[currentInputs[i].sourceParameterIndex] =
                    parameterValues[currentInputs[i].sourceParameterIndex];
            }
            radAngle = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.degreesToRadian(-totalAngle.angle);
            totalTranslation.x =
                totalTranslation.x * _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.cos(radAngle) -
                    totalTranslation.y * _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.sin(radAngle);
            totalTranslation.y =
                totalTranslation.x * _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.sin(radAngle) +
                    totalTranslation.y * _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.cos(radAngle);
            updateParticlesForStabilization(currentParticles, currentSetting.particleCount, totalTranslation, totalAngle.angle, this._options.wind, MovementThreshold * currentSetting.normalizationPosition.maximum);
            for (let i = 0; i < currentSetting.outputCount; ++i) {
                const particleIndex = currentOutputs[i].vertexIndex;
                if (currentOutputs[i].destinationParameterIndex == -1) {
                    currentOutputs[i].destinationParameterIndex = model.getParameterIndex(currentOutputs[i].destination.id);
                }
                if (particleIndex < 1 ||
                    particleIndex >= currentSetting.particleCount) {
                    continue;
                }
                let translation = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2();
                translation = currentParticles[particleIndex].position.substract(currentParticles[particleIndex - 1].position);
                outputValue = currentOutputs[i].getValue(translation, currentParticles, particleIndex, currentOutputs[i].reflect, this._options.gravity);
                this._currentRigOutputs.at(settingIndex).outputs.set(i, outputValue);
                this._previousRigOutputs.at(settingIndex).outputs.set(i, outputValue);
                const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
                const outParameterCaches = !Float32Array.prototype.slice && 'subarray' in Float32Array.prototype
                    ? JSON.parse(JSON.stringify(parameterValues.subarray(destinationParameterIndex)))
                    : parameterValues.slice(destinationParameterIndex);
                updateOutputParameterValue(outParameterCaches, parameterMinimumValues[destinationParameterIndex], parameterMaximumValues[destinationParameterIndex], outputValue, currentOutputs[i]);
                for (let offset = destinationParameterIndex, outParamIndex = 0; offset < this._parameterCaches.length; offset++, outParamIndex++) {
                    parameterValues[offset] = this._parameterCaches[offset] =
                        outParameterCaches[outParamIndex];
                }
            }
        }
    }
    evaluate(model, deltaTimeSeconds) {
        let totalAngle;
        let weight;
        let radAngle;
        let outputValue;
        const totalTranslation = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2();
        let currentSetting;
        let currentInputs;
        let currentOutputs;
        let currentParticles;
        if (0.0 >= deltaTimeSeconds) {
            return;
        }
        let parameterValues;
        let parameterMaximumValues;
        let parameterMinimumValues;
        let parameterDefaultValues;
        let physicsDeltaTime;
        this._currentRemainTime += deltaTimeSeconds;
        if (this._currentRemainTime > MaxDeltaTime) {
            this._currentRemainTime = 0.0;
        }
        parameterValues = model.getModel().parameters.values;
        parameterMaximumValues = model.getModel().parameters.maximumValues;
        parameterMinimumValues = model.getModel().parameters.minimumValues;
        parameterDefaultValues = model.getModel().parameters.defaultValues;
        if ((this._parameterCaches?.length ?? 0) < model.getParameterCount()) {
            this._parameterCaches = new Float32Array(model.getParameterCount());
        }
        if ((this._parameterInputCaches?.length ?? 0) < model.getParameterCount()) {
            this._parameterInputCaches = new Float32Array(model.getParameterCount());
            for (let j = 0; j < model.getParameterCount(); ++j) {
                this._parameterInputCaches[j] = parameterValues[j];
            }
        }
        if (this._physicsRig.fps > 0.0) {
            physicsDeltaTime = 1.0 / this._physicsRig.fps;
        }
        else {
            physicsDeltaTime = deltaTimeSeconds;
        }
        while (this._currentRemainTime >= physicsDeltaTime) {
            for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
                currentSetting = this._physicsRig.settings.at(settingIndex);
                currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
                for (let i = 0; i < currentSetting.outputCount; ++i) {
                    this._previousRigOutputs
                        .at(settingIndex)
                        .outputs.set(i, this._currentRigOutputs.at(settingIndex).outputs.at(i));
                }
            }
            const inputWeight = physicsDeltaTime / this._currentRemainTime;
            for (let j = 0; j < model.getParameterCount(); ++j) {
                this._parameterCaches[j] =
                    this._parameterInputCaches[j] * (1.0 - inputWeight) +
                        parameterValues[j] * inputWeight;
                this._parameterInputCaches[j] = this._parameterCaches[j];
            }
            for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
                totalAngle = { angle: 0.0 };
                totalTranslation.x = 0.0;
                totalTranslation.y = 0.0;
                currentSetting = this._physicsRig.settings.at(settingIndex);
                currentInputs = this._physicsRig.inputs.get(currentSetting.baseInputIndex);
                currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
                currentParticles = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
                for (let i = 0; i < currentSetting.inputCount; ++i) {
                    weight = currentInputs[i].weight / MaximumWeight;
                    if (currentInputs[i].sourceParameterIndex == -1) {
                        currentInputs[i].sourceParameterIndex = model.getParameterIndex(currentInputs[i].source.id);
                    }
                    currentInputs[i].getNormalizedParameterValue(totalTranslation, totalAngle, this._parameterCaches[currentInputs[i].sourceParameterIndex], parameterMinimumValues[currentInputs[i].sourceParameterIndex], parameterMaximumValues[currentInputs[i].sourceParameterIndex], parameterDefaultValues[currentInputs[i].sourceParameterIndex], currentSetting.normalizationPosition, currentSetting.normalizationAngle, currentInputs[i].reflect, weight);
                }
                radAngle = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.degreesToRadian(-totalAngle.angle);
                totalTranslation.x =
                    totalTranslation.x * _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.cos(radAngle) -
                        totalTranslation.y * _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.sin(radAngle);
                totalTranslation.y =
                    totalTranslation.x * _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.sin(radAngle) +
                        totalTranslation.y * _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.cos(radAngle);
                updateParticles(currentParticles, currentSetting.particleCount, totalTranslation, totalAngle.angle, this._options.wind, MovementThreshold * currentSetting.normalizationPosition.maximum, physicsDeltaTime, AirResistance);
                for (let i = 0; i < currentSetting.outputCount; ++i) {
                    const particleIndex = currentOutputs[i].vertexIndex;
                    if (currentOutputs[i].destinationParameterIndex == -1) {
                        currentOutputs[i].destinationParameterIndex =
                            model.getParameterIndex(currentOutputs[i].destination.id);
                    }
                    if (particleIndex < 1 ||
                        particleIndex >= currentSetting.particleCount) {
                        continue;
                    }
                    const translation = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2();
                    translation.x =
                        currentParticles[particleIndex].position.x -
                            currentParticles[particleIndex - 1].position.x;
                    translation.y =
                        currentParticles[particleIndex].position.y -
                            currentParticles[particleIndex - 1].position.y;
                    outputValue = currentOutputs[i].getValue(translation, currentParticles, particleIndex, currentOutputs[i].reflect, this._options.gravity);
                    this._currentRigOutputs.at(settingIndex).outputs.set(i, outputValue);
                    const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
                    const outParameterCaches = !Float32Array.prototype.slice &&
                        'subarray' in Float32Array.prototype
                        ? JSON.parse(JSON.stringify(this._parameterCaches.subarray(destinationParameterIndex)))
                        : this._parameterCaches.slice(destinationParameterIndex);
                    updateOutputParameterValue(outParameterCaches, parameterMinimumValues[destinationParameterIndex], parameterMaximumValues[destinationParameterIndex], outputValue, currentOutputs[i]);
                    for (let offset = destinationParameterIndex, outParamIndex = 0; offset < this._parameterCaches.length; offset++, outParamIndex++) {
                        this._parameterCaches[offset] = outParameterCaches[outParamIndex];
                    }
                }
            }
            this._currentRemainTime -= physicsDeltaTime;
        }
        const alpha = this._currentRemainTime / physicsDeltaTime;
        this.interpolate(model, alpha);
    }
    interpolate(model, weight) {
        let currentOutputs;
        let currentSetting;
        let parameterValues;
        let parameterMaximumValues;
        let parameterMinimumValues;
        parameterValues = model.getModel().parameters.values;
        parameterMaximumValues = model.getModel().parameters.maximumValues;
        parameterMinimumValues = model.getModel().parameters.minimumValues;
        for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
            currentSetting = this._physicsRig.settings.at(settingIndex);
            currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
            for (let i = 0; i < currentSetting.outputCount; ++i) {
                if (currentOutputs[i].destinationParameterIndex == -1) {
                    continue;
                }
                const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
                const outParameterValues = !Float32Array.prototype.slice && 'subarray' in Float32Array.prototype
                    ? JSON.parse(JSON.stringify(parameterValues.subarray(destinationParameterIndex)))
                    : parameterValues.slice(destinationParameterIndex);
                updateOutputParameterValue(outParameterValues, parameterMinimumValues[destinationParameterIndex], parameterMaximumValues[destinationParameterIndex], this._previousRigOutputs.at(settingIndex).outputs.at(i) *
                    (1 - weight) +
                    this._currentRigOutputs.at(settingIndex).outputs.at(i) * weight, currentOutputs[i]);
                for (let offset = destinationParameterIndex, outParamIndex = 0; offset < parameterValues.length; offset++, outParamIndex++) {
                    parameterValues[offset] = outParameterValues[outParamIndex];
                }
            }
        }
    }
    setOptions(options) {
        this._options = options;
    }
    getOption() {
        return this._options;
    }
    constructor() {
        this._physicsRig = null;
        this._options = new Options();
        this._options.gravity.y = -1.0;
        this._options.gravity.x = 0.0;
        this._options.wind.x = 0.0;
        this._options.wind.y = 0.0;
        this._currentRigOutputs = new _type_csmvector__WEBPACK_IMPORTED_MODULE_2__.csmVector();
        this._previousRigOutputs = new _type_csmvector__WEBPACK_IMPORTED_MODULE_2__.csmVector();
        this._currentRemainTime = 0.0;
        this._parameterCaches = null;
        this._parameterInputCaches = null;
    }
    release() {
        this._physicsRig = void 0;
        this._physicsRig = null;
    }
    initialize() {
        let strand;
        let currentSetting;
        let radius;
        for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
            currentSetting = this._physicsRig.settings.at(settingIndex);
            strand = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
            strand[0].initialPosition = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
            strand[0].lastPosition = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(strand[0].initialPosition.x, strand[0].initialPosition.y);
            strand[0].lastGravity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, -1.0);
            strand[0].lastGravity.y *= -1.0;
            strand[0].velocity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
            strand[0].force = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
            for (let i = 1; i < currentSetting.particleCount; ++i) {
                radius = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
                radius.y = strand[i].radius;
                strand[i].initialPosition = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(strand[i - 1].initialPosition.x + radius.x, strand[i - 1].initialPosition.y + radius.y);
                strand[i].position = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(strand[i].initialPosition.x, strand[i].initialPosition.y);
                strand[i].lastPosition = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(strand[i].initialPosition.x, strand[i].initialPosition.y);
                strand[i].lastGravity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, -1.0);
                strand[i].lastGravity.y *= -1.0;
                strand[i].velocity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
                strand[i].force = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
            }
        }
    }
    _physicsRig;
    _options;
    _currentRigOutputs;
    _previousRigOutputs;
    _currentRemainTime;
    _parameterCaches;
    _parameterInputCaches;
}
class Options {
    constructor() {
        this.gravity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0, 0);
        this.wind = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0, 0);
    }
    gravity;
    wind;
}
class PhysicsOutput {
    constructor() {
        this.outputs = new _type_csmvector__WEBPACK_IMPORTED_MODULE_2__.csmVector(0);
    }
    outputs;
}
function sign(value) {
    let ret = 0;
    if (value > 0.0) {
        ret = 1;
    }
    else if (value < 0.0) {
        ret = -1;
    }
    return ret;
}
function getInputTranslationXFromNormalizedParameterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition, normalizationAngle, isInverted, weight) {
    targetTranslation.x +=
        normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition.minimum, normalizationPosition.maximum, normalizationPosition.defalut, isInverted) * weight;
}
function getInputTranslationYFromNormalizedParamterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition, normalizationAngle, isInverted, weight) {
    targetTranslation.y +=
        normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition.minimum, normalizationPosition.maximum, normalizationPosition.defalut, isInverted) * weight;
}
function getInputAngleFromNormalizedParameterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizaitionPosition, normalizationAngle, isInverted, weight) {
    targetAngle.angle +=
        normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationAngle.minimum, normalizationAngle.maximum, normalizationAngle.defalut, isInverted) * weight;
}
function getOutputTranslationX(translation, particles, particleIndex, isInverted, parentGravity) {
    let outputValue = translation.x;
    if (isInverted) {
        outputValue *= -1.0;
    }
    return outputValue;
}
function getOutputTranslationY(translation, particles, particleIndex, isInverted, parentGravity) {
    let outputValue = translation.y;
    if (isInverted) {
        outputValue *= -1.0;
    }
    return outputValue;
}
function getOutputAngle(translation, particles, particleIndex, isInverted, parentGravity) {
    let outputValue;
    if (particleIndex >= 2) {
        parentGravity = particles[particleIndex - 1].position.substract(particles[particleIndex - 2].position);
    }
    else {
        parentGravity = parentGravity.multiplyByScaler(-1.0);
    }
    outputValue = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.directionToRadian(parentGravity, translation);
    if (isInverted) {
        outputValue *= -1.0;
    }
    return outputValue;
}
function getRangeValue(min, max) {
    const maxValue = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.max(min, max);
    const minValue = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.min(min, max);
    return _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.abs(maxValue - minValue);
}
function getDefaultValue(min, max) {
    const minValue = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.min(min, max);
    return minValue + getRangeValue(min, max) / 2.0;
}
function getOutputScaleTranslationX(translationScale, angleScale) {
    return JSON.parse(JSON.stringify(translationScale.x));
}
function getOutputScaleTranslationY(translationScale, angleScale) {
    return JSON.parse(JSON.stringify(translationScale.y));
}
function getOutputScaleAngle(translationScale, angleScale) {
    return JSON.parse(JSON.stringify(angleScale));
}
function updateParticles(strand, strandCount, totalTranslation, totalAngle, windDirection, thresholdValue, deltaTimeSeconds, airResistance) {
    let totalRadian;
    let delay;
    let radian;
    let currentGravity;
    let direction = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
    let velocity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
    let force = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
    let newDirection = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
    strand[0].position = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(totalTranslation.x, totalTranslation.y);
    totalRadian = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.degreesToRadian(totalAngle);
    currentGravity = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.radianToDirection(totalRadian);
    currentGravity.normalize();
    for (let i = 1; i < strandCount; ++i) {
        strand[i].force = currentGravity
            .multiplyByScaler(strand[i].acceleration)
            .add(windDirection);
        strand[i].lastPosition = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(strand[i].position.x, strand[i].position.y);
        delay = strand[i].delay * deltaTimeSeconds * 30.0;
        direction = strand[i].position.substract(strand[i - 1].position);
        radian =
            _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.directionToRadian(strand[i].lastGravity, currentGravity) /
                airResistance;
        direction.x =
            _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.cos(radian) * direction.x -
                direction.y * _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.sin(radian);
        direction.y =
            _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.sin(radian) * direction.x +
                direction.y * _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.cos(radian);
        strand[i].position = strand[i - 1].position.add(direction);
        velocity = strand[i].velocity.multiplyByScaler(delay);
        force = strand[i].force.multiplyByScaler(delay).multiplyByScaler(delay);
        strand[i].position = strand[i].position.add(velocity).add(force);
        newDirection = strand[i].position.substract(strand[i - 1].position);
        newDirection.normalize();
        strand[i].position = strand[i - 1].position.add(newDirection.multiplyByScaler(strand[i].radius));
        if (_math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.abs(strand[i].position.x) < thresholdValue) {
            strand[i].position.x = 0.0;
        }
        if (delay != 0.0) {
            strand[i].velocity = strand[i].position.substract(strand[i].lastPosition);
            strand[i].velocity = strand[i].velocity.divisionByScalar(delay);
            strand[i].velocity = strand[i].velocity.multiplyByScaler(strand[i].mobility);
        }
        strand[i].force = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
        strand[i].lastGravity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(currentGravity.x, currentGravity.y);
    }
}
function updateParticlesForStabilization(strand, strandCount, totalTranslation, totalAngle, windDirection, thresholdValue) {
    let totalRadian;
    let currentGravity;
    let force = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
    strand[0].position = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(totalTranslation.x, totalTranslation.y);
    totalRadian = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.degreesToRadian(totalAngle);
    currentGravity = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.radianToDirection(totalRadian);
    currentGravity.normalize();
    for (let i = 1; i < strandCount; ++i) {
        strand[i].force = currentGravity
            .multiplyByScaler(strand[i].acceleration)
            .add(windDirection);
        strand[i].lastPosition = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(strand[i].position.x, strand[i].position.y);
        strand[i].velocity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
        force = strand[i].force;
        force.normalize();
        force = force.multiplyByScaler(strand[i].radius);
        strand[i].position = strand[i - 1].position.add(force);
        if (_math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.abs(strand[i].position.x) < thresholdValue) {
            strand[i].position.x = 0.0;
        }
        strand[i].force = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0.0, 0.0);
        strand[i].lastGravity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(currentGravity.x, currentGravity.y);
    }
}
function updateOutputParameterValue(parameterValue, parameterValueMinimum, parameterValueMaximum, translation, output) {
    let outputScale;
    let value;
    let weight;
    outputScale = output.getScale(output.translationScale, output.angleScale);
    value = translation * outputScale;
    if (value < parameterValueMinimum) {
        if (value < output.valueBelowMinimum) {
            output.valueBelowMinimum = value;
        }
        value = parameterValueMinimum;
    }
    else if (value > parameterValueMaximum) {
        if (value > output.valueExceededMaximum) {
            output.valueExceededMaximum = value;
        }
        value = parameterValueMaximum;
    }
    weight = output.weight / MaximumWeight;
    if (weight >= 1.0) {
        parameterValue[0] = value;
    }
    else {
        value = parameterValue[0] * (1.0 - weight) + value * weight;
        parameterValue[0] = value;
    }
}
function normalizeParameterValue(value, parameterMinimum, parameterMaximum, parameterDefault, normalizedMinimum, normalizedMaximum, normalizedDefault, isInverted) {
    let result = 0.0;
    const maxValue = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.max(parameterMaximum, parameterMinimum);
    if (maxValue < value) {
        value = maxValue;
    }
    const minValue = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.min(parameterMaximum, parameterMinimum);
    if (minValue > value) {
        value = minValue;
    }
    const minNormValue = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.min(normalizedMinimum, normalizedMaximum);
    const maxNormValue = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__.CubismMath.max(normalizedMinimum, normalizedMaximum);
    const middleNormValue = normalizedDefault;
    const middleValue = getDefaultValue(minValue, maxValue);
    const paramValue = value - middleValue;
    switch (sign(paramValue)) {
        case 1: {
            const nLength = maxNormValue - middleNormValue;
            const pLength = maxValue - middleValue;
            if (pLength != 0.0) {
                result = paramValue * (nLength / pLength);
                result += middleNormValue;
            }
            break;
        }
        case -1: {
            const nLength = minNormValue - middleNormValue;
            const pLength = minValue - middleValue;
            if (pLength != 0.0) {
                result = paramValue * (nLength / pLength);
                result += middleNormValue;
            }
            break;
        }
        case 0: {
            result = middleNormValue;
            break;
        }
        default: {
            break;
        }
    }
    return isInverted ? result : result * -1.0;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismPhysics = _cubismphysics__WEBPACK_IMPORTED_MODULE_5__.CubismPhysics;
    Live2DCubismFramework.Options = _cubismphysics__WEBPACK_IMPORTED_MODULE_5__.Options;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/physics/cubismphysicsinternal.ts":
/*!*******************************************************************!*\
  !*** ./src/live2d/Framework/src/physics/cubismphysicsinternal.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismPhysicsInput: function() { return /* binding */ CubismPhysicsInput; },
/* harmony export */   CubismPhysicsNormalization: function() { return /* binding */ CubismPhysicsNormalization; },
/* harmony export */   CubismPhysicsOutput: function() { return /* binding */ CubismPhysicsOutput; },
/* harmony export */   CubismPhysicsParameter: function() { return /* binding */ CubismPhysicsParameter; },
/* harmony export */   CubismPhysicsParticle: function() { return /* binding */ CubismPhysicsParticle; },
/* harmony export */   CubismPhysicsRig: function() { return /* binding */ CubismPhysicsRig; },
/* harmony export */   CubismPhysicsSource: function() { return /* binding */ CubismPhysicsSource; },
/* harmony export */   CubismPhysicsSubRig: function() { return /* binding */ CubismPhysicsSubRig; },
/* harmony export */   CubismPhysicsTargetType: function() { return /* binding */ CubismPhysicsTargetType; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   PhysicsJsonEffectiveForces: function() { return /* binding */ PhysicsJsonEffectiveForces; }
/* harmony export */ });
/* harmony import */ var _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/cubismvector2 */ "./src/live2d/Framework/src/math/cubismvector2.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubismphysicsinternal */ "./src/live2d/Framework/src/physics/cubismphysicsinternal.ts");


var CubismPhysicsTargetType;
(function (CubismPhysicsTargetType) {
    CubismPhysicsTargetType[CubismPhysicsTargetType["CubismPhysicsTargetType_Parameter"] = 0] = "CubismPhysicsTargetType_Parameter";
})(CubismPhysicsTargetType || (CubismPhysicsTargetType = {}));
var CubismPhysicsSource;
(function (CubismPhysicsSource) {
    CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_X"] = 0] = "CubismPhysicsSource_X";
    CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_Y"] = 1] = "CubismPhysicsSource_Y";
    CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_Angle"] = 2] = "CubismPhysicsSource_Angle";
})(CubismPhysicsSource || (CubismPhysicsSource = {}));
class PhysicsJsonEffectiveForces {
    constructor() {
        this.gravity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
        this.wind = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
    }
    gravity;
    wind;
}
class CubismPhysicsParameter {
    id;
    targetType;
}
class CubismPhysicsNormalization {
    minimum;
    maximum;
    defalut;
}
class CubismPhysicsParticle {
    constructor() {
        this.initialPosition = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
        this.position = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
        this.lastPosition = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
        this.lastGravity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
        this.force = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
        this.velocity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
    }
    initialPosition;
    mobility;
    delay;
    acceleration;
    radius;
    position;
    lastPosition;
    lastGravity;
    force;
    velocity;
}
class CubismPhysicsSubRig {
    constructor() {
        this.normalizationPosition = new CubismPhysicsNormalization();
        this.normalizationAngle = new CubismPhysicsNormalization();
    }
    inputCount;
    outputCount;
    particleCount;
    baseInputIndex;
    baseOutputIndex;
    baseParticleIndex;
    normalizationPosition;
    normalizationAngle;
}
class CubismPhysicsInput {
    constructor() {
        this.source = new CubismPhysicsParameter();
    }
    source;
    sourceParameterIndex;
    weight;
    type;
    reflect;
    getNormalizedParameterValue;
}
class CubismPhysicsOutput {
    constructor() {
        this.destination = new CubismPhysicsParameter();
        this.translationScale = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
    }
    destination;
    destinationParameterIndex;
    vertexIndex;
    translationScale;
    angleScale;
    weight;
    type;
    reflect;
    valueBelowMinimum;
    valueExceededMaximum;
    getValue;
    getScale;
}
class CubismPhysicsRig {
    constructor() {
        this.settings = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
        this.inputs = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
        this.outputs = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
        this.particles = new _type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
        this.gravity = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
        this.wind = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__.CubismVector2(0, 0);
        this.fps = 0.0;
    }
    subRigCount;
    settings;
    inputs;
    outputs;
    particles;
    gravity;
    wind;
    fps;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismPhysicsInput = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__.CubismPhysicsInput;
    Live2DCubismFramework.CubismPhysicsNormalization = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__.CubismPhysicsNormalization;
    Live2DCubismFramework.CubismPhysicsOutput = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__.CubismPhysicsOutput;
    Live2DCubismFramework.CubismPhysicsParameter = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__.CubismPhysicsParameter;
    Live2DCubismFramework.CubismPhysicsParticle = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__.CubismPhysicsParticle;
    Live2DCubismFramework.CubismPhysicsRig = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__.CubismPhysicsRig;
    Live2DCubismFramework.CubismPhysicsSource = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__.CubismPhysicsSource;
    Live2DCubismFramework.CubismPhysicsSubRig = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__.CubismPhysicsSubRig;
    Live2DCubismFramework.CubismPhysicsTargetType = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__.CubismPhysicsTargetType;
    Live2DCubismFramework.PhysicsJsonEffectiveForces = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_2__.PhysicsJsonEffectiveForces;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/physics/cubismphysicsjson.ts":
/*!***************************************************************!*\
  !*** ./src/live2d/Framework/src/physics/cubismphysicsjson.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismPhysicsJson: function() { return /* binding */ CubismPhysicsJson; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/cubismvector2 */ "./src/live2d/Framework/src/math/cubismvector2.ts");
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/cubismjson */ "./src/live2d/Framework/src/utils/cubismjson.ts");
/* harmony import */ var _cubismphysicsjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cubismphysicsjson */ "./src/live2d/Framework/src/physics/cubismphysicsjson.ts");



const Position = 'Position';
const X = 'X';
const Y = 'Y';
const Angle = 'Angle';
const Type = 'Type';
const Id = 'Id';
const Meta = 'Meta';
const EffectiveForces = 'EffectiveForces';
const TotalInputCount = 'TotalInputCount';
const TotalOutputCount = 'TotalOutputCount';
const PhysicsSettingCount = 'PhysicsSettingCount';
const Gravity = 'Gravity';
const Wind = 'Wind';
const VertexCount = 'VertexCount';
const Fps = 'Fps';
const PhysicsSettings = 'PhysicsSettings';
const Normalization = 'Normalization';
const Minimum = 'Minimum';
const Maximum = 'Maximum';
const Default = 'Default';
const Reflect = 'Reflect';
const Weight = 'Weight';
const Input = 'Input';
const Source = 'Source';
const Output = 'Output';
const Scale = 'Scale';
const VertexIndex = 'VertexIndex';
const Destination = 'Destination';
const Vertices = 'Vertices';
const Mobility = 'Mobility';
const Delay = 'Delay';
const Radius = 'Radius';
const Acceleration = 'Acceleration';
class CubismPhysicsJson {
    constructor(buffer, size) {
        this._json = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__.CubismJson.create(buffer, size);
    }
    release() {
        _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__.CubismJson["delete"](this._json);
    }
    getGravity() {
        const ret = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0, 0);
        ret.x = this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(EffectiveForces)
            .getValueByString(Gravity)
            .getValueByString(X)
            .toFloat();
        ret.y = this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(EffectiveForces)
            .getValueByString(Gravity)
            .getValueByString(Y)
            .toFloat();
        return ret;
    }
    getWind() {
        const ret = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0, 0);
        ret.x = this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(EffectiveForces)
            .getValueByString(Wind)
            .getValueByString(X)
            .toFloat();
        ret.y = this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(EffectiveForces)
            .getValueByString(Wind)
            .getValueByString(Y)
            .toFloat();
        return ret;
    }
    getFps() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(Fps)
            .toFloat(0.0);
    }
    getSubRigCount() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(PhysicsSettingCount)
            .toInt();
    }
    getTotalInputCount() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalInputCount)
            .toInt();
    }
    getTotalOutputCount() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalOutputCount)
            .toInt();
    }
    getVertexCount() {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(VertexCount)
            .toInt();
    }
    getNormalizationPositionMinimumValue(physicsSettingIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Normalization)
            .getValueByString(Position)
            .getValueByString(Minimum)
            .toFloat();
    }
    getNormalizationPositionMaximumValue(physicsSettingIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Normalization)
            .getValueByString(Position)
            .getValueByString(Maximum)
            .toFloat();
    }
    getNormalizationPositionDefaultValue(physicsSettingIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Normalization)
            .getValueByString(Position)
            .getValueByString(Default)
            .toFloat();
    }
    getNormalizationAngleMinimumValue(physicsSettingIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Normalization)
            .getValueByString(Angle)
            .getValueByString(Minimum)
            .toFloat();
    }
    getNormalizationAngleMaximumValue(physicsSettingIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Normalization)
            .getValueByString(Angle)
            .getValueByString(Maximum)
            .toFloat();
    }
    getNormalizationAngleDefaultValue(physicsSettingIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Normalization)
            .getValueByString(Angle)
            .getValueByString(Default)
            .toFloat();
    }
    getInputCount(physicsSettingIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Input)
            .getVector()
            .getSize();
    }
    getInputWeight(physicsSettingIndex, inputIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Input)
            .getValueByIndex(inputIndex)
            .getValueByString(Weight)
            .toFloat();
    }
    getInputReflect(physicsSettingIndex, inputIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Input)
            .getValueByIndex(inputIndex)
            .getValueByString(Reflect)
            .toBoolean();
    }
    getInputType(physicsSettingIndex, inputIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Input)
            .getValueByIndex(inputIndex)
            .getValueByString(Type)
            .getRawString();
    }
    getInputSourceId(physicsSettingIndex, inputIndex) {
        return _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Input)
            .getValueByIndex(inputIndex)
            .getValueByString(Source)
            .getValueByString(Id)
            .getRawString());
    }
    getOutputCount(physicsSettingIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Output)
            .getVector()
            .getSize();
    }
    getOutputVertexIndex(physicsSettingIndex, outputIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Output)
            .getValueByIndex(outputIndex)
            .getValueByString(VertexIndex)
            .toInt();
    }
    getOutputAngleScale(physicsSettingIndex, outputIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Output)
            .getValueByIndex(outputIndex)
            .getValueByString(Scale)
            .toFloat();
    }
    getOutputWeight(physicsSettingIndex, outputIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Output)
            .getValueByIndex(outputIndex)
            .getValueByString(Weight)
            .toFloat();
    }
    getOutputDestinationId(physicsSettingIndex, outputIndex) {
        return _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.getIdManager().getId(this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Output)
            .getValueByIndex(outputIndex)
            .getValueByString(Destination)
            .getValueByString(Id)
            .getRawString());
    }
    getOutputType(physicsSettingIndex, outputIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Output)
            .getValueByIndex(outputIndex)
            .getValueByString(Type)
            .getRawString();
    }
    getOutputReflect(physicsSettingIndex, outputIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Output)
            .getValueByIndex(outputIndex)
            .getValueByString(Reflect)
            .toBoolean();
    }
    getParticleCount(physicsSettingIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Vertices)
            .getVector()
            .getSize();
    }
    getParticleMobility(physicsSettingIndex, vertexIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Vertices)
            .getValueByIndex(vertexIndex)
            .getValueByString(Mobility)
            .toFloat();
    }
    getParticleDelay(physicsSettingIndex, vertexIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Vertices)
            .getValueByIndex(vertexIndex)
            .getValueByString(Delay)
            .toFloat();
    }
    getParticleAcceleration(physicsSettingIndex, vertexIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Vertices)
            .getValueByIndex(vertexIndex)
            .getValueByString(Acceleration)
            .toFloat();
    }
    getParticleRadius(physicsSettingIndex, vertexIndex) {
        return this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Vertices)
            .getValueByIndex(vertexIndex)
            .getValueByString(Radius)
            .toFloat();
    }
    getParticlePosition(physicsSettingIndex, vertexIndex) {
        const ret = new _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__.CubismVector2(0, 0);
        ret.x = this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Vertices)
            .getValueByIndex(vertexIndex)
            .getValueByString(Position)
            .getValueByString(X)
            .toFloat();
        ret.y = this._json
            .getRoot()
            .getValueByString(PhysicsSettings)
            .getValueByIndex(physicsSettingIndex)
            .getValueByString(Vertices)
            .getValueByIndex(vertexIndex)
            .getValueByString(Position)
            .getValueByString(Y)
            .toFloat();
        return ret;
    }
    _json;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismPhysicsJson = _cubismphysicsjson__WEBPACK_IMPORTED_MODULE_3__.CubismPhysicsJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/rendering/cubismrenderer.ts":
/*!**************************************************************!*\
  !*** ./src/live2d/Framework/src/rendering/cubismrenderer.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismBlendMode: function() { return /* binding */ CubismBlendMode; },
/* harmony export */   CubismRenderer: function() { return /* binding */ CubismRenderer; },
/* harmony export */   CubismTextureColor: function() { return /* binding */ CubismTextureColor; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/cubismmatrix44 */ "./src/live2d/Framework/src/math/cubismmatrix44.ts");
/* harmony import */ var _cubismrenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismrenderer */ "./src/live2d/Framework/src/rendering/cubismrenderer.ts");

class CubismRenderer {
    static create() {
        return null;
    }
    static delete(renderer) {
        renderer = null;
    }
    initialize(model) {
        this._model = model;
    }
    drawModel() {
        if (this.getModel() == null)
            return;
        this.saveProfile();
        this.doDrawModel();
        this.restoreProfile();
    }
    setMvpMatrix(matrix44) {
        this._mvpMatrix4x4.setMatrix(matrix44.getArray());
    }
    getMvpMatrix() {
        return this._mvpMatrix4x4;
    }
    setModelColor(red, green, blue, alpha) {
        if (red < 0.0) {
            red = 0.0;
        }
        else if (red > 1.0) {
            red = 1.0;
        }
        if (green < 0.0) {
            green = 0.0;
        }
        else if (green > 1.0) {
            green = 1.0;
        }
        if (blue < 0.0) {
            blue = 0.0;
        }
        else if (blue > 1.0) {
            blue = 1.0;
        }
        if (alpha < 0.0) {
            alpha = 0.0;
        }
        else if (alpha > 1.0) {
            alpha = 1.0;
        }
        this._modelColor.R = red;
        this._modelColor.G = green;
        this._modelColor.B = blue;
        this._modelColor.A = alpha;
    }
    getModelColor() {
        return JSON.parse(JSON.stringify(this._modelColor));
    }
    setIsPremultipliedAlpha(enable) {
        this._isPremultipliedAlpha = enable;
    }
    isPremultipliedAlpha() {
        return this._isPremultipliedAlpha;
    }
    setIsCulling(culling) {
        this._isCulling = culling;
    }
    isCulling() {
        return this._isCulling;
    }
    setAnisotropy(n) {
        this._anisotropy = n;
    }
    getAnisotropy() {
        return this._anisotropy;
    }
    getModel() {
        return this._model;
    }
    useHighPrecisionMask(high) {
        this._useHighPrecisionMask = high;
    }
    isUsingHighPrecisionMask() {
        return this._useHighPrecisionMask;
    }
    constructor() {
        this._isCulling = false;
        this._isPremultipliedAlpha = false;
        this._anisotropy = 0.0;
        this._model = null;
        this._modelColor = new CubismTextureColor();
        this._useHighPrecisionMask = false;
        this._mvpMatrix4x4 = new _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44();
        this._mvpMatrix4x4.loadIdentity();
    }
    static staticRelease;
    _mvpMatrix4x4;
    _modelColor;
    _isCulling;
    _isPremultipliedAlpha;
    _anisotropy;
    _model;
    _useHighPrecisionMask;
}
var CubismBlendMode;
(function (CubismBlendMode) {
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Normal"] = 0] = "CubismBlendMode_Normal";
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Additive"] = 1] = "CubismBlendMode_Additive";
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Multiplicative"] = 2] = "CubismBlendMode_Multiplicative";
})(CubismBlendMode || (CubismBlendMode = {}));
class CubismTextureColor {
    constructor(r = 1.0, g = 1.0, b = 1.0, a = 1.0) {
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a;
    }
    R;
    G;
    B;
    A;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismBlendMode = _cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismBlendMode;
    Live2DCubismFramework.CubismRenderer = _cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismRenderer;
    Live2DCubismFramework.CubismTextureColor = _cubismrenderer__WEBPACK_IMPORTED_MODULE_1__.CubismTextureColor;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/rendering/cubismrenderer_webgl.ts":
/*!********************************************************************!*\
  !*** ./src/live2d/Framework/src/rendering/cubismrenderer_webgl.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismClippingContext: function() { return /* binding */ CubismClippingContext; },
/* harmony export */   CubismClippingManager_WebGL: function() { return /* binding */ CubismClippingManager_WebGL; },
/* harmony export */   CubismRenderTextureResource: function() { return /* binding */ CubismRenderTextureResource; },
/* harmony export */   CubismRendererProfile_WebGL: function() { return /* binding */ CubismRendererProfile_WebGL; },
/* harmony export */   CubismRenderer_WebGL: function() { return /* binding */ CubismRenderer_WebGL; },
/* harmony export */   CubismShaderSet: function() { return /* binding */ CubismShaderSet; },
/* harmony export */   CubismShader_WebGL: function() { return /* binding */ CubismShader_WebGL; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   ShaderNames: function() { return /* binding */ ShaderNames; },
/* harmony export */   fragmentShaderSrcMaskInvertedPremultipliedAlpha: function() { return /* binding */ fragmentShaderSrcMaskInvertedPremultipliedAlpha; },
/* harmony export */   fragmentShaderSrcMaskPremultipliedAlpha: function() { return /* binding */ fragmentShaderSrcMaskPremultipliedAlpha; },
/* harmony export */   fragmentShaderSrcPremultipliedAlpha: function() { return /* binding */ fragmentShaderSrcPremultipliedAlpha; },
/* harmony export */   fragmentShaderSrcsetupMask: function() { return /* binding */ fragmentShaderSrcsetupMask; },
/* harmony export */   vertexShaderSrc: function() { return /* binding */ vertexShaderSrc; },
/* harmony export */   vertexShaderSrcMasked: function() { return /* binding */ vertexShaderSrcMasked; },
/* harmony export */   vertexShaderSrcSetupMask: function() { return /* binding */ vertexShaderSrcSetupMask; }
/* harmony export */ });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/cubismmatrix44 */ "./src/live2d/Framework/src/math/cubismmatrix44.ts");
/* harmony import */ var _type_csmmap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/csmmap */ "./src/live2d/Framework/src/type/csmmap.ts");
/* harmony import */ var _type_csmrectf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type/csmrectf */ "./src/live2d/Framework/src/type/csmrectf.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");
/* harmony import */ var _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cubismrenderer */ "./src/live2d/Framework/src/rendering/cubismrenderer.ts");
/* harmony import */ var _cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cubismrenderer_webgl */ "./src/live2d/Framework/src/rendering/cubismrenderer_webgl.ts");







const ColorChannelCount = 4;
const ClippingMaskMaxCountOnDefault = 36;
const ClippingMaskMaxCountOnMultiRenderTexture = 32;
const ShaderCount = 10;
let s_instance;
let s_viewport;
let s_fbo;
class CubismClippingManager_WebGL {
    getChannelFlagAsColor(channelNo) {
        return this._channelColors.at(channelNo);
    }
    getMaskRenderTexture() {
        if (this._maskTexture && this._maskTexture.textures != null) {
            this._maskTexture.frameNo = this._currentFrameNo;
        }
        else {
            if (this._maskRenderTextures != null) {
                this._maskRenderTextures.clear();
            }
            this._maskRenderTextures = new _type_csmvector__WEBPACK_IMPORTED_MODULE_4__.csmVector();
            if (this._maskColorBuffers != null) {
                this._maskColorBuffers.clear();
            }
            this._maskColorBuffers = new _type_csmvector__WEBPACK_IMPORTED_MODULE_4__.csmVector();
            const size = this._clippingMaskBufferSize;
            for (let index = 0; index < this._renderTextureCount; index++) {
                this._maskColorBuffers.pushBack(this.gl.createTexture());
                this.gl.bindTexture(this.gl.TEXTURE_2D, this._maskColorBuffers.at(index));
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, size, size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
                this.gl.bindTexture(this.gl.TEXTURE_2D, null);
                this._maskRenderTextures.pushBack(this.gl.createFramebuffer());
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._maskRenderTextures.at(index));
                this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this._maskColorBuffers.at(index), 0);
            }
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);
            this._maskTexture = new CubismRenderTextureResource(this._currentFrameNo, this._maskRenderTextures);
        }
        return this._maskTexture.textures;
    }
    setGL(gl) {
        this.gl = gl;
    }
    calcClippedDrawTotalBounds(model, clippingContext) {
        let clippedDrawTotalMinX = Number.MAX_VALUE;
        let clippedDrawTotalMinY = Number.MAX_VALUE;
        let clippedDrawTotalMaxX = Number.MIN_VALUE;
        let clippedDrawTotalMaxY = Number.MIN_VALUE;
        const clippedDrawCount = clippingContext._clippedDrawableIndexList.length;
        for (let clippedDrawableIndex = 0; clippedDrawableIndex < clippedDrawCount; clippedDrawableIndex++) {
            const drawableIndex = clippingContext._clippedDrawableIndexList[clippedDrawableIndex];
            const drawableVertexCount = model.getDrawableVertexCount(drawableIndex);
            const drawableVertexes = model.getDrawableVertices(drawableIndex);
            let minX = Number.MAX_VALUE;
            let minY = Number.MAX_VALUE;
            let maxX = -Number.MAX_VALUE;
            let maxY = -Number.MAX_VALUE;
            const loop = drawableVertexCount * _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.Constant.vertexStep;
            for (let pi = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.Constant.vertexOffset; pi < loop; pi += _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.Constant.vertexStep) {
                const x = drawableVertexes[pi];
                const y = drawableVertexes[pi + 1];
                if (x < minX) {
                    minX = x;
                }
                if (x > maxX) {
                    maxX = x;
                }
                if (y < minY) {
                    minY = y;
                }
                if (y > maxY) {
                    maxY = y;
                }
            }
            if (minX == Number.MAX_VALUE) {
                continue;
            }
            if (minX < clippedDrawTotalMinX) {
                clippedDrawTotalMinX = minX;
            }
            if (minY < clippedDrawTotalMinY) {
                clippedDrawTotalMinY = minY;
            }
            if (maxX > clippedDrawTotalMaxX) {
                clippedDrawTotalMaxX = maxX;
            }
            if (maxY > clippedDrawTotalMaxY) {
                clippedDrawTotalMaxY = maxY;
            }
            if (clippedDrawTotalMinX == Number.MAX_VALUE) {
                clippingContext._allClippedDrawRect.x = 0.0;
                clippingContext._allClippedDrawRect.y = 0.0;
                clippingContext._allClippedDrawRect.width = 0.0;
                clippingContext._allClippedDrawRect.height = 0.0;
                clippingContext._isUsing = false;
            }
            else {
                clippingContext._isUsing = true;
                const w = clippedDrawTotalMaxX - clippedDrawTotalMinX;
                const h = clippedDrawTotalMaxY - clippedDrawTotalMinY;
                clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
                clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
                clippingContext._allClippedDrawRect.width = w;
                clippingContext._allClippedDrawRect.height = h;
            }
        }
    }
    constructor() {
        this._currentMaskRenderTexture = null;
        this._maskColorBuffers = null;
        this._currentFrameNo = 0;
        this._renderTextureCount = 0;
        this._clippingMaskBufferSize = 256;
        this._clippingContextListForMask = new _type_csmvector__WEBPACK_IMPORTED_MODULE_4__.csmVector();
        this._clippingContextListForDraw = new _type_csmvector__WEBPACK_IMPORTED_MODULE_4__.csmVector();
        this._channelColors = new _type_csmvector__WEBPACK_IMPORTED_MODULE_4__.csmVector();
        this._tmpBoundsOnModel = new _type_csmrectf__WEBPACK_IMPORTED_MODULE_3__.csmRect();
        this._tmpMatrix = new _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_1__.CubismMatrix44();
        this._tmpMatrixForMask = new _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_1__.CubismMatrix44();
        this._tmpMatrixForDraw = new _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_1__.CubismMatrix44();
        this._maskTexture = null;
        let tmp = new _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismTextureColor();
        tmp.R = 1.0;
        tmp.G = 0.0;
        tmp.B = 0.0;
        tmp.A = 0.0;
        this._channelColors.pushBack(tmp);
        tmp = new _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismTextureColor();
        tmp.R = 0.0;
        tmp.G = 1.0;
        tmp.B = 0.0;
        tmp.A = 0.0;
        this._channelColors.pushBack(tmp);
        tmp = new _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismTextureColor();
        tmp.R = 0.0;
        tmp.G = 0.0;
        tmp.B = 1.0;
        tmp.A = 0.0;
        this._channelColors.pushBack(tmp);
        tmp = new _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismTextureColor();
        tmp.R = 0.0;
        tmp.G = 0.0;
        tmp.B = 0.0;
        tmp.A = 1.0;
        this._channelColors.pushBack(tmp);
    }
    release() {
        for (let i = 0; i < this._clippingContextListForMask.getSize(); i++) {
            if (this._clippingContextListForMask.at(i)) {
                this._clippingContextListForMask.at(i).release();
                this._clippingContextListForMask.set(i, void 0);
            }
            this._clippingContextListForMask.set(i, null);
        }
        this._clippingContextListForMask = null;
        for (let i = 0; i < this._clippingContextListForDraw.getSize(); i++) {
            this._clippingContextListForDraw.set(i, null);
        }
        this._clippingContextListForDraw = null;
        if (this._maskTexture) {
            for (let i = 0; i < this._maskTexture.textures.getSize(); i++) {
                this.gl.deleteFramebuffer(this._maskTexture.textures.at(i));
            }
            this._maskTexture.textures.clear();
            this._maskTexture.textures = null;
            this._maskTexture = null;
        }
        for (let i = 0; i < this._channelColors.getSize(); i++) {
            this._channelColors.set(i, null);
        }
        this._channelColors = null;
        if (this._maskColorBuffers != null) {
            for (let index = 0; index < this._maskColorBuffers.getSize(); index++) {
                this.gl.deleteTexture(this._maskColorBuffers.at(index));
            }
            this._maskColorBuffers.clear();
        }
        this._maskColorBuffers = null;
        if (this._maskRenderTextures != null) {
            this._maskRenderTextures.clear();
        }
        this._maskRenderTextures = null;
        if (this._clearedFrameBufferflags != null) {
            this._clearedFrameBufferflags.clear();
        }
        this._clearedFrameBufferflags = null;
    }
    initialize(model, drawableCount, drawableMasks, drawableMaskCounts, renderTextureCount) {
        if (renderTextureCount % 1 != 0) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogWarning)('The number of render textures must be specified as an integer. The decimal point is rounded down and corrected to an integer.');
            renderTextureCount = ~~renderTextureCount;
        }
        if (renderTextureCount < 1) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogWarning)('The number of render textures must be an integer greater than or equal to 1. Set the number of render textures to 1.');
        }
        this._renderTextureCount = renderTextureCount < 1 ? 1 : renderTextureCount;
        this._clearedFrameBufferflags = new _type_csmvector__WEBPACK_IMPORTED_MODULE_4__.csmVector(this._renderTextureCount);
        for (let i = 0; i < drawableCount; i++) {
            if (drawableMaskCounts[i] <= 0) {
                this._clippingContextListForDraw.pushBack(null);
                continue;
            }
            let clippingContext = this.findSameClip(drawableMasks[i], drawableMaskCounts[i]);
            if (clippingContext == null) {
                clippingContext = new CubismClippingContext(this, drawableMasks[i], drawableMaskCounts[i]);
                this._clippingContextListForMask.pushBack(clippingContext);
            }
            clippingContext.addClippedDrawable(i);
            this._clippingContextListForDraw.pushBack(clippingContext);
        }
    }
    setupClippingContext(model, renderer) {
        this._currentFrameNo++;
        let usingClipCount = 0;
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
            const cc = this._clippingContextListForMask.at(clipIndex);
            this.calcClippedDrawTotalBounds(model, cc);
            if (cc._isUsing) {
                usingClipCount++;
            }
        }
        if (usingClipCount > 0) {
            this.setupLayoutBounds(renderer.isUsingHighPrecisionMask() ? 0 : usingClipCount);
            if (!renderer.isUsingHighPrecisionMask()) {
                this.gl.viewport(0, 0, this._clippingMaskBufferSize, this._clippingMaskBufferSize);
                this._currentMaskRenderTexture = this.getMaskRenderTexture().at(0);
                renderer.preDraw();
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._currentMaskRenderTexture);
            }
            if (this._clearedFrameBufferflags.getSize() != this._renderTextureCount) {
                this._clearedFrameBufferflags.clear();
                this._clearedFrameBufferflags = new _type_csmvector__WEBPACK_IMPORTED_MODULE_4__.csmVector(this._renderTextureCount);
            }
            for (let index = 0; index < this._clearedFrameBufferflags.getSize(); index++) {
                this._clearedFrameBufferflags.set(index, false);
            }
            for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
                const clipContext = this._clippingContextListForMask.at(clipIndex);
                const allClipedDrawRect = clipContext._allClippedDrawRect;
                const layoutBoundsOnTex01 = clipContext._layoutBounds;
                const MARGIN = 0.05;
                let scaleX = 0;
                let scaleY = 0;
                const clipContextRenderTexture = this.getMaskRenderTexture().at(clipContext._bufferIndex);
                if (this._currentMaskRenderTexture != clipContextRenderTexture &&
                    !renderer.isUsingHighPrecisionMask()) {
                    this._currentMaskRenderTexture = clipContextRenderTexture;
                    renderer.preDraw();
                    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._currentMaskRenderTexture);
                }
                if (renderer.isUsingHighPrecisionMask()) {
                    const ppu = model.getPixelsPerUnit();
                    const maskPixelSize = clipContext.getClippingManager()._clippingMaskBufferSize;
                    const physicalMaskWidth = layoutBoundsOnTex01.width * maskPixelSize;
                    const physicalMaskHeight = layoutBoundsOnTex01.height * maskPixelSize;
                    this._tmpBoundsOnModel.setRect(allClipedDrawRect);
                    if (this._tmpBoundsOnModel.width * ppu > physicalMaskWidth) {
                        this._tmpBoundsOnModel.expand(allClipedDrawRect.width * MARGIN, 0.0);
                        scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
                    }
                    else {
                        scaleX = ppu / physicalMaskWidth;
                    }
                    if (this._tmpBoundsOnModel.height * ppu > physicalMaskHeight) {
                        this._tmpBoundsOnModel.expand(0.0, allClipedDrawRect.height * MARGIN);
                        scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
                    }
                    else {
                        scaleY = ppu / physicalMaskHeight;
                    }
                }
                else {
                    this._tmpBoundsOnModel.setRect(allClipedDrawRect);
                    this._tmpBoundsOnModel.expand(allClipedDrawRect.width * MARGIN, allClipedDrawRect.height * MARGIN);
                    scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
                    scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
                }
                {
                    this._tmpMatrix.loadIdentity();
                    {
                        this._tmpMatrix.translateRelative(-1.0, -1.0);
                        this._tmpMatrix.scaleRelative(2.0, 2.0);
                    }
                    {
                        this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                        this._tmpMatrix.scaleRelative(scaleX, scaleY);
                        this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                    }
                    this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray());
                }
                {
                    this._tmpMatrix.loadIdentity();
                    {
                        this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                        this._tmpMatrix.scaleRelative(scaleX, scaleY);
                        this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                    }
                    this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
                }
                clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
                clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
                if (!renderer.isUsingHighPrecisionMask()) {
                    const clipDrawCount = clipContext._clippingIdCount;
                    for (let i = 0; i < clipDrawCount; i++) {
                        const clipDrawIndex = clipContext._clippingIdList[i];
                        if (!model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                            continue;
                        }
                        renderer.setIsCulling(model.getDrawableCulling(clipDrawIndex) != false);
                        if (!this._clearedFrameBufferflags.at(clipContext._bufferIndex)) {
                            this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
                            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                            this._clearedFrameBufferflags.set(clipContext._bufferIndex, true);
                        }
                        renderer.setClippingContextBufferForMask(clipContext);
                        renderer.drawMesh(model.getDrawableTextureIndex(clipDrawIndex), model.getDrawableVertexIndexCount(clipDrawIndex), model.getDrawableVertexCount(clipDrawIndex), model.getDrawableVertexIndices(clipDrawIndex), model.getDrawableVertices(clipDrawIndex), model.getDrawableVertexUvs(clipDrawIndex), model.getMultiplyColor(clipDrawIndex), model.getScreenColor(clipDrawIndex), model.getDrawableOpacity(clipDrawIndex), _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismBlendMode.CubismBlendMode_Normal, false);
                    }
                }
            }
            if (!renderer.isUsingHighPrecisionMask()) {
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);
                renderer.setClippingContextBufferForMask(null);
                this.gl.viewport(s_viewport[0], s_viewport[1], s_viewport[2], s_viewport[3]);
            }
        }
    }
    findSameClip(drawableMasks, drawableMaskCounts) {
        for (let i = 0; i < this._clippingContextListForMask.getSize(); i++) {
            const clippingContext = this._clippingContextListForMask.at(i);
            const count = clippingContext._clippingIdCount;
            if (count != drawableMaskCounts) {
                continue;
            }
            let sameCount = 0;
            for (let j = 0; j < count; j++) {
                const clipId = clippingContext._clippingIdList[j];
                for (let k = 0; k < count; k++) {
                    if (drawableMasks[k] == clipId) {
                        sameCount++;
                        break;
                    }
                }
            }
            if (sameCount == count) {
                return clippingContext;
            }
        }
        return null;
    }
    setupLayoutBounds(usingClipCount) {
        const useClippingMaskMaxCount = this._renderTextureCount <= 1
            ? ClippingMaskMaxCountOnDefault
            : ClippingMaskMaxCountOnMultiRenderTexture * this._renderTextureCount;
        if (usingClipCount <= 0 || usingClipCount > useClippingMaskMaxCount) {
            if (usingClipCount > useClippingMaskMaxCount) {
                (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogError)('not supported mask count : {0}\n[Details] render texture count : {1}, mask count : {2}', usingClipCount - useClippingMaskMaxCount, this._renderTextureCount, usingClipCount);
            }
            for (let index = 0; index < this._clippingContextListForMask.getSize(); index++) {
                const clipContext = this._clippingContextListForMask.at(index);
                clipContext._layoutChannelNo = 0;
                clipContext._layoutBounds.x = 0.0;
                clipContext._layoutBounds.y = 0.0;
                clipContext._layoutBounds.width = 1.0;
                clipContext._layoutBounds.height = 1.0;
                clipContext._bufferIndex = 0;
            }
            return;
        }
        const layoutCountMaxValue = this._renderTextureCount <= 1 ? 9 : 8;
        let countPerSheetDiv = usingClipCount / this._renderTextureCount;
        let countPerSheetMod = usingClipCount % this._renderTextureCount;
        countPerSheetDiv = ~~countPerSheetDiv;
        countPerSheetMod = ~~countPerSheetMod;
        let div = countPerSheetDiv / ColorChannelCount;
        let mod = countPerSheetDiv % ColorChannelCount;
        div = ~~div;
        mod = ~~mod;
        let curClipIndex = 0;
        for (let renderTextureNo = 0; renderTextureNo < this._renderTextureCount; renderTextureNo++) {
            for (let channelNo = 0; channelNo < ColorChannelCount; channelNo++) {
                let layoutCount = div + (channelNo < mod ? 1 : 0);
                const checkChannelNo = mod + 1 >= ColorChannelCount ? 0 : mod + 1;
                if (layoutCount < layoutCountMaxValue && channelNo == checkChannelNo) {
                    layoutCount += renderTextureNo < countPerSheetMod ? 1 : 0;
                }
                if (layoutCount == 0) {
                }
                else if (layoutCount == 1) {
                    const clipContext = this._clippingContextListForMask.at(curClipIndex++);
                    clipContext._layoutChannelNo = channelNo;
                    clipContext._layoutBounds.x = 0.0;
                    clipContext._layoutBounds.y = 0.0;
                    clipContext._layoutBounds.width = 1.0;
                    clipContext._layoutBounds.height = 1.0;
                    clipContext._bufferIndex = renderTextureNo;
                }
                else if (layoutCount == 2) {
                    for (let i = 0; i < layoutCount; i++) {
                        let xpos = i % 2;
                        xpos = ~~xpos;
                        const cc = this._clippingContextListForMask.at(curClipIndex++);
                        cc._layoutChannelNo = channelNo;
                        cc._layoutBounds.x = xpos * 0.5;
                        cc._layoutBounds.y = 0.0;
                        cc._layoutBounds.width = 0.5;
                        cc._layoutBounds.height = 1.0;
                        cc._bufferIndex = renderTextureNo;
                    }
                }
                else if (layoutCount <= 4) {
                    for (let i = 0; i < layoutCount; i++) {
                        let xpos = i % 2;
                        let ypos = i / 2;
                        xpos = ~~xpos;
                        ypos = ~~ypos;
                        const cc = this._clippingContextListForMask.at(curClipIndex++);
                        cc._layoutChannelNo = channelNo;
                        cc._layoutBounds.x = xpos * 0.5;
                        cc._layoutBounds.y = ypos * 0.5;
                        cc._layoutBounds.width = 0.5;
                        cc._layoutBounds.height = 0.5;
                        cc._bufferIndex = renderTextureNo;
                    }
                }
                else if (layoutCount <= layoutCountMaxValue) {
                    for (let i = 0; i < layoutCount; i++) {
                        let xpos = i % 3;
                        let ypos = i / 3;
                        xpos = ~~xpos;
                        ypos = ~~ypos;
                        const cc = this._clippingContextListForMask.at(curClipIndex++);
                        cc._layoutChannelNo = channelNo;
                        cc._layoutBounds.x = xpos / 3.0;
                        cc._layoutBounds.y = ypos / 3.0;
                        cc._layoutBounds.width = 1.0 / 3.0;
                        cc._layoutBounds.height = 1.0 / 3.0;
                        cc._bufferIndex = renderTextureNo;
                    }
                }
                else {
                    (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogError)('not supported mask count : {0}\n[Details] render texture count : {1}, mask count : {2}', usingClipCount - useClippingMaskMaxCount, this._renderTextureCount, usingClipCount);
                    for (let index = 0; index < layoutCount; index++) {
                        const cc = this._clippingContextListForMask.at(curClipIndex++);
                        cc._layoutChannelNo = 0;
                        cc._layoutBounds.x = 0.0;
                        cc._layoutBounds.y = 0.0;
                        cc._layoutBounds.width = 1.0;
                        cc._layoutBounds.height = 1.0;
                        cc._bufferIndex = 0;
                    }
                }
            }
        }
    }
    getColorBuffer() {
        return this._maskColorBuffers;
    }
    getClippingContextListForDraw() {
        return this._clippingContextListForDraw;
    }
    getClippingMaskCount() {
        return this._clippingContextListForMask.getSize();
    }
    setClippingMaskBufferSize(size) {
        this._clippingMaskBufferSize = size;
    }
    getClippingMaskBufferSize() {
        return this._clippingMaskBufferSize;
    }
    getRenderTextureCount() {
        return this._renderTextureCount;
    }
    _currentMaskRenderTexture;
    _maskRenderTextures;
    _maskColorBuffers;
    _currentFrameNo;
    _channelColors;
    _maskTexture;
    _clippingContextListForMask;
    _clippingContextListForDraw;
    _clippingMaskBufferSize;
    _renderTextureCount;
    _tmpMatrix;
    _tmpMatrixForMask;
    _tmpMatrixForDraw;
    _tmpBoundsOnModel;
    _clearedFrameBufferflags;
    gl;
}
class CubismRenderTextureResource {
    constructor(frameNo, texture) {
        this.frameNo = frameNo;
        this.textures = texture;
    }
    frameNo;
    textures;
}
class CubismClippingContext {
    constructor(manager, clippingDrawableIndices, clipCount) {
        this._owner = manager;
        this._clippingIdList = clippingDrawableIndices;
        this._clippingIdCount = clipCount;
        this._allClippedDrawRect = new _type_csmrectf__WEBPACK_IMPORTED_MODULE_3__.csmRect();
        this._layoutBounds = new _type_csmrectf__WEBPACK_IMPORTED_MODULE_3__.csmRect();
        this._clippedDrawableIndexList = [];
        this._matrixForMask = new _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_1__.CubismMatrix44();
        this._matrixForDraw = new _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_1__.CubismMatrix44();
        this._bufferIndex = 0;
    }
    release() {
        if (this._layoutBounds != null) {
            this._layoutBounds = null;
        }
        if (this._allClippedDrawRect != null) {
            this._allClippedDrawRect = null;
        }
        if (this._clippedDrawableIndexList != null) {
            this._clippedDrawableIndexList = null;
        }
    }
    addClippedDrawable(drawableIndex) {
        this._clippedDrawableIndexList.push(drawableIndex);
    }
    getClippingManager() {
        return this._owner;
    }
    setGl(gl) {
        this._owner.setGL(gl);
    }
    _isUsing;
    _clippingIdList;
    _clippingIdCount;
    _layoutChannelNo;
    _layoutBounds;
    _allClippedDrawRect;
    _matrixForMask;
    _matrixForDraw;
    _clippedDrawableIndexList;
    _bufferIndex;
    _owner;
}
class CubismRendererProfile_WebGL {
    setGlEnable(index, enabled) {
        if (enabled)
            this.gl.enable(index);
        else
            this.gl.disable(index);
    }
    setGlEnableVertexAttribArray(index, enabled) {
        if (enabled)
            this.gl.enableVertexAttribArray(index);
        else
            this.gl.disableVertexAttribArray(index);
    }
    save() {
        if (this.gl == null) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogError)("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
            return;
        }
        this._lastArrayBufferBinding = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
        this._lastArrayBufferBinding = this.gl.getParameter(this.gl.ELEMENT_ARRAY_BUFFER_BINDING);
        this._lastProgram = this.gl.getParameter(this.gl.CURRENT_PROGRAM);
        this._lastActiveTexture = this.gl.getParameter(this.gl.ACTIVE_TEXTURE);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this._lastTexture1Binding2D = this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this._lastTexture0Binding2D = this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
        this._lastVertexAttribArrayEnabled[0] = this.gl.getVertexAttrib(0, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        this._lastVertexAttribArrayEnabled[1] = this.gl.getVertexAttrib(1, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        this._lastVertexAttribArrayEnabled[2] = this.gl.getVertexAttrib(2, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        this._lastVertexAttribArrayEnabled[3] = this.gl.getVertexAttrib(3, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        this._lastScissorTest = this.gl.isEnabled(this.gl.SCISSOR_TEST);
        this._lastStencilTest = this.gl.isEnabled(this.gl.STENCIL_TEST);
        this._lastDepthTest = this.gl.isEnabled(this.gl.DEPTH_TEST);
        this._lastCullFace = this.gl.isEnabled(this.gl.CULL_FACE);
        this._lastBlend = this.gl.isEnabled(this.gl.BLEND);
        this._lastFrontFace = this.gl.getParameter(this.gl.FRONT_FACE);
        this._lastColorMask = this.gl.getParameter(this.gl.COLOR_WRITEMASK);
        this._lastBlending[0] = this.gl.getParameter(this.gl.BLEND_SRC_RGB);
        this._lastBlending[1] = this.gl.getParameter(this.gl.BLEND_DST_RGB);
        this._lastBlending[2] = this.gl.getParameter(this.gl.BLEND_SRC_ALPHA);
        this._lastBlending[3] = this.gl.getParameter(this.gl.BLEND_DST_ALPHA);
        this._lastFBO = this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING);
        this._lastViewport = this.gl.getParameter(this.gl.VIEWPORT);
    }
    restore() {
        if (this.gl == null) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogError)("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
            return;
        }
        this.gl.useProgram(this._lastProgram);
        this.setGlEnableVertexAttribArray(0, this._lastVertexAttribArrayEnabled[0]);
        this.setGlEnableVertexAttribArray(1, this._lastVertexAttribArrayEnabled[1]);
        this.setGlEnableVertexAttribArray(2, this._lastVertexAttribArrayEnabled[2]);
        this.setGlEnableVertexAttribArray(3, this._lastVertexAttribArrayEnabled[3]);
        this.setGlEnable(this.gl.SCISSOR_TEST, this._lastScissorTest);
        this.setGlEnable(this.gl.STENCIL_TEST, this._lastStencilTest);
        this.setGlEnable(this.gl.DEPTH_TEST, this._lastDepthTest);
        this.setGlEnable(this.gl.CULL_FACE, this._lastCullFace);
        this.setGlEnable(this.gl.BLEND, this._lastBlend);
        this.gl.frontFace(this._lastFrontFace);
        this.gl.colorMask(this._lastColorMask[0], this._lastColorMask[1], this._lastColorMask[2], this._lastColorMask[3]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._lastArrayBufferBinding);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this._lastElementArrayBufferBinding);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture1Binding2D);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture0Binding2D);
        this.gl.activeTexture(this._lastActiveTexture);
        this.gl.blendFuncSeparate(this._lastBlending[0], this._lastBlending[1], this._lastBlending[2], this._lastBlending[3]);
    }
    setGl(gl) {
        this.gl = gl;
    }
    constructor() {
        this._lastVertexAttribArrayEnabled = new Array(4);
        this._lastColorMask = new Array(4);
        this._lastBlending = new Array(4);
        this._lastViewport = new Array(4);
    }
    _lastArrayBufferBinding;
    _lastElementArrayBufferBinding;
    _lastProgram;
    _lastActiveTexture;
    _lastTexture0Binding2D;
    _lastTexture1Binding2D;
    _lastVertexAttribArrayEnabled;
    _lastScissorTest;
    _lastBlend;
    _lastStencilTest;
    _lastDepthTest;
    _lastCullFace;
    _lastFrontFace;
    _lastColorMask;
    _lastBlending;
    _lastFBO;
    _lastViewport;
    gl;
}
class CubismShader_WebGL {
    static getInstance() {
        if (s_instance == null) {
            s_instance = new CubismShader_WebGL();
            return s_instance;
        }
        return s_instance;
    }
    static deleteInstance() {
        if (s_instance) {
            s_instance.release();
            s_instance = null;
        }
    }
    constructor() {
        this._shaderSets = new _type_csmvector__WEBPACK_IMPORTED_MODULE_4__.csmVector();
    }
    release() {
        this.releaseShaderProgram();
    }
    setupShaderProgram(renderer, textureId, vertexCount, vertexArray, indexArray, uvArray, bufferData, opacity, colorBlendMode, baseColor, multiplyColor, screenColor, isPremultipliedAlpha, matrix4x4, invertedMask) {
        if (!isPremultipliedAlpha) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogError)('NoPremultipliedAlpha is not allowed');
        }
        if (this._shaderSets.getSize() == 0) {
            this.generateShaders();
        }
        let SRC_COLOR;
        let DST_COLOR;
        let SRC_ALPHA;
        let DST_ALPHA;
        if (renderer.getClippingContextBufferForMask() != null) {
            const shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_SetupMask);
            this.gl.useProgram(shaderSet.shaderProgram);
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
            this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
            if (bufferData.vertex == null) {
                bufferData.vertex = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
            this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
            this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
            if (bufferData.uv == null) {
                bufferData.uv = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
            this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
            this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
            const channelNo = renderer.getClippingContextBufferForMask()._layoutChannelNo;
            const colorChannel = renderer
                .getClippingContextBufferForMask()
                .getClippingManager()
                .getChannelFlagAsColor(channelNo);
            this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.R, colorChannel.G, colorChannel.B, colorChannel.A);
            this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForMask()._matrixForMask.getArray());
            const rect = renderer.getClippingContextBufferForMask()._layoutBounds;
            this.gl.uniform4f(shaderSet.uniformBaseColorLocation, rect.x * 2.0 - 1.0, rect.y * 2.0 - 1.0, rect.getRight() * 2.0 - 1.0, rect.getBottom() * 2.0 - 1.0);
            this.gl.uniform4f(shaderSet.uniformMultiplyColorLocation, multiplyColor.R, multiplyColor.G, multiplyColor.B, multiplyColor.A);
            this.gl.uniform4f(shaderSet.uniformScreenColorLocation, screenColor.R, screenColor.G, screenColor.B, screenColor.A);
            SRC_COLOR = this.gl.ZERO;
            DST_COLOR = this.gl.ONE_MINUS_SRC_COLOR;
            SRC_ALPHA = this.gl.ZERO;
            DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
        }
        else {
            const masked = renderer.getClippingContextBufferForDraw() != null;
            const offset = masked ? (invertedMask ? 2 : 1) : 0;
            let shaderSet = new CubismShaderSet();
            switch (colorBlendMode) {
                case _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismBlendMode.CubismBlendMode_Normal:
                default:
                    shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_NormalPremultipliedAlpha + offset);
                    SRC_COLOR = this.gl.ONE;
                    DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
                    SRC_ALPHA = this.gl.ONE;
                    DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
                    break;
                case _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismBlendMode.CubismBlendMode_Additive:
                    shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_AddPremultipliedAlpha + offset);
                    SRC_COLOR = this.gl.ONE;
                    DST_COLOR = this.gl.ONE;
                    SRC_ALPHA = this.gl.ZERO;
                    DST_ALPHA = this.gl.ONE;
                    break;
                case _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismBlendMode.CubismBlendMode_Multiplicative:
                    shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_MultPremultipliedAlpha + offset);
                    SRC_COLOR = this.gl.DST_COLOR;
                    DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
                    SRC_ALPHA = this.gl.ZERO;
                    DST_ALPHA = this.gl.ONE;
                    break;
            }
            this.gl.useProgram(shaderSet.shaderProgram);
            if (bufferData.vertex == null) {
                bufferData.vertex = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
            this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
            this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
            if (bufferData.uv == null) {
                bufferData.uv = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
            this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
            this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
            if (masked) {
                this.gl.activeTexture(this.gl.TEXTURE1);
                const tex = renderer
                    .getClippingContextBufferForDraw()
                    .getClippingManager()
                    .getColorBuffer()
                    .at(renderer.getClippingContextBufferForDraw()._bufferIndex);
                this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
                this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);
                this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForDraw()._matrixForDraw.getArray());
                const channelNo = renderer.getClippingContextBufferForDraw()._layoutChannelNo;
                const colorChannel = renderer
                    .getClippingContextBufferForDraw()
                    .getClippingManager()
                    .getChannelFlagAsColor(channelNo);
                this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.R, colorChannel.G, colorChannel.B, colorChannel.A);
            }
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
            this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
            this.gl.uniformMatrix4fv(shaderSet.uniformMatrixLocation, false, matrix4x4.getArray());
            this.gl.uniform4f(shaderSet.uniformBaseColorLocation, baseColor.R, baseColor.G, baseColor.B, baseColor.A);
            this.gl.uniform4f(shaderSet.uniformMultiplyColorLocation, multiplyColor.R, multiplyColor.G, multiplyColor.B, multiplyColor.A);
            this.gl.uniform4f(shaderSet.uniformScreenColorLocation, screenColor.R, screenColor.G, screenColor.B, screenColor.A);
        }
        if (bufferData.index == null) {
            bufferData.index = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, bufferData.index);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.DYNAMIC_DRAW);
        this.gl.blendFuncSeparate(SRC_COLOR, DST_COLOR, SRC_ALPHA, DST_ALPHA);
    }
    releaseShaderProgram() {
        for (let i = 0; i < this._shaderSets.getSize(); i++) {
            this.gl.deleteProgram(this._shaderSets.at(i).shaderProgram);
            this._shaderSets.at(i).shaderProgram = 0;
            this._shaderSets.set(i, void 0);
            this._shaderSets.set(i, null);
        }
    }
    generateShaders() {
        for (let i = 0; i < ShaderCount; i++) {
            this._shaderSets.pushBack(new CubismShaderSet());
        }
        this._shaderSets.at(0).shaderProgram = this.loadShaderProgram(vertexShaderSrcSetupMask, fragmentShaderSrcsetupMask);
        this._shaderSets.at(1).shaderProgram = this.loadShaderProgram(vertexShaderSrc, fragmentShaderSrcPremultipliedAlpha);
        this._shaderSets.at(2).shaderProgram = this.loadShaderProgram(vertexShaderSrcMasked, fragmentShaderSrcMaskPremultipliedAlpha);
        this._shaderSets.at(3).shaderProgram = this.loadShaderProgram(vertexShaderSrcMasked, fragmentShaderSrcMaskInvertedPremultipliedAlpha);
        this._shaderSets.at(4).shaderProgram = this._shaderSets.at(1).shaderProgram;
        this._shaderSets.at(5).shaderProgram = this._shaderSets.at(2).shaderProgram;
        this._shaderSets.at(6).shaderProgram = this._shaderSets.at(3).shaderProgram;
        this._shaderSets.at(7).shaderProgram = this._shaderSets.at(1).shaderProgram;
        this._shaderSets.at(8).shaderProgram = this._shaderSets.at(2).shaderProgram;
        this._shaderSets.at(9).shaderProgram = this._shaderSets.at(3).shaderProgram;
        this._shaderSets.at(0).attributePositionLocation =
            this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, 'a_position');
        this._shaderSets.at(0).attributeTexCoordLocation =
            this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, 'a_texCoord');
        this._shaderSets.at(0).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 's_texture0');
        this._shaderSets.at(0).uniformClipMatrixLocation =
            this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(0).uniformChannelFlagLocation =
            this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(0).uniformBaseColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_baseColor');
        this._shaderSets.at(0).uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_multiplyColor');
        this._shaderSets.at(0).uniformScreenColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_screenColor');
        this._shaderSets.at(1).attributePositionLocation =
            this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, 'a_position');
        this._shaderSets.at(1).attributeTexCoordLocation =
            this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, 'a_texCoord');
        this._shaderSets.at(1).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 's_texture0');
        this._shaderSets.at(1).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_matrix');
        this._shaderSets.at(1).uniformBaseColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_baseColor');
        this._shaderSets.at(1).uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_multiplyColor');
        this._shaderSets.at(1).uniformScreenColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_screenColor');
        this._shaderSets.at(2).attributePositionLocation =
            this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, 'a_position');
        this._shaderSets.at(2).attributeTexCoordLocation =
            this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, 'a_texCoord');
        this._shaderSets.at(2).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 's_texture0');
        this._shaderSets.at(2).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 's_texture1');
        this._shaderSets.at(2).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_matrix');
        this._shaderSets.at(2).uniformClipMatrixLocation =
            this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(2).uniformChannelFlagLocation =
            this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(2).uniformBaseColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_baseColor');
        this._shaderSets.at(2).uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_multiplyColor');
        this._shaderSets.at(2).uniformScreenColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_screenColor');
        this._shaderSets.at(3).attributePositionLocation =
            this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, 'a_position');
        this._shaderSets.at(3).attributeTexCoordLocation =
            this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, 'a_texCoord');
        this._shaderSets.at(3).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 's_texture0');
        this._shaderSets.at(3).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 's_texture1');
        this._shaderSets.at(3).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_matrix');
        this._shaderSets.at(3).uniformClipMatrixLocation =
            this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(3).uniformChannelFlagLocation =
            this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(3).uniformBaseColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_baseColor');
        this._shaderSets.at(3).uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_multiplyColor');
        this._shaderSets.at(3).uniformScreenColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_screenColor');
        this._shaderSets.at(4).attributePositionLocation =
            this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, 'a_position');
        this._shaderSets.at(4).attributeTexCoordLocation =
            this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, 'a_texCoord');
        this._shaderSets.at(4).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 's_texture0');
        this._shaderSets.at(4).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_matrix');
        this._shaderSets.at(4).uniformBaseColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_baseColor');
        this._shaderSets.at(4).uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_multiplyColor');
        this._shaderSets.at(4).uniformScreenColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_screenColor');
        this._shaderSets.at(5).attributePositionLocation =
            this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, 'a_position');
        this._shaderSets.at(5).attributeTexCoordLocation =
            this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, 'a_texCoord');
        this._shaderSets.at(5).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 's_texture0');
        this._shaderSets.at(5).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 's_texture1');
        this._shaderSets.at(5).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_matrix');
        this._shaderSets.at(5).uniformClipMatrixLocation =
            this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(5).uniformChannelFlagLocation =
            this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(5).uniformBaseColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_baseColor');
        this._shaderSets.at(5).uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_multiplyColor');
        this._shaderSets.at(5).uniformScreenColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_screenColor');
        this._shaderSets.at(6).attributePositionLocation =
            this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, 'a_position');
        this._shaderSets.at(6).attributeTexCoordLocation =
            this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, 'a_texCoord');
        this._shaderSets.at(6).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 's_texture0');
        this._shaderSets.at(6).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 's_texture1');
        this._shaderSets.at(6).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_matrix');
        this._shaderSets.at(6).uniformClipMatrixLocation =
            this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(6).uniformChannelFlagLocation =
            this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(6).uniformBaseColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_baseColor');
        this._shaderSets.at(6).uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_multiplyColor');
        this._shaderSets.at(6).uniformScreenColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_screenColor');
        this._shaderSets.at(7).attributePositionLocation =
            this.gl.getAttribLocation(this._shaderSets.at(7).shaderProgram, 'a_position');
        this._shaderSets.at(7).attributeTexCoordLocation =
            this.gl.getAttribLocation(this._shaderSets.at(7).shaderProgram, 'a_texCoord');
        this._shaderSets.at(7).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 's_texture0');
        this._shaderSets.at(7).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 'u_matrix');
        this._shaderSets.at(7).uniformBaseColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 'u_baseColor');
        this._shaderSets.at(7).uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 'u_multiplyColor');
        this._shaderSets.at(7).uniformScreenColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 'u_screenColor');
        this._shaderSets.at(8).attributePositionLocation =
            this.gl.getAttribLocation(this._shaderSets.at(8).shaderProgram, 'a_position');
        this._shaderSets.at(8).attributeTexCoordLocation =
            this.gl.getAttribLocation(this._shaderSets.at(8).shaderProgram, 'a_texCoord');
        this._shaderSets.at(8).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 's_texture0');
        this._shaderSets.at(8).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 's_texture1');
        this._shaderSets.at(8).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_matrix');
        this._shaderSets.at(8).uniformClipMatrixLocation =
            this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(8).uniformChannelFlagLocation =
            this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(8).uniformBaseColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_baseColor');
        this._shaderSets.at(8).uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_multiplyColor');
        this._shaderSets.at(8).uniformScreenColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_screenColor');
        this._shaderSets.at(9).attributePositionLocation =
            this.gl.getAttribLocation(this._shaderSets.at(9).shaderProgram, 'a_position');
        this._shaderSets.at(9).attributeTexCoordLocation =
            this.gl.getAttribLocation(this._shaderSets.at(9).shaderProgram, 'a_texCoord');
        this._shaderSets.at(9).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 's_texture0');
        this._shaderSets.at(9).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 's_texture1');
        this._shaderSets.at(9).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_matrix');
        this._shaderSets.at(9).uniformClipMatrixLocation =
            this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(9).uniformChannelFlagLocation =
            this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(9).uniformBaseColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_baseColor');
        this._shaderSets.at(9).uniformMultiplyColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_multiplyColor');
        this._shaderSets.at(9).uniformScreenColorLocation =
            this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_screenColor');
    }
    loadShaderProgram(vertexShaderSource, fragmentShaderSource) {
        let shaderProgram = this.gl.createProgram();
        let vertShader = this.compileShaderSource(this.gl.VERTEX_SHADER, vertexShaderSource);
        if (!vertShader) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogError)('Vertex shader compile error!');
            return 0;
        }
        let fragShader = this.compileShaderSource(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!fragShader) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogError)('Vertex shader compile error!');
            return 0;
        }
        this.gl.attachShader(shaderProgram, vertShader);
        this.gl.attachShader(shaderProgram, fragShader);
        this.gl.linkProgram(shaderProgram);
        const linkStatus = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
        if (!linkStatus) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogError)('Failed to link program: {0}', shaderProgram);
            this.gl.deleteShader(vertShader);
            vertShader = 0;
            this.gl.deleteShader(fragShader);
            fragShader = 0;
            if (shaderProgram) {
                this.gl.deleteProgram(shaderProgram);
                shaderProgram = 0;
            }
            return 0;
        }
        this.gl.deleteShader(vertShader);
        this.gl.deleteShader(fragShader);
        return shaderProgram;
    }
    compileShaderSource(shaderType, shaderSource) {
        const source = shaderSource;
        const shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!shader) {
            const log = this.gl.getShaderInfoLog(shader);
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogError)('Shader compile log: {0} ', log);
        }
        const status = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (!status) {
            this.gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    setGl(gl) {
        this.gl = gl;
    }
    _shaderSets;
    gl;
}
class CubismShaderSet {
    shaderProgram;
    attributePositionLocation;
    attributeTexCoordLocation;
    uniformMatrixLocation;
    uniformClipMatrixLocation;
    samplerTexture0Location;
    samplerTexture1Location;
    uniformBaseColorLocation;
    uniformChannelFlagLocation;
    uniformMultiplyColorLocation;
    uniformScreenColorLocation;
}
var ShaderNames;
(function (ShaderNames) {
    ShaderNames[ShaderNames["ShaderNames_SetupMask"] = 0] = "ShaderNames_SetupMask";
    ShaderNames[ShaderNames["ShaderNames_NormalPremultipliedAlpha"] = 1] = "ShaderNames_NormalPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_NormalMaskedPremultipliedAlpha"] = 2] = "ShaderNames_NormalMaskedPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_NomralMaskedInvertedPremultipliedAlpha"] = 3] = "ShaderNames_NomralMaskedInvertedPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_AddPremultipliedAlpha"] = 4] = "ShaderNames_AddPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipliedAlpha"] = 5] = "ShaderNames_AddMaskedPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipliedAlphaInverted"] = 6] = "ShaderNames_AddMaskedPremultipliedAlphaInverted";
    ShaderNames[ShaderNames["ShaderNames_MultPremultipliedAlpha"] = 7] = "ShaderNames_MultPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlpha"] = 8] = "ShaderNames_MultMaskedPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlphaInverted"] = 9] = "ShaderNames_MultMaskedPremultipliedAlphaInverted";
})(ShaderNames || (ShaderNames = {}));
const vertexShaderSrcSetupMask = 'attribute vec4     a_position;' +
    'attribute vec2     a_texCoord;' +
    'varying vec2       v_texCoord;' +
    'varying vec4       v_myPos;' +
    'uniform mat4       u_clipMatrix;' +
    'void main()' +
    '{' +
    '   gl_Position = u_clipMatrix * a_position;' +
    '   v_myPos = u_clipMatrix * a_position;' +
    '   v_texCoord = a_texCoord;' +
    '   v_texCoord.y = 1.0 - v_texCoord.y;' +
    '}';
const fragmentShaderSrcsetupMask = 'precision mediump float;' +
    'varying vec2       v_texCoord;' +
    'varying vec4       v_myPos;' +
    'uniform vec4       u_baseColor;' +
    'uniform vec4       u_channelFlag;' +
    'uniform sampler2D  s_texture0;' +
    'void main()' +
    '{' +
    '   float isInside = ' +
    '       step(u_baseColor.x, v_myPos.x/v_myPos.w)' +
    '       * step(u_baseColor.y, v_myPos.y/v_myPos.w)' +
    '       * step(v_myPos.x/v_myPos.w, u_baseColor.z)' +
    '       * step(v_myPos.y/v_myPos.w, u_baseColor.w);' +
    '   gl_FragColor = u_channelFlag * texture2D(s_texture0, v_texCoord).a * isInside;' +
    '}';
const vertexShaderSrc = 'attribute vec4     a_position;' +
    'attribute vec2     a_texCoord;' +
    'varying vec2       v_texCoord;' +
    'uniform mat4       u_matrix;' +
    'void main()' +
    '{' +
    '   gl_Position = u_matrix * a_position;' +
    '   v_texCoord = a_texCoord;' +
    '   v_texCoord.y = 1.0 - v_texCoord.y;' +
    '}';
const vertexShaderSrcMasked = 'attribute vec4     a_position;' +
    'attribute vec2     a_texCoord;' +
    'varying vec2       v_texCoord;' +
    'varying vec4       v_clipPos;' +
    'uniform mat4       u_matrix;' +
    'uniform mat4       u_clipMatrix;' +
    'void main()' +
    '{' +
    '   gl_Position = u_matrix * a_position;' +
    '   v_clipPos = u_clipMatrix * a_position;' +
    '   v_texCoord = a_texCoord;' +
    '   v_texCoord.y = 1.0 - v_texCoord.y;' +
    '}';
const fragmentShaderSrcPremultipliedAlpha = 'precision mediump float;' +
    'varying vec2       v_texCoord;' +
    'uniform vec4       u_baseColor;' +
    'uniform sampler2D  s_texture0;' +
    'uniform vec4       u_multiplyColor;' +
    'uniform vec4       u_screenColor;' +
    'void main()' +
    '{' +
    '   vec4 texColor = texture2D(s_texture0, v_texCoord);' +
    '   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;' +
    '   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);' +
    '   vec4 color = texColor * u_baseColor;' +
    '   gl_FragColor = vec4(color.rgb, color.a);' +
    '}';
const fragmentShaderSrcMaskPremultipliedAlpha = 'precision mediump float;' +
    'varying vec2       v_texCoord;' +
    'varying vec4       v_clipPos;' +
    'uniform vec4       u_baseColor;' +
    'uniform vec4       u_channelFlag;' +
    'uniform sampler2D  s_texture0;' +
    'uniform sampler2D  s_texture1;' +
    'uniform vec4       u_multiplyColor;' +
    'uniform vec4       u_screenColor;' +
    'void main()' +
    '{' +
    '   vec4 texColor = texture2D(s_texture0, v_texCoord);' +
    '   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;' +
    '   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);' +
    '   vec4 col_formask = texColor * u_baseColor;' +
    '   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;' +
    '   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;' +
    '   col_formask = col_formask * maskVal;' +
    '   gl_FragColor = col_formask;' +
    '}';
const fragmentShaderSrcMaskInvertedPremultipliedAlpha = 'precision mediump float;' +
    'varying vec2      v_texCoord;' +
    'varying vec4      v_clipPos;' +
    'uniform sampler2D s_texture0;' +
    'uniform sampler2D s_texture1;' +
    'uniform vec4      u_channelFlag;' +
    'uniform vec4      u_baseColor;' +
    'uniform vec4      u_multiplyColor;' +
    'uniform vec4      u_screenColor;' +
    'void main()' +
    '{' +
    '   vec4 texColor = texture2D(s_texture0, v_texCoord);' +
    '   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;' +
    '   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);' +
    '   vec4 col_formask = texColor * u_baseColor;' +
    '   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;' +
    '   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;' +
    '   col_formask = col_formask * (1.0 - maskVal);' +
    '   gl_FragColor = col_formask;' +
    '}';
class CubismRenderer_WebGL extends _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismRenderer {
    initialize(model, maskBufferCount = 1) {
        if (model.isUsingMasking()) {
            this._clippingManager = new CubismClippingManager_WebGL();
            this._clippingManager.initialize(model, model.getDrawableCount(), model.getDrawableMasks(), model.getDrawableMaskCounts(), maskBufferCount);
        }
        this._sortedDrawableIndexList.resize(model.getDrawableCount(), 0);
        super.initialize(model);
    }
    bindTexture(modelTextureNo, glTexture) {
        this._textures.setValue(modelTextureNo, glTexture);
    }
    getBindedTextures() {
        return this._textures;
    }
    setClippingMaskBufferSize(size) {
        if (!this._model.isUsingMasking()) {
            return;
        }
        const renderTextureCount = this._clippingManager.getRenderTextureCount();
        this._clippingManager.release();
        this._clippingManager = void 0;
        this._clippingManager = null;
        this._clippingManager = new CubismClippingManager_WebGL();
        this._clippingManager.setClippingMaskBufferSize(size);
        this._clippingManager.initialize(this.getModel(), this.getModel().getDrawableCount(), this.getModel().getDrawableMasks(), this.getModel().getDrawableMaskCounts(), renderTextureCount);
    }
    getClippingMaskBufferSize() {
        return this._model.isUsingMasking()
            ? this._clippingManager.getClippingMaskBufferSize()
            : -1;
    }
    getRenderTextureCount() {
        return this._model.isUsingMasking()
            ? this._clippingManager.getRenderTextureCount()
            : -1;
    }
    constructor() {
        super();
        this._clippingContextBufferForMask = null;
        this._clippingContextBufferForDraw = null;
        this._rendererProfile = new CubismRendererProfile_WebGL();
        this.firstDraw = true;
        this._textures = new _type_csmmap__WEBPACK_IMPORTED_MODULE_2__.csmMap();
        this._sortedDrawableIndexList = new _type_csmvector__WEBPACK_IMPORTED_MODULE_4__.csmVector();
        this._bufferData = {
            vertex: (WebGLBuffer = null),
            uv: (WebGLBuffer = null),
            index: (WebGLBuffer = null),
        };
        this._textures.prepareCapacity(32, true);
    }
    release() {
        if (this._clippingManager) {
            this._clippingManager.release();
            this._clippingManager = void 0;
            this._clippingManager = null;
        }
        if (this.gl == null) {
            return;
        }
        this.gl.deleteBuffer(this._bufferData.vertex);
        this._bufferData.vertex = null;
        this.gl.deleteBuffer(this._bufferData.uv);
        this._bufferData.uv = null;
        this.gl.deleteBuffer(this._bufferData.index);
        this._bufferData.index = null;
        this._bufferData = null;
        this._textures = null;
    }
    doDrawModel() {
        if (this.gl == null) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_5__.CubismLogError)("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
            return;
        }
        if (this._clippingManager != null) {
            this.preDraw();
            this._clippingManager.setupClippingContext(this.getModel(), this);
        }
        this.preDraw();
        const drawableCount = this.getModel().getDrawableCount();
        const renderOrder = this.getModel().getDrawableRenderOrders();
        for (let i = 0; i < drawableCount; ++i) {
            const order = renderOrder[i];
            this._sortedDrawableIndexList.set(order, i);
        }
        for (let i = 0; i < drawableCount; ++i) {
            const drawableIndex = this._sortedDrawableIndexList.at(i);
            if (!this.getModel().getDrawableDynamicFlagIsVisible(drawableIndex)) {
                continue;
            }
            const clipContext = this._clippingManager != null
                ? this._clippingManager
                    .getClippingContextListForDraw()
                    .at(drawableIndex)
                : null;
            if (clipContext != null && this.isUsingHighPrecisionMask()) {
                if (clipContext._isUsing) {
                    this.gl.viewport(0, 0, this._clippingManager.getClippingMaskBufferSize(), this._clippingManager.getClippingMaskBufferSize());
                    this.preDraw();
                    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, clipContext
                        .getClippingManager()
                        .getMaskRenderTexture()
                        .at(clipContext._bufferIndex));
                    this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
                    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                }
                {
                    const clipDrawCount = clipContext._clippingIdCount;
                    for (let index = 0; index < clipDrawCount; index++) {
                        const clipDrawIndex = clipContext._clippingIdList[index];
                        if (!this._model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                            continue;
                        }
                        this.setIsCulling(this._model.getDrawableCulling(clipDrawIndex) != false);
                        this.setClippingContextBufferForMask(clipContext);
                        this.drawMesh(this.getModel().getDrawableTextureIndex(clipDrawIndex), this.getModel().getDrawableVertexIndexCount(clipDrawIndex), this.getModel().getDrawableVertexCount(clipDrawIndex), this.getModel().getDrawableVertexIndices(clipDrawIndex), this.getModel().getDrawableVertices(clipDrawIndex), this.getModel().getDrawableVertexUvs(clipDrawIndex), this.getModel().getMultiplyColor(clipDrawIndex), this.getModel().getScreenColor(clipDrawIndex), this.getModel().getDrawableOpacity(clipDrawIndex), _cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismBlendMode.CubismBlendMode_Normal, false);
                    }
                }
                {
                    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);
                    this.setClippingContextBufferForMask(null);
                    this.gl.viewport(s_viewport[0], s_viewport[1], s_viewport[2], s_viewport[3]);
                    this.preDraw();
                }
            }
            this.setClippingContextBufferForDraw(clipContext);
            this.setIsCulling(this.getModel().getDrawableCulling(drawableIndex));
            this.drawMesh(this.getModel().getDrawableTextureIndex(drawableIndex), this.getModel().getDrawableVertexIndexCount(drawableIndex), this.getModel().getDrawableVertexCount(drawableIndex), this.getModel().getDrawableVertexIndices(drawableIndex), this.getModel().getDrawableVertices(drawableIndex), this.getModel().getDrawableVertexUvs(drawableIndex), this.getModel().getMultiplyColor(drawableIndex), this.getModel().getScreenColor(drawableIndex), this.getModel().getDrawableOpacity(drawableIndex), this.getModel().getDrawableBlendMode(drawableIndex), this.getModel().getDrawableInvertedMaskBit(drawableIndex));
        }
    }
    drawMesh(textureNo, indexCount, vertexCount, indexArray, vertexArray, uvArray, multiplyColor, screenColor, opacity, colorBlendMode, invertedMask) {
        if (this.isCulling()) {
            this.gl.enable(this.gl.CULL_FACE);
        }
        else {
            this.gl.disable(this.gl.CULL_FACE);
        }
        this.gl.frontFace(this.gl.CCW);
        const modelColorRGBA = this.getModelColor();
        if (this.getClippingContextBufferForMask() == null) {
            modelColorRGBA.A *= opacity;
            if (this.isPremultipliedAlpha()) {
                modelColorRGBA.R *= modelColorRGBA.A;
                modelColorRGBA.G *= modelColorRGBA.A;
                modelColorRGBA.B *= modelColorRGBA.A;
            }
        }
        let drawtexture;
        if (this._textures.getValue(textureNo) != null) {
            drawtexture = this._textures.getValue(textureNo);
        }
        else {
            drawtexture = null;
        }
        CubismShader_WebGL.getInstance().setupShaderProgram(this, drawtexture, vertexCount, vertexArray, indexArray, uvArray, this._bufferData, opacity, colorBlendMode, modelColorRGBA, multiplyColor, screenColor, this.isPremultipliedAlpha(), this.getMvpMatrix(), invertedMask);
        this.gl.drawElements(this.gl.TRIANGLES, indexCount, this.gl.UNSIGNED_SHORT, 0);
        this.gl.useProgram(null);
        this.setClippingContextBufferForDraw(null);
        this.setClippingContextBufferForMask(null);
    }
    saveProfile() {
        this._rendererProfile.save();
    }
    restoreProfile() {
        this._rendererProfile.restore();
    }
    static doStaticRelease() {
        CubismShader_WebGL.deleteInstance();
    }
    setRenderState(fbo, viewport) {
        s_fbo = fbo;
        s_viewport = viewport;
    }
    preDraw() {
        if (this.firstDraw) {
            this.firstDraw = false;
        }
        this.gl.disable(this.gl.SCISSOR_TEST);
        this.gl.disable(this.gl.STENCIL_TEST);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.frontFace(this.gl.CW);
        this.gl.enable(this.gl.BLEND);
        this.gl.colorMask(true, true, true, true);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        if (this.getAnisotropy() > 0.0 && this._extension) {
            for (let i = 0; i < this._textures.getSize(); ++i) {
                this.gl.bindTexture(this.gl.TEXTURE_2D, this._textures.getValue(i));
                this.gl.texParameterf(this.gl.TEXTURE_2D, this._extension.TEXTURE_MAX_ANISOTROPY_EXT, this.getAnisotropy());
            }
        }
    }
    setClippingContextBufferForMask(clip) {
        this._clippingContextBufferForMask = clip;
    }
    getClippingContextBufferForMask() {
        return this._clippingContextBufferForMask;
    }
    setClippingContextBufferForDraw(clip) {
        this._clippingContextBufferForDraw = clip;
    }
    getClippingContextBufferForDraw() {
        return this._clippingContextBufferForDraw;
    }
    startUp(gl) {
        this.gl = gl;
        if (this._clippingManager) {
            this._clippingManager.setGL(gl);
        }
        CubismShader_WebGL.getInstance().setGl(gl);
        this._rendererProfile.setGl(gl);
        this._extension =
            this.gl.getExtension('EXT_texture_filter_anisotropic') ||
                this.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
                this.gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
    }
    _textures;
    _sortedDrawableIndexList;
    _clippingManager;
    _clippingContextBufferForMask;
    _clippingContextBufferForDraw;
    _rendererProfile;
    firstDraw;
    _bufferData;
    _extension;
    gl;
}
_cubismrenderer__WEBPACK_IMPORTED_MODULE_6__.CubismRenderer.staticRelease = () => {
    CubismRenderer_WebGL.doStaticRelease();
};

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismClippingContext = _cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_7__.CubismClippingContext;
    Live2DCubismFramework.CubismClippingManager_WebGL = _cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_7__.CubismClippingManager_WebGL;
    Live2DCubismFramework.CubismRenderTextureResource = _cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_7__.CubismRenderTextureResource;
    Live2DCubismFramework.CubismRenderer_WebGL = _cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_7__.CubismRenderer_WebGL;
    Live2DCubismFramework.CubismShaderSet = _cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_7__.CubismShaderSet;
    Live2DCubismFramework.CubismShader_WebGL = _cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_7__.CubismShader_WebGL;
    Live2DCubismFramework.ShaderNames = _cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_7__.ShaderNames;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/type/csmmap.ts":
/*!*************************************************!*\
  !*** ./src/live2d/Framework/src/type/csmmap.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   csmMap: function() { return /* binding */ csmMap; },
/* harmony export */   csmPair: function() { return /* binding */ csmPair; },
/* harmony export */   iterator: function() { return /* binding */ iterator; }
/* harmony export */ });
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");
/* harmony import */ var _csmmap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./csmmap */ "./src/live2d/Framework/src/type/csmmap.ts");

class csmPair {
    constructor(key, value) {
        this.first = key == undefined ? null : key;
        this.second = value == undefined ? null : value;
    }
    first;
    second;
}
class csmMap {
    constructor(size) {
        if (size != undefined) {
            if (size < 1) {
                this._keyValues = [];
                this._dummyValue = null;
                this._size = 0;
            }
            else {
                this._keyValues = new Array(size);
                this._size = size;
            }
        }
        else {
            this._keyValues = [];
            this._dummyValue = null;
            this._size = 0;
        }
    }
    release() {
        this.clear();
    }
    appendKey(key) {
        this.prepareCapacity(this._size + 1, false);
        this._keyValues[this._size] = new csmPair(key);
        this._size += 1;
    }
    getValue(key) {
        let found = -1;
        for (let i = 0; i < this._size; i++) {
            if (this._keyValues[i].first == key) {
                found = i;
                break;
            }
        }
        if (found >= 0) {
            return this._keyValues[found].second;
        }
        else {
            this.appendKey(key);
            return this._keyValues[this._size - 1].second;
        }
    }
    setValue(key, value) {
        let found = -1;
        for (let i = 0; i < this._size; i++) {
            if (this._keyValues[i].first == key) {
                found = i;
                break;
            }
        }
        if (found >= 0) {
            this._keyValues[found].second = value;
        }
        else {
            this.appendKey(key);
            this._keyValues[this._size - 1].second = value;
        }
    }
    isExist(key) {
        for (let i = 0; i < this._size; i++) {
            if (this._keyValues[i].first == key) {
                return true;
            }
        }
        return false;
    }
    clear() {
        this._keyValues = void 0;
        this._keyValues = null;
        this._keyValues = [];
        this._size = 0;
    }
    getSize() {
        return this._size;
    }
    prepareCapacity(newSize, fitToSize) {
        if (newSize > this._keyValues.length) {
            if (this._keyValues.length == 0) {
                if (!fitToSize && newSize < csmMap.DefaultSize)
                    newSize = csmMap.DefaultSize;
                this._keyValues.length = newSize;
            }
            else {
                if (!fitToSize && newSize < this._keyValues.length * 2)
                    newSize = this._keyValues.length * 2;
                this._keyValues.length = newSize;
            }
        }
    }
    begin() {
        const ite = new iterator(this, 0);
        return ite;
    }
    end() {
        const ite = new iterator(this, this._size);
        return ite;
    }
    erase(ite) {
        const index = ite._index;
        if (index < 0 || this._size <= index) {
            return ite;
        }
        this._keyValues.splice(index, 1);
        --this._size;
        const ite2 = new iterator(this, index);
        return ite2;
    }
    dumpAsInt() {
        for (let i = 0; i < this._size; i++) {
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_0__.CubismLogDebug)('{0} ,', this._keyValues[i]);
            (0,_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_0__.CubismLogDebug)('\n');
        }
    }
    static DefaultSize = 10;
    _keyValues;
    _dummyValue;
    _size;
}

class iterator {
    constructor(v, idx) {
        this._map = v != undefined ? v : new csmMap();
        this._index = idx != undefined ? idx : 0;
    }
    set(ite) {
        this._index = ite._index;
        this._map = ite._map;
        return this;
    }
    preIncrement() {
        ++this._index;
        return this;
    }
    preDecrement() {
        --this._index;
        return this;
    }
    increment() {
        const iteold = new iterator(this._map, this._index++);
        return iteold;
    }
    decrement() {
        const iteold = new iterator(this._map, this._index);
        this._map = iteold._map;
        this._index = iteold._index;
        return this;
    }
    ptr() {
        return this._map._keyValues[this._index];
    }
    notEqual(ite) {
        return this._index != ite._index || this._map != ite._map;
    }
    _index;
    _map;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.csmMap = _csmmap__WEBPACK_IMPORTED_MODULE_1__.csmMap;
    Live2DCubismFramework.csmPair = _csmmap__WEBPACK_IMPORTED_MODULE_1__.csmPair;
    Live2DCubismFramework.iterator = _csmmap__WEBPACK_IMPORTED_MODULE_1__.iterator;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/type/csmrectf.ts":
/*!***************************************************!*\
  !*** ./src/live2d/Framework/src/type/csmrectf.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   csmRect: function() { return /* binding */ csmRect; }
/* harmony export */ });
/* harmony import */ var _csmrectf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./csmrectf */ "./src/live2d/Framework/src/type/csmrectf.ts");
class csmRect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    getCenterX() {
        return this.x + 0.5 * this.width;
    }
    getCenterY() {
        return this.y + 0.5 * this.height;
    }
    getRight() {
        return this.x + this.width;
    }
    getBottom() {
        return this.y + this.height;
    }
    setRect(r) {
        this.x = r.x;
        this.y = r.y;
        this.width = r.width;
        this.height = r.height;
    }
    expand(w, h) {
        this.x -= w;
        this.y -= h;
        this.width += w * 2.0;
        this.height += h * 2.0;
    }
    x;
    y;
    width;
    height;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.csmRect = _csmrectf__WEBPACK_IMPORTED_MODULE_0__.csmRect;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/type/csmstring.ts":
/*!****************************************************!*\
  !*** ./src/live2d/Framework/src/type/csmstring.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   csmString: function() { return /* binding */ csmString; }
/* harmony export */ });
/* harmony import */ var _csmstring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./csmstring */ "./src/live2d/Framework/src/type/csmstring.ts");
class csmString {
    append(c, length) {
        this.s += length !== undefined ? c.substr(0, length) : c;
        return this;
    }
    expansion(length, v) {
        for (let i = 0; i < length; i++) {
            this.append(v);
        }
        return this;
    }
    getBytes() {
        return encodeURIComponent(this.s).replace(/%../g, 'x').length;
    }
    getLength() {
        return this.s.length;
    }
    isLess(s) {
        return this.s < s.s;
    }
    isGreat(s) {
        return this.s > s.s;
    }
    isEqual(s) {
        return this.s == s;
    }
    isEmpty() {
        return this.s.length == 0;
    }
    constructor(s) {
        this.s = s;
    }
    s;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.csmString = _csmstring__WEBPACK_IMPORTED_MODULE_0__.csmString;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/type/csmvector.ts":
/*!****************************************************!*\
  !*** ./src/live2d/Framework/src/type/csmvector.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   csmVector: function() { return /* binding */ csmVector; },
/* harmony export */   iterator: function() { return /* binding */ iterator; }
/* harmony export */ });
/* harmony import */ var _csmvector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
class csmVector {
    constructor(initialCapacity = 0) {
        if (initialCapacity < 1) {
            this._ptr = [];
            this._capacity = 0;
            this._size = 0;
        }
        else {
            this._ptr = new Array(initialCapacity);
            this._capacity = initialCapacity;
            this._size = 0;
        }
    }
    at(index) {
        return this._ptr[index];
    }
    set(index, value) {
        this._ptr[index] = value;
    }
    get(offset = 0) {
        const ret = new Array();
        for (let i = offset; i < this._size; i++) {
            ret.push(this._ptr[i]);
        }
        return ret;
    }
    pushBack(value) {
        if (this._size >= this._capacity) {
            this.prepareCapacity(this._capacity == 0 ? csmVector.s_defaultSize : this._capacity * 2);
        }
        this._ptr[this._size++] = value;
    }
    clear() {
        this._ptr.length = 0;
        this._size = 0;
    }
    getSize() {
        return this._size;
    }
    assign(newSize, value) {
        const curSize = this._size;
        if (curSize < newSize) {
            this.prepareCapacity(newSize);
        }
        for (let i = 0; i < newSize; i++) {
            this._ptr[i] = value;
        }
        this._size = newSize;
    }
    resize(newSize, value = null) {
        this.updateSize(newSize, value, true);
    }
    updateSize(newSize, value = null, callPlacementNew = true) {
        const curSize = this._size;
        if (curSize < newSize) {
            this.prepareCapacity(newSize);
            if (callPlacementNew) {
                for (let i = this._size; i < newSize; i++) {
                    if (typeof value == 'function') {
                        this._ptr[i] = JSON.parse(JSON.stringify(new value()));
                    }
                    else {
                        this._ptr[i] = value;
                    }
                }
            }
            else {
                for (let i = this._size; i < newSize; i++) {
                    this._ptr[i] = value;
                }
            }
        }
        else {
            const sub = this._size - newSize;
            this._ptr.splice(this._size - sub, sub);
        }
        this._size = newSize;
    }
    insert(position, begin, end) {
        let dstSi = position._index;
        const srcSi = begin._index;
        const srcEi = end._index;
        const addCount = srcEi - srcSi;
        this.prepareCapacity(this._size + addCount);
        const addSize = this._size - dstSi;
        if (addSize > 0) {
            for (let i = 0; i < addSize; i++) {
                this._ptr.splice(dstSi + i, 0, null);
            }
        }
        for (let i = srcSi; i < srcEi; i++, dstSi++) {
            this._ptr[dstSi] = begin._vector._ptr[i];
        }
        this._size = this._size + addCount;
    }
    remove(index) {
        if (index < 0 || this._size <= index) {
            return false;
        }
        this._ptr.splice(index, 1);
        --this._size;
        return true;
    }
    erase(ite) {
        const index = ite._index;
        if (index < 0 || this._size <= index) {
            return ite;
        }
        this._ptr.splice(index, 1);
        --this._size;
        const ite2 = new iterator(this, index);
        return ite2;
    }
    prepareCapacity(newSize) {
        if (newSize > this._capacity) {
            if (this._capacity == 0) {
                this._ptr = new Array(newSize);
                this._capacity = newSize;
            }
            else {
                this._ptr.length = newSize;
                this._capacity = newSize;
            }
        }
    }
    begin() {
        const ite = this._size == 0 ? this.end() : new iterator(this, 0);
        return ite;
    }
    end() {
        const ite = new iterator(this, this._size);
        return ite;
    }
    getOffset(offset) {
        const newVector = new csmVector();
        newVector._ptr = this.get(offset);
        newVector._size = this.get(offset).length;
        newVector._capacity = this.get(offset).length;
        return newVector;
    }
    _ptr;
    _size;
    _capacity;
    static s_defaultSize = 10;
}

class iterator {
    constructor(v, index) {
        this._vector = v != undefined ? v : null;
        this._index = index != undefined ? index : 0;
    }
    set(ite) {
        this._index = ite._index;
        this._vector = ite._vector;
        return this;
    }
    preIncrement() {
        ++this._index;
        return this;
    }
    preDecrement() {
        --this._index;
        return this;
    }
    increment() {
        const iteold = new iterator(this._vector, this._index++);
        return iteold;
    }
    decrement() {
        const iteold = new iterator(this._vector, this._index--);
        return iteold;
    }
    ptr() {
        return this._vector._ptr[this._index];
    }
    substitution(ite) {
        this._index = ite._index;
        this._vector = ite._vector;
        return this;
    }
    notEqual(ite) {
        return this._index != ite._index || this._vector != ite._vector;
    }
    _index;
    _vector;
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.csmVector = _csmvector__WEBPACK_IMPORTED_MODULE_0__.csmVector;
    Live2DCubismFramework.iterator = _csmvector__WEBPACK_IMPORTED_MODULE_0__.iterator;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/utils/cubismdebug.ts":
/*!*******************************************************!*\
  !*** ./src/live2d/Framework/src/utils/cubismdebug.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSM_ASSERT: function() { return /* binding */ CSM_ASSERT; },
/* harmony export */   CubismDebug: function() { return /* binding */ CubismDebug; },
/* harmony export */   CubismLogDebug: function() { return /* binding */ CubismLogDebug; },
/* harmony export */   CubismLogError: function() { return /* binding */ CubismLogError; },
/* harmony export */   CubismLogInfo: function() { return /* binding */ CubismLogInfo; },
/* harmony export */   CubismLogPrint: function() { return /* binding */ CubismLogPrint; },
/* harmony export */   CubismLogPrintIn: function() { return /* binding */ CubismLogPrintIn; },
/* harmony export */   CubismLogVerbose: function() { return /* binding */ CubismLogVerbose; },
/* harmony export */   CubismLogWarning: function() { return /* binding */ CubismLogWarning; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; }
/* harmony export */ });
/* harmony import */ var _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cubismframeworkconfig */ "./src/live2d/Framework/src/cubismframeworkconfig.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _cubismdebug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");


const CubismLogPrint = (level, fmt, args) => {
    CubismDebug.print(level, '[CSM]' + fmt, args);
};
const CubismLogPrintIn = (level, fmt, args) => {
    CubismLogPrint(level, fmt + '\n', args);
};
const CSM_ASSERT = (expr) => {
    console.assert(expr);
};
let CubismLogVerbose;
let CubismLogDebug;
let CubismLogInfo;
let CubismLogWarning;
let CubismLogError;
if (_cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__.CSM_LOG_LEVEL <= _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__.CSM_LOG_LEVEL_VERBOSE) {
    CubismLogVerbose = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Verbose, '[V]' + fmt, args);
    };
    CubismLogDebug = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Debug, '[D]' + fmt, args);
    };
    CubismLogInfo = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Info, '[I]' + fmt, args);
    };
    CubismLogWarning = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Warning, '[W]' + fmt, args);
    };
    CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
else if (_cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__.CSM_LOG_LEVEL == _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__.CSM_LOG_LEVEL_DEBUG) {
    CubismLogDebug = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Debug, '[D]' + fmt, args);
    };
    CubismLogInfo = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Info, '[I]' + fmt, args);
    };
    CubismLogWarning = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Warning, '[W]' + fmt, args);
    };
    CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
else if (_cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__.CSM_LOG_LEVEL == _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__.CSM_LOG_LEVEL_INFO) {
    CubismLogInfo = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Info, '[I]' + fmt, args);
    };
    CubismLogWarning = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Warning, '[W]' + fmt, args);
    };
    CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
else if (_cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__.CSM_LOG_LEVEL == _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__.CSM_LOG_LEVEL_WARNING) {
    CubismLogWarning = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Warning, '[W]' + fmt, args);
    };
    CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
else if (_cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__.CSM_LOG_LEVEL == _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_0__.CSM_LOG_LEVEL_ERROR) {
    CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.LogLevel.LogLevel_Error, '[E]' + fmt, args);
    };
}
class CubismDebug {
    static print(logLevel, format, args) {
        if (logLevel < _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.CubismFramework.getLoggingLevel()) {
            return;
        }
        const logPrint = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__.CubismFramework.coreLogFunction;
        if (!logPrint)
            return;
        const buffer = format.replace(/\{(\d+)\}/g, (m, k) => {
            return args[k];
        });
        logPrint(buffer);
    }
    static dumpBytes(logLevel, data, length) {
        for (let i = 0; i < length; i++) {
            if (i % 16 == 0 && i > 0)
                this.print(logLevel, '\n');
            else if (i % 8 == 0 && i > 0)
                this.print(logLevel, '  ');
            this.print(logLevel, '{0} ', [data[i] & 0xff]);
        }
        this.print(logLevel, '\n');
    }
    constructor() { }
}

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismDebug = _cubismdebug__WEBPACK_IMPORTED_MODULE_2__.CubismDebug;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/utils/cubismjson.ts":
/*!******************************************************!*\
  !*** ./src/live2d/Framework/src/utils/cubismjson.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismJson: function() { return /* binding */ CubismJson; },
/* harmony export */   JsonArray: function() { return /* binding */ JsonArray; },
/* harmony export */   JsonBoolean: function() { return /* binding */ JsonBoolean; },
/* harmony export */   JsonError: function() { return /* binding */ JsonError; },
/* harmony export */   JsonFloat: function() { return /* binding */ JsonFloat; },
/* harmony export */   JsonMap: function() { return /* binding */ JsonMap; },
/* harmony export */   JsonNullvalue: function() { return /* binding */ JsonNullvalue; },
/* harmony export */   JsonString: function() { return /* binding */ JsonString; },
/* harmony export */   Live2DCubismFramework: function() { return /* binding */ Live2DCubismFramework; },
/* harmony export */   Value: function() { return /* binding */ Value; }
/* harmony export */ });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _type_csmmap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmmap */ "./src/live2d/Framework/src/type/csmmap.ts");
/* harmony import */ var _type_csmstring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/csmstring */ "./src/live2d/Framework/src/type/csmstring.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _cubismdebug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");
/* harmony import */ var _cubismjson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cubismjson */ "./src/live2d/Framework/src/utils/cubismjson.ts");
/* harmony import */ var _cubismjsonextension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cubismjsonextension */ "./src/live2d/Framework/src/utils/cubismjsonextension.ts");





const CSM_JSON_ERROR_TYPE_MISMATCH = 'Error: type mismatch';
const CSM_JSON_ERROR_INDEX_OF_BOUNDS = 'Error: index out of bounds';
class Value {
    constructor() { }
    getRawString(defaultValue, indent) {
        return this.getString(defaultValue, indent);
    }
    toInt(defaultValue = 0) {
        return defaultValue;
    }
    toFloat(defaultValue = 0) {
        return defaultValue;
    }
    toBoolean(defaultValue = false) {
        return defaultValue;
    }
    getSize() {
        return 0;
    }
    getArray(defaultValue = null) {
        return defaultValue;
    }
    getVector(defaultValue = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector()) {
        return defaultValue;
    }
    getMap(defaultValue) {
        return defaultValue;
    }
    getValueByIndex(index) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    }
    getValueByString(s) {
        return Value.nullValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    }
    getKeys() {
        return Value.s_dummyKeys;
    }
    isError() {
        return false;
    }
    isNull() {
        return false;
    }
    isBool() {
        return false;
    }
    isFloat() {
        return false;
    }
    isString() {
        return false;
    }
    isArray() {
        return false;
    }
    isMap() {
        return false;
    }
    equals(value) {
        return false;
    }
    isStatic() {
        return false;
    }
    setErrorNotForClientCall(errorStr) {
        return JsonError.errorValue;
    }
    static staticInitializeNotForClientCall() {
        JsonBoolean.trueValue = new JsonBoolean(true);
        JsonBoolean.falseValue = new JsonBoolean(false);
        Value.errorValue = new JsonError('ERROR', true);
        Value.nullValue = new JsonNullvalue();
        Value.s_dummyKeys = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
    }
    static staticReleaseNotForClientCall() {
        JsonBoolean.trueValue = null;
        JsonBoolean.falseValue = null;
        Value.errorValue = null;
        Value.nullValue = null;
        Value.s_dummyKeys = null;
    }
    _stringBuffer;
    static s_dummyKeys;
    static errorValue;
    static nullValue;
}
class CubismJson {
    constructor(buffer, length) {
        this._error = null;
        this._lineCount = 0;
        this._root = null;
        if (buffer != undefined) {
            this.parseBytes(buffer, length, this._parseCallback);
        }
    }
    static create(buffer, size) {
        const json = new CubismJson();
        const succeeded = json.parseBytes(buffer, size, json._parseCallback);
        if (!succeeded) {
            CubismJson.delete(json);
            return null;
        }
        else {
            return json;
        }
    }
    static delete(instance) {
        instance = null;
    }
    getRoot() {
        return this._root;
    }
    static arrayBufferToString(buffer) {
        const uint8Array = new Uint8Array(buffer);
        let str = '';
        for (let i = 0, len = uint8Array.length; i < len; ++i) {
            str += '%' + this.pad(uint8Array[i].toString(16));
        }
        str = decodeURIComponent(str);
        return str;
    }
    static pad(n) {
        return n.length < 2 ? '0' + n : n;
    }
    parseBytes(buffer, size, parseCallback) {
        const endPos = new Array(1);
        const decodeBuffer = CubismJson.arrayBufferToString(buffer);
        if (parseCallback == undefined) {
            this._root = this.parseValue(decodeBuffer, size, 0, endPos);
        }
        else {
            this._root = parseCallback(JSON.parse(decodeBuffer), new JsonMap());
        }
        if (this._error) {
            let strbuf = '\0';
            strbuf = 'Json parse error : @line ' + (this._lineCount + 1) + '\n';
            this._root = new JsonString(strbuf);
            (0,_cubismdebug__WEBPACK_IMPORTED_MODULE_4__.CubismLogInfo)('{0}', this._root.getRawString());
            return false;
        }
        else if (this._root == null) {
            this._root = new JsonError(new _type_csmstring__WEBPACK_IMPORTED_MODULE_2__.csmString(this._error), false);
            return false;
        }
        return true;
    }
    getParseError() {
        return this._error;
    }
    checkEndOfFile() {
        return this._root.getArray()[1].equals('EOF');
    }
    parseValue(buffer, length, begin, outEndPos) {
        if (this._error)
            return null;
        let o = null;
        let i = begin;
        let f;
        for (; i < length; i++) {
            const c = buffer[i];
            switch (c) {
                case '-':
                case '.':
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': {
                    const afterString = new Array(1);
                    f = (0,_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.strtod)(buffer.slice(i), afterString);
                    outEndPos[0] = buffer.indexOf(afterString[0]);
                    return new JsonFloat(f);
                }
                case '"':
                    return new JsonString(this.parseString(buffer, length, i + 1, outEndPos));
                case '[':
                    o = this.parseArray(buffer, length, i + 1, outEndPos);
                    return o;
                case '{':
                    o = this.parseObject(buffer, length, i + 1, outEndPos);
                    return o;
                case 'n':
                    if (i + 3 < length) {
                        o = new JsonNullvalue();
                        outEndPos[0] = i + 4;
                    }
                    else {
                        this._error = 'parse null';
                    }
                    return o;
                case 't':
                    if (i + 3 < length) {
                        o = JsonBoolean.trueValue;
                        outEndPos[0] = i + 4;
                    }
                    else {
                        this._error = 'parse true';
                    }
                    return o;
                case 'f':
                    if (i + 4 < length) {
                        o = JsonBoolean.falseValue;
                        outEndPos[0] = i + 5;
                    }
                    else {
                        this._error = "illegal ',' position";
                    }
                    return o;
                case ',':
                    this._error = "illegal ',' position";
                    return null;
                case ']':
                    outEndPos[0] = i;
                    return null;
                case '\n':
                    this._lineCount++;
                case ' ':
                case '\t':
                case '\r':
                default:
                    break;
            }
        }
        this._error = 'illegal end of value';
        return null;
    }
    parseString(string, length, begin, outEndPos) {
        if (this._error)
            return null;
        let i = begin;
        let c, c2;
        const ret = new _type_csmstring__WEBPACK_IMPORTED_MODULE_2__.csmString('');
        let bufStart = begin;
        for (; i < length; i++) {
            c = string[i];
            switch (c) {
                case '"': {
                    outEndPos[0] = i + 1;
                    ret.append(string.slice(bufStart), i - bufStart);
                    return ret.s;
                }
                case '//': {
                    i++;
                    if (i - 1 > bufStart) {
                        ret.append(string.slice(bufStart), i - bufStart);
                    }
                    bufStart = i + 1;
                    if (i < length) {
                        c2 = string[i];
                        switch (c2) {
                            case '\\':
                                ret.expansion(1, '\\');
                                break;
                            case '"':
                                ret.expansion(1, '"');
                                break;
                            case '/':
                                ret.expansion(1, '/');
                                break;
                            case 'b':
                                ret.expansion(1, '\b');
                                break;
                            case 'f':
                                ret.expansion(1, '\f');
                                break;
                            case 'n':
                                ret.expansion(1, '\n');
                                break;
                            case 'r':
                                ret.expansion(1, '\r');
                                break;
                            case 't':
                                ret.expansion(1, '\t');
                                break;
                            case 'u':
                                this._error = 'parse string/unicord escape not supported';
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        this._error = 'parse string/escape error';
                    }
                }
                default: {
                    break;
                }
            }
        }
        this._error = 'parse string/illegal end';
        return null;
    }
    parseObject(buffer, length, begin, outEndPos) {
        if (this._error)
            return null;
        const ret = new JsonMap();
        let key = '';
        let i = begin;
        let c = '';
        const localRetEndPos2 = Array(1);
        let ok = false;
        for (; i < length; i++) {
            FOR_LOOP: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case '"':
                        key = this.parseString(buffer, length, i + 1, localRetEndPos2);
                        if (this._error) {
                            return null;
                        }
                        i = localRetEndPos2[0];
                        ok = true;
                        break FOR_LOOP;
                    case '}':
                        outEndPos[0] = i + 1;
                        return ret;
                    case ':':
                        this._error = "illegal ':' position";
                        break;
                    case '\n':
                        this._lineCount++;
                    default:
                        break;
                }
            }
            if (!ok) {
                this._error = 'key not found';
                return null;
            }
            ok = false;
            FOR_LOOP2: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ':':
                        ok = true;
                        i++;
                        break FOR_LOOP2;
                    case '}':
                        this._error = "illegal '}' position";
                        break;
                    case '\n':
                        this._lineCount++;
                    default:
                        break;
                }
            }
            if (!ok) {
                this._error = "':' not found";
                return null;
            }
            const value = this.parseValue(buffer, length, i, localRetEndPos2);
            if (this._error) {
                return null;
            }
            i = localRetEndPos2[0];
            ret.put(key, value);
            FOR_LOOP3: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ',':
                        break FOR_LOOP3;
                    case '}':
                        outEndPos[0] = i + 1;
                        return ret;
                    case '\n':
                        this._lineCount++;
                    default:
                        break;
                }
            }
        }
        this._error = 'illegal end of perseObject';
        return null;
    }
    parseArray(buffer, length, begin, outEndPos) {
        if (this._error)
            return null;
        let ret = new JsonArray();
        let i = begin;
        let c;
        const localRetEndpos2 = new Array(1);
        for (; i < length; i++) {
            const value = this.parseValue(buffer, length, i, localRetEndpos2);
            if (this._error) {
                return null;
            }
            i = localRetEndpos2[0];
            if (value) {
                ret.add(value);
            }
            FOR_LOOP: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ',':
                        break FOR_LOOP;
                    case ']':
                        outEndPos[0] = i + 1;
                        return ret;
                    case '\n':
                        ++this._lineCount;
                    default:
                        break;
                }
            }
        }
        ret = void 0;
        this._error = 'illegal end of parseObject';
        return null;
    }
    _parseCallback = _cubismjsonextension__WEBPACK_IMPORTED_MODULE_5__.CubismJsonExtension.parseJsonObject;
    _error;
    _lineCount;
    _root;
}
class JsonFloat extends Value {
    constructor(v) {
        super();
        this._value = v;
    }
    isFloat() {
        return true;
    }
    getString(defaultValue, indent) {
        const strbuf = '\0';
        this._value = parseFloat(strbuf);
        this._stringBuffer = strbuf;
        return this._stringBuffer;
    }
    toInt(defaultValue = 0) {
        return parseInt(this._value.toString());
    }
    toFloat(defaultValue = 0.0) {
        return this._value;
    }
    equals(value) {
        if ('number' === typeof value) {
            if (Math.round(value)) {
                return false;
            }
            else {
                return value == this._value;
            }
        }
        return false;
    }
    _value;
}
class JsonBoolean extends Value {
    isBool() {
        return true;
    }
    toBoolean(defaultValue = false) {
        return this._boolValue;
    }
    getString(defaultValue, indent) {
        this._stringBuffer = this._boolValue ? 'true' : 'false';
        return this._stringBuffer;
    }
    equals(value) {
        if ('boolean' === typeof value) {
            return value == this._boolValue;
        }
        return false;
    }
    isStatic() {
        return true;
    }
    constructor(v) {
        super();
        this._boolValue = v;
    }
    static trueValue;
    static falseValue;
    _boolValue;
}
class JsonString extends Value {
    constructor(s) {
        super();
        if ('string' === typeof s) {
            this._stringBuffer = s;
        }
        if (s instanceof _type_csmstring__WEBPACK_IMPORTED_MODULE_2__.csmString) {
            this._stringBuffer = s.s;
        }
    }
    isString() {
        return true;
    }
    getString(defaultValue, indent) {
        return this._stringBuffer;
    }
    equals(value) {
        if ('string' === typeof value) {
            return this._stringBuffer == value;
        }
        if (value instanceof _type_csmstring__WEBPACK_IMPORTED_MODULE_2__.csmString) {
            return this._stringBuffer == value.s;
        }
        return false;
    }
}
class JsonError extends JsonString {
    isStatic() {
        return this._isStatic;
    }
    setErrorNotForClientCall(s) {
        this._stringBuffer = s;
        return this;
    }
    constructor(s, isStatic) {
        if ('string' === typeof s) {
            super(s);
        }
        else {
            super(s);
        }
        this._isStatic = isStatic;
    }
    isError() {
        return true;
    }
    _isStatic;
}
class JsonNullvalue extends Value {
    isNull() {
        return true;
    }
    getString(defaultValue, indent) {
        return this._stringBuffer;
    }
    isStatic() {
        return true;
    }
    setErrorNotForClientCall(s) {
        this._stringBuffer = s;
        return JsonError.nullValue;
    }
    constructor() {
        super();
        this._stringBuffer = 'NullValue';
    }
}
class JsonArray extends Value {
    constructor() {
        super();
        this._array = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
    }
    release() {
        for (let ite = this._array.begin(); ite.notEqual(this._array.end()); ite.preIncrement()) {
            let v = ite.ptr();
            if (v && !v.isStatic()) {
                v = void 0;
                v = null;
            }
        }
    }
    isArray() {
        return true;
    }
    getValueByIndex(index) {
        if (index < 0 || this._array.getSize() <= index) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_INDEX_OF_BOUNDS);
        }
        const v = this._array.at(index);
        if (v == null) {
            return Value.nullValue;
        }
        return v;
    }
    getValueByString(s) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    }
    getString(defaultValue, indent) {
        const stringBuffer = indent + '[\n';
        for (let ite = this._array.begin(); ite.notEqual(this._array.end()); ite.increment()) {
            const v = ite.ptr();
            this._stringBuffer += indent + '' + v.getString(indent + ' ') + '\n';
        }
        this._stringBuffer = stringBuffer + indent + ']\n';
        return this._stringBuffer;
    }
    add(v) {
        this._array.pushBack(v);
    }
    getVector(defaultValue = null) {
        return this._array;
    }
    getSize() {
        return this._array.getSize();
    }
    _array;
}
class JsonMap extends Value {
    constructor() {
        super();
        this._map = new _type_csmmap__WEBPACK_IMPORTED_MODULE_1__.csmMap();
    }
    release() {
        const ite = this._map.begin();
        while (ite.notEqual(this._map.end())) {
            let v = ite.ptr().second;
            if (v && !v.isStatic()) {
                v = void 0;
                v = null;
            }
            ite.preIncrement();
        }
    }
    isMap() {
        return true;
    }
    getValueByString(s) {
        if (s instanceof _type_csmstring__WEBPACK_IMPORTED_MODULE_2__.csmString) {
            const ret = this._map.getValue(s.s);
            if (ret == null) {
                return Value.nullValue;
            }
            return ret;
        }
        for (let iter = this._map.begin(); iter.notEqual(this._map.end()); iter.preIncrement()) {
            if (iter.ptr().first == s) {
                if (iter.ptr().second == null) {
                    return Value.nullValue;
                }
                return iter.ptr().second;
            }
        }
        return Value.nullValue;
    }
    getValueByIndex(index) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    }
    getString(defaultValue, indent) {
        this._stringBuffer = indent + '{\n';
        const ite = this._map.begin();
        while (ite.notEqual(this._map.end())) {
            const key = ite.ptr().first;
            const v = ite.ptr().second;
            this._stringBuffer +=
                indent + ' ' + key + ' : ' + v.getString(indent + '   ') + ' \n';
            ite.preIncrement();
        }
        this._stringBuffer += indent + '}\n';
        return this._stringBuffer;
    }
    getMap(defaultValue) {
        return this._map;
    }
    put(key, v) {
        this._map.setValue(key, v);
    }
    getKeys() {
        if (!this._keys) {
            this._keys = new _type_csmvector__WEBPACK_IMPORTED_MODULE_3__.csmVector();
            const ite = this._map.begin();
            while (ite.notEqual(this._map.end())) {
                const key = ite.ptr().first;
                this._keys.pushBack(key);
                ite.preIncrement();
            }
        }
        return this._keys;
    }
    getSize() {
        return this._keys.getSize();
    }
    _map;
    _keys;
}


var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismJson = _cubismjson__WEBPACK_IMPORTED_MODULE_6__.CubismJson;
    Live2DCubismFramework.JsonArray = _cubismjson__WEBPACK_IMPORTED_MODULE_6__.JsonArray;
    Live2DCubismFramework.JsonBoolean = _cubismjson__WEBPACK_IMPORTED_MODULE_6__.JsonBoolean;
    Live2DCubismFramework.JsonError = _cubismjson__WEBPACK_IMPORTED_MODULE_6__.JsonError;
    Live2DCubismFramework.JsonFloat = _cubismjson__WEBPACK_IMPORTED_MODULE_6__.JsonFloat;
    Live2DCubismFramework.JsonMap = _cubismjson__WEBPACK_IMPORTED_MODULE_6__.JsonMap;
    Live2DCubismFramework.JsonNullvalue = _cubismjson__WEBPACK_IMPORTED_MODULE_6__.JsonNullvalue;
    Live2DCubismFramework.JsonString = _cubismjson__WEBPACK_IMPORTED_MODULE_6__.JsonString;
    Live2DCubismFramework.Value = _cubismjson__WEBPACK_IMPORTED_MODULE_6__.Value;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/live2d/Framework/src/utils/cubismjsonextension.ts":
/*!***************************************************************!*\
  !*** ./src/live2d/Framework/src/utils/cubismjsonextension.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CubismJsonExtension: function() { return /* binding */ CubismJsonExtension; }
/* harmony export */ });
/* harmony import */ var _cubismjson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismjson */ "./src/live2d/Framework/src/utils/cubismjson.ts");

class CubismJsonExtension {
    static parseJsonObject(obj, map) {
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] == 'boolean') {
                const convValue = Boolean(obj[key]);
                map.put(key, new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonBoolean(convValue));
            }
            else if (typeof obj[key] == 'string') {
                const convValue = String(obj[key]);
                map.put(key, new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonString(convValue));
            }
            else if (typeof obj[key] == 'number') {
                const convValue = Number(obj[key]);
                map.put(key, new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonFloat(convValue));
            }
            else if (obj[key] instanceof Array) {
                map.put(key, CubismJsonExtension.parseJsonArray(obj[key]));
            }
            else if (obj[key] instanceof Object) {
                map.put(key, CubismJsonExtension.parseJsonObject(obj[key], new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonMap()));
            }
            else if (obj[key] == null) {
                map.put(key, new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonNullvalue());
            }
            else {
                map.put(key, obj[key]);
            }
        });
        return map;
    }
    static parseJsonArray(obj) {
        const arr = new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonArray();
        Object.keys(obj).forEach((key) => {
            const convKey = Number(key);
            if (typeof convKey == 'number') {
                if (typeof obj[key] == 'boolean') {
                    const convValue = Boolean(obj[key]);
                    arr.add(new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonBoolean(convValue));
                }
                else if (typeof obj[key] == 'string') {
                    const convValue = String(obj[key]);
                    arr.add(new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonString(convValue));
                }
                else if (typeof obj[key] == 'number') {
                    const convValue = Number(obj[key]);
                    arr.add(new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonFloat(convValue));
                }
                else if (obj[key] instanceof Array) {
                    arr.add(this.parseJsonArray(obj[key]));
                }
                else if (obj[key] instanceof Object) {
                    arr.add(this.parseJsonObject(obj[key], new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonMap()));
                }
                else if (obj[key] == null) {
                    arr.add(new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonNullvalue());
                }
                else {
                    arr.add(obj[key]);
                }
            }
            else if (obj[key] instanceof Array) {
                arr.add(this.parseJsonArray(obj[key]));
            }
            else if (obj[key] instanceof Object) {
                arr.add(this.parseJsonObject(obj[key], new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonMap()));
            }
            else if (obj[key] == null) {
                arr.add(new _cubismjson__WEBPACK_IMPORTED_MODULE_0__.JsonNullvalue());
            }
            else {
                const convValue = Array(obj[key]);
                for (let i = 0; i < convValue.length; i++) {
                    arr.add(convValue[i]);
                }
            }
        });
        return arr;
    }
}


/***/ }),

/***/ "./src/live2d/lapp/lappdefine.ts":
/*!***************************************!*\
  !*** ./src/live2d/lapp/lappdefine.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackImageName: function() { return /* binding */ BackImageName; },
/* harmony export */   CanvasId: function() { return /* binding */ CanvasId; },
/* harmony export */   CubismLoggingLevel: function() { return /* binding */ CubismLoggingLevel; },
/* harmony export */   DebugLogEnable: function() { return /* binding */ DebugLogEnable; },
/* harmony export */   DebugTouchLogEnable: function() { return /* binding */ DebugTouchLogEnable; },
/* harmony export */   GearImageName: function() { return /* binding */ GearImageName; },
/* harmony export */   HitAreaNameBody: function() { return /* binding */ HitAreaNameBody; },
/* harmony export */   HitAreaNameHead: function() { return /* binding */ HitAreaNameHead; },
/* harmony export */   MOCConsistencyValidationEnable: function() { return /* binding */ MOCConsistencyValidationEnable; },
/* harmony export */   ModelDir: function() { return /* binding */ ModelDir; },
/* harmony export */   ModelDirSize: function() { return /* binding */ ModelDirSize; },
/* harmony export */   MotionGroupIdle: function() { return /* binding */ MotionGroupIdle; },
/* harmony export */   MotionGroupTapBody: function() { return /* binding */ MotionGroupTapBody; },
/* harmony export */   OnChangeScene: function() { return /* binding */ OnChangeScene; },
/* harmony export */   OnModelLoaded: function() { return /* binding */ OnModelLoaded; },
/* harmony export */   PowerImageName: function() { return /* binding */ PowerImageName; },
/* harmony export */   PriorityForce: function() { return /* binding */ PriorityForce; },
/* harmony export */   PriorityIdle: function() { return /* binding */ PriorityIdle; },
/* harmony export */   PriorityNone: function() { return /* binding */ PriorityNone; },
/* harmony export */   PriorityNormal: function() { return /* binding */ PriorityNormal; },
/* harmony export */   RenderTargetHeight: function() { return /* binding */ RenderTargetHeight; },
/* harmony export */   RenderTargetWidth: function() { return /* binding */ RenderTargetWidth; },
/* harmony export */   ResourcesPath: function() { return /* binding */ ResourcesPath; },
/* harmony export */   ViewLogicalBottom: function() { return /* binding */ ViewLogicalBottom; },
/* harmony export */   ViewLogicalLeft: function() { return /* binding */ ViewLogicalLeft; },
/* harmony export */   ViewLogicalMaxBottom: function() { return /* binding */ ViewLogicalMaxBottom; },
/* harmony export */   ViewLogicalMaxLeft: function() { return /* binding */ ViewLogicalMaxLeft; },
/* harmony export */   ViewLogicalMaxRight: function() { return /* binding */ ViewLogicalMaxRight; },
/* harmony export */   ViewLogicalMaxTop: function() { return /* binding */ ViewLogicalMaxTop; },
/* harmony export */   ViewLogicalRight: function() { return /* binding */ ViewLogicalRight; },
/* harmony export */   ViewLogicalTop: function() { return /* binding */ ViewLogicalTop; },
/* harmony export */   ViewMaxScale: function() { return /* binding */ ViewMaxScale; },
/* harmony export */   ViewMinScale: function() { return /* binding */ ViewMinScale; },
/* harmony export */   ViewScale: function() { return /* binding */ ViewScale; },
/* harmony export */   ViewTranslateX: function() { return /* binding */ ViewTranslateX; },
/* harmony export */   ViewTranslateY: function() { return /* binding */ ViewTranslateY; },
/* harmony export */   initDefine: function() { return /* binding */ initDefine; },
/* harmony export */   setCallback: function() { return /* binding */ setCallback; }
/* harmony export */ });
/* harmony import */ var _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");

let ViewScale = 1.0;
let ViewTranslateX, ViewTranslateY;
const ViewMaxScale = 2.0;
const ViewMinScale = 0.8;
const ViewLogicalLeft = -1.0;
const ViewLogicalRight = 1.0;
const ViewLogicalBottom = -1.0;
const ViewLogicalTop = 1.0;
const ViewLogicalMaxLeft = -2.0;
const ViewLogicalMaxRight = 2.0;
const ViewLogicalMaxBottom = -2.0;
const ViewLogicalMaxTop = 2.0;
let CanvasId = '';
let ResourcesPath = '../../Resources/';
let BackImageName = 'back_class_normal.png';
const GearImageName = 'icon_gear.png';
const PowerImageName = 'CloseNormal.png';
let ModelDir = [
    'Haru',
    'Hiyori',
    'Mark',
    'Natori',
    'Rice',
    'Mao'
];
let ModelDirSize = ModelDir.length;
const MotionGroupIdle = 'Idle';
const MotionGroupTapBody = 'TapBody';
const HitAreaNameHead = 'Head';
const HitAreaNameBody = 'Body';
const PriorityNone = 0;
const PriorityIdle = 1;
const PriorityNormal = 2;
const PriorityForce = 3;
const MOCConsistencyValidationEnable = true;
const DebugLogEnable = true;
const DebugTouchLogEnable = false;
const CubismLoggingLevel = _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.LogLevel.LogLevel_Verbose;
const RenderTargetWidth = 1900;
const RenderTargetHeight = 1000;
let OnChangeScene = function (manager) { };
let OnModelLoaded = function (model) { };
function initDefine(resourcesPath, backImageName, modelDir, canvasId, viewScale = 1.0, viewTranslate = [0, 0]) {
    ResourcesPath = resourcesPath;
    BackImageName = backImageName;
    ModelDir = modelDir;
    ModelDirSize = modelDir.length;
    CanvasId = canvasId;
    ViewScale = viewScale;
    [ViewTranslateX, ViewTranslateY] = viewTranslate;
}
function setCallback(onChangeScene, onModelLoaded) {
    OnChangeScene = onChangeScene;
    OnModelLoaded = onModelLoaded;
}


/***/ }),

/***/ "./src/live2d/lapp/lappdelegate.ts":
/*!*****************************************!*\
  !*** ./src/live2d/lapp/lappdelegate.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LAppDelegate: function() { return /* binding */ LAppDelegate; },
/* harmony export */   canvas: function() { return /* binding */ canvas; },
/* harmony export */   frameBuffer: function() { return /* binding */ frameBuffer; },
/* harmony export */   gl: function() { return /* binding */ gl; },
/* harmony export */   s_instance: function() { return /* binding */ s_instance; }
/* harmony export */ });
/* harmony import */ var _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _lappdefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lappdefine */ "./src/live2d/lapp/lappdefine.ts");
/* harmony import */ var _lapplive2dmanager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lapplive2dmanager */ "./src/live2d/lapp/lapplive2dmanager.ts");
/* harmony import */ var _lapppal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lapppal */ "./src/live2d/lapp/lapppal.ts");
/* harmony import */ var _lapptexturemanager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lapptexturemanager */ "./src/live2d/lapp/lapptexturemanager.ts");
/* harmony import */ var _lappview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lappview */ "./src/live2d/lapp/lappview.ts");






let canvas = null;
let s_instance = null;
let gl = null;
let frameBuffer = null;
class LAppDelegate {
    static getInstance() {
        if (s_instance == null) {
            s_instance = new LAppDelegate();
        }
        return s_instance;
    }
    static releaseInstance() {
        if (s_instance != null) {
            s_instance.release();
        }
        s_instance = null;
    }
    initialize() {
        canvas = document.getElementById(_lappdefine__WEBPACK_IMPORTED_MODULE_1__.CanvasId);
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        canvas.toDataURL("image/png");
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            alert('Cannot initialize WebGL. This browser does not support.');
            gl = null;
            document.body.innerHTML =
                'This browser does not support the <code>&lt;canvas&gt;</code> element.';
            return false;
        }
        if (!frameBuffer) {
            frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        }
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        const supportTouch = 'ontouchend' in canvas;
        if (supportTouch) {
            canvas.ontouchstart = onTouchBegan;
            canvas.ontouchmove = onTouchMoved;
            canvas.ontouchend = onTouchEnded;
            canvas.ontouchcancel = onTouchCancel;
        }
        else {
            canvas.onmousedown = onClickBegan;
            window.onmousemove = onMouseMoved;
            canvas.onmouseup = onClickEnded;
        }
        this._view.initialize();
        this.initializeCubism();
        return true;
    }
    onResize() {
        this._resizeCanvas();
        this._view.initialize();
        this._view.initializeSprite();
        const viewport = [0, 0, canvas.width, canvas.height];
        gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
    }
    release() {
        this._textureManager.release();
        this._textureManager = null;
        this._view.release();
        this._view = null;
        _lapplive2dmanager__WEBPACK_IMPORTED_MODULE_2__.LAppLive2DManager.releaseInstance();
        _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.dispose();
    }
    run() {
        const loop = () => {
            if (s_instance == null) {
                return;
            }
            _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.updateTime();
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.clearDepth(1.0);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            this._view.render();
            requestAnimationFrame(loop);
        };
        loop();
    }
    createShader() {
        const vertexShaderId = gl.createShader(gl.VERTEX_SHADER);
        if (vertexShaderId == null) {
            _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.printMessage('failed to create vertexShader');
            return null;
        }
        const vertexShader = 'precision mediump float;' +
            'attribute vec3 position;' +
            'attribute vec2 uv;' +
            'varying vec2 vuv;' +
            'void main(void)' +
            '{' +
            '   gl_Position = vec4(position, 1.0);' +
            '   vuv = uv;' +
            '}';
        gl.shaderSource(vertexShaderId, vertexShader);
        gl.compileShader(vertexShaderId);
        const fragmentShaderId = gl.createShader(gl.FRAGMENT_SHADER);
        if (fragmentShaderId == null) {
            _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.printMessage('failed to create fragmentShader');
            return null;
        }
        const fragmentShader = 'precision mediump float;' +
            'varying vec2 vuv;' +
            'uniform sampler2D texture;' +
            'void main(void)' +
            '{' +
            '   gl_FragColor = texture2D(texture, vuv);' +
            '}';
        gl.shaderSource(fragmentShaderId, fragmentShader);
        gl.compileShader(fragmentShaderId);
        const programId = gl.createProgram();
        gl.attachShader(programId, vertexShaderId);
        gl.attachShader(programId, fragmentShaderId);
        gl.deleteShader(vertexShaderId);
        gl.deleteShader(fragmentShaderId);
        gl.linkProgram(programId);
        gl.useProgram(programId);
        return programId;
    }
    getView() {
        return this._view;
    }
    getTextureManager() {
        return this._textureManager;
    }
    constructor() {
        this._captured = false;
        this._mouseX = 0.0;
        this._mouseY = 0.0;
        this._isEnd = false;
        this._cubismOption = new _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.Option();
        this._view = new _lappview__WEBPACK_IMPORTED_MODULE_5__.LAppView();
        this._textureManager = new _lapptexturemanager__WEBPACK_IMPORTED_MODULE_4__.LAppTextureManager();
    }
    initializeCubism() {
        this._cubismOption.logFunction = _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.printMessage;
        this._cubismOption.loggingLevel = _lappdefine__WEBPACK_IMPORTED_MODULE_1__.CubismLoggingLevel;
        _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.startUp(this._cubismOption);
        _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__.CubismFramework.initialize();
        _lapplive2dmanager__WEBPACK_IMPORTED_MODULE_2__.LAppLive2DManager.getInstance();
        _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.updateTime();
        this._view.initializeSprite();
    }
    _resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    _cubismOption;
    _view;
    _captured;
    _mouseX;
    _mouseY;
    _isEnd;
    _textureManager;
}
function onClickBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    const posX = e.pageX;
    const posY = e.pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onMouseMoved(e) {
    if (!LAppDelegate.getInstance()._view) {
        _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.printMessage('view notfound');
        return;
    }
    let rect = canvas.getBoundingClientRect();
    let posX = e.clientX - rect.left;
    let posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onClickEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.printMessage('view notfound');
        return;
    }
    const rect = e.target.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    const posX = e.changedTouches[0].pageX;
    const posY = e.changedTouches[0].pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onTouchMoved(e) {
    if (!LAppDelegate.getInstance()._captured) {
        return;
    }
    if (!LAppDelegate.getInstance()._view) {
        _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.printMessage('view notfound');
        return;
    }
    const rect = e.target.getBoundingClientRect();
    const posX = e.changedTouches[0].clientX - rect.left;
    const posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onTouchEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.printMessage('view notfound');
        return;
    }
    const rect = e.target.getBoundingClientRect();
    const posX = e.changedTouches[0].clientX - rect.left;
    const posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchCancel(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        _lapppal__WEBPACK_IMPORTED_MODULE_3__.LAppPal.printMessage('view notfound');
        return;
    }
    const rect = e.target.getBoundingClientRect();
    const posX = e.changedTouches[0].clientX - rect.left;
    const posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}


/***/ }),

/***/ "./src/live2d/lapp/lapplive2dmanager.ts":
/*!**********************************************!*\
  !*** ./src/live2d/lapp/lapplive2dmanager.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LAppLive2DManager: function() { return /* binding */ LAppLive2DManager; },
/* harmony export */   s_instance: function() { return /* binding */ s_instance; }
/* harmony export */ });
/* harmony import */ var _framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/math/cubismmatrix44 */ "./src/live2d/Framework/src/math/cubismmatrix44.ts");
/* harmony import */ var _framework_type_csmvector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _lappdefine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lappdefine */ "./src/live2d/lapp/lappdefine.ts");
/* harmony import */ var _lappdelegate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lappdelegate */ "./src/live2d/lapp/lappdelegate.ts");
/* harmony import */ var _lappmodel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lappmodel */ "./src/live2d/lapp/lappmodel.ts");
/* harmony import */ var _lapppal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lapppal */ "./src/live2d/lapp/lapppal.ts");






let s_instance = null;

class LAppLive2DManager {
    static getInstance() {
        if (s_instance == null) {
            s_instance = new LAppLive2DManager();
        }
        return s_instance;
    }
    static releaseInstance() {
        if (s_instance != null) {
            s_instance = void 0;
        }
        s_instance = null;
    }
    getModel(no) {
        if (no < this._models.getSize()) {
            return this._models.at(no);
        }
        return null;
    }
    releaseAllModel() {
        for (let i = 0; i < this._models.getSize(); i++) {
            this._models.at(i).release();
            this._models.set(i, null);
        }
        this._models.clear();
    }
    onDrag(x, y) {
        for (let i = 0; i < this._models.getSize(); i++) {
            const model = this.getModel(i);
            if (model) {
                model.setDragging(x, y);
            }
        }
    }
    onTap(x, y) {
        if (_lappdefine__WEBPACK_IMPORTED_MODULE_2__.DebugLogEnable) {
            _lapppal__WEBPACK_IMPORTED_MODULE_5__.LAppPal.printMessage(`[APP]tap point: {x: ${x.toFixed(2)} y: ${y.toFixed(2)}}`);
        }
        for (let i = 0; i < this._models.getSize(); i++) {
            if (this._models.at(i).hitTest(_lappdefine__WEBPACK_IMPORTED_MODULE_2__.HitAreaNameHead, x, y)) {
                if (_lappdefine__WEBPACK_IMPORTED_MODULE_2__.DebugLogEnable) {
                    _lapppal__WEBPACK_IMPORTED_MODULE_5__.LAppPal.printMessage(`[APP]hit area: [${_lappdefine__WEBPACK_IMPORTED_MODULE_2__.HitAreaNameHead}]`);
                }
                this._models.at(i).setRandomExpression();
            }
            else if (this._models.at(i).hitTest(_lappdefine__WEBPACK_IMPORTED_MODULE_2__.HitAreaNameBody, x, y)) {
                if (_lappdefine__WEBPACK_IMPORTED_MODULE_2__.DebugLogEnable) {
                    _lapppal__WEBPACK_IMPORTED_MODULE_5__.LAppPal.printMessage(`[APP]hit area: [${_lappdefine__WEBPACK_IMPORTED_MODULE_2__.HitAreaNameBody}]`);
                }
                this._models
                    .at(i)
                    .startRandomMotion(_lappdefine__WEBPACK_IMPORTED_MODULE_2__.MotionGroupTapBody, _lappdefine__WEBPACK_IMPORTED_MODULE_2__.PriorityNormal, this._finishedMotion);
            }
        }
    }
    onUpdate() {
        const { width, height } = _lappdelegate__WEBPACK_IMPORTED_MODULE_3__.canvas;
        const modelCount = this._models.getSize();
        for (let i = 0; i < modelCount; ++i) {
            const projection = new _framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44();
            const model = this.getModel(i);
            if (model.getModel()) {
                if (model.getModel().getCanvasWidth() > 1.0 && width < height) {
                    model.getModelMatrix().setWidth(2.0);
                    projection.scale(1.0, width / height);
                }
                else {
                    projection.scale(height / width, 1.0);
                }
                if (this._viewMatrix != null) {
                    projection.multiplyByMatrix(this._viewMatrix);
                }
            }
            model.update();
            model.draw(projection);
        }
    }
    nextScene() {
        const no = (this._sceneIndex + 1) % _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ModelDirSize;
        this.changeScene(no);
    }
    changeScene(index) {
        this._sceneIndex = index;
        if (_lappdefine__WEBPACK_IMPORTED_MODULE_2__.DebugLogEnable) {
            _lapppal__WEBPACK_IMPORTED_MODULE_5__.LAppPal.printMessage(`[APP]model index: ${this._sceneIndex}`);
        }
        const model = _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ModelDir[index];
        const modelPath = _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ResourcesPath + model + '/';
        let modelJsonName = _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ModelDir[index];
        modelJsonName += '.model3.json';
        this.releaseAllModel();
        this._models.pushBack(new _lappmodel__WEBPACK_IMPORTED_MODULE_4__.LAppModel());
        this._models.at(0).loadAssets(modelPath, modelJsonName)
            .then(() => { (0,_lappdefine__WEBPACK_IMPORTED_MODULE_2__.OnChangeScene)(this); });
    }
    setViewMatrix(m) {
        for (let i = 0; i < 16; i++) {
            this._viewMatrix.getArray()[i] = m.getArray()[i];
        }
    }
    constructor() {
        this._viewMatrix = new _framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44();
        this._models = new _framework_type_csmvector__WEBPACK_IMPORTED_MODULE_1__.csmVector();
        this._sceneIndex = 0;
        this.changeScene(this._sceneIndex);
    }
    _viewMatrix;
    _models;
    _sceneIndex;
    _finishedMotion = (self) => {
        _lapppal__WEBPACK_IMPORTED_MODULE_5__.LAppPal.printMessage('Motion Finished:');
        console.log(self);
    };
}


/***/ }),

/***/ "./src/live2d/lapp/lappmodel.ts":
/*!**************************************!*\
  !*** ./src/live2d/lapp/lappmodel.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LAppModel: function() { return /* binding */ LAppModel; }
/* harmony export */ });
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var _framework_cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/cubismdefaultparameterid */ "./src/live2d/Framework/src/cubismdefaultparameterid.ts");
/* harmony import */ var _framework_cubismmodelsettingjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @framework/cubismmodelsettingjson */ "./src/live2d/Framework/src/cubismmodelsettingjson.ts");
/* harmony import */ var _framework_effect_cubismbreath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @framework/effect/cubismbreath */ "./src/live2d/Framework/src/effect/cubismbreath.ts");
/* harmony import */ var _framework_effect_cubismeyeblink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @framework/effect/cubismeyeblink */ "./src/live2d/Framework/src/effect/cubismeyeblink.ts");
/* harmony import */ var _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @framework/live2dcubismframework */ "./src/live2d/Framework/src/live2dcubismframework.ts");
/* harmony import */ var _framework_model_cubismusermodel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @framework/model/cubismusermodel */ "./src/live2d/Framework/src/model/cubismusermodel.ts");
/* harmony import */ var _framework_motion_acubismmotion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @framework/motion/acubismmotion */ "./src/live2d/Framework/src/motion/acubismmotion.ts");
/* harmony import */ var _framework_motion_cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @framework/motion/cubismmotionqueuemanager */ "./src/live2d/Framework/src/motion/cubismmotionqueuemanager.ts");
/* harmony import */ var _framework_type_csmmap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @framework/type/csmmap */ "./src/live2d/Framework/src/type/csmmap.ts");
/* harmony import */ var _framework_type_csmvector__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @framework/type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _framework_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @framework/utils/cubismdebug */ "./src/live2d/Framework/src/utils/cubismdebug.ts");
/* harmony import */ var _lappdefine__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lappdefine */ "./src/live2d/lapp/lappdefine.ts");
/* harmony import */ var _lappdelegate__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lappdelegate */ "./src/live2d/lapp/lappdelegate.ts");
/* harmony import */ var _lapppal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./lapppal */ "./src/live2d/lapp/lapppal.ts");
/* harmony import */ var _lappwavfilehandler__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./lappwavfilehandler */ "./src/live2d/lapp/lappwavfilehandler.ts");
/* harmony import */ var _framework_model_cubismmoc__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @framework/model/cubismmoc */ "./src/live2d/Framework/src/model/cubismmoc.ts");


















var LoadStep;
(function (LoadStep) {
    LoadStep[LoadStep["LoadAssets"] = 0] = "LoadAssets";
    LoadStep[LoadStep["LoadModel"] = 1] = "LoadModel";
    LoadStep[LoadStep["WaitLoadModel"] = 2] = "WaitLoadModel";
    LoadStep[LoadStep["LoadExpression"] = 3] = "LoadExpression";
    LoadStep[LoadStep["WaitLoadExpression"] = 4] = "WaitLoadExpression";
    LoadStep[LoadStep["LoadPhysics"] = 5] = "LoadPhysics";
    LoadStep[LoadStep["WaitLoadPhysics"] = 6] = "WaitLoadPhysics";
    LoadStep[LoadStep["LoadPose"] = 7] = "LoadPose";
    LoadStep[LoadStep["WaitLoadPose"] = 8] = "WaitLoadPose";
    LoadStep[LoadStep["SetupEyeBlink"] = 9] = "SetupEyeBlink";
    LoadStep[LoadStep["SetupBreath"] = 10] = "SetupBreath";
    LoadStep[LoadStep["LoadUserData"] = 11] = "LoadUserData";
    LoadStep[LoadStep["WaitLoadUserData"] = 12] = "WaitLoadUserData";
    LoadStep[LoadStep["SetupEyeBlinkIds"] = 13] = "SetupEyeBlinkIds";
    LoadStep[LoadStep["SetupLipSyncIds"] = 14] = "SetupLipSyncIds";
    LoadStep[LoadStep["SetupLayout"] = 15] = "SetupLayout";
    LoadStep[LoadStep["LoadMotion"] = 16] = "LoadMotion";
    LoadStep[LoadStep["WaitLoadMotion"] = 17] = "WaitLoadMotion";
    LoadStep[LoadStep["CompleteInitialize"] = 18] = "CompleteInitialize";
    LoadStep[LoadStep["CompleteSetupModel"] = 19] = "CompleteSetupModel";
    LoadStep[LoadStep["LoadTexture"] = 20] = "LoadTexture";
    LoadStep[LoadStep["WaitLoadTexture"] = 21] = "WaitLoadTexture";
    LoadStep[LoadStep["CompleteSetup"] = 22] = "CompleteSetup";
})(LoadStep || (LoadStep = {}));
class LAppModel extends _framework_model_cubismusermodel__WEBPACK_IMPORTED_MODULE_6__.CubismUserModel {
    loadAssets(dir, fileName) {
        this._modelHomeDir = dir;
        return fetch(`${this._modelHomeDir}${fileName}`)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
            const setting = new _framework_cubismmodelsettingjson__WEBPACK_IMPORTED_MODULE_2__.CubismModelSettingJson(arrayBuffer, arrayBuffer.byteLength);
            this._state = LoadStep.LoadModel;
            this.setupModel(setting);
        });
    }
    setupModel(setting) {
        this._updating = true;
        this._initialized = false;
        this._modelSetting = setting;
        if (this._modelSetting.getModelFileName() != '') {
            const modelFileName = this._modelSetting.getModelFileName();
            fetch(`${this._modelHomeDir}${modelFileName}`)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                this.loadModel(arrayBuffer, this._mocConsistency);
                this._state = LoadStep.LoadExpression;
                loadCubismExpression();
            });
            this._state = LoadStep.WaitLoadModel;
        }
        else {
            _lapppal__WEBPACK_IMPORTED_MODULE_14__.LAppPal.printMessage('Model data does not exist.');
        }
        const loadCubismExpression = () => {
            if (this._modelSetting.getExpressionCount() > 0) {
                const count = this._modelSetting.getExpressionCount();
                for (let i = 0; i < count; i++) {
                    const expressionName = this._modelSetting.getExpressionName(i);
                    const expressionFileName = this._modelSetting.getExpressionFileName(i);
                    fetch(`${this._modelHomeDir}${expressionFileName}`)
                        .then(response => response.arrayBuffer())
                        .then(arrayBuffer => {
                        const motion = this.loadExpression(arrayBuffer, arrayBuffer.byteLength, expressionName);
                        if (this._expressions.getValue(expressionName) != null) {
                            _framework_motion_acubismmotion__WEBPACK_IMPORTED_MODULE_7__.ACubismMotion["delete"](this._expressions.getValue(expressionName));
                            this._expressions.setValue(expressionName, null);
                        }
                        this._expressions.setValue(expressionName, motion);
                        this._expressionCount++;
                        if (this._expressionCount >= count) {
                            this._state = LoadStep.LoadPhysics;
                            loadCubismPhysics();
                        }
                    });
                }
                this._state = LoadStep.WaitLoadExpression;
            }
            else {
                this._state = LoadStep.LoadPhysics;
                loadCubismPhysics();
            }
        };
        const loadCubismPhysics = () => {
            if (this._modelSetting.getPhysicsFileName() != '') {
                const physicsFileName = this._modelSetting.getPhysicsFileName();
                fetch(`${this._modelHomeDir}${physicsFileName}`)
                    .then(response => response.arrayBuffer())
                    .then(arrayBuffer => {
                    this.loadPhysics(arrayBuffer, arrayBuffer.byteLength);
                    this._state = LoadStep.LoadPose;
                    loadCubismPose();
                });
                this._state = LoadStep.WaitLoadPhysics;
            }
            else {
                this._state = LoadStep.LoadPose;
                loadCubismPose();
            }
        };
        const loadCubismPose = () => {
            if (this._modelSetting.getPoseFileName() != '') {
                const poseFileName = this._modelSetting.getPoseFileName();
                fetch(`${this._modelHomeDir}${poseFileName}`)
                    .then(response => response.arrayBuffer())
                    .then(arrayBuffer => {
                    this.loadPose(arrayBuffer, arrayBuffer.byteLength);
                    this._state = LoadStep.SetupEyeBlink;
                    setupEyeBlink();
                });
                this._state = LoadStep.WaitLoadPose;
            }
            else {
                this._state = LoadStep.SetupEyeBlink;
                setupEyeBlink();
            }
        };
        const setupEyeBlink = () => {
            if (this._modelSetting.getEyeBlinkParameterCount() > 0) {
                this._eyeBlink = _framework_effect_cubismeyeblink__WEBPACK_IMPORTED_MODULE_4__.CubismEyeBlink.create(this._modelSetting);
                this._state = LoadStep.SetupBreath;
            }
            setupBreath();
        };
        const setupBreath = () => {
            this._breath = _framework_effect_cubismbreath__WEBPACK_IMPORTED_MODULE_3__.CubismBreath.create();
            const breathParameters = new _framework_type_csmvector__WEBPACK_IMPORTED_MODULE_10__.csmVector();
            breathParameters.pushBack(new _framework_effect_cubismbreath__WEBPACK_IMPORTED_MODULE_3__.BreathParameterData(this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5));
            breathParameters.pushBack(new _framework_effect_cubismbreath__WEBPACK_IMPORTED_MODULE_3__.BreathParameterData(this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5));
            breathParameters.pushBack(new _framework_effect_cubismbreath__WEBPACK_IMPORTED_MODULE_3__.BreathParameterData(this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5));
            breathParameters.pushBack(new _framework_effect_cubismbreath__WEBPACK_IMPORTED_MODULE_3__.BreathParameterData(this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5));
            breathParameters.pushBack(new _framework_effect_cubismbreath__WEBPACK_IMPORTED_MODULE_3__.BreathParameterData(_framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_5__.CubismFramework.getIdManager().getId(_framework_cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_1__.CubismDefaultParameterId.ParamBreath), 0.5, 0.5, 3.2345, 1));
            this._breath.setParameters(breathParameters);
            this._state = LoadStep.LoadUserData;
            loadUserData();
        };
        const loadUserData = () => {
            if (this._modelSetting.getUserDataFile() != '') {
                const userDataFile = this._modelSetting.getUserDataFile();
                fetch(`${this._modelHomeDir}${userDataFile}`)
                    .then(response => response.arrayBuffer())
                    .then(arrayBuffer => {
                    this.loadUserData(arrayBuffer, arrayBuffer.byteLength);
                    this._state = LoadStep.SetupEyeBlinkIds;
                    setupEyeBlinkIds();
                });
                this._state = LoadStep.WaitLoadUserData;
            }
            else {
                this._state = LoadStep.SetupEyeBlinkIds;
                setupEyeBlinkIds();
            }
        };
        const setupEyeBlinkIds = () => {
            const eyeBlinkIdCount = this._modelSetting.getEyeBlinkParameterCount();
            for (let i = 0; i < eyeBlinkIdCount; ++i) {
                this._eyeBlinkIds.pushBack(this._modelSetting.getEyeBlinkParameterId(i));
            }
            this._state = LoadStep.SetupLipSyncIds;
            setupLipSyncIds();
        };
        const setupLipSyncIds = () => {
            const lipSyncIdCount = this._modelSetting.getLipSyncParameterCount();
            for (let i = 0; i < lipSyncIdCount; ++i) {
                this._lipSyncIds.pushBack(this._modelSetting.getLipSyncParameterId(i));
            }
            this._state = LoadStep.SetupLayout;
            setupLayout();
        };
        const setupLayout = () => {
            const layout = new _framework_type_csmmap__WEBPACK_IMPORTED_MODULE_9__.csmMap();
            if (this._modelSetting == null || this._modelMatrix == null) {
                (0,_framework_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_11__.CubismLogError)('Failed to setupLayout().');
                return;
            }
            this._modelSetting.getLayoutMap(layout);
            this._modelMatrix.setupFromLayout(layout);
            this._state = LoadStep.LoadMotion;
            loadCubismMotion();
        };
        const loadCubismMotion = () => {
            this._state = LoadStep.WaitLoadMotion;
            this._model.saveParameters();
            this._allMotionCount = 0;
            this._motionCount = 0;
            const group = [];
            const motionGroupCount = this._modelSetting.getMotionGroupCount();
            for (let i = 0; i < motionGroupCount; i++) {
                group[i] = this._modelSetting.getMotionGroupName(i);
                this._allMotionCount += this._modelSetting.getMotionCount(group[i]);
            }
            for (let i = 0; i < motionGroupCount; i++) {
                this.preLoadMotionGroup(group[i]);
            }
            if (motionGroupCount == 0) {
                this._state = LoadStep.LoadTexture;
                this._motionManager.stopAllMotions();
                this._updating = false;
                this._initialized = true;
                this.createRenderer();
                this.setupTextures();
                this.getRenderer().startUp(_lappdelegate__WEBPACK_IMPORTED_MODULE_13__.gl);
            }
        };
    }
    setupTextures() {
        const usePremultiply = true;
        if (this._state == LoadStep.LoadTexture) {
            const textureCount = this._modelSetting.getTextureCount();
            for (let modelTextureNumber = 0; modelTextureNumber < textureCount; modelTextureNumber++) {
                if (this._modelSetting.getTextureFileName(modelTextureNumber) == '') {
                    console.log('getTextureFileName null');
                    continue;
                }
                let texturePath = this._modelSetting.getTextureFileName(modelTextureNumber);
                texturePath = this._modelHomeDir + texturePath;
                const onLoad = (textureInfo) => {
                    this.getRenderer().bindTexture(modelTextureNumber, textureInfo.id);
                    this._textureCount++;
                    if (this._textureCount >= textureCount) {
                        this._state = LoadStep.CompleteSetup;
                        (0,_lappdefine__WEBPACK_IMPORTED_MODULE_12__.OnModelLoaded)(this);
                    }
                };
                _lappdelegate__WEBPACK_IMPORTED_MODULE_13__.LAppDelegate.getInstance()
                    .getTextureManager()
                    .createTextureFromPngFile(texturePath, usePremultiply, onLoad);
                this.getRenderer().setIsPremultipliedAlpha(usePremultiply);
            }
            this._state = LoadStep.WaitLoadTexture;
        }
    }
    reloadRenderer() {
        this.deleteRenderer();
        this.createRenderer();
        this.setupTextures();
    }
    update() {
        if (this._state != LoadStep.CompleteSetup)
            return;
        const deltaTimeSeconds = _lapppal__WEBPACK_IMPORTED_MODULE_14__.LAppPal.getDeltaTime();
        this._userTimeSeconds += deltaTimeSeconds;
        this._dragManager.update(deltaTimeSeconds);
        this._dragX = this._dragManager.getX();
        this._dragY = this._dragManager.getY();
        let motionUpdated = false;
        this._model.loadParameters();
        if (this._motionManager.isFinished()) {
            this.startRandomMotion(_lappdefine__WEBPACK_IMPORTED_MODULE_12__.MotionGroupIdle, _lappdefine__WEBPACK_IMPORTED_MODULE_12__.PriorityIdle);
        }
        else {
            motionUpdated = this._motionManager.updateMotion(this._model, deltaTimeSeconds);
        }
        this._model.saveParameters();
        if (!motionUpdated) {
            if (this._eyeBlink != null) {
                this._eyeBlink.updateParameters(this._model, deltaTimeSeconds);
            }
        }
        if (this._expressionManager != null) {
            this._expressionManager.updateMotion(this._model, deltaTimeSeconds);
        }
        this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30);
        this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30);
        this._model.addParameterValueById(this._idParamAngleZ, this._dragX * this._dragY * -30);
        this._model.addParameterValueById(this._idParamBodyAngleX, this._dragX * 10);
        this._model.addParameterValueById(this._idParamEyeBallX, this._dragX);
        this._model.addParameterValueById(this._idParamEyeBallY, this._dragY);
        if (this._breath != null) {
            this._breath.updateParameters(this._model, deltaTimeSeconds);
        }
        if (this._physics != null) {
            this._physics.evaluate(this._model, deltaTimeSeconds);
        }
        if (this._lipsync) {
            let value = 0.0;
            this._wavFileHandler.update(deltaTimeSeconds);
            value = this._wavFileHandler.getRms();
            for (let i = 0; i < this._lipSyncIds.getSize(); ++i) {
                this._model.addParameterValueById(this._lipSyncIds.at(i), value, 0.8);
            }
        }
        if (this._pose != null) {
            this._pose.updateParameters(this._model, deltaTimeSeconds);
        }
        this._model.update();
    }
    startMotion(group, no, priority, onFinishedMotionHandler) {
        if (priority == _lappdefine__WEBPACK_IMPORTED_MODULE_12__.PriorityForce) {
            this._motionManager.setReservePriority(priority);
        }
        else if (!this._motionManager.reserveMotion(priority)) {
            if (this._debugMode) {
                _lapppal__WEBPACK_IMPORTED_MODULE_14__.LAppPal.printMessage("[APP]can't start motion.");
            }
            return _framework_motion_cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_8__.InvalidMotionQueueEntryHandleValue;
        }
        const motionFileName = this._modelSetting.getMotionFileName(group, no);
        const name = `${group}_${no}`;
        let motion = this._motions.getValue(name);
        let autoDelete = false;
        if (motion == null) {
            fetch(`${this._modelHomeDir}${motionFileName}`)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                motion = this.loadMotion(arrayBuffer, arrayBuffer.byteLength, null, onFinishedMotionHandler);
                let fadeTime = this._modelSetting.getMotionFadeInTimeValue(group, no);
                if (fadeTime >= 0.0) {
                    motion.setFadeInTime(fadeTime);
                }
                fadeTime = this._modelSetting.getMotionFadeOutTimeValue(group, no);
                if (fadeTime >= 0.0) {
                    motion.setFadeOutTime(fadeTime);
                }
                motion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds);
                autoDelete = true;
            });
        }
        else {
            motion.setFinishedMotionHandler(onFinishedMotionHandler);
        }
        const voice = this._modelSetting.getMotionSoundFileName(group, no);
        if (voice.localeCompare('') != 0) {
            let path = voice;
            path = this._modelHomeDir + path;
            this._wavFileHandler.start(path);
        }
        if (this._debugMode) {
            _lapppal__WEBPACK_IMPORTED_MODULE_14__.LAppPal.printMessage(`[APP]start motion: [${group}_${no}`);
        }
        return this._motionManager.startMotionPriority(motion, autoDelete, priority);
    }
    startRandomMotion(group, priority, onFinishedMotionHandler) {
        if (this._modelSetting.getMotionCount(group) == 0) {
            return _framework_motion_cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_8__.InvalidMotionQueueEntryHandleValue;
        }
        const no = Math.floor(Math.random() * this._modelSetting.getMotionCount(group));
        return this.startMotion(group, no, priority, onFinishedMotionHandler);
    }
    setExpression(expressionId) {
        const motion = this._expressions.getValue(expressionId);
        if (this._debugMode) {
            _lapppal__WEBPACK_IMPORTED_MODULE_14__.LAppPal.printMessage(`[APP]expression: [${expressionId}]`);
        }
        if (motion != null) {
            this._expressionManager.startMotionPriority(motion, false, _lappdefine__WEBPACK_IMPORTED_MODULE_12__.PriorityForce);
        }
        else {
            if (this._debugMode) {
                _lapppal__WEBPACK_IMPORTED_MODULE_14__.LAppPal.printMessage(`[APP]expression[${expressionId}] is null`);
            }
        }
    }
    setRandomExpression() {
        if (this._expressions.getSize() == 0) {
            return;
        }
        const no = Math.floor(Math.random() * this._expressions.getSize());
        for (let i = 0; i < this._expressions.getSize(); i++) {
            if (i == no) {
                const name = this._expressions._keyValues[i].first;
                this.setExpression(name);
                return;
            }
        }
    }
    motionEventFired(eventValue) {
        (0,_framework_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_11__.CubismLogInfo)('{0} is fired on LAppModel!!', eventValue.s);
    }
    hitTest(hitArenaName, x, y) {
        if (this._opacity < 1) {
            return false;
        }
        const count = this._modelSetting.getHitAreasCount();
        for (let i = 0; i < count; i++) {
            if (this._modelSetting.getHitAreaName(i) == hitArenaName) {
                const drawId = this._modelSetting.getHitAreaId(i);
                return this.isHit(drawId, x, y);
            }
        }
        return false;
    }
    preLoadMotionGroup(group) {
        for (let i = 0; i < this._modelSetting.getMotionCount(group); i++) {
            const motionFileName = this._modelSetting.getMotionFileName(group, i);
            const name = `${group}_${i}`;
            if (this._debugMode) {
                _lapppal__WEBPACK_IMPORTED_MODULE_14__.LAppPal.printMessage(`[APP]load motion: ${motionFileName} => [${name}]`);
            }
            fetch(`${this._modelHomeDir}${motionFileName}`)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                const tmpMotion = this.loadMotion(arrayBuffer, arrayBuffer.byteLength, name);
                let fadeTime = this._modelSetting.getMotionFadeInTimeValue(group, i);
                if (fadeTime >= 0.0) {
                    tmpMotion.setFadeInTime(fadeTime);
                }
                fadeTime = this._modelSetting.getMotionFadeOutTimeValue(group, i);
                if (fadeTime >= 0.0) {
                    tmpMotion.setFadeOutTime(fadeTime);
                }
                tmpMotion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds);
                if (this._motions.getValue(name) != null) {
                    _framework_motion_acubismmotion__WEBPACK_IMPORTED_MODULE_7__.ACubismMotion["delete"](this._motions.getValue(name));
                }
                this._motions.setValue(name, tmpMotion);
                this._motionCount++;
                if (this._motionCount >= this._allMotionCount) {
                    this._state = LoadStep.LoadTexture;
                    this._motionManager.stopAllMotions();
                    this._updating = false;
                    this._initialized = true;
                    this.createRenderer();
                    this.setupTextures();
                    this.getRenderer().startUp(_lappdelegate__WEBPACK_IMPORTED_MODULE_13__.gl);
                }
            });
        }
    }
    releaseMotions() {
        this._motions.clear();
    }
    releaseExpressions() {
        this._expressions.clear();
    }
    doDraw() {
        if (this._model == null)
            return;
        const viewport = [0, 0, _lappdelegate__WEBPACK_IMPORTED_MODULE_13__.canvas.width, _lappdelegate__WEBPACK_IMPORTED_MODULE_13__.canvas.height];
        this.getRenderer().setRenderState(_lappdelegate__WEBPACK_IMPORTED_MODULE_13__.frameBuffer, viewport);
        this.getRenderer().drawModel();
    }
    draw(matrix) {
        if (this._model == null) {
            return;
        }
        if (this._state == LoadStep.CompleteSetup) {
            matrix.multiplyByMatrix(this._modelMatrix);
            this.getRenderer().setMvpMatrix(matrix);
            this.doDraw();
        }
    }
    async hasMocConsistencyFromFile() {
        (0,_framework_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_11__.CSM_ASSERT)(this._modelSetting.getModelFileName().localeCompare(``));
        if (this._modelSetting.getModelFileName() != '') {
            const modelFileName = this._modelSetting.getModelFileName();
            const response = await fetch(`${this._modelHomeDir}${modelFileName}`);
            const arrayBuffer = await response.arrayBuffer();
            this._consistency = _framework_model_cubismmoc__WEBPACK_IMPORTED_MODULE_16__.CubismMoc.hasMocConsistency(arrayBuffer);
            if (!this._consistency) {
                (0,_framework_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_11__.CubismLogInfo)('Inconsistent MOC3.');
            }
            else {
                (0,_framework_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_11__.CubismLogInfo)('Consistent MOC3.');
            }
            return this._consistency;
        }
        else {
            _lapppal__WEBPACK_IMPORTED_MODULE_14__.LAppPal.printMessage('Model data does not exist.');
        }
    }
    constructor() {
        super();
        this._modelSetting = null;
        this._modelHomeDir = null;
        this._userTimeSeconds = 0.0;
        this._eyeBlinkIds = new _framework_type_csmvector__WEBPACK_IMPORTED_MODULE_10__.csmVector();
        this._lipSyncIds = new _framework_type_csmvector__WEBPACK_IMPORTED_MODULE_10__.csmVector();
        this._motions = new _framework_type_csmmap__WEBPACK_IMPORTED_MODULE_9__.csmMap();
        this._expressions = new _framework_type_csmmap__WEBPACK_IMPORTED_MODULE_9__.csmMap();
        this._hitArea = new _framework_type_csmvector__WEBPACK_IMPORTED_MODULE_10__.csmVector();
        this._userArea = new _framework_type_csmvector__WEBPACK_IMPORTED_MODULE_10__.csmVector();
        this._idParamAngleX = _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_5__.CubismFramework.getIdManager().getId(_framework_cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_1__.CubismDefaultParameterId.ParamAngleX);
        this._idParamAngleY = _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_5__.CubismFramework.getIdManager().getId(_framework_cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_1__.CubismDefaultParameterId.ParamAngleY);
        this._idParamAngleZ = _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_5__.CubismFramework.getIdManager().getId(_framework_cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_1__.CubismDefaultParameterId.ParamAngleZ);
        this._idParamEyeBallX = _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_5__.CubismFramework.getIdManager().getId(_framework_cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_1__.CubismDefaultParameterId.ParamEyeBallX);
        this._idParamEyeBallY = _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_5__.CubismFramework.getIdManager().getId(_framework_cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_1__.CubismDefaultParameterId.ParamEyeBallY);
        this._idParamBodyAngleX = _framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_5__.CubismFramework.getIdManager().getId(_framework_cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_1__.CubismDefaultParameterId.ParamBodyAngleX);
        if (_lappdefine__WEBPACK_IMPORTED_MODULE_12__.MOCConsistencyValidationEnable) {
            this._mocConsistency = true;
        }
        this._state = LoadStep.LoadAssets;
        this._expressionCount = 0;
        this._textureCount = 0;
        this._motionCount = 0;
        this._allMotionCount = 0;
        this._wavFileHandler = new _lappwavfilehandler__WEBPACK_IMPORTED_MODULE_15__.LAppWavFileHandler();
        this._consistency = false;
    }
    _modelSetting;
    _modelHomeDir;
    _userTimeSeconds;
    _eyeBlinkIds;
    _lipSyncIds;
    _motions;
    _expressions;
    _hitArea;
    _userArea;
    _idParamAngleX;
    _idParamAngleY;
    _idParamAngleZ;
    _idParamEyeBallX;
    _idParamEyeBallY;
    _idParamBodyAngleX;
    _state;
    _expressionCount;
    _textureCount;
    _motionCount;
    _allMotionCount;
    _wavFileHandler;
    _consistency;
}


/***/ }),

/***/ "./src/live2d/lapp/lapppal.ts":
/*!************************************!*\
  !*** ./src/live2d/lapp/lapppal.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LAppPal: function() { return /* binding */ LAppPal; }
/* harmony export */ });
class LAppPal {
    static loadFileAsBytes(filePath, callback) {
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => callback(arrayBuffer, arrayBuffer.byteLength));
    }
    static getDeltaTime() {
        return this.s_deltaTime;
    }
    static updateTime() {
        this.s_currentFrame = Date.now();
        this.s_deltaTime = (this.s_currentFrame - this.s_lastFrame) / 1000;
        this.s_lastFrame = this.s_currentFrame;
    }
    static printMessage(message) {
        console.log(message);
    }
    static lastUpdate = Date.now();
    static s_currentFrame = 0.0;
    static s_lastFrame = 0.0;
    static s_deltaTime = 0.0;
}



/***/ }),

/***/ "./src/live2d/lapp/lappsprite.ts":
/*!***************************************!*\
  !*** ./src/live2d/lapp/lappsprite.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LAppSprite: function() { return /* binding */ LAppSprite; },
/* harmony export */   Rect: function() { return /* binding */ Rect; }
/* harmony export */ });
/* harmony import */ var _lappdelegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lappdelegate */ "./src/live2d/lapp/lappdelegate.ts");

class LAppSprite {
    constructor(x, y, width, height, textureId) {
        this._rect = new Rect();
        this._rect.left = x - width * 0.5;
        this._rect.right = x + width * 0.5;
        this._rect.up = y + height * 0.5;
        this._rect.down = y - height * 0.5;
        this._texture = textureId;
        this._vertexBuffer = null;
        this._uvBuffer = null;
        this._indexBuffer = null;
        this._positionLocation = null;
        this._uvLocation = null;
        this._textureLocation = null;
        this._positionArray = null;
        this._uvArray = null;
        this._indexArray = null;
        this._firstDraw = true;
    }
    release() {
        this._rect = null;
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.deleteTexture(this._texture);
        this._texture = null;
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.deleteBuffer(this._uvBuffer);
        this._uvBuffer = null;
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.deleteBuffer(this._vertexBuffer);
        this._vertexBuffer = null;
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.deleteBuffer(this._indexBuffer);
        this._indexBuffer = null;
    }
    getTexture() {
        return this._texture;
    }
    render(programId) {
        if (this._texture == null) {
            return;
        }
        if (this._firstDraw) {
            this._positionLocation = _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.getAttribLocation(programId, 'position');
            _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.enableVertexAttribArray(this._positionLocation);
            this._uvLocation = _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.getAttribLocation(programId, 'uv');
            _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.enableVertexAttribArray(this._uvLocation);
            this._textureLocation = _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.getUniformLocation(programId, 'texture');
            _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.uniform1i(this._textureLocation, 0);
            {
                this._uvArray = new Float32Array([
                    1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0
                ]);
                this._uvBuffer = _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.createBuffer();
            }
            {
                const maxWidth = _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.canvas.width;
                const maxHeight = _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.canvas.height;
                this._positionArray = new Float32Array([
                    (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5),
                    (this._rect.up - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.left - maxWidth * 0.5) / (maxWidth * 0.5),
                    (this._rect.up - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.left - maxWidth * 0.5) / (maxWidth * 0.5),
                    (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5),
                    (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5)
                ]);
                this._vertexBuffer = _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.createBuffer();
            }
            {
                this._indexArray = new Uint16Array([0, 1, 2, 3, 2, 0]);
                this._indexBuffer = _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.createBuffer();
            }
            this._firstDraw = false;
        }
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.bindBuffer(_lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.ARRAY_BUFFER, this._uvBuffer);
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.bufferData(_lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.ARRAY_BUFFER, this._uvArray, _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.STATIC_DRAW);
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribPointer(this._uvLocation, 2, _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.FLOAT, false, 0, 0);
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.bindBuffer(_lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.ARRAY_BUFFER, this._vertexBuffer);
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.bufferData(_lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.ARRAY_BUFFER, this._positionArray, _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.STATIC_DRAW);
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.vertexAttribPointer(this._positionLocation, 2, _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.FLOAT, false, 0, 0);
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.bindBuffer(_lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.bufferData(_lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.ELEMENT_ARRAY_BUFFER, this._indexArray, _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.DYNAMIC_DRAW);
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.bindTexture(_lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.TEXTURE_2D, this._texture);
        _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.drawElements(_lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.TRIANGLES, this._indexArray.length, _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.gl.UNSIGNED_SHORT, 0);
    }
    isHit(pointX, pointY) {
        const { height } = _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.canvas;
        const y = height - pointY;
        return (pointX >= this._rect.left &&
            pointX <= this._rect.right &&
            y <= this._rect.up &&
            y >= this._rect.down);
    }
    _texture;
    _vertexBuffer;
    _uvBuffer;
    _indexBuffer;
    _rect;
    _positionLocation;
    _uvLocation;
    _textureLocation;
    _positionArray;
    _uvArray;
    _indexArray;
    _firstDraw;
}
class Rect {
    left;
    right;
    up;
    down;
}


/***/ }),

/***/ "./src/live2d/lapp/lapptexturemanager.ts":
/*!***********************************************!*\
  !*** ./src/live2d/lapp/lapptexturemanager.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LAppTextureManager: function() { return /* binding */ LAppTextureManager; },
/* harmony export */   TextureInfo: function() { return /* binding */ TextureInfo; }
/* harmony export */ });
/* harmony import */ var _framework_type_csmvector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/type/csmvector */ "./src/live2d/Framework/src/type/csmvector.ts");
/* harmony import */ var _lappdelegate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lappdelegate */ "./src/live2d/lapp/lappdelegate.ts");


class LAppTextureManager {
    constructor() {
        this._textures = new _framework_type_csmvector__WEBPACK_IMPORTED_MODULE_0__.csmVector();
    }
    release() {
        for (let ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.deleteTexture(ite.ptr().id);
        }
        this._textures = null;
    }
    createTextureFromPngFile(fileName, usePremultiply, callback) {
        for (let ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            if (ite.ptr().fileName == fileName &&
                ite.ptr().usePremultply == usePremultiply) {
                ite.ptr().img = new Image();
                ite.ptr().img.onload = () => callback(ite.ptr());
                ite.ptr().img.src = fileName;
                return;
            }
        }
        const img = new Image();
        img.crossOrigin = '';
        img.onload = () => {
            const tex = _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.createTexture();
            _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.bindTexture(_lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.TEXTURE_2D, tex);
            _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.texParameteri(_lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.TEXTURE_2D, _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.TEXTURE_MIN_FILTER, _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.LINEAR_MIPMAP_LINEAR);
            _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.texParameteri(_lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.TEXTURE_2D, _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.TEXTURE_MAG_FILTER, _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.LINEAR);
            if (usePremultiply) {
                _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.pixelStorei(_lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            }
            _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.texImage2D(_lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.TEXTURE_2D, 0, _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.RGBA, _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.RGBA, _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.UNSIGNED_BYTE, img);
            _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.generateMipmap(_lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.TEXTURE_2D);
            _lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.bindTexture(_lappdelegate__WEBPACK_IMPORTED_MODULE_1__.gl.TEXTURE_2D, null);
            const textureInfo = new TextureInfo();
            if (textureInfo != null) {
                textureInfo.fileName = fileName;
                textureInfo.width = img.width;
                textureInfo.height = img.height;
                textureInfo.id = tex;
                textureInfo.img = img;
                textureInfo.usePremultply = usePremultiply;
                this._textures.pushBack(textureInfo);
            }
            callback(textureInfo);
        };
        img.src = fileName;
    }
    releaseTextures() {
        for (let i = 0; i < this._textures.getSize(); i++) {
            this._textures.set(i, null);
        }
        this._textures.clear();
    }
    releaseTextureByTexture(texture) {
        for (let i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).id != texture) {
                continue;
            }
            this._textures.set(i, null);
            this._textures.remove(i);
            break;
        }
    }
    releaseTextureByFilePath(fileName) {
        for (let i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).fileName == fileName) {
                this._textures.set(i, null);
                this._textures.remove(i);
                break;
            }
        }
    }
    _textures;
}
class TextureInfo {
    img;
    id = null;
    width = 0;
    height = 0;
    usePremultply;
    fileName;
}


/***/ }),

/***/ "./src/live2d/lapp/lappview.ts":
/*!*************************************!*\
  !*** ./src/live2d/lapp/lappview.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LAppView: function() { return /* binding */ LAppView; }
/* harmony export */ });
/* harmony import */ var _framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/math/cubismmatrix44 */ "./src/live2d/Framework/src/math/cubismmatrix44.ts");
/* harmony import */ var _framework_math_cubismviewmatrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/math/cubismviewmatrix */ "./src/live2d/Framework/src/math/cubismviewmatrix.ts");
/* harmony import */ var _lappdefine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lappdefine */ "./src/live2d/lapp/lappdefine.ts");
/* harmony import */ var _lappdelegate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lappdelegate */ "./src/live2d/lapp/lappdelegate.ts");
/* harmony import */ var _lapplive2dmanager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lapplive2dmanager */ "./src/live2d/lapp/lapplive2dmanager.ts");
/* harmony import */ var _lapppal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lapppal */ "./src/live2d/lapp/lapppal.ts");
/* harmony import */ var _lappsprite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lappsprite */ "./src/live2d/lapp/lappsprite.ts");
/* harmony import */ var _touchmanager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./touchmanager */ "./src/live2d/lapp/touchmanager.ts");








class LAppView {
    constructor() {
        this._programId = null;
        this._back = null;
        this._gear = null;
        this._touchManager = new _touchmanager__WEBPACK_IMPORTED_MODULE_7__.TouchManager();
        this._deviceToScreen = new _framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__.CubismMatrix44();
        this._viewMatrix = new _framework_math_cubismviewmatrix__WEBPACK_IMPORTED_MODULE_1__.CubismViewMatrix();
    }
    initialize() {
        const { width, height } = _lappdelegate__WEBPACK_IMPORTED_MODULE_3__.canvas;
        const ratio = width / height;
        const left = -ratio;
        const right = ratio;
        const bottom = _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewLogicalLeft;
        const top = _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewLogicalRight;
        this._viewMatrix.setScreenRect(left, right, bottom, top);
        this._viewMatrix.scale(_lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewScale, _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewScale);
        this._viewMatrix.translate(_lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewTranslateX, _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewTranslateY);
        this._deviceToScreen.loadIdentity();
        if (width > height) {
            const screenW = Math.abs(right - left);
            this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
        }
        else {
            const screenH = Math.abs(top - bottom);
            this._deviceToScreen.scaleRelative(screenH / height, -screenH / height);
        }
        this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);
        this._viewMatrix.setMaxScale(_lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewMaxScale);
        this._viewMatrix.setMinScale(_lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewMinScale);
        this._viewMatrix.setMaxScreenRect(_lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewLogicalMaxLeft, _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewLogicalMaxRight, _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewLogicalMaxBottom, _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ViewLogicalMaxTop);
    }
    release() {
        this._viewMatrix = null;
        this._touchManager = null;
        this._deviceToScreen = null;
        this._gear.release();
        this._gear = null;
        this._back.release();
        this._back = null;
        _lappdelegate__WEBPACK_IMPORTED_MODULE_3__.gl.deleteProgram(this._programId);
        this._programId = null;
    }
    render() {
        _lappdelegate__WEBPACK_IMPORTED_MODULE_3__.gl.useProgram(this._programId);
        if (this._back) {
            this._back.render(this._programId);
        }
        if (this._gear) {
            this._gear.render(this._programId);
        }
        _lappdelegate__WEBPACK_IMPORTED_MODULE_3__.gl.flush();
        const live2DManager = _lapplive2dmanager__WEBPACK_IMPORTED_MODULE_4__.LAppLive2DManager.getInstance();
        live2DManager.setViewMatrix(this._viewMatrix);
        live2DManager.onUpdate();
    }
    initializeSprite() {
        const width = _lappdelegate__WEBPACK_IMPORTED_MODULE_3__.canvas.width;
        const height = _lappdelegate__WEBPACK_IMPORTED_MODULE_3__.canvas.height;
        const textureManager = _lappdelegate__WEBPACK_IMPORTED_MODULE_3__.LAppDelegate.getInstance().getTextureManager();
        const resourcesPath = _lappdefine__WEBPACK_IMPORTED_MODULE_2__.ResourcesPath;
        let imageName = '';
        imageName = _lappdefine__WEBPACK_IMPORTED_MODULE_2__.BackImageName;
        if (imageName != "" && imageName != null) {
            const initBackGroundTexture = (textureInfo) => {
                const x = width * 0.5;
                const y = height * 0.5;
                const fwidth = textureInfo.width * 2.0;
                const fheight = height * 0.95;
                this._back = new _lappsprite__WEBPACK_IMPORTED_MODULE_6__.LAppSprite(x, y, fwidth, fheight, textureInfo.id);
            };
            textureManager.createTextureFromPngFile(resourcesPath + imageName, false, initBackGroundTexture);
        }
        if (this._programId == null) {
            this._programId = _lappdelegate__WEBPACK_IMPORTED_MODULE_3__.LAppDelegate.getInstance().createShader();
        }
    }
    onTouchesBegan(pointX, pointY) {
        this._touchManager.touchesBegan(pointX, pointY);
    }
    onTouchesMoved(pointX, pointY) {
        const viewX = this.transformViewX(this._touchManager.getX());
        const viewY = this.transformViewY(this._touchManager.getY());
        this._touchManager.touchesMoved(pointX, pointY);
        const live2DManager = _lapplive2dmanager__WEBPACK_IMPORTED_MODULE_4__.LAppLive2DManager.getInstance();
        live2DManager.onDrag(viewX, viewY);
    }
    onTouchesEnded(pointX, pointY) {
        const live2DManager = _lapplive2dmanager__WEBPACK_IMPORTED_MODULE_4__.LAppLive2DManager.getInstance();
        live2DManager.onDrag(0.0, 0.0);
        {
            const x = this._deviceToScreen.transformX(this._touchManager.getX());
            const y = this._deviceToScreen.transformY(this._touchManager.getY());
            if (_lappdefine__WEBPACK_IMPORTED_MODULE_2__.DebugTouchLogEnable) {
                _lapppal__WEBPACK_IMPORTED_MODULE_5__.LAppPal.printMessage(`[APP]touchesEnded x: ${x} y: ${y}`);
            }
            live2DManager.onTap(x, y);
        }
    }
    transformViewX(deviceX) {
        const screenX = this._deviceToScreen.transformX(deviceX);
        return this._viewMatrix.invertTransformX(screenX);
    }
    transformViewY(deviceY) {
        const screenY = this._deviceToScreen.transformY(deviceY);
        return this._viewMatrix.invertTransformY(screenY);
    }
    transformScreenX(deviceX) {
        return this._deviceToScreen.transformX(deviceX);
    }
    transformScreenY(deviceY) {
        return this._deviceToScreen.transformY(deviceY);
    }
    _touchManager;
    _deviceToScreen;
    _viewMatrix;
    _programId;
    _back;
    _gear;
    _changeModel;
    _isClick;
}


/***/ }),

/***/ "./src/live2d/lapp/lappwavfilehandler.ts":
/*!***********************************************!*\
  !*** ./src/live2d/lapp/lappwavfilehandler.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ByteReader: function() { return /* binding */ ByteReader; },
/* harmony export */   LAppWavFileHandler: function() { return /* binding */ LAppWavFileHandler; },
/* harmony export */   WavFileInfo: function() { return /* binding */ WavFileInfo; },
/* harmony export */   s_instance: function() { return /* binding */ s_instance; }
/* harmony export */ });
let s_instance = null;
class LAppWavFileHandler {
    static getInstance() {
        if (s_instance == null) {
            s_instance = new LAppWavFileHandler();
        }
        return s_instance;
    }
    static releaseInstance() {
        if (s_instance != null) {
            s_instance = void 0;
        }
        s_instance = null;
    }
    update(deltaTimeSeconds) {
        let goalOffset;
        let rms;
        if (this._pcmData == null ||
            this._sampleOffset >= this._wavFileInfo._samplesPerChannel) {
            this._lastRms = 0.0;
            return false;
        }
        this._userTimeSeconds += deltaTimeSeconds;
        goalOffset = Math.floor(this._userTimeSeconds * this._wavFileInfo._samplingRate);
        if (goalOffset > this._wavFileInfo._samplesPerChannel) {
            goalOffset = this._wavFileInfo._samplesPerChannel;
        }
        rms = 0.0;
        for (let channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
            for (let sampleCount = this._sampleOffset; sampleCount < goalOffset; sampleCount++) {
                const pcm = this._pcmData[channelCount][sampleCount];
                rms += pcm * pcm;
            }
        }
        rms = Math.sqrt(rms /
            (this._wavFileInfo._numberOfChannels *
                (goalOffset - this._sampleOffset)));
        this._lastRms = rms;
        this._sampleOffset = goalOffset;
        return true;
    }
    start(filePath) {
        this._sampleOffset = 0;
        this._userTimeSeconds = 0.0;
        this._lastRms = 0.0;
        if (!this.loadWavFile(filePath)) {
            return;
        }
    }
    getRms() {
        return this._lastRms;
    }
    loadWavFile(filePath) {
        let ret = false;
        if (this._pcmData != null) {
            this.releasePcmData();
        }
        const asyncFileLoad = async () => {
            return fetch(filePath).then(responce => {
                return responce.arrayBuffer();
            });
        };
        const asyncWavFileManager = (async () => {
            this._byteReader._fileByte = await asyncFileLoad();
            this._byteReader._fileDataView = new DataView(this._byteReader._fileByte);
            this._byteReader._fileSize = this._byteReader._fileByte.byteLength;
            this._byteReader._readOffset = 0;
            if (this._byteReader._fileByte == null ||
                this._byteReader._fileSize < 4) {
                return false;
            }
            this._wavFileInfo._fileName = filePath;
            try {
                if (!this._byteReader.getCheckSignature('RIFF')) {
                    ret = false;
                    throw new Error('Cannot find Signeture "RIFF".');
                }
                this._byteReader.get32LittleEndian();
                if (!this._byteReader.getCheckSignature('WAVE')) {
                    ret = false;
                    throw new Error('Cannot find Signeture "WAVE".');
                }
                if (!this._byteReader.getCheckSignature('fmt ')) {
                    ret = false;
                    throw new Error('Cannot find Signeture "fmt".');
                }
                const fmtChunkSize = this._byteReader.get32LittleEndian();
                if (this._byteReader.get16LittleEndian() != 1) {
                    ret = false;
                    throw new Error('File is not linear PCM.');
                }
                this._wavFileInfo._numberOfChannels =
                    this._byteReader.get16LittleEndian();
                this._wavFileInfo._samplingRate = this._byteReader.get32LittleEndian();
                this._byteReader.get32LittleEndian();
                this._byteReader.get16LittleEndian();
                this._wavFileInfo._bitsPerSample = this._byteReader.get16LittleEndian();
                if (fmtChunkSize > 16) {
                    this._byteReader._readOffset += fmtChunkSize - 16;
                }
                while (!this._byteReader.getCheckSignature('data') &&
                    this._byteReader._readOffset < this._byteReader._fileSize) {
                    this._byteReader._readOffset +=
                        this._byteReader.get32LittleEndian() + 4;
                }
                if (this._byteReader._readOffset >= this._byteReader._fileSize) {
                    ret = false;
                    throw new Error('Cannot find "data" Chunk.');
                }
                {
                    const dataChunkSize = this._byteReader.get32LittleEndian();
                    this._wavFileInfo._samplesPerChannel =
                        (dataChunkSize * 8) /
                            (this._wavFileInfo._bitsPerSample *
                                this._wavFileInfo._numberOfChannels);
                }
                this._pcmData = new Array(this._wavFileInfo._numberOfChannels);
                for (let channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
                    this._pcmData[channelCount] = new Float32Array(this._wavFileInfo._samplesPerChannel);
                }
                for (let sampleCount = 0; sampleCount < this._wavFileInfo._samplesPerChannel; sampleCount++) {
                    for (let channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
                        this._pcmData[channelCount][sampleCount] = this.getPcmSample();
                    }
                }
                ret = true;
            }
            catch (e) {
                console.log(e);
            }
        })();
        return ret;
    }
    getPcmSample() {
        let pcm32;
        switch (this._wavFileInfo._bitsPerSample) {
            case 8:
                pcm32 = this._byteReader.get8() - 128;
                pcm32 <<= 24;
                break;
            case 16:
                pcm32 = this._byteReader.get16LittleEndian() << 16;
                break;
            case 24:
                pcm32 = this._byteReader.get24LittleEndian() << 8;
                break;
            default:
                pcm32 = 0;
                break;
        }
        return pcm32 / 2147483647;
    }
    releasePcmData() {
        for (let channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
            delete this._pcmData[channelCount];
        }
        delete this._pcmData;
        this._pcmData = null;
    }
    constructor() {
        this._pcmData = null;
        this._userTimeSeconds = 0.0;
        this._lastRms = 0.0;
        this._sampleOffset = 0.0;
        this._wavFileInfo = new WavFileInfo();
        this._byteReader = new ByteReader();
    }
    _pcmData;
    _userTimeSeconds;
    _lastRms;
    _sampleOffset;
    _wavFileInfo;
    _byteReader;
    _loadFiletoBytes = (arrayBuffer, length) => {
        this._byteReader._fileByte = arrayBuffer;
        this._byteReader._fileDataView = new DataView(this._byteReader._fileByte);
        this._byteReader._fileSize = length;
    };
}
class WavFileInfo {
    constructor() {
        this._fileName = '';
        this._numberOfChannels = 0;
        this._bitsPerSample = 0;
        this._samplingRate = 0;
        this._samplesPerChannel = 0;
    }
    _fileName;
    _numberOfChannels;
    _bitsPerSample;
    _samplingRate;
    _samplesPerChannel;
}
class ByteReader {
    constructor() {
        this._fileByte = null;
        this._fileDataView = null;
        this._fileSize = 0;
        this._readOffset = 0;
    }
    get8() {
        const ret = this._fileDataView.getUint8(this._readOffset);
        this._readOffset++;
        return ret;
    }
    get16LittleEndian() {
        const ret = (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
            this._fileDataView.getUint8(this._readOffset);
        this._readOffset += 2;
        return ret;
    }
    get24LittleEndian() {
        const ret = (this._fileDataView.getUint8(this._readOffset + 2) << 16) |
            (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
            this._fileDataView.getUint8(this._readOffset);
        this._readOffset += 3;
        return ret;
    }
    get32LittleEndian() {
        const ret = (this._fileDataView.getUint8(this._readOffset + 3) << 24) |
            (this._fileDataView.getUint8(this._readOffset + 2) << 16) |
            (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
            this._fileDataView.getUint8(this._readOffset);
        this._readOffset += 4;
        return ret;
    }
    getCheckSignature(reference) {
        const getSignature = new Uint8Array(4);
        const referenceString = new TextEncoder().encode(reference);
        if (reference.length != 4) {
            return false;
        }
        for (let signatureOffset = 0; signatureOffset < 4; signatureOffset++) {
            getSignature[signatureOffset] = this.get8();
        }
        return (getSignature[0] == referenceString[0] &&
            getSignature[1] == referenceString[1] &&
            getSignature[2] == referenceString[2] &&
            getSignature[3] == referenceString[3]);
    }
    _fileByte;
    _fileDataView;
    _fileSize;
    _readOffset;
}


/***/ }),

/***/ "./src/live2d/lapp/main.ts":
/*!*********************************!*\
  !*** ./src/live2d/lapp/main.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initLApp: function() { return /* binding */ initLApp; }
/* harmony export */ });
/* harmony import */ var _lappdelegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lappdelegate */ "./src/live2d/lapp/lappdelegate.ts");

function initLApp() {
    if (_lappdelegate__WEBPACK_IMPORTED_MODULE_0__.LAppDelegate.getInstance().initialize() == false) {
        return;
    }
    _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.LAppDelegate.getInstance().run();
}
;
window.onbeforeunload = () => _lappdelegate__WEBPACK_IMPORTED_MODULE_0__.LAppDelegate.releaseInstance();


/***/ }),

/***/ "./src/live2d/lapp/touchmanager.ts":
/*!*****************************************!*\
  !*** ./src/live2d/lapp/touchmanager.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TouchManager: function() { return /* binding */ TouchManager; }
/* harmony export */ });
class TouchManager {
    constructor() {
        this._startX = 0.0;
        this._startY = 0.0;
        this._lastX = 0.0;
        this._lastY = 0.0;
        this._lastX1 = 0.0;
        this._lastY1 = 0.0;
        this._lastX2 = 0.0;
        this._lastY2 = 0.0;
        this._lastTouchDistance = 0.0;
        this._deltaX = 0.0;
        this._deltaY = 0.0;
        this._scale = 1.0;
        this._touchSingle = false;
        this._flipAvailable = false;
    }
    getCenterX() {
        return this._lastX;
    }
    getCenterY() {
        return this._lastY;
    }
    getDeltaX() {
        return this._deltaX;
    }
    getDeltaY() {
        return this._deltaY;
    }
    getStartX() {
        return this._startX;
    }
    getStartY() {
        return this._startY;
    }
    getScale() {
        return this._scale;
    }
    getX() {
        return this._lastX;
    }
    getY() {
        return this._lastY;
    }
    getX1() {
        return this._lastX1;
    }
    getY1() {
        return this._lastY1;
    }
    getX2() {
        return this._lastX2;
    }
    getY2() {
        return this._lastY2;
    }
    isSingleTouch() {
        return this._touchSingle;
    }
    isFlickAvailable() {
        return this._flipAvailable;
    }
    disableFlick() {
        this._flipAvailable = false;
    }
    touchesBegan(deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._startX = deviceX;
        this._startY = deviceY;
        this._lastTouchDistance = -1.0;
        this._flipAvailable = true;
        this._touchSingle = true;
    }
    touchesMoved(deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._lastTouchDistance = -1.0;
        this._touchSingle = true;
    }
    getFlickDistance() {
        return this.calculateDistance(this._startX, this._startY, this._lastX, this._lastY);
    }
    calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
    calculateMovingAmount(v1, v2) {
        if (v1 > 0.0 != v2 > 0.0) {
            return 0.0;
        }
        const sign = v1 > 0.0 ? 1.0 : -1.0;
        const absoluteValue1 = Math.abs(v1);
        const absoluteValue2 = Math.abs(v2);
        return (sign * (absoluteValue1 < absoluteValue2 ? absoluteValue1 : absoluteValue2));
    }
    _startY;
    _startX;
    _lastX;
    _lastY;
    _lastX1;
    _lastY1;
    _lastX2;
    _lastY2;
    _lastTouchDistance;
    _deltaX;
    _deltaY;
    _scale;
    _touchSingle;
    _flipAvailable;
}


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ WebSocketClient; }
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: any[]) => void} f
   */
  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }

    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);
  return WebSocketClient;
}();


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=5000&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=5000&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=5000&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js");
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />










/**
 * @typedef {Object} OverlayOptions
 * @property {boolean | (error: Error) => boolean} [warnings]
 * @property {boolean | (error: Error) => boolean} [errors]
 * @property {boolean | (error: Error) => boolean} [runtimeErrors]
 * @property {string} [trustedTypesPolicyName]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | OverlayOptions} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (typeof overlayOptions === "object") {
    ["warnings", "errors", "runtimeErrors"].forEach(function (property) {
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        // eslint-disable-next-line no-new-func
        var overlayFilterFunction = new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
        overlayOptions[property] = overlayFilterFunction;
      }
    });
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Error parsing overlay options from resource query:", e);
  }

  // Fill in default "true" params for partially-specified objects.
  if (typeof options.overlay === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = true;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {string} level
 */
function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}
if (options.logging) {
  setAllLogLevel(options.logging);
}
(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.createOverlay)(typeof options.overlay === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },
  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'
  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {



/**
 * Client stub for tapable SyncBailHook
 */
module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var LogType = Object.freeze({
  error: /** @type {"error"} */"error",
  // message, c style arguments
  warn: /** @type {"warn"} */"warn",
  // message, c style arguments
  info: /** @type {"info"} */"info",
  // message, c style arguments
  log: /** @type {"log"} */"log",
  // message, c style arguments
  debug: /** @type {"debug"} */"debug",
  // message, c style arguments

  trace: /** @type {"trace"} */"trace",
  // no arguments

  group: /** @type {"group"} */"group",
  // [label]
  groupCollapsed: /** @type {"groupCollapsed"} */"groupCollapsed",
  // [label]
  groupEnd: /** @type {"groupEnd"} */"groupEnd",
  // [label]

  profile: /** @type {"profile"} */"profile",
  // [profileName]
  profileEnd: /** @type {"profileEnd"} */"profileEnd",
  // [profileName]

  time: /** @type {"time"} */"time",
  // name, time as [seconds, nanoseconds]

  clear: /** @type {"clear"} */"clear",
  // no arguments
  status: /** @type {"status"} */"status" // message, arguments
});

exports.LogType = LogType;

/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");
var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);
    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }
  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }
        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }
      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }
      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }
      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }
      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);
  return WebpackLogger;
}();
exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_11285__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var _require = __nested_webpack_require_11285__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  LogType = _require.LogType;

/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */
var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace(
    // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }
  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }
  if (typeof item === "function") {
    return item;
  }
  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};

/**
 * @enum {number}
 */
var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};

/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */
module.exports = function (_ref) {
  var _ref$level = _ref.level,
    level = _ref$level === void 0 ? "info" : _ref$level,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);
  /** @type {number} */
  var loglevel = LogLevel["".concat(level)] || 0;

  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */
  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };
    var debug = debugFilters.some(function (f) {
      return f(name);
    });
    switch (type) {
      case LogType.debug:
        if (!debug) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;
      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;
        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }
          break;
        }
      // falls through
      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }
        break;
      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");
          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }
          break;
        }
      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }
        break;
      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;
        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }
        break;
      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };
  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_21334__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var SyncBailHook = __nested_webpack_require_21334__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");
var _require = __nested_webpack_require_21334__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  Logger = _require.Logger;
var createConsoleLogger = __nested_webpack_require_21334__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");

/** @type {createConsoleLogger.LoggerOptions} */
var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */
exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};

/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */
exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);
  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};
exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_23461__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_23461__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_23461__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_23461__.o(definition, key) && !__nested_webpack_require_23461__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_23461__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_23461__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_23461__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_23461__.d(__nested_webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_23461__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];
if(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: function() { return /* binding */ createOverlay; },
/* harmony export */   formatProblem: function() { return /* binding */ formatProblem; }
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay/runtime-error.js */ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js");
/* harmony import */ var _overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay/state-machine.js */ "./node_modules/webpack-dev-server/client/overlay/state-machine.js");
/* harmony import */ var _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/styles.js */ "./node_modules/webpack-dev-server/client/overlay/styles.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).






var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item
 * @returns {{ header: string, body: string }}
 */
function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    // eslint-disable-next-line no-nested-ternary
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
}

/**
 * @typedef {Object} CreateOverlayOptions
 * @property {string | null} trustedTypesPolicyName
 * @property {boolean | (error: Error) => void} [catchRuntimeError]
 */

/**
 *
 * @param {CreateOverlayOptions} options
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */
  var overlayTrustedTypesPolicy;

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[prop] = style[prop];
    });
  }

  /**
   * @param {string | null} trustedTypesPolicyName
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      containerElement = /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad( /** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      containerElement.innerHTML = "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type
   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   * @param {'build' | 'runtime'} messageSource
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.warning : _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTypeStyle);
        if (message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", true);
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_4__.encode)(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTextStyle);
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }
  var overlayService = (0,_overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    showOverlay: function showOverlay(_ref) {
      var _ref$level = _ref.level,
        level = _ref$level === void 0 ? "error" : _ref$level,
        messages = _ref.messages,
        messageSource = _ref.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hide
  });
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error
     * @param {string} fallbackMessage
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.parseErrorToStacks)(errorObject)
          }]
        });
      }
    };
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToRuntimeError)(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }
      handleError(error, message);
    });
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToUnhandledRejection)(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/fsm.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/fsm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @typedef {Object} StateDefinitions
 * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]
 */

/**
 * @typedef {Object} Options
 * @property {{[state: string]: StateDefinitions}} states
 * @property {object} context;
 * @property {string} initial
 */

/**
 * @typedef {Object} Implementation
 * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 *
 *  - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 *  - event passed to `send` must be an object with `type` property.
 *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 *  Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 *
 * @param {Options} options
 * @param {Implementation} implementation
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}
/* harmony default export */ __webpack_exports__["default"] = (createMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/runtime-error.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listenToRuntimeError: function() { return /* binding */ listenToRuntimeError; },
/* harmony export */   listenToUnhandledRejection: function() { return /* binding */ listenToUnhandledRejection; },
/* harmony export */   parseErrorToStacks: function() { return /* binding */ parseErrorToStacks; }
/* harmony export */ });
/**
 *
 * @param {Error} error
 */
function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
}

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback
 */
function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
}

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback
 */
function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
}


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/state-machine.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/state-machine.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fsm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm.js */ "./node_modules/webpack-dev-server/client/overlay/fsm.js");


/**
 * @typedef {Object} ShowOverlayData
 * @property {'warning' | 'error'} level
 * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @property {'build' | 'runtime'} messageSource
 */

/**
 * @typedef {Object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay
 * @property {() => void} hideOverlay
 */

/**
 * @param {CreateOverlayMachineOptions} options
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  var overlayMachine = (0,_fsm_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
  return overlayMachine;
};
/* harmony default export */ __webpack_exports__["default"] = (createOverlayMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/styles.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/styles.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containerStyle: function() { return /* binding */ containerStyle; },
/* harmony export */   dismissButtonStyle: function() { return /* binding */ dismissButtonStyle; },
/* harmony export */   headerStyle: function() { return /* binding */ headerStyle; },
/* harmony export */   iframeStyle: function() { return /* binding */ iframeStyle; },
/* harmony export */   msgStyles: function() { return /* binding */ msgStyles; },
/* harmony export */   msgTextStyle: function() { return /* binding */ msgTextStyle; },
/* harmony export */   msgTypeStyle: function() { return /* binding */ msgTypeStyle; }
/* harmony export */ });
// styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: function() { return /* binding */ client; }
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */




// this WebsocketClient is here as a default fallback, in case the client is not injected
/* eslint-disable camelcase */
var Client =
// eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports
var client = null;

/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */
var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}

/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */
function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}
/* harmony default export */ __webpack_exports__["default"] = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
}
/* harmony default export */ __webpack_exports__["default"] = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: function() { return /* binding */ log; },
/* harmony export */   logEnabledFeatures: function() { return /* binding */ logEnabledFeatures; },
/* harmony export */   setLogLevel: function() { return /* binding */ setLogLevel; }
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);
var logEnabledFeatures = function logEnabledFeatures(features) {
  var enabledFeatures = Object.keys(features);
  if (!features || enabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < enabledFeatures.length; i++) {
    var key = enabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  log.info(logString);
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");


/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */
function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }
  return options;
}
/* harmony default export */ __webpack_exports__["default"] = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");



/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */
function reloadApp(_ref, status) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (status.isUnloading) {
    return;
  }
  var currentHash = status.currentHash,
    previousHash = status.previousHash;
  var isInitial = currentHash.indexOf( /** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}
/* harmony default export */ __webpack_exports__["default"] = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* global __resourceQuery WorkerGlobalScope */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ __webpack_exports__["default"] = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }
  return string.replace(ansiRegex, "");
}
/* harmony default export */ __webpack_exports__["default"] = (stripAnsi);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
	/** @type {undefined|string} */
	var lastHash;
	var upToDate = function upToDate() {
		return /** @type {string} */ (lastHash).indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				if (!updatedModules) {
					log(
						"warning",
						"[HMR] Cannot find update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					if (typeof window !== "undefined") {
						window.location.reload();
					}
					return;
				}

				if (!upToDate()) {
					check();
				}

				__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot apply update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log("warning", "[HMR] " + log.formatError(err));
					if (typeof window !== "undefined") {
						window.location.reload();
					}
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ (function(module) {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOMException: function() { return /* binding */ DOMException; },
/* harmony export */   Headers: function() { return /* binding */ Headers; },
/* harmony export */   Request: function() { return /* binding */ Request; },
/* harmony export */   Response: function() { return /* binding */ Response; },
/* harmony export */   fetch: function() { return /* binding */ fetch; }
/* harmony export */ });
var global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global)

var support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob:
    'FileReader' in global &&
    'Blob' in global &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name: "' + name + '"')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this)
        if (isConsumed) {
          return isConsumed
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function(header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    })
    .forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = options.statusText === undefined ? '' : '' + options.statusText
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = global.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      setTimeout(function() {
        resolve(new Response(body, options))
      }, 0)
    }

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'))
      }, 0)
    }

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob'
      } else if (
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer'
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
      })
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!global.fetch) {
  global.fetch = fetch
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
}


/***/ }),

/***/ "./src/custom/events.js":
/*!******************************!*\
  !*** ./src/custom/events.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autoEvents: function() { return /* binding */ autoEvents; },
/* harmony export */   windowEvents: function() { return /* binding */ windowEvents; }
/* harmony export */ });
/* harmony import */ var _message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message.js */ "./src/custom/message.js");




// 監聽窗口事件
let windowEvents = {
    copy: function (config, event) {
        event.preventDefault();
        event.stopPropagation();
        (0,_message_js__WEBPACK_IMPORTED_MODULE_0__.showMessage)(config.onCopy);
    }
}

// 自動觸發
let autoEvents = [];

/***/ }),

/***/ "./src/custom/init.js":
/*!****************************!*\
  !*** ./src/custom/init.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ config_global; }
/* harmony export */ });
/* harmony import */ var _tool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tool.js */ "./src/custom/tool.js");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events.js */ "./src/custom/events.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/custom/utils.js");
/* harmony import */ var _L2DApp_lappdefine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @L2DApp/lappdefine */ "./src/live2d/lapp/lappdefine.ts");
/* harmony import */ var _L2DApp_main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @L2DApp/main */ "./src/live2d/lapp/main.ts");









let config_global = null;

// settings在setup()中開始被引用，即作為window.onload觸發，故需要在頁面加載之前配置好settings
window.L2Dsettings = {
    configPath: '',
    resourcesPath: '',  // 指定資源文件（模型）保存的路徑
    backImageName: '', // 指定背景圖片
    modelDirs: [],
    canvasId: '',
    onChangeScene: (manager) => { },
    onModelLoaded: (model) => { }
};

function setup() {
    fetch(L2Dsettings.configPath)
        .then((response) => response.json())
        .then((cfg) => {
            config_global = cfg.global;
            setupL2D(cfg);
        });
}

function setupL2D(config) {
    (0,_L2DApp_lappdefine__WEBPACK_IMPORTED_MODULE_3__.initDefine)(
        L2Dsettings.resourcesPath, L2Dsettings.backImageName, L2Dsettings.modelDirs,
        L2Dsettings.canvasId, config.global.model.scale, config.global.model.translate); // 初始化模型
    (0,_L2DApp_lappdefine__WEBPACK_IMPORTED_MODULE_3__.setCallback)(L2Dsettings.onChangeScene, L2Dsettings.onModelLoaded);
    
    initL2DPanel(config);

    (0,_L2DApp_main__WEBPACK_IMPORTED_MODULE_4__.initLApp)(); // 初始化L2DAPP需要在canvas對象創建之後進行

    resetToolbar($('.live2d-tool'), _tool_js__WEBPACK_IMPORTED_MODULE_0__.tools, config);
    addEventsHandler(_events_js__WEBPACK_IMPORTED_MODULE_1__.windowEvents, _events_js__WEBPACK_IMPORTED_MODULE_1__.autoEvents, config);
}

function addEventsHandler(windowEvents, autoEvents, config) {
    for (let [event, callback] of Object.entries(windowEvents)) {
        $(window).on(event, (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.partial)(callback, config));
    }

    for (let event of autoEvents) {
        event(config);
    }
}

function initL2DPanel(config) {
    let height = config.global.canvas.height;
    $(`#${L2Dsettings.canvasId}`).attr({
        'height': `${height}`,
        'width': `${height * config.global.canvas.ratio}`,
        'margin-right': `${height * config.global.canvas.marginRight}`
    })[0].getContext("webgl", { preserveDrawingBuffer: true });

    // 若顯示設置bottom，jquery UI的拖拽會為保持其不變而改變元素自身的高度
    let panel_top = window.innerHeight - (config.global.canvas.bottom + config.global.canvas.height);
    $('.live2d-main').css('top', `${panel_top}px`);

    $(document.body).append(
        $('<span>').attr('id', 'waifu-toggle').text('看板娘'));
}

function resetToolbar(toolbar, tools_callback, config) {
    toolbar.empty();

    for (let [name, callback] of Object.entries(tools_callback)) {
        let tool_config = config.tool[name];
        if (tool_config === undefined) {
            console.warn(`tool ${name} load failed because of lacking config item`);
            continue;
        }

        let clickCallback = callback.click ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.partial)(callback.click, tool_config) : () => { };
        toolbar.append(
            $('<span>').attr('class', tool_config.icon)
                .unbind('click').click(clickCallback).hover(
                    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.partial)(_tool_js__WEBPACK_IMPORTED_MODULE_0__.toolOnHoverEnter, tool_config),
                    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.partial)(_tool_js__WEBPACK_IMPORTED_MODULE_0__.toolOnHoverLeave, tool_config)
                )
        );
    }

    // 設置拖拽效果
    if (tools_callback.drag && config.tool.drag) {
        let handle = $('.live2d-tool > .' + config.tool.drag.icon.split(' ').join('.'));
        $('.live2d-main').draggable({
            handle: handle,
            start: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.partial)(tools_callback.drag.dragStart, config.tool.drag),
            stop: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.partial)(tools_callback.drag.dragStop, config.tool.drag)
        });
    }

    // 配置CSS樣式
    let height = config.global.canvas.height;
    let lineHeight = config.global.toolbar.lineHeight, lineHeightPx;
    let topPx = height * config.global.toolbar.top;
    if (lineHeight) {
        lineHeightPx = height * lineHeight;
    }
    else {
        lineHeightPx = (height - topPx) / toolbar.children().length;
    }
    toolbar.css({
        'top': `${topPx}px`,
        'right': `${height * config.global.toolbar.right}px`,
        'font-size': `${height * config.global.toolbar.fontSize}px`})
        .children().css(
            'line-height', `${lineHeightPx}px`);
}

window.setupKanban = setup;

/***/ }),

/***/ "./src/custom/message.js":
/*!*******************************!*\
  !*** ./src/custom/message.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideMessage: function() { return /* binding */ hideMessage; },
/* harmony export */   showMessage: function() { return /* binding */ showMessage; }
/* harmony export */ });


function showMessage(text, overwrite = false, lasttime = 2000) {
    if(overwrite || sessionStorage.getItem('waifu-text') === '' || sessionStorage.getItem('waifu-text') === null){
        if(overwrite) sessionStorage.setItem('waifu-text', text);
        $('.live2d-tips').stop();
        $('.live2d-tips').html(text).fadeTo(200, 1);
        if (lasttime >= 0) {
            window.setTimeout(hideMessage, lasttime)
        }
    }
}

function hideMessage(){
    $('.live2d-tips').stop().css('opacity', 1);
    sessionStorage.removeItem('waifu-text');
    $('.live2d-tips').fadeTo(200, 0);
}


/***/ }),

/***/ "./src/custom/model.js":
/*!*****************************!*\
  !*** ./src/custom/model.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrL2DModel: function() { return /* binding */ getCurrL2DModel; }
/* harmony export */ });
/* harmony import */ var _L2DApp_lapplive2dmanager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @L2DApp/lapplive2dmanager */ "./src/live2d/lapp/lapplive2dmanager.ts");




function getCurrL2DModel() {
    return _L2DApp_lapplive2dmanager__WEBPACK_IMPORTED_MODULE_0__.LAppLive2DManager.getInstance()._models.at(0);
}

/***/ }),

/***/ "./src/custom/tool.js":
/*!****************************!*\
  !*** ./src/custom/tool.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toolOnHoverEnter: function() { return /* binding */ toolOnHoverEnter; },
/* harmony export */   toolOnHoverLeave: function() { return /* binding */ toolOnHoverLeave; },
/* harmony export */   tools: function() { return /* binding */ tools; }
/* harmony export */ });
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init.js */ "./src/custom/init.js");
/* harmony import */ var _message_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message.js */ "./src/custom/message.js");
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model.js */ "./src/custom/model.js");
/* harmony import */ var _L2DApp_lapplive2dmanager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @L2DApp/lapplive2dmanager */ "./src/live2d/lapp/lapplive2dmanager.ts");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./src/custom/utils.js");









let tools = {
    randomMsg: {
        click: function (config, event) {
            let message = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.randomChoose)(config.message);
            (0,_message_js__WEBPACK_IMPORTED_MODULE_1__.showMessage)(message.text, true);

            let model = (0,_model_js__WEBPACK_IMPORTED_MODULE_2__.getCurrL2DModel)();
            if (message.exp !== undefined) model.setExpression(message.exp);
            if (message.mtn !== undefined) model.startMotion(message.mtn, 0, 2);
        }
    },
    randomExp: {
        click: function (config, event) {
            (0,_model_js__WEBPACK_IMPORTED_MODULE_2__.getCurrL2DModel)().setRandomExpression();
        }
    },
    changeModel: {
        click: function (config, event) {
            _L2DApp_lapplive2dmanager__WEBPACK_IMPORTED_MODULE_3__.LAppLive2DManager.getInstance().nextScene();
        }
    },
    drag: {
        dragStart: function (config, event) { $('.ui-draggable-handle').removeClass(config.icon).addClass(config.dragging_icon); },
        dragStop: function (config, event) { $('.ui-draggable-handle').removeClass(config.dragging_icon).addClass(config.icon); }
    },
    savePic: {
        click: function (config, event) {
            let canvas = $('canvas#live2d')[0];
            Canvas2Image.saveAsPNG(canvas, canvas.width, canvas.height, config.fileName);
        }
    },
    about: {
        click: function (config, event) {
            open(config.url);
        }
    },
    close: {
        click: function (config, event) {
            (0,_message_js__WEBPACK_IMPORTED_MODULE_1__.showMessage)(config.message, true, config.msgTime);
            let l2d_panel = $('.live2d-main');
            let yDown = window.innerHeight - (l2d_panel.offset().top - document.documentElement.scrollTop);
            l2d_panel.animate(
                { 'top': `+=${yDown}px` },
                config.closeTime,
                () => {
                    $('#waifu-toggle').addClass('waifu-toggle-active')
                        .unbind('click').click(function () {
                            let yUp = l2d_panel.height() + _init_js__WEBPACK_IMPORTED_MODULE_0__["default"].canvas.bottom;
                            l2d_panel.css('left', `${_init_js__WEBPACK_IMPORTED_MODULE_0__["default"].canvas.left}px`);
                            l2d_panel.animate({ 'top': `-=${yUp}px` }, config.closeTime);
                            $(this).removeClass('waifu-toggle-active');
                        });
                });
        }
    }
}

function toolOnHoverEnter(config, event) {
    let msg = config.hover;
    if (msg) {
        (0,_message_js__WEBPACK_IMPORTED_MODULE_1__.showMessage)(msg, false, -1);
    }
}

function toolOnHoverLeave(config, event) {
    if (config.hover) {
        (0,_message_js__WEBPACK_IMPORTED_MODULE_1__.hideMessage)();
    }
}


/***/ }),

/***/ "./src/custom/utils.js":
/*!*****************************!*\
  !*** ./src/custom/utils.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   partial: function() { return /* binding */ partial; },
/* harmony export */   randomChoose: function() { return /* binding */ randomChoose; }
/* harmony export */ });


function randomChoose(array) {
    let random_i = Math.floor(Math.random() * array.length + 1) - 1;
    return array[random_i];
}

function partial(func) {
    let args = Array.prototype.slice.call(arguments, 1);
    return function () {
        let allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	!function() {
/******/ 		__webpack_require__.hmrF = function() { return "main." + __webpack_require__.h() + ".hot-update.json"; };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "aef19915409b3b22f689"; }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		// data-webpack is not used as build has no uniqueName
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	!function() {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise(function(resolve, reject) {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = function(event) {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdate"] = function(chunkId, moreModules, runtime) {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then(function(response) {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=5000&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/custom/init.js");
/******/ 	
/******/ })()
;