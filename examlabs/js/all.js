"use strict";

if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;

    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };

    var toInteger = function toInteger(value) {
      var number = Number(value);

      if (isNaN(number)) {
        return 0;
      }

      if (number === 0 || !isFinite(number)) {
        return number;
      }

      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };

    var maxSafeInteger = Math.pow(2, 53) - 1;

    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    }; // Свойство length метода from равно 1.


    return function from(arrayLike
    /*, mapFn, thisArg */
    ) {
      // 1. Положим C равным значению this.
      var C = this; // 2. Положим items равным ToObject(arrayLike).

      var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      } // 4. Если mapfn равен undefined, положим mapping равным false.


      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;

      if (typeof mapFn !== 'undefined') {
        // 5. иначе
        // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        } // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.


        if (arguments.length > 2) {
          T = arguments[2];
        }
      } // 10. Положим lenValue равным Get(items, "length").
      // 11. Положим len равным ToLength(lenValue).


      var len = toLength(items.length); // 13. Если IsConstructor(C) равен true, то
      // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
      //     объекта C со списком аргументов, содержащим единственный элемент len.
      // 14. a. Иначе, положим A равным ArrayCreate(len).

      var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Положим k равным 0.

      var k = 0; // 17. Пока k < len, будем повторять... (шаги с a по h)

      var kValue;

      while (k < len) {
        kValue = items[k];

        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k += 1;
      } // 18. Положим putStatus равным Put(A, "length", len, true).


      A.length = len; // 20. Вернём A.

      return A;
    };
  }();
}
"use strict";

(function (ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;

  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
    if (!this) return null;
    if (this.matches(selector)) return this;

    if (!this.parentElement) {
      return null;
    } else return this.parentElement.closest(selector);
  };
})(Element.prototype);
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */

/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
(function (window) {
  /*jshint eqnull:true */
  var ua = navigator.userAgent;

  if (window.HTMLPictureElement && /ecko/.test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 45) {
    addEventListener("resize", function () {
      var timer;
      var dummySrc = document.createElement("source");

      var fixRespimg = function fixRespimg(img) {
        var source, sizes;
        var picture = img.parentNode;

        if (picture.nodeName.toUpperCase() === "PICTURE") {
          source = dummySrc.cloneNode();
          picture.insertBefore(source, picture.firstElementChild);
          setTimeout(function () {
            picture.removeChild(source);
          });
        } else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
          img._pfLastSize = img.offsetWidth;
          sizes = img.sizes;
          img.sizes += ",100vw";
          setTimeout(function () {
            img.sizes = sizes;
          });
        }
      };

      var findPictureImgs = function findPictureImgs() {
        var i;
        var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");

        for (i = 0; i < imgs.length; i++) {
          fixRespimg(imgs[i]);
        }
      };

      var onResize = function onResize() {
        clearTimeout(timer);
        timer = setTimeout(findPictureImgs, 99);
      };

      var mq = window.matchMedia && matchMedia("(orientation: landscape)");

      var init = function init() {
        onResize();

        if (mq && mq.addListener) {
          mq.addListener(onResize);
        }
      };

      dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

      if (/^[c|i]|d$/.test(document.readyState || "")) {
        init();
      } else {
        document.addEventListener("DOMContentLoaded", init);
      }

      return onResize;
    }());
  }
})(window);
/*! Picturefill - v3.0.2
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
 *  License: MIT
 */


(function (window, document, undefined) {
  // Enable strict mode
  "use strict"; // HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)

  document.createElement("picture");
  var warn, eminpx, alwaysCheckWDescriptor, evalId; // local object for method references and testing exposure

  var pf = {};
  var isSupportTestReady = false;

  var noop = function noop() {};

  var image = document.createElement("img");
  var getImgAttr = image.getAttribute;
  var setImgAttr = image.setAttribute;
  var removeImgAttr = image.removeAttribute;
  var docElem = document.documentElement;
  var types = {};
  var cfg = {
    //resource selection:
    algorithm: ""
  };
  var srcAttr = "data-pfsrc";
  var srcsetAttr = srcAttr + "set"; // ua sniffing is done for undetectable img loading features,
  // to do some non crucial perf optimizations

  var ua = navigator.userAgent;
  var supportAbort = /rident/.test(ua) || /ecko/.test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35;
  var curSrcProp = "currentSrc";
  var regWDesc = /\s+\+?\d+(e\d+)?w/;
  var regSize = /(\([^)]+\))?\s*(.+)/;
  var setOptions = window.picturefillCFG;
  /**
   * Shortcut property for https://w3c.github.io/webappsec/specs/mixedcontent/#restricts-mixed-content ( for easy overriding in tests )
   */
  // baseStyle also used by getEmValue (i.e.: width: 1em is important)

  var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
  var fsCss = "font-size:100%!important;";
  var isVwDirty = true;
  var cssCache = {};
  var sizeLengthCache = {};
  var DPR = window.devicePixelRatio;
  var units = {
    px: 1,
    "in": 96
  };
  var anchor = document.createElement("a");
  /**
   * alreadyRun flag used for setOptions. is it true setOptions will reevaluate
   * @type {boolean}
   */

  var alreadyRun = false; // Reusable, non-"g" Regexes
  // (Don't use \s, to avoid matching non-breaking space.)

  var regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
      regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
      regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
      regexTrailingCommas = /[,]+$/,
      regexNonNegativeInteger = /^\d+$/,
      // ( Positive or negative or unsigned integers or decimals, without or without exponents.
  // Must include at least one digit.
  // According to spec tests any decimal point must be followed by a digit.
  // No leading plus sign is allowed.)
  // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
  regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;

  var on = function on(obj, evt, fn, capture) {
    if (obj.addEventListener) {
      obj.addEventListener(evt, fn, capture || false);
    } else if (obj.attachEvent) {
      obj.attachEvent("on" + evt, fn);
    }
  };
  /**
   * simple memoize function:
   */


  var memoize = function memoize(fn) {
    var cache = {};
    return function (input) {
      if (!(input in cache)) {
        cache[input] = fn(input);
      }

      return cache[input];
    };
  }; // UTILITY FUNCTIONS
  // Manual is faster than RegEx
  // http://jsperf.com/whitespace-character/5


  function isSpace(c) {
    return c === " " || // space
    c === "\t" || // horizontal tab
    c === "\n" || // new line
    c === "\f" || // form feed
    c === "\r"; // carriage return
  }
  /**
   * gets a mediaquery and returns a boolean or gets a css length and returns a number
   * @param css mediaqueries or css length
   * @returns {boolean|number}
   *
   * based on: https://gist.github.com/jonathantneal/db4f77009b155f083738
   */


  var evalCSS = function () {
    var regLength = /^([\d\.]+)(em|vw|px)$/;

    var replace = function replace() {
      var args = arguments,
          index = 0,
          string = args[0];

      while (++index in args) {
        string = string.replace(args[index], args[++index]);
      }

      return string;
    };

    var buildStr = memoize(function (css) {
      return "return " + replace((css || "").toLowerCase(), // interpret `and`
      /\band\b/g, "&&", // interpret `,`
      /,/g, "||", // interpret `min-` as >=
      /min-([a-z-\s]+):/g, "e.$1>=", // interpret `max-` as <=
      /max-([a-z-\s]+):/g, "e.$1<=", //calc value
      /calc([^)]+)/g, "($1)", // interpret css values
      /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", //make eval less evil
      /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, "") + ";";
    });
    return function (css, length) {
      var parsedLength;

      if (!(css in cssCache)) {
        cssCache[css] = false;

        if (length && (parsedLength = css.match(regLength))) {
          cssCache[css] = parsedLength[1] * units[parsedLength[2]];
        } else {
          /*jshint evil:true */
          try {
            cssCache[css] = new Function("e", buildStr(css))(units);
          } catch (e) {}
          /*jshint evil:false */

        }
      }

      return cssCache[css];
    };
  }();

  var setResolution = function setResolution(candidate, sizesattr) {
    if (candidate.w) {
      // h = means height: || descriptor.type === 'h' do not handle yet...
      candidate.cWidth = pf.calcListLength(sizesattr || "100vw");
      candidate.res = candidate.w / candidate.cWidth;
    } else {
      candidate.res = candidate.d;
    }

    return candidate;
  };
  /**
   *
   * @param opt
   */


  var picturefill = function picturefill(opt) {
    if (!isSupportTestReady) {
      return;
    }

    var elements, i, plen;
    var options = opt || {};

    if (options.elements && options.elements.nodeType === 1) {
      if (options.elements.nodeName.toUpperCase() === "IMG") {
        options.elements = [options.elements];
      } else {
        options.context = options.elements;
        options.elements = null;
      }
    }

    elements = options.elements || pf.qsa(options.context || document, options.reevaluate || options.reselect ? pf.sel : pf.selShort);

    if (plen = elements.length) {
      pf.setupRun(options);
      alreadyRun = true; // Loop through all elements

      for (i = 0; i < plen; i++) {
        pf.fillImg(elements[i], options);
      }

      pf.teardownRun(options);
    }
  };
  /**
   * outputs a warning for the developer
   * @param {message}
   * @type {Function}
   */


  warn = window.console && console.warn ? function (message) {
    console.warn(message);
  } : noop;

  if (!(curSrcProp in image)) {
    curSrcProp = "src";
  } // Add support for standard mime types.


  types["image/jpeg"] = true;
  types["image/gif"] = true;
  types["image/png"] = true;

  function detectTypeSupport(type, typeUri) {
    // based on Modernizr's lossless img-webp test
    // note: asynchronous
    var image = new window.Image();

    image.onerror = function () {
      types[type] = false;
      picturefill();
    };

    image.onload = function () {
      types[type] = image.width === 1;
      picturefill();
    };

    image.src = typeUri;
    return "pending";
  } // test svg support


  types["image/svg+xml"] = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
  /**
   * updates the internal vW property with the current viewport width in px
   */

  function updateMetrics() {
    isVwDirty = false;
    DPR = window.devicePixelRatio;
    cssCache = {};
    sizeLengthCache = {};
    pf.DPR = DPR || 1;
    units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
    units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);
    units.vw = units.width / 100;
    units.vh = units.height / 100;
    evalId = [units.height, units.width, DPR].join("-");
    units.em = pf.getEmValue();
    units.rem = units.em;
  }

  function chooseLowRes(lowerValue, higherValue, dprValue, isCached) {
    var bonusFactor, tooMuch, bonus, meanDensity; //experimental

    if (cfg.algorithm === "saveData") {
      if (lowerValue > 2.7) {
        meanDensity = dprValue + 1;
      } else {
        tooMuch = higherValue - dprValue;
        bonusFactor = Math.pow(lowerValue - 0.6, 1.5);
        bonus = tooMuch * bonusFactor;

        if (isCached) {
          bonus += 0.1 * bonusFactor;
        }

        meanDensity = lowerValue + bonus;
      }
    } else {
      meanDensity = dprValue > 1 ? Math.sqrt(lowerValue * higherValue) : lowerValue;
    }

    return meanDensity > dprValue;
  }

  function applyBestCandidate(img) {
    var srcSetCandidates;
    var matchingSet = pf.getSet(img);
    var evaluated = false;

    if (matchingSet !== "pending") {
      evaluated = evalId;

      if (matchingSet) {
        srcSetCandidates = pf.setRes(matchingSet);
        pf.applySetCandidate(srcSetCandidates, img);
      }
    }

    img[pf.ns].evaled = evaluated;
  }

  function ascendingSort(a, b) {
    return a.res - b.res;
  }

  function setSrcToCur(img, src, set) {
    var candidate;

    if (!set && src) {
      set = img[pf.ns].sets;
      set = set && set[set.length - 1];
    }

    candidate = getCandidateForSrc(src, set);

    if (candidate) {
      src = pf.makeUrl(src);
      img[pf.ns].curSrc = src;
      img[pf.ns].curCan = candidate;

      if (!candidate.res) {
        setResolution(candidate, candidate.set.sizes);
      }
    }

    return candidate;
  }

  function getCandidateForSrc(src, set) {
    var i, candidate, candidates;

    if (src && set) {
      candidates = pf.parseSet(set);
      src = pf.makeUrl(src);

      for (i = 0; i < candidates.length; i++) {
        if (src === pf.makeUrl(candidates[i].url)) {
          candidate = candidates[i];
          break;
        }
      }
    }

    return candidate;
  }

  function getAllSourceElements(picture, candidates) {
    var i, len, source, srcset; // SPEC mismatch intended for size and perf:
    // actually only source elements preceding the img should be used
    // also note: don't use qsa here, because IE8 sometimes doesn't like source as the key part in a selector

    var sources = picture.getElementsByTagName("source");

    for (i = 0, len = sources.length; i < len; i++) {
      source = sources[i];
      source[pf.ns] = true;
      srcset = source.getAttribute("srcset"); // if source does not have a srcset attribute, skip

      if (srcset) {
        candidates.push({
          srcset: srcset,
          media: source.getAttribute("media"),
          type: source.getAttribute("type"),
          sizes: source.getAttribute("sizes")
        });
      }
    }
  }
  /**
   * Srcset Parser
   * By Alex Bell |  MIT License
   *
   * @returns Array [{url: _, d: _, w: _, h:_, set:_(????)}, ...]
   *
   * Based super duper closely on the reference algorithm at:
   * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
   */
  // 1. Let input be the value passed to this algorithm.
  // (TO-DO : Explain what "set" argument is here. Maybe choose a more
  // descriptive & more searchable name.  Since passing the "set" in really has
  // nothing to do with parsing proper, I would prefer this assignment eventually
  // go in an external fn.)


  function parseSrcset(input, set) {
    function collectCharacters(regEx) {
      var chars,
          match = regEx.exec(input.substring(pos));

      if (match) {
        chars = match[0];
        pos += chars.length;
        return chars;
      }
    }

    var inputLength = input.length,
        url,
        descriptors,
        currentDescriptor,
        state,
        c,
        // 2. Let position be a pointer into input, initially pointing at the start
    //    of the string.
    pos = 0,
        // 3. Let candidates be an initially empty source set.
    candidates = [];
    /**
    * Adds descriptor properties to a candidate, pushes to the candidates array
    * @return undefined
    */
    // (Declared outside of the while loop so that it's only created once.
    // (This fn is defined before it is used, in order to pass JSHINT.
    // Unfortunately this breaks the sequencing of the spec comments. :/ )

    function parseDescriptors() {
      // 9. Descriptor parser: Let error be no.
      var pError = false,
          // 10. Let width be absent.
      // 11. Let density be absent.
      // 12. Let future-compat-h be absent. (We're implementing it now as h)
      w,
          d,
          h,
          i,
          candidate = {},
          desc,
          lastChar,
          value,
          intVal,
          floatVal; // 13. For each descriptor in descriptors, run the appropriate set of steps
      // from the following list:

      for (i = 0; i < descriptors.length; i++) {
        desc = descriptors[i];
        lastChar = desc[desc.length - 1];
        value = desc.substring(0, desc.length - 1);
        intVal = parseInt(value, 10);
        floatVal = parseFloat(value); // If the descriptor consists of a valid non-negative integer followed by
        // a U+0077 LATIN SMALL LETTER W character

        if (regexNonNegativeInteger.test(value) && lastChar === "w") {
          // If width and density are not both absent, then let error be yes.
          if (w || d) {
            pError = true;
          } // Apply the rules for parsing non-negative integers to the descriptor.
          // If the result is zero, let error be yes.
          // Otherwise, let width be the result.


          if (intVal === 0) {
            pError = true;
          } else {
            w = intVal;
          } // If the descriptor consists of a valid floating-point number followed by
          // a U+0078 LATIN SMALL LETTER X character

        } else if (regexFloatingPoint.test(value) && lastChar === "x") {
          // If width, density and future-compat-h are not all absent, then let error
          // be yes.
          if (w || d || h) {
            pError = true;
          } // Apply the rules for parsing floating-point number values to the descriptor.
          // If the result is less than zero, let error be yes. Otherwise, let density
          // be the result.


          if (floatVal < 0) {
            pError = true;
          } else {
            d = floatVal;
          } // If the descriptor consists of a valid non-negative integer followed by
          // a U+0068 LATIN SMALL LETTER H character

        } else if (regexNonNegativeInteger.test(value) && lastChar === "h") {
          // If height and density are not both absent, then let error be yes.
          if (h || d) {
            pError = true;
          } // Apply the rules for parsing non-negative integers to the descriptor.
          // If the result is zero, let error be yes. Otherwise, let future-compat-h
          // be the result.


          if (intVal === 0) {
            pError = true;
          } else {
            h = intVal;
          } // Anything else, Let error be yes.

        } else {
          pError = true;
        }
      } // (close step 13 for loop)
      // 15. If error is still no, then append a new image source to candidates whose
      // URL is url, associated with a width width if not absent and a pixel
      // density density if not absent. Otherwise, there is a parse error.


      if (!pError) {
        candidate.url = url;

        if (w) {
          candidate.w = w;
        }

        if (d) {
          candidate.d = d;
        }

        if (h) {
          candidate.h = h;
        }

        if (!h && !d && !w) {
          candidate.d = 1;
        }

        if (candidate.d === 1) {
          set.has1x = true;
        }

        candidate.set = set;
        candidates.push(candidate);
      }
    } // (close parseDescriptors fn)

    /**
    * Tokenizes descriptor properties prior to parsing
    * Returns undefined.
    * (Again, this fn is defined before it is used, in order to pass JSHINT.
    * Unfortunately this breaks the logical sequencing of the spec comments. :/ )
    */


    function tokenize() {
      // 8.1. Descriptor tokeniser: Skip whitespace
      collectCharacters(regexLeadingSpaces); // 8.2. Let current descriptor be the empty string.

      currentDescriptor = ""; // 8.3. Let state be in descriptor.

      state = "in descriptor";

      while (true) {
        // 8.4. Let c be the character at position.
        c = input.charAt(pos); //  Do the following depending on the value of state.
        //  For the purpose of this step, "EOF" is a special character representing
        //  that position is past the end of input.
        // In descriptor

        if (state === "in descriptor") {
          // Do the following, depending on the value of c:
          // Space character
          // If current descriptor is not empty, append current descriptor to
          // descriptors and let current descriptor be the empty string.
          // Set state to after descriptor.
          if (isSpace(c)) {
            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
              currentDescriptor = "";
              state = "after descriptor";
            } // U+002C COMMA (,)
            // Advance position to the next character in input. If current descriptor
            // is not empty, append current descriptor to descriptors. Jump to the step
            // labeled descriptor parser.

          } else if (c === ",") {
            pos += 1;

            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
            }

            parseDescriptors();
            return; // U+0028 LEFT PARENTHESIS (()
            // Append c to current descriptor. Set state to in parens.
          } else if (c === "(") {
            currentDescriptor = currentDescriptor + c;
            state = "in parens"; // EOF
            // If current descriptor is not empty, append current descriptor to
            // descriptors. Jump to the step labeled descriptor parser.
          } else if (c === "") {
            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
            }

            parseDescriptors();
            return; // Anything else
            // Append c to current descriptor.
          } else {
            currentDescriptor = currentDescriptor + c;
          } // (end "in descriptor"
          // In parens

        } else if (state === "in parens") {
          // U+0029 RIGHT PARENTHESIS ())
          // Append c to current descriptor. Set state to in descriptor.
          if (c === ")") {
            currentDescriptor = currentDescriptor + c;
            state = "in descriptor"; // EOF
            // Append current descriptor to descriptors. Jump to the step labeled
            // descriptor parser.
          } else if (c === "") {
            descriptors.push(currentDescriptor);
            parseDescriptors();
            return; // Anything else
            // Append c to current descriptor.
          } else {
            currentDescriptor = currentDescriptor + c;
          } // After descriptor

        } else if (state === "after descriptor") {
          // Do the following, depending on the value of c:
          // Space character: Stay in this state.
          if (isSpace(c)) {// EOF: Jump to the step labeled descriptor parser.
          } else if (c === "") {
            parseDescriptors();
            return; // Anything else
            // Set state to in descriptor. Set position to the previous character in input.
          } else {
            state = "in descriptor";
            pos -= 1;
          }
        } // Advance position to the next character in input.


        pos += 1; // Repeat this step.
      } // (close while true loop)

    } // 4. Splitting loop: Collect a sequence of characters that are space
    //    characters or U+002C COMMA characters. If any U+002C COMMA characters
    //    were collected, that is a parse error.


    while (true) {
      collectCharacters(regexLeadingCommasOrSpaces); // 5. If position is past the end of input, return candidates and abort these steps.

      if (pos >= inputLength) {
        return candidates; // (we're done, this is the sole return path)
      } // 6. Collect a sequence of characters that are not space characters,
      //    and let that be url.


      url = collectCharacters(regexLeadingNotSpaces); // 7. Let descriptors be a new empty list.

      descriptors = []; // 8. If url ends with a U+002C COMMA character (,), follow these substeps:
      //		(1). Remove all trailing U+002C COMMA characters from url. If this removed
      //         more than one character, that is a parse error.

      if (url.slice(-1) === ",") {
        url = url.replace(regexTrailingCommas, ""); // (Jump ahead to step 9 to skip tokenization and just push the candidate).

        parseDescriptors(); //	Otherwise, follow these substeps:
      } else {
        tokenize();
      } // (close else of step 8)
      // 16. Return to the step labeled splitting loop.

    } // (Close of big while loop.)

  }
  /*
   * Sizes Parser
   *
   * By Alex Bell |  MIT License
   *
   * Non-strict but accurate and lightweight JS Parser for the string value <img sizes="here">
   *
   * Reference algorithm at:
   * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-sizes-attribute
   *
   * Most comments are copied in directly from the spec
   * (except for comments in parens).
   *
   * Grammar is:
   * <source-size-list> = <source-size># [ , <source-size-value> ]? | <source-size-value>
   * <source-size> = <media-condition> <source-size-value>
   * <source-size-value> = <length>
   * http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-sizes
   *
   * E.g. "(max-width: 30em) 100vw, (max-width: 50em) 70vw, 100vw"
   * or "(min-width: 30em), calc(30vw - 15px)" or just "30vw"
   *
   * Returns the first valid <css-length> with a media condition that evaluates to true,
   * or "100vw" if all valid media conditions evaluate to false.
   *
   */


  function parseSizes(strValue) {
    // (Percentage CSS lengths are not allowed in this case, to avoid confusion:
    // https://html.spec.whatwg.org/multipage/embedded-content.html#valid-source-size-list
    // CSS allows a single optional plus or minus sign:
    // http://www.w3.org/TR/CSS2/syndata.html#numbers
    // CSS is ASCII case-insensitive:
    // http://www.w3.org/TR/CSS2/syndata.html#characters )
    // Spec allows exponential notation for <number> type:
    // http://dev.w3.org/csswg/css-values/#numbers
    var regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i; // (This is a quick and lenient test. Because of optional unlimited-depth internal
    // grouping parens and strict spacing rules, this could get very complicated.)

    var regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
    var i;
    var unparsedSizesList;
    var unparsedSizesListLength;
    var unparsedSize;
    var lastComponentValue;
    var size; // UTILITY FUNCTIONS
    //  (Toy CSS parser. The goals here are:
    //  1) expansive test coverage without the weight of a full CSS parser.
    //  2) Avoiding regex wherever convenient.
    //  Quick tests: http://jsfiddle.net/gtntL4gr/3/
    //  Returns an array of arrays.)

    function parseComponentValues(str) {
      var chrctr;
      var component = "";
      var componentArray = [];
      var listArray = [];
      var parenDepth = 0;
      var pos = 0;
      var inComment = false;

      function pushComponent() {
        if (component) {
          componentArray.push(component);
          component = "";
        }
      }

      function pushComponentArray() {
        if (componentArray[0]) {
          listArray.push(componentArray);
          componentArray = [];
        }
      } // (Loop forwards from the beginning of the string.)


      while (true) {
        chrctr = str.charAt(pos);

        if (chrctr === "") {
          // ( End of string reached.)
          pushComponent();
          pushComponentArray();
          return listArray;
        } else if (inComment) {
          if (chrctr === "*" && str[pos + 1] === "/") {
            // (At end of a comment.)
            inComment = false;
            pos += 2;
            pushComponent();
            continue;
          } else {
            pos += 1; // (Skip all characters inside comments.)

            continue;
          }
        } else if (isSpace(chrctr)) {
          // (If previous character in loop was also a space, or if
          // at the beginning of the string, do not add space char to
          // component.)
          if (str.charAt(pos - 1) && isSpace(str.charAt(pos - 1)) || !component) {
            pos += 1;
            continue;
          } else if (parenDepth === 0) {
            pushComponent();
            pos += 1;
            continue;
          } else {
            // (Replace any space character with a plain space for legibility.)
            chrctr = " ";
          }
        } else if (chrctr === "(") {
          parenDepth += 1;
        } else if (chrctr === ")") {
          parenDepth -= 1;
        } else if (chrctr === ",") {
          pushComponent();
          pushComponentArray();
          pos += 1;
          continue;
        } else if (chrctr === "/" && str.charAt(pos + 1) === "*") {
          inComment = true;
          pos += 2;
          continue;
        }

        component = component + chrctr;
        pos += 1;
      }
    }

    function isValidNonNegativeSourceSizeValue(s) {
      if (regexCssLengthWithUnits.test(s) && parseFloat(s) >= 0) {
        return true;
      }

      if (regexCssCalc.test(s)) {
        return true;
      } // ( http://www.w3.org/TR/CSS2/syndata.html#numbers says:
      // "-0 is equivalent to 0 and is not a negative number." which means that
      // unitless zero and unitless negative zero must be accepted as special cases.)


      if (s === "0" || s === "-0" || s === "+0") {
        return true;
      }

      return false;
    } // When asked to parse a sizes attribute from an element, parse a
    // comma-separated list of component values from the value of the element's
    // sizes attribute (or the empty string, if the attribute is absent), and let
    // unparsed sizes list be the result.
    // http://dev.w3.org/csswg/css-syntax/#parse-comma-separated-list-of-component-values


    unparsedSizesList = parseComponentValues(strValue);
    unparsedSizesListLength = unparsedSizesList.length; // For each unparsed size in unparsed sizes list:

    for (i = 0; i < unparsedSizesListLength; i++) {
      unparsedSize = unparsedSizesList[i]; // 1. Remove all consecutive <whitespace-token>s from the end of unparsed size.
      // ( parseComponentValues() already omits spaces outside of parens. )
      // If unparsed size is now empty, that is a parse error; continue to the next
      // iteration of this algorithm.
      // ( parseComponentValues() won't push an empty array. )
      // 2. If the last component value in unparsed size is a valid non-negative
      // <source-size-value>, let size be its value and remove the component value
      // from unparsed size. Any CSS function other than the calc() function is
      // invalid. Otherwise, there is a parse error; continue to the next iteration
      // of this algorithm.
      // http://dev.w3.org/csswg/css-syntax/#parse-component-value

      lastComponentValue = unparsedSize[unparsedSize.length - 1];

      if (isValidNonNegativeSourceSizeValue(lastComponentValue)) {
        size = lastComponentValue;
        unparsedSize.pop();
      } else {
        continue;
      } // 3. Remove all consecutive <whitespace-token>s from the end of unparsed
      // size. If unparsed size is now empty, return size and exit this algorithm.
      // If this was not the last item in unparsed sizes list, that is a parse error.


      if (unparsedSize.length === 0) {
        return size;
      } // 4. Parse the remaining component values in unparsed size as a
      // <media-condition>. If it does not parse correctly, or it does parse
      // correctly but the <media-condition> evaluates to false, continue to the
      // next iteration of this algorithm.
      // (Parsing all possible compound media conditions in JS is heavy, complicated,
      // and the payoff is unclear. Is there ever an situation where the
      // media condition parses incorrectly but still somehow evaluates to true?
      // Can we just rely on the browser/polyfill to do it?)


      unparsedSize = unparsedSize.join(" ");

      if (!pf.matchesMedia(unparsedSize)) {
        continue;
      } // 5. Return size and exit this algorithm.


      return size;
    } // If the above algorithm exhausts unparsed sizes list without returning a
    // size value, return 100vw.


    return "100vw";
  } // namespace


  pf.ns = ("pf" + new Date().getTime()).substr(0, 9); // srcset support test

  pf.supSrcset = "srcset" in image;
  pf.supSizes = "sizes" in image;
  pf.supPicture = !!window.HTMLPictureElement; // UC browser does claim to support srcset and picture, but not sizes,
  // this extended test reveals the browser does support nothing

  if (pf.supSrcset && pf.supPicture && !pf.supSizes) {
    (function (image2) {
      image.srcset = "data:,a";
      image2.src = "data:,a";
      pf.supSrcset = image.complete === image2.complete;
      pf.supPicture = pf.supSrcset && pf.supPicture;
    })(document.createElement("img"));
  } // Safari9 has basic support for sizes, but does't expose the `sizes` idl attribute


  if (pf.supSrcset && !pf.supSizes) {
    (function () {
      var width2 = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==";
      var width1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      var img = document.createElement("img");

      var test = function test() {
        var width = img.width;

        if (width === 2) {
          pf.supSizes = true;
        }

        alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;
        isSupportTestReady = true; // force async

        setTimeout(picturefill);
      };

      img.onload = test;
      img.onerror = test;
      img.setAttribute("sizes", "9px");
      img.srcset = width1 + " 1w," + width2 + " 9w";
      img.src = width1;
    })();
  } else {
    isSupportTestReady = true;
  } // using pf.qsa instead of dom traversing does scale much better,
  // especially on sites mixing responsive and non-responsive images


  pf.selShort = "picture>img,img[srcset]";
  pf.sel = pf.selShort;
  pf.cfg = cfg;
  /**
   * Shortcut property for `devicePixelRatio` ( for easy overriding in tests )
   */

  pf.DPR = DPR || 1;
  pf.u = units; // container of supported mime types that one might need to qualify before using

  pf.types = types;
  pf.setSize = noop;
  /**
   * Gets a string and returns the absolute URL
   * @param src
   * @returns {String} absolute URL
   */

  pf.makeUrl = memoize(function (src) {
    anchor.href = src;
    return anchor.href;
  });
  /**
   * Gets a DOM element or document and a selctor and returns the found matches
   * Can be extended with jQuery/Sizzle for IE7 support
   * @param context
   * @param sel
   * @returns {NodeList|Array}
   */

  pf.qsa = function (context, sel) {
    return "querySelector" in context ? context.querySelectorAll(sel) : [];
  };
  /**
   * Shortcut method for matchMedia ( for easy overriding in tests )
   * wether native or pf.mMQ is used will be decided lazy on first call
   * @returns {boolean}
   */


  pf.matchesMedia = function () {
    if (window.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches) {
      pf.matchesMedia = function (media) {
        return !media || matchMedia(media).matches;
      };
    } else {
      pf.matchesMedia = pf.mMQ;
    }

    return pf.matchesMedia.apply(this, arguments);
  };
  /**
   * A simplified matchMedia implementation for IE8 and IE9
   * handles only min-width/max-width with px or em values
   * @param media
   * @returns {boolean}
   */


  pf.mMQ = function (media) {
    return media ? evalCSS(media) : true;
  };
  /**
   * Returns the calculated length in css pixel from the given sourceSizeValue
   * http://dev.w3.org/csswg/css-values-3/#length-value
   * intended Spec mismatches:
   * * Does not check for invalid use of CSS functions
   * * Does handle a computed length of 0 the same as a negative and therefore invalid value
   * @param sourceSizeValue
   * @returns {Number}
   */


  pf.calcLength = function (sourceSizeValue) {
    var value = evalCSS(sourceSizeValue, true) || false;

    if (value < 0) {
      value = false;
    }

    return value;
  };
  /**
   * Takes a type string and checks if its supported
   */


  pf.supportsType = function (type) {
    return type ? types[type] : true;
  };
  /**
   * Parses a sourceSize into mediaCondition (media) and sourceSizeValue (length)
   * @param sourceSizeStr
   * @returns {*}
   */


  pf.parseSize = memoize(function (sourceSizeStr) {
    var match = (sourceSizeStr || "").match(regSize);
    return {
      media: match && match[1],
      length: match && match[2]
    };
  });

  pf.parseSet = function (set) {
    if (!set.cands) {
      set.cands = parseSrcset(set.srcset, set);
    }

    return set.cands;
  };
  /**
   * returns 1em in css px for html/body default size
   * function taken from respondjs
   * @returns {*|number}
   */


  pf.getEmValue = function () {
    var body;

    if (!eminpx && (body = document.body)) {
      var div = document.createElement("div"),
          originalHTMLCSS = docElem.style.cssText,
          originalBodyCSS = body.style.cssText;
      div.style.cssText = baseStyle; // 1em in a media query is the value of the default font size of the browser
      // reset docElem and body to ensure the correct value is returned

      docElem.style.cssText = fsCss;
      body.style.cssText = fsCss;
      body.appendChild(div);
      eminpx = div.offsetWidth;
      body.removeChild(div); //also update eminpx before returning

      eminpx = parseFloat(eminpx, 10); // restore the original values

      docElem.style.cssText = originalHTMLCSS;
      body.style.cssText = originalBodyCSS;
    }

    return eminpx || 16;
  };
  /**
   * Takes a string of sizes and returns the width in pixels as a number
   */


  pf.calcListLength = function (sourceSizeListStr) {
    // Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%
    //
    //                           or (min-width:30em) calc(30% - 15px)
    if (!(sourceSizeListStr in sizeLengthCache) || cfg.uT) {
      var winningLength = pf.calcLength(parseSizes(sourceSizeListStr));
      sizeLengthCache[sourceSizeListStr] = !winningLength ? units.width : winningLength;
    }

    return sizeLengthCache[sourceSizeListStr];
  };
  /**
   * Takes a candidate object with a srcset property in the form of url/
   * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
   *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
   *     "images/pic-small.png"
   * Get an array of image candidates in the form of
   *      {url: "/foo/bar.png", resolution: 1}
   * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
   * If sizes is specified, res is calculated
   */


  pf.setRes = function (set) {
    var candidates;

    if (set) {
      candidates = pf.parseSet(set);

      for (var i = 0, len = candidates.length; i < len; i++) {
        setResolution(candidates[i], set.sizes);
      }
    }

    return candidates;
  };

  pf.setRes.res = setResolution;

  pf.applySetCandidate = function (candidates, img) {
    if (!candidates.length) {
      return;
    }

    var candidate, i, j, length, bestCandidate, curSrc, curCan, candidateSrc, abortCurSrc;
    var imageData = img[pf.ns];
    var dpr = pf.DPR;
    curSrc = imageData.curSrc || img[curSrcProp];
    curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set); // if we have a current source, we might either become lazy or give this source some advantage

    if (curCan && curCan.set === candidates[0].set) {
      // if browser can abort image request and the image has a higher pixel density than needed
      // and this image isn't downloaded yet, we skip next part and try to save bandwidth
      abortCurSrc = supportAbort && !img.complete && curCan.res - 0.1 > dpr;

      if (!abortCurSrc) {
        curCan.cached = true; // if current candidate is "best", "better" or "okay",
        // set it to bestCandidate

        if (curCan.res >= dpr) {
          bestCandidate = curCan;
        }
      }
    }

    if (!bestCandidate) {
      candidates.sort(ascendingSort);
      length = candidates.length;
      bestCandidate = candidates[length - 1];

      for (i = 0; i < length; i++) {
        candidate = candidates[i];

        if (candidate.res >= dpr) {
          j = i - 1; // we have found the perfect candidate,
          // but let's improve this a little bit with some assumptions ;-)

          if (candidates[j] && (abortCurSrc || curSrc !== pf.makeUrl(candidate.url)) && chooseLowRes(candidates[j].res, candidate.res, dpr, candidates[j].cached)) {
            bestCandidate = candidates[j];
          } else {
            bestCandidate = candidate;
          }

          break;
        }
      }
    }

    if (bestCandidate) {
      candidateSrc = pf.makeUrl(bestCandidate.url);
      imageData.curSrc = candidateSrc;
      imageData.curCan = bestCandidate;

      if (candidateSrc !== curSrc) {
        pf.setSrc(img, bestCandidate);
      }

      pf.setSize(img);
    }
  };

  pf.setSrc = function (img, bestCandidate) {
    var origWidth;
    img.src = bestCandidate.url; // although this is a specific Safari issue, we don't want to take too much different code paths

    if (bestCandidate.set.type === "image/svg+xml") {
      origWidth = img.style.width;
      img.style.width = img.offsetWidth + 1 + "px"; // next line only should trigger a repaint
      // if... is only done to trick dead code removal

      if (img.offsetWidth + 1) {
        img.style.width = origWidth;
      }
    }
  };

  pf.getSet = function (img) {
    var i, set, supportsType;
    var match = false;
    var sets = img[pf.ns].sets;

    for (i = 0; i < sets.length && !match; i++) {
      set = sets[i];

      if (!set.srcset || !pf.matchesMedia(set.media) || !(supportsType = pf.supportsType(set.type))) {
        continue;
      }

      if (supportsType === "pending") {
        set = supportsType;
      }

      match = set;
      break;
    }

    return match;
  };

  pf.parseSets = function (element, parent, options) {
    var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;
    var hasPicture = parent && parent.nodeName.toUpperCase() === "PICTURE";
    var imageData = element[pf.ns];

    if (imageData.src === undefined || options.src) {
      imageData.src = getImgAttr.call(element, "src");

      if (imageData.src) {
        setImgAttr.call(element, srcAttr, imageData.src);
      } else {
        removeImgAttr.call(element, srcAttr);
      }
    }

    if (imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset) {
      srcsetAttribute = getImgAttr.call(element, "srcset");
      imageData.srcset = srcsetAttribute;
      srcsetParsed = true;
    }

    imageData.sets = [];

    if (hasPicture) {
      imageData.pic = true;
      getAllSourceElements(parent, imageData.sets);
    }

    if (imageData.srcset) {
      imageSet = {
        srcset: imageData.srcset,
        sizes: getImgAttr.call(element, "sizes")
      };
      imageData.sets.push(imageSet);
      isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || ""); // add normal src as candidate, if source has no w descriptor

      if (!isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x) {
        imageSet.srcset += ", " + imageData.src;
        imageSet.cands.push({
          url: imageData.src,
          d: 1,
          set: imageSet
        });
      }
    } else if (imageData.src) {
      imageData.sets.push({
        srcset: imageData.src,
        sizes: null
      });
    }

    imageData.curCan = null;
    imageData.curSrc = undefined; // if img has picture or the srcset was removed or has a srcset and does not support srcset at all
    // or has a w descriptor (and does not support sizes) set support to false to evaluate

    imageData.supported = !(hasPicture || imageSet && !pf.supSrcset || isWDescripor && !pf.supSizes);

    if (srcsetParsed && pf.supSrcset && !imageData.supported) {
      if (srcsetAttribute) {
        setImgAttr.call(element, srcsetAttr, srcsetAttribute);
        element.srcset = "";
      } else {
        removeImgAttr.call(element, srcsetAttr);
      }
    }

    if (imageData.supported && !imageData.srcset && (!imageData.src && element.src || element.src !== pf.makeUrl(imageData.src))) {
      if (imageData.src === null) {
        element.removeAttribute("src");
      } else {
        element.src = imageData.src;
      }
    }

    imageData.parsed = true;
  };

  pf.fillImg = function (element, options) {
    var imageData;
    var extreme = options.reselect || options.reevaluate; // expando for caching data on the img

    if (!element[pf.ns]) {
      element[pf.ns] = {};
    }

    imageData = element[pf.ns]; // if the element has already been evaluated, skip it
    // unless `options.reevaluate` is set to true ( this, for example,
    // is set to true when running `picturefill` on `resize` ).

    if (!extreme && imageData.evaled === evalId) {
      return;
    }

    if (!imageData.parsed || options.reevaluate) {
      pf.parseSets(element, element.parentNode, options);
    }

    if (!imageData.supported) {
      applyBestCandidate(element);
    } else {
      imageData.evaled = evalId;
    }
  };

  pf.setupRun = function () {
    if (!alreadyRun || isVwDirty || DPR !== window.devicePixelRatio) {
      updateMetrics();
    }
  }; // If picture is supported, well, that's awesome.


  if (pf.supPicture) {
    picturefill = noop;
    pf.fillImg = noop;
  } else {
    // Set up picture polyfill by polling the document
    (function () {
      var isDomReady;
      var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;

      var run = function run() {
        var readyState = document.readyState || "";
        timerId = setTimeout(run, readyState === "loading" ? 200 : 999);

        if (document.body) {
          pf.fillImgs();
          isDomReady = isDomReady || regReady.test(readyState);

          if (isDomReady) {
            clearTimeout(timerId);
          }
        }
      };

      var timerId = setTimeout(run, document.body ? 9 : 99); // Also attach picturefill on resize and readystatechange
      // http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html

      var debounce = function debounce(func, wait) {
        var timeout, timestamp;

        var later = function later() {
          var last = new Date() - timestamp;

          if (last < wait) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            func();
          }
        };

        return function () {
          timestamp = new Date();

          if (!timeout) {
            timeout = setTimeout(later, wait);
          }
        };
      };

      var lastClientWidth = docElem.clientHeight;

      var onResize = function onResize() {
        isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;
        lastClientWidth = docElem.clientHeight;

        if (isVwDirty) {
          pf.fillImgs();
        }
      };

      on(window, "resize", debounce(onResize, 99));
      on(document, "readystatechange", run);
    })();
  }

  pf.picturefill = picturefill; //use this internally for easy monkey patching/performance testing

  pf.fillImgs = picturefill;
  pf.teardownRun = noop;
  /* expose methods for testing */

  picturefill._ = pf;
  window.picturefillCFG = {
    pf: pf,
    push: function push(args) {
      var name = args.shift();

      if (typeof pf[name] === "function") {
        pf[name].apply(pf, args);
      } else {
        cfg[name] = args[0];

        if (alreadyRun) {
          pf.fillImgs({
            reselect: true
          });
        }
      }
    }
  };

  while (setOptions && setOptions.length) {
    window.picturefillCFG.push(setOptions.shift());
  }
  /* expose picturefill */


  window.picturefill = picturefill;
  /* expose picturefill */

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    // CommonJS, just export
    module.exports = picturefill;
  } else if (typeof define === "function" && define.amd) {
    // AMD support
    define("picturefill", function () {
      return picturefill;
    });
  } // IE8 evals this sync, so it must be the last thing we do


  if (!pf.supPicture) {
    types["image/webp"] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==");
  }
})(window, document);
"use strict";

