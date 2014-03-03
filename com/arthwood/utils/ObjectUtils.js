ArtJs.ObjectUtils = com.arthwood.utils.Object = {
  QUERY_DELIMITER: '&',
  
  init: function() {
    this._invertedRemoveValueDC = ArtJs.$DC(this, this._invertedRemoveValue);
    this._eachPairDeleteValueDC = ArtJs.$DC(this, this._eachPairDeleteValue);
    this._invertedIncludesDC = ArtJs.$DC(this, this._invertedIncludes);
    this._pairToQueryStringDC = ArtJs.$DC(this, this._pairToQueryString);
    this._parseArrayValueDC = ArtJs.$DC(this, this._parseArrayValue);
  },
  
  copy: function(obj) {
    var copy = {};

    this.copyProps(obj, copy);

    return copy;
  },
  
  copyProps: function(source, target) {
    for (var i in source) {
      if (source.hasOwnProperty(i)) {
        target[i] = source[i];
      }
    }
  },
  
  extend: function(target, source) {
    this.copyProps(source, target);
  },
  
  merge: function(target, source) {
    this.extend(target, source);
    
    return target;
  },

  update: function(target, source) {
    return this.merge(target, source);
  },

  removeValue: function(obj, val) {
    this._eachPairDeleteValueDC.delegate.args = [obj, val];
    
    this.eachPair(obj, this._eachPairDeleteValueDC);
  },
  
  removeValues: function(obj, values) {
    this._invertedRemoveValueDC.delegate.args = [obj];
    
    ArtJs.ArrayUtils.eachItem(values, this._invertedRemoveValueDC);
  },

  keys: function(obj) {
    var result = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result.push(i);
      }
    }

    return result;
  },

  values: function(obj) {
    var result = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result.push(obj[i]);
      }
    }

    return result;
  },
  
  map: function(obj, func, context) {
    var result = [];
    
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result.push(func.call(context, i, obj[i]));
      }
    }
    
    return result;
  },
  
  mapValue: function(obj, func, context) {
    var result = {};
    
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[i] = func.call(context, obj[i]);
      }
    }
    
    return result;
  },
  
  mapKey: function(obj, func, context) {
    var result = {};
    
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[func.call(context, i)] = obj[i];
      }
    }
    
    return result;
  },
  
  each: function(obj, func, context) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        func.call(context, obj[i]);
      }
    }
  },
  
  eachKey: function(obj, func, context) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        func.call(context, i);
      }
    }
  },
  
  eachPair: function(obj, func, context) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        func.call(context, i, obj[i]);
      }
    }
  },
  
  select: function(obj, func, context) {
    var result = {};
    
    this.eachPair(obj, function(i, j) {
      if (func.call(context, j)) {
        result[i] = j;
      }
    });
    
    return result;
  },
  
  selectWithKey: function(obj, func, context) {
    var result = {};

    this.eachPair(obj, function(i, j) {
      if (func.call(context, i, j)) {
        result[i] = j;
      }
    });

    return result;
  },
  
  reject: function(obj, func, context) {
    var result = {};

    this.eachPair(obj, function(i, j) {
      if (!func.call(context, j)) {
        result[i] = j;
      }
    });
    
    return result;
  },

  isArray: function(obj) {
    return typeof obj === 'object' && typeof obj.length === 'number';
  },
  
  isEmpty: function(obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    
    return true;
  },
  
  isNotEmpty: function(obj) {
    return !this.isEmpty(obj);
  },

  build: function(arr) {
    var result = {};
    var item;

    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        result[item.x] = item.y;
      }
    }

    return result;
  },
  
  fromArray: function(arr) {
    var result = {};
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        result[item[0]] = item[1];
      }
    }
    
    return result;
  },
  
  toArray: function(obj) {
    return this.map(obj, this._keyValueArray, this);
  },
  
  includes: function(obj, item) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i) && obj[i] === item) {
        return true;
      }
    }
    
    return false;
  },
  
  includesAll: function(obj, subset) {
    this._invertedIncludesDC.delegate.args = [obj];
    
    return this.all(subset, this._invertedIncludesDC);
  },
  
  all: function(obj, func) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i) && !func(obj[i])) {
        return false;
      }
    }
    
    return true;
  },
  
  toQueryString: function(obj) {
    return this._toQueryStringWithPrefix(obj, '');
  },
  
  _toQueryStringWithPrefix: function(obj, prefix) {
    this._pairToQueryStringDC.delegate.args = [prefix];
    
    return this.map(obj, this._pairToQueryStringDC).join(this.QUERY_DELIMITER);
  },
  
  _pairToQueryString: function(key, value, prefix) {
    var result;
    
    prefix = ArtJs.StringUtils.isBlank(prefix) ? key : prefix + '[' + key + ']';
    
    if (typeof value == 'object') {
      if (isNaN(value.length)) {
        result = this._toQueryStringWithPrefix(value, prefix);
      }
      else {
        this._parseArrayValueDC.delegate.args = [prefix + '[]'];
        
        result = ArtJs.ArrayUtils.map(value, this._parseArrayValueDC).join(this.QUERY_DELIMITER);
      }
    }
    else {
      result = prefix + '=' + encodeURIComponent(this._primitiveToQueryString(value));
    }
    
    return result;
  },
  
  _parseArrayValue: function(value, idx, prefix) {
    return this._pairToQueryString(prefix, value);
  },
  
  _primitiveToQueryString: function(obj) {
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

  _invertedIncludes: function(item, obj) {
    return this.includes(obj, item);
  },

  _keyValueArray: function(key, value) {
    return [key, value];
  },

  _eachPairDeleteValue: function(i, j, obj, val) {
    if (j === val) {
      delete obj[i];
    }
  },

  _invertedRemoveValue: function(val, obj) {
    this.removeValue(obj, val);
  },

  doInjection: function() {
    var proto = Object.prototype;
    var dc = ArtJs.$DC;

    proto.all = dc(this, this.all, true);
    proto.copy = dc(this, this.copy, true);
    proto.copyProps = dc(this, this.copyProps, true);
    proto.each = dc(this, this.each, true);
    proto.eachPair = dc(this, this.eachPair, true);
    proto.extend = dc(this, this.extend, true);
    proto.keys = dc(this, this.keys, true);
    proto.values = dc(this, this.values, true);
    proto.includes = dc(this, this.includes, true);
    proto.includesAll = dc(this, this.includesAll, true);
    proto.isArray = dc(this, this.isArray, true);
    proto.isEmpty = dc(this, this.isEmpty, true);
    proto.isNotEmpty = dc(this, this.isNotEmpty, true);
    proto.map = dc(this, this.map, true);
    proto.mapKey = dc(this, this.mapKey, true);
    proto.mapValue = dc(this, this.mapValue, true);
    proto.merge = dc(this, this.merge, true);
    proto.removeValue = dc(this, this.removeValue, true);
    proto.removeValues = dc(this, this.removeValues, true);
    proto.reject = dc(this, this.reject, true);
    proto.select = dc(this, this.select, true);
    proto.selectWithKey = dc(this, this.selectWithKey, true);
    proto.toArray = dc(this, this.toArray, true);
    proto.toQueryString = dc(this, this.toQueryString, true);
    proto.update = dc(this, this.update, true);
  }
};
