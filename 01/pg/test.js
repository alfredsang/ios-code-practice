/*!
 * no320.ios JavaScript Library v0.1
 * http://no320.com/
 *
 * Copyright 2012, Alfred Sang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://no320.org/license
 *
 * Date: Sat June 20 22:33:48 2012 -0500
 */
(function( window, undefined ) {

	// Define a local copy of jQuery
    var doc = window.document;
    var disableBuilds = false;
    var disableNotes = false;

    var ctr = 0;
    var spaces = /\s+/, a1 = [''];

	// Map over jQuery in case of overwrite
	var _jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Use the correct document accordingly with window argument (sandbox)


	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,

	// Is it a simple selector
	isSimple = /^.[^:#\[\.,]*$/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,

	// Used for trimming whitespace
	rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,
	
	// Has the ready events already been bound?
	readyBound = false,
	
	// The functions to execute on DOM ready
	readyList = [],

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwnProperty = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	indexOf = Array.prototype.indexOf;

	var no320 = {
 
	 
			// The number of elements contained in the matched element set
			size: function() {
				return this.length;
			},

			toArray1: function() {
				return slice.call( this, 0 );
			},

			// Get the Nth element in the matched element set OR
			// Get the whole matched element set as a clean array
			get: function( num ) {
				return num == null ?

					// Return a 'clean' array
					this.toArray() :

					// Return just the object
					( num < 0 ? this.slice(num)[ 0 ] : this[ num ] );
			},

			// Take an array of elements and push it onto the stack
			// (returning the new matched element set)
	/*		pushStack: function( elems, name, selector ) {
					// Build a new jQuery matched element set
					var ret = jQuery();

					if ( this.isArray( elems ) ) {
						push.apply( ret, elems );

					} else {
						//jQuery.merge( ret, elems );
					}

					// Add the old object onto the stack (as a reference)
					ret.prevObject = this;

					ret.context = this.context;

					if ( name === "find" ) {
						ret.selector = this.selector + (this.selector ? " " : "") + selector;
					} else if ( name ) {
						ret.selector = this.selector + "." + name + "(" + selector + ")";
					}

					// Return the newly-formed element set
					return ret;
				},
	*/
			// Execute a callback for every element in the matched set.
			// (You can seed the arguments with an array of args, but this is
			// only used internally.)
			each: function( callback, args ) {
				return this.eacha( this, callback, args );
			},
			// args is for internal usage only
			eacha: function( object, callback, args ) {
				var name, i = 0,
					length = object.length,
					isObj = length === undefined || jQuery.isFunction(object);

				if ( args ) {
					if ( isObj ) {
						for ( name in object ) {
							if ( callback.apply( object[ name ], args ) === false ) {
								break;
							}
						}
					} else {
						for ( ; i < length; ) {
							if ( callback.apply( object[ i++ ], args ) === false ) {
								break;
							}
						}
					}

				// A special, fast, case for the most common use of each
				} else {
					if ( isObj ) {
						for ( name in object ) {
							if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
								break;
							}
						}
					} else {
						for ( var value = object[0];
							i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
					}
				}

				return object;
			},

			/*ready: function( fn ) {
							// Attach the listeners
							jQuery.bindReady();

							// If the DOM is already ready
							if ( jQuery.isReady ) {
								// Execute the function immediately
								fn.call( document, jQuery );

							// Otherwise, remember the function for later
							} else if ( readyList ) {
								// Add the function to the wait list
								readyList.push( fn );
							}

							return this;
						},*/

			eq: function( i ) {
				return i === -1 ?
					this.slice( i ) :
					this.slice( i, +i + 1 );
			},

			first: function() {
				return this.eq( 0 );
			},

			last: function() {
				return this.eq( -1 );
			},

			slice: function() {
				return this.pushStack( slice.apply( this, arguments ),
					"slice", slice.call(arguments).join(",") );
			},

			map: function( callback ) {
				return this.pushStack( this.map(this, function( elem, i ) {
					return callback.call( elem, i, elem );
				}));
			},

			end: function() {
				return this.prevObject || jQuery(null);
			},

			// For internal use only.
			// Behaves like an Array's method, not like a jQuery method.
			push: push,
			sort: [].sort,
			splice: [].splice

		,
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

/*		// Handle when the DOM is ready
		ready: function() {
			// Make sure that the DOM is not already loaded
			if ( !jQuery.isReady ) {
				// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
				if ( !document.body ) {
					return setTimeout( jQuery.ready, 13 );
				}

				// Remember that the DOM is ready
				jQuery.isReady = true;

				// If there are functions bound, to execute
				if ( readyList ) {
					// Execute all of them
					var fn, i = 0;
					while ( (fn = readyList[ i++ ]) ) {
						fn.call( document, jQuery );
					}

					// Reset the list of functions
					readyList = null;
				}

				// Trigger any bound ready events
				if ( jQuery.fn.triggerHandler ) {
					jQuery( document ).triggerHandler( "ready" );
				}
			}
		},*/

		bindReady: function() {
			if ( readyBound ) {
				return;
			}

			readyBound = true;

			// Catch cases where $(document).ready() is called after the
			// browser event has already occurred.
			if ( document.readyState === "complete" ) {
				return this.ready();
			}

			// Mozilla, Opera and webkit nightlies currently support this event
			if ( document.addEventListener ) {
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", jQuery.ready, false );

			// If IE event model is used
			} else if ( document.attachEvent ) {
				// ensure firing before onload,
				// maybe late but safe also for iframes
				document.attachEvent("onreadystatechange", DOMContentLoaded);

				// A fallback to window.onload, that will always work
				window.attachEvent( "onload", jQuery.ready );

				// If IE and not a frame
				// continually check to see if the document is ready
				var toplevel = false;

				try {
					toplevel = window.frameElement == null;
				} catch(e) {}

				if ( document.documentElement.doScroll && toplevel ) {
					doScrollCheck();
				}
			}
		},

		// See test/unit/core.js for details concerning isFunction.
		// Since version 1.3, DOM methods and functions like alert
		// aren't supported. They return false on IE (#2968).
		isFunction: function( obj ) {
			return toString.call(obj) === "[object Function]";
		},

		isArray: function( obj ) {
			return toString.call(obj) === "[object Array]";
		},

		isPlainObject: function( obj ) {
			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if ( !obj || toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval ) {
				return false;
			}

			// Not own constructor property must be Object
			if ( obj.constructor
				&& !hasOwnProperty.call(obj, "constructor")
				&& !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.

			var key;
			for ( key in obj ) {}

			return key === undefined || hasOwnProperty.call( obj, key );
		},

		isEmptyObject: function( obj ) {
			for ( var name in obj ) {
				return false;
			}
			return true;
		},

		error: function( msg ) {
			throw msg;
		},

		parseJSON: function( data ) {
			if ( typeof data !== "string" || !data ) {
				return null;
			}

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = this.trim( data );

			// Make sure the incoming data is actual JSON
			// Logic borrowed from http://json.org/json2.js
			if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
				.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
				.replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {

				// Try to use the native JSON parser first
				return window.JSON && window.JSON.parse ?
					window.JSON.parse( data ) :
					(new Function("return " + data))();

			} else {
				this.error( "Invalid JSON: " + data );
			}
		},

		noop: function() {},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
		},

		// args is for internal usage only
		each: function( object, callback, args ) {
			var name, i = 0,
				length = object.length,
				isObj = length === undefined || jQuery.isFunction(object);

			if ( args ) {
				if ( isObj ) {
					for ( name in object ) {
						if ( callback.apply( object[ name ], args ) === false ) {
							break;
						}
					}
				} else {
					for ( ; i < length; ) {
						if ( callback.apply( object[ i++ ], args ) === false ) {
							break;
						}
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				if ( isObj ) {
					for ( name in object ) {
						if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
							break;
						}
					}
				} else {
					for ( var value = object[0];
						i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
				}
			}

			return object;
		},

		trim: function( text ) {
			return (text || "").replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( array, results ) {
			var ret = results || [];

			if ( array != null ) {
				// The window, strings (and functions) also have 'length'
				// The extra typeof function check is to prevent crashes
				// in Safari 2 (See: #3039)
				if ( array.length == null || typeof array === "string" || this.isFunction(array) || (typeof array !== "function" && array.setInterval) ) {
					push.call( ret, array );
				} else {
					this.merge( ret, array );
				}
			}

			return ret;
		},

		inArray: function( elem, array ) {
			if ( array.indexOf ) {
				return array.indexOf( elem );
			}

			for ( var i = 0, length = array.length; i < length; i++ ) {
				if ( array[ i ] === elem ) {
					return i;
				}
			}

			return -1;
		},

		merge: function( first, second ) {
			var i = first.length, j = 0;

			if ( typeof second.length === "number" ) {
				for ( var l = second.length; j < l; j++ ) {
					first[ i++ ] = second[ j ];
				}

			} else {
				while ( second[j] !== undefined ) {
					first[ i++ ] = second[ j++ ];
				}
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, inv ) {
			var ret = [];

			// Go through the array, only saving the items
			// that pass the validator function
			for ( var i = 0, length = elems.length; i < length; i++ ) {
				if ( !inv !== !callback( elems[ i ], i ) ) {
					ret.push( elems[ i ] );
				}
			}

			return ret;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var ret = [], value;

			// Go through the array, translating each of the items to their
			// new value (or values).
			for ( var i = 0, length = elems.length; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

			return ret.concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,
		
		
		toArray:function(list) {
	        return Array.prototype.slice.call(list || [], 0);
	    },
	
   	    byId:function(id) {
	        if (typeof id == 'string') { return doc.getElementById(id); }
	        return id;
	    },
		html:function(){
			
		},
	    query : function(query, root) {
	        return this.queryAll(query, root)[0];
	    },

	    queryAll:function(query, root) {
	        if (!query) { return []; }
	        if (typeof query != 'string') { return this.toArray(query); }
	        if (typeof root == 'string') {
	            root = this.byId(root);
	            if(!root){ return []; }
	        }

	        root = root || document;
	        var rootIsDoc = (root.nodeType == 9);
	        var doc = rootIsDoc ? root : (root.ownerDocument || document);

	        // rewrite the query to be ID rooted
	        if (!rootIsDoc || ('>~+'.indexOf(query.charAt(0)) >= 0)) {
	            root.id = root.id || ('qUnique' + (ctr++));
	            query = '#' + root.id + ' ' + query;
	        }
	        // don't choke on something like ".yada.yada >"
	        if ('>~+'.indexOf(query.slice(-1)) >= 0) { query += ' *'; }
	        return this.toArray(doc.querySelectorAll(query));
	    },

	    strToArray:function(s) {
	        if (typeof s == 'string' || s instanceof String) {
	            if (s.indexOf(' ') < 0) {
	                a1[0] = s;
	                return a1;
	            } else {
	                return s.split(spaces);
	            }
	        }
	        return s;
	    },

	    // Needed for browsers that don't support String.trim() (e.g. iPad)
	    trim : function(str) {
	        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	    },

	    addClass : function(node, classStr) {
	        classStr = strToArray(classStr);
	        var cls = ' ' + node.className + ' ';
	        for (var i = 0, len = classStr.length, c; i < len; ++i) {
	            c = classStr[i];
	            if (c && cls.indexOf(' ' + c + ' ') < 0) {
	                cls += c + ' ';
	            }
	        }
	        node.className = trim(cls);
	    },

	    removeClass : function(node, classStr) {
	        var cls;
	        if (classStr !== undefined) {
	            classStr = strToArray(classStr);
	            cls = ' ' + node.className + ' ';
	            for (var i = 0, len = classStr.length; i < len; ++i) {
	                cls = cls.replace(' ' + classStr[i] + ' ', ' ');
	            }
	            cls = trim(cls);
	        } else {
	            cls = '';
	        }
	        if (node.className != cls) {
	            node.className = cls;
	        }
	    },

	    toggleClass:function(node, classStr) {
	        var cls = ' ' + node.className + ' ';
	        if (cls.indexOf(' ' + trim(classStr) + ' ') >= 0) {
	            removeClass(node, classStr);
	        } else {
	            addClass(node, classStr);
	        }
	    },


	    // modernizr lite via https://gist.github.com/598008
	    testStyle : function(style) {

	        var elem = document.createElement('div');
	        var prefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];
	        var bool;
	        var bump = function(all, letter) {
	            return letter.toUpperCase();
	        };
	        var prop;

	        bool = style in elem.style;
	        prop = style.replace(/^(.)/, bump).replace(/-([a-z])/ig, bump);

	        for (var len = prefixes.length; len--; ){
	            if (bool) {
	                break;
	            }
	            bool = prefixes[len] + prop in elem.style;
	        }

	        document.documentElement.className += ' ' + (bool ? '' : 'no-') + style.replace(/-/g, '');
	        return bool;
	    },

	    canTransition :function(){
			this.testStyle('transition')
		},

	    unescapeHTML:function(s) {
	        return s.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
	    },

	    escapeHTML : function(s) {
	        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	    },

	    // Resig's document.ready impl
	    addEvent:function( obj, type, fn ) {
	        if ( obj.attachEvent ) {
				//ie
	            obj['e'+type+fn] = fn;
	            obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
	            obj.attachEvent( 'on'+type, obj[type+fn] );
	        } else
	            obj.addEventListener( type, fn, false );
	    },
	    domReady:( function () {
	        function ready( f ) {
	            if( ready.done ) return f();

	            if( ready.timer ) {
	                ready.ready.push(f);
	            } else {
	                this.addEvent( window, "load", isDOMReady );
	                ready.ready = [ f ];
	                ready.timer = setInterval(isDOMReady, 13);
	            }
	        };

	        function isDOMReady() {
	            if( ready.done ) return false;

	            if( document && document.getElementsByTagName && document.getElementById && document.body ) {
	                clearInterval( ready.timer );
	                ready.timer = null;
	                for( var i = 0; i < ready.ready.length; i++ ) {
	                    ready.ready[i]();
	                }
	                ready.ready = null;
	                ready.done = true;
	            }
	        }

	        return ready;
	    })()

	}


	// Expose no320 to the global object
	window.no320 = window.$ = no320;
	window.ok = window.$$ = no320.domReady;

})(window);