/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages = function () {
  "use strict";

  function t(t, e) {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + t + "' height='" + e + "'%3E%3C/svg%3E";
  }

  function e(t) {
    if (t.srcset && !p && window.picturefill) {
      var e = window.picturefill._;
      t[e.ns] && t[e.ns].evaled || e.fillImg(t, {
        reselect: !0
      }), t[e.ns].curSrc || (t[e.ns].supported = !1, e.fillImg(t, {
        reselect: !0
      })), t.currentSrc = t[e.ns].curSrc || t.src;
    }
  }

  function i(t) {
    for (var e, i = getComputedStyle(t).fontFamily, r = {}; null !== (e = u.exec(i));) {
      r[e[1]] = e[2];
    }

    return r;
  }

  function r(e, i, r) {
    var n = t(i || 1, r || 0);
    b.call(e, "src") !== n && h.call(e, "src", n);
  }

  function n(t, e) {
    t.naturalWidth ? e(t) : setTimeout(n, 100, t, e);
  }

  function c(t) {
    var c = i(t),
        o = t[l];

    if (c["object-fit"] = c["object-fit"] || "fill", !o.img) {
      if ("fill" === c["object-fit"]) return;
      if (!o.skipTest && f && !c["object-position"]) return;
    }

    if (!o.img) {
      o.img = new Image(t.width, t.height), o.img.srcset = b.call(t, "data-ofi-srcset") || t.srcset, o.img.src = b.call(t, "data-ofi-src") || t.src, h.call(t, "data-ofi-src", t.src), t.srcset && h.call(t, "data-ofi-srcset", t.srcset), r(t, t.naturalWidth || t.width, t.naturalHeight || t.height), t.srcset && (t.srcset = "");

      try {
        s(t);
      } catch (t) {
        window.console && console.warn("https://bit.ly/ofi-old-browser");
      }
    }

    e(o.img), t.style.backgroundImage = 'url("' + (o.img.currentSrc || o.img.src).replace(/"/g, '\\"') + '")', t.style.backgroundPosition = c["object-position"] || "center", t.style.backgroundRepeat = "no-repeat", t.style.backgroundOrigin = "content-box", /scale-down/.test(c["object-fit"]) ? n(o.img, function () {
      o.img.naturalWidth > t.width || o.img.naturalHeight > t.height ? t.style.backgroundSize = "contain" : t.style.backgroundSize = "auto";
    }) : t.style.backgroundSize = c["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), n(o.img, function (e) {
      r(t, e.naturalWidth, e.naturalHeight);
    });
  }

  function s(t) {
    var e = {
      get: function get(e) {
        return t[l].img[e ? e : "src"];
      },
      set: function set(e, i) {
        return t[l].img[i ? i : "src"] = e, h.call(t, "data-ofi-" + i, e), c(t), e;
      }
    };
    Object.defineProperty(t, "src", e), Object.defineProperty(t, "currentSrc", {
      get: function get() {
        return e.get("currentSrc");
      }
    }), Object.defineProperty(t, "srcset", {
      get: function get() {
        return e.get("srcset");
      },
      set: function set(t) {
        return e.set(t, "srcset");
      }
    });
  }

  function o() {
    function t(t, e) {
      return t[l] && t[l].img && ("src" === e || "srcset" === e) ? t[l].img : t;
    }

    d || (HTMLImageElement.prototype.getAttribute = function (e) {
      return b.call(t(this, e), e);
    }, HTMLImageElement.prototype.setAttribute = function (e, i) {
      return h.call(t(this, e), e, String(i));
    });
  }

  function a(t, e) {
    var i = !y && !t;
    if (e = e || {}, t = t || "img", d && !e.skipTest || !m) return !1;
    "img" === t ? t = document.getElementsByTagName("img") : "string" == typeof t ? t = document.querySelectorAll(t) : "length" in t || (t = [t]);

    for (var r = 0; r < t.length; r++) {
      t[r][l] = t[r][l] || {
        skipTest: e.skipTest
      }, c(t[r]);
    }

    i && (document.body.addEventListener("load", function (t) {
      "IMG" === t.target.tagName && a(t.target, {
        skipTest: e.skipTest
      });
    }, !0), y = !0, t = "img"), e.watchMQ && window.addEventListener("resize", a.bind(null, t, {
      skipTest: e.skipTest
    }));
  }

  var l = "bfred-it:object-fit-images",
      u = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,
      g = "undefined" == typeof Image ? {
    style: {
      "object-position": 1
    }
  } : new Image(),
      f = ("object-fit" in g.style),
      d = ("object-position" in g.style),
      m = ("background-size" in g.style),
      p = "string" == typeof g.currentSrc,
      b = g.getAttribute,
      h = g.setAttribute,
      y = !1;
  return a.supportsObjectFit = f, a.supportsObjectPosition = d, o(), a;
}();

setTimeout(objectFitImages, 0);
"use strict";

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

      var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


      var thisArg = arguments[1]; // 5. Let k be 0.

      var k = 0; // 6. Repeat, while k < len

      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];

        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        } // e. Increase k by 1.


        k++;
      } // 7. Return undefined.


      return undefined;
    },
    configurable: true,
    writable: true
  });
}
"use strict";

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('before')) {
      return;
    }

    Object.defineProperty(item, 'before', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function before() {
        var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.parentNode.insertBefore(docFrag, this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
"use strict";

(function () {
  var arr = [window.Element, window.CharacterData, window.DocumentType];
  var args = [];
  arr.forEach(function (item) {
    if (item) {
      args.push(item.prototype);
    }
  }); // from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md

  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('remove')) {
        return;
      }

      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          this.parentNode.removeChild(this);
        }
      });
    });
  })(args);
})();
"use strict";

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }

    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
