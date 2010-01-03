ArtJs.ObjectUtils = pl.arthwood.utils.ObjectUtils = {
  init: function() {
    this.invertedRemoveValueDelegate = ArtJs.$DC(this, this.invertedRemoveValue);
    this.eachPairDeleteValueDelegate = ArtJs.$DC(this, this.eachPairDeleteValue);
  },

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
    this.eachPairDeleteValueDelegate.delegate.args = [obj, val];

    this.eachPair(obj, this.eachPairDeleteValueDelegate);
  },

  eachPairDeleteValue: function(i, j, obj, val) {
    if (j === val) {
      delete obj[i];
    }
  },

  invertedRemoveValue: function(val, obj) {
    this.removeValue(obj, val);
  },

  removeValues: function(obj, values) {
    this.invertedRemoveValueDelegate.delegate.args = [obj];

    ArtJs.ArrayUtils.each(values, this.invertedRemoveValueDelegate);
  },

  map: function(obj, func) {
    var result = new Object();

    for (var i in obj) {
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

  empty: function(obj) {
    for (var i in obj) {
      return false;
    }

    return true;
  },

  fromArray: function(arr) {
    var result = new Object();
    var item;

    for (var i in arr) {
      item = arr[i];
      result[item[0]] = item[1];
    }

    return result;
  },

  toArray: function(obj) {
    var result = new Array();

    for (var i in obj) {
      result.push([i, obj[i]]);
    }

    return result;
  },

  includeAll: function(obj, subset) {
    for (var i in subset) {
      if (subset[i] != obj[i]) {
        return false;
      }
    }

    return true;
  },

  doInjection: function() {
    var proto = Object.prototype;
    var dc = ArtJs.$DC;
    
    proto.copy = dc(this, this.copy, true);
    proto.copyProps = dc(this, this.copyProps, true);
    proto.removeValue = dc(this, this.removeValue, true);
    proto.removeValues = dc(this, this.removeValues, true);
    proto.map = dc(this, this.map, true);
    proto.mapKey = dc(this, this.mapKey, true);
    proto.each = dc(this, this.each, true);
    proto.eachPair = dc(this, this.eachPair, true);
    proto.select = dc(this, this.select, true);
    proto.selectWithKey = dc(this, this.selectWithKey, true);
    proto.reject = dc(this, this.reject, true);
    proto.empty = dc(this, this.empty, true);
    proto.fromArray = dc(this, this.toArray, false);
    proto.toArray = dc(this, this.toArray, true);
    proto.includeAll = dc(this, this.includeAll, true);
  }
};
