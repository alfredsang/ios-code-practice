define("no320/event", function(require, exports, module) {
    /**
     * Creates a domready event function used to callback when page onload
     *
     * @private
     */
 

	module.exports ={
		on : function( obj, type, fn ) {
	         obj.addEventListener( type, fn, false );
	    }
	};

});