"use strict";

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function value(_value) {
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);
      var len = O.length >>> 0;
      var start = arguments[1];
      var relativeStart = start >> 0;
      var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
      var end = arguments[2];
      var relativeEnd = end === undefined ? len : end >> 0;
      var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

      while (k < final) {
        O[k] = _value;
        k++;
      }

      return O;
    }
  });
}
"use strict";

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }

    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }

    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];

      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }

    return -1;
  };
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! lazysizes - v5.2.0 */
!function (a, b) {
  var c = b(a, a.document, Date);
  a.lazySizes = c, "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports && (module.exports = c);
}("undefined" != typeof window ? window : {}, function (a, b, c) {
  "use strict";

  var d, e;
  if (function () {
    var b,
        c = {
      lazyClass: "lazyload",
      loadedClass: "lazyloaded",
      loadingClass: "lazyloading",
      preloadClass: "lazypreload",
      errorClass: "lazyerror",
      autosizesClass: "lazyautosizes",
      srcAttr: "data-src",
      srcsetAttr: "data-srcset",
      sizesAttr: "data-sizes",
      minSize: 40,
      customMedia: {},
      init: !0,
      expFactor: 1.5,
      hFac: .8,
      loadMode: 2,
      loadHidden: !0,
      ricTimeout: 0,
      throttleDelay: 125
    };
    e = a.lazySizesConfig || a.lazysizesConfig || {};

    for (b in c) {
      b in e || (e[b] = c[b]);
    }
  }(), !b || !b.getElementsByClassName) return {
    init: function init() {},
    cfg: e,
    noSupport: !0
  };

  var f = b.documentElement,
      g = a.HTMLPictureElement,
      h = "addEventListener",
      i = "getAttribute",
      j = a[h].bind(a),
      k = a.setTimeout,
      l = a.requestAnimationFrame || k,
      m = a.requestIdleCallback,
      n = /^picture$/i,
      o = ["load", "error", "lazyincluded", "_lazyloaded"],
      p = {},
      q = Array.prototype.forEach,
      r = function r(a, b) {
    return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b];
  },
      s = function s(a, b) {
    r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b);
  },
      t = function t(a, b) {
    var c;
    (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "));
  },
      u = function u(a, b, c) {
    var d = c ? h : "removeEventListener";
    c && u(a, b), o.forEach(function (c) {
      a[d](c, b);
    });
  },
      v = function v(a, c, e, f, g) {
    var h = b.createEvent("Event");
    return e || (e = {}), e.instance = d, h.initEvent(c, !f, !g), h.detail = e, a.dispatchEvent(h), h;
  },
      w = function w(b, c) {
    var d;
    !g && (d = a.picturefill || e.pf) ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src), d({
      reevaluate: !0,
      elements: [b]
    })) : c && c.src && (b.src = c.src);
  },
      x = function x(a, b) {
    return (getComputedStyle(a, null) || {})[b];
  },
      y = function y(a, b, c) {
    for (c = c || a.offsetWidth; c < e.minSize && b && !a._lazysizesWidth;) {
      c = b.offsetWidth, b = b.parentNode;
    }

    return c;
  },
      z = function () {
    var a,
        c,
        d = [],
        e = [],
        f = d,
        g = function g() {
      var b = f;

      for (f = d.length ? e : d, a = !0, c = !1; b.length;) {
        b.shift()();
      }

      a = !1;
    },
        h = function h(d, e) {
      a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g)));
    };

    return h._lsFlush = g, h;
  }(),
      A = function A(a, b) {
    return b ? function () {
      z(a);
    } : function () {
      var b = this,
          c = arguments;
      z(function () {
        a.apply(b, c);
      });
    };
  },
      B = function B(a) {
    var b,
        d = 0,
        f = e.throttleDelay,
        g = e.ricTimeout,
        h = function h() {
      b = !1, d = c.now(), a();
    },
        i = m && g > 49 ? function () {
      m(h, {
        timeout: g
      }), g !== e.ricTimeout && (g = e.ricTimeout);
    } : A(function () {
      k(h);
    }, !0);

    return function (a) {
      var e;
      (a = !0 === a) && (g = 33), b || (b = !0, e = f - (c.now() - d), e < 0 && (e = 0), a || e < 9 ? i() : k(i, e));
    };
  },
      C = function C(a) {
    var b,
        d,
        e = 99,
        f = function f() {
      b = null, a();
    },
        g = function g() {
      var a = c.now() - d;
      a < e ? k(g, e - a) : (m || f)(f);
    };

    return function () {
      d = c.now(), b || (b = k(g, e));
    };
  },
      D = function () {
    var g,
        m,
        o,
        p,
        y,
        D,
        F,
        G,
        H,
        I,
        J,
        K,
        L = /^img$/i,
        M = /^iframe$/i,
        N = "onscroll" in a && !/(gle|ing)bot/.test(navigator.userAgent),
        O = 0,
        P = 0,
        Q = 0,
        R = -1,
        S = function S(a) {
      Q--, (!a || Q < 0 || !a.target) && (Q = 0);
    },
        T = function T(a) {
      return null == K && (K = "hidden" == x(b.body, "visibility")), K || !("hidden" == x(a.parentNode, "visibility") && "hidden" == x(a, "visibility"));
    },
        U = function U(a, c) {
      var d,
          e = a,
          g = T(a);

      for (G -= c, J += c, H -= c, I += c; g && (e = e.offsetParent) && e != b.body && e != f;) {
        (g = (x(e, "opacity") || 1) > 0) && "visible" != x(e, "overflow") && (d = e.getBoundingClientRect(), g = I > d.left && H < d.right && J > d.top - 1 && G < d.bottom + 1);
      }

      return g;
    },
        V = function V() {
      var a,
          c,
          h,
          j,
          k,
          l,
          n,
          o,
          q,
          r,
          s,
          t,
          u = d.elements;

      if ((p = e.loadMode) && Q < 8 && (a = u.length)) {
        for (c = 0, R++; c < a; c++) {
          if (u[c] && !u[c]._lazyRace) if (!N || d.prematureUnveil && d.prematureUnveil(u[c])) ba(u[c]);else if ((o = u[c][i]("data-expand")) && (l = 1 * o) || (l = P), r || (r = !e.expand || e.expand < 1 ? f.clientHeight > 500 && f.clientWidth > 500 ? 500 : 370 : e.expand, d._defEx = r, s = r * e.expFactor, t = e.hFac, K = null, P < s && Q < 1 && R > 2 && p > 2 && !b.hidden ? (P = s, R = 0) : P = p > 1 && R > 1 && Q < 6 ? r : O), q !== l && (D = innerWidth + l * t, F = innerHeight + l, n = -1 * l, q = l), h = u[c].getBoundingClientRect(), (J = h.bottom) >= n && (G = h.top) <= F && (I = h.right) >= n * t && (H = h.left) <= D && (J || I || H || G) && (e.loadHidden || T(u[c])) && (m && Q < 3 && !o && (p < 3 || R < 4) || U(u[c], l))) {
            if (ba(u[c]), k = !0, Q > 9) break;
          } else !k && m && !j && Q < 4 && R < 4 && p > 2 && (g[0] || e.preloadAfterLoad) && (g[0] || !o && (J || I || H || G || "auto" != u[c][i](e.sizesAttr))) && (j = g[0] || u[c]);
        }

        j && !k && ba(j);
      }
    },
        W = B(V),
        X = function X(a) {
      var b = a.target;
      if (b._lazyCache) return void delete b._lazyCache;
      S(a), s(b, e.loadedClass), t(b, e.loadingClass), u(b, Z), v(b, "lazyloaded");
    },
        Y = A(X),
        Z = function Z(a) {
      Y({
        target: a.target
      });
    },
        $ = function $(a, b) {
      try {
        a.contentWindow.location.replace(b);
      } catch (c) {
        a.src = b;
      }
    },
        _ = function _(a) {
      var b,
          c = a[i](e.srcsetAttr);
      (b = e.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c);
    },
        aa = A(function (a, b, c, d, f) {
      var g, h, j, l, m, p;
      (m = v(a, "lazybeforeunveil", b)).defaultPrevented || (d && (c ? s(a, e.autosizesClass) : a.setAttribute("sizes", d)), h = a[i](e.srcsetAttr), g = a[i](e.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), m = {
        target: a
      }, s(a, e.loadingClass), p && (clearTimeout(o), o = k(S, 2500), u(a, Z, !0)), l && q.call(j.getElementsByTagName("source"), _), h ? a.setAttribute("srcset", h) : g && !l && (M.test(a.nodeName) ? $(a, g) : a.src = g), f && (h || l) && w(a, {
        src: g
      })), a._lazyRace && delete a._lazyRace, t(a, e.lazyClass), z(function () {
        var b = a.complete && a.naturalWidth > 1;
        p && !b || (b && s(a, "ls-is-cached"), X(m), a._lazyCache = !0, k(function () {
          "_lazyCache" in a && delete a._lazyCache;
        }, 9)), "lazy" == a.loading && Q--;
      }, !0);
    }),
        ba = function ba(a) {
      if (!a._lazyRace) {
        var b,
            c = L.test(a.nodeName),
            d = c && (a[i](e.sizesAttr) || a[i]("sizes")),
            f = "auto" == d;
        (!f && m || !c || !a[i]("src") && !a.srcset || a.complete || r(a, e.errorClass) || !r(a, e.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, Q++, aa(a, b, f, d, c));
      }
    },
        ca = C(function () {
      e.loadMode = 3, W();
    }),
        da = function da() {
      3 == e.loadMode && (e.loadMode = 2), ca();
    },
        ea = function ea() {
      if (!m) {
        if (c.now() - y < 999) return void k(ea, 999);
        m = !0, e.loadMode = 3, W(), j("scroll", da, !0);
      }
    };

    return {
      _: function _() {
        y = c.now(), d.elements = b.getElementsByClassName(e.lazyClass), g = b.getElementsByClassName(e.lazyClass + " " + e.preloadClass), j("scroll", W, !0), j("resize", W, !0), j("pageshow", function (a) {
          if (a.persisted) {
            var c = b.querySelectorAll("." + e.loadingClass);
            c.length && c.forEach && l(function () {
              c.forEach(function (a) {
                a.complete && ba(a);
              });
            });
          }
        }), a.MutationObserver ? new MutationObserver(W).observe(f, {
          childList: !0,
          subtree: !0,
          attributes: !0
        }) : (f[h]("DOMNodeInserted", W, !0), f[h]("DOMAttrModified", W, !0), setInterval(W, 999)), j("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function (a) {
          b[h](a, W, !0);
        }), /d$|^c/.test(b.readyState) ? ea() : (j("load", ea), b[h]("DOMContentLoaded", W), k(ea, 2e4)), d.elements.length ? (V(), z._lsFlush()) : W();
      },
      checkElems: W,
      unveil: ba,
      _aLSL: da
    };
  }(),
      E = function () {
    var a,
        c = A(function (a, b, c, d) {
      var e, f, g;
      if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || "")) for (e = b.getElementsByTagName("source"), f = 0, g = e.length; f < g; f++) {
        e[f].setAttribute("sizes", d);
      }
      c.detail.dataAttr || w(a, c.detail);
    }),
        d = function d(a, b, _d) {
      var e,
          f = a.parentNode;
      f && (_d = y(a, f, _d), e = v(a, "lazybeforesizes", {
        width: _d,
        dataAttr: !!b
      }), e.defaultPrevented || (_d = e.detail.width) && _d !== a._lazysizesWidth && c(a, f, e, _d));
    },
        f = function f() {
      var b,
          c = a.length;
      if (c) for (b = 0; b < c; b++) {
        d(a[b]);
      }
    },
        g = C(f);

    return {
      _: function _() {
        a = b.getElementsByClassName(e.autosizesClass), j("resize", g);
      },
      checkElems: g,
      updateElem: d
    };
  }(),
      F = function F() {
    !F.i && b.getElementsByClassName && (F.i = !0, E._(), D._());
  };

  return k(function () {
    e.init && F();
  }), d = {
    cfg: e,
    autoSizer: E,
    loader: D,
    init: F,
    uP: w,
    aC: s,
    rC: t,
    hC: r,
    fire: v,
    gW: y,
    rAF: z
  };
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Swiper 5.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: May 20, 2020
 */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.Swiper = factory());
})(void 0, function () {
  'use strict';
  /**
   * SSR Window 2.0.0
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2020, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: May 12, 2020
   */

  /* eslint-disable no-param-reassign */

  function isObject(obj) {
    return obj !== null && _typeof(obj) === 'object' && 'constructor' in obj && obj.constructor === Object;
  }

  function extend(target, src) {
    if (target === void 0) {
      target = {};
    }

    if (src === void 0) {
      src = {};
    }

    Object.keys(src).forEach(function (key) {
      if (typeof target[key] === 'undefined') {
        target[key] = src[key];
      } else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        extend(target[key], src[key]);
      }
    });
  }

  var doc = typeof document !== 'undefined' ? document : {};
  var ssrDocument = {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: ''
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {}
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS: function createElementNS() {
      return {};
    },
    importNode: function importNode() {
      return null;
    },
    location: {
      hash: '',
      host: '',
      hostname: '',
      href: '',
      origin: '',
      pathname: '',
      protocol: '',
      search: ''
    }
  };
  extend(doc, ssrDocument);
  var win = typeof window !== 'undefined' ? window : {};
  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ''
    },
    location: {
      hash: '',
      host: '',
      hostname: '',
      href: '',
      origin: '',
      pathname: '',
      protocol: '',
      search: ''
    },
    history: {
      replaceState: function replaceState() {},
      pushState: function pushState() {},
      go: function go() {},
      back: function back() {}
    },
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        }
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
    matchMedia: function matchMedia() {
      return {};
    }
  };
  extend(win, ssrWindow);
  /**
   * Dom7 2.1.5
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * http://framework7.io/docs/dom.html
   *
   * Copyright 2020, Vladimir Kharlampidi
   * The iDangero.us
   * http://www.idangero.us/
   *
   * Licensed under MIT
   *
   * Released on: May 15, 2020
   */

  var Dom7 = function Dom7(arr) {
    var self = this; // Create array-like object

    for (var i = 0; i < arr.length; i += 1) {
      self[i] = arr[i];
    }

    self.length = arr.length; // Return collection with methods

    return this;
  };

  function $(selector, context) {
    var arr = [];
    var i = 0;

    if (selector && !context) {
      if (selector instanceof Dom7) {
        return selector;
      }
    }

    if (selector) {
      // String
      if (typeof selector === 'string') {
        var els;
        var tempParent;
        var html = selector.trim();

        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          var toCreate = 'div';

          if (html.indexOf('<li') === 0) {
            toCreate = 'ul';
          }

          if (html.indexOf('<tr') === 0) {
            toCreate = 'tbody';
          }

          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) {
            toCreate = 'tr';
          }

          if (html.indexOf('<tbody') === 0) {
            toCreate = 'table';
          }

          if (html.indexOf('<option') === 0) {
            toCreate = 'select';
          }

          tempParent = doc.createElement(toCreate);
          tempParent.innerHTML = html;

          for (i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            // Pure ID selector
            els = [doc.getElementById(selector.trim().split('#')[1])];
          } else {
            // Other selectors
            els = (context || doc).querySelectorAll(selector.trim());
          }

          for (i = 0; i < els.length; i += 1) {
            if (els[i]) {
              arr.push(els[i]);
            }
          }
        }
      } else if (selector.nodeType || selector === win || selector === doc) {
        // Node/element
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // Array of elements or instance of Dom
        for (i = 0; i < selector.length; i += 1) {
          arr.push(selector[i]);
        }
      }
    }

    return new Dom7(arr);
  }

  $.fn = Dom7.prototype;
  $.Class = Dom7;
  $.Dom7 = Dom7;

  function unique(arr) {
    var uniqueArray = [];

    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) {
        uniqueArray.push(arr[i]);
      }
    }

    return uniqueArray;
  } // Classes and attributes


  function addClass(className) {
    if (typeof className === 'undefined') {
      return this;
    }

    var classes = className.split(' ');

    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') {
          this[j].classList.add(classes[i]);
        }
      }
    }

    return this;
  }

  function removeClass(className) {
    var classes = className.split(' ');

    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') {
          this[j].classList.remove(classes[i]);
        }
      }
    }

    return this;
  }

  function hasClass(className) {
    if (!this[0]) {
      return false;
    }

    return this[0].classList.contains(className);
  }

  function toggleClass(className) {
    var classes = className.split(' ');

    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') {
          this[j].classList.toggle(classes[i]);
        }
      }
    }

    return this;
  }

  function attr(attrs, value) {
    var arguments$1 = arguments;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) {
        return this[0].getAttribute(attrs);
      }

      return undefined;
    } // Set attrs


    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (var attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }

    return this;
  } // eslint-disable-next-line


  function removeAttr(attr) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }

    return this;
  }

  function data(key, value) {
    var el;

    if (typeof value === 'undefined') {
      el = this[0]; // Get value

      if (el) {
        if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute("data-" + key);

        if (dataKey) {
          return dataKey;
        }

        return undefined;
      }

      return undefined;
    } // Set value


    for (var i = 0; i < this.length; i += 1) {
      el = this[i];

      if (!el.dom7ElementDataStorage) {
        el.dom7ElementDataStorage = {};
      }

      el.dom7ElementDataStorage[key] = value;
    }

    return this;
  } // Transforms
  // eslint-disable-next-line


  function transform(transform) {
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransform = transform;
      elStyle.transform = transform;
    }

    return this;
  }

  function transition(duration) {
    if (typeof duration !== 'string') {
      duration = duration + "ms"; // eslint-disable-line
    }

    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }

    return this;
  } // Events


  function on() {
    var assign;
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];

    if (typeof args[1] === 'function') {
      assign = args, eventType = assign[0], listener = assign[1], capture = assign[2];
      targetSelector = undefined;
    }

    if (!capture) {
      capture = false;
    }

    function handleLiveEvent(e) {
      var target = e.target;

      if (!target) {
        return;
      }

      var eventData = e.target.dom7EventData || [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      if ($(target).is(targetSelector)) {
        listener.apply(target, eventData);
      } else {
        var parents = $(target).parents(); // eslint-disable-line

        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) {
            listener.apply(parents[k], eventData);
          }
        }
      }
    }

    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      listener.apply(this, eventData);
    }

    var events = eventType.split(' ');
    var j;

    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];

      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          var event = events[j];

          if (!el.dom7Listeners) {
            el.dom7Listeners = {};
          }

          if (!el.dom7Listeners[event]) {
            el.dom7Listeners[event] = [];
          }

          el.dom7Listeners[event].push({
            listener: listener,
            proxyListener: handleEvent
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          var event$1 = events[j];

          if (!el.dom7LiveListeners) {
            el.dom7LiveListeners = {};
          }

          if (!el.dom7LiveListeners[event$1]) {
            el.dom7LiveListeners[event$1] = [];
          }

          el.dom7LiveListeners[event$1].push({
            listener: listener,
            proxyListener: handleLiveEvent
          });
          el.addEventListener(event$1, handleLiveEvent, capture);
        }
      }
    }

    return this;
  }

  function off() {
    var assign;
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];

    if (typeof args[1] === 'function') {
      assign = args, eventType = assign[0], listener = assign[1], capture = assign[2];
      targetSelector = undefined;
    }

    if (!capture) {
      capture = false;
    }

    var events = eventType.split(' ');

    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];

      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var handlers = void 0;

        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }

        if (handlers && handlers.length) {
          for (var k = handlers.length - 1; k >= 0; k -= 1) {
            var handler = handlers[k];

            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }

    return this;
  }

  function trigger() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var events = args[0].split(' ');
    var eventData = args[1];

    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];

      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var evt = void 0;

        try {
          evt = new win.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true
          });
        } catch (e) {
          evt = doc.createEvent('Event');
          evt.initEvent(event, true, true);
          evt.detail = eventData;
        } // eslint-disable-next-line


        el.dom7EventData = args.filter(function (data, dataIndex) {
          return dataIndex > 0;
        });
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }

    return this;
  }

  function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;

    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) {
        return;
      }

      callback.call(this, e);

      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }

    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }

    return this;
  }

  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }

      return this[0].offsetWidth;
    }

    return null;
  }

  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }

      return this[0].offsetHeight;
    }

    return null;
  }

  function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = doc.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === win ? win.scrollY : el.scrollTop;
      var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
      return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft
      };
    }

    return null;
  }

  function styles() {
    if (this[0]) {
      return win.getComputedStyle(this[0], null);
    }

    return {};
  }

  function css(props, value) {
    var i;

    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) {
          return win.getComputedStyle(this[0], null).getPropertyValue(props);
        }
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (var prop in props) {
            this[i].style[prop] = props[prop];
          }
        }

        return this;
      }
    }

    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }

      return this;
    }

    return this;
  } // Iterate over the collection passing elements to `callback`


  function each(callback) {
    // Don't bother continuing without a callback
    if (!callback) {
      return this;
    } // Iterate over the current collection


    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], i, this[i]) === false) {
        // End the loop early
        return this;
      }
    } // Return `this` to allow chained DOM operations


    return this;
  }

  function filter(callback) {
    var matchedItems = [];
    var dom = this;

    for (var i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) {
        matchedItems.push(dom[i]);
      }
    }

    return new Dom7(matchedItems);
  } // eslint-disable-next-line


  function html(html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }

    return this;
  } // eslint-disable-next-line


  function text(text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }

      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }

    return this;
  }

  function is(selector) {
    var el = this[0];
    var compareWith;
    var i;

    if (!el || typeof selector === 'undefined') {
      return false;
    }

    if (typeof selector === 'string') {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      }

      compareWith = $(selector);

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) {
          return true;
        }
      }

      return false;
    } else if (selector === doc) {
      return el === doc;
    } else if (selector === win) {
      return el === win;
    }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) {
          return true;
        }
      }

      return false;
    }

    return false;
  }

  function index() {
    var child = this[0];
    var i;

    if (child) {
      i = 0; // eslint-disable-next-line

      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) {
          i += 1;
        }
      }

      return i;
    }

    return undefined;
  } // eslint-disable-next-line


  function eq(index) {
    if (typeof index === 'undefined') {
      return this;
    }

    var length = this.length;
    var returnIndex;

    if (index > length - 1) {
      return new Dom7([]);
    }

    if (index < 0) {
      returnIndex = length + index;

      if (returnIndex < 0) {
        return new Dom7([]);
      }

      return new Dom7([this[returnIndex]]);
    }

    return new Dom7([this[index]]);
  }

  function append() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];

      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;

          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }

  function prepend(newChild) {
    var i;
    var j;

    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;

        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }

    return this;
  }

  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return new Dom7([this[0].nextElementSibling]);
        }

        return new Dom7([]);
      }

      if (this[0].nextElementSibling) {
        return new Dom7([this[0].nextElementSibling]);
      }

      return new Dom7([]);
    }

    return new Dom7([]);
  }

  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];

    if (!el) {
      return new Dom7([]);
    }

    while (el.nextElementSibling) {
      var next = el.nextElementSibling; // eslint-disable-line

      if (selector) {
        if ($(next).is(selector)) {
          nextEls.push(next);
        }
      } else {
        nextEls.push(next);
      }

      el = next;
    }

    return new Dom7(nextEls);
  }

  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];

      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return new Dom7([el.previousElementSibling]);
        }

        return new Dom7([]);
      }

      if (el.previousElementSibling) {
        return new Dom7([el.previousElementSibling]);
      }

      return new Dom7([]);
    }

    return new Dom7([]);
  }

  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];

    if (!el) {
      return new Dom7([]);
    }

    while (el.previousElementSibling) {
      var prev = el.previousElementSibling; // eslint-disable-line

      if (selector) {
        if ($(prev).is(selector)) {
          prevEls.push(prev);
        }
      } else {
        prevEls.push(prev);
      }

      el = prev;
    }

    return new Dom7(prevEls);
  }

  function parent(selector) {
    var parents = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) {
            parents.push(this[i].parentNode);
          }
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }

    return $(unique(parents));
  }

  function parents(selector) {
    var parents = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      var parent = this[i].parentNode; // eslint-disable-line

      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) {
            parents.push(parent);
          }
        } else {
          parents.push(parent);
        }

        parent = parent.parentNode;
      }
    }

    return $(unique(parents));
  }

  function closest(selector) {
    var closest = this; // eslint-disable-line

    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }

    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }

    return closest;
  }

  function find(selector) {
    var foundElements = [];

    for (var i = 0; i < this.length; i += 1) {
      var found = this[i].querySelectorAll(selector);

      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }

    return new Dom7(foundElements);
  }

  function children(selector) {
    var children = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) {
            children.push(childNodes[j]);
          }
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }

    return new Dom7(unique(children));
  }

  function remove() {
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) {
        this[i].parentNode.removeChild(this[i]);
      }
    }

    return this;
  }

  function add() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var dom = this;
    var i;
    var j;

    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);

      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }

    return dom;
  }

  var Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    data: data,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    filter: filter,
    remove: remove,
    add: add,
    styles: styles
  };
  Object.keys(Methods).forEach(function (methodName) {
    $.fn[methodName] = $.fn[methodName] || Methods[methodName];
  });
  var Utils = {
    deleteProps: function deleteProps(obj) {
      var object = obj;
      Object.keys(object).forEach(function (key) {
        try {
          object[key] = null;
        } catch (e) {// no getter for object
        }

        try {
          delete object[key];
        } catch (e) {// something got wrong
        }
      });
    },
    nextTick: function nextTick(callback, delay) {
      if (delay === void 0) delay = 0;
      return setTimeout(callback, delay);
    },
    now: function now() {
      return Date.now();
    },
    getTranslate: function getTranslate(el, axis) {
      if (axis === void 0) axis = 'x';
      var matrix;
      var curTransform;
      var transformMatrix;
      var curStyle = win.getComputedStyle(el, null);

      if (win.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;

        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) {
            return a.replace(',', '.');
          }).join(', ');
        } // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case


        transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) {
          curTransform = transformMatrix.m41;
        } // Crazy IE10 Matrix
        else if (matrix.length === 16) {
            curTransform = parseFloat(matrix[12]);
          } // Normal Browsers
          else {
              curTransform = parseFloat(matrix[4]);
            }
      }

      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) {
          curTransform = transformMatrix.m42;
        } // Crazy IE10 Matrix
        else if (matrix.length === 16) {
            curTransform = parseFloat(matrix[13]);
          } // Normal Browsers
          else {
              curTransform = parseFloat(matrix[5]);
            }
      }

      return curTransform || 0;
    },
    parseUrlQuery: function parseUrlQuery(url) {
      var query = {};
      var urlToParse = url || win.location.href;
      var i;
      var params;
      var param;
      var length;

      if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(function (paramsPart) {
          return paramsPart !== '';
        });
        length = params.length;

        for (i = 0; i < length; i += 1) {
          param = params[i].replace(/#\S+/g, '').split('=');
          query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
        }
      }

      return query;
    },
    isObject: function isObject(o) {
      return _typeof(o) === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    extend: function extend() {
      var args = [],
          len$1 = arguments.length;

      while (len$1--) {
        args[len$1] = arguments[len$1];
      }

      var to = Object(args[0]);

      for (var i = 1; i < args.length; i += 1) {
        var nextSource = args[i];

        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));

          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== undefined && desc.enumerable) {
              if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }

      return to;
    }
  };

  var Support = function Support() {
    return {
      touch: !!('ontouchstart' in win || win.DocumentTouch && doc instanceof win.DocumentTouch),
      pointerEvents: !!win.PointerEvent && 'maxTouchPoints' in win.navigator && win.navigator.maxTouchPoints >= 0,
      observer: function checkObserver() {
        return 'MutationObserver' in win || 'WebkitMutationObserver' in win;
      }(),
      passiveListener: function checkPassiveListener() {
        var supportsPassive = false;

        try {
          var opts = Object.defineProperty({}, 'passive', {
            // eslint-disable-next-line
            get: function get() {
              supportsPassive = true;
            }
          });
          win.addEventListener('testPassiveListener', null, opts);
        } catch (e) {// No support
        }

        return supportsPassive;
      }(),
      gestures: function checkGestures() {
        return 'ongesturestart' in win;
      }()
    };
  }();

  var SwiperClass = function SwiperClass(params) {
    if (params === void 0) params = {};
    var self = this;
    self.params = params; // Events

    self.eventsListeners = {};

    if (self.params && self.params.on) {
      Object.keys(self.params.on).forEach(function (eventName) {
        self.on(eventName, self.params.on[eventName]);
      });
    }
  };

  var staticAccessors = {
    components: {
      configurable: true
    }
  };

  SwiperClass.prototype.on = function on(events, handler, priority) {
    var self = this;

    if (typeof handler !== 'function') {
      return self;
    }

    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) {
        self.eventsListeners[event] = [];
      }

      self.eventsListeners[event][method](handler);
    });
    return self;
  };

  SwiperClass.prototype.once = function once(events, handler, priority) {
    var self = this;

    if (typeof handler !== 'function') {
      return self;
    }

    function onceHandler() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      self.off(events, onceHandler);

      if (onceHandler.f7proxy) {
        delete onceHandler.f7proxy;
      }

      handler.apply(self, args);
    }

    onceHandler.f7proxy = handler;
    return self.on(events, onceHandler, priority);
  };

  SwiperClass.prototype.off = function off(events, handler) {
    var self = this;

    if (!self.eventsListeners) {
      return self;
    }

    events.split(' ').forEach(function (event) {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event] && self.eventsListeners[event].length) {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler || eventHandler.f7proxy && eventHandler.f7proxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.emit = function emit() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var self = this;

    if (!self.eventsListeners) {
      return self;
    }

    var events;
    var data;
    var context;

    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }

    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      if (self.eventsListeners && self.eventsListeners[event]) {
        var handlers = [];
        self.eventsListeners[event].forEach(function (eventHandler) {
          handlers.push(eventHandler);
        });
        handlers.forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.useModulesParams = function useModulesParams(instanceParams) {
    var instance = this;

    if (!instance.modules) {
      return;
    }

    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName]; // Extend params

      if (module.params) {
        Utils.extend(instanceParams, module.params);
      }
    });
  };

  SwiperClass.prototype.useModules = function useModules(modulesParams) {
    if (modulesParams === void 0) modulesParams = {};
    var instance = this;

    if (!instance.modules) {
      return;
    }

    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      var moduleParams = modulesParams[moduleName] || {}; // Extend instance methods and props

      if (module.instance) {
        Object.keys(module.instance).forEach(function (modulePropName) {
          var moduleProp = module.instance[modulePropName];

          if (typeof moduleProp === 'function') {
            instance[modulePropName] = moduleProp.bind(instance);
          } else {
            instance[modulePropName] = moduleProp;
          }
        });
      } // Add event listeners


      if (module.on && instance.on) {
        Object.keys(module.on).forEach(function (moduleEventName) {
          instance.on(moduleEventName, module.on[moduleEventName]);
        });
      } // Module create callback


      if (module.create) {
        module.create.bind(instance)(moduleParams);
      }
    });
  };

  staticAccessors.components.set = function (components) {
    var Class = this;

    if (!Class.use) {
      return;
    }

    Class.use(components);
  };

  SwiperClass.installModule = function installModule(module) {
    var params = [],
        len = arguments.length - 1;

    while (len-- > 0) {
      params[len] = arguments[len + 1];
    }

    var Class = this;

    if (!Class.prototype.modules) {
      Class.prototype.modules = {};
    }

    var name = module.name || Object.keys(Class.prototype.modules).length + "_" + Utils.now();
    Class.prototype.modules[name] = module; // Prototype

    if (module.proto) {
      Object.keys(module.proto).forEach(function (key) {
        Class.prototype[key] = module.proto[key];
      });
    } // Class


    if (module.static) {
      Object.keys(module.static).forEach(function (key) {
        Class[key] = module.static[key];
      });
    } // Callback


    if (module.install) {
      module.install.apply(Class, params);
    }

    return Class;
  };

  SwiperClass.use = function use(module) {
    var params = [],
        len = arguments.length - 1;

    while (len-- > 0) {
      params[len] = arguments[len + 1];
    }

    var Class = this;

    if (Array.isArray(module)) {
      module.forEach(function (m) {
        return Class.installModule(m);
      });
      return Class;
    }

    return Class.installModule.apply(Class, [module].concat(params));
  };

  Object.defineProperties(SwiperClass, staticAccessors);

  function updateSize() {
    var swiper = this;
    var width;
    var height;
    var $el = swiper.$el;

    if (typeof swiper.params.width !== 'undefined') {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }

    if (typeof swiper.params.height !== 'undefined') {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }

    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    } // Subtract paddings


    width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
    height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);
    Utils.extend(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height
    });
  }

  function updateSlides() {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var swiperSize = swiper.size;
    var rtl = swiper.rtlTranslate;
    var wrongRTL = swiper.wrongRTL;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    var slides = $wrapperEl.children("." + swiper.params.slideClass);
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];

    function slidesForMargin(slideIndex) {
      if (!params.cssMode) {
        return true;
      }

      if (slideIndex === slides.length - 1) {
        return false;
      }

      return true;
    }

    var offsetBefore = params.slidesOffsetBefore;

    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;

    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.snapGrid.length;
    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index = 0;

    if (typeof swiperSize === 'undefined') {
      return;
    }

    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
    }

    swiper.virtualSize = -spaceBetween; // reset margins

    if (rtl) {
      slides.css({
        marginLeft: '',
        marginTop: ''
      });
    } else {
      slides.css({
        marginRight: '',
        marginBottom: ''
      });
    }

    var slidesNumberEvenToRows;

    if (params.slidesPerColumn > 1) {
      if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
      }

      if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
      }
    } // Calc slides


    var slideSize;
    var slidesPerColumn = params.slidesPerColumn;
    var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    var numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);

    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      var slide = slides.eq(i);

      if (params.slidesPerColumn > 1) {
        // Set slides order
        var newSlideOrderIndex = void 0;
        var column = void 0;
        var row = void 0;

        if (params.slidesPerColumnFill === 'row' && params.slidesPerGroup > 1) {
          var groupIndex = Math.floor(i / (params.slidesPerGroup * params.slidesPerColumn));
          var slideIndexInGroup = i - params.slidesPerColumn * params.slidesPerGroup * groupIndex;
          var columnsInGroup = groupIndex === 0 ? params.slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * slidesPerColumn * params.slidesPerGroup) / slidesPerColumn), params.slidesPerGroup);
          row = Math.floor(slideIndexInGroup / columnsInGroup);
          column = slideIndexInGroup - row * columnsInGroup + groupIndex * params.slidesPerGroup;
          newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
          slide.css({
            '-webkit-box-ordinal-group': newSlideOrderIndex,
            '-moz-box-ordinal-group': newSlideOrderIndex,
            '-ms-flex-order': newSlideOrderIndex,
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex
          });
        } else if (params.slidesPerColumnFill === 'column') {
          column = Math.floor(i / slidesPerColumn);
          row = i - column * slidesPerColumn;

          if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
            row += 1;

            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - row * slidesPerRow;
        }

        slide.css("margin-" + (swiper.isHorizontal() ? 'top' : 'left'), row !== 0 && params.spaceBetween && params.spaceBetween + "px");
      }

      if (slide.css('display') === 'none') {
        continue;
      } // eslint-disable-line


      if (params.slidesPerView === 'auto') {
        var slideStyles = win.getComputedStyle(slide[0], null);
        var currentTransform = slide[0].style.transform;
        var currentWebKitTransform = slide[0].style.webkitTransform;

        if (currentTransform) {
          slide[0].style.transform = 'none';
        }

        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = 'none';
        }

        if (params.roundLengths) {
          slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
        } else {
          // eslint-disable-next-line
          if (swiper.isHorizontal()) {
            var width = parseFloat(slideStyles.getPropertyValue('width'));
            var paddingLeft = parseFloat(slideStyles.getPropertyValue('padding-left'));
            var paddingRight = parseFloat(slideStyles.getPropertyValue('padding-right'));
            var marginLeft = parseFloat(slideStyles.getPropertyValue('margin-left'));
            var marginRight = parseFloat(slideStyles.getPropertyValue('margin-right'));
            var boxSizing = slideStyles.getPropertyValue('box-sizing');

            if (boxSizing && boxSizing === 'border-box') {
              slideSize = width + marginLeft + marginRight;
            } else {
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
            }
          } else {
            var height = parseFloat(slideStyles.getPropertyValue('height'));
            var paddingTop = parseFloat(slideStyles.getPropertyValue('padding-top'));
            var paddingBottom = parseFloat(slideStyles.getPropertyValue('padding-bottom'));
            var marginTop = parseFloat(slideStyles.getPropertyValue('margin-top'));
            var marginBottom = parseFloat(slideStyles.getPropertyValue('margin-bottom'));
            var boxSizing$1 = slideStyles.getPropertyValue('box-sizing');

            if (boxSizing$1 && boxSizing$1 === 'border-box') {
              slideSize = height + marginTop + marginBottom;
            } else {
              slideSize = height + paddingTop + paddingBottom + marginTop + marginBottom;
            }
          }
        }

        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }

        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }

        if (params.roundLengths) {
          slideSize = Math.floor(slideSize);
        }
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;

        if (params.roundLengths) {
          slideSize = Math.floor(slideSize);
        }

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = slideSize + "px";
          } else {
            slides[i].style.height = slideSize + "px";
          }
        }
      }

      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }

      slidesSizesGrid.push(slideSize);

      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;

        if (prevSlideSize === 0 && i !== 0) {
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        }

        if (i === 0) {
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        }

        if (Math.abs(slidePosition) < 1 / 1000) {
          slidePosition = 0;
        }

        if (params.roundLengths) {
          slidePosition = Math.floor(slidePosition);
        }

        if (index % params.slidesPerGroup === 0) {
          snapGrid.push(slidePosition);
        }

        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) {
          slidePosition = Math.floor(slidePosition);
        }

        if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) {
          snapGrid.push(slidePosition);
        }

        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }

    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    var newSlidesGrid;

    if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      $wrapperEl.css({
        width: swiper.virtualSize + params.spaceBetween + "px"
      });
    }

    if (params.setWrapperSize) {
      if (swiper.isHorizontal()) {
        $wrapperEl.css({
          width: swiper.virtualSize + params.spaceBetween + "px"
        });
      } else {
        $wrapperEl.css({
          height: swiper.virtualSize + params.spaceBetween + "px"
        });
      }
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;

      if (swiper.isHorizontal()) {
        $wrapperEl.css({
          width: swiper.virtualSize + params.spaceBetween + "px"
        });
      } else {
        $wrapperEl.css({
          height: swiper.virtualSize + params.spaceBetween + "px"
        });
      }

      if (params.centeredSlides) {
        newSlidesGrid = [];

        for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
          var slidesGridItem = snapGrid[i$1];

          if (params.roundLengths) {
            slidesGridItem = Math.floor(slidesGridItem);
          }

          if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) {
            newSlidesGrid.push(slidesGridItem);
          }
        }

        snapGrid = newSlidesGrid;
      }
    } // Remove last grid elements depending on width


    if (!params.centeredSlides) {
      newSlidesGrid = [];

      for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
        var slidesGridItem$1 = snapGrid[i$2];

        if (params.roundLengths) {
          slidesGridItem$1 = Math.floor(slidesGridItem$1);
        }

        if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem$1);
        }
      }

      snapGrid = newSlidesGrid;

      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }

    if (snapGrid.length === 0) {
      snapGrid = [0];
    }

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl) {
          slides.filter(slidesForMargin).css({
            marginLeft: spaceBetween + "px"
          });
        } else {
          slides.filter(slidesForMargin).css({
            marginRight: spaceBetween + "px"
          });
        }
      } else {
        slides.filter(slidesForMargin).css({
          marginBottom: spaceBetween + "px"
        });
      }
    }

    if (params.centeredSlides && params.centeredSlidesBounds) {
      var allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      var maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map(function (snap) {
        if (snap < 0) {
          return -offsetBefore;
        }

        if (snap > maxSnap) {
          return maxSnap + offsetAfter;
        }

        return snap;
      });
    }

    if (params.centerInsufficientSlides) {
      var allSlidesSize$1 = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize$1 += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize$1 -= params.spaceBetween;

      if (allSlidesSize$1 < swiperSize) {
        var allSlidesOffset = (swiperSize - allSlidesSize$1) / 2;
        snapGrid.forEach(function (snap, snapIndex) {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach(function (snap, snapIndex) {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    Utils.extend(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }

    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }

      swiper.emit('snapGridLengthChange');
    }

    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  }

  function updateAutoHeight(speed) {
    var swiper = this;
    var activeSlides = [];
    var newHeight = 0;
    var i;

    if (typeof speed === 'number') {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    } // Find slides currently in view


    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      if (swiper.params.centeredSlides) {
        swiper.visibleSlides.each(function (index, slide) {
          activeSlides.push(slide);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
          var index = swiper.activeIndex + i;

          if (index > swiper.slides.length) {
            break;
          }

          activeSlides.push(swiper.slides.eq(index)[0]);
        }
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    } // Find new height from highest slide in view


    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    } // Update Height


    if (newHeight) {
      swiper.$wrapperEl.css('height', newHeight + "px");
    }
  }

  function updateSlidesOffset() {
    var swiper = this;
    var slides = swiper.slides;

    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
  }

  function updateSlidesProgress(translate) {
    if (translate === void 0) translate = this && this.translate || 0;
    var swiper = this;
    var params = swiper.params;
    var slides = swiper.slides;
    var rtl = swiper.rtlTranslate;

    if (slides.length === 0) {
      return;
    }

    if (typeof slides[0].swiperSlideOffset === 'undefined') {
      swiper.updateSlidesOffset();
    }

    var offsetCenter = -translate;

    if (rtl) {
      offsetCenter = translate;
    } // Visible Slides


    slides.removeClass(params.slideVisibleClass);
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];

    for (var i = 0; i < slides.length; i += 1) {
      var slide = slides[i];
      var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + params.spaceBetween);

      if (params.watchSlidesVisibility || params.centeredSlides && params.autoHeight) {
        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
        var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        var isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }

      slide.progress = rtl ? -slideProgress : slideProgress;
    }

    swiper.visibleSlides = $(swiper.visibleSlides);
  }

  function updateProgress(translate) {
    var swiper = this;

    if (typeof translate === 'undefined') {
      var multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

      translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
    }

    var params = swiper.params;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress;
    var isBeginning = swiper.isBeginning;
    var isEnd = swiper.isEnd;
    var wasBeginning = isBeginning;
    var wasEnd = isEnd;

    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / translatesDiff;
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }

    Utils.extend(swiper, {
      progress: progress,
      isBeginning: isBeginning,
      isEnd: isEnd
    });

    if (params.watchSlidesProgress || params.watchSlidesVisibility || params.centeredSlides && params.autoHeight) {
      swiper.updateSlidesProgress(translate);
    }

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }

    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }

    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  }

  function updateSlidesClasses() {
    var swiper = this;
    var slides = swiper.slides;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;
    var realIndex = swiper.realIndex;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    slides.removeClass(params.slideActiveClass + " " + params.slideNextClass + " " + params.slidePrevClass + " " + params.slideDuplicateActiveClass + " " + params.slideDuplicateNextClass + " " + params.slideDuplicatePrevClass);
    var activeSlide;

    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find("." + params.slideClass + "[data-swiper-slide-index=\"" + activeIndex + "\"]");
    } else {
      activeSlide = slides.eq(activeIndex);
    } // Active classes


    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + realIndex + "\"]").addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + realIndex + "\"]").addClass(params.slideDuplicateActiveClass);
      }
    } // Next Slide


    var nextSlide = activeSlide.nextAll("." + params.slideClass).eq(0).addClass(params.slideNextClass);

    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    } // Prev Slide


    var prevSlide = activeSlide.prevAll("." + params.slideClass).eq(0).addClass(params.slidePrevClass);

    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }

    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + nextSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + nextSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicateNextClass);
      }

      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + prevSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + prevSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicatePrevClass);
      }
    }
  }

  function updateActiveIndex(newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var params = swiper.params;
    var previousIndex = swiper.activeIndex;
    var previousRealIndex = swiper.realIndex;
    var previousSnapIndex = swiper.snapIndex;
    var activeIndex = newActiveIndex;
    var snapIndex;

    if (typeof activeIndex === 'undefined') {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
            activeIndex = i;
          } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      } // Normalize slideIndex


      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === 'undefined') {
          activeIndex = 0;
        }
      }
    }

    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }

    if (snapIndex >= snapGrid.length) {
      snapIndex = snapGrid.length - 1;
    }

    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }

      return;
    } // Get real index


    var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
    Utils.extend(swiper, {
      snapIndex: snapIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex
    });
    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');

    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }

    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      swiper.emit('slideChange');
    }
  }

  function updateClickedSlide(e) {
    var swiper = this;
    var params = swiper.params;
    var slide = $(e.target).closest("." + params.slideClass)[0];
    var slideFound = false;

    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) {
          slideFound = true;
        }
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;

      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = $(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }

    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide
  };

  function getTranslate(axis) {
    if (axis === void 0) axis = this.isHorizontal() ? 'x' : 'y';
    var swiper = this;
    var params = swiper.params;
    var rtl = swiper.rtlTranslate;
    var translate = swiper.translate;
    var $wrapperEl = swiper.$wrapperEl;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    if (params.cssMode) {
      return translate;
    }

    var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);

    if (rtl) {
      currentTranslate = -currentTranslate;
    }

    return currentTranslate || 0;
  }

  function setTranslate(translate, byController) {
    var swiper = this;
    var rtl = swiper.rtlTranslate;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var wrapperEl = swiper.wrapperEl;
    var progress = swiper.progress;
    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      $wrapperEl.transform("translate3d(" + x + "px, " + y + "px, " + z + "px)");
    }

    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  }

  function minTranslate() {
    return -this.snapGrid[0];
  }

  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }

  function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
    var obj;
    if (translate === void 0) translate = 0;
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    if (translateBounds === void 0) translateBounds = true;
    var swiper = this;
    var params = swiper.params;
    var wrapperEl = swiper.wrapperEl;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var minTranslate = swiper.minTranslate();
    var maxTranslate = swiper.maxTranslate();
    var newTranslate;

    if (translateBounds && translate > minTranslate) {
      newTranslate = minTranslate;
    } else if (translateBounds && translate < maxTranslate) {
      newTranslate = maxTranslate;
    } else {
      newTranslate = translate;
    } // Update progress


    swiper.updateProgress(newTranslate);

    if (params.cssMode) {
      var isH = swiper.isHorizontal();

      if (speed === 0) {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
      } else {
        // eslint-disable-next-line
        if (wrapperEl.scrollTo) {
          wrapperEl.scrollTo((obj = {}, obj[isH ? 'left' : 'top'] = -newTranslate, obj.behavior = 'smooth', obj));
        } else {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
        }
      }

      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);

      if (runCallbacks) {
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.emit('transitionEnd');
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);

      if (runCallbacks) {
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.emit('transitionStart');
      }

      if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) {
              return;
            }

            if (e.target !== this) {
              return;
            }

            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;

            if (runCallbacks) {
              swiper.emit('transitionEnd');
            }
          };
        }

        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
      }
    }

    return true;
  }

  var translate = {
    getTranslate: getTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
    translateTo: translateTo
  };

  function setTransition(duration, byController) {
    var swiper = this;

    if (!swiper.params.cssMode) {
      swiper.$wrapperEl.transition(duration);
    }

    swiper.emit('setTransition', duration, byController);
  }

  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var params = swiper.params;
    var previousIndex = swiper.previousIndex;

    if (params.cssMode) {
      return;
    }

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    var dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) {
        dir = 'next';
      } else if (activeIndex < previousIndex) {
        dir = 'prev';
      } else {
        dir = 'reset';
      }
    }

    swiper.emit('transitionStart');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionStart');
        return;
      }

      swiper.emit('slideChangeTransitionStart');

      if (dir === 'next') {
        swiper.emit('slideNextTransitionStart');
      } else {
        swiper.emit('slidePrevTransitionStart');
      }
    }
  }

  function transitionEnd$1(runCallbacks, direction) {
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var previousIndex = swiper.previousIndex;
    var params = swiper.params;
    swiper.animating = false;

    if (params.cssMode) {
      return;
    }

    swiper.setTransition(0);
    var dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) {
        dir = 'next';
      } else if (activeIndex < previousIndex) {
        dir = 'prev';
      } else {
        dir = 'reset';
      }
    }

    swiper.emit('transitionEnd');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionEnd');
        return;
      }

      swiper.emit('slideChangeTransitionEnd');

      if (dir === 'next') {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }

  var transition$1 = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd$1
  };

  function slideTo(index, speed, runCallbacks, internal) {
    var obj;
    if (index === void 0) index = 0;
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var slideIndex = index;

    if (slideIndex < 0) {
      slideIndex = 0;
    }

    var params = swiper.params;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var previousIndex = swiper.previousIndex;
    var activeIndex = swiper.activeIndex;
    var rtl = swiper.rtlTranslate;
    var wrapperEl = swiper.wrapperEl;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    var snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);

    if (snapIndex >= snapGrid.length) {
      snapIndex = snapGrid.length - 1;
    }

    if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    }

    var translate = -snapGrid[snapIndex]; // Update progress

    swiper.updateProgress(translate); // Normalize slideIndex

    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
          slideIndex = i;
        }
      }
    } // Directions locks


    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }

      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) {
          return false;
        }
      }
    }

    var direction;

    if (slideIndex > activeIndex) {
      direction = 'next';
    } else if (slideIndex < activeIndex) {
      direction = 'prev';
    } else {
      direction = 'reset';
    } // Update Index


    if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
      swiper.updateActiveIndex(slideIndex); // Update Height

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      swiper.updateSlidesClasses();

      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }

      if (direction !== 'reset') {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }

      return false;
    }

    if (params.cssMode) {
      var isH = swiper.isHorizontal();
      var t = -translate;

      if (rtl) {
        t = wrapperEl.scrollWidth - wrapperEl.offsetWidth - t;
      }

      if (speed === 0) {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      } else {
        // eslint-disable-next-line
        if (wrapperEl.scrollTo) {
          wrapperEl.scrollTo((obj = {}, obj[isH ? 'left' : 'top'] = t, obj.behavior = 'smooth', obj));
        } else {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        }
      }

      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);

      if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) {
              return;
            }

            if (e.target !== this) {
              return;
            }

            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }

        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }
    }

    return true;
  }

  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) index = 0;
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var newIndex = index;

    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideNext(speed, runCallbacks, internal) {
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    var increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup;

    if (params.loop) {
      if (animating) {
        return false;
      }

      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }

    return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slidePrev(speed, runCallbacks, internal) {
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var rtlTranslate = swiper.rtlTranslate;

    if (params.loop) {
      if (animating) {
        return false;
      }

      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }

    var translate = rtlTranslate ? swiper.translate : -swiper.translate;

    function normalize(val) {
      if (val < 0) {
        return -Math.floor(Math.abs(val));
      }

      return Math.floor(val);
    }

    var normalizedTranslate = normalize(translate);
    var normalizedSnapGrid = snapGrid.map(function (val) {
      return normalize(val);
    });
    var normalizedSlidesGrid = slidesGrid.map(function (val) {
      return normalize(val);
    });
    var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
    var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

    if (typeof prevSnap === 'undefined' && params.cssMode) {
      snapGrid.forEach(function (snap) {
        if (!prevSnap && normalizedTranslate >= snap) {
          prevSnap = snap;
        }
      });
    }

    var prevIndex;

    if (typeof prevSnap !== 'undefined') {
      prevIndex = slidesGrid.indexOf(prevSnap);

      if (prevIndex < 0) {
        prevIndex = swiper.activeIndex - 1;
      }
    }

    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideReset(speed, runCallbacks, internal) {
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideToClosest(speed, runCallbacks, internal, threshold) {
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    if (threshold === void 0) threshold = 0.5;
    var swiper = this;
    var index = swiper.activeIndex;
    var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    var snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

    if (translate >= swiper.snapGrid[snapIndex]) {
      // The current translate is on or after the current snap index, so the choice
      // is between the current index and the one after it.
      var currentSnap = swiper.snapGrid[snapIndex];
      var nextSnap = swiper.snapGrid[snapIndex + 1];

      if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      // The current translate is before the current snap index, so the choice
      // is between the current index and the one before it.
      var prevSnap = swiper.snapGrid[snapIndex - 1];
      var currentSnap$1 = swiper.snapGrid[snapIndex];

      if (translate - prevSnap <= (currentSnap$1 - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }

    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide() {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex;

    if (params.loop) {
      if (swiper.animating) {
        return;
      }

      realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

      if (params.centeredSlides) {
        if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
          swiper.loopFix();
          slideToIndex = $wrapperEl.children("." + params.slideClass + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + params.slideDuplicateClass + ")").eq(0).index();
          Utils.nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children("." + params.slideClass + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + params.slideDuplicateClass + ")").eq(0).index();
        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide
  };

  function loopCreate() {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl; // Remove duplicated slides

    $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass).remove();
    var slides = $wrapperEl.children("." + params.slideClass);

    if (params.loopFillGroupWithBlank) {
      var blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;

      if (blankSlidesNum !== params.slidesPerGroup) {
        for (var i = 0; i < blankSlidesNum; i += 1) {
          var blankNode = $(doc.createElement('div')).addClass(params.slideClass + " " + params.slideBlankClass);
          $wrapperEl.append(blankNode);
        }

        slides = $wrapperEl.children("." + params.slideClass);
      }
    }

    if (params.slidesPerView === 'auto' && !params.loopedSlides) {
      params.loopedSlides = slides.length;
    }

    swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
    swiper.loopedSlides += params.loopAdditionalSlides;

    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    var prependSlides = [];
    var appendSlides = [];
    slides.each(function (index, el) {
      var slide = $(el);

      if (index < swiper.loopedSlides) {
        appendSlides.push(el);
      }

      if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
        prependSlides.push(el);
      }

      slide.attr('data-swiper-slide-index', index);
    });

    for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
      $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
    }

    for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
      $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  }

  function loopFix() {
    var swiper = this;
    swiper.emit('beforeLoopFix');
    var activeIndex = swiper.activeIndex;
    var slides = swiper.slides;
    var loopedSlides = swiper.loopedSlides;
    var allowSlidePrev = swiper.allowSlidePrev;
    var allowSlideNext = swiper.allowSlideNext;
    var snapGrid = swiper.snapGrid;
    var rtl = swiper.rtlTranslate;
    var newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    var snapTranslate = -snapGrid[activeIndex];
    var diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

    if (activeIndex < loopedSlides) {
      newIndex = slides.length - loopedSlides * 3 + activeIndex;
      newIndex += loopedSlides;
      var slideChanged = swiper.slideTo(newIndex, 0, false, true);

      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    } else if (activeIndex >= slides.length - loopedSlides) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);

      if (slideChanged$1 && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    }

    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit('loopFix');
  }

  function loopDestroy() {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var slides = swiper.slides;
    $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + ",." + params.slideClass + "." + params.slideBlankClass).remove();
    slides.removeAttr('data-swiper-slide-index');
  }

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy
  };

  function setGrabCursor(moving) {
    var swiper = this;

    if (Support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
      return;
    }

    var el = swiper.el;
    el.style.cursor = 'move';
    el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
    el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
    el.style.cursor = moving ? 'grabbing' : 'grab';
  }

  function unsetGrabCursor() {
    var swiper = this;

    if (Support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
      return;
    }

    swiper.el.style.cursor = '';
  }

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor
  };

  function appendSlide(slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;

    if (params.loop) {
      swiper.loopDestroy();
    }

    if (_typeof(slides) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) {
          $wrapperEl.append(slides[i]);
        }
      }
    } else {
      $wrapperEl.append(slides);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
  }

  function prependSlide(slides) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    if (params.loop) {
      swiper.loopDestroy();
    }

    var newActiveIndex = activeIndex + 1;

    if (_typeof(slides) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) {
          $wrapperEl.prepend(slides[i]);
        }
      }

      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }

    swiper.slideTo(newActiveIndex, 0, false);
  }

  function addSlide(index, slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;

    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children("." + params.slideClass);
    }

    var baseLength = swiper.slides.length;

    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }

    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }

    var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
    var slidesBuffer = [];

    for (var i = baseLength - 1; i >= index; i -= 1) {
      var currentSlide = swiper.slides.eq(i);
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }

    if (_typeof(slides) === 'object' && 'length' in slides) {
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (slides[i$1]) {
          $wrapperEl.append(slides[i$1]);
        }
      }

      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      $wrapperEl.append(slides);
    }

    for (var i$2 = 0; i$2 < slidesBuffer.length; i$2 += 1) {
      $wrapperEl.append(slidesBuffer[i$2]);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }

    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeSlide(slidesIndexes) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;

    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children("." + params.slideClass);
    }

    var newActiveIndex = activeIndexBuffer;
    var indexToRemove;

    if (_typeof(slidesIndexes) === 'object' && 'length' in slidesIndexes) {
      for (var i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];

        if (swiper.slides[indexToRemove]) {
          swiper.slides.eq(indexToRemove).remove();
        }

        if (indexToRemove < newActiveIndex) {
          newActiveIndex -= 1;
        }
      }

      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;

      if (swiper.slides[indexToRemove]) {
        swiper.slides.eq(indexToRemove).remove();
      }

      if (indexToRemove < newActiveIndex) {
        newActiveIndex -= 1;
      }

      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }

    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides() {
    var swiper = this;
    var slidesIndexes = [];

    for (var i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }

    swiper.removeSlide(slidesIndexes);
  }

  var manipulation = {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    addSlide: addSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides
  };

  var Device = function Device() {
    var platform = win.navigator.platform;
    var ua = win.navigator.userAgent;
    var device = {
      ios: false,
      android: false,
      androidChrome: false,
      desktop: false,
      iphone: false,
      ipod: false,
      ipad: false,
      edge: false,
      ie: false,
      firefox: false,
      macos: false,
      windows: false,
      cordova: !!(win.cordova || win.phonegap),
      phonegap: !!(win.cordova || win.phonegap),
      electron: false
    };
    var screenWidth = win.screen.width;
    var screenHeight = win.screen.height;
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    var ie = ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
    var edge = ua.indexOf('Edge/') >= 0;
    var firefox = ua.indexOf('Gecko/') >= 0 && ua.indexOf('Firefox/') >= 0;
    var windows = platform === 'Win32';
    var electron = ua.toLowerCase().indexOf('electron') >= 0;
    var macos = platform === 'MacIntel'; // iPadOs 13 fix

    if (!ipad && macos && Support.touch && (screenWidth === 1024 && screenHeight === 1366 || // Pro 12.9
    screenWidth === 834 && screenHeight === 1194 // Pro 11
    || screenWidth === 834 && screenHeight === 1112 // Pro 10.5
    || screenWidth === 768 && screenHeight === 1024 // other
    )) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      macos = false;
    }

    device.ie = ie;
    device.edge = edge;
    device.firefox = firefox; // Android

    if (android && !windows) {
      device.os = 'android';
      device.osVersion = android[2];
      device.android = true;
      device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }

    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    } // iOS


    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    }

    if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    }

    if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      device.ipod = true;
    } // iOS 8+ changed UA


    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
    } // Webview


    device.webView = !!((iphone || ipad || ipod) && (ua.match(/.*AppleWebKit(?!.*Safari)/i) || win.navigator.standalone)) || win.matchMedia && win.matchMedia('(display-mode: standalone)').matches;
    device.webview = device.webView;
    device.standalone = device.webView; // Desktop

    device.desktop = !(device.ios || device.android) || electron;

    if (device.desktop) {
      device.electron = electron;
      device.macos = macos;
      device.windows = windows;

      if (device.macos) {
        device.os = 'macos';
      }

      if (device.windows) {
        device.os = 'windows';
      }
    } // Pixel Ratio


    device.pixelRatio = win.devicePixelRatio || 1; // Export object

    return device;
  }();

  function onTouchStart(event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }

    var e = event;

    if (e.originalEvent) {
      e = e.originalEvent;
    }

    var $targetEl = $(e.target);

    if (params.touchEventsTarget === 'wrapper') {
      if (!$targetEl.closest(swiper.wrapperEl).length) {
        return;
      }
    }

    data.isTouchEvent = e.type === 'touchstart';

    if (!data.isTouchEvent && 'which' in e && e.which === 3) {
      return;
    }

    if (!data.isTouchEvent && 'button' in e && e.button > 0) {
      return;
    }

    if (data.isTouched && data.isMoved) {
      return;
    }

    if (params.noSwiping && $targetEl.closest(params.noSwipingSelector ? params.noSwipingSelector : "." + params.noSwipingClass)[0]) {
      swiper.allowClick = true;
      return;
    }

    if (params.swipeHandler) {
      if (!$targetEl.closest(params.swipeHandler)[0]) {
        return;
      }
    }

    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

    var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= win.screen.width - edgeSwipeThreshold)) {
      return;
    }

    Utils.extend(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = Utils.now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;

    if (params.threshold > 0) {
      data.allowThresholdMove = false;
    }

    if (e.type !== 'touchstart') {
      var preventDefault = true;

      if ($targetEl.is(data.formElements)) {
        preventDefault = false;
      }

      if (doc.activeElement && $(doc.activeElement).is(data.formElements) && doc.activeElement !== $targetEl[0]) {
        doc.activeElement.blur();
      }

      var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

      if (params.touchStartForcePreventDefault || shouldPreventDefault) {
        e.preventDefault();
      }
    }

    swiper.emit('touchStart', e);
  }

  function onTouchMove(event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var e = event;

    if (e.originalEvent) {
      e = e.originalEvent;
    }

    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }

      return;
    }

    if (data.isTouchEvent && e.type !== 'touchmove') {
      return;
    }

    var targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
    var pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;

    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }

    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;

      if (data.isTouched) {
        Utils.extend(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = Utils.now();
      }

      return;
    }

    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
        return;
      }
    }

    if (data.isTouchEvent && doc.activeElement) {
      if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }

    if (data.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }

    if (e.targetTouches && e.targetTouches.length > 1) {
      return;
    }

    touches.currentX = pageX;
    touches.currentY = pageY;
    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;

    if (swiper.params.threshold && Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) < swiper.params.threshold) {
      return;
    }

    if (typeof data.isScrolling === 'undefined') {
      var touchAngle;

      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }

    if (data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }

    if (typeof data.startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }

    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }

    if (!data.startMoving) {
      return;
    }

    swiper.allowClick = false;

    if (!params.cssMode && e.cancelable) {
      e.preventDefault();
    }

    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }

      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);

      if (swiper.animating) {
        swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
      }

      data.allowMomentumBounce = false; // Grab Cursor

      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }

      swiper.emit('sliderFirstMove', e);
    }

    swiper.emit('sliderMove', e);
    data.isMoved = true;
    var diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;
    diff *= params.touchRatio;

    if (rtl) {
      diff = -diff;
    }

    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    data.currentTranslate = diff + data.startTranslate;
    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;

    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }

    if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;

      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data.startTranslate + diff, resistanceRatio);
      }
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;

      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data.startTranslate - diff, resistanceRatio);
      }
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    } // Directions locks


    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }

    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    } // Threshold


    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger || params.cssMode) {
      return;
    } // Update active index in free mode


    if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }

    if (params.freeMode) {
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data.touchStartTime
        });
      }

      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: Utils.now()
      });
    } // Update progress


    swiper.updateProgress(data.currentTranslate); // Update translate

    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd(event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var e = event;

    if (e.originalEvent) {
      e = e.originalEvent;
    }

    if (data.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }

    data.allowTouchCallbacks = false;

    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }

      data.isMoved = false;
      data.startMoving = false;
      return;
    } // Return Grab Cursor


    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    } // Time diff


    var touchEndTime = Utils.now();
    var timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit('tap click', e);

      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit('doubleTap doubleClick', e);
      }
    }

    data.lastClickTime = Utils.now();
    Utils.nextTick(function () {
      if (!swiper.destroyed) {
        swiper.allowClick = true;
      }
    });

    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }

    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    var currentPos;

    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.cssMode) {
      return;
    }

    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }

        return;
      }

      if (params.freeModeMomentum) {
        if (data.velocities.length > 1) {
          var lastMoveEvent = data.velocities.pop();
          var velocityEvent = data.velocities.pop();
          var distance = lastMoveEvent.position - velocityEvent.position;
          var time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;

          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          } // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.


          if (time > 150 || Utils.now() - lastMoveEvent.time > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }

        swiper.velocity *= params.freeModeMomentumVelocityRatio;
        data.velocities.length = 0;
        var momentumDuration = 1000 * params.freeModeMomentumRatio;
        var momentumDistance = swiper.velocity * momentumDuration;
        var newPosition = swiper.translate + momentumDistance;

        if (rtl) {
          newPosition = -newPosition;
        }

        var doBounce = false;
        var afterBouncePosition;
        var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        var needsLoopFix;

        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }

            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }

          if (params.loop && params.centeredSlides) {
            needsLoopFix = true;
          }
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }

            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }

          if (params.loop && params.centeredSlides) {
            needsLoopFix = true;
          }
        } else if (params.freeModeSticky) {
          var nextSlide;

          for (var j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }

          newPosition = -newPosition;
        }

        if (needsLoopFix) {
          swiper.once('transitionEnd', function () {
            swiper.loopFix();
          });
        } // Fix duration


        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }

          if (params.freeModeSticky) {
            // If freeModeSticky is active and the user ends a swipe with a slow-velocity
            // event, then durations can be 20+ seconds to slide one (or zero!) slides.
            // It's easy to see this when simulating touch with mouse events. To fix this,
            // limit single-slide swipes to the default slide duration. This also has the
            // nice side effect of matching slide speed if the user stopped moving before
            // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
            // For faster swipes, also apply limits (albeit higher ones).
            var moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
            var currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];

            if (moveDistance < currentSlideSize) {
              momentumDuration = params.speed;
            } else if (moveDistance < 2 * currentSlideSize) {
              momentumDuration = params.speed * 1.5;
            } else {
              momentumDuration = params.speed * 2.5;
            }
          }
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) {
              return;
            }

            swiper.emit('momentumBounce');
            swiper.setTransition(params.speed);
            setTimeout(function () {
              swiper.setTranslate(afterBouncePosition);
              $wrapperEl.transitionEnd(function () {
                if (!swiper || swiper.destroyed) {
                  return;
                }

                swiper.transitionEnd();
              });
            }, 0);
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);

          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) {
                return;
              }

              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      return;
    } // Find current slide


    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];

    for (var i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
      var increment$1 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

      if (typeof slidesGrid[i + increment$1] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment$1]) {
          stopIndex = i;
          groupSize = slidesGrid[i + increment$1] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    } // Find current slide size


    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    var increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) {
          swiper.slideTo(stopIndex + increment);
        } else {
          swiper.slideTo(stopIndex);
        }
      }

      if (swiper.swipeDirection === 'prev') {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper.slideTo(stopIndex + increment);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      var isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === 'next') {
          swiper.slideTo(stopIndex + increment);
        }

        if (swiper.swipeDirection === 'prev') {
          swiper.slideTo(stopIndex);
        }
      } else if (e.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize() {
    var swiper = this;
    var params = swiper.params;
    var el = swiper.el;

    if (el && el.offsetWidth === 0) {
      return;
    } // Breakpoints


    if (params.breakpoints) {
      swiper.setBreakpoint();
    } // Save locks


    var allowSlideNext = swiper.allowSlideNext;
    var allowSlidePrev = swiper.allowSlidePrev;
    var snapGrid = swiper.snapGrid; // Disable locks on resize

    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();

    if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }

    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      swiper.autoplay.run();
    } // Return locks after resize


    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick(e) {
    var swiper = this;

    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) {
        e.preventDefault();
      }

      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function onScroll() {
    var swiper = this;
    var wrapperEl = swiper.wrapperEl;
    var rtlTranslate = swiper.rtlTranslate;
    swiper.previousTranslate = swiper.translate;

    if (swiper.isHorizontal()) {
      if (rtlTranslate) {
        swiper.translate = wrapperEl.scrollWidth - wrapperEl.offsetWidth - wrapperEl.scrollLeft;
      } else {
        swiper.translate = -wrapperEl.scrollLeft;
      }
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    } // eslint-disable-next-line


    if (swiper.translate === -0) {
      swiper.translate = 0;
    }

    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== swiper.progress) {
      swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
    }

    swiper.emit('setTranslate', swiper.translate, false);
  }

  var dummyEventAttached = false;

  function dummyEventListener() {}

  function attachEvents() {
    var swiper = this;
    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);

    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);
    var capture = !!params.nested; // Touch Events

    if (!Support.touch && Support.pointerEvents) {
      el.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        el.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        el.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? {
          passive: false,
          capture: capture
        } : capture);
        el.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);

        if (touchEvents.cancel) {
          el.addEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }

        if (!dummyEventAttached) {
          doc.addEventListener('touchstart', dummyEventListener);
          dummyEventAttached = true;
        }
      }

      if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
        el.addEventListener('mousedown', swiper.onTouchStart, false);
        doc.addEventListener('mousemove', swiper.onTouchMove, capture);
        doc.addEventListener('mouseup', swiper.onTouchEnd, false);
      }
    } // Prevent Links Clicks


    if (params.preventClicks || params.preventClicksPropagation) {
      el.addEventListener('click', swiper.onClick, true);
    }

    if (params.cssMode) {
      wrapperEl.addEventListener('scroll', swiper.onScroll);
    } // Resize handler


    if (params.updateOnWindowResize) {
      swiper.on(Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
    } else {
      swiper.on('observerUpdate', onResize, true);
    }
  }

  function detachEvents() {
    var swiper = this;
    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;
    var capture = !!params.nested; // Touch Events

    if (!Support.touch && Support.pointerEvents) {
      el.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        el.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        el.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        el.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);

        if (touchEvents.cancel) {
          el.removeEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
      }

      if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
        el.removeEventListener('mousedown', swiper.onTouchStart, false);
        doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
        doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
      }
    } // Prevent Links Clicks


    if (params.preventClicks || params.preventClicksPropagation) {
      el.removeEventListener('click', swiper.onClick, true);
    }

    if (params.cssMode) {
      wrapperEl.removeEventListener('scroll', swiper.onScroll);
    } // Resize handler


    swiper.off(Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize);
  }

  var events = {
    attachEvents: attachEvents,
    detachEvents: detachEvents
  };

  function setBreakpoint() {
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var initialized = swiper.initialized;
    var loopedSlides = swiper.loopedSlides;
    if (loopedSlides === void 0) loopedSlides = 0;
    var params = swiper.params;
    var $el = swiper.$el;
    var breakpoints = params.breakpoints;

    if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) {
      return;
    } // Get breakpoint for window width and update parameters


    var breakpoint = swiper.getBreakpoint(breakpoints);

    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;

      if (breakpointOnlyParams) {
        ['slidesPerView', 'spaceBetween', 'slidesPerGroup', 'slidesPerGroupSkip', 'slidesPerColumn'].forEach(function (param) {
          var paramValue = breakpointOnlyParams[param];

          if (typeof paramValue === 'undefined') {
            return;
          }

          if (param === 'slidesPerView' && (paramValue === 'AUTO' || paramValue === 'auto')) {
            breakpointOnlyParams[param] = 'auto';
          } else if (param === 'slidesPerView') {
            breakpointOnlyParams[param] = parseFloat(paramValue);
          } else {
            breakpointOnlyParams[param] = parseInt(paramValue, 10);
          }
        });
      }

      var breakpointParams = breakpointOnlyParams || swiper.originalParams;
      var wasMultiRow = params.slidesPerColumn > 1;
      var isMultiRow = breakpointParams.slidesPerColumn > 1;

      if (wasMultiRow && !isMultiRow) {
        $el.removeClass(params.containerModifierClass + "multirow " + params.containerModifierClass + "multirow-column");
      } else if (!wasMultiRow && isMultiRow) {
        $el.addClass(params.containerModifierClass + "multirow");

        if (breakpointParams.slidesPerColumnFill === 'column') {
          $el.addClass(params.containerModifierClass + "multirow-column");
        }
      }

      var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      Utils.extend(swiper.params, breakpointParams);
      Utils.extend(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev
      });
      swiper.currentBreakpoint = breakpoint;

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakpointParams);
    }
  }

  function getBreakpoint(breakpoints) {
    // Get breakpoint for window width
    if (!breakpoints) {
      return undefined;
    }

    var breakpoint = false;
    var points = Object.keys(breakpoints).map(function (point) {
      if (typeof point === 'string' && point.indexOf('@') === 0) {
        var minRatio = parseFloat(point.substr(1));
        var value = win.innerHeight * minRatio;
        return {
          value: value,
          point: point
        };
      }

      return {
        value: point,
        point: point
      };
    });
    points.sort(function (a, b) {
      return parseInt(a.value, 10) - parseInt(b.value, 10);
    });

    for (var i = 0; i < points.length; i += 1) {
      var ref = points[i];
      var point = ref.point;
      var value = ref.value;

      if (value <= win.innerWidth) {
        breakpoint = point;
      }
    }

    return breakpoint || 'max';
  }

  var breakpoints = {
    setBreakpoint: setBreakpoint,
    getBreakpoint: getBreakpoint
  };

  function addClasses() {
    var swiper = this;
    var classNames = swiper.classNames;
    var params = swiper.params;
    var rtl = swiper.rtl;
    var $el = swiper.$el;
    var suffixes = [];
    suffixes.push('initialized');
    suffixes.push(params.direction);

    if (params.freeMode) {
      suffixes.push('free-mode');
    }

    if (params.autoHeight) {
      suffixes.push('autoheight');
    }

    if (rtl) {
      suffixes.push('rtl');
    }

    if (params.slidesPerColumn > 1) {
      suffixes.push('multirow');

      if (params.slidesPerColumnFill === 'column') {
        suffixes.push('multirow-column');
      }
    }

    if (Device.android) {
      suffixes.push('android');
    }

    if (Device.ios) {
      suffixes.push('ios');
    }

    if (params.cssMode) {
      suffixes.push('css-mode');
    }

    suffixes.forEach(function (suffix) {
      classNames.push(params.containerModifierClass + suffix);
    });
    $el.addClass(classNames.join(' '));
  }

  function removeClasses() {
    var swiper = this;
    var $el = swiper.$el;
    var classNames = swiper.classNames;
    $el.removeClass(classNames.join(' '));
  }

  var classes = {
    addClasses: addClasses,
    removeClasses: removeClasses
  };

  function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
    var image;

    function onReady() {
      if (callback) {
        callback();
      }
    }

    var isPicture = $(imageEl).parent('picture')[0];

    if (!isPicture && (!imageEl.complete || !checkForComplete)) {
      if (src) {
        image = new win.Image();
        image.onload = onReady;
        image.onerror = onReady;

        if (sizes) {
          image.sizes = sizes;
        }

        if (srcset) {
          image.srcset = srcset;
        }

        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  }

  function preloadImages() {
    var swiper = this;
    swiper.imagesToLoad = swiper.$el.find('img');

    function onReady() {
      if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) {
        return;
      }

      if (swiper.imagesLoaded !== undefined) {
        swiper.imagesLoaded += 1;
      }

      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) {
          swiper.update();
        }

        swiper.emit('imagesReady');
      }
    }

    for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
      var imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
    }
  }

  var images = {
    loadImage: loadImage,
    preloadImages: preloadImages
  };

  function checkOverflow() {
    var swiper = this;
    var params = swiper.params;
    var wasLocked = swiper.isLocked;
    var lastSlidePosition = swiper.slides.length > 0 && params.slidesOffsetBefore + params.spaceBetween * (swiper.slides.length - 1) + swiper.slides[0].offsetWidth * swiper.slides.length;

    if (params.slidesOffsetBefore && params.slidesOffsetAfter && lastSlidePosition) {
      swiper.isLocked = lastSlidePosition <= swiper.size;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }

    swiper.allowSlideNext = !swiper.isLocked;
    swiper.allowSlidePrev = !swiper.isLocked; // events

    if (wasLocked !== swiper.isLocked) {
      swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
    }

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
      swiper.navigation.update();
    }
  }

  var checkOverflow$1 = {
    checkOverflow: checkOverflow
  };
  var defaults = {
    init: true,
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    //
    preventInteractionOnTransition: false,
    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: 'slide',
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: undefined,
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: false,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // Images
    preloadImages: true,
    updateOnImagesReady: true,
    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    // NS
    containerModifierClass: 'swiper-container-',
    // NEW
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',
    // Callbacks
    runCallbacksOnInit: true
  };
  /* eslint no-param-reassign: "off" */

  var prototypes = {
    update: update,
    translate: translate,
    transition: transition$1,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    manipulation: manipulation,
    events: events,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes,
    images: images
  };
  var extendedDefaults = {};

  var Swiper = /*@__PURE__*/function (SwiperClass) {
    function Swiper() {
      var assign;
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      var el;
      var params;

      if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
        params = args[0];
      } else {
        assign = args, el = assign[0], params = assign[1];
      }

      if (!params) {
        params = {};
      }

      params = Utils.extend({}, params);

      if (el && !params.el) {
        params.el = el;
      }

      SwiperClass.call(this, params);
      Object.keys(prototypes).forEach(function (prototypeGroup) {
        Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
          if (!Swiper.prototype[protoMethod]) {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
          }
        });
      }); // Swiper Instance

      var swiper = this;

      if (typeof swiper.modules === 'undefined') {
        swiper.modules = {};
      }

      Object.keys(swiper.modules).forEach(function (moduleName) {
        var module = swiper.modules[moduleName];

        if (module.params) {
          var moduleParamName = Object.keys(module.params)[0];
          var moduleParams = module.params[moduleParamName];

          if (_typeof(moduleParams) !== 'object' || moduleParams === null) {
            return;
          }

          if (!(moduleParamName in params && 'enabled' in moduleParams)) {
            return;
          }

          if (params[moduleParamName] === true) {
            params[moduleParamName] = {
              enabled: true
            };
          }

          if (_typeof(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
            params[moduleParamName].enabled = true;
          }

          if (!params[moduleParamName]) {
            params[moduleParamName] = {
              enabled: false
            };
          }
        }
      }); // Extend defaults with modules params

      var swiperParams = Utils.extend({}, defaults);
      swiper.useModulesParams(swiperParams); // Extend defaults with passed params

      swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = Utils.extend({}, swiper.params);
      swiper.passedParams = Utils.extend({}, params); // Save Dom lib

      swiper.$ = $; // Find el

      var $el = $(swiper.params.el);
      el = $el[0];

      if (!el) {
        return undefined;
      }

      if ($el.length > 1) {
        var swipers = [];
        $el.each(function (index, containerEl) {
          var newParams = Utils.extend({}, params, {
            el: containerEl
          });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }

      el.swiper = swiper;
      $el.data('swiper', swiper); // Find Wrapper

      var $wrapperEl;

      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        $wrapperEl = $(el.shadowRoot.querySelector("." + swiper.params.wrapperClass)); // Children needs to return slot items

        $wrapperEl.children = function (options) {
          return $el.children(options);
        };
      } else {
        $wrapperEl = $el.children("." + swiper.params.wrapperClass);
      } // Extend Swiper


      Utils.extend(swiper, {
        $el: $el,
        el: el,
        $wrapperEl: $wrapperEl,
        wrapperEl: $wrapperEl[0],
        // Classes
        classNames: [],
        // Slides
        slides: $(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },
        isVertical: function isVertical() {
          return swiper.params.direction === 'vertical';
        },
        // RTL
        rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEvents: function touchEvents() {
          var touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
          var desktop = ['mousedown', 'mousemove', 'mouseup'];

          if (Support.pointerEvents) {
            desktop = ['pointerdown', 'pointermove', 'pointerup'];
          }

          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2],
            cancel: touch[3]
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2]
          };
          return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
        }(),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: 'input, select, option, textarea, button, video, label',
          // Last click time
          lastClickTime: Utils.now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0
      }); // Install Modules

      swiper.useModules(); // Init

      if (swiper.params.init) {
        swiper.init();
      } // Return app instance


      return swiper;
    }

    if (SwiperClass) Swiper.__proto__ = SwiperClass;
    Swiper.prototype = Object.create(SwiperClass && SwiperClass.prototype);
    Swiper.prototype.constructor = Swiper;
    var staticAccessors = {
      extendedDefaults: {
        configurable: true
      },
      defaults: {
        configurable: true
      },
      Class: {
        configurable: true
      },
      $: {
        configurable: true
      }
    };

    Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic() {
      var swiper = this;
      var params = swiper.params;
      var slides = swiper.slides;
      var slidesGrid = swiper.slidesGrid;
      var swiperSize = swiper.size;
      var activeIndex = swiper.activeIndex;
      var spv = 1;

      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;

        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;

            if (slideSize > swiperSize) {
              breakLoop = true;
            }
          }
        }

        for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
          if (slides[i$1] && !breakLoop) {
            slideSize += slides[i$1].swiperSlideSize;
            spv += 1;

            if (slideSize > swiperSize) {
              breakLoop = true;
            }
          }
        }
      } else {
        for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
          if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }

      return spv;
    };

    Swiper.prototype.update = function update() {
      var swiper = this;

      if (!swiper || swiper.destroyed) {
        return;
      }

      var snapGrid = swiper.snapGrid;
      var params = swiper.params; // Breakpoints

      if (params.breakpoints) {
        swiper.setBreakpoint();
      }

      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      var translated;

      if (swiper.params.freeMode) {
        setTranslate();

        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }

        if (!translated) {
          setTranslate();
        }
      }

      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }

      swiper.emit('update');
    };

    Swiper.prototype.changeDirection = function changeDirection(newDirection, needUpdate) {
      if (needUpdate === void 0) needUpdate = true;
      var swiper = this;
      var currentDirection = swiper.params.direction;

      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }

      if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
        return swiper;
      }

      swiper.$el.removeClass("" + swiper.params.containerModifierClass + currentDirection).addClass("" + swiper.params.containerModifierClass + newDirection);
      swiper.params.direction = newDirection;
      swiper.slides.each(function (slideIndex, slideEl) {
        if (newDirection === 'vertical') {
          slideEl.style.width = '';
        } else {
          slideEl.style.height = '';
        }
      });
      swiper.emit('changeDirection');

      if (needUpdate) {
        swiper.update();
      }

      return swiper;
    };

    Swiper.prototype.init = function init() {
      var swiper = this;

      if (swiper.initialized) {
        return;
      }

      swiper.emit('beforeInit'); // Set breakpoint

      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      } // Add Classes


      swiper.addClasses(); // Create loop

      if (swiper.params.loop) {
        swiper.loopCreate();
      } // Update size


      swiper.updateSize(); // Update slides

      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      } // Set Grab Cursor


      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      } // Slide To Initial Slide


      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      } // Attach events


      swiper.attachEvents(); // Init Flag

      swiper.initialized = true; // Emit

      swiper.emit('init');
    };

    Swiper.prototype.destroy = function destroy(deleteInstance, cleanStyles) {
      if (deleteInstance === void 0) deleteInstance = true;
      if (cleanStyles === void 0) cleanStyles = true;
      var swiper = this;
      var params = swiper.params;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;

      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy'); // Init Flag

      swiper.initialized = false; // Detach events

      swiper.detachEvents(); // Destroy loop

      if (params.loop) {
        swiper.loopDestroy();
      } // Cleanup styles


      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');

        if (slides && slides.length) {
          slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index');
        }
      }

      swiper.emit('destroy'); // Detach emitter events

      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        swiper.$el.data('swiper', null);
        Utils.deleteProps(swiper);
      }

      swiper.destroyed = true;
      return null;
    };

    Swiper.extendDefaults = function extendDefaults(newDefaults) {
      Utils.extend(extendedDefaults, newDefaults);
    };

    staticAccessors.extendedDefaults.get = function () {
      return extendedDefaults;
    };

    staticAccessors.defaults.get = function () {
      return defaults;
    };

    staticAccessors.Class.get = function () {
      return SwiperClass;
    };

    staticAccessors.$.get = function () {
      return $;
    };

    Object.defineProperties(Swiper, staticAccessors);
    return Swiper;
  }(SwiperClass);

  var Device$1 = {
    name: 'device',
    proto: {
      device: Device
    },
    static: {
      device: Device
    }
  };
  var Support$1 = {
    name: 'support',
    proto: {
      support: Support
    },
    static: {
      support: Support
    }
  };

  var Browser = function Browser() {
    function isSafari() {
      var ua = win.navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
    }

    return {
      isEdge: !!win.navigator.userAgent.match(/Edge/g),
      isSafari: isSafari(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent)
    };
  }();

  var Browser$1 = {
    name: 'browser',
    proto: {
      browser: Browser
    },
    static: {
      browser: Browser
    }
  };
  var Resize = {
    name: 'resize',
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        resize: {
          resizeHandler: function resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) {
              return;
            }

            swiper.emit('beforeResize');
            swiper.emit('resize');
          },
          orientationChangeHandler: function orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) {
              return;
            }

            swiper.emit('orientationchange');
          }
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this; // Emit resize

        win.addEventListener('resize', swiper.resize.resizeHandler); // Emit orientationchange

        win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
      destroy: function destroy() {
        var swiper = this;
        win.removeEventListener('resize', swiper.resize.resizeHandler);
        win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      }
    }
  };
  var Observer = {
    func: win.MutationObserver || win.WebkitMutationObserver,
    attach: function attach(target, options) {
      if (options === void 0) options = {};
      var swiper = this;
      var ObserverFunc = Observer.func;
      var observer = new ObserverFunc(function (mutations) {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (mutations.length === 1) {
          swiper.emit('observerUpdate', mutations[0]);
          return;
        }

        var observerUpdate = function observerUpdate() {
          swiper.emit('observerUpdate', mutations[0]);
        };

        if (win.requestAnimationFrame) {
          win.requestAnimationFrame(observerUpdate);
        } else {
          win.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData
      });
      swiper.observer.observers.push(observer);
    },
    init: function init() {
      var swiper = this;

      if (!Support.observer || !swiper.params.observer) {
        return;
      }

      if (swiper.params.observeParents) {
        var containerParents = swiper.$el.parents();

        for (var i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      } // Observe container


      swiper.observer.attach(swiper.$el[0], {
        childList: swiper.params.observeSlideChildren
      }); // Observe wrapper

      swiper.observer.attach(swiper.$wrapperEl[0], {
        attributes: false
      });
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.observers.forEach(function (observer) {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    }
  };
  var Observer$1 = {
    name: 'observer',
    params: {
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        observer: {
          init: Observer.init.bind(swiper),
          attach: Observer.attach.bind(swiper),
          destroy: Observer.destroy.bind(swiper),
          observers: []
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.observer.init();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.observer.destroy();
      }
    }
  };
  var Virtual = {
    update: function update(force) {
      var swiper = this;
      var ref = swiper.params;
      var slidesPerView = ref.slidesPerView;
      var slidesPerGroup = ref.slidesPerGroup;
      var centeredSlides = ref.centeredSlides;
      var ref$1 = swiper.params.virtual;
      var addSlidesBefore = ref$1.addSlidesBefore;
      var addSlidesAfter = ref$1.addSlidesAfter;
      var ref$2 = swiper.virtual;
      var previousFrom = ref$2.from;
      var previousTo = ref$2.to;
      var slides = ref$2.slides;
      var previousSlidesGrid = ref$2.slidesGrid;
      var renderSlide = ref$2.renderSlide;
      var previousOffset = ref$2.offset;
      swiper.updateActiveIndex();
      var activeIndex = swiper.activeIndex || 0;
      var offsetProp;

      if (swiper.rtlTranslate) {
        offsetProp = 'right';
      } else {
        offsetProp = swiper.isHorizontal() ? 'left' : 'top';
      }

      var slidesAfter;
      var slidesBefore;

      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesBefore;
        slidesBefore = slidesPerGroup + addSlidesAfter;
      }

      var from = Math.max((activeIndex || 0) - slidesBefore, 0);
      var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
      Utils.extend(swiper.virtual, {
        from: from,
        to: to,
        offset: offset,
        slidesGrid: swiper.slidesGrid
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.css(offsetProp, offset + "px");
        }

        swiper.updateProgress();
        return;
      }

      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset: offset,
          from: from,
          to: to,
          slides: function getSlides() {
            var slidesToRender = [];

            for (var i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }

            return slidesToRender;
          }()
        });
        onRendered();
        return;
      }

      var prependIndexes = [];
      var appendIndexes = [];

      if (force) {
        swiper.$wrapperEl.find("." + swiper.params.slideClass).remove();
      } else {
        for (var i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl.find("." + swiper.params.slideClass + "[data-swiper-slide-index=\"" + i + "\"]").remove();
          }
        }
      }

      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (i$1 >= from && i$1 <= to) {
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(i$1);
          } else {
            if (i$1 > previousTo) {
              appendIndexes.push(i$1);
            }

            if (i$1 < previousFrom) {
              prependIndexes.push(i$1);
            }
          }
        }
      }

      appendIndexes.forEach(function (index) {
        swiper.$wrapperEl.append(renderSlide(slides[index], index));
      });
      prependIndexes.sort(function (a, b) {
        return b - a;
      }).forEach(function (index) {
        swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
      swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, offset + "px");
      onRendered();
    },
    renderSlide: function renderSlide(slide, index) {
      var swiper = this;
      var params = swiper.params.virtual;

      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }

      var $slideEl = params.renderSlide ? $(params.renderSlide.call(swiper, slide, index)) : $("<div class=\"" + swiper.params.slideClass + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>");

      if (!$slideEl.attr('data-swiper-slide-index')) {
        $slideEl.attr('data-swiper-slide-index', index);
      }

      if (params.cache) {
        swiper.virtual.cache[index] = $slideEl;
      }

      return $slideEl;
    },
    appendSlide: function appendSlide(slides) {
      var swiper = this;

      if (_typeof(slides) === 'object' && 'length' in slides) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) {
            swiper.virtual.slides.push(slides[i]);
          }
        }
      } else {
        swiper.virtual.slides.push(slides);
      }

      swiper.virtual.update(true);
    },
    prependSlide: function prependSlide(slides) {
      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var newActiveIndex = activeIndex + 1;
      var numberOfNewSlides = 1;

      if (Array.isArray(slides)) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) {
            swiper.virtual.slides.unshift(slides[i]);
          }
        }

        newActiveIndex = activeIndex + slides.length;
        numberOfNewSlides = slides.length;
      } else {
        swiper.virtual.slides.unshift(slides);
      }

      if (swiper.params.virtual.cache) {
        var cache = swiper.virtual.cache;
        var newCache = {};
        Object.keys(cache).forEach(function (cachedIndex) {
          var $cachedEl = cache[cachedIndex];
          var cachedElIndex = $cachedEl.attr('data-swiper-slide-index');

          if (cachedElIndex) {
            $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + 1);
          }

          newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
        });
        swiper.virtual.cache = newCache;
      }

      swiper.virtual.update(true);
      swiper.slideTo(newActiveIndex, 0);
    },
    removeSlide: function removeSlide(slidesIndexes) {
      var swiper = this;

      if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) {
        return;
      }

      var activeIndex = swiper.activeIndex;

      if (Array.isArray(slidesIndexes)) {
        for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
          swiper.virtual.slides.splice(slidesIndexes[i], 1);

          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes[i]];
          }

          if (slidesIndexes[i] < activeIndex) {
            activeIndex -= 1;
          }

          activeIndex = Math.max(activeIndex, 0);
        }
      } else {
        swiper.virtual.slides.splice(slidesIndexes, 1);

        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes];
        }

        if (slidesIndexes < activeIndex) {
          activeIndex -= 1;
        }

        activeIndex = Math.max(activeIndex, 0);
      }

      swiper.virtual.update(true);
      swiper.slideTo(activeIndex, 0);
    },
    removeAllSlides: function removeAllSlides() {
      var swiper = this;
      swiper.virtual.slides = [];

      if (swiper.params.virtual.cache) {
        swiper.virtual.cache = {};
      }

      swiper.virtual.update(true);
      swiper.slideTo(0, 0);
    }
  };
  var Virtual$1 = {
    name: 'virtual',
    params: {
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        virtual: {
          update: Virtual.update.bind(swiper),
          appendSlide: Virtual.appendSlide.bind(swiper),
          prependSlide: Virtual.prependSlide.bind(swiper),
          removeSlide: Virtual.removeSlide.bind(swiper),
          removeAllSlides: Virtual.removeAllSlides.bind(swiper),
          renderSlide: Virtual.renderSlide.bind(swiper),
          slides: swiper.params.virtual.slides,
          cache: {}
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (!swiper.params.virtual.enabled) {
          return;
        }

        swiper.classNames.push(swiper.params.containerModifierClass + "virtual");
        var overwriteParams = {
          watchSlidesProgress: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);

        if (!swiper.params.initialSlide) {
          swiper.virtual.update();
        }
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (!swiper.params.virtual.enabled) {
          return;
        }

        swiper.virtual.update();
      }
    }
  };
  var Keyboard = {
    handle: function handle(event) {
      var swiper = this;
      var rtl = swiper.rtlTranslate;
      var e = event;

      if (e.originalEvent) {
        e = e.originalEvent;
      } // jquery fix


      var kc = e.keyCode || e.charCode; // Directions locks

      if (!swiper.allowSlideNext && (swiper.isHorizontal() && kc === 39 || swiper.isVertical() && kc === 40 || kc === 34)) {
        return false;
      }

      if (!swiper.allowSlidePrev && (swiper.isHorizontal() && kc === 37 || swiper.isVertical() && kc === 38 || kc === 33)) {
        return false;
      }

      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }

      if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return undefined;
      }

      if (swiper.params.keyboard.onlyInViewport && (kc === 33 || kc === 34 || kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
        var inView = false; // Check that swiper should be inside of visible area of window

        if (swiper.$el.parents("." + swiper.params.slideClass).length > 0 && swiper.$el.parents("." + swiper.params.slideActiveClass).length === 0) {
          return undefined;
        }

        var windowWidth = win.innerWidth;
        var windowHeight = win.innerHeight;
        var swiperOffset = swiper.$el.offset();

        if (rtl) {
          swiperOffset.left -= swiper.$el[0].scrollLeft;
        }

        var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];

        for (var i = 0; i < swiperCoord.length; i += 1) {
          var point = swiperCoord[i];

          if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
            inView = true;
          }
        }

        if (!inView) {
          return undefined;
        }
      }

      if (swiper.isHorizontal()) {
        if (kc === 33 || kc === 34 || kc === 37 || kc === 39) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }

        if ((kc === 34 || kc === 39) && !rtl || (kc === 33 || kc === 37) && rtl) {
          swiper.slideNext();
        }

        if ((kc === 33 || kc === 37) && !rtl || (kc === 34 || kc === 39) && rtl) {
          swiper.slidePrev();
        }
      } else {
        if (kc === 33 || kc === 34 || kc === 38 || kc === 40) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }

        if (kc === 34 || kc === 40) {
          swiper.slideNext();
        }

        if (kc === 33 || kc === 38) {
          swiper.slidePrev();
        }
      }

      swiper.emit('keyPress', kc);
      return undefined;
    },
    enable: function enable() {
      var swiper = this;

      if (swiper.keyboard.enabled) {
        return;
      }

      $(doc).on('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = true;
    },
    disable: function disable() {
      var swiper = this;

      if (!swiper.keyboard.enabled) {
        return;
      }

      $(doc).off('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = false;
    }
  };
  var Keyboard$1 = {
    name: 'keyboard',
    params: {
      keyboard: {
        enabled: false,
        onlyInViewport: true
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        keyboard: {
          enabled: false,
          enable: Keyboard.enable.bind(swiper),
          disable: Keyboard.disable.bind(swiper),
          handle: Keyboard.handle.bind(swiper)
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.keyboard.enabled) {
          swiper.keyboard.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;

        if (swiper.keyboard.enabled) {
          swiper.keyboard.disable();
        }
      }
    }
  };

  function isEventSupported() {
    var eventName = 'onwheel';
    var isSupported = (eventName in doc);

    if (!isSupported) {
      var element = doc.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported && doc.implementation && doc.implementation.hasFeature // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    && doc.implementation.hasFeature('', '') !== true) {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }

  var Mousewheel = {
    lastScrollTime: Utils.now(),
    lastEventBeforeSnap: undefined,
    recentWheelEvents: [],
    event: function event() {
      if (win.navigator.userAgent.indexOf('firefox') > -1) {
        return 'DOMMouseScroll';
      }

      return isEventSupported() ? 'wheel' : 'mousewheel';
    },
    normalize: function normalize(e) {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;
      var sX = 0;
      var sY = 0; // spinX, spinY

      var pX = 0;
      var pY = 0; // pixelX, pixelY
      // Legacy

      if ('detail' in e) {
        sY = e.detail;
      }

      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }

      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in e) {
        pY = e.deltaY;
      }

      if ('deltaX' in e) {
        pX = e.deltaX;
      }

      if (e.shiftKey && !pX) {
        // if user scrolls with shift he wants horizontal scroll
        pX = pY;
        pY = 0;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      } // Fall-back if spin cannot be determined


      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    },
    handleMouseEnter: function handleMouseEnter() {
      var swiper = this;
      swiper.mouseEntered = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      var swiper = this;
      swiper.mouseEntered = false;
    },
    handle: function handle(event) {
      var e = event;
      var swiper = this;
      var params = swiper.params.mousewheel;

      if (swiper.params.cssMode) {
        e.preventDefault();
      }

      var target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }

      if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) {
        return true;
      }

      if (e.originalEvent) {
        e = e.originalEvent;
      } // jquery fix


      var delta = 0;
      var rtlFactor = swiper.rtlTranslate ? -1 : 1;
      var data = Mousewheel.normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) {
            delta = data.pixelX * rtlFactor;
          } else {
            return true;
          }
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) {
          delta = data.pixelY;
        } else {
          return true;
        }
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }

      if (delta === 0) {
        return true;
      }

      if (params.invert) {
        delta = -delta;
      }

      if (!swiper.params.freeMode) {
        // Register the new event in a variable which stores the relevant data
        var newEvent = {
          time: Utils.now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta),
          raw: event
        }; // Keep the most recent events

        var recentWheelEvents = swiper.mousewheel.recentWheelEvents;

        if (recentWheelEvents.length >= 2) {
          recentWheelEvents.shift(); // only store the last N events
        }

        var prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
        recentWheelEvents.push(newEvent); // If there is at least one previous recorded event:
        //   If direction has changed or
        //   if the scroll is quicker than the previous one:
        //     Animate the slider.
        // Else (this is the first time the wheel is moved):
        //     Animate the slider.

        if (prevEvent) {
          if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
            swiper.mousewheel.animateSlider(newEvent);
          }
        } else {
          swiper.mousewheel.animateSlider(newEvent);
        } // If it's time to release the scroll:
        //   Return now so you don't hit the preventDefault.


        if (swiper.mousewheel.releaseScroll(newEvent)) {
          return true;
        }
      } else {
        // Freemode or scrollContainer:
        // If we recently snapped after a momentum scroll, then ignore wheel events
        // to give time for the deceleration to finish. Stop ignoring after 500 msecs
        // or if it's a new scroll (larger delta or inverse sign as last event before
        // an end-of-momentum snap).
        var newEvent$1 = {
          time: Utils.now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta)
        };
        var ref = swiper.mousewheel;
        var lastEventBeforeSnap = ref.lastEventBeforeSnap;
        var ignoreWheelEvents = lastEventBeforeSnap && newEvent$1.time < lastEventBeforeSnap.time + 500 && newEvent$1.delta <= lastEventBeforeSnap.delta && newEvent$1.direction === lastEventBeforeSnap.direction;

        if (!ignoreWheelEvents) {
          swiper.mousewheel.lastEventBeforeSnap = undefined;

          if (swiper.params.loop) {
            swiper.loopFix();
          }

          var position = swiper.getTranslate() + delta * params.sensitivity;
          var wasBeginning = swiper.isBeginning;
          var wasEnd = swiper.isEnd;

          if (position >= swiper.minTranslate()) {
            position = swiper.minTranslate();
          }

          if (position <= swiper.maxTranslate()) {
            position = swiper.maxTranslate();
          }

          swiper.setTransition(0);
          swiper.setTranslate(position);
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();

          if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
            swiper.updateSlidesClasses();
          }

          if (swiper.params.freeModeSticky) {
            // When wheel scrolling starts with sticky (aka snap) enabled, then detect
            // the end of a momentum scroll by storing recent (N=15?) wheel events.
            // 1. do all N events have decreasing or same (absolute value) delta?
            // 2. did all N events arrive in the last M (M=500?) msecs?
            // 3. does the earliest event have an (absolute value) delta that's
            //    at least P (P=1?) larger than the most recent event's delta?
            // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
            // If 1-4 are "yes" then we're near the end of a momuntum scroll deceleration.
            // Snap immediately and ignore remaining wheel events in this scroll.
            // See comment above for "remaining wheel events in this scroll" determination.
            // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
            clearTimeout(swiper.mousewheel.timeout);
            swiper.mousewheel.timeout = undefined;
            var recentWheelEvents$1 = swiper.mousewheel.recentWheelEvents;

            if (recentWheelEvents$1.length >= 15) {
              recentWheelEvents$1.shift(); // only store the last N events
            }

            var prevEvent$1 = recentWheelEvents$1.length ? recentWheelEvents$1[recentWheelEvents$1.length - 1] : undefined;
            var firstEvent = recentWheelEvents$1[0];
            recentWheelEvents$1.push(newEvent$1);

            if (prevEvent$1 && (newEvent$1.delta > prevEvent$1.delta || newEvent$1.direction !== prevEvent$1.direction)) {
              // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
              recentWheelEvents$1.splice(0);
            } else if (recentWheelEvents$1.length >= 15 && newEvent$1.time - firstEvent.time < 500 && firstEvent.delta - newEvent$1.delta >= 1 && newEvent$1.delta <= 6) {
              // We're at the end of the deceleration of a momentum scroll, so there's no need
              // to wait for more events. Snap ASAP on the next tick.
              // Also, because there's some remaining momentum we'll bias the snap in the
              // direction of the ongoing scroll because it's better UX for the scroll to snap
              // in the same direction as the scroll instead of reversing to snap.  Therefore,
              // if it's already scrolled more than 20% in the current direction, keep going.
              var snapToThreshold = delta > 0 ? 0.8 : 0.2;
              swiper.mousewheel.lastEventBeforeSnap = newEvent$1;
              recentWheelEvents$1.splice(0);
              swiper.mousewheel.timeout = Utils.nextTick(function () {
                swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
              }, 0); // no delay; move on next tick
            }

            if (!swiper.mousewheel.timeout) {
              // if we get here, then we haven't detected the end of a momentum scroll, so
              // we'll consider a scroll "complete" when there haven't been any wheel events
              // for 500ms.
              swiper.mousewheel.timeout = Utils.nextTick(function () {
                var snapToThreshold = 0.5;
                swiper.mousewheel.lastEventBeforeSnap = newEvent$1;
                recentWheelEvents$1.splice(0);
                swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
              }, 500);
            }
          } // Emit event


          if (!ignoreWheelEvents) {
            swiper.emit('scroll', e);
          } // Stop autoplay


          if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) {
            swiper.autoplay.stop();
          } // Return page scroll on edge positions


          if (position === swiper.minTranslate() || position === swiper.maxTranslate()) {
            return true;
          }
        }
      }

      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }

      return false;
    },
    animateSlider: function animateSlider(newEvent) {
      var swiper = this; // If the movement is NOT big enough and
      // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
      //   Don't go any further (avoid insignificant scroll movement).

      if (newEvent.delta >= 6 && Utils.now() - swiper.mousewheel.lastScrollTime < 60) {
        // Return false as a default
        return true;
      } // If user is scrolling towards the end:
      //   If the slider hasn't hit the latest slide or
      //   if the slider is a loop and
      //   if the slider isn't moving right now:
      //     Go to next slide and
      //     emit a scroll event.
      // Else (the user is scrolling towards the beginning) and
      // if the slider hasn't hit the first slide or
      // if the slider is a loop and
      // if the slider isn't moving right now:
      //   Go to prev slide and
      //   emit a scroll event.


      if (newEvent.direction < 0) {
        if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
          swiper.slideNext();
          swiper.emit('scroll', newEvent.raw);
        }
      } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
        swiper.slidePrev();
        swiper.emit('scroll', newEvent.raw);
      } // If you got here is because an animation has been triggered so store the current time


      swiper.mousewheel.lastScrollTime = new win.Date().getTime(); // Return false as a default

      return false;
    },
    releaseScroll: function releaseScroll(newEvent) {
      var swiper = this;
      var params = swiper.params.mousewheel;

      if (newEvent.direction < 0) {
        if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
          // Return true to animate scroll on edges
          return true;
        }
      } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
        // Return true to animate scroll on edges
        return true;
      }

      return false;
    },
    enable: function enable() {
      var swiper = this;
      var event = Mousewheel.event();

      if (swiper.params.cssMode) {
        swiper.wrapperEl.removeEventListener(event, swiper.mousewheel.handle);
        return true;
      }

      if (!event) {
        return false;
      }

      if (swiper.mousewheel.enabled) {
        return false;
      }

      var target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }

      target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
      target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
      target.on(event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = true;
      return true;
    },
    disable: function disable() {
      var swiper = this;
      var event = Mousewheel.event();

      if (swiper.params.cssMode) {
        swiper.wrapperEl.addEventListener(event, swiper.mousewheel.handle);
        return true;
      }

      if (!event) {
        return false;
      }

      if (!swiper.mousewheel.enabled) {
        return false;
      }

      var target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }

      target.off(event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = false;
      return true;
    }
  };
  var Mousewheel$1 = {
    name: 'mousewheel',
    params: {
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarged: 'container'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        mousewheel: {
          enabled: false,
          enable: Mousewheel.enable.bind(swiper),
          disable: Mousewheel.disable.bind(swiper),
          handle: Mousewheel.handle.bind(swiper),
          handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
          handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
          animateSlider: Mousewheel.animateSlider.bind(swiper),
          releaseScroll: Mousewheel.releaseScroll.bind(swiper),
          lastScrollTime: Utils.now(),
          lastEventBeforeSnap: undefined,
          recentWheelEvents: []
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
          swiper.mousewheel.disable();
        }

        if (swiper.params.mousewheel.enabled) {
          swiper.mousewheel.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;

        if (swiper.params.cssMode) {
          swiper.mousewheel.enable();
        }

        if (swiper.mousewheel.enabled) {
          swiper.mousewheel.disable();
        }
      }
    }
  };
  var Navigation = {
    update: function update() {
      // Update Navigation Buttons
      var swiper = this;
      var params = swiper.params.navigation;

      if (swiper.params.loop) {
        return;
      }

      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }

        $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }

      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }

        $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    },
    onPrevClick: function onPrevClick(e) {
      var swiper = this;
      e.preventDefault();

      if (swiper.isBeginning && !swiper.params.loop) {
        return;
      }

      swiper.slidePrev();
    },
    onNextClick: function onNextClick(e) {
      var swiper = this;
      e.preventDefault();

      if (swiper.isEnd && !swiper.params.loop) {
        return;
      }

      swiper.slideNext();
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.navigation;

      if (!(params.nextEl || params.prevEl)) {
        return;
      }

      var $nextEl;
      var $prevEl;

      if (params.nextEl) {
        $nextEl = $(params.nextEl);

        if (swiper.params.uniqueNavElements && typeof params.nextEl === 'string' && $nextEl.length > 1 && swiper.$el.find(params.nextEl).length === 1) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }

      if (params.prevEl) {
        $prevEl = $(params.prevEl);

        if (swiper.params.uniqueNavElements && typeof params.prevEl === 'string' && $prevEl.length > 1 && swiper.$el.find(params.prevEl).length === 1) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on('click', swiper.navigation.onNextClick);
      }

      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on('click', swiper.navigation.onPrevClick);
      }

      Utils.extend(swiper.navigation, {
        $nextEl: $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl: $prevEl,
        prevEl: $prevEl && $prevEl[0]
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($nextEl && $nextEl.length) {
        $nextEl.off('click', swiper.navigation.onNextClick);
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }

      if ($prevEl && $prevEl.length) {
        $prevEl.off('click', swiper.navigation.onPrevClick);
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    }
  };
  var Navigation$1 = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        navigation: {
          init: Navigation.init.bind(swiper),
          update: Navigation.update.bind(swiper),
          destroy: Navigation.destroy.bind(swiper),
          onNextClick: Navigation.onNextClick.bind(swiper),
          onPrevClick: Navigation.onPrevClick.bind(swiper)
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.navigation.init();
        swiper.navigation.update();
      },
      toEdge: function toEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.navigation.destroy();
      },
      click: function click(e) {
        var swiper = this;
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;

        if (swiper.params.navigation.hideOnClick && !$(e.target).is($prevEl) && !$(e.target).is($nextEl)) {
          var isHidden;

          if ($nextEl) {
            isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
          } else if ($prevEl) {
            isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
          }

          if (isHidden === true) {
            swiper.emit('navigationShow', swiper);
          } else {
            swiper.emit('navigationHide', swiper);
          }

          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }

          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      }
    }
  };
  var Pagination = {
    update: function update() {
      // Render || Update Pagination bullets/items
      var swiper = this;
      var rtl = swiper.rtl;
      var params = swiper.params.pagination;

      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) {
        return;
      }

      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el; // Current/Total

      var current;
      var total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

      if (swiper.params.loop) {
        current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

        if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
          current -= slidesLength - swiper.loopedSlides * 2;
        }

        if (current > total - 1) {
          current -= total;
        }

        if (current < 0 && swiper.params.paginationType !== 'bullets') {
          current = total + current;
        }
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      } // Types


      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        var bullets = swiper.pagination.bullets;
        var firstIndex;
        var lastIndex;
        var midIndex;

        if (params.dynamicBullets) {
          swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
          $el.css(swiper.isHorizontal() ? 'width' : 'height', swiper.pagination.bulletSize * (params.dynamicMainBullets + 4) + "px");

          if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
            swiper.pagination.dynamicBulletIndex += current - swiper.previousIndex;

            if (swiper.pagination.dynamicBulletIndex > params.dynamicMainBullets - 1) {
              swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (swiper.pagination.dynamicBulletIndex < 0) {
              swiper.pagination.dynamicBulletIndex = 0;
            }
          }

          firstIndex = current - swiper.pagination.dynamicBulletIndex;
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }

        bullets.removeClass(params.bulletActiveClass + " " + params.bulletActiveClass + "-next " + params.bulletActiveClass + "-next-next " + params.bulletActiveClass + "-prev " + params.bulletActiveClass + "-prev-prev " + params.bulletActiveClass + "-main");

        if ($el.length > 1) {
          bullets.each(function (index, bullet) {
            var $bullet = $(bullet);
            var bulletIndex = $bullet.index();

            if (bulletIndex === current) {
              $bullet.addClass(params.bulletActiveClass);
            }

            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                $bullet.addClass(params.bulletActiveClass + "-main");
              }

              if (bulletIndex === firstIndex) {
                $bullet.prev().addClass(params.bulletActiveClass + "-prev").prev().addClass(params.bulletActiveClass + "-prev-prev");
              }

              if (bulletIndex === lastIndex) {
                $bullet.next().addClass(params.bulletActiveClass + "-next").next().addClass(params.bulletActiveClass + "-next-next");
              }
            }
          });
        } else {
          var $bullet = bullets.eq(current);
          var bulletIndex = $bullet.index();
          $bullet.addClass(params.bulletActiveClass);

          if (params.dynamicBullets) {
            var $firstDisplayedBullet = bullets.eq(firstIndex);
            var $lastDisplayedBullet = bullets.eq(lastIndex);

            for (var i = firstIndex; i <= lastIndex; i += 1) {
              bullets.eq(i).addClass(params.bulletActiveClass + "-main");
            }

            if (swiper.params.loop) {
              if (bulletIndex >= bullets.length - params.dynamicMainBullets) {
                for (var i$1 = params.dynamicMainBullets; i$1 >= 0; i$1 -= 1) {
                  bullets.eq(bullets.length - i$1).addClass(params.bulletActiveClass + "-main");
                }

                bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(params.bulletActiveClass + "-prev");
              } else {
                $firstDisplayedBullet.prev().addClass(params.bulletActiveClass + "-prev").prev().addClass(params.bulletActiveClass + "-prev-prev");
                $lastDisplayedBullet.next().addClass(params.bulletActiveClass + "-next").next().addClass(params.bulletActiveClass + "-next-next");
              }
            } else {
              $firstDisplayedBullet.prev().addClass(params.bulletActiveClass + "-prev").prev().addClass(params.bulletActiveClass + "-prev-prev");
              $lastDisplayedBullet.next().addClass(params.bulletActiveClass + "-next").next().addClass(params.bulletActiveClass + "-next-next");
            }
          }
        }

        if (params.dynamicBullets) {
          var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          var bulletsOffset = (swiper.pagination.bulletSize * dynamicBulletsLength - swiper.pagination.bulletSize) / 2 - midIndex * swiper.pagination.bulletSize;
          var offsetProp = rtl ? 'right' : 'left';
          bullets.css(swiper.isHorizontal() ? offsetProp : 'top', bulletsOffset + "px");
        }
      }

      if (params.type === 'fraction') {
        $el.find("." + params.currentClass).text(params.formatFractionCurrent(current + 1));
        $el.find("." + params.totalClass).text(params.formatFractionTotal(total));
      }

      if (params.type === 'progressbar') {
        var progressbarDirection;

        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }

        var scale = (current + 1) / total;
        var scaleX = 1;
        var scaleY = 1;

        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }

        $el.find("." + params.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")").transition(swiper.params.speed);
      }

      if (params.type === 'custom' && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        swiper.emit('paginationRender', swiper, $el[0]);
      } else {
        swiper.emit('paginationUpdate', swiper, $el[0]);
      }

      $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    },
    render: function render() {
      // Render Container
      var swiper = this;
      var params = swiper.params.pagination;

      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) {
        return;
      }

      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el;
      var paginationHTML = '';

      if (params.type === 'bullets') {
        var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

        for (var i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += "<" + params.bulletElement + " class=\"" + params.bulletClass + "\"></" + params.bulletElement + ">";
          }
        }

        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find("." + params.bulletClass);
      }

      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = "<span class=\"" + params.currentClass + "\"></span>" + ' / ' + "<span class=\"" + params.totalClass + "\"></span>";
        }

        $el.html(paginationHTML);
      }

      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = "<span class=\"" + params.progressbarFillClass + "\"></span>";
        }

        $el.html(paginationHTML);
      }

      if (params.type !== 'custom') {
        swiper.emit('paginationRender', swiper.pagination.$el[0]);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.pagination;

      if (!params.el) {
        return;
      }

      var $el = $(params.el);

      if ($el.length === 0) {
        return;
      }

      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && swiper.$el.find(params.el).length === 1) {
        $el = swiper.$el.find(params.el);
      }

      if (params.type === 'bullets' && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);

      if (params.type === 'bullets' && params.dynamicBullets) {
        $el.addClass("" + params.modifierClass + params.type + "-dynamic");
        swiper.pagination.dynamicBulletIndex = 0;

        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }

      if (params.type === 'progressbar' && params.progressbarOpposite) {
        $el.addClass(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        $el.on('click', "." + params.bulletClass, function onClick(e) {
          e.preventDefault();
          var index = $(this).index() * swiper.params.slidesPerGroup;

          if (swiper.params.loop) {
            index += swiper.loopedSlides;
          }

          swiper.slideTo(index);
        });
      }

      Utils.extend(swiper.pagination, {
        $el: $el,
        el: $el[0]
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var params = swiper.params.pagination;

      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) {
        return;
      }

      var $el = swiper.pagination.$el;
      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);

      if (swiper.pagination.bullets) {
        swiper.pagination.bullets.removeClass(params.bulletActiveClass);
      }

      if (params.clickable) {
        $el.off('click', "." + params.bulletClass);
      }
    }
  };
  var Pagination$1 = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets',
        // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: function formatFractionCurrent(number) {
          return number;
        },
        formatFractionTotal: function formatFractionTotal(number) {
          return number;
        },
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        modifierClass: 'swiper-pagination-',
        // NEW
        currentClass: 'swiper-pagination-current',
        totalClass: 'swiper-pagination-total',
        hiddenClass: 'swiper-pagination-hidden',
        progressbarFillClass: 'swiper-pagination-progressbar-fill',
        progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
        clickableClass: 'swiper-pagination-clickable',
        // NEW
        lockClass: 'swiper-pagination-lock'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        pagination: {
          init: Pagination.init.bind(swiper),
          render: Pagination.render.bind(swiper),
          update: Pagination.update.bind(swiper),
          destroy: Pagination.destroy.bind(swiper),
          dynamicBulletIndex: 0
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      },
      activeIndexChange: function activeIndexChange() {
        var swiper = this;

        if (swiper.params.loop) {
          swiper.pagination.update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          swiper.pagination.update();
        }
      },
      snapIndexChange: function snapIndexChange() {
        var swiper = this;

        if (!swiper.params.loop) {
          swiper.pagination.update();
        }
      },
      slidesLengthChange: function slidesLengthChange() {
        var swiper = this;

        if (swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      snapGridLengthChange: function snapGridLengthChange() {
        var swiper = this;

        if (!swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.pagination.destroy();
      },
      click: function click(e) {
        var swiper = this;

        if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && swiper.pagination.$el.length > 0 && !$(e.target).hasClass(swiper.params.pagination.bulletClass)) {
          var isHidden = swiper.pagination.$el.hasClass(swiper.params.pagination.hiddenClass);

          if (isHidden === true) {
            swiper.emit('paginationShow', swiper);
          } else {
            swiper.emit('paginationHide', swiper);
          }

          swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      }
    }
  };
  var Scrollbar = {
    setTranslate: function setTranslate() {
      var swiper = this;

      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) {
        return;
      }

      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var progress = swiper.progress;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;
      var params = swiper.params.scrollbar;
      var newSize = dragSize;
      var newPos = (trackSize - dragSize) * progress;

      if (rtl) {
        newPos = -newPos;

        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }

      if (swiper.isHorizontal()) {
        $dragEl.transform("translate3d(" + newPos + "px, 0, 0)");
        $dragEl[0].style.width = newSize + "px";
      } else {
        $dragEl.transform("translate3d(0px, " + newPos + "px, 0)");
        $dragEl[0].style.height = newSize + "px";
      }

      if (params.hide) {
        clearTimeout(swiper.scrollbar.timeout);
        $el[0].style.opacity = 1;
        swiper.scrollbar.timeout = setTimeout(function () {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;

      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) {
        return;
      }

      swiper.scrollbar.$dragEl.transition(duration);
    },
    updateSize: function updateSize() {
      var swiper = this;

      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) {
        return;
      }

      var scrollbar = swiper.scrollbar;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;
      $dragEl[0].style.width = '';
      $dragEl[0].style.height = '';
      var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
      var divider = swiper.size / swiper.virtualSize;
      var moveDivider = divider * (trackSize / swiper.size);
      var dragSize;

      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = dragSize + "px";
      } else {
        $dragEl[0].style.height = dragSize + "px";
      }

      if (divider >= 1) {
        $el[0].style.display = 'none';
      } else {
        $el[0].style.display = '';
      }

      if (swiper.params.scrollbar.hide) {
        $el[0].style.opacity = 0;
      }

      Utils.extend(scrollbar, {
        trackSize: trackSize,
        divider: divider,
        moveDivider: moveDivider,
        dragSize: dragSize
      });
      scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
    },
    getPointerPosition: function getPointerPosition(e) {
      var swiper = this;

      if (swiper.isHorizontal()) {
        return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientX : e.clientX;
      }

      return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientY : e.clientY;
    },
    setDragPosition: function setDragPosition(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var $el = scrollbar.$el;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var dragStartPos = scrollbar.dragStartPos;
      var positionRatio;
      positionRatio = (scrollbar.getPointerPosition(e) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);

      if (rtl) {
        positionRatio = 1 - positionRatio;
      }

      var position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;
      swiper.scrollbar.isTouched = true;
      swiper.scrollbar.dragStartPos = e.target === $dragEl[0] || e.target === $dragEl ? scrollbar.getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
      e.preventDefault();
      e.stopPropagation();
      $wrapperEl.transition(100);
      $dragEl.transition(100);
      scrollbar.setDragPosition(e);
      clearTimeout(swiper.scrollbar.dragTimeout);
      $el.transition(0);

      if (params.hide) {
        $el.css('opacity', 1);
      }

      if (swiper.params.cssMode) {
        swiper.$wrapperEl.css('scroll-snap-type', 'none');
      }

      swiper.emit('scrollbarDragStart', e);
    },
    onDragMove: function onDragMove(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;

      if (!swiper.scrollbar.isTouched) {
        return;
      }

      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }

      scrollbar.setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      swiper.emit('scrollbarDragMove', e);
    },
    onDragEnd: function onDragEnd(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;

      if (!swiper.scrollbar.isTouched) {
        return;
      }

      swiper.scrollbar.isTouched = false;

      if (swiper.params.cssMode) {
        swiper.$wrapperEl.css('scroll-snap-type', '');
        $wrapperEl.transition('');
      }

      if (params.hide) {
        clearTimeout(swiper.scrollbar.dragTimeout);
        swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
          $el.css('opacity', 0);
          $el.transition(400);
        }, 1000);
      }

      swiper.emit('scrollbarDragEnd', e);

      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    },
    enableDraggable: function enableDraggable() {
      var swiper = this;

      if (!swiper.params.scrollbar.el) {
        return;
      }

      var scrollbar = swiper.scrollbar;
      var touchEventsTouch = swiper.touchEventsTouch;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? {
        passive: false,
        capture: false
      } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;

      if (!Support.touch) {
        target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    disableDraggable: function disableDraggable() {
      var swiper = this;

      if (!swiper.params.scrollbar.el) {
        return;
      }

      var scrollbar = swiper.scrollbar;
      var touchEventsTouch = swiper.touchEventsTouch;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? {
        passive: false,
        capture: false
      } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;

      if (!Support.touch) {
        target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.removeEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.removeEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    init: function init() {
      var swiper = this;

      if (!swiper.params.scrollbar.el) {
        return;
      }

      var scrollbar = swiper.scrollbar;
      var $swiperEl = swiper.$el;
      var params = swiper.params.scrollbar;
      var $el = $(params.el);

      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
        $el = $swiperEl.find(params.el);
      }

      var $dragEl = $el.find("." + swiper.params.scrollbar.dragClass);

      if ($dragEl.length === 0) {
        $dragEl = $("<div class=\"" + swiper.params.scrollbar.dragClass + "\"></div>");
        $el.append($dragEl);
      }

      Utils.extend(scrollbar, {
        $el: $el,
        el: $el[0],
        $dragEl: $dragEl,
        dragEl: $dragEl[0]
      });

      if (params.draggable) {
        scrollbar.enableDraggable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.disableDraggable();
    }
  };
  var Scrollbar$1 = {
    name: 'scrollbar',
    params: {
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: 'swiper-scrollbar-lock',
        dragClass: 'swiper-scrollbar-drag'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        scrollbar: {
          init: Scrollbar.init.bind(swiper),
          destroy: Scrollbar.destroy.bind(swiper),
          updateSize: Scrollbar.updateSize.bind(swiper),
          setTranslate: Scrollbar.setTranslate.bind(swiper),
          setTransition: Scrollbar.setTransition.bind(swiper),
          enableDraggable: Scrollbar.enableDraggable.bind(swiper),
          disableDraggable: Scrollbar.disableDraggable.bind(swiper),
          setDragPosition: Scrollbar.setDragPosition.bind(swiper),
          getPointerPosition: Scrollbar.getPointerPosition.bind(swiper),
          onDragStart: Scrollbar.onDragStart.bind(swiper),
          onDragMove: Scrollbar.onDragMove.bind(swiper),
          onDragEnd: Scrollbar.onDragEnd.bind(swiper),
          isTouched: false,
          timeout: null,
          dragTimeout: null
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.scrollbar.init();
        swiper.scrollbar.updateSize();
        swiper.scrollbar.setTranslate();
      },
      update: function update() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      resize: function resize() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        swiper.scrollbar.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        swiper.scrollbar.setTransition(duration);
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.scrollbar.destroy();
      }
    }
  };
  var Parallax = {
    setTransform: function setTransform(el, progress) {
      var swiper = this;
      var rtl = swiper.rtl;
      var $el = $(el);
      var rtlFactor = rtl ? -1 : 1;
      var p = $el.attr('data-swiper-parallax') || '0';
      var x = $el.attr('data-swiper-parallax-x');
      var y = $el.attr('data-swiper-parallax-y');
      var scale = $el.attr('data-swiper-parallax-scale');
      var opacity = $el.attr('data-swiper-parallax-opacity');

      if (x || y) {
        x = x || '0';
        y = y || '0';
      } else if (swiper.isHorizontal()) {
        x = p;
        y = '0';
      } else {
        y = p;
        x = '0';
      }

      if (x.indexOf('%') >= 0) {
        x = parseInt(x, 10) * progress * rtlFactor + "%";
      } else {
        x = x * progress * rtlFactor + "px";
      }

      if (y.indexOf('%') >= 0) {
        y = parseInt(y, 10) * progress + "%";
      } else {
        y = y * progress + "px";
      }

      if (typeof opacity !== 'undefined' && opacity !== null) {
        var currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
        $el[0].style.opacity = currentOpacity;
      }

      if (typeof scale === 'undefined' || scale === null) {
        $el.transform("translate3d(" + x + ", " + y + ", 0px)");
      } else {
        var currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
        $el.transform("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")");
      }
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      var progress = swiper.progress;
      var snapGrid = swiper.snapGrid;
      $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(function (index, el) {
        swiper.parallax.setTransform(el, progress);
      });
      slides.each(function (slideIndex, slideEl) {
        var slideProgress = slideEl.progress;

        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
          slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
        }

        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(function (index, el) {
          swiper.parallax.setTransform(el, slideProgress);
        });
      });
    },
    setTransition: function setTransition(duration) {
      if (duration === void 0) duration = this.params.speed;
      var swiper = this;
      var $el = swiper.$el;
      $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(function (index, parallaxEl) {
        var $parallaxEl = $(parallaxEl);
        var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;

        if (duration === 0) {
          parallaxDuration = 0;
        }

        $parallaxEl.transition(parallaxDuration);
      });
    }
  };
  var Parallax$1 = {
    name: 'parallax',
    params: {
      parallax: {
        enabled: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        parallax: {
          setTransform: Parallax.setTransform.bind(swiper),
          setTranslate: Parallax.setTranslate.bind(swiper),
          setTransition: Parallax.setTransition.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (!swiper.params.parallax.enabled) {
          return;
        }

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      init: function init() {
        var swiper = this;

        if (!swiper.params.parallax.enabled) {
          return;
        }

        swiper.parallax.setTranslate();
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (!swiper.params.parallax.enabled) {
          return;
        }

        swiper.parallax.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;

        if (!swiper.params.parallax.enabled) {
          return;
        }

        swiper.parallax.setTransition(duration);
      }
    }
  };
  var Zoom = {
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) {
        return 1;
      }

      var x1 = e.targetTouches[0].pageX;
      var y1 = e.targetTouches[0].pageY;
      var x2 = e.targetTouches[1].pageX;
      var y2 = e.targetTouches[1].pageY;
      var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return distance;
    },
    // Events
    onGestureStart: function onGestureStart(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;

      if (!Support.gestures) {
        if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
          return;
        }

        zoom.fakeGestureTouched = true;
        gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
      }

      if (!gesture.$slideEl || !gesture.$slideEl.length) {
        gesture.$slideEl = $(e.target).closest("." + swiper.params.slideClass);

        if (gesture.$slideEl.length === 0) {
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        }

        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
        gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
        gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

        if (gesture.$imageWrapEl.length === 0) {
          gesture.$imageEl = undefined;
          return;
        }
      }

      if (gesture.$imageEl) {
        gesture.$imageEl.transition(0);
      }

      swiper.zoom.isScaling = true;
    },
    onGestureChange: function onGestureChange(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (!Support.gestures) {
        if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
          return;
        }

        zoom.fakeGestureMoved = true;
        gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      if (Support.gestures) {
        zoom.scale = e.scale * zoom.currentScale;
      } else {
        zoom.scale = gesture.scaleMove / gesture.scaleStart * zoom.currentScale;
      }

      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = gesture.maxRatio - 1 + Math.pow(zoom.scale - gesture.maxRatio + 1, 0.5);
      }

      if (zoom.scale < params.minRatio) {
        zoom.scale = params.minRatio + 1 - Math.pow(params.minRatio - zoom.scale + 1, 0.5);
      }

      gesture.$imageEl.transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
    },
    onGestureEnd: function onGestureEnd(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (!Support.gestures) {
        if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
          return;
        }

        if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android) {
          return;
        }

        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.$imageEl.transition(swiper.params.speed).transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
      zoom.currentScale = zoom.scale;
      zoom.isScaling = false;

      if (zoom.scale === 1) {
        gesture.$slideEl = undefined;
      }
    },
    onTouchStart: function onTouchStart(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      if (image.isTouched) {
        return;
      }

      if (Device.android && e.cancelable) {
        e.preventDefault();
      }

      image.isTouched = true;
      image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove: function onTouchMove(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      swiper.allowClick = false;

      if (!image.isTouched || !gesture.$slideEl) {
        return;
      }

      if (!image.isMoved) {
        image.width = gesture.$imageEl[0].offsetWidth;
        image.height = gesture.$imageEl[0].offsetHeight;
        image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
        image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
        gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
        gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
        gesture.$imageWrapEl.transition(0);

        if (swiper.rtl) {
          image.startX = -image.startX;
          image.startY = -image.startY;
        }
      } // Define if we need image drag


      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;

      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) {
        return;
      }

      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (!image.isMoved && !zoom.isScaling) {
        if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
          image.isTouched = false;
          return;
        }

        if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
          image.isTouched = false;
          return;
        }
      }

      if (e.cancelable) {
        e.preventDefault();
      }

      e.stopPropagation();
      image.isMoved = true;
      image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
      image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

      if (image.currentX < image.minX) {
        image.currentX = image.minX + 1 - Math.pow(image.minX - image.currentX + 1, 0.8);
      }

      if (image.currentX > image.maxX) {
        image.currentX = image.maxX - 1 + Math.pow(image.currentX - image.maxX + 1, 0.8);
      }

      if (image.currentY < image.minY) {
        image.currentY = image.minY + 1 - Math.pow(image.minY - image.currentY + 1, 0.8);
      }

      if (image.currentY > image.maxY) {
        image.currentY = image.maxY - 1 + Math.pow(image.currentY - image.maxY + 1, 0.8);
      } // Velocity


      if (!velocity.prevPositionX) {
        velocity.prevPositionX = image.touchesCurrent.x;
      }

      if (!velocity.prevPositionY) {
        velocity.prevPositionY = image.touchesCurrent.y;
      }

      if (!velocity.prevTime) {
        velocity.prevTime = Date.now();
      }

      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;

      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) {
        velocity.x = 0;
      }

      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) {
        velocity.y = 0;
      }

      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();
      gesture.$imageWrapEl.transform("translate3d(" + image.currentX + "px, " + image.currentY + "px,0)");
    },
    onTouchEnd: function onTouchEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }

      image.isTouched = false;
      image.isMoved = false;
      var momentumDurationX = 300;
      var momentumDurationY = 300;
      var momentumDistanceX = velocity.x * momentumDurationX;
      var newPositionX = image.currentX + momentumDistanceX;
      var momentumDistanceY = velocity.y * momentumDurationY;
      var newPositionY = image.currentY + momentumDistanceY; // Fix duration

      if (velocity.x !== 0) {
        momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
      }

      if (velocity.y !== 0) {
        momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
      }

      var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
      image.currentX = newPositionX;
      image.currentY = newPositionY; // Define if we need image drag

      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
      gesture.$imageWrapEl.transition(momentumDuration).transform("translate3d(" + image.currentX + "px, " + image.currentY + "px,0)");
    },
    onTransitionEnd: function onTransitionEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
        if (gesture.$imageEl) {
          gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
        }

        if (gesture.$imageWrapEl) {
          gesture.$imageWrapEl.transform('translate3d(0,0,0)');
        }

        zoom.scale = 1;
        zoom.currentScale = 1;
        gesture.$slideEl = undefined;
        gesture.$imageEl = undefined;
        gesture.$imageWrapEl = undefined;
      }
    },
    // Toggle Zoom
    toggle: function toggle(e) {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoom.out();
      } else {
        // Zoom In
        zoom.in(e);
      }
    },
    in: function in$1(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;

      if (!gesture.$slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.$slideEl = swiper.$wrapperEl.children("." + swiper.params.slideActiveClass);
        } else {
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        }

        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
        gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      gesture.$slideEl.addClass("" + params.zoomedSlideClass);
      var touchX;
      var touchY;
      var offsetX;
      var offsetY;
      var diffX;
      var diffY;
      var translateX;
      var translateY;
      var imageWidth;
      var imageHeight;
      var scaledWidth;
      var scaledHeight;
      var translateMinX;
      var translateMinY;
      var translateMaxX;
      var translateMaxY;
      var slideWidth;
      var slideHeight;

      if (typeof image.touchesStart.x === 'undefined' && e) {
        touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
        touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }

      zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

      if (e) {
        slideWidth = gesture.$slideEl[0].offsetWidth;
        slideHeight = gesture.$slideEl[0].offsetHeight;
        offsetX = gesture.$slideEl.offset().left;
        offsetY = gesture.$slideEl.offset().top;
        diffX = offsetX + slideWidth / 2 - touchX;
        diffY = offsetY + slideHeight / 2 - touchY;
        imageWidth = gesture.$imageEl[0].offsetWidth;
        imageHeight = gesture.$imageEl[0].offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;
        translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
        translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;
        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;

        if (translateX < translateMinX) {
          translateX = translateMinX;
        }

        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }

        if (translateY < translateMinY) {
          translateY = translateMinY;
        }

        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }

      gesture.$imageWrapEl.transition(300).transform("translate3d(" + translateX + "px, " + translateY + "px,0)");
      gesture.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
    },
    out: function out() {
      var swiper = this;
      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;

      if (!gesture.$slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.$slideEl = swiper.$wrapperEl.children("." + swiper.params.slideActiveClass);
        } else {
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        }

        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
        gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      zoom.scale = 1;
      zoom.currentScale = 1;
      gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
      gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
      gesture.$slideEl.removeClass("" + params.zoomedSlideClass);
      gesture.$slideEl = undefined;
    },
    // Attach/Detach Events
    enable: function enable() {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.enabled) {
        return;
      }

      zoom.enabled = true;
      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      var activeListenerWithCapture = Support.passiveListener ? {
        passive: false,
        capture: true
      } : true;
      var slideSelector = "." + swiper.params.slideClass; // Scale image

      if (Support.gestures) {
        swiper.$wrapperEl.on('gesturestart', slideSelector, zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on('gesturechange', slideSelector, zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on('gestureend', slideSelector, zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, zoom.onGestureChange, activeListenerWithCapture);
        swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, zoom.onGestureEnd, passiveListener);

        if (swiper.touchEvents.cancel) {
          swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, zoom.onGestureEnd, passiveListener);
        }
      } // Move image


      swiper.$wrapperEl.on(swiper.touchEvents.move, "." + swiper.params.zoom.containerClass, zoom.onTouchMove, activeListenerWithCapture);
    },
    disable: function disable() {
      var swiper = this;
      var zoom = swiper.zoom;

      if (!zoom.enabled) {
        return;
      }

      swiper.zoom.enabled = false;
      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      var activeListenerWithCapture = Support.passiveListener ? {
        passive: false,
        capture: true
      } : true;
      var slideSelector = "." + swiper.params.slideClass; // Scale image

      if (Support.gestures) {
        swiper.$wrapperEl.off('gesturestart', slideSelector, zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off('gesturechange', slideSelector, zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off('gestureend', slideSelector, zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, zoom.onGestureChange, activeListenerWithCapture);
        swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, zoom.onGestureEnd, passiveListener);

        if (swiper.touchEvents.cancel) {
          swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, zoom.onGestureEnd, passiveListener);
        }
      } // Move image


      swiper.$wrapperEl.off(swiper.touchEvents.move, "." + swiper.params.zoom.containerClass, zoom.onTouchMove, activeListenerWithCapture);
    }
  };
  var Zoom$1 = {
    name: 'zoom',
    params: {
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: 'swiper-zoom-container',
        zoomedSlideClass: 'swiper-slide-zoomed'
      }
    },
    create: function create() {
      var swiper = this;
      var zoom = {
        enabled: false,
        scale: 1,
        currentScale: 1,
        isScaling: false,
        gesture: {
          $slideEl: undefined,
          slideWidth: undefined,
          slideHeight: undefined,
          $imageEl: undefined,
          $imageWrapEl: undefined,
          maxRatio: 3
        },
        image: {
          isTouched: undefined,
          isMoved: undefined,
          currentX: undefined,
          currentY: undefined,
          minX: undefined,
          minY: undefined,
          maxX: undefined,
          maxY: undefined,
          width: undefined,
          height: undefined,
          startX: undefined,
          startY: undefined,
          touchesStart: {},
          touchesCurrent: {}
        },
        velocity: {
          x: undefined,
          y: undefined,
          prevPositionX: undefined,
          prevPositionY: undefined,
          prevTime: undefined
        }
      };
      'onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out'.split(' ').forEach(function (methodName) {
        zoom[methodName] = Zoom[methodName].bind(swiper);
      });
      Utils.extend(swiper, {
        zoom: zoom
      });
      var scale = 1;
      Object.defineProperty(swiper.zoom, 'scale', {
        get: function get() {
          return scale;
        },
        set: function set(value) {
          if (scale !== value) {
            var imageEl = swiper.zoom.gesture.$imageEl ? swiper.zoom.gesture.$imageEl[0] : undefined;
            var slideEl = swiper.zoom.gesture.$slideEl ? swiper.zoom.gesture.$slideEl[0] : undefined;
            swiper.emit('zoomChange', value, imageEl, slideEl);
          }

          scale = value;
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.zoom.enabled) {
          swiper.zoom.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.zoom.disable();
      },
      touchStart: function touchStart(e) {
        var swiper = this;

        if (!swiper.zoom.enabled) {
          return;
        }

        swiper.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(e) {
        var swiper = this;

        if (!swiper.zoom.enabled) {
          return;
        }

        swiper.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(e) {
        var swiper = this;

        if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          swiper.zoom.toggle(e);
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;

        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          swiper.zoom.onTransitionEnd();
        }
      },
      slideChange: function slideChange() {
        var swiper = this;

        if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
          swiper.zoom.onTransitionEnd();
        }
      }
    }
  };
  var Lazy = {
    loadInSlide: function loadInSlide(index, loadInDuplicate) {
      if (loadInDuplicate === void 0) loadInDuplicate = true;
      var swiper = this;
      var params = swiper.params.lazy;

      if (typeof index === 'undefined') {
        return;
      }

      if (swiper.slides.length === 0) {
        return;
      }

      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var $slideEl = isVirtual ? swiper.$wrapperEl.children("." + swiper.params.slideClass + "[data-swiper-slide-index=\"" + index + "\"]") : swiper.slides.eq(index);
      var $images = $slideEl.find("." + params.elementClass + ":not(." + params.loadedClass + "):not(." + params.loadingClass + ")");

      if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
        $images = $images.add($slideEl[0]);
      }

      if ($images.length === 0) {
        return;
      }

      $images.each(function (imageIndex, imageEl) {
        var $imageEl = $(imageEl);
        $imageEl.addClass(params.loadingClass);
        var background = $imageEl.attr('data-background');
        var src = $imageEl.attr('data-src');
        var srcset = $imageEl.attr('data-srcset');
        var sizes = $imageEl.attr('data-sizes');
        var $pictureEl = $imageEl.parent('picture');
        swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, function () {
          if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) {
            return;
          }

          if (background) {
            $imageEl.css('background-image', "url(\"" + background + "\")");
            $imageEl.removeAttr('data-background');
          } else {
            if (srcset) {
              $imageEl.attr('srcset', srcset);
              $imageEl.removeAttr('data-srcset');
            }

            if (sizes) {
              $imageEl.attr('sizes', sizes);
              $imageEl.removeAttr('data-sizes');
            }

            if ($pictureEl.length) {
              $pictureEl.children('source').each(function (sourceIndex, sourceEl) {
                var $source = $(sourceEl);

                if ($source.attr('data-srcset')) {
                  $source.attr('srcset', $source.attr('data-srcset'));
                  $source.removeAttr('data-srcset');
                }
              });
            }

            if (src) {
              $imageEl.attr('src', src);
              $imageEl.removeAttr('data-src');
            }
          }

          $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
          $slideEl.find("." + params.preloaderClass).remove();

          if (swiper.params.loop && loadInDuplicate) {
            var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');

            if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
              var originalSlide = swiper.$wrapperEl.children("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + swiper.params.slideDuplicateClass + ")");
              swiper.lazy.loadInSlide(originalSlide.index(), false);
            } else {
              var duplicatedSlide = swiper.$wrapperEl.children("." + swiper.params.slideDuplicateClass + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]");
              swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
            }
          }

          swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);

          if (swiper.params.autoHeight) {
            swiper.updateAutoHeight();
          }
        });
        swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
      });
    },
    load: function load() {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var swiperParams = swiper.params;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
      var params = swiperParams.lazy;
      var slidesPerView = swiperParams.slidesPerView;

      if (slidesPerView === 'auto') {
        slidesPerView = 0;
      }

      function slideExist(index) {
        if (isVirtual) {
          if ($wrapperEl.children("." + swiperParams.slideClass + "[data-swiper-slide-index=\"" + index + "\"]").length) {
            return true;
          }
        } else if (slides[index]) {
          return true;
        }

        return false;
      }

      function slideIndex(slideEl) {
        if (isVirtual) {
          return $(slideEl).attr('data-swiper-slide-index');
        }

        return $(slideEl).index();
      }

      if (!swiper.lazy.initialImageLoaded) {
        swiper.lazy.initialImageLoaded = true;
      }

      if (swiper.params.watchSlidesVisibility) {
        $wrapperEl.children("." + swiperParams.slideVisibleClass).each(function (elIndex, slideEl) {
          var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
          swiper.lazy.loadInSlide(index);
        });
      } else if (slidesPerView > 1) {
        for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
          if (slideExist(i)) {
            swiper.lazy.loadInSlide(i);
          }
        }
      } else {
        swiper.lazy.loadInSlide(activeIndex);
      }

      if (params.loadPrevNext) {
        if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
          var amount = params.loadPrevNextAmount;
          var spv = slidesPerView;
          var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
          var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

          for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
            if (slideExist(i$1)) {
              swiper.lazy.loadInSlide(i$1);
            }
          } // Prev Slides


          for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
            if (slideExist(i$2)) {
              swiper.lazy.loadInSlide(i$2);
            }
          }
        } else {
          var nextSlide = $wrapperEl.children("." + swiperParams.slideNextClass);

          if (nextSlide.length > 0) {
            swiper.lazy.loadInSlide(slideIndex(nextSlide));
          }

          var prevSlide = $wrapperEl.children("." + swiperParams.slidePrevClass);

          if (prevSlide.length > 0) {
            swiper.lazy.loadInSlide(slideIndex(prevSlide));
          }
        }
      }
    }
  };
  var Lazy$1 = {
    name: 'lazy',
    params: {
      lazy: {
        enabled: false,
        loadPrevNext: false,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,
        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        preloaderClass: 'swiper-lazy-preloader'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        lazy: {
          initialImageLoaded: false,
          load: Lazy.load.bind(swiper),
          loadInSlide: Lazy.loadInSlide.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      },
      init: function init() {
        var swiper = this;

        if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
          swiper.lazy.load();
        }
      },
      scroll: function scroll() {
        var swiper = this;

        if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
          swiper.lazy.load();
        }
      },
      resize: function resize() {
        var swiper = this;

        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      scrollbarDragMove: function scrollbarDragMove() {
        var swiper = this;

        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      transitionStart: function transitionStart() {
        var swiper = this;

        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded) {
            swiper.lazy.load();
          }
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;

        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          swiper.lazy.load();
        }
      },
      slideChange: function slideChange() {
        var swiper = this;

        if (swiper.params.lazy.enabled && swiper.params.cssMode) {
          swiper.lazy.load();
        }
      }
    }
  };
  /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

  var Controller = {
    LinearSpline: function LinearSpline(x, y) {
      var binarySearch = function search() {
        var maxIndex;
        var minIndex;
        var guess;
        return function (array, val) {
          minIndex = -1;
          maxIndex = array.length;

          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;

            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }

          return maxIndex;
        };
      }();

      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.

      var i1;
      var i3;

      this.interpolate = function interpolate(x2) {
        if (!x2) {
          return 0;
        } // Get the indexes of x1 and x3 (the array indexes before and after given x2):


        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

        return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
      };

      return this;
    },
    // xxx: for now i will just save one spline function to to
    getInterpolateFunction: function getInterpolateFunction(c) {
      var swiper = this;

      if (!swiper.controller.spline) {
        swiper.controller.spline = swiper.params.loop ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
      }
    },
    setTranslate: function setTranslate(setTranslate$1, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var multiplier;
      var controlledTranslate;

      function setControlledTranslate(c) {
        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;

        if (swiper.params.controller.by === 'slide') {
          swiper.controller.getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out

          controlledTranslate = -swiper.controller.spline.interpolate(-translate);
        }

        if (!controlledTranslate || swiper.params.controller.by === 'container') {
          multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
        }

        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }

        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }

      if (Array.isArray(controlled)) {
        for (var i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var i;

      function setControlledTransition(c) {
        c.setTransition(duration, swiper);

        if (duration !== 0) {
          c.transitionStart();

          if (c.params.autoHeight) {
            Utils.nextTick(function () {
              c.updateAutoHeight();
            });
          }

          c.$wrapperEl.transitionEnd(function () {
            if (!controlled) {
              return;
            }

            if (c.params.loop && swiper.params.controller.by === 'slide') {
              c.loopFix();
            }

            c.transitionEnd();
          });
        }
      }

      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTransition(controlled);
      }
    }
  };
  var Controller$1 = {
    name: 'controller',
    params: {
      controller: {
        control: undefined,
        inverse: false,
        by: 'slide' // or 'container'

      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        controller: {
          control: swiper.params.controller.control,
          getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
          setTranslate: Controller.setTranslate.bind(swiper),
          setTransition: Controller.setTransition.bind(swiper)
        }
      });
    },
    on: {
      update: function update() {
        var swiper = this;

        if (!swiper.controller.control) {
          return;
        }

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      resize: function resize() {
        var swiper = this;

        if (!swiper.controller.control) {
          return;
        }

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;

        if (!swiper.controller.control) {
          return;
        }

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      setTranslate: function setTranslate(translate, byController) {
        var swiper = this;

        if (!swiper.controller.control) {
          return;
        }

        swiper.controller.setTranslate(translate, byController);
      },
      setTransition: function setTransition(duration, byController) {
        var swiper = this;

        if (!swiper.controller.control) {
          return;
        }

        swiper.controller.setTransition(duration, byController);
      }
    }
  };
  var a11y = {
    makeElFocusable: function makeElFocusable($el) {
      $el.attr('tabIndex', '0');
      return $el;
    },
    makeElNotFocusable: function makeElNotFocusable($el) {
      $el.attr('tabIndex', '-1');
      return $el;
    },
    addElRole: function addElRole($el, role) {
      $el.attr('role', role);
      return $el;
    },
    addElLabel: function addElLabel($el, label) {
      $el.attr('aria-label', label);
      return $el;
    },
    disableEl: function disableEl($el) {
      $el.attr('aria-disabled', true);
      return $el;
    },
    enableEl: function enableEl($el) {
      $el.attr('aria-disabled', false);
      return $el;
    },
    onEnterKey: function onEnterKey(e) {
      var swiper = this;
      var params = swiper.params.a11y;

      if (e.keyCode !== 13) {
        return;
      }

      var $targetEl = $(e.target);

      if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }

        if (swiper.isEnd) {
          swiper.a11y.notify(params.lastSlideMessage);
        } else {
          swiper.a11y.notify(params.nextSlideMessage);
        }
      }

      if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }

        if (swiper.isBeginning) {
          swiper.a11y.notify(params.firstSlideMessage);
        } else {
          swiper.a11y.notify(params.prevSlideMessage);
        }
      }

      if (swiper.pagination && $targetEl.is("." + swiper.params.pagination.bulletClass)) {
        $targetEl[0].click();
      }
    },
    notify: function notify(message) {
      var swiper = this;
      var notification = swiper.a11y.liveRegion;

      if (notification.length === 0) {
        return;
      }

      notification.html('');
      notification.html(message);
    },
    updateNavigation: function updateNavigation() {
      var swiper = this;

      if (swiper.params.loop || !swiper.navigation) {
        return;
      }

      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          swiper.a11y.disableEl($prevEl);
          swiper.a11y.makeElNotFocusable($prevEl);
        } else {
          swiper.a11y.enableEl($prevEl);
          swiper.a11y.makeElFocusable($prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          swiper.a11y.disableEl($nextEl);
          swiper.a11y.makeElNotFocusable($nextEl);
        } else {
          swiper.a11y.enableEl($nextEl);
          swiper.a11y.makeElFocusable($nextEl);
        }
      }
    },
    updatePagination: function updatePagination() {
      var swiper = this;
      var params = swiper.params.a11y;

      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
          var $bulletEl = $(bulletEl);
          swiper.a11y.makeElFocusable($bulletEl);
          swiper.a11y.addElRole($bulletEl, 'button');
          swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1));
        });
      }
    },
    init: function init() {
      var swiper = this;
      swiper.$el.append(swiper.a11y.liveRegion); // Navigation

      var params = swiper.params.a11y;
      var $nextEl;
      var $prevEl;

      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }

      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }

      if ($nextEl) {
        swiper.a11y.makeElFocusable($nextEl);
        swiper.a11y.addElRole($nextEl, 'button');
        swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
        $nextEl.on('keydown', swiper.a11y.onEnterKey);
      }

      if ($prevEl) {
        swiper.a11y.makeElFocusable($prevEl);
        swiper.a11y.addElRole($prevEl, 'button');
        swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
        $prevEl.on('keydown', swiper.a11y.onEnterKey);
      } // Pagination


      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.on('keydown', "." + swiper.params.pagination.bulletClass, swiper.a11y.onEnterKey);
      }
    },
    destroy: function destroy() {
      var swiper = this;

      if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) {
        swiper.a11y.liveRegion.remove();
      }

      var $nextEl;
      var $prevEl;

      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }

      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }

      if ($nextEl) {
        $nextEl.off('keydown', swiper.a11y.onEnterKey);
      }

      if ($prevEl) {
        $prevEl.off('keydown', swiper.a11y.onEnterKey);
      } // Pagination


      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.off('keydown', "." + swiper.params.pagination.bulletClass, swiper.a11y.onEnterKey);
      }
    }
  };
  var A11y = {
    name: 'a11y',
    params: {
      a11y: {
        enabled: true,
        notificationClass: 'swiper-notification',
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        a11y: {
          liveRegion: $("<span class=\"" + swiper.params.a11y.notificationClass + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")
        }
      });
      Object.keys(a11y).forEach(function (methodName) {
        swiper.a11y[methodName] = a11y[methodName].bind(swiper);
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (!swiper.params.a11y.enabled) {
          return;
        }

        swiper.a11y.init();
        swiper.a11y.updateNavigation();
      },
      toEdge: function toEdge() {
        var swiper = this;

        if (!swiper.params.a11y.enabled) {
          return;
        }

        swiper.a11y.updateNavigation();
      },
      fromEdge: function fromEdge() {
        var swiper = this;

        if (!swiper.params.a11y.enabled) {
          return;
        }

        swiper.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate() {
        var swiper = this;

        if (!swiper.params.a11y.enabled) {
          return;
        }

        swiper.a11y.updatePagination();
      },
      destroy: function destroy() {
        var swiper = this;

        if (!swiper.params.a11y.enabled) {
          return;
        }

        swiper.a11y.destroy();
      }
    }
  };
  var History = {
    init: function init() {
      var swiper = this;

      if (!swiper.params.history) {
        return;
      }

      if (!win.history || !win.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }

      var history = swiper.history;
      history.initialized = true;
      history.paths = History.getPathValues();

      if (!history.paths.key && !history.paths.value) {
        return;
      }

      history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);

      if (!swiper.params.history.replaceState) {
        win.addEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    destroy: function destroy() {
      var swiper = this;

      if (!swiper.params.history.replaceState) {
        win.removeEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    setHistoryPopState: function setHistoryPopState() {
      var swiper = this;
      swiper.history.paths = History.getPathValues();
      swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
    },
    getPathValues: function getPathValues() {
      var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) {
        return part !== '';
      });
      var total = pathArray.length;
      var key = pathArray[total - 2];
      var value = pathArray[total - 1];
      return {
        key: key,
        value: value
      };
    },
    setHistory: function setHistory(key, index) {
      var swiper = this;

      if (!swiper.history.initialized || !swiper.params.history.enabled) {
        return;
      }

      var slide = swiper.slides.eq(index);
      var value = History.slugify(slide.attr('data-history'));

      if (!win.location.pathname.includes(key)) {
        value = key + "/" + value;
      }

      var currentState = win.history.state;

      if (currentState && currentState.value === value) {
        return;
      }

      if (swiper.params.history.replaceState) {
        win.history.replaceState({
          value: value
        }, null, value);
      } else {
        win.history.pushState({
          value: value
        }, null, value);
      }
    },
    slugify: function slugify(text) {
      return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    },
    scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
      var swiper = this;

      if (value) {
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHistory = History.slugify(slide.attr('data-history'));

          if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    }
  };
  var History$1 = {
    name: 'history',
    params: {
      history: {
        enabled: false,
        replaceState: false,
        key: 'slides'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        history: {
          init: History.init.bind(swiper),
          setHistory: History.setHistory.bind(swiper),
          setHistoryPopState: History.setHistoryPopState.bind(swiper),
          scrollToSlide: History.scrollToSlide.bind(swiper),
          destroy: History.destroy.bind(swiper)
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.history.enabled) {
          swiper.history.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;

        if (swiper.params.history.enabled) {
          swiper.history.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;

        if (swiper.history.initialized) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      },
      slideChange: function slideChange() {
        var swiper = this;

        if (swiper.history.initialized && swiper.params.cssMode) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      }
    }
  };
  var HashNavigation = {
    onHashCange: function onHashCange() {
      var swiper = this;
      swiper.emit('hashChange');
      var newHash = doc.location.hash.replace('#', '');
      var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');

      if (newHash !== activeSlideHash) {
        var newIndex = swiper.$wrapperEl.children("." + swiper.params.slideClass + "[data-hash=\"" + newHash + "\"]").index();

        if (typeof newIndex === 'undefined') {
          return;
        }

        swiper.slideTo(newIndex);
      }
    },
    setHash: function setHash() {
      var swiper = this;

      if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) {
        return;
      }

      if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
        win.history.replaceState(null, null, "#" + swiper.slides.eq(swiper.activeIndex).attr('data-hash') || '');
        swiper.emit('hashSet');
      } else {
        var slide = swiper.slides.eq(swiper.activeIndex);
        var hash = slide.attr('data-hash') || slide.attr('data-history');
        doc.location.hash = hash || '';
        swiper.emit('hashSet');
      }
    },
    init: function init() {
      var swiper = this;

      if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) {
        return;
      }

      swiper.hashNavigation.initialized = true;
      var hash = doc.location.hash.replace('#', '');

      if (hash) {
        var speed = 0;

        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHash = slide.attr('data-hash') || slide.attr('data-history');

          if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
          }
        }
      }

      if (swiper.params.hashNavigation.watchState) {
        $(win).on('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      var swiper = this;

      if (swiper.params.hashNavigation.watchState) {
        $(win).off('hashchange', swiper.hashNavigation.onHashCange);
      }
    }
  };
  var HashNavigation$1 = {
    name: 'hash-navigation',
    params: {
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        hashNavigation: {
          initialized: false,
          init: HashNavigation.init.bind(swiper),
          destroy: HashNavigation.destroy.bind(swiper),
          setHash: HashNavigation.setHash.bind(swiper),
          onHashCange: HashNavigation.onHashCange.bind(swiper)
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;

        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;

        if (swiper.hashNavigation.initialized) {
          swiper.hashNavigation.setHash();
        }
      },
      slideChange: function slideChange() {
        var swiper = this;

        if (swiper.hashNavigation.initialized && swiper.params.cssMode) {
          swiper.hashNavigation.setHash();
        }
      }
    }
  };
  /* eslint no-underscore-dangle: "off" */

  var Autoplay = {
    run: function run() {
      var swiper = this;
      var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      var delay = swiper.params.autoplay.delay;

      if ($activeSlideEl.attr('data-swiper-autoplay')) {
        delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
      }

      clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.timeout = Utils.nextTick(function () {
        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isBeginning) {
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isEnd) {
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }

        if (swiper.params.cssMode && swiper.autoplay.running) {
          swiper.autoplay.run();
        }
      }, delay);
    },
    start: function start() {
      var swiper = this;

      if (typeof swiper.autoplay.timeout !== 'undefined') {
        return false;
      }

      if (swiper.autoplay.running) {
        return false;
      }

      swiper.autoplay.running = true;
      swiper.emit('autoplayStart');
      swiper.autoplay.run();
      return true;
    },
    stop: function stop() {
      var swiper = this;

      if (!swiper.autoplay.running) {
        return false;
      }

      if (typeof swiper.autoplay.timeout === 'undefined') {
        return false;
      }

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = undefined;
      }

      swiper.autoplay.running = false;
      swiper.emit('autoplayStop');
      return true;
    },
    pause: function pause(speed) {
      var swiper = this;

      if (!swiper.autoplay.running) {
        return;
      }

      if (swiper.autoplay.paused) {
        return;
      }

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
      }

      swiper.autoplay.paused = true;

      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        swiper.autoplay.run();
      } else {
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
      }
    }
  };
  var Autoplay$1 = {
    name: 'autoplay',
    params: {
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        autoplay: {
          running: false,
          paused: false,
          run: Autoplay.run.bind(swiper),
          start: Autoplay.start.bind(swiper),
          stop: Autoplay.stop.bind(swiper),
          pause: Autoplay.pause.bind(swiper),
          onVisibilityChange: function onVisibilityChange() {
            if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
              swiper.autoplay.pause();
            }

            if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
              swiper.autoplay.run();
              swiper.autoplay.paused = false;
            }
          },
          onTransitionEnd: function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.$wrapperEl) {
              return;
            }

            if (e.target !== this) {
              return;
            }

            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
            swiper.autoplay.paused = false;

            if (!swiper.autoplay.running) {
              swiper.autoplay.stop();
            } else {
              swiper.autoplay.run();
            }
          }
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
          document.addEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
        }
      },
      beforeTransitionStart: function beforeTransitionStart(speed, internal) {
        var swiper = this;

        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            swiper.autoplay.stop();
          }
        }
      },
      sliderFirstMove: function sliderFirstMove() {
        var swiper = this;

        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.pause();
          }
        }
      },
      touchEnd: function touchEnd() {
        var swiper = this;

        if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.run();
        }
      },
      destroy: function destroy() {
        var swiper = this;

        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }

        document.removeEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
      }
    }
  };
  var Fade = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = swiper.slides.eq(i);
        var offset = $slideEl[0].swiperSlideOffset;
        var tx = -offset;

        if (!swiper.params.virtualTranslate) {
          tx -= swiper.translate;
        }

        var ty = 0;

        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }

        var slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl.css({
          opacity: slideOpacity
        }).transform("translate3d(" + tx + "px, " + ty + "px, 0px)");
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration);

      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        slides.transitionEnd(function () {
          if (eventTriggered) {
            return;
          }

          if (!swiper || swiper.destroyed) {
            return;
          }

          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];

          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  };
  var EffectFade = {
    name: 'effect-fade',
    params: {
      fadeEffect: {
        crossFade: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        fadeEffect: {
          setTranslate: Fade.setTranslate.bind(swiper),
          setTransition: Fade.setTransition.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (swiper.params.effect !== 'fade') {
          return;
        }

        swiper.classNames.push(swiper.params.containerModifierClass + "fade");
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (swiper.params.effect !== 'fade') {
          return;
        }

        swiper.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;

        if (swiper.params.effect !== 'fade') {
          return;
        }

        swiper.fadeEffect.setTransition(duration);
      }
    }
  };
  var Cube = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var rtl = swiper.rtlTranslate;
      var swiperSize = swiper.size;
      var params = swiper.params.cubeEffect;
      var isHorizontal = swiper.isHorizontal();
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var wrapperRotate = 0;
      var $cubeShadowEl;

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');

          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }

          $cubeShadowEl.css({
            height: swiperWidth + "px"
          });
        } else {
          $cubeShadowEl = $el.find('.swiper-cube-shadow');

          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideIndex = i;

        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
        }

        var slideAngle = slideIndex * 90;
        var round = Math.floor(slideAngle / 360);

        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }

        var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        var tx = 0;
        var ty = 0;
        var tz = 0;

        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + round * 4 * swiperSize;
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = 3 * swiperSize + swiperSize * 4 * round;
        }

        if (rtl) {
          tx = -tx;
        }

        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

        var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";

        if (progress <= 1 && progress > -1) {
          wrapperRotate = slideIndex * 90 + progress * 90;

          if (rtl) {
            wrapperRotate = -slideIndex * 90 - progress * 90;
          }
        }

        $slideEl.transform(transform);

        if (params.slideShadows) {
          // Set shadows
          var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

          if (shadowBefore.length === 0) {
            shadowBefore = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>");
            $slideEl.append(shadowBefore);
          }

          if (shadowAfter.length === 0) {
            shadowAfter = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>");
            $slideEl.append(shadowAfter);
          }

          if (shadowBefore.length) {
            shadowBefore[0].style.opacity = Math.max(-progress, 0);
          }

          if (shadowAfter.length) {
            shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }
      }

      $wrapperEl.css({
        '-webkit-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
        '-moz-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
        '-ms-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
        'transform-origin': "50% 50% -" + swiperSize / 2 + "px"
      });

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform("translate3d(0px, " + (swiperWidth / 2 + params.shadowOffset) + "px, " + -swiperWidth / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + params.shadowScale + ")");
        } else {
          var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
          var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
          var scale1 = params.shadowScale;
          var scale2 = params.shadowScale / multiplier;
          var offset = params.shadowOffset;
          $cubeShadowEl.transform("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + (swiperHeight / 2 + offset) + "px, " + -swiperHeight / 2 / scale2 + "px) rotateX(-90deg)");
        }
      }

      var zFactor = Browser.isSafari || Browser.isUiWebView ? -swiperSize / 2 : 0;
      $wrapperEl.transform("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)");
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find('.swiper-cube-shadow').transition(duration);
      }
    }
  };
  var EffectCube = {
    name: 'effect-cube',
    params: {
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        cubeEffect: {
          setTranslate: Cube.setTranslate.bind(swiper),
          setTransition: Cube.setTransition.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (swiper.params.effect !== 'cube') {
          return;
        }

        swiper.classNames.push(swiper.params.containerModifierClass + "cube");
        swiper.classNames.push(swiper.params.containerModifierClass + "3d");
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (swiper.params.effect !== 'cube') {
          return;
        }

        swiper.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;

        if (swiper.params.effect !== 'cube') {
          return;
        }

        swiper.cubeEffect.setTransition(duration);
      }
    }
  };
  var Flip = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      var rtl = swiper.rtlTranslate;

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var progress = $slideEl[0].progress;

        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }

        var offset = $slideEl[0].swiperSlideOffset;
        var rotate = -180 * progress;
        var rotateY = rotate;
        var rotateX = 0;
        var tx = -offset;
        var ty = 0;

        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

        if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

          if (shadowBefore.length === 0) {
            shadowBefore = $("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>");
            $slideEl.append(shadowBefore);
          }

          if (shadowAfter.length === 0) {
            shadowAfter = $("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>");
            $slideEl.append(shadowAfter);
          }

          if (shadowBefore.length) {
            shadowBefore[0].style.opacity = Math.max(-progress, 0);
          }

          if (shadowAfter.length) {
            shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }

        $slideEl.transform("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)");
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false; // eslint-disable-next-line

        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) {
            return;
          }

          if (!swiper || swiper.destroyed) {
            return;
          } // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;


          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];

          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  };
  var EffectFlip = {
    name: 'effect-flip',
    params: {
      flipEffect: {
        slideShadows: true,
        limitRotation: true
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        flipEffect: {
          setTranslate: Flip.setTranslate.bind(swiper),
          setTransition: Flip.setTransition.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (swiper.params.effect !== 'flip') {
          return;
        }

        swiper.classNames.push(swiper.params.containerModifierClass + "flip");
        swiper.classNames.push(swiper.params.containerModifierClass + "3d");
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (swiper.params.effect !== 'flip') {
          return;
        }

        swiper.flipEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;

        if (swiper.params.effect !== 'flip') {
          return;
        }

        swiper.flipEffect.setTransition(duration);
      }
    }
  };
  var Coverflow = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      var slidesSizesGrid = swiper.slidesSizesGrid;
      var params = swiper.params.coverflowEffect;
      var isHorizontal = swiper.isHorizontal();
      var transform = swiper.translate;
      var center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
      var rotate = isHorizontal ? params.rotate : -params.rotate;
      var translate = params.depth; // Each slide offset from center

      for (var i = 0, length = slides.length; i < length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideSize = slidesSizesGrid[i];
        var slideOffset = $slideEl[0].swiperSlideOffset;
        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * params.modifier;
        var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

        var translateZ = -translate * Math.abs(offsetMultiplier);
        var stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders

        if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
          stretch = parseFloat(params.stretch) / 100 * slideSize;
        }

        var translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
        var translateX = isHorizontal ? stretch * offsetMultiplier : 0; // Fix for ultra small values

        if (Math.abs(translateX) < 0.001) {
          translateX = 0;
        }

        if (Math.abs(translateY) < 0.001) {
          translateY = 0;
        }

        if (Math.abs(translateZ) < 0.001) {
          translateZ = 0;
        }

        if (Math.abs(rotateY) < 0.001) {
          rotateY = 0;
        }

        if (Math.abs(rotateX) < 0.001) {
          rotateX = 0;
        }

        var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

        if (params.slideShadows) {
          // Set shadows
          var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>");
            $slideEl.append($shadowBeforeEl);
          }

          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>");
            $slideEl.append($shadowAfterEl);
          }

          if ($shadowBeforeEl.length) {
            $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
          }

          if ($shadowAfterEl.length) {
            $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
          }
        }
      } // Set correct perspective for IE10


      if (Support.pointerEvents || Support.prefixedPointerEvents) {
        var ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = center + "px 50%";
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
    }
  };
  var EffectCoverflow = {
    name: 'effect-coverflow',
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        coverflowEffect: {
          setTranslate: Coverflow.setTranslate.bind(swiper),
          setTransition: Coverflow.setTransition.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (swiper.params.effect !== 'coverflow') {
          return;
        }

        swiper.classNames.push(swiper.params.containerModifierClass + "coverflow");
        swiper.classNames.push(swiper.params.containerModifierClass + "3d");
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (swiper.params.effect !== 'coverflow') {
          return;
        }

        swiper.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;

        if (swiper.params.effect !== 'coverflow') {
          return;
        }

        swiper.coverflowEffect.setTransition(duration);
      }
    }
  };
  var Thumbs = {
    init: function init() {
      var swiper = this;
      var ref = swiper.params;
      var thumbsParams = ref.thumbs;
      var SwiperClass = swiper.constructor;

      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        Utils.extend(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false
        });
        Utils.extend(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false
        });
      } else if (Utils.isObject(thumbsParams.swiper)) {
        swiper.thumbs.swiper = new SwiperClass(Utils.extend({}, thumbsParams.swiper, {
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          slideToClickedSlide: false
        }));
        swiper.thumbs.swiperCreated = true;
      }

      swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
      swiper.thumbs.swiper.on('tap', swiper.thumbs.onThumbClick);
    },
    onThumbClick: function onThumbClick() {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;

      if (!thumbsSwiper) {
        return;
      }

      var clickedIndex = thumbsSwiper.clickedIndex;
      var clickedSlide = thumbsSwiper.clickedSlide;

      if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) {
        return;
      }

      if (typeof clickedIndex === 'undefined' || clickedIndex === null) {
        return;
      }

      var slideToIndex;

      if (thumbsSwiper.params.loop) {
        slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      } else {
        slideToIndex = clickedIndex;
      }

      if (swiper.params.loop) {
        var currentIndex = swiper.activeIndex;

        if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
          swiper.loopFix(); // eslint-disable-next-line

          swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
          currentIndex = swiper.activeIndex;
        }

        var prevIndex = swiper.slides.eq(currentIndex).prevAll("[data-swiper-slide-index=\"" + slideToIndex + "\"]").eq(0).index();
        var nextIndex = swiper.slides.eq(currentIndex).nextAll("[data-swiper-slide-index=\"" + slideToIndex + "\"]").eq(0).index();

        if (typeof prevIndex === 'undefined') {
          slideToIndex = nextIndex;
        } else if (typeof nextIndex === 'undefined') {
          slideToIndex = prevIndex;
        } else if (nextIndex - currentIndex < currentIndex - prevIndex) {
          slideToIndex = nextIndex;
        } else {
          slideToIndex = prevIndex;
        }
      }

      swiper.slideTo(slideToIndex);
    },
    update: function update(initial) {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;

      if (!thumbsSwiper) {
        return;
      }

      var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
      var autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
      var useOffset = autoScrollOffset && !thumbsSwiper.params.loop;

      if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
        var currentThumbsIndex = thumbsSwiper.activeIndex;
        var newThumbsIndex;
        var direction;

        if (thumbsSwiper.params.loop) {
          if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
            thumbsSwiper.loopFix(); // eslint-disable-next-line

            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
            currentThumbsIndex = thumbsSwiper.activeIndex;
          } // Find actual thumbs index to slide to


          var prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll("[data-swiper-slide-index=\"" + swiper.realIndex + "\"]").eq(0).index();
          var nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll("[data-swiper-slide-index=\"" + swiper.realIndex + "\"]").eq(0).index();

          if (typeof prevThumbsIndex === 'undefined') {
            newThumbsIndex = nextThumbsIndex;
          } else if (typeof nextThumbsIndex === 'undefined') {
            newThumbsIndex = prevThumbsIndex;
          } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
            newThumbsIndex = currentThumbsIndex;
          } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
            newThumbsIndex = nextThumbsIndex;
          } else {
            newThumbsIndex = prevThumbsIndex;
          }

          direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
        } else {
          newThumbsIndex = swiper.realIndex;
          direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
        }

        if (useOffset) {
          newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
        }

        if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
          if (thumbsSwiper.params.centeredSlides) {
            if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            } else {
              newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
            }
          } else if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - slidesPerView + 1;
          }

          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
        }
      } // Activate thumbs


      var thumbsToActivate = 1;
      var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
        thumbsToActivate = swiper.params.slidesPerView;
      }

      if (!swiper.params.thumbs.multipleActiveThumbs) {
        thumbsToActivate = 1;
      }

      thumbsToActivate = Math.floor(thumbsToActivate);
      thumbsSwiper.slides.removeClass(thumbActiveClass);

      if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
        for (var i = 0; i < thumbsToActivate; i += 1) {
          thumbsSwiper.$wrapperEl.children("[data-swiper-slide-index=\"" + (swiper.realIndex + i) + "\"]").addClass(thumbActiveClass);
        }
      } else {
        for (var i$1 = 0; i$1 < thumbsToActivate; i$1 += 1) {
          thumbsSwiper.slides.eq(swiper.realIndex + i$1).addClass(thumbActiveClass);
        }
      }
    }
  };
  var Thumbs$1 = {
    name: 'thumbs',
    params: {
      thumbs: {
        swiper: null,
        multipleActiveThumbs: true,
        autoScrollOffset: 0,
        slideThumbActiveClass: 'swiper-slide-thumb-active',
        thumbsContainerClass: 'swiper-container-thumbs'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        thumbs: {
          swiper: null,
          init: Thumbs.init.bind(swiper),
          update: Thumbs.update.bind(swiper),
          onThumbClick: Thumbs.onThumbClick.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        var ref = swiper.params;
        var thumbs = ref.thumbs;

        if (!thumbs || !thumbs.swiper) {
          return;
        }

        swiper.thumbs.init();
        swiper.thumbs.update(true);
      },
      slideChange: function slideChange() {
        var swiper = this;

        if (!swiper.thumbs.swiper) {
          return;
        }

        swiper.thumbs.update();
      },
      update: function update() {
        var swiper = this;

        if (!swiper.thumbs.swiper) {
          return;
        }

        swiper.thumbs.update();
      },
      resize: function resize() {
        var swiper = this;

        if (!swiper.thumbs.swiper) {
          return;
        }

        swiper.thumbs.update();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;

        if (!swiper.thumbs.swiper) {
          return;
        }

        swiper.thumbs.update();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;

        if (!thumbsSwiper) {
          return;
        }

        thumbsSwiper.setTransition(duration);
      },
      beforeDestroy: function beforeDestroy() {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;

        if (!thumbsSwiper) {
          return;
        }

        if (swiper.thumbs.swiperCreated && thumbsSwiper) {
          thumbsSwiper.destroy();
        }
      }
    }
  }; // Swiper Class

  var components = [Device$1, Support$1, Browser$1, Resize, Observer$1, Virtual$1, Keyboard$1, Mousewheel$1, Navigation$1, Pagination$1, Scrollbar$1, Parallax$1, Zoom$1, Lazy$1, Controller$1, A11y, History$1, HashNavigation$1, Autoplay$1, EffectFade, EffectCube, EffectFlip, EffectCoverflow, Thumbs$1];

  if (typeof Swiper.use === 'undefined') {
    Swiper.use = Swiper.Class.use;
    Swiper.installModule = Swiper.Class.installModule;
  }

  Swiper.use(components);
  return Swiper;
});
"use strict";

