var ObjectUtils = pl.arthwood.utils.ObjectUtils = {
	copy: function(obj) {
		var copy = new Object();

		this.copyProps(obj, copy);
    
		return copy;
	},
  
	copyProps: function(from, to) {
		for (var i in from) {
			to[i] = from[i];
		}
	},

	removeValue: function(obj, val) {
		this.eachPair(obj, function(i, j) {
			if (j === val) {
				delete obj[i];
			}
		});
	},

	removeValues: function(obj, values) {
		ArrayUtils.each(values, function(i) {
			ObjectUtils.removeValue(obj, i);
		});
	},

  map: function(obj, func) {
    var result = new Object();

		for (var i in obj_) {
			result[i] = func(obj[i]);
		}

		return result;
	},

	mapKey: function(obj, func) {
		var result = new Object();

		for (var i in obj) {
			result[func(i)] = obj[i];
		}

		return result;
	},

	each: function(obj, func) {
		for (var i in obj) {
			func(obj[i]);
		}
	},

	eachKey: function(obj, func) {
		for (var i in obj) {
			func(i);
		}
	},

	eachPair: function(obj, func) {
		for (var i in obj) {
			func(i, obj[i]);
		}
	},

	select: function(obj, func) {
		var result = new Object();

		this.eachPair(obj, function(i, j) {
			if (func(j)) {
				result[i] = j;
			}
		});

		return result;
	},

	selectWithKey: function(obj, func) {
		var result = new Object();

		this.eachPair(obj, function(i, j) {
			if (func(i, j)) {
				result[i] = j;
			}
		});

		return result;
	},

	reject: function(obj, func) {
		var result = new Object();

		this.eachPair(obj, function(i, j) {
			if (!func(j)) {
				result[i] = j;
			}
		});

		return result;
	},

	isEmpty: function(obj) {
		for (var i in obj) {
			return false;
		}
    
		return true;
	},

  toArray: function(obj) {
    var result = new Array();

    for (var i in obj) {
			result.push([i, obj[i]]);
		}

    return result;
  }
};
