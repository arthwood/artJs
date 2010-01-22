ArtJs.ObjectUtils = pl.arthwood.utils.ObjectUtils = {
  INJECTED_PROPS: ['copy', 'copyProps', 'removeValue', 'removeValues', 'map', 'mapKey', 'each', 'eachPair', 'select', 
    'selectWithKey', 'reject', 'empty', 'fromArray', 'toArray', 'toArrayWithCallback', 'includeAll', 'toQueryString'
  ],
  
  QUERY_DELIMITER: '&',
  
  init: function() {
    this.invertedRemoveValueDelegate = ArtJs.$DC(this, this.invertedRemoveValue);
    this.eachPairDeleteValueDelegate = ArtJs.$DC(this, this.eachPairDeleteValue);
    this.keyValueArrayDelegate = ArtJs.$DC(this, this.keyValueArray);
    this.objToQueryStringDelegate = ArtJs.$D(this, this.objToQueryString);
    this.injected = false;
  },
  
  ownProperty: function(property) {
    return !this.injected || !ArtJs.ArrayUtils.include(this.INJECTED_PROPS, property);
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
      if (this.ownProperty(i)) {
        result[i] = func(obj[i]);
      }
    }

    return result;
  },

  mapKey: function(obj, func) {
    var result = new Object();

    for (var i in obj) {
      if (this.ownProperty(i)) {
        result[func(i)] = obj[i];
      }
    }

    return result;
  },

  each: function(obj, func) {
    for (var i in obj) {
      if (this.ownProperty(i)) {
        func(obj[i]);
      }
    }
  },

  eachKey: function(obj, func) {
    for (var i in obj) {
      if (this.ownProperty(i)) {
        func(i);
      }
    }
  },

  eachPair: function(obj, func) {
    for (var i in obj) {
      if (this.ownProperty(i)) {
        func(i, obj[i]);
      }
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
      if (this.ownProperty(i)) {
        return false;
      }
    }

    return true;
  },

  fromArray: function(arr) {
    var result = new Object();
    var item;

    for (var i in arr) {
      if (ArtJs.ArrayUtils.ownProperty(i)) {
        item = arr[i];
        result[item[0]] = item[1];
      }
    }

    return result;
  },

  toArray: function(obj) {
    return this.toArrayWithCallback(obj, this.keyValueArrayDelegate);
  },
  
  keyValueArray: function(key, value) {
    return [key, value];
  },
  
  toArrayWithCallback: function(obj, func) {
    var result = new Array();
    
    for (var i in obj) {
      if (this.ownProperty(i)) {
        result.push(func(i, obj[i]));
      }
    }

    return result;
  },

  includeAll: function(obj, subset) {
    for (var i in subset) {
      if (this.ownProperty(i) && subset[i] != obj[i]) {
        return false;
      }
    }

    return true;
  },
  
  toQueryString: function(obj) {
    // {points: [{x: 3, y: 7}, {x: 8, y: -2}, value: 8, options: {max: 9}]}
    // points[][x]=3&points[][y]=7&points[][x]=8&points[][y]=-2&value=8&options[max]=9
    switch (typeof obj) {
      case 'Number':
        return obj.toString();
        break;
      case 'Array':
        break;
      case 'Object':
        return this.toQueryString(obj, '');
      default:
        return obj;
    }
  },
  
  toQueryString: function(obj, prefix) {
    this.objToQueryStringDelegate.delegate.args = [prefix];
    
    return this.toArrayWithCallback(obj, this.objToQueryStringDelegate).join(this.QUERY_DELIMITER);
  },
  
  objToQueryString: function(key, value, prefix) {
    return prefix + '[' + key + ']=' + this.toQueryString(value);
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
    proto.toArrayWithCallback = dc(this, this.toArrayWithCallback, true);
    proto.includeAll = dc(this, this.includeAll, true);
    proto.toQueryString = dc(this, this.toQueryString, true);
    
    this.injected = true;
  }
};
