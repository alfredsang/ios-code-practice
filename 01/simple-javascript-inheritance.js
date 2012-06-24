Home Blog About Me John Resig
Contact, Subscribe

Simple JavaScript Inheritance

I've been doing a lot of work, lately, with JavaScript inheritance - namely for my work-in-progress JavaScript book 
- and in doing so have examined a number of different JavaScript classical-inheritance-simulating techniques. 
Out of all the ones that I've looked at I think my favorites were the implementations employed by base2 and Prototype.

I wanted to go about extracting the soul of these techniques into a simple, re-usable,
 form that could be easily understood and didn't have any dependencies. 
Additionally I wanted the result to be simple and highly usable.
 Here's an example of what you can do with it:

var Person = Class.extend({
  init: function(isDancing){
    this.dancing = isDancing;
  },
  dance: function(){
    return this.dancing;
  }
});
var Ninja = Person.extend({
  init: function(){
    this._super( false );
  },
  dance: function(){
    // Call the inherited version of dance()
    return this._super();
  },
  swingSword: function(){
    return true;
  }
});

var p = new Person(true);
p.dance(); // => true

var n = new Ninja();
n.dance(); // => false
n.swingSword(); // => true

// Should all be true
p instanceof Person && p instanceof Class &&
n instanceof Ninja && n instanceof Person && n instanceof Class

A couple things to note about this implementation:

Creating a constructor had to be simple (in this case simply providing an init method does the trick).
In order to create a new 'class' you must extend (sub-class) an existing class.
All of the 'classes' inherit from a single ancestor: Class. Therefore if you want to create a brand new class it must be a sub-class of Class.
And the most challenging one: Access to overridden methods had to be provided (with their context properly set). You can see this with the use of this._super(), above, calling the original init() and dance() methods of the Person super-class.
I'm pleased with the result: It helps to enforce the notion of 'classes' as a structure, maintains simple inheritance, and allows for the super method calling.

Simple Class Creation and Inheritance

And here's the implementation (reasonably sized and commented well) - clocking in at around 25 lines. Feedback is welcome and appreciated.

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();

In my opinion the two trickiest parts are the "initializing/don't call init" and "create _super method" portions. I want to cover those briefly so that you will have a good understanding of what's being achieved in this method.

Initialization

In order to simulate inheritance with a function prototype we use the traditional technique of creating an instance of the super-class function and assigning it to the prototype. Without using the above it would look something like this:

function Person(){}
function Ninja(){}
Ninja.prototype = new Person();
// Allows for instanceof to work:
(new Ninja()) instanceof Person
What's challenging about this, though, is that all we really want is the benefits of 'instanceof', not the whole cost of instantiating a Person object and running its constructor. To counteract this we have a variable in our code, initializing, that is set to true whenever we want to instantiate a class with the sole purpose of using it for a prototype.

Thus when it comes time to actually construct the function we make sure that we're not in an initialization mode and run the init method accordingly:

if ( !initializing )
  this.init.apply(this, arguments);
What's especially important about this is that the init method could be running all sorts of costly startup code (connecting to a server, creating DOM elements, who knows) so circumventing this ends up working quite well.

Super Method

When you're doing inheritance, creating a class that inherits functionality from a super-class, a frequent desire is the ability to access a method that you've overridden. The final result, in this particular implementation, is a new temporary method (._super) which is only accessible from within a sub-classes' method, referencing the super-classes' associated method.

For example, if you wanted to call a super-classes' constructor you could do that with this technique.

var Person = Class.extend({
  init: function(isDancing){
    this.dancing = isDancing;
  }
});
var Ninja = Person.extend({
  init: function(){
    this._super( false );
  }
});

var p = new Person(true);
p.dancing; // => true

var n = new Ninja();
n.dancing; // => false 
 

Implementing this functionality is a multi-step process. To start, note the object literal that we're using to extend an existing class (such as the one being passed in to Person.extend) needs to be merged on to the base new Person instance (the construction of which was described previously). During this merge we do a simple check: Is the property that we're attempting merge a function and is what we're replacing also a function? If that's the case then we need to go about creating a way for our super method to work.

Note that we create an anonymous closure (which returns a function) that will encapsulate the new super-enhanced method. To start we need to be a good citizen and save a reference to the old this._super (disregarding if it actually exists) and restore it after we're done. This will help for the case where a variable with the same name already exists (don't want to accidentally blow it away).

Next we create the new _super method, which is just a reference to the method that exists on the super-class' prototype. Thankfully we don't have to make any additional changes, or re-scoping, here as the context of the function will be set automatically when it's a property of our object (this will refer to our instance as opposed to the super-class').

Finally we call our original method, it does its work (possibly making use of _super as well) after which we restore _super to its original state and return from the function.

Now there's a number of ways in which a similar result, to the above, could be achieved (I've seen implementations that have bound the super method to the method itself, accessible from arguments.callee) but I feel that this technique provides the best mix of usability and simplicity.

I'll be covering a lot more of the nitty-gritty behind the JavaScript prototype system in my completed work but I just wanted to get this Class implementation out there to get everyone trying it out and playing with it. I think there's a lot to be said for simplistic code (easier to learn, easier to extend, less to download) so I think this implementation is a good place to start and learn the fundamentals of JavaScript class construction and inheritance.

This topic will be discussed, in depth, in my work-in-progress book: Secrets of the JavaScript Ninja. To be released Fall 2008.
Posted: March 20th, 2008	 · 490 ♻ Retweet

61 Comments	 (Show Comments)