/*!
 * jQuery Accordion 0.0.1
 * (c) 2014 Victor Fernandez <victor@vctrfrnndz.com>
 * MIT Licensed.
 */
;

(function ($, window, document, undefined) {
  var pluginName = 'accordion',
      defaults = {
    transitionSpeed: 300,
    transitionEasing: 'ease',
    controlElement: '[data-control]',
    contentElement: '[data-content]',
    groupElement: '[data-accordion-group]',
    singleOpen: true
  };

  function Accordion(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Accordion.prototype.init = function () {
    var self = this,
        opts = self.options;
    var $accordion = $(self.element),
        $controls = $accordion.find('> ' + opts.controlElement),
        $content = $accordion.find('> ' + opts.contentElement);
    var accordionParentsQty = $accordion.parents('[data-accordion]').length,
        accordionHasParent = accordionParentsQty > 0;
    var closedCSS = {
      'max-height': 0,
      'overflow': 'hidden'
    };
    var CSStransitions = supportsTransitions();

    function debounce(func, threshold, execAsap) {
      var timeout;
      return function debounced() {
        var obj = this,
            args = arguments;

        function delayed() {
          if (!execAsap) func.apply(obj, args);
          timeout = null;
        }

        ;
        if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);
        timeout = setTimeout(delayed, threshold || 100);
      };
    }

    function supportsTransitions() {
      var b = document.body || document.documentElement,
          s = b.style,
          p = 'transition';

      if (typeof s[p] == 'string') {
        return true;
      }

      var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
      p = 'Transition';

      for (var i = 0; i < v.length; i++) {
        if (typeof s[v[i] + p] == 'string') {
          return true;
        }
      }

      return false;
    }

    function requestAnimFrame(cb) {
      if (window.requestAnimationFrame) {
        requestAnimationFrame(cb);
      } else if (window.webkitRequestAnimationFrame) {
        webkitRequestAnimationFrame(cb);
      } else if (window.mozRequestAnimationFrame) {
        mozRequestAnimationFrame(cb);
      } else {
        setTimeout(cb, 1000 / 60);
      }
    }

    function toggleTransition($el, remove) {
      if (!remove) {
        $content.css({
          '-webkit-transition': 'max-height ' + opts.transitionSpeed + 'ms ' + opts.transitionEasing,
          'transition': 'max-height ' + opts.transitionSpeed + 'ms ' + opts.transitionEasing
        });
      } else {
        $content.css({
          '-webkit-transition': '',
          'transition': ''
        });
      }
    }

    function calculateHeight($el) {
      var height = 0;
      $el.children().each(function () {
        height = height + $(this).outerHeight(true);
      });
      $el.data('oHeight', height);
    }

    function updateParentHeight($parentAccordion, $currentAccordion, qty, operation) {
      var $content = $parentAccordion.filter('.open').find('> [data-content]'),
          $childs = $content.find('[data-accordion].open > [data-content]'),
          $matched;

      if (!opts.singleOpen) {
        $childs = $childs.not($currentAccordion.siblings('[data-accordion].open').find('> [data-content]'));
      }

      $matched = $content.add($childs);

      if ($parentAccordion.hasClass('open')) {
        $matched.each(function () {
          var currentHeight = $(this).data('oHeight');

          switch (operation) {
            case '+':
              $(this).data('oHeight', currentHeight + qty);
              break;

            case '-':
              $(this).data('oHeight', currentHeight - qty);
              break;

            default:
              throw 'updateParentHeight method needs an operation';
          }

          $(this).css('max-height', $(this).data('oHeight'));
        });
      }
    }

    function refreshHeight($accordion) {
      if ($accordion.hasClass('open')) {
        var $content = $accordion.find('> [data-content]'),
            $childs = $content.find('[data-accordion].open > [data-content]'),
            $matched = $content.add($childs);
        calculateHeight($matched);
        $matched.css('max-height', $matched.data('oHeight'));
      }
    }

    function closeAccordion($accordion, $content) {
      $accordion.trigger('accordion.close');

      if (CSStransitions) {
        if (accordionHasParent) {
          var $parentAccordions = $accordion.parents('[data-accordion]');
          updateParentHeight($parentAccordions, $accordion, $content.data('oHeight'), '-');
        }

        $content.css(closedCSS);
        $accordion.removeClass('open');
      } else {
        $content.css('max-height', $content.data('oHeight'));
        $content.animate(closedCSS, opts.transitionSpeed);
        $accordion.removeClass('open');
      }
    }

    function openAccordion($accordion, $content) {
      $accordion.trigger('accordion.open');

      if (CSStransitions) {
        toggleTransition($content);

        if (accordionHasParent) {
          var $parentAccordions = $accordion.parents('[data-accordion]');
          updateParentHeight($parentAccordions, $accordion, $content.data('oHeight'), '+');
        }

        requestAnimFrame(function () {
          $content.css('max-height', $content.data('oHeight'));
        });
        $accordion.addClass('open');
      } else {
        $content.animate({
          'max-height': $content.data('oHeight')
        }, opts.transitionSpeed, function () {
          $content.css({
            'max-height': 'none'
          });
        });
        $accordion.addClass('open');
      }
    }

    function closeSiblingAccordions($accordion) {
      var $accordionGroup = $accordion.closest(opts.groupElement);
      var $siblings = $accordion.siblings('[data-accordion]').filter('.open'),
          $siblingsChildren = $siblings.find('[data-accordion]').filter('.open');
      var $otherAccordions = $siblings.add($siblingsChildren);
      $otherAccordions.each(function () {
        var $accordion = $(this),
            $content = $accordion.find(opts.contentElement);
        closeAccordion($accordion, $content);
      });
      $otherAccordions.removeClass('open');
    }

    function toggleAccordion() {
      var isAccordionGroup = opts.singleOpen ? $accordion.parents(opts.groupElement).length > 0 : false;
      calculateHeight($content);

      if (isAccordionGroup) {
        closeSiblingAccordions($accordion);
      }

      if ($accordion.hasClass('open')) {
        closeAccordion($accordion, $content);
      } else {
        openAccordion($accordion, $content);
      }
    }

    function addEventListeners() {
      $controls.on('click', toggleAccordion);
      $controls.on('accordion.toggle', function () {
        if (opts.singleOpen && $controls.length > 1) {
          return false;
        }

        toggleAccordion();
      });
      $controls.on('accordion.refresh', function () {
        refreshHeight($accordion);
      });
      $(window).on('resize', debounce(function () {
        refreshHeight($accordion);
      }));
    }

    function setup() {
      $content.each(function () {
        var $curr = $(this);

        if ($curr.css('max-height') != 0) {
          if (!$curr.closest('[data-accordion]').hasClass('open')) {
            $curr.css({
              'max-height': 0,
              'overflow': 'hidden'
            });
          } else {
            toggleTransition($curr);
            calculateHeight($curr);
            $curr.css('max-height', $curr.data('oHeight'));
          }
        }
      });

      if (!$accordion.attr('data-accordion')) {
        $accordion.attr('data-accordion', '');
        $accordion.find(opts.controlElement).attr('data-control', '');
        $accordion.find(opts.contentElement).attr('data-content', '');
      }
    }

    setup();
    addEventListeners();
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Accordion(this, options));
      }
    });
  };
})(jQuery, window, document);
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 *         ,/
 *       ,'/
 *     ,' /
 *   ,'  /_____,
 * .'____    ,'
 *      /  ,'
 *     / ,'
 *    /,'
 *   /'
 *
 * Selectric ϟ v1.13.0 (Aug 22 2017) - http://lcdsantos.github.io/jQuery-Selectric/
 *
 * Copyright (c) 2017 Leonardo Santos; MIT License
 *
 */
