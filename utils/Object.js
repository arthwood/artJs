artjs.Object = artjs.utils.Object = {
  _name: 'Object',
  
  QUERY_DELIMITER: '&',

  toString: function() {
    return this._name;
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
    var delegate = artjs.$D(this, '_eachPairDeleteValue', obj, val);
    
    this.eachPair(obj, delegate.callback());
  },
  
  removeKeys: function(obj, keys) {
    var delegate = artjs.$D(this, '_eachKeyDeleteKey', obj);
    
    artjs.Array.each(keys, delegate.callback());
  },
  
  removeValues: function(obj, values) {
    var delegate = artjs.$D(this, '_invertedRemoveValue', obj);
    
    artjs.Array.eachItem(values, delegate.callback());
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
    var j;
    
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        j = obj[i];
        
        if (func.call(context, j, i)) {
          result[i] = j;
        }
      }
    }

    return result;
  },
  
  reject: function(obj, func, context) {
    var result = {};
    var j;
    
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        j = obj[i];
        
        if (!func.call(context, j)) {
          result[i] = j;
        }
      }
    }
    
    return result;
  },
  
  isArray: function(obj) {
    return this.is(obj, Array);
  },
  
  isString: function(obj) {
    return this.is(obj, String);
  },
  
  is: function(obj, type) {
    return obj.constructor === type;
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
  
  build: function(arr, func, context) {
    var result = {};
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        result[item] = func.call(context, item);
      }
    }
    
    return result;
  },
  
  fromPoints: function(arr) {
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
    var delegate = artjs.$D(this, '_invertedIncludes', obj);
    
    return this.all(subset, delegate.callback());
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
    var delegate = artjs.$D(this, '_pairToQueryString', prefix);
    
    return this.map(obj, delegate.callback()).join(this.QUERY_DELIMITER);
  },
  
  _pairToQueryString: function(key, value, prefix) {
    var result;
    
    prefix = artjs.String.isBlank(prefix) ? key : prefix + '[' + key + ']';
    
    if (typeof value == 'object') {
      if (isNaN(value.length)) {
        result = this._toQueryStringWithPrefix(value, prefix);
      }
      else {
        var delegate = artjs.$D(this, '_parseArrayValue', prefix + '[]');
        
        result = artjs.Array.map(value, delegate.callback()).join(this.QUERY_DELIMITER);
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
      this._deleteKey(obj, i);
    }
  },
  
  _eachKeyDeleteKey: function(i, idx, arr, obj) {
    this._deleteKey(obj, i);
  },
  
  _deleteKey: function(obj, i) {
    delete obj[i];
  },

  _invertedRemoveValue: function(val, arr, obj) {
    this.removeValue(obj, val);
  },
  
  isNull: function(i) {
    return i == null;
  },
  
  isPresent: function(i) {
    return !this.isNull(i);
  },
  
  getDefault: function(i, defaultValue) {
    return this.isNull(i) ? defaultValue : i;
  }
};
