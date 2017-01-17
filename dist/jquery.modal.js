/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const $ = window.$ = __webpack_require__(1);
	const modal = __webpack_require__(2);
	const ModalError = __webpack_require__(11);

	$.fn.modal = function interface(opts) {
	  opts = opts || {};

	  $(this).each(function() {
	    var el = $(this);

	    if ( typeof opts === 'string' ) {
	      if ( !el.data('modal') ) {
	        throw new ModalError('Element hasn\'t been initialized yet!');
	      }

	      el.data('modal')[opts]();
	    } else if ( typeof opts === 'object' ) {
	      if ( el.data('modal') ) {
	        throw new ModalError('This element has already been initialized!');
	      }

	      el.data('modal', modal(el, opts));
	    }
	  });

	  return this;
	}

	// ----------
	// Data API Convenience Binding
	// ----------

	// Setup Data API to open modal
	$('[data-modal]').each(function(key, node) {
	  var el = $(node);
	  var target = $(el.data('modal'));
	  target.modal();

	  el.on('click', function(evt) {
	    evt.preventDefault();
	    target.modal('open');
	  });
	});

	// Setup Data API to close modal
	$('[data-modal-close]').each(function(key, node) {
	  var el = $(node);
	  var target = $(el.data('modal-close'));

	  el.on('click', function(evt) {
	    evt.preventDefault();
	    target.modal('close');
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const $ = __webpack_require__(1);
	__webpack_require__(1);
	__webpack_require__(3);
	const a11y = __webpack_require__(6);
	const ModalError = __webpack_require__(11);
	const body = $('body');
	const doc = $(document);

	function Modal(el, opts) {
	  if (!(this instanceof Modal)) return new Modal(el, opts);

	  opts = this.opts = $.extend({}, opts, {
	    escapable: true,
	    backdrop: el
	  });

	  this.init = false;
	  this.status = false; // Open status
	  this.el = el;
	  this.dialogue = el.children().get(0);
	  this.jqt = el.jqt({ speed: opts.speed });
	  this.bind();
	}

	/**
	 * Main application element for accessibility
	 */
	Modal.main = $('main');

	Modal.prototype = {
	  /**
	   * Bind all required events
	   */
	  bind: function() {
	    var self = this;

	    self.init = true;

	    if ( self.opts.escapable ) {
	      doc.on('keyup', function(evt) {
	        if ( evt.which === 27 ) {
	          self.close();
	        }
	      });
	    }

	    if ( self.opts.backdrop ) {
	      var backdrop = $(self.opts.backdrop);

	      backdrop.children().on('click', function(evt) {
	        evt.stopPropagation();
	      });

	      backdrop.on('click', function(evt) {
	        self.close();
	      });
	    }
	  },

	  /**
	   * Open the modal
	   */
	  open: function() {
	    if ( this.status ) return;

	    this.status = true;
	    body.addClass('modal-open');
	    this.jqt.enter(function() {
	      a11y.focus(Modal.main, this.dialogue);
	      this.el.trigger('modal:open');
	    }.bind(this));
	  },

	  /**
	   * Close the modal
	   */
	  close: function() {
	    if ( !this.status ) return;

	    this.status = false;
	    body.removeClass('modal-open');
	    this.jqt.exit(function() {
	      a11y.restore(Modal.main);
	      this.el.trigger('modal:close');
	    }.bind(this));
	  },
	};

	module.exports = Modal;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var compensate = __webpack_require__(4);
	$(function() { compensate('.modal-open'); });

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var scrollbar = __webpack_require__(5);

	module.exports = function compensate(elements) {
	  if ( !elements.length ) {
	    throw new Error(
	      'You are calling `compensate()` without any argument. ' +
	      'You must provide an element!'
	    );
	  }

	  var selectors = elements.join(', ');
	  var size = scrollbar() || 0;
	  style(selectors + ' { padding-right: ' + size + 'px; }');
	}

	function style(styling) {
	  const style = document.createElement('style');
	  style.appendChild(document.createTextNode(styling));
	  document.head.appendChild(style);
	  return style;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.scrollbarSize = factory();
	    }
	}(this, function() {
	    var scrollbarSize = null;

	    return function() {
	        if (scrollbarSize !== null)
	            return scrollbarSize;

	        if (window.document.readyState === "loading")
	            return void 0;

	        var div1, div2;

	        div1 = window.document.createElement('div');
	        div2 = window.document.createElement('div');

	        div1.style.width = '100px';
	        div1.style.overflowX = 'scroll';
	        div2.style.width = '100px';

	        window.document.body.appendChild(div1);
	        window.document.body.appendChild(div2);

	        scrollbarSize = div1.offsetHeight - div2.offsetHeight;

	        window.document.body.removeChild(div1);
	        window.document.body.removeChild(div2);

	        return scrollbarSize;
	    }
	}));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const scope = __webpack_require__(7);
	const store = __webpack_require__(10);

	/**
	 * Handle accessibility
	 * @forked https://github.com/cloudflare/react-modal2/blob/master/src/Modal.js#L6-L16
	 */
	module.exports = {
	  focus: function(main, el) {
	    store.storeFocus();
	    main.length && main.attr('aria-hidden', 'true');
	    scope.scopeFocus(el);
	  },

	  restore: function(main) {
	    scope.unscopeFocus();
	    main.length && main.removeAttr('aria-hidden');
	    store.restoreFocus();
	  },
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var tabbable = __webpack_require__(8);
	var focusin = __webpack_require__(9);
	var polyfilled = false;

	function init(element) {

	  // lazily polyfill focusin for firefox
	  if (!polyfilled) {
	    focusin.polyfill();
	    polyfilled = true;
	  }

	  function focus() {
	    (tabbable(element)[0] || element).focus()
	  }

	  function onFocusIn(event) {
	    if (element !== event.target && !element.contains(event.target)) {
	      focus();
	    }
	  }

	  focus();

	  document.addEventListener('focusin', onFocusIn);

	  return function teardown() {
	    document.removeEventListener('focusin', onFocusIn);
	  };
	}

	var teardownFn;

	exports.scopeFocus = function(element) {
	  if (teardownFn) teardownFn();
	  teardownFn = init(element);
	};

	exports.unscopeFocus = function() {
	  if (teardownFn) teardownFn();
	  teardownFn = null;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(el) {
	  var basicTabbables = [];
	  var orderedTabbables = [];

	  // A node is "available" if
	  // - it's computed style
	  var isUnavailable = createIsUnavailable();

	  var candidateSelectors = [
	    'input',
	    'select',
	    'a[href]',
	    'textarea',
	    'button',
	    '[tabindex]',
	  ];

	  var candidates = el.querySelectorAll(candidateSelectors);

	  var candidate, candidateIndex;
	  for (var i = 0, l = candidates.length; i < l; i++) {
	    candidate = candidates[i];
	    candidateIndex = candidate.tabIndex;

	    if (
	      candidateIndex < 0
	      || (candidate.tagName === 'INPUT' && candidate.type === 'hidden')
	      || candidate.disabled
	      || isUnavailable(candidate)
	    ) {
	      continue;
	    }

	    if (candidateIndex === 0) {
	      basicTabbables.push(candidate);
	    } else {
	      orderedTabbables.push({
	        tabIndex: candidateIndex,
	        node: candidate,
	      });
	    }
	  }

	  var tabbableNodes = orderedTabbables
	    .sort(function(a, b) {
	      return a.tabIndex - b.tabIndex;
	    })
	    .map(function(a) {
	      return a.node
	    });

	  Array.prototype.push.apply(tabbableNodes, basicTabbables);

	  return tabbableNodes;
	}

	function createIsUnavailable() {
	  // Node cache must be refreshed on every check, in case
	  // the content of the element has changed
	  var isOffCache = [];

	  // "off" means `display: none;`, as opposed to "hidden",
	  // which means `visibility: hidden;`. getComputedStyle
	  // accurately reflects visiblity in context but not
	  // "off" state, so we need to recursively check parents.

	  function isOff(node, nodeComputedStyle) {
	    if (node === document.documentElement) return false;

	    // Find the cached node (Array.prototype.find not available in IE9)
	    for (var i = 0, length = isOffCache.length; i < length; i++) {
	      if (isOffCache[i][0] === node) return isOffCache[i][1];
	    }

	    nodeComputedStyle = nodeComputedStyle || window.getComputedStyle(node);

	    var result = false;

	    if (nodeComputedStyle.display === 'none') {
	      result = true;
	    } else if (node.parentNode) {
	      result = isOff(node.parentNode);
	    }

	    isOffCache.push([node, result]);

	    return result;
	  }

	  return function isUnavailable(node) {
	    if (node === document.documentElement) return false;

	    var computedStyle = window.getComputedStyle(node);

	    if (isOff(node, computedStyle)) return true;

	    return computedStyle.visibility === 'hidden';
	  }
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* from https://gist.github.com/nuxodin/9250e56a3ce6c0446efa */

	function polyfill () {
	  var w = window
	  var d = w.document

	  if (w.onfocusin === undefined) {
	    d.addEventListener('focus', addPolyfill, true)
	    d.addEventListener('blur', addPolyfill, true)
	    d.addEventListener('focusin', removePolyfill, true)
	    d.addEventListener('focusout', removePolyfill, true)
	  }

	  function addPolyfill (e) {
	    var type = e.type === 'focus' ? 'focusin' : 'focusout'
	    var event = new window.CustomEvent(type, { bubbles: true, cancelable: false })
	    event.c1Generated = true
	    e.target.dispatchEvent(event)
	  }

	  function removePolyfill (e) {
	    if (!e.c1Generated) {
	      d.removeEventListener('focus', addPolyfill, true)
	      d.removeEventListener('blur', addPolyfill, true)
	      d.removeEventListener('focusin', removePolyfill, true)
	      d.removeEventListener('focusout', removePolyfill, true)
	    }
	    setTimeout(function () {
	      d.removeEventListener('focusin', removePolyfill, true)
	      d.removeEventListener('focusout', removePolyfill, true)
	    })
	  }
	}

	module.exports = {
	  polyfill: polyfill
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var storedFocusElement;

	exports.storeFocus = function() {
	  storedFocusElement = document.activeElement;
	};

	exports.clearStoredFocus = function() {
	  storedFocusElement = null;
	};

	exports.restoreFocus = function() {
	  if (!storedFocusElement) return;
	  try { storedFocusElement.focus(); } catch (err) {}
	  storedFocusElement = null;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	function ModalError(msg) {
	  this.name = 'ModalError';
	  this.message = 'jquery-modal: ' + message;
	  this.stack = (new Error()).stack;
	}

	ModalError.prototype = Object.create(Error.prototype);
	ModalError.prototype.constructor = ModalError;

	module.exports = ModalError;

/***/ }
/******/ ]);