(function (factory) {
  /* global define */

  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }

      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  'use strict';

  var $doc = $(document);
  var $win = $(window);
  var pluginName = 'selectric';
  var classList = 'Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Below Scroll Group GroupLabel';
  var eventNamespaceSuffix = '.sl';
  var chars = ['a', 'e', 'i', 'o', 'u', 'n', 'c', 'y'];
  var diacritics = [/[\xE0-\xE5]/g, // a
  /[\xE8-\xEB]/g, // e
  /[\xEC-\xEF]/g, // i
  /[\xF2-\xF6]/g, // o
  /[\xF9-\xFC]/g, // u
  /[\xF1]/g, // n
  /[\xE7]/g, // c
  /[\xFD-\xFF]/g // y
  ];
  /**
   * Create an instance of Selectric
   *
   * @constructor
   * @param {Node} element - The &lt;select&gt; element
   * @param {object}  opts - Options
   */

  var Selectric = function Selectric(element, opts) {
    var _this = this;

    _this.element = element;
    _this.$element = $(element);
    _this.state = {
      multiple: !!_this.$element.attr('multiple'),
      enabled: false,
      opened: false,
      currValue: -1,
      selectedIdx: -1,
      highlightedIdx: -1
    };
    _this.eventTriggers = {
      open: _this.open,
      close: _this.close,
      destroy: _this.destroy,
      refresh: _this.refresh,
      init: _this.init
    };

    _this.init(opts);
  };

  Selectric.prototype = {
    utils: {
      /**
       * Detect mobile browser
       *
       * @return {boolean}
       */
      isMobile: function isMobile() {
        return /android|ip(hone|od|ad)/i.test(navigator.userAgent);
      },

      /**
       * Escape especial characters in string (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
       *
       * @param  {string} str - The string to be escaped
       * @return {string}       The string with the special characters escaped
       */
      escapeRegExp: function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
      },

      /**
       * Replace diacritics
       *
       * @param  {string} str - The string to replace the diacritics
       * @return {string}       The string with diacritics replaced with ascii characters
       */
      replaceDiacritics: function replaceDiacritics(str) {
        var k = diacritics.length;

        while (k--) {
          str = str.toLowerCase().replace(diacritics[k], chars[k]);
        }

        return str;
      },

      /**
       * Format string
       * https://gist.github.com/atesgoral/984375
       *
       * @param  {string} f - String to be formated
       * @return {string}     String formated
       */
      format: function format(f) {
        var a = arguments; // store outer arguments

        return ('' + f). // force format specifier to String
        replace( // replace tokens in format specifier
        /\{(?:(\d+)|(\w+))\}/g, // match {token} references
        function (s, // the matched string (ignored)
        i, // an argument index
        p // a property name
        ) {
          return p && a[1] // if property name and first argument exist
          ? a[1][p] // return property from first argument
          : a[i]; // assume argument index and return i-th argument
        });
      },

      /**
       * Get the next enabled item in the options list.
       *
       * @param  {object} selectItems - The options object.
       * @param  {number}    selected - Index of the currently selected option.
       * @return {object}               The next enabled item.
       */
      nextEnabledItem: function nextEnabledItem(selectItems, selected) {
        while (selectItems[selected = (selected + 1) % selectItems.length].disabled) {// empty
        }

        return selected;
      },

      /**
       * Get the previous enabled item in the options list.
       *
       * @param  {object} selectItems - The options object.
       * @param  {number}    selected - Index of the currently selected option.
       * @return {object}               The previous enabled item.
       */
      previousEnabledItem: function previousEnabledItem(selectItems, selected) {
        while (selectItems[selected = (selected > 0 ? selected : selectItems.length) - 1].disabled) {// empty
        }

        return selected;
      },

      /**
       * Transform camelCase string to dash-case.
       *
       * @param  {string} str - The camelCased string.
       * @return {string}       The string transformed to dash-case.
       */
      toDash: function toDash(str) {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      },

      /**
       * Calls the events registered with function name.
       *
       * @param {string}    fn - The name of the function.
       * @param {number} scope - Scope that should be set on the function.
       */
      triggerCallback: function triggerCallback(fn, scope) {
        var elm = scope.element;
        var func = scope.options['on' + fn];
        var args = [elm].concat([].slice.call(arguments).slice(1));

        if ($.isFunction(func)) {
          func.apply(elm, args);
        }

        $(elm).trigger(pluginName + '-' + this.toDash(fn), args);
      },

      /**
       * Transform array list to concatenated string and remove empty values
       * @param  {array} arr - Class list
       * @return {string}      Concatenated string
       */
      arrayToClassname: function arrayToClassname(arr) {
        var newArr = $.grep(arr, function (item) {
          return !!item;
        });
        return $.trim(newArr.join(' '));
      }
    },

    /** Initializes */
    init: function init(opts) {
      var _this = this; // Set options


      _this.options = $.extend(true, {}, $.fn[pluginName].defaults, _this.options, opts);

      _this.utils.triggerCallback('BeforeInit', _this); // Preserve data


      _this.destroy(true); // Disable on mobile browsers


      if (_this.options.disableOnMobile && _this.utils.isMobile()) {
        _this.disableOnMobile = true;
        return;
      } // Get classes


      _this.classes = _this.getClassNames(); // Create elements

      var input = $('<input/>', {
        'class': _this.classes.input,
        'readonly': _this.utils.isMobile()
      });
      var items = $('<div/>', {
        'class': _this.classes.items,
        'tabindex': -1
      });
      var itemsScroll = $('<div/>', {
        'class': _this.classes.scroll
      });
      var wrapper = $('<div/>', {
        'class': _this.classes.prefix,
        'html': _this.options.arrowButtonMarkup
      });
      var label = $('<span/>', {
        'class': 'label'
      });

      var outerWrapper = _this.$element.wrap('<div/>').parent().append(wrapper.prepend(label), items, input);

      var hideSelectWrapper = $('<div/>', {
        'class': _this.classes.hideselect
      });
      _this.elements = {
        input: input,
        items: items,
        itemsScroll: itemsScroll,
        wrapper: wrapper,
        label: label,
        outerWrapper: outerWrapper
      };

      if (_this.options.nativeOnMobile && _this.utils.isMobile()) {
        _this.elements.input = undefined;
        hideSelectWrapper.addClass(_this.classes.prefix + '-is-native');

        _this.$element.on('change', function () {
          _this.refresh();
        });
      }

      _this.$element.on(_this.eventTriggers).wrap(hideSelectWrapper);

      _this.originalTabindex = _this.$element.prop('tabindex');

      _this.$element.prop('tabindex', -1);

      _this.populate();

      _this.activate();

      _this.utils.triggerCallback('Init', _this);
    },

    /** Activates the plugin */
    activate: function activate() {
      var _this = this;

      var hiddenChildren = _this.elements.items.closest(':visible').children(':hidden').addClass(_this.classes.tempshow);

      var originalWidth = _this.$element.width();

      hiddenChildren.removeClass(_this.classes.tempshow);

      _this.utils.triggerCallback('BeforeActivate', _this);

      _this.elements.outerWrapper.prop('class', _this.utils.arrayToClassname([_this.classes.wrapper, _this.$element.prop('class').replace(/\S+/g, _this.classes.prefix + '-$&'), _this.options.responsive ? _this.classes.responsive : '']));

      if (_this.options.inheritOriginalWidth && originalWidth > 0) {
        _this.elements.outerWrapper.width(originalWidth);
      }

      _this.unbindEvents();

      if (!_this.$element.prop('disabled')) {
        _this.state.enabled = true; // Not disabled, so... Removing disabled class

        _this.elements.outerWrapper.removeClass(_this.classes.disabled); // Remove styles from items box
        // Fix incorrect height when refreshed is triggered with fewer options


        _this.$li = _this.elements.items.removeAttr('style').find('li');

        _this.bindEvents();
      } else {
        _this.elements.outerWrapper.addClass(_this.classes.disabled);

        if (_this.elements.input) {
          _this.elements.input.prop('disabled', true);
        }
      }

      _this.utils.triggerCallback('Activate', _this);
    },

    /**
     * Generate classNames for elements
     *
     * @return {object} Classes object
     */
    getClassNames: function getClassNames() {
      var _this = this;

      var customClass = _this.options.customClass;
      var classesObj = {};
      $.each(classList.split(' '), function (i, currClass) {
        var c = customClass.prefix + currClass;
        classesObj[currClass.toLowerCase()] = customClass.camelCase ? c : _this.utils.toDash(c);
      });
      classesObj.prefix = customClass.prefix;
      return classesObj;
    },

    /** Set the label text */
    setLabel: function setLabel() {
      var _this = this;

      var labelBuilder = _this.options.labelBuilder;

      if (_this.state.multiple) {
        // Make sure currentValues is an array
        var currentValues = $.isArray(_this.state.currValue) ? _this.state.currValue : [_this.state.currValue]; // I'm not happy with this, but currentValues can be an empty
        // array and we need to fallback to the default option.

        currentValues = currentValues.length === 0 ? [0] : currentValues;
        var labelMarkup = $.map(currentValues, function (value) {
          return $.grep(_this.lookupItems, function (item) {
            return item.index === value;
          })[0]; // we don't want nested arrays here
        });
        labelMarkup = $.grep(labelMarkup, function (item) {
          // Hide default (please choose) if more then one element were selected.
          // If no option value were given value is set to option text by default
          if (labelMarkup.length > 1 || labelMarkup.length === 0) {
            return $.trim(item.value) !== '';
          }

          return item;
        });
        labelMarkup = $.map(labelMarkup, function (item) {
          return $.isFunction(labelBuilder) ? labelBuilder(item) : _this.utils.format(labelBuilder, item);
        }); // Limit the amount of selected values shown in label

        if (_this.options.multiple.maxLabelEntries) {
          if (labelMarkup.length >= _this.options.multiple.maxLabelEntries + 1) {
            labelMarkup = labelMarkup.slice(0, _this.options.multiple.maxLabelEntries);
            labelMarkup.push($.isFunction(labelBuilder) ? labelBuilder({
              text: '...'
            }) : _this.utils.format(labelBuilder, {
              text: '...'
            }));
          } else {
            labelMarkup.slice(labelMarkup.length - 1);
          }
        }

        _this.elements.label.html(labelMarkup.join(_this.options.multiple.separator));
      } else {
        var currItem = _this.lookupItems[_this.state.currValue];

        _this.elements.label.html($.isFunction(labelBuilder) ? labelBuilder(currItem) : _this.utils.format(labelBuilder, currItem));
      }
    },

    /** Get and save the available options */
    populate: function populate() {
      var _this = this;

      var $options = _this.$element.children();

      var $justOptions = _this.$element.find('option');

      var $selected = $justOptions.filter(':selected');
      var selectedIndex = $justOptions.index($selected);
      var currIndex = 0;
      var emptyValue = _this.state.multiple ? [] : 0;

      if ($selected.length > 1 && _this.state.multiple) {
        selectedIndex = [];
        $selected.each(function () {
          selectedIndex.push($(this).index());
        });
      }

      _this.state.currValue = ~selectedIndex ? selectedIndex : emptyValue;
      _this.state.selectedIdx = _this.state.currValue;
      _this.state.highlightedIdx = _this.state.currValue;
      _this.items = [];
      _this.lookupItems = [];

      if ($options.length) {
        // Build options markup
        $options.each(function (i) {
          var $elm = $(this);

          if ($elm.is('optgroup')) {
            var optionsGroup = {
              element: $elm,
              label: $elm.prop('label'),
              groupDisabled: $elm.prop('disabled'),
              items: []
            };
            $elm.children().each(function (i) {
              var $elm = $(this);
              optionsGroup.items[i] = _this.getItemData(currIndex, $elm, optionsGroup.groupDisabled || $elm.prop('disabled'));
              _this.lookupItems[currIndex] = optionsGroup.items[i];
              currIndex++;
            });
            _this.items[i] = optionsGroup;
          } else {
            _this.items[i] = _this.getItemData(currIndex, $elm, $elm.prop('disabled'));
            _this.lookupItems[currIndex] = _this.items[i];
            currIndex++;
          }
        });

        _this.setLabel();

        _this.elements.items.append(_this.elements.itemsScroll.html(_this.getItemsMarkup(_this.items)));
      }
    },

    /**
     * Generate items object data
     * @param  {integer} index      - Current item index
     * @param  {node}    $elm       - Current element node
     * @param  {boolean} isDisabled - Current element disabled state
     * @return {object}               Item object
     */
    getItemData: function getItemData(index, $elm, isDisabled) {
      var _this = this;

      return {
        index: index,
        element: $elm,
        value: $elm.val(),
        className: $elm.prop('class'),
        text: $elm.html(),
        slug: $.trim(_this.utils.replaceDiacritics($elm.html())),
        alt: $elm.attr('data-alt'),
        selected: $elm.prop('selected'),
        disabled: isDisabled
      };
    },

    /**
     * Generate options markup
     *
     * @param  {object} items - Object containing all available options
     * @return {string}         HTML for the options box
     */
    getItemsMarkup: function getItemsMarkup(items) {
      var _this = this;

      var markup = '<ul>';

      if ($.isFunction(_this.options.listBuilder) && _this.options.listBuilder) {
        items = _this.options.listBuilder(items);
      }

      $.each(items, function (i, elm) {
        if (elm.label !== undefined) {
          markup += _this.utils.format('<ul class="{1}"><li class="{2}">{3}</li>', _this.utils.arrayToClassname([_this.classes.group, elm.groupDisabled ? 'disabled' : '', elm.element.prop('class')]), _this.classes.grouplabel, elm.element.prop('label'));
          $.each(elm.items, function (i, elm) {
            markup += _this.getItemMarkup(elm.index, elm);
          });
          markup += '</ul>';
        } else {
          markup += _this.getItemMarkup(elm.index, elm);
        }
      });
      return markup + '</ul>';
    },

    /**
     * Generate every option markup
     *
     * @param  {number} index    - Index of current item
     * @param  {object} itemData - Current item
     * @return {string}            HTML for the option
     */
    getItemMarkup: function getItemMarkup(index, itemData) {
      var _this = this;

      var itemBuilder = _this.options.optionsItemBuilder; // limit access to item data to provide a simple interface
      // to most relevant options.

      var filteredItemData = {
        value: itemData.value,
        text: itemData.text,
        slug: itemData.slug,
        index: itemData.index
      };
      return _this.utils.format('<li data-index="{1}" class="{2}">{3}</li>', index, _this.utils.arrayToClassname([itemData.className, index === _this.items.length - 1 ? 'last' : '', itemData.disabled ? 'disabled' : '', itemData.selected ? 'selected' : '']), $.isFunction(itemBuilder) ? _this.utils.format(itemBuilder(itemData, this.$element, index), itemData) : _this.utils.format(itemBuilder, filteredItemData));
    },

    /** Remove events on the elements */
    unbindEvents: function unbindEvents() {
      var _this = this;

      _this.elements.wrapper.add(_this.$element).add(_this.elements.outerWrapper).add(_this.elements.input).off(eventNamespaceSuffix);
    },

    /** Bind events on the elements */
    bindEvents: function bindEvents() {
      var _this = this;

      _this.elements.outerWrapper.on('mouseenter' + eventNamespaceSuffix + ' mouseleave' + eventNamespaceSuffix, function (e) {
        $(this).toggleClass(_this.classes.hover, e.type === 'mouseenter'); // Delay close effect when openOnHover is true

        if (_this.options.openOnHover) {
          clearTimeout(_this.closeTimer);

          if (e.type === 'mouseleave') {
            _this.closeTimer = setTimeout($.proxy(_this.close, _this), _this.options.hoverIntentTimeout);
          } else {
            _this.open();
          }
        }
      }); // Toggle open/close


      _this.elements.wrapper.on('click' + eventNamespaceSuffix, function (e) {
        _this.state.opened ? _this.close() : _this.open(e);
      }); // Translate original element focus event to dummy input.
      // Disabled on mobile devices because the default option list isn't
      // shown due the fact that hidden input gets focused


      if (!(_this.options.nativeOnMobile && _this.utils.isMobile())) {
        _this.$element.on('focus' + eventNamespaceSuffix, function () {
          _this.elements.input.focus();
        });

        _this.elements.input.prop({
          tabindex: _this.originalTabindex,
          disabled: false
        }).on('keydown' + eventNamespaceSuffix, $.proxy(_this.handleKeys, _this)).on('focusin' + eventNamespaceSuffix, function (e) {
          _this.elements.outerWrapper.addClass(_this.classes.focus); // Prevent the flicker when focusing out and back again in the browser window


          _this.elements.input.one('blur', function () {
            _this.elements.input.blur();
          });

          if (_this.options.openOnFocus && !_this.state.opened) {
            _this.open(e);
          }
        }).on('focusout' + eventNamespaceSuffix, function () {
          _this.elements.outerWrapper.removeClass(_this.classes.focus);
        }).on('input propertychange', function () {
          var val = _this.elements.input.val();

          var searchRegExp = new RegExp('^' + _this.utils.escapeRegExp(val), 'i'); // Clear search

          clearTimeout(_this.resetStr);
          _this.resetStr = setTimeout(function () {
            _this.elements.input.val('');
          }, _this.options.keySearchTimeout);

          if (val.length) {
            // Search in select options
            $.each(_this.items, function (i, elm) {
              if (elm.disabled) {
                return;
              }

              if (searchRegExp.test(elm.text) || searchRegExp.test(elm.slug)) {
                _this.highlight(i);

                return;
              }

              if (!elm.alt) {
                return;
              }

              var altItems = elm.alt.split('|');

              for (var ai = 0; ai < altItems.length; ai++) {
                if (!altItems[ai]) {
                  break;
                }

                if (searchRegExp.test(altItems[ai].trim())) {
                  _this.highlight(i);

                  return;
                }
              }
            });
          }
        });
      }

      _this.$li.on({
        // Prevent <input> blur on Chrome
        mousedown: function mousedown(e) {
          e.preventDefault();
          e.stopPropagation();
        },
        click: function click() {
          _this.select($(this).data('index')); // Chrome doesn't close options box if select is wrapped with a label
          // We need to 'return false' to avoid that


          return false;
        }
      });
    },

    /**
     * Behavior when keyboard keys is pressed
     *
     * @param {object} e - Event object
     */
    handleKeys: function handleKeys(e) {
      var _this = this;

      var key = e.which;
      var keys = _this.options.keys;
      var isPrevKey = $.inArray(key, keys.previous) > -1;
      var isNextKey = $.inArray(key, keys.next) > -1;
      var isSelectKey = $.inArray(key, keys.select) > -1;
      var isOpenKey = $.inArray(key, keys.open) > -1;
      var idx = _this.state.highlightedIdx;
      var isFirstOrLastItem = isPrevKey && idx === 0 || isNextKey && idx + 1 === _this.items.length;
      var goToItem = 0; // Enter / Space

      if (key === 13 || key === 32) {
        e.preventDefault();
      } // If it's a directional key


      if (isPrevKey || isNextKey) {
        if (!_this.options.allowWrap && isFirstOrLastItem) {
          return;
        }

        if (isPrevKey) {
          goToItem = _this.utils.previousEnabledItem(_this.lookupItems, idx);
        }

        if (isNextKey) {
          goToItem = _this.utils.nextEnabledItem(_this.lookupItems, idx);
        }

        _this.highlight(goToItem);
      } // Tab / Enter / ESC


      if (isSelectKey && _this.state.opened) {
        _this.select(idx);

        if (!_this.state.multiple || !_this.options.multiple.keepMenuOpen) {
          _this.close();
        }

        return;
      } // Space / Enter / Left / Up / Right / Down


      if (isOpenKey && !_this.state.opened) {
        _this.open();
      }
    },

    /** Update the items object */
    refresh: function refresh() {
      var _this = this;

      _this.populate();

      _this.activate();

      _this.utils.triggerCallback('Refresh', _this);
    },

    /** Set options box width/height */
    setOptionsDimensions: function setOptionsDimensions() {
      var _this = this; // Calculate options box height
      // Set a temporary class on the hidden parent of the element


      var hiddenChildren = _this.elements.items.closest(':visible').children(':hidden').addClass(_this.classes.tempshow);

      var maxHeight = _this.options.maxHeight;

      var itemsWidth = _this.elements.items.outerWidth();

      var wrapperWidth = _this.elements.wrapper.outerWidth() - (itemsWidth - _this.elements.items.width()); // Set the dimensions, minimum is wrapper width, expand for long items if option is true


      if (!_this.options.expandToItemText || wrapperWidth > itemsWidth) {
        _this.finalWidth = wrapperWidth;
      } else {
        // Make sure the scrollbar width is included
        _this.elements.items.css('overflow', 'scroll'); // Set a really long width for _this.elements.outerWrapper


        _this.elements.outerWrapper.width(9e4);

        _this.finalWidth = _this.elements.items.width(); // Set scroll bar to auto

        _this.elements.items.css('overflow', '');

        _this.elements.outerWrapper.width('');
      }

      _this.elements.items.width(_this.finalWidth).height() > maxHeight && _this.elements.items.height(maxHeight); // Remove the temporary class

      hiddenChildren.removeClass(_this.classes.tempshow);
    },

    /** Detect if the options box is inside the window */
    isInViewport: function isInViewport() {
      var _this = this;

      if (_this.options.forceRenderAbove === true) {
        _this.elements.outerWrapper.addClass(_this.classes.above);
      } else if (_this.options.forceRenderBelow === true) {
        _this.elements.outerWrapper.addClass(_this.classes.below);
      } else {
        var scrollTop = $win.scrollTop();
        var winHeight = $win.height();

        var uiPosX = _this.elements.outerWrapper.offset().top;

        var uiHeight = _this.elements.outerWrapper.outerHeight();

        var fitsDown = uiPosX + uiHeight + _this.itemsHeight <= scrollTop + winHeight;
        var fitsAbove = uiPosX - _this.itemsHeight > scrollTop; // If it does not fit below, only render it
        // above it fit's there.
        // It's acceptable that the user needs to
        // scroll the viewport to see the cut off UI

        var renderAbove = !fitsDown && fitsAbove;
        var renderBelow = !renderAbove;

        _this.elements.outerWrapper.toggleClass(_this.classes.above, renderAbove);

        _this.elements.outerWrapper.toggleClass(_this.classes.below, renderBelow);
      }
    },

    /**
     * Detect if currently selected option is visible and scroll the options box to show it
     *
     * @param {Number|Array} index - Index of the selected items
     */
    detectItemVisibility: function detectItemVisibility(index) {
      var _this = this;

      var $filteredLi = _this.$li.filter('[data-index]');

      if (_this.state.multiple) {
        // If index is an array, we can assume a multiple select and we
        // want to scroll to the uppermost selected item!
        // Math.min.apply(Math, index) returns the lowest entry in an Array.
        index = $.isArray(index) && index.length === 0 ? 0 : index;
        index = $.isArray(index) ? Math.min.apply(Math, index) : index;
      }

      var liHeight = $filteredLi.eq(index).outerHeight();
      var liTop = $filteredLi[index].offsetTop;

      var itemsScrollTop = _this.elements.itemsScroll.scrollTop();

      var scrollT = liTop + liHeight * 2;

      _this.elements.itemsScroll.scrollTop(scrollT > itemsScrollTop + _this.itemsHeight ? scrollT - _this.itemsHeight : liTop - liHeight < itemsScrollTop ? liTop - liHeight : itemsScrollTop);
    },

    /**
     * Open the select options box
     *
     * @param {Event} e - Event
     */
    open: function open(e) {
      var _this = this;

      if (_this.options.nativeOnMobile && _this.utils.isMobile()) {
        return false;
      }

      _this.utils.triggerCallback('BeforeOpen', _this);

      if (e) {
        e.preventDefault();

        if (_this.options.stopPropagation) {
          e.stopPropagation();
        }
      }

      if (_this.state.enabled) {
        _this.setOptionsDimensions(); // Find any other opened instances of select and close it


        $('.' + _this.classes.hideselect, '.' + _this.classes.open).children()[pluginName]('close');
        _this.state.opened = true;
        _this.itemsHeight = _this.elements.items.outerHeight();
        _this.itemsInnerHeight = _this.elements.items.height(); // Toggle options box visibility

        _this.elements.outerWrapper.addClass(_this.classes.open); // Give dummy input focus


        _this.elements.input.val('');

        if (e && e.type !== 'focusin') {
          _this.elements.input.focus();
        } // Delayed binds events on Document to make label clicks work


        setTimeout(function () {
          $doc.on('click' + eventNamespaceSuffix, $.proxy(_this.close, _this)).on('scroll' + eventNamespaceSuffix, $.proxy(_this.isInViewport, _this));
        }, 1);

        _this.isInViewport(); // Prevent window scroll when using mouse wheel inside items box


        if (_this.options.preventWindowScroll) {
          /* istanbul ignore next */
          $doc.on('mousewheel' + eventNamespaceSuffix + ' DOMMouseScroll' + eventNamespaceSuffix, '.' + _this.classes.scroll, function (e) {
            var orgEvent = e.originalEvent;
            var scrollTop = $(this).scrollTop();
            var deltaY = 0;

            if ('detail' in orgEvent) {
              deltaY = orgEvent.detail * -1;
            }

            if ('wheelDelta' in orgEvent) {
              deltaY = orgEvent.wheelDelta;
            }

            if ('wheelDeltaY' in orgEvent) {
              deltaY = orgEvent.wheelDeltaY;
            }

            if ('deltaY' in orgEvent) {
              deltaY = orgEvent.deltaY * -1;
            }

            if (scrollTop === this.scrollHeight - _this.itemsInnerHeight && deltaY < 0 || scrollTop === 0 && deltaY > 0) {
              e.preventDefault();
            }
          });
        }

        _this.detectItemVisibility(_this.state.selectedIdx);

        _this.highlight(_this.state.multiple ? -1 : _this.state.selectedIdx);

        _this.utils.triggerCallback('Open', _this);
      }
    },

    /** Close the select options box */
    close: function close() {
      var _this = this;

      _this.utils.triggerCallback('BeforeClose', _this); // Remove custom events on document


      $doc.off(eventNamespaceSuffix); // Remove visible class to hide options box

      _this.elements.outerWrapper.removeClass(_this.classes.open);

      _this.state.opened = false;

      _this.utils.triggerCallback('Close', _this);
    },

    /** Select current option and change the label */
    change: function change() {
      var _this = this;

      _this.utils.triggerCallback('BeforeChange', _this);

      if (_this.state.multiple) {
        // Reset old selected
        $.each(_this.lookupItems, function (idx) {
          _this.lookupItems[idx].selected = false;

          _this.$element.find('option').prop('selected', false);
        }); // Set new selected

        $.each(_this.state.selectedIdx, function (idx, value) {
          _this.lookupItems[value].selected = true;

          _this.$element.find('option').eq(value).prop('selected', true);
        });
        _this.state.currValue = _this.state.selectedIdx;

        _this.setLabel();

        _this.utils.triggerCallback('Change', _this);
      } else if (_this.state.currValue !== _this.state.selectedIdx) {
        // Apply changed value to original select
        _this.$element.prop('selectedIndex', _this.state.currValue = _this.state.selectedIdx).data('value', _this.lookupItems[_this.state.selectedIdx].text); // Change label text


        _this.setLabel();

        _this.utils.triggerCallback('Change', _this);
      }
    },

    /**
     * Highlight option
     * @param {number} index - Index of the options that will be highlighted
     */
    highlight: function highlight(index) {
      var _this = this;

      var $filteredLi = _this.$li.filter('[data-index]').removeClass('highlighted');

      _this.utils.triggerCallback('BeforeHighlight', _this); // Parameter index is required and should not be a disabled item


      if (index === undefined || index === -1 || _this.lookupItems[index].disabled) {
        return;
      }

      $filteredLi.eq(_this.state.highlightedIdx = index).addClass('highlighted');

      _this.detectItemVisibility(index);

      _this.utils.triggerCallback('Highlight', _this);
    },

    /**
     * Select option
     *
     * @param {number} index - Index of the option that will be selected
     */
    select: function select(index) {
      var _this = this;

      var $filteredLi = _this.$li.filter('[data-index]');

      _this.utils.triggerCallback('BeforeSelect', _this, index); // Parameter index is required and should not be a disabled item


      if (index === undefined || index === -1 || _this.lookupItems[index].disabled) {
        return;
      }

      if (_this.state.multiple) {
        // Make sure selectedIdx is an array
        _this.state.selectedIdx = $.isArray(_this.state.selectedIdx) ? _this.state.selectedIdx : [_this.state.selectedIdx];
        var hasSelectedIndex = $.inArray(index, _this.state.selectedIdx);

        if (hasSelectedIndex !== -1) {
          _this.state.selectedIdx.splice(hasSelectedIndex, 1);
        } else {
          _this.state.selectedIdx.push(index);
        }

        $filteredLi.removeClass('selected').filter(function (index) {
          return $.inArray(index, _this.state.selectedIdx) !== -1;
        }).addClass('selected');
      } else {
        $filteredLi.removeClass('selected').eq(_this.state.selectedIdx = index).addClass('selected');
      }

      if (!_this.state.multiple || !_this.options.multiple.keepMenuOpen) {
        _this.close();
      }

      _this.change();

      _this.utils.triggerCallback('Select', _this, index);
    },

    /**
     * Unbind and remove
     *
     * @param {boolean} preserveData - Check if the data on the element should be removed too
     */
    destroy: function destroy(preserveData) {
      var _this = this;

      if (_this.state && _this.state.enabled) {
        _this.elements.items.add(_this.elements.wrapper).add(_this.elements.input).remove();

        if (!preserveData) {
          _this.$element.removeData(pluginName).removeData('value');
        }

        _this.$element.prop('tabindex', _this.originalTabindex).off(eventNamespaceSuffix).off(_this.eventTriggers).unwrap().unwrap();

        _this.state.enabled = false;
      }
    }
  }; // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations

  $.fn[pluginName] = function (args) {
    return this.each(function () {
      var data = $.data(this, pluginName);

      if (data && !data.disableOnMobile) {
        typeof args === 'string' && data[args] ? data[args]() : data.init(args);
      } else {
        $.data(this, pluginName, new Selectric(this, args));
      }
    });
  };
  /**
   * Default plugin options
   *
   * @type {object}
   */


  $.fn[pluginName].defaults = {
    onChange: function onChange(elm) {
      $(elm).change();
    },
    maxHeight: 300,
    keySearchTimeout: 500,
    arrowButtonMarkup: '<b class="button">&#x25be;</b>',
    disableOnMobile: false,
    nativeOnMobile: true,
    openOnFocus: true,
    openOnHover: false,
    hoverIntentTimeout: 500,
    expandToItemText: false,
    responsive: false,
    preventWindowScroll: true,
    inheritOriginalWidth: false,
    allowWrap: true,
    forceRenderAbove: false,
    forceRenderBelow: false,
    stopPropagation: true,
    optionsItemBuilder: '{text}',
    // function(itemData, element, index)
    labelBuilder: '{text}',
    // function(currItem)
    listBuilder: false,
    // function(items)
    keys: {
      previous: [37, 38],
      // Left / Up
      next: [39, 40],
      // Right / Down
      select: [9, 13, 27],
      // Tab / Enter / Escape
      open: [13, 32, 37, 38, 39, 40],
      // Enter / Space / Left / Up / Right / Down
      close: [9, 27] // Tab / Escape

    },
    customClass: {
      prefix: pluginName,
      camelCase: false
    },
    multiple: {
      separator: ', ',
      keepMenuOpen: true,
      maxLabelEntries: false
    }
  };
});
"use strict";

