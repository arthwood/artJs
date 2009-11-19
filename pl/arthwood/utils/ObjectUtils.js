var ObjectUtils = pl.arthwood.utils.ObjectUtils = {
	copy: function(obj_) {
		var vCopy = new Object();

		this.copyProps(obj_, vCopy);
    
		return vCopy;
	},
  
	copyProps: function(from_, to_) {
		for (var i in from_) {
			to_[i] = from_[i];
		}
	},

	removeValue: function(obj_, val_) {
		this.eachPair(obj_, function(i_, j_) {
			if (j_ === val_) {
				delete obj_[i_];
			}
		});
	},

	removeValues: function(obj_, vals_) {
		ArrayUtils.each(vals_, function(i_) {
			ObjectUtils.removeValue(obj_, i_);
		});
	},

  map: function(obj_, func_) {
    var vResult = new Object();

		for (var i in obj_) {
			vResult[i] = func_(obj_[i]);
		}

		return vResult;
	},

	mapKey: function(obj_, func_) {
		var vResult = new Object();

		for (var i in obj_) {
			vResult[func_(i)] = obj_[i];
		}

		return vResult;
	},

	each: function(obj_, func_) {
		for (var i in obj_) {
			func_(obj_[i]);
		}
	},

	eachKey: function(obj_, func_) {
		for (var i in obj_) {
			func_(i);
		}
	},

	eachPair: function(obj_, func_) {
		for (var i in obj_) {
			func_(i, obj_[i]);
		}
	},

	select: function(obj_, func_) {
		var vResult = new Object();

		this.eachPair(obj_, function(i_, j_) {
			if (func_(j_)) {
				vResult[i_] = j_;
			}
		});

		return vResult;
	},

	selectWithKey: function(obj_, func_) {
		var vResult = new Object();

		this.eachPair(obj_, function(i_, j_) {
			if (func_(i_, j_)) {
				vResult[i_] = j_;
			}
		});

		return vResult;
	},

	reject: function(obj_, func_) {
		var vResult = new Object();

		this.eachPair(obj_, function(i_, j_) {
			if (!func_(j_)) {
				vResult[i_] = j_;
			}
		});

		return vResult;
	},

	isEmpty: function(obj_) {
		for (var i in obj_) {
			return false;
		}
    
		return true;
	}
};
