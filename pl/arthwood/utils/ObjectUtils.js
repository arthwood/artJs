ArtJs.ObjectUtils = pl.arthwood.utils.ObjectUtils = {
  INJECTED_PROPS: ['copy', 'copyProps', 'removeValue', 'removeValues', 'map', 'mapKey', 'mapValue', 'each', 'eachPair', 
    'select', 'selectWithKey', 'reject', 'empty', 'fromArray', 'toArray', 'includeAll', 'toQueryString', 'inspect'
  ],
  
  QUERY_DELIMITER: '&',
  
  init: function() {
    this.invertedRemoveValueDelegate = ArtJs.$DC(this, this.invertedRemoveValue);
    this.eachPairDeleteValueDelegate = ArtJs.$DC(this, this.eachPairDeleteValue);
    this.keyValueArrayDelegate = ArtJs.$DC(this, this.keyValueArray);
    this.pairToQueryStringDelegate = ArtJs.$DC(this, this.pairToQueryString);
    this.parseArrayValueDelegate = ArtJs.$DC(this, this.parseArrayValue);
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
    var result = new Array();
    
    for (var i in obj) {
      if (this.ownProperty(i)) {
        result.push(func(i, obj[i]));
      }
    }

    return result;
  },
  
  mapValue: function(obj, func) {
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
    return this.map(obj, this.keyValueArrayDelegate);
  },
  
  keyValueArray: function(key, value) {
    return [key, value];
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
    return this.toQueryStringWithPrefix(obj, '');
  },
  
  toQueryStringWithPrefix: function(obj, prefix) {
    var delegate = ArtJs.$DC(this, this.pairToQueryString, false, prefix);
    
    return this.map(obj, delegate).join(this.QUERY_DELIMITER);
  },
  
  pairToQueryString: function(key, value, prefix) {
    var result;
    
    prefix = ArtJs.StringUtils.empty(prefix) ? key : prefix + '[' + key + ']';
    
    if (typeof value == 'object') {
      if (isNaN(value.length)) {
        result = this.toQueryStringWithPrefix(value, prefix)
      }
      else {
        var delegate = ArtJs.$DC(this, this.parseArrayValue, false, prefix + '[]');
        
        result = ArtJs.ArrayUtils.map(value, delegate).join(this.QUERY_DELIMITER)
      }
    }
    else {
      result = prefix + '=' + encodeURIComponent(this.primitiveToQueryString(value));
    }
    
    return result;
  },
  
  parseArrayValue: function(value, idx, prefix) {
    return this.toQueryStringWithPrefix(value, prefix);
  },
  
  primitiveToQueryString: function(obj) {
    var result;
    
    switch (typeof obj) {
      case 'number':
        result = obj.toString();
        break;
      case 'boolean':
        result = Number(obj).toString();
        break;
      default:
        result = obj;
    }
    
    return result;
  },
  
  inspect: function(obj, indent, prop) {
    var str = (this.getMultiPattern('|   ', indent) + (prop || (obj ? 'Object' : 'Null')));
  
    for (var i in obj) {
      str += (typeof(obj[i]) == 'object')
        ? arguments.callee(obj[i], indent + 1, i)
        : (this.getMultiPattern('|   ', indent + 1) + i + ' = ' + obj[i]);
    }
  
    return str;
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
    proto.mapValue = dc(this, this.mapValue, true);
    proto.each = dc(this, this.each, true);
    proto.eachPair = dc(this, this.eachPair, true);
    proto.select = dc(this, this.select, true);
    proto.selectWithKey = dc(this, this.selectWithKey, true);
    proto.reject = dc(this, this.reject, true);
    proto.empty = dc(this, this.empty, true);
    proto.fromArray = dc(this, this.toArray, false);
    proto.toArray = dc(this, this.toArray, true);
    proto.includeAll = dc(this, this.includeAll, true);
    proto.toQueryString = dc(this, this.toQueryString, true);
    proto.inspect = dc(this, this.objectToString, true);
    
    this.injected = true;
  }
};