"use strict";

(function () {
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  var stickFooter = function stickFooter() {
    document.querySelector(".ie-width").textContent = "".concat(innerWidth, "px");
    var FOOTER = document.querySelector(".page-footer");
    var MAIN = document.querySelector(".page-main");
    var BODY = document.querySelector("body");
    var footerHeight = FOOTER.offsetHeight;
    BODY.style.position = "relative";
    MAIN.style.marginBottom = "".concat(footerHeight, "px");
    FOOTER.style.position = "absolute";
    FOOTER.style.bottom = "0";
    FOOTER.style.left = "0";
    FOOTER.style.width = "100%";
  };

  if (isIE11) {
    var widthLabel = document.createElement("div");
    widthLabel.style.position = 'fixed';
    widthLabel.style.top = '0';
    widthLabel.style.left = '0';
    widthLabel.style.padding = '10px 20px';
    widthLabel.style.color = 'white';
    widthLabel.style.fontSize = '20px', widthLabel.style.fontWeight = '500';
    widthLabel.style.border = '2px solid rgba(0, 255, 155, 1)';
    widthLabel.style.backgroundColor = 'rgba(0, 255, 155, 0.7)';
    widthLabel.style.zIndex = '15';
    widthLabel.classList.add("ie-width");
    widthLabel.textContent = "".concat(innerWidth, "px");
    document.body.appendChild(widthLabel);
    stickFooter();
    window.addEventListener("resize", stickFooter);
  }
})();
'use strict';

