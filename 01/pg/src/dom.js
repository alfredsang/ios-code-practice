define("no320/dom", function(require, exports, module) {
    /**
     * Creates a domready event function used to callback when page onload
     *
     * @private
     */
    
/**
 * id  tag 
 * each
 */ 
	var dom = {
		selector:""
	}
	
/*	dom.prototype.html = function(){
		
	}*/

	module.exports ={
		byId:function(id) {
	        if (typeof id == 'string') { return doc.getElementById(id); }
	        return id;
	    },
		html:function(){
			
		},
	    query : function(query, root) {
		    (root !== undefined) ? document : root;
	        return this.queryAll(query, root)[0];
	    },

	    queryAll:function(query, root) {
	        if (!query) { 
				return []; 
			}
			
	        if (typeof query != 'string') { 
				return this.toArray(query); 
			}
			
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
		toArray:function(list) {
	        return Array.prototype.slice.call(list || [], 0);
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
	    }
	
	};

});