(function () {
  var buttonElement = document.querySelector('.button-up'); // Кнопка скролла в начало страницы

  window.utils = {
    scrollTop: function scrollTop() {
      // Функция прокручивает страницу в начало
      $('html, body').animate({
        scrollTop: 0
      }, 500);
      return false;
    }
  };

  if (buttonElement) {
    var onPageScroll = function onPageScroll() {
      // Добавляет/удаляет класс кнопки
      if (document.documentElement.scrollTop >= innerHeight * 0.6) {
        buttonElement.classList.add('button-up--visible');
      } else {
        buttonElement.classList.remove('button-up--visible');
      }
    };

    buttonElement.addEventListener('click', window.utils.scrollTop);
    document.addEventListener('scroll', onPageScroll);
  }
})();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu = /*#__PURE__*/function () {
  function Menu(openButtonClass, closeButtonClass, menuClass) {
    _classCallCheck(this, Menu);

    this.openButtonClass = openButtonClass;
    this.closeButtonClass = closeButtonClass;
    this.menuClass = menuClass;
    this.openButtonElement = document.querySelector(".".concat(this.openButtonClass));
    this.closeButtonElement = document.querySelector(".".concat(this.closeButtonClass));
    this.menuElement = document.querySelector(".".concat(this.menuClass));
    this.init();
  }

  _createClass(Menu, [{
    key: "show",
    value: function show() {
      var _this = this;

      document.body.style.overflow = "hidden";
      this.menuElement.style.display = "block";
      setTimeout(function () {
        _this.menuElement.classList.add("".concat(_this.menuClass, "--shown"));
      }, 50);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      document.body.style.overflow = "";
      this.menuElement.classList.remove("".concat(this.menuClass, "--shown"));
      setTimeout(function () {
        _this2.menuElement.style.display = "none";
      }, 300);
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      this.openButtonElement.addEventListener("click", function (evt) {
        evt.preventDefault();

        _this3.show();
      });
      this.closeButtonElement.addEventListener("click", function (evt) {
        evt.preventDefault();

        _this3.hide();
      });
    }
  }]);

  return Menu;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Search = /*#__PURE__*/function () {
  function Search(buttonClass, searchClass) {
    _classCallCheck(this, Search);

    this._buttonClass = buttonClass;
    this._searchClass = searchClass;
    this._buttonElement = document.querySelector(".".concat(this._buttonClass));
    this._searchElement = document.querySelector(".".concat(this._searchClass));
    this._isonlyFocus = this._searchElement.classList.contains("search-js--only-focus");
    this._isSearchShown = false;

    this._init();
  }

  _createClass(Search, [{
    key: "_focus",
    value: function _focus() {
      this._searchElement.querySelector("input[type=\"search\"]").focus();
    }
  }, {
    key: "_showSearch",
    value: function _showSearch() {
      this._searchElement.classList.add("".concat(this._searchClass, "--shown"));

      this._focus();

      this._isSearchShown = true;
    }
  }, {
    key: "_hideSearch",
    value: function _hideSearch() {
      this._searchElement.classList.remove("".concat(this._searchClass, "--shown"));

      this._isSearchShown = false;
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this = this;

      if (this._isOnlyFocus) {
        this._buttonElement.addEventListener("click", function (evt) {
          evt.preventDefault();

          _this._focus();
        });
      } else {
        this._buttonElement.addEventListener("click", function (evt) {
          evt.preventDefault();
          _this._isSearchShown ? _this._hideSearch() : _this._showSearch();
        });
      }
    }
  }]);

  return Search;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal = /*#__PURE__*/function () {
  function Modal(modalClass) {
    var _this = this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Modal);

    this._modalClass = modalClass;
    this._activeClassEnding = props.activeClassEnding || "--shown";
    this._callButtonClass = props.callButtonClass || null;
    this._overlayClass = props.overlayClass || "overlay";
    this._closeButtonClasses = props.closeButtonClasses || ["modal__close", "modal__close-bottom"];
    this.onOpen = props.onOpen || null;
    this.onClose = props.onClose || null;
    this._bodyElement = document.body;
    this._callButtonsElements = this._callButtonClass ? Array.from(document.querySelectorAll(".".concat(this._callButtonClass))) : null;
    this._modalElement = document.querySelector(".".concat(this._modalClass));
    this._overlayElement = this._modalElement.closest(".".concat(this._overlayClass));
    this._closeButtonElements = this._closeButtonClasses.map(function (buttonClass) {
      return _this._modalElement.querySelector(".".concat(buttonClass));
    }).filter(function (item) {
      return item !== null;
    });
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onCallButtonClick = this._onCallButtonClick.bind(this);
    this._onOverlayMousedown = this._onOverlayMousedown.bind(this);
    this._onEsqKeydown = this._onEsqKeydown.bind(this);

    this._init();
  }

  _createClass(Modal, [{
    key: "_blockBody",
    value: function _blockBody() {
      this._bodyElement.style.overflow = "hidden";
    }
  }, {
    key: "_unblockBody",
    value: function _unblockBody() {
      this._bodyElement.style.overflow = "";
    }
  }, {
    key: "_onCallButtonClick",
    value: function _onCallButtonClick(evt) {
      evt.preventDefault();
      this.show();
    }
  }, {
    key: "_onCloseButtonClick",
    value: function _onCloseButtonClick(evt) {
      evt.preventDefault();
      this.close();
    }
  }, {
    key: "_onOverlayMousedown",
    value: function _onOverlayMousedown(evt) {
      if (evt.target.classList.contains(this._overlayClass)) {
        this.close();
      }
    }
  }, {
    key: "_onEsqKeydown",
    value: function _onEsqKeydown(evt) {
      if (evt.key === "Escape" || evt.key === "Esc") {
        evt.preventDefault();
        this.close();
      }
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this2 = this;

      if (this._callButtonsElements) {
        this._callButtonsElements.forEach(function (button) {
          button.addEventListener("click", _this2._onCallButtonClick);
        });
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;

      this._blockBody();

      this._overlayElement.style.display = 'flex';
      this._modalElement.style.display = 'block';

      this._closeButtonElements.forEach(function (button) {
        return button.addEventListener("click", _this3._onCloseButtonClick);
      });

      this._overlayElement.addEventListener("mousedown", this._onOverlayMousedown);

      window.addEventListener("keydown", this._onEsqKeydown);
      this.onOpen && this.onOpen();
      setTimeout(function () {
        _this3._overlayElement.classList.add("".concat(_this3._overlayClass + _this3._activeClassEnding));

        _this3._modalElement.classList.add("modal".concat(_this3._activeClassEnding));
      }, 50);
    }
  }, {
    key: "close",
    value: function close() {
      var _this4 = this;

      this._unblockBody();

      this._overlayElement.classList.remove("".concat(this._overlayClass + this._activeClassEnding));

      this._modalElement.classList.remove("modal".concat(this._activeClassEnding));

      this._closeButtonElements.forEach(function (button) {
        return button.removeEventListener("click", _this4._onCloseButtonClick);
      });

      this._overlayElement.removeEventListener("mousedown", this._onOverlayMousedown);

      window.removeEventListener("keydown", this._onEsqKeydown);
      this.onClose && this.onClose();
      setTimeout(function () {
        _this4._overlayElement.style.display = '';
        _this4._modalElement.style.display = '';
      }, 300);
    }
  }]);

  return Modal;
}();
"use strict";

(function () {
  if (document.querySelector(".js-unlimited-option")) {
    var options = Array.from(document.querySelectorAll(".js-unlimited-option"));
    var total = document.querySelector(".options__total-price");
    options.forEach(function (option) {
      return option.addEventListener("click", function (evt) {
        total.textContent = evt.target.getAttribute("data-value");
      });
    });
    total.textContent = options.find(function (option) {
      return option.checked;
    }).getAttribute("data-value");
  }
})();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Parts = /*#__PURE__*/function () {
  function Parts(options) {
    _classCallCheck(this, Parts);

    this._partsElements = Array.from(document.querySelectorAll(".".concat(options.partClass)));
    this._buttonsElements = Array.from(document.querySelectorAll(".".concat(options.buttonClass)));
    this._onButtonClick = this._onButtonClick.bind(this);

    this._init();
  }

  _createClass(Parts, [{
    key: "_onButtonClick",
    value: function _onButtonClick(evt) {
      evt.preventDefault();
      var desiredPartNumber = evt.target.getAttribute("data-part");

      this._partsElements.forEach(function (part, index) {
        if (index === desiredPartNumber - 1) {
          part.style.display = "block";
        } else {
          part.style.display = "none";
        }
      });
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this = this;

      this._partsElements.forEach(function (part, index) {
        if (index !== 0) {
          part.style.display = "none";
        }
      });

      this._buttonsElements.forEach(function (button) {
        return button.addEventListener("click", _this._onButtonClick);
      });
    }
  }]);

  return Parts;
}();
"use strict";

(function () {
  if (document.querySelector(".form__capcha-button")) {
    var buttons = Array.from(document.querySelectorAll(".form__capcha-button"));
    buttons.forEach(function (button) {
      button.addEventListener("click", function (evt) {
        evt.preventDefault();
        evt.target.classList.add("form__capcha-button--refresh");
        setTimeout(function () {
          evt.target.classList.remove("form__capcha-button--refresh");
        }, 300);
      });
    });
  }
})();
'use strict'; // class Collapse {
//   constructor(options = {}) {
//     this._buttonElements = Array.from(document.querySelectorAll(`[data-collapse-button]`));
//     this._contentElements = Array.from(document.querySelectorAll(`[data-collapse-content]`));
//     this._limitSymbols = options.limitSymbols || 380;
//     this._hideText = options.hideText || `Hide`;
//     this._buttonsDefaultText = this._buttonElements.map((button) => button.textContent) || null;
//     this._contentsInner = this._contentElements.map((content) => content.innerHTML) || null;
//     this._contentsInitialHeight = this._contentElements.map((content) => content.offsetHeight) || null;
//     this._isHiddenText = false;
//     this._onButtonClick = this._onButtonClick.bind(this);
//   }
//   _onButtonClick(evt) {
//     evt.preventDefault();
//   }
//   init() {
//     if (this._buttonElements.length > 0) {
//       this._contentElements.forEach((content) => content.style.cssText = `transition: height 0.3s; overflow: hidden; height: ${this._contentsInitialHeight[0]}px`);
//       this._buttonElements.forEach((button) => button.addEventListener(`click`, this._onButtonClick))
//     }
//   }
// }
// new Collapse().init();

(function () {
  var initHidingBlock = function initHidingBlock(block, button, limitSymbols) {
    var BUTTON_HIDE_TEXT = 'Hide'; // Текск кнопки, что бы спрятать текст

    var isHiddenText = false; // Флаг спрятан или показан текст

    var blockText; // Полный текст блока

    var button; // Кнопка скрытия/показа текста

    var buttonText; // Первоначальный текст кнопки

    var hideText = function hideText() {
      // Прячет текст
      var limitedText = block.innerHTML.substring(0, limitSymbols) + '...';
      block.innerHTML = limitedText;
      button.textContent = buttonText;
      isHiddenText = true;
      button.blur();
    };

    var showAllText = function showAllText() {
      // Показывает текст
      block.innerHTML = blockText;
      button.textContent = BUTTON_HIDE_TEXT;
      isHiddenText = false;
      button.blur();
    };

    var initButton = function initButton() {
      // Инициализирует кнопку
      button.addEventListener('click', function (evt) {
        evt.preventDefault();

        if (isHiddenText) {
          showAllText();
        } else {
          hideText();
        }
      });
    };

    var initTextHiding = function initTextHiding() {
      // Инициализирует весь функционал
      buttonText = button.textContent;
      blockText = block.innerHTML;
      initButton();
      hideText();
    };

    initTextHiding();
  }; // ============== Initialization ================
  // About Course


  if (document.querySelector('.collapse__content')) {
    initHidingBlock(document.querySelector('.collapse__content'), document.querySelector('.collapse__button'), 381);
  }
})();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputFile = /*#__PURE__*/function () {
  function InputFile(container) {
    _classCallCheck(this, InputFile);

    this._container = container;
    this._input = this._container.querySelector("input[type=\"file\"]");
    this._inputText = this._container.querySelector("*[data-text]");
    this._onInputChange = this._onInputChange.bind(this);

    this._init();
  }

  _createClass(InputFile, [{
    key: "_onInputChange",
    value: function _onInputChange(evt) {
      evt.preventDefault();
      var fileName = evt.target.value.split(/(\\|\/)/g).pop();

      this._inputText.classList.add("active");

      this._inputText.title = fileName;
      this._inputText.textContent = fileName;
    }
  }, {
    key: "_init",
    value: function _init() {
      this._input.addEventListener("change", this._onInputChange);
    }
  }]);

  return InputFile;
}();
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VolumeClasses = {
  level1: "vplay__volume--level-1",
  level2: "vplay__volume--level-2",
  level3: "vplay__volume--level-3",
  level4: "vplay__volume--level-4"
};

var formatTime = function formatTime(timeValue) {
  var hours = Math.floor(timeValue / 60 / 60);
  var minutes = Math.floor(timeValue / 60 % 60);
  var seconds = Math.floor(timeValue % 60);
  hours = hours <= 0 ? "" : hours;
  minutes = !minutes && minutes !== 0 ? "-" : minutes < 0 ? 0 : minutes;
  seconds = !seconds && seconds !== 0 ? "-" : seconds < 0 ? "00" : seconds < 10 ? "0".concat(seconds) : seconds;
  var totalTime = hours ? "".concat(hours, ":") : "" + "".concat(minutes, ":").concat(seconds);
  return totalTime;
};

var timeToPercent = function timeToPercent(currenTime, fullTime) {
  return currenTime / fullTime * 100;
};

var DragNDrop = /*#__PURE__*/function () {
  function DragNDrop(container, element) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, DragNDrop);

    this._container = container;
    this._element = element;
    this._onChange = options.onChange || null;
    this._onTotalChange = options.onTotalChange || null;
    this._containerCoords = null;
    this._value = null;
    this._onContainerMousedown = this._onContainerMousedown.bind(this);
    this._onWindowMousemove = this._onWindowMousemove.bind(this);
    this._onWindowMouseup = this._onWindowMouseup.bind(this);
    this._onContainerTouchstart = this._onContainerTouchstart.bind(this);
    this._onWindowTouchmove = this._onWindowTouchmove.bind(this);
    this._onWindowTouchend = this._onWindowTouchend.bind(this);

    this._init();
  }

  _createClass(DragNDrop, [{
    key: "changeValue",
    value: function changeValue(value) {
      this._value = value;
      this._element.style.width = "".concat(this._value, "%");
    }
  }, {
    key: "_changeCoords",
    value: function _changeCoords(cursorX) {
      if (cursorX >= this._containerCoords.left && cursorX <= this._containerCoords.right) {
        var cursorXFromContainerLeft = cursorX - this._containerCoords.left < 1 ? 0 : Math.ceil(cursorX - this._containerCoords.left);
        var widthValue = cursorXFromContainerLeft / this._containerCoords.width * 100;
        this.changeValue(widthValue);

        if (this._onChange) {
          this._onChange(this._value);
        }
      }
    }
  }, {
    key: "_onWindowMouseup",
    value: function _onWindowMouseup() {
      this._container.classList.remove("vplay__active");

      window.removeEventListener("mousemove", this._onWindowMousemove);
      window.removeEventListener("mouseup", this._onWindowMouseup);
      this._containerCoords = null;

      if (this._onTotalChange) {
        this._onTotalChange(this._value);
      }
    }
  }, {
    key: "_onWindowMousemove",
    value: function _onWindowMousemove(evt) {
      this._changeCoords(evt.clientX);
    }
  }, {
    key: "_onWindowTouchend",
    value: function _onWindowTouchend() {
      this._container.classList.remove("vplay__active");

      window.removeEventListener("touchmove", this._onWindowTouchmove);
      window.removeEventListener("touchend", this._onWindowTouchend);
      this._containerCoords = null;

      if (this._onTotalChange) {
        this._onTotalChange(this._value);
      }
    }
  }, {
    key: "_onWindowTouchmove",
    value: function _onWindowTouchmove(evt) {
      this._changeCoords(evt.changedTouches[0].clientX);
    }
  }, {
    key: "_onContainerMousedown",
    value: function _onContainerMousedown(evt) {
      if (evt.which === 1) {
        evt.preventDefault();
        this._containerCoords = this._container.getBoundingClientRect();

        this._container.classList.add("vplay__active");

        window.addEventListener("mouseup", this._onWindowMouseup);
        window.addEventListener("mousemove", this._onWindowMousemove);

        this._changeCoords(evt.clientX);
      }
    }
  }, {
    key: "_onContainerTouchstart",
    value: function _onContainerTouchstart(evt) {
      this._containerCoords = this._container.getBoundingClientRect();

      this._container.classList.add("vplay__active");

      window.addEventListener("touchend", this._onWindowTouchend);
      window.addEventListener("touchmove", this._onWindowTouchmove);

      this._changeCoords(evt.changedTouches[0].clientX);
    }
  }, {
    key: "_init",
    value: function _init() {
      this._container.addEventListener("mousedown", this._onContainerMousedown);

      this._container.addEventListener("touchstart", this._onContainerTouchstart);
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    }
  }]);

  return DragNDrop;
}();

var Vplay = /*#__PURE__*/function () {
  function Vplay(video, options) {
    _classCallCheck(this, Vplay);

    this._videoElement = typeof video === "string" ? document.querySelector(video) : video;
    this._playlist = options.playlist || null;
    this._dafaultVolume = options.dafaultVolume || 75;
    this._speeds = options.speeds || "";
    this._loop = options.loop || false;
    this._currentSpeed = 1;
    this._userSleepDelay = 3;
    this._userSleepSeconds = 0;
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this._changeVolume = this._changeVolume.bind(this);
    this._onPlayPauseClick = this._onPlayPauseClick.bind(this);
    this._onVideoLoadMeta = this._onVideoLoadMeta.bind(this);
    this._onVideoEnd = this._onVideoEnd.bind(this);
    this._onVideoTimeupdate = this._onVideoTimeupdate.bind(this);
    this._updateCurrentTime = this._updateCurrentTime.bind(this);
    this._onVideoSeeking = this._onVideoSeeking.bind(this);
    this._onVideoSeeked = this._onVideoSeeked.bind(this);
    this._pauseOnVideoTimeupdate = this._pauseOnVideoTimeupdate.bind(this);
    this._onVideoProgress = this._onVideoProgress.bind(this);
    this._onFullscreenClick = this._onFullscreenClick.bind(this);
    this._onContainerFullscreenchange = this._onContainerFullscreenchange.bind(this);
    this._onProgressBarHover = this._onProgressBarHover.bind(this);
    this._onPlaylistButtonClick = this._onPlaylistButtonClick.bind(this);
    this._onNextButtonClick = this._onNextButtonClick.bind(this);
    this._onPreviousButtonClick = this._onPreviousButtonClick.bind(this);
    this.init();
  }

  _createClass(Vplay, [{
    key: "init",
    value: function init() {
      this._videoElement.addEventListener("loadedmetadata", this._onVideoLoadMeta);

      this._wrapVideoElement();

      this._playlist && this._initPlaylist();

      this._createControlsBar();

      this._initVolume();

      this._startTarackingUserActivity();

      this._videoElement.addEventListener("ended", this._onVideoEnd);

      this._videoElement.addEventListener("timeupdate", this._onVideoTimeupdate);

      this._videoElement.addEventListener("progress", this._onVideoProgress);

      this._videoElement.addEventListener("seeking", this._onVideoSeeking);

      this._videoElement.addEventListener("seeked", this._onVideoSeeked);

      this._container.addEventListener("fullscreenchange", this._onContainerFullscreenchange);

      document.onmsfullscreenchange = this._onContainerFullscreenchange; // IE11

      this._videoElement.autoplay && this.play();
    }
  }, {
    key: "mute",
    value: function mute() {
      this._changeVolume(0);

      this._rememberVolume(0);

      this._volumeSlider.changeValue(0);

      this._volumeButton.title = "Unmute";
      this._volumeButton.querySelector("span").textContent = "Unmute";
    }
  }, {
    key: "pause",
    value: function pause() {
      this._playPauseButton.title = "Play";
      this._playPauseButton.querySelector("span").textContent = "Play";
      this._bigPlayPauseButton.title = "Play Video";
      this._bigPlayPauseButton.querySelector("span").textContent = "Play Video";

      this._container.classList.remove("vplay--played");

      this._container.classList.add("vplay--paused");

      this._videoElement.pause();

      if (this._playlist && this._playlistItems) {
        this._playlistItems[this._currentPlaylistItemNumber].classList.remove("".concat(this._playlistItemClass, "--playing"));
      }
    }
  }, {
    key: "play",
    value: function play() {
      this._playPauseButton.title = "Pause";
      this._playPauseButton.querySelector("span").textContent = "Pause";
      this._bigPlayPauseButton.title = "Pause Video";
      this._bigPlayPauseButton.querySelector("span").textContent = "Pause Video";

      this._container.classList.remove("vplay--paused");

      this._container.classList.remove("vplay--ended");

      this._container.classList.add("vplay--played");

      this._videoElement.play();

      if (this._playlistItems) {
        this._playlistItems[this._currentPlaylistItemNumber].classList.add("".concat(this._playlistItemClass, "--playing"));
      }

      if (this._playlist && this._playlistNavigation) {
        this._previousButton.disabled = this._currentPlaylistItemNumber ? false : true;
        this._nextButton.disabled = !this._playlist.loop && this._currentPlaylistItemNumber === this._playlistSources.length - 1 ? true : false;
      }
    }
  }, {
    key: "playNext",
    value: function playNext() {
      if (this._playlistItems) {
        this._playlistItems[this._currentPlaylistItemNumber].classList.remove("".concat(this._playlistItemClass, "--current"));

        this._playlistItems[this._currentPlaylistItemNumber].classList.remove("".concat(this._playlistItemClass, "--playing"));
      }

      if (this._currentPlaylistItemNumber !== this._playlistSources.length - 1) {
        if (this._playlistItems) {
          this._playlistItems[this._currentPlaylistItemNumber + 1].classList.add("".concat(this._playlistItemClass, "--current"));
        }

        this._videoElement.src = this._playlistSources[++this._currentPlaylistItemNumber];
      } else {
        if (this._playlistItems) {
          this._playlistItems[0].classList.add("".concat(this._playlistItemClass, "--current"));
        }

        this._currentPlaylistItemNumber = 0;
        this._videoElement.src = this._playlistSources[0];
      }

      this.play();
    }
  }, {
    key: "playPrevious",
    value: function playPrevious() {
      if (this._playlistItems) {
        this._playlistItems[this._currentPlaylistItemNumber].classList.remove("".concat(this._playlistItemClass, "--current"));

        this._playlistItems[this._currentPlaylistItemNumber].classList.remove("".concat(this._playlistItemClass, "--playing"));

        this._playlistItems[--this._currentPlaylistItemNumber].classList.add("".concat(this._playlistItemClass, "--current"));
      } else {
        this._currentPlaylistItemNumber--;
      }

      this._videoElement.src = this._playlistSources[this._currentPlaylistItemNumber];
      this.play();
    }
  }, {
    key: "stop",
    value: function stop() {
      this._videoElement.pause();

      this._videoElement.currentTime = 0;

      if (this._playlist && this._playlistItems) {
        this._playlistItems[this._currentPlaylistItemNumber].classList.remove("".concat(this._playlistItemClass, "--playing"));
      }
    }
  }, {
    key: "unmute",
    value: function unmute() {
      var lastVolume = localStorage.getItem("lastPositiveVolume");

      this._changeVolume(lastVolume);

      this._volumeSlider.changeValue(lastVolume);

      this._volumeButton.title = "Mute";
      this._volumeButton.querySelector("span").textContent = "Mute";
    }
  }, {
    key: "_createA11yText",
    value: function _createA11yText(text) {
      var element = document.createElement("span");
      element.classList.add("visually-hidden");
      element.textContent = text;
      return element;
    }
  }, {
    key: "_createBigPlay",
    value: function _createBigPlay() {
      this._bigPlayPauseButton = this._createElement({
        element: "button",
        classes: ["button", "vplay__big-play"],
        attributes: [["type", "button"], ["title", "Play Video"]],
        inner: [this._createA11yText("Play Video")]
      });

      this._bigPlayPauseButton.addEventListener("click", this._onPlayPauseClick);

      return this._bigPlayPauseButton;
    }
  }, {
    key: "_createElement",
    value: function _createElement(props) {
      var element = document.createElement(props.element);

      if (props.id) {
        element.id = props.id;
      }

      if (props.classes) {
        props.classes.forEach(function (className) {
          element.classList.add(className);
        });
      }

      if (props.attributes) {
        props.attributes.forEach(function (item) {
          element.setAttribute(item[0], item[1]);
        });
      }

      if (props.inner) {
        element.append.apply(element, _toConsumableArray(props.inner));
      }

      return element;
    }
  }, {
    key: "_createLoader",
    value: function _createLoader() {
      var _this = this;

      this._loader = this._createElement({
        element: "div",
        classes: ["vplay__loader", "lds-ring"],
        inner: _toConsumableArray(new Array(4).fill("").map(function () {
          return _this._createElement({
            element: "div"
          });
        }))
      });
      return this._loader;
    }
  }, {
    key: "_createNextButton",
    value: function _createNextButton() {
      this._nextButton = this._createElement({
        element: "button",
        classes: ["button", "vplay__next"],
        attributes: [["type", "button"], ["title", "Next video"]],
        inner: [this._createA11yText("Next video")]
      });

      this._nextButton.addEventListener("click", this._onNextButtonClick);

      return this._nextButton;
    }
  }, {
    key: "_createPlayPause",
    value: function _createPlayPause() {
      this._playPauseButton = this._createElement({
        element: "button",
        classes: ["button", "vplay__play"],
        attributes: [["type", "button"], ["title", "Play"]],
        inner: [this._createA11yText("Play")]
      });

      this._playPauseButton.addEventListener("click", this._onPlayPauseClick);

      return this._playPauseButton;
    }
  }, {
    key: "_createPreviousButton",
    value: function _createPreviousButton() {
      this._previousButton = this._createElement({
        element: "button",
        classes: ["button", "vplay__previous"],
        attributes: [["type", "button"], ["title", "Previous video"]],
        inner: [this._createA11yText("Previous video")]
      });

      if (this._currentPlaylistItemNumber === 0) {
        this._previousButton.disabled = true;
      }

      ;

      this._previousButton.addEventListener("click", this._onPreviousButtonClick);

      return this._previousButton;
    }
  }, {
    key: "_createVolume",
    value: function _createVolume() {
      var _this2 = this;

      this._volumeButton = this._createElement({
        element: "button",
        classes: ["button", "vplay__volume-mute"],
        attributes: [["type", "button"], ["title", "Mute"]],
        inner: [this._createA11yText("Mute")]
      });

      var volumeLineFull = this._createElement({
        element: "div",
        classes: ["vplay__volume-line", "vplay__volume-line--full"]
      });

      var volumeLineCurrent = this._createElement({
        element: "div",
        classes: ["vplay__volume-line", "vplay__volume-line--current"]
      });

      var volumeBar = this._createElement({
        element: "div",
        classes: ["vplay__volume-bar"],
        inner: [volumeLineFull, volumeLineCurrent]
      });

      var volume = this._createElement({
        element: "div",
        classes: ["vplay__volume"],
        inner: [this._volumeButton, volumeBar]
      });

      this._volumeSlider = new DragNDrop(volumeBar, volumeLineCurrent, {
        onChange: this._changeVolume,
        onTotalChange: this._rememberVolume
      });
      this._volume = volume;

      this._volumeButton.addEventListener("click", function (evt) {
        evt.preventDefault();

        if (Number(_this2._volumeSlider.value)) {
          _this2.mute();
        } else {
          _this2.unmute();
        }
      });

      return volume;
    }
  }, {
    key: "_createCurrentTime",
    value: function _createCurrentTime() {
      this._currentTime = this._createElement({
        element: "span",
        classes: ["vplay__time", "vplay__time--current"],
        inner: ["-:-"]
      });
      return this._currentTime;
    }
  }, {
    key: "_createFullTime",
    value: function _createFullTime() {
      this._fullTime = this._createElement({
        element: "span",
        classes: ["vplay__time", "vplay__time--full"],
        inner: ["-:-"]
      });
      return this._fullTime;
    }
  }, {
    key: "_createProgressBar",
    value: function _createProgressBar() {
      this._timeTooltip = this._createElement({
        element: "div",
        classes: ["vplay__time-tooltip"],
        inner: ["-:-"]
      });

      var full = this._createElement({
        element: "div",
        classes: ["vplay__full"]
      });

      this._lostVideoLine = this._createElement({
        element: "div",
        classes: ["vplay__lost"]
      });
      this._loadedVideoLine = this._createElement({
        element: "div",
        classes: ["vplay__loaded"]
      });

      var bar = this._createElement({
        element: "div",
        classes: ["vplay__progress-bar"],
        inner: [full, this._loadedVideoLine, this._lostVideoLine, this._timeTooltip]
      });

      this._progressBar = new DragNDrop(bar, this._lostVideoLine, {
        onChange: this._pauseOnVideoTimeupdate,
        onTotalChange: this._updateCurrentTime
      });
      bar.addEventListener("mousemove", this._onProgressBarHover);
      return bar;
    }
  }, {
    key: "_createSpeedBar",
    value: function _createSpeedBar() {
      var _this3 = this;

      if (this._speeds) {
        this._speedItems = this._speeds.map(function (item) {
          if (item === 1) {
            return _this3._createElement({
              element: "li",
              classes: ["vplay__speed-item", "vplay__speed-item--current"],
              inner: [item]
            });
          } else {
            return _this3._createElement({
              element: "li",
              classes: ["vplay__speed-item"],
              inner: [item]
            });
          }
        });

        var speedList = this._createElement({
          element: "ul",
          classes: ["vplay__speed-list"],
          inner: _toConsumableArray(this._speedItems)
        });

        var buttonText = this._createElement({
          element: "span",
          classes: ["vplay__button-text"],
          inner: [1]
        });

        this._speedButton = this._createElement({
          element: "button",
          classes: ["button", "vplay__speed"],
          attributes: [["type", "button"], ["title", "Playback Rate"]],
          inner: [this._createA11yText("Playback Rate"), buttonText]
        });

        var bar = this._createElement({
          element: "div",
          classes: ["vplay__speed-bar"],
          inner: [this._speedButton, speedList]
        });

        this._speedButton.addEventListener("click", function () {
          var currentSpeedIndex = _this3._speeds.findIndex(function (item) {
            return item === _this3._currentSpeed;
          });

          var nextSpeed = currentSpeedIndex === _this3._speeds.length - 1 ? _this3._speeds[0] : _this3._speeds[currentSpeedIndex + 1];

          _this3._changeSpeed(nextSpeed);
        });

        this._speedItems.forEach(function (item, index) {
          item.addEventListener("click", function () {
            _this3._changeSpeed(_this3._speeds[index]);
          });
        });

        return bar;
      }

      return false;
    }
  }, {
    key: "_createFullscreen",
    value: function _createFullscreen() {
      this._fullScreenButton = this._createElement({
        element: "button",
        classes: ["button", "vplay__fullscreen"],
        attributes: [["type", "button"], ["title", "Fullscreen"]],
        inner: [this._createA11yText("Fullscreen")]
      });

      this._fullScreenButton.addEventListener("click", this._onFullscreenClick);

      return this._fullScreenButton;
    }
  }, {
    key: "_createControlsBar",
    value: function _createControlsBar() {
      var controlBar = this._createElement({
        element: "div",
        classes: ["vplay__controls"],
        inner: [this._playlistNavigation ? this._createPreviousButton() : "", this._createPlayPause(), this._playlistNavigation ? this._createNextButton() : "", this._createVolume(), this._createCurrentTime(), this._createFullTime(), this._createProgressBar(), this._speeds && this._createSpeedBar(), this._createFullscreen()]
      });

      window.addEventListener("mousemove", function (evt) {
        if (evt.target.closest(".vplay__controls")) {
          controlBar.classList.add("vplay__controls--hover");
        } else {
          controlBar.classList.remove("vplay__controls--hover");
        }
      });

      this._container.append(controlBar, this._createBigPlay(), this._createLoader());
    }
  }, {
    key: "_changeVolume",
    value: function _changeVolume(value) {
      var valueNumber = Number(value);
      this._videoElement.volume = value / 100;

      if (valueNumber === 0) {
        this._updateVolumeClass(VolumeClasses.level1);
      } else if (valueNumber > 0 && valueNumber <= 33) {
        this._updateVolumeClass(VolumeClasses.level2);
      } else if (valueNumber > 33 && valueNumber <= 66) {
        this._updateVolumeClass(VolumeClasses.level3);
      } else {
        this._updateVolumeClass(VolumeClasses.level4);
      }
    }
  }, {
    key: "_changeSpeed",
    value: function _changeSpeed(speed) {
      var _this4 = this;

      if (speed !== this._videoElement.playbackRate) {
        var currentsSpeedItemIndex = this._speeds.findIndex(function (item) {
          return item === _this4._currentSpeed;
        });

        var requestedSpeedItemIndex = this._speeds.findIndex(function (item) {
          return item === speed;
        });

        this._videoElement.playbackRate = speed;
        this._currentSpeed = speed;

        this._speedItems[currentsSpeedItemIndex].classList.remove("vplay__speed-item--current");

        this._speedItems[requestedSpeedItemIndex].classList.add("vplay__speed-item--current");

        this._speedButton.querySelector(".vplay__button-text").textContent = speed;
      }
    }
  }, {
    key: "_endPlaying",
    value: function _endPlaying() {
      this._container.classList.remove("vplay--played");

      this._container.classList.add("vplay--ended");

      this._playPauseButton.title = "Replay";
      this._playPauseButton.querySelector("span").textContent = "Replay";
    }
  }, {
    key: "_toggleFullscreenButton",
    value: function _toggleFullscreenButton() {
      if (!this._fullScreenButton.classList.contains("vplay__fullscreen--active")) {
        this._fullScreenButton.classList.add("vplay__fullscreen--active");

        this._fullScreenButton.title = "Non Fullscreen";
        this._fullScreenButton.querySelector("span").textContent = "Non Fullscreen";

        this._container.querySelector(".vplay__controls").classList.remove("vplay__controls--hover");
      } else {
        this._fullScreenButton.classList.remove("vplay__fullscreen--active");

        this._fullScreenButton.title = "Fullscreen";
        this._fullScreenButton.querySelector("span").textContent = "Fullscreen";
      }
    }
  }, {
    key: "_initPlaylist",
    value: function _initPlaylist() {
      this._playlistNavigation = this._playlist.hasOwnProperty("navigation") ? this._playlist.navigation : true;
      this._currentPlaylistItemNumber = this._playlist.startItemNumber || 0;
      this._playlistSources = this._playlist.itemClass ? Array.from(document.querySelectorAll(this._playlist.itemClass)).map(function (item) {
        return item.getAttribute("data-vplay-src");
      }) : this._playlist.sources;

      if (this._videoElement.src !== this._playlistSources[this._currentPlaylistItemNumber]) {
        this._videoElement.src = this._playlistSources[this._currentPlaylistItemNumber];
      }

      if (this._playlist.itemClass) {
        this._initPlaylistItems();
      }
    }
  }, {
    key: "_initPlaylistItems",
    value: function _initPlaylistItems() {
      var _this5 = this;

      this._playlistItems = Array.from(document.querySelectorAll(this._playlist.itemClass));
      this._playlistItemClass = this._playlist.itemClass.replace(".", "");

      this._playlistItems[this._currentPlaylistItemNumber].classList.add("".concat(this._playlistItemClass, "--current"));

      this._playlistItems.forEach(function (item) {
        var buttons = [];

        if (item.hasAttribute("data-vplay-button")) {
          buttons.push(item);
        } else {
          Array.from(item.querySelectorAll("*[data-vplay-button]")).forEach(function (button) {
            return buttons.push(button);
          });
        }

        buttons.forEach(function (button) {
          return button.addEventListener("click", _this5._onPlaylistButtonClick);
        });
      });
    }
  }, {
    key: "_initVolume",
    value: function _initVolume() {
      var volume = localStorage.getItem("lastVolume") || this._dafaultVolume;

      this._changeVolume(volume);

      this._volumeSlider.changeValue(volume);
    }
  }, {
    key: "_onContainerFullscreenchange",
    value: function _onContainerFullscreenchange() {
      this._container.classList.toggle("vplay--fullscreen");

      this._toggleFullscreenButton();
    }
  }, {
    key: "_onFullscreenClick",
    value: function _onFullscreenClick(evt) {
      evt.preventDefault();

      if (document.fullscreenElement && document.fullscreenElement.classList.contains("vplay") || document.msFullscreenElement && document.msFullscreenElement.classList.contains("vplay")) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (this._container.requestFullscreen) {
          this._container.requestFullscreen();
        } else if (this._container.webkitRequestFullscreen) {
          this._container.webkitRequestFullscreen();
        } else if (this._container.msRequestFullscreen) {
          this._container.msRequestFullscreen();
        }
      }

      ;
    }
  }, {
    key: "_onVideoEnd",
    value: function _onVideoEnd() {
      if (this._loop && !(this._playlist && this._playlist.autoplayNext)) {
        this.play();
      } else if (this._playlist && this._playlist.autoplayNext) {
        if (this._playlist.loop || this._playlistItems && this._currentPlaylistItemNumber !== this._playlistItems.length - 1) {
          this.playNext();
        } else {
          this._endPlaying();
        }
      } else {
        this._endPlaying();
      }
    }
  }, {
    key: "_onVideoLoadMeta",
    value: function _onVideoLoadMeta() {
      this._fullTime.textContent = formatTime(this._videoElement.duration);
      this._currentTime.textContent = "0:00";

      this._changeSpeed(this._currentSpeed);
    }
  }, {
    key: "_onVideoProgress",
    value: function _onVideoProgress() {
      this._updateLoadedVideoLine();
    }
  }, {
    key: "_onVideoSeeking",
    value: function _onVideoSeeking() {
      this._container.classList.add("vplay--loading");
    }
  }, {
    key: "_onVideoSeeked",
    value: function _onVideoSeeked() {
      this._container.classList.remove("vplay--loading");
    }
  }, {
    key: "_onVideoTimeupdate",
    value: function _onVideoTimeupdate() {
      var currentTime = this._videoElement.currentTime;
      this._currentTime.textContent = formatTime(currentTime);

      this._updateLostVideoLine(currentTime);
    }
  }, {
    key: "_onPlaylistButtonClick",
    value: function _onPlaylistButtonClick(evt) {
      var _this6 = this;

      evt.preventDefault();

      var itemNumber = this._playlistItems.findIndex(function (item) {
        return item === evt.target.closest(_this6._playlist.itemClass);
      });

      if (itemNumber !== this._currentPlaylistItemNumber) {
        this._playlistItems[this._currentPlaylistItemNumber].classList.remove("".concat(this._playlistItemClass, "--current"));

        this._playlistItems[this._currentPlaylistItemNumber].classList.remove("".concat(this._playlistItemClass, "--playing"));

        this._playlistItems[itemNumber].classList.add("".concat(this._playlistItemClass, "--current"));

        var src = this._playlistSources[itemNumber];
        this._currentPlaylistItemNumber = itemNumber;
        this._videoElement.src = src;
        this.play();
      } else if (itemNumber === this._currentPlaylistItemNumber && this._videoElement.paused) {
        this.play();
      } else {
        this.pause();
      }
    }
  }, {
    key: "_onNextButtonClick",
    value: function _onNextButtonClick(evt) {
      evt.preventDefault();
      this.playNext();
    }
  }, {
    key: "_onPlayPauseClick",
    value: function _onPlayPauseClick(evt) {
      evt.preventDefault();
      this._videoElement.paused ? this.play() : this.pause();
    }
  }, {
    key: "_onPreviousButtonClick",
    value: function _onPreviousButtonClick(evt) {
      evt.preventDefault();

      if (this._currentPlaylistItemNumber !== 0) {
        this.playPrevious();
      }
    }
  }, {
    key: "_onProgressBarHover",
    value: function _onProgressBarHover(evt) {
      var barCoords = evt.currentTarget.getBoundingClientRect();
      var value = (evt.clientX - barCoords.left) / barCoords.width * 100;
      var time = formatTime(this._videoElement.duration * value / 100);
      this._timeTooltip.textContent = time;
      this._timeTooltip.style.left = value + '%';
    }
  }, {
    key: "_pauseOnVideoTimeupdate",
    value: function _pauseOnVideoTimeupdate() {
      this._videoElement.removeEventListener("timeupdate", this._onVideoTimeupdate);
    }
  }, {
    key: "_rememberVolume",
    value: function _rememberVolume(value) {
      if (value) {
        localStorage.setItem("lastVolume", value);
        localStorage.setItem("lastPositiveVolume", value);
      } else {
        localStorage.setItem("lastVolume", value);
      }
    }
  }, {
    key: "_startTarackingUserActivity",
    value: function _startTarackingUserActivity() {
      var _this7 = this;

      setInterval(function () {
        _this7._userSleepSeconds = _this7._userSleepSeconds + 0.1;
      }, 100);
      setInterval(function () {
        if (_this7._userSleepSeconds >= _this7._userSleepDelay) {
          _this7._container.classList.add("vplay--user-sleep");
        } else {
          _this7._container.classList.remove("vplay--user-sleep");
        }
      }, 100);
      document.addEventListener("mousemove", function () {
        _this7._userSleepSeconds = 0;
      });
      document.addEventListener("touchmove", function () {
        _this7._userSleepSeconds = 0;
      });
    }
  }, {
    key: "_wrapVideoElement",
    value: function _wrapVideoElement() {
      this._container = this._createElement({
        element: "div",
        classes: ["vplay"]
      });

      this._videoElement.classList.remove("vplay");

      this._videoElement.classList.add("vplay__video");

      this._videoElement.removeAttribute("controls");

      this._videoElement.before(this._container);

      this._videoElement.remove();

      this._container.append(this._videoElement);
    }
  }, {
    key: "_updateCurrentTime",
    value: function _updateCurrentTime(value) {
      this._videoElement.currentTime = this._videoElement.duration / 100 * value;

      this._videoElement.addEventListener("timeupdate", this._onVideoTimeupdate);
    }
  }, {
    key: "_updateLoadedVideoLine",
    value: function _updateLoadedVideoLine() {
      if (this._videoElement.buffered.length) {
        var lineWindth = this._videoElement.buffered.end(this._videoElement.buffered.length - 1) / this._videoElement.duration * 100;
        this._loadedVideoLine.style.width = "".concat(lineWindth ? lineWindth : 0, "%");
      }
    }
  }, {
    key: "_updateLostVideoLine",
    value: function _updateLostVideoLine(currentTime) {
      var value = timeToPercent(currentTime, this._videoElement.duration);

      this._progressBar.changeValue(value);
    }
  }, {
    key: "_updateVolumeClass",
    value: function _updateVolumeClass(className) {
      if (!this._volume.classList.contains(className)) {
        var classes = Array.from(this._volume.classList);

        if (classes.length > 1) {
          this._volume.classList.remove(classes.reverse()[0]);
        }

        this._volume.classList.add(className);
      }
    }
  }]);

  return Vplay;
}();
"use strict";

/////////////////////// SLIDERS
// Slider with vendor links on the home page
if (document.querySelector(".header-links__swiper-slider")) {
  new Swiper(".header-links__swiper-slider", {
    slidesPerView: "auto",
    watchOverflow: true
  });
} // Slider with top vendors on the home page


if (document.querySelector(".hot__list-wrapper")) {
  new Swiper(".hot__list-wrapper", {
    slidesPerView: "auto",
    watchOverflow: true,
    navigation: {
      prevEl: ".hot__slider-button.button--slider--prev",
      nextEl: ".hot__slider-button.button--slider--next"
    }
  });
} // Slider with hot training courses in sidebar (responsive)


if (document.querySelector(".hot-sidebar__list-wrapper")) {
  var sliderWrappers = Array.from(document.querySelectorAll(".hot-sidebar__list-wrapper"));

  var initHotSliders = function initHotSliders(sliderWrapperElement) {
    var hotSidebarSlider = null;

    var createHotSidebarSlider = function createHotSidebarSlider() {
      hotSidebarSlider = new Swiper(sliderWrapperElement, {
        slidesPerView: "auto",
        watchOverflow: true,
        navigation: {
          prevEl: sliderWrapperElement.querySelector(".button--slider--prev"),
          nextEl: sliderWrapperElement.querySelector(".button--slider--next")
        }
      });
    };

    if (innerWidth < 1200) {
      createHotSidebarSlider();
    }

    window.addEventListener("resize", function () {
      if (innerWidth > 1200 && hotSidebarSlider !== null) {
        hotSidebarSlider.destroy();
        hotSidebarSlider = null;
      } else if (innerWidth <= 1200 && hotSidebarSlider === null) {
        createHotSidebarSlider();
      }
    });
  };

  sliderWrappers.forEach(function (sliderWrapper) {
    return initHotSliders(sliderWrapper);
  });
} // Slider with hot training courses in main content of page 


if (document.querySelector(".hot-sidebar__list-wrapper--full-page")) {
  new Swiper(".hot-sidebar__list-wrapper--full-page", {
    slidesPerView: "auto",
    watchOverflow: true,
    navigation: {
      prevEl: ".hot-sidebar__slider-button.button--slider--prev",
      nextEl: ".hot-sidebar__slider-button.button--slider--next"
    }
  });
} // Sliders of courses


if (document.querySelector(".courses__list-wrapper")) {
  var containers = Array.from(document.querySelectorAll(".courses__list-wrapper"));
  containers.forEach(function (container) {
    return new Swiper(container, {
      slidesPerView: "auto",
      watchOverflow: true,
      navigation: {
        prevEl: container.querySelector(".button--slider--prev"),
        nextEl: container.querySelector(".button--slider--next")
      }
    });
  });
} // Screenshots Slider


if (document.querySelector(".screenshots__slider--half-width")) {
  new Swiper(".screenshots__slider--half-width", {
    slidesPerView: "auto",
    watchOverflow: true,
    centeredSlides: true,
    navigation: {
      prevEl: ".screenshots__slider-button.button--slider--prev",
      nextEl: ".screenshots__slider-button.button--slider--next"
    }
  });
} // Screenshots Slider (full width)


if (document.querySelector(".screenshots__slider--full-width")) {
  new Swiper(".screenshots__slider--full-width", {
    slidesPerView: "auto",
    watchOverflow: true,
    centeredSlides: true,
    loop: true,
    navigation: {
      prevEl: ".screenshots__slider-button.button--slider--prev",
      nextEl: ".screenshots__slider-button.button--slider--next"
    }
  });
} // Slider in the videocourse page


if (document.querySelector(".course__list-container")) {
  new Swiper(".course__list-container", {
    slidesPerView: "auto",
    watchOverflow: true,
    navigation: {
      prevEl: ".course__slider-button.button--slider--prev",
      nextEl: ".course__slider-button.button--slider--next"
    }
  });
} //////////////////////// MOBILE MENU


if (document.querySelector(".menu-button-open-js")) {
  var mobileMenu = new Menu("menu-button-open-js", "menu-button-close-js", "main-menu-js");
} //////////////////////// MOBILE SEARCH


if (document.querySelector(".search-button-js")) {
  new Search("search-button-js", "search-js");
} //////////////////////// MODALS
// Discount


if (document.querySelector(".modal--discount")) {
  var modalDiscount = new Modal("modal--discount");
} // Discount


if (document.querySelector(".modal--steps")) {
  var modalHowItWorks = new Modal("modal--steps", {
    callButtonClass: "js-button-how-it-works"
  });
} // Free Demo


if (document.querySelector(".modal--free-demo")) {
  var modalFreeDemo = new Modal("modal--free-demo", {
    callButtonClass: "js-free-demo-button"
  });
} // Not Convinced


if (document.querySelector(".product__link-modal")) {
  var _modalFreeDemo = new Modal("modal--not-convinced", {
    callButtonClass: "product__link-modal"
  });
} // Products (on the certification page)


if (document.querySelector(".js-products")) {
  var _modalFreeDemo2 = new Modal("modal--products", {
    callButtonClass: "js-products"
  });
} // Login (on the videocourse page)


if (document.querySelector(".js-modal-login")) {
  var modalLogin = new Modal("modal--login", {
    callButtonClass: "js-modal-login"
  });
} //////////////////////// EXPAND


if (document.querySelector(".expand")) {
  $('.expand [data-accordion]').accordion();
} //////////////////////// PARTS


if (document.querySelector(".login__part")) {
  new Parts({
    partClass: "login__part",
    buttonClass: "login__button--part"
  });
} /////////////////////// SELECTS


$(function () {
  $('select').selectric();
}); /////////////////////// INPUTS [type="fyle"]

if (document.querySelector(".form__field-wrapper--file")) {
  var inputs = Array.from(document.querySelectorAll(".form__field-wrapper--file"));
  inputs.forEach(function (input) {
    return new InputFile(input);
  });
}