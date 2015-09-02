var artjs = {
  VERSION: '0.4.2',

  component: {
    utils: {}
  },
  data: {},
  dom: {},
  events: {},
  math: {},
  model: {},
  net: {},
  spec: {
    matcher: {},
    node: {},
    runner: {},
    view: {}
  },
  template: {},
  transition: {},
  ui: {},
  utils: {},
  view: {}
};
artjs.log = function() {
  if (typeof console === "object") {
    console.log.apply(console, arguments);
  }
};

artjs.p = artjs.log;
artjs.Array = artjs.utils.Array = {
  _name: 'Array',
  
  all: function(arr, func, context) {
    var test = func || this.identity;
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        if (!test.call(context || this, item, parseInt(i, 10), arr)) {
          return false;
        }
      }
    }
    
    return true;
  },
  
  any: function (arr, func, context) {
    var test = func || this.identity;
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        if (test.call(context || this, item, parseInt(i, 10), arr)) {
          return true;
        }
      }
    }
    
    return false;
  },
  
  areItemsEqual: function(i, idx, arr, func, context) {
    return this.uniq(i, func, context).length == 1;
  },
  
  arrify: function(v, idx) {
    var args = [];
    var n = v.length;

    for (var i = idx || 0; i < n; i++) {
      args.push(v[i]);
    }

    return args;
  },
  
  beforeLast: function(arr) {
    return this.getItemAt(arr, arr.length - 2);
  },
  
  build: function(n, func, context) {
    var arr = new Array(n);
    
    for (var i = 0; i < n; i++) {
      arr[i] = func.call(context, i, arr);
    }
    
    return arr;
  },
  
  clone: function(arr) {
    return arr.concat();
  },
  
  compact: function(arr) {
    return this.reject(arr, artjs.Object.isNull, this);
  },
  
  detect: function(arr, func, context) {
    var test = func || this.identity;
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        if (test.call(context || this, item, parseInt(i, 10), arr)) {
          return item;
        }
      }
    }
    
    return null;
  },
  
  each: function(arr, func, context) {
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        func.call(context, item, parseInt(i, 10), arr);
      }
    }
  },

  eachIndex: function(arr, func, context) {
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        func.call(context, parseInt(i, 10), arr);
      }
    }
  },
  
  eachItem: function(arr, func, context) {
    var item;

    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];

        func.call(context, item, arr);
      }
    }
  },
  
  equal: function(arr, func, context) {
    var delegate = artjs.$D(this, 'areItemsEqual', func, context);
    
    return this.all(this.transpose(arr), delegate.callback(), this);
  },
  
  fromRange: function(point) {
    var n = point.y - point.x;
    var result = new Array(n);
    
    for (var i = 0; i < n; i++) {
      result[i] = point.x + i;
    }
    
    return result;
  },
  
  first: function(arr) {
    return this.getItemAt(arr, 0);
  },
  
  flatten: function(arr) {
    return this.inject(arr, [], this._flatten, this);
  },
  
  getItemAt: function(arr, i) {
    return arr[i];
  },
  
  groupBy: function(arr, func, context, keepOrder) {
    var test = func || this.identity;
    var result = [];
    var values = {};
    var group;
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        group = String(test.call(context || this, item, parseInt(i, 10)));
        
        if (values[group] == undefined) {
          result.push(new artjs.Point(group, values[group] = []));
        }
        
        values[group].push(item);
      }
    }
    
    if (!keepOrder) {
      result = artjs.Object.fromPoints(result);
    }
    
    return result;
  },
  
  identity: function(i) {
    return i;
  },
  
  includesInv: function(item, arr) {
    return this.includes(arr, item);
  },

  includes: function(arr, item) {
    return Boolean(this.indexOf(arr, item) + 1);
  },
  
  includesAll: function(arr, subset) {
    this._includesAll.arr = arr;
    
    return this.all(subset, this._includesAll);
  },
  
  indexOf: function(arr, item) {
    return arr.indexOf ? arr.indexOf(item) : this._indexOf(arr, item);
  },
  
  inject: function(arr, init, func, context) {
    var result = init;
    var mem;
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];

        mem = func.call(context, result, item, parseInt(i, 10), arr);
        
        if (mem) {
          result = mem;
        }
      }
    }
    
    return result;
  },
  
  insertAt: function(arr, idx, insertion) {
    return arr.slice(0, idx).concat(insertion).concat(arr.slice(idx));
  },
  
  intersection: function(arr) {
    this._intersectionSelect.array = arr.slice(1);
    
    return this.select(arr[0], this._intersectionSelect, this);
  },
  
  invoke: function(arr, meth) {
    var delegate = artjs.$D(this, '_invoke', meth, this.arrify(arguments, 2));
    
    return this.map(arr, delegate.callback());
  },
  
  isEmpty: function(arr) {
    return arr.length == 0;
  },

  isNotEmpty: function(arr) {
    return !this.isEmpty(arr);
  },
  
  last: function(arr) {
    return this.getItemAt(arr, arr.length - 1);
  },
  
  map: function(arr, func, context) {
    var result = [];
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        result.push(func.call(context, item, parseInt(i, 10), arr));
      }
    }

    return result;
  },
  
  numerize: function(arr) {
    return this.map(arr, this._numerize);
  },
  
  partition: function(arr, func, context) {
    var point = new artjs.Point([], []);
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        (func.call(context, item, i, arr) ? point.x : point.y).push(item);
      }
    }
    
    return point;
  },
  
  pluck: function(arr, prop) {
    this._pluck.prop = prop;
    
    return this.map(arr, this._pluck, this);
  },
  
  print: function(arr) {
    this.eachItem(arr, this._print, this);
  },
  
  reject: function(arr, func, context) {
    var result = [];
    var test = func || this.identity;
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        if (!test.call(context, item, parseInt(i, 10), arr)) {
          result.push(item);
        }
      }
    }
    
    return result;
  },
  
  $reject: function(arr, func, context) {
    var n = arr.length - 1;
    var test = func || this.identity;
    var item;
    var result = [];
    
    for (var i = n; i >= 0; i--) {
      item = arr[i];
      
      if (test.call(context || this, item, parseInt(i, 10), arr)) {
        result.push(this.removeAt(arr, i));
      }
    }
    
    return result;
  },
  
  removeAt: function(arr, idx) {
    return this.first(arr.splice(idx, 1));
  },

  removeItem: function(arr, item, onlyFirst) {
    var result = [];
    var n = arr.length;

    while (n-- > 0) {
      if (arr[n] === item) {
        result.push(n);
        this.removeAt(arr, n);
        
        if (onlyFirst) { break; }
      }
    }
    
    return result.reverse();
  },
  
  removeItems: function(arr, items) {
    this._contains.items = items;
    
    return this.reject(arr, this._contains, this);
  },
  
  $removeItems: function(arr, items) {
    this._contains.items = items;
    
    return this.$reject(arr, this._contains, this);
  },
  
  second: function(arr) {
    return this.getItemAt(arr, 1);
  },
  
  select: function(arr, func, context) {
    var result = [];
    var test = func || this.identity;
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        if (test.call(context, item, parseInt(i, 10), arr)) { 
          result.push(item); 
        }
      }
    }
    
    return result;
  },
  
  $select: function(arr, func, context) {
    var n = arr.length - 1;
    var test = func || this.identity;
    var item;
    
    for (var i = n; i >= 0; i--) {
      item = arr[i];
      
      if (!test.call(context || this, item, parseInt(i, 10), arr)) { 
        this.removeAt(arr, i);
      }
    }
  },
  
  selectNonEmpty: function(arr) {
    return this.select(arr, this.isNotEmpty, this);
  },
  
  sum: function(arr) {
    return Number(this.inject(arr, 0, this._sum, this));
  },
  
  stringify: function(arr) {
    return this.map(arr, this._stringify, this);
  },
  
  third: function(arr) {
    return this.getItemAt(arr, 2);
  },
  
  toString: function() {
    return this._name;
  },
  
  transpose: function(arr) {
    var result = [];
    var n = arr.length;
    var m = Math.max.apply(Math, this.pluck(arr, 'length'));
    
    for (var i = 0; i < m; i++) {
      result[i] = [];
      for (var j = 0; j < n; j++) {
        result[i][j] = arr[j][i];
      }
    }
    
    return result;
  },
  
  uniq: function(arr, func, context) {
    var groups = this.groupBy(arr, func, context, true);
    
    return this.map(this.pluck(groups, 'y'), this.first, this);
  },
  
  _contains: function(i) {
    return this.contains(arguments.callee.items, i);
  },
  
  _flatten: function(mem, i, idx) {
    mem.splice.apply(mem, [mem.length, 0].concat(i));
  },
  
  _includesAll: function(i, idx) {
    return this.includesInv(i, arguments.callee.arr);
  },
  
  _indexOf: function(arr, item) {
    for (var i in arr) {
      if (arr.hasOwnProperty(i) && arr[i] === item) {
        return parseInt(i);
      }
    }

    return -1;
  },
  
  _intersectionSelect: function(i) {
    this._intersectionInclude.item = i;
    
    return this.all(arguments.callee.array, this._intersectionInclude, this);
  },
  
  _intersectionInclude: function(arr, idx) {
    return this.includes(arr, arguments.callee.item);
  },
  
  _invoke: function(i, idx, arr, meth, args) {
    return i[meth].apply(i, args);
  },
  
  _numerize: function (i) {
    return Number(i);
  },
  
  _pluck: function(i) {
    return i[arguments.callee.prop];
  },
  
  _print: function(i) {
    artjs.p(i);
  },
  
  _sum: function(sum, i) {
    return sum + i;
  },
  
  _stringify: function(i) {
    return artjs.Object.isNull(i) ? '' : i.toString();
  }
};
artjs.Object = artjs.utils.Object = {
  _name: 'Object',
  
  QUERY_DELIMITER: '&',

  all: function(obj, func) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i) && !func(obj[i])) {
        return false;
      }
    }
    
    return true;
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
  
  each: function(obj, func, context) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        func.call(context, i, obj[i]);
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
  
  eachValue: function(obj, func, context) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        func.call(context, obj[i]);
      }
    }
  },
  
  extend: function(target, source) {
    this.copyProps(source, target);
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
  
  is: function(obj, type) {
    return this.isPresent(obj) && obj.constructor === type;
  },
  
  isArray: function(obj) {
    return this.is(obj, Array);
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
  
  isObject: function(obj) {
    return this.is(obj, Object);
  },
  
  isString: function(obj) {
    return this.is(obj, String);
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
  
  map: function(obj, func, context) {
    var result = [];
    
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result.push(func.call(context, i, obj[i]));
      }
    }
    
    return result;
  },
  
  mapKey: function(obj, func, context) {
    var result = {};
    
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[func.call(context, i, obj[i])] = obj[i];
      }
    }
    
    return result;
  },
  
  mapValue: function(obj, func, context) {
    var result = {};
    
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[i] = func.call(context, i, obj[i]);
      }
    }
    
    return result;
  },
  
  merge: function(target, source) {
    var result = this.copy(target);
    
    this.extend(result, source);
    
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
  
  removeValue: function(obj, val) {
    var delegate = artjs.$D(this, '_eachDeleteValue', obj, val);
    
    this.each(obj, delegate.callback());
  },
  
  removeKeys: function(obj, keys) {
    var delegate = artjs.$D(this, '_eachKeyDeleteKey', obj);
    
    artjs.Array.each(keys, delegate.callback());
  },
  
  removeValues: function(obj, values) {
    var delegate = artjs.$D(this, '_invertedRemoveValue', obj);
    
    artjs.Array.eachItem(values, delegate.callback());
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
  
  toArray: function(obj) {
    return this.map(obj, this._keyValueArray, this);
  },
  
  toQueryString: function(obj) {
    return this._toQueryStringWithPrefix(obj, '');
  },
  
  toString: function() {
    return this._name;
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

  _eachDeleteValue: function(i, j, obj, val) {
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
artjs.Class = artjs.utils.Class = function(ctor, proto, stat, superclass) {
  var builder = new artjs.ClassBuilder(ctor, proto, stat, superclass);
  
  return builder.ctor;
};

artjs.Class._name = 'Class';

artjs.Class.toString = function() {
  return this._name;
};

artjs.ClassBuilder = function(ctor, proto, stat, superclass) {
  this.ctor = ctor || this._defaultConstructor();
  this.ctor._onCreated = this._defaultOnCreated;
  this.ctor._onExtended = this._defaultOnExtended;
  
  if (superclass) {
    var _super_ = function() {
      var _caller_ = arguments.callee.caller;
      var _super_ = _caller_.superclass || _caller_.super;
      
      return _super_.apply(this, arguments);
    };
    
    artjs.Object.extend(this.ctor, superclass);
    artjs.Object.extend(this.ctor.prototype, superclass.prototype);
    
    this.ctor.superclass = superclass;
    this.ctor.super = _super_;
    this.ctor.prototype.super = _super_;
  }
  else {
    this.ctor.prototype = {};
  }

  this.ctor.prototype.ctor = this.ctor;
  
  if (proto) {
    artjs.Object.each(proto, this._eachProto, this);
  }
  
  if (stat) {
    artjs.Object.each(stat, this._eachStat, this);
  }
  
  this.ctor._onCreated();
  
  if (superclass) {
    this.ctor._onExtended();
  }
};

artjs.ClassBuilder.prototype = {
  _defaultOnCreated: function() {
    this.subclasses = [];
  },
  
  _defaultOnExtended: function() {
    this.superclass.subclasses.push(this);
  },
  
  _defaultConstructor: function() {
    return function() {
      if (arguments.callee.superclass) {
        this.super.apply(this, arguments);
      }
    };
  },
  
  _eachProto: function(k, v) {
    this._each(this.ctor.prototype, k, v);
  },
  
  _eachStat: function(k, v) {
    this._each(this.ctor, k, v);
  },
  
  _each: function(obj, k, v) {
    if (typeof v == 'function') {
      if (obj[k]) {
        v.super = obj[k];
      }
    }
    
    obj[k] = v;
  }
};
artjs.Delegate = artjs.events.Delegate = artjs.Class(
  function(object, method) {
    this.object = object;
    this.method = artjs.Object.isString(method) ? this.object[method] : method;
    this.args = artjs.Array.arrify(arguments, 2);
  },
  {
    invoke: function() {
      var args = artjs.Array.arrify(arguments).concat(this.args);
      
      return this.method.apply(this.object, args);
    },
    
    callback: function(withSource) {
      var result = function() {
        var callee = arguments.callee;
        var delegate = callee.delegate;
        var args = artjs.Array.arrify(arguments);
        
        if (callee.withSource) {
          args.unshift(this); 
        }
        
        return delegate.invoke.apply(delegate, args);
      };
      
      result.withSource = withSource;
      result.delegate = this;
      
      return result;
    }
  },
  {
    callback: function(object, method, withSource) {
      var delegate = new this(object, method);
      var callback = delegate.callback(withSource);
      
      delegate.args = artjs.Array.arrify(arguments, 3);
      
      return callback;
    },
    
    create: function(object, method) {
      var delegate = new this(object, method);
      
      delegate.args = artjs.Array.arrify(arguments, 2);
      
      return delegate;
    },
    
    bind: function(object, methodName) {
      this._bind(object, object, methodName);
    },
    
    bindAll: function(context) {
      var container = context.ctor ? context.ctor.prototype : context;
      var callbacks = artjs.Object.keys(artjs.Object.select(container, this._isCallback, this));
      var all = callbacks.concat(artjs.Array.arrify(arguments, 1));
      
      this._bindSource = context;
      this._bindTarget = context;
      
      artjs.Array.each(all, this._bindEach, this);
    },
    
    func: function(method) {
      return this.create.apply(this, [null, method].concat(artjs.Array.arrify(arguments, 1)));
    },
    
    _bind: function(target, object, methodName) {
      target[methodName] = this.callback(object, methodName);
    },
    
    _isCallback: function(v, k) {
      return artjs.String.startsWith(k, '_on') && this._isFunction(v, k);
    },
    
    _isPublicMethod: function(v, k) {
      return !artjs.String.startsWith(k, '_') && this._isFunction(v, k);
    },
    
    _isFunction: function(v, k) {
      return v instanceof Function;
    },
    
    _bindEach: function(i) {
      this._bind(this._bindTarget, this._bindSource, i);
    }
  }
);
artjs.Math = artjs.utils.Math = {
  _name: 'Math',
  
  toString: function() {
    return this._name;
  },
  
  sgn: function(x) {
    return x === 0 ? 0 : Math.abs(x) / x;
  },
  
  limit: function(x, a, b) {
    return Math.min(Math.max(x, a), b);
  },

  sawtooth: function(x, a, b) {
    return x - this.stairs(x, a, b) * (b - a);
  },
  
  stairs: function(x, a, b) {
    return Math.floor((x - a) / (b - a));
  },

  isNonNegative: function(x) {
    return Boolean(this.sgn(x) + 1);
  }
};
artjs.String = artjs.utils.String = {
  _name: 'String',
  
  addZeros: function(str, n, left) {
    return this.align(str, n, '0', left);
  },
  
  align: function(str, n, char, left) {
    var c = this.getMultiPattern(char, n - str.length);
    
    return left ? str + c : c + str;
  },
  
  blank: function() {
    return '';
  },
  
  capitalize: function(str) {
    return artjs.Array.map(str.split(' '), this.capitalizeWord).join(' ');
  },
  
  capitalizeWord: function(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  },
  
  capitalizeUnderscored: function(str) {
    return this.strip(this.capitalize(str.replace(new RegExp('_', 'g'), ' ')));
  },
  
  countPattern: function(str, pattern) {
    return str.match(new RegExp(pattern, 'g')).length;
  },
  
  escapeHtml: function(str) {
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '\"');
  },
  
  first: function(str) {
    return str.substr(0, 1);
  },
  
  formatPrice: function(price) {
    var parts = price.toString().split('.');
    var integer = parts[0];
    var decimal = parts[1];
  
    return integer + '.' + (decimal ? this.addZeros(decimal, 2, true) : '00');
  },
  
  getMultiPattern: function(pattern, n) {
    var str = this.blank();
    
    while (n-- > 0) {
      str += pattern;
    }
  
    return str;
  },
  
  isBlank: function(str) {
    return artjs.Object.isNull(str) || this.isEmpty(str);
  },

  isEmpty: function(str) {
    return this.strip(str) == this.blank();
  },
  
  isPresent: function(str) {
    return !this.isBlank(str);
  },
  
  last: function(str) {
    return str.substr(str.length - 1, 1);
  },
  
  match: function(str, re) {
    var result = re.exec(str);
    
    return result && artjs.Array.last(result);
  },
  
  nullifyEmpty: function(str) {
    return this.isEmpty(str) ? null : str;
  },
  
  truncate: function(text, length, onlyWords, end) {
    if (text.length > length) {
      var shrinkedText = text.substr(0, length);
      
      if (onlyWords) {
        if (text[length] == ' ') {
          return this._truncation(shrinkedText, end);
        }
        else {
          var lastSpace = shrinkedText.lastIndexOf(' ');

          if (lastSpace > -1) {
            return this._subtruncation(text, lastSpace, end);
          }
          else {
            return this._subtruncation(text, length, end);
          }
        }
      }
      else {
        return this._subtruncation(text, length, end);
      }
    }
    else {
      return text;
    }
  },

  pluralize: function(n, str) {
    return str + ((n == 1) ? this.blank() : 's');
  },
  
  startsWith: function(str, substr) {
    var re = new RegExp('^' + substr);
    
    return re.test(str);
  },
  
  strip: function(str) {
    return str.replace(/\s/g, this.blank());
  },
  
  sub: function(str, i, j) {
    var n = str.length;
    var start = (i % n + n) % n;
    var end = (j % n + n) % n;
   
    if ((end < start) || (end == start) && (i != j)) end += n;
   
    return (str + str).substring(start, end);
  },
  
  toBoolean: function(str) {
    return str === 'true';
  },
  
  toJson: function(str) {
    return JSON.parse(str);
  },
  
  toS: function(str) {
    return artjs.Object.isNull(str) ? this.blank() : str;
  },
  
  toString: function() {
    return this._name;
  },
  
  trim: function(str, character, replacement) {
    var c = character || ' ';
    var r = replacement || '';
    
    return str
      .replace(new RegExp('^' + c + '+'), r)
      .replace(new RegExp(c + '+$'), r);
  },
  
  _subtruncation: function(text, index, end) {
    return this._truncation(text.substr(0, index), end);
  },
  
  _truncation: function(text, end) {
    return text + (end || '...');
  }
};
artjs.Date = artjs.utils.Date = {
  _name: 'Date',
  
  copy: function(date) {
    return new Date(date);
  },

  firstDate: function(date) {
    var d = this.copy(date);
    
    d.setDate(1);
    
    return d;
  },
  
  firstDay: function(date) {
    return this.firstDate(date).getDay();
  },

  fromDMY: function(str, separator) {
    separator = separator || '-';

    var arr = str.split(separator);
    var au = artjs.Array;

    return new Date(parseInt(au.third(arr), 10), parseInt(au.second(arr), 10) - 1, parseInt(au.first(arr), 10));
  },

  fromYMD: function(str, separator) {
    separator = separator || '-';
    
    var arr = str.split(separator);
    var au = artjs.Array;
    
    return new Date(parseInt(au.first(arr), 10), parseInt(au.second(arr), 10) - 1, parseInt(au.third(arr), 10));
  },
  
  getDateShifted: function (date, days) {
    var dateCopy = this.copy(date);
  
    dateCopy.setDate(date.getDate() + days);
  
    return dateCopy;
  },
  
  getTime: function() {
    return (new Date()).getTime();
  },
  
  hmToMinutes: function(hm, separator) {
    separator = separator || ':';
    
    var arr = hm.split(separator);
  
    return 60 * parseInt(arr[0], 10) + parseInt(arr[1], 10);
  },
  
  minutesToHM: function(minutes, separator) {
    separator = separator || ':';
    
    return Math.floor(minutes / 60) + separator + artjs.String.addZeros((minutes % 60).toString(), 2);
  },
  
  monthDaysNum: function(date) {
    var d = this.copy(date);
    
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    
    return d.getDate();
  },
  
  msToHMSM: function(v) {
    var mili = v % 1000;
    var totalSeconds = (v - mili) / 1000;
    var seconds = totalSeconds % 60;
    var totalMinutes = (totalSeconds - seconds) / 60;
    var minutes = totalMinutes % 60;
    var totalHours = (totalMinutes - minutes) / 60;
    var hours = totalHours;

    return hours.toString() +
      ':' +
      artjs.String.addZeros(minutes.toString(), 2) +
      ':' +
      artjs.String.addZeros(seconds.toString(), 2) +
      '.' +
      artjs.String.addZeros(mili.toString(), 3);
  },

  msToMSM: function(v) {
    var mili = v % 1000;
    var totalSeconds = (v - mili) / 1000;
    var seconds = totalSeconds % 60;
    var totalMinutes = (totalSeconds - seconds) / 60;
    var minutes = totalMinutes;

    return minutes.toString() +
      ':' +
      artjs.String.addZeros(seconds.toString(), 2) +
      '.' +
      artjs.String.addZeros(mili.toString(), 3);
  },
  
  msToSeconds: function(ms, separator) {
    separator = separator || ':';
    
    var arr = ms.split(separator);
    
    return 60 * parseInt(arr[0], 10) + parseInt(arr[1], 10);
  },
  
  secondsToHMS: function(s, separator) {
    var seconds = s % 60;
    var minutes = (s - seconds) / 60;
    
    separator = (separator || ':');
    
    return this.minutesToHM(minutes, separator) + separator + artjs.String.addZeros(seconds.toString(), 2);
  },
  
  secondsToMS: function(s, separator) {
    var seconds = s % 60;
    var minutes = (s - seconds) / 60;
    var su = artjs.String;
    
    separator = separator || ':';
    
    return su.addZeros(minutes.toString(), 2) + separator + su.addZeros(seconds.toString(), 2);
  },
  
  stripDayTime: function(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  },
  
  toDMY: function(date, separator) {
    separator = separator || '-';
    
    var ymd = this.toYMD(date, separator);
    var arr = ymd.split(separator);
    
    arr.reverse();
    
    return arr.join(separator);
  },
  
  toHMS: function(date, separator) {
    var su = artjs.String;
    
    separator = separator || ':';
    
    return su.addZeros(date.getHours().toString(), 2, false) + 
      separator + su.addZeros(date.getMinutes().toString(), 2, false) + 
      separator + su.addZeros(date.getSeconds().toString(), 2, false);
  },
  
  toString: function() {
    return this._name; 
  },
  
  toYMD: function(date, separator) {
    var su = artjs.String;
    
    separator = separator || '-';
    
    return date.getFullYear() +
      separator + su.addZeros((date.getMonth() + 1).toString(), 2, false) +
      separator + su.addZeros(date.getDate().toString(), 2, false);
  }
};
artjs.Element = artjs.utils.Element = {
  HIDDEN_ELEMENTS: [],
  DEFAULT_DISPLAY: '',
  MAIN_OBJ_RE: /^\w+/,
  SUB_OBJ_RE: /\[\w+\]/g,
  SIZE_STYLE_RE: /^(\d+)px$/,
  BROWSERS_STYLES: ['', '-o-', '-ms-', '-moz-', '-khtml-', '-webkit-'],
  
  _name: 'Element',
  
  toString: function() {
    return this._name; 
  },
  
  show: function(e) {
    var hidden = this._getHidden(e);
    
    artjs.Array.removeItem(this.HIDDEN_ELEMENTS, hidden);
    
    var display = hidden && hidden.display || e.style.display;
    
    e.style.display = (display == 'none') ? this.DEFAULT_DISPLAY : display;
  },
  
  hide: function(e) {
    var hidden = this._getHidden(e);
    
    if (!hidden) {
      this.HIDDEN_ELEMENTS.push({element: e, display: e.style.display});
      e.style.display = 'none';
    }
  },
  
  toggle: function(e) {
    this.setVisible(e, this.isHidden(e));
  },
  
  setVisible: function(e, v) {
    if (v) { 
      this.show(e);
    } else {
      this.hide(e);
    }
  },
  
  isHidden: function(e) {
    var hidden = this._getHidden(e);
    
    return hidden || e.style.display == 'none';
  },
  
  _getHidden: function(e) {
    var delegate = artjs.$D(this, '_detectHiddenElement', e);
    
    return artjs.Array.detect(this.HIDDEN_ELEMENTS, delegate.callback(), this);
  },
  
  _detectHiddenElement: function(i, idx, arr, e) {
    return i.element == e;
  },
  
  getSize: function(e, real) {
    return this.getBounds(e, real).getSize(); 
  },
  
  getBounds: function(e, real, withoutScroll) {
    var toggle = real && this.isHidden(e);
    
    if (toggle) { this.show(e); }
    
    var b = e.getBoundingClientRect();
    var layout = new artjs.Rectangle(b.left, b.top, b.right, b.bottom);
    
    if (!withoutScroll) { layout.moveBy(this.getScrollPosition()); }
    
    if (toggle) { this.hide(e); }
    
    return layout;
  },
  
  setWidth: function(e, w) {
    e.style.width = w + 'px';
  },
  
  setHeight: function(e, h) {
    e.style.height = h + 'px';
  },
  
  setStyle: function(e, prop, v) {
    e.style[prop] = v;
  },

  extendStyle: function(e, style) {
    artjs.Object.extend(e.style, style);
  },
  
  transitionStyle: function(prop, duration, type, delay) {
    return this._effectStyle(this._getTransitionStyleValue(prop, duration, type, delay));  
  },

  getSizeStyle: function(e, prop) {
    return this.getSizeStyleValue(this.getStyle(e, prop));
  },
  
  getSizeStyleValue: function(value) {
    var v = value.match(this.SIZE_STYLE_RE);
    
    return v && Number(v[1]) || 0;
  },

  children: function(e) {
    return artjs.$A(e.childNodes);
  },
  
  elements: function(e) {
    return this.filterElements(this.children(e));
  },
  
  elementAt: function(e, i) {
    return artjs.Array.getItemAt(this.elements(e), i);
  },
  
  filterElements: function(items) {
    return artjs.Array.select(items, this.isElement, this);
  },
  
  isElement: function(e) {
    return e.nodeType == Node.ELEMENT_NODE;
  },

  isText: function(e) {
    return e.nodeType == Node.TEXT_NODE;
  },
  
  remove: function(e) {
    return e.parentNode.removeChild(e);
  },
  
  removeAt: function(e, idx) {
    return this.remove(this.elementAt(e, idx));
  },
  
  parent: function(e) {
    return e.parentNode;
  },
  
  firstElement: function(e) {
    return artjs.Array.first(this.elements(e));
  },
  
  lastElement: function(e) {
    return artjs.Array.last(this.elements(e));
  },
  
  prev: function(e) {
    var result = e;
    
    do {
      result = result.previousSibling;
    }
    while (result && !this.isElement(result));
    
    return result;
  },
  
  next: function(e) {
    var result = e;
    
    do {
      result = result.nextSibling;
    }
    while (result && !this.isElement(result));
    
    return result;
  },
  
  clone: function(e, deep) {
    return e.cloneNode(deep);
  },

  insert: function(ref, e) {
    return this.putAtBottom(e, ref);
  },
  
  putAtBottom: function(e, ref) {
    var result = this.clone(e, true);
    
    ref.appendChild(result);
    
    return result;
  },
    
  putAtTop: function(e, ref) {
    var first = artjs.Array.first(this.children(ref));
    
    return first ? this.putBefore(e, first) : this.putAtBottom(e, ref);
  },
  
  putAfter: function(e, ref) {
    var next = this.next(ref);
    
    return next ? this.putBefore(e, next) : this.putAtBottom(e, this.parent(ref));
  },
  
  putBefore: function(e, ref) {
    return this.parent(ref).insertBefore(e, ref);
  },
  
  replace: function(e, ref, clone) {
    var parent = this.parent(ref);
    var idx = this.elements(parent).indexOf(ref);
    
    if (clone) { e = this.clone(e, true); }
    
    parent.replaceChild(e, ref);
    
    return this.elements(parent)[idx];
  },
  
  center: function(e) {
    this.setPosition(e, this.getCenteredPosition(e));
  },
  
  centerH: function(e) {
    var pos = this.getCenteredPosition(e);
    
    this.setX(e, pos.x);
  },
  
  centerV: function(e) {
    var pos = this.getCenteredPosition(e);
    
    this.setY(e, pos.y);
  },
  
  getCenteredPosition: function(e) {
    return this.getWindowSize().sub(this.getSize(e)).times(0.5).add(this.getScrollPosition());
  },
  
  setPosition: function(e, p) {
    this.setX(e, p.x);
    this.setY(e, p.y);
  },
  
  getPosition: function(e, withoutScroll) {
    return this.getBounds(e, false, withoutScroll).getLeftTop();
  },
  
  setX: function(e, v) {
    e.style.left = v + 'px';
  },
  
  setY: function(e, v) {
    e.style.top = v + 'px';
  },
  
  enable: function(e) {
    e.removeAttribute('disabled'); 
  },
  
  disable: function(e) {
    e.setAttribute('disabled', 'disabled'); 
  },
  
  setEnabled: function(e, enabled) {
    if (enabled) {
      this.enable(e);
    } else {
      this.disable(e);
    }
  },
  
  serialize: function(e) {
    var s = artjs.Selector;
    var au = artjs.Array;
    var textfields = s.findAll(e, 'input[type=text]');
    var checkboxes = au.select(s.findAll(e, 'input[type=checkbox]'), this.selectChecked, this);
    var radios = au.select(s.findAll(e, 'input[type=radio]'), this.selectChecked, this);
    var selects = s.findAll(e, 'select');
    var textareas = s.findAll(e, 'textarea');
    var hiddenfields = s.findAll(e, 'input[type=hidden]');
    var inputs = au.flatten([textfields, checkboxes, radios, selects, textareas, hiddenfields]);
    
    return au.inject(inputs, {}, this.serializeInject, this);
  },
  
  selectChecked: function(i) {
    return i.checked;
  },
  
  serializeInject: function(mem, i, idx) {
    var name = i.name;
    var value = i.value;
    var main = artjs.Array.first(name.match(this.MAIN_OBJ_RE));
    var subobjectMatches = name.match(this.SUB_OBJ_RE);
    var props = subobjectMatches && artjs.Array.map(artjs.$A(subobjectMatches), this.mapSub, this) || [];
    
    props.unshift(main);
    
    var obj = mem;
    var n = props.length - 1;
    var k, prop;
    
    for (k = 0; k < n; k++) {
      prop = props[k];
      if (!(obj[prop] instanceof Object)) { obj[prop] = {}; }
      obj = obj[prop];
    }
    
    obj[props[k]] = value;
    
    return mem;
  },
  
  mapSub: function(i, idx) {
    return artjs.String.sub(i, 1, -1);
  },
  
  getContent: function(e) {
    return e.innerHTML;
  },
  
  setContent: function(e, v) {
    e.innerHTML = v;
  },
  
  clear: function(e) {
    this.setContent(e, '');
  },
  
  hasClass: function(e, className) {
    return artjs.Array.includes(this.getClasses(e), className);
  },
  
  getClasses: function(e) {
    var className = artjs.String.trim(e.className);
    
    return artjs.String.isBlank(className) ? [] : className.split(' ');
  },
  
  setClass: function(e, className, add) {
    if (add) {
      this.addClass(e, className);
    }
    else {
      this.removeClass(e, className);
    }
  },
  
  setClasses: function(e, classes) {
    this._setClassPair.element = e;
    
    artjs.Object.each(classes, this._setClassPair, this);
  },
  
  _setClassPair: function(className, add) {
    this.setClass(arguments.callee.element, className, add);
  },
  
  addClasses: function(e, classes) {
    this._addClass.element = e;
    
    artjs.Array.each(classes, this._addClass, this);
  },
  
  _addClass: function(className) {
    this.addClass(arguments.callee.element, className);
  },
  
  addClass: function(e, className) {
    var classes = this.getClasses(e);
    
    if (!this.hasClass(e, className)) {
      classes.push(className);
      e.className = classes.join(' ');
    }
  },
  
  removeClass: function(e, className) {
    var classes = this.getClasses(e);
    
    if (this.hasClass(e, className)) {
      artjs.Array.removeItem(classes, className);
      e.className = classes.join(' ');
    }
  },
  
  toggleClass: function(e, className) {
    this.setClass(e, className, !this.hasClass(e, className));
  },
  
  getAttributes: function(e) {
    return artjs.Object.fromArray(artjs.Array.map(artjs.$A(e.attributes), this._mapAttribute, this));
  },
  
  getData: function(e) {
    var attrs = this.getAttributes(e);
    var data = artjs.Object.select(attrs, this._isDataAttribute, this);
    
    return artjs.Object.mapKey(data, this._removeDataPrefix, this);
  },
  
  getDataValue: function(e, name) {
    return this.getData(e)[name];
  },
  
  _isDataAttribute: function(v, k) {
    return artjs.String.startsWith(k, 'data-');
  },
  
  _removeDataPrefix: function(k) {
    return k.replace(/^data\-/, '');
  },
  
  _mapAttribute: function(i) {
    return [i.name, i.value];
  },

  setAlpha: function(e, v) {
    e.style.opacity = v;
    e.style.filter = 'alpha(opacity=' + 100 * v + ')';
  },

  getAlpha: function(e) {
    if (e.style.filter) {
      var re = /alpha\(opacity=(\d+(\.\d+)?)\)/;

      return Number(artjs.Array.second(e.style.filter.match(re)));
    }
    else {
      return e.style.opacity;
    }
  },

  getStyle: function(e, prop) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(e, null).getPropertyValue(prop);
    }
    else {
      return e.currentStyle[prop];
    }
  },

  getPadding: function(e) {
    return new artjs.Rectangle(
      this.getSizeStyle(e, 'padding-left') || this.getSizeStyle(e, 'paddingLeft'),
      this.getSizeStyle(e, 'padding-top') || this.getSizeStyle(e, 'paddingTop'),
      this.getSizeStyle(e, 'padding-right') || this.getSizeStyle(e, 'paddingRight'),
      this.getSizeStyle(e, 'padding-bottom') || this.getSizeStyle(e, 'paddingBottom')
    );
  },

  getDocumentSize: function() {
    var doc = window.document;
    var body = doc.body;

    return new artjs.Point(body.clientWidth || doc.width, body.clientHeight || doc.height);
  },

  getWindowSize: function() {
    var de = document.documentElement;

    return new artjs.Point(de.clientWidth || window.innerWidth, de.clientHeight || window.innerHeight);
  },

  getScrollPosition: function() {
    var de = document.documentElement;
    
    return new artjs.Point(de.scrollLeft || window.scrollX, de.scrollTop || window.scrollY);
  },

  onClick: function(e, delegate) {
    return artjs.on('click', e, delegate);
  },
  
  render: function(e) {
    var classes = this.getClasses(e);
    var attr = this.getAttributes(e);
    
    delete attr['id'];
    delete attr['class'];
    
    return this.toTagString(e)
      + this.toIdString(e) 
      + artjs.Array.map(classes, this.toClassString).join('') 
      + artjs.Object.map(attr, this.toAttrString).join('');
  },
  
  toTagString: function(e) {
    return e.tagName.toLowerCase();
  },
  
  toIdString: function(e) {
    return '#' + e.id;
  },
  
  toClassString: function(v) {
    return '.' + v;
  },
  
  toAttrString: function(k, v) {
    return '[' + k + '=' + v + ']';
  },
  
  _getTransitionStyleValue: function(prop, duration, type, delay) {
    return [prop, duration + 's', type, delay + 's'].join(' ');
  },
  
  _effectStyle: function(value) {
    this._browserMap.value = value;

    return artjs.Object.fromArray(artjs.Array.map(this.BROWSERS_STYLES, this._browserMap, this));
  },

  _browserMap: function(browser) {
    return [browser + 'transition', arguments.callee.value];
  }
};
artjs.Lang = artjs.utils.Lang = {
  _name: 'Lang',
  
  setLang: function(lang) {
    this._lang = lang;
  },
  
  getLang: function(lang) {
    return this._lang;
  },
  
  t: function() {
    var path = artjs.$A(arguments);
    
    this._node = this._translations[this._lang];
    
    artjs.Array.each(path, this._updateNode, this);
    
    return this._node;
  },
  
  _updateNode: function(i) {
    this._node = this._node[i];
  },
  
  _lang: 'en',
  
  _translations: {
    en: {
      datepicker: {
        months: [
          'January', 
          'February', 
          'March', 
          'April', 
          'May', 
          'June', 
          'July', 
          'August', 
          'September', 
          'October', 
          'November', 
          'December'
        ],
        days: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']
      }
    },
    
    pl: {
      datepicker: {
        months: [
          'Styczeń', 
          'Luty', 
          'Marzec', 
          'Kwiecień', 
          'Maj', 
          'Czerwiec', 
          'Lipiec', 
          'Sierpień', 
          'Wrzesień', 
          'Październik', 
          'Listopad', 
          'Grudzień'
        ],
        days: ['Nd', 'Po', 'Wt', 'Śr', 'Cz', 'Pt', 'So']
      }
    }
  }
};
artjs.Toggler = artjs.utils.Toggler = artjs.Class(
  function(unique) {
    this.unique = unique;
    this.current = null;
    this.onActivate = new artjs.Event('Toggler::onActivate');
    this.onDeactivate = new artjs.Event('Toggler::onDeactivate');
  },
  {
    toggle: function(item) {
      if (!(this.unique && this.current == item)) {
        this.onDeactivate.fire(this);

        this.current = item;

        this.onActivate.fire(this);
      }
    }
  },
  {
    _name: 'Toggler',
    
    toString: function() {
      return this._name;
    }
  }
);
artjs.utils.TreeCrawler = artjs.TreeCrawler = {
  find: function(data, value) {
    var result = [];
    
    this._value = value;
    this._result = result;
    this._path = [];
    
    this._traverse(data);
    
    return result;
  },
  
  _each: function(v, idx) {
    this._path.push(idx);
    
    if (artjs.Object.isObject(v)) {
      this._traverse(v);
    }
    else if (v == this._value) {
      this._result.push(artjs.Array.clone(this._path));
    }
    
    this._path.pop();
  },
  
  _traverse: function(obj) {
    artjs.Array.each(artjs.Object.values(obj), this._each, this);
  }
};
artjs.ClassToggler = artjs.utils.ClassToggler = artjs.Class(
  function(className) {
    this._className = className;
    this._toggler = new artjs.Toggler();
    this._toggler.onActivate.add(artjs.$D(this, '_onActivate'));
    this._toggler.onDeactivate.add(artjs.$D(this, '_onDeactivate'));
    this.onActivate = new artjs.Event('ClassToggler::onActivate');
    this.onDeactivate = new artjs.Event('ClassToggler::onDeactivate');
  },
  {
    toggle: function(item) {
      this._toggler.toggle(item);
    },
    
    getCurrent: function() {
      return this._toggler.current;
    },
    
    _onActivate: function(t) {
      if (t.current) artjs.Element.addClass(t.current, this._className);
      
      this.onActivate.fire(this);
    },
    
    _onDeactivate: function(t) {
      if (t.current) artjs.Element.removeClass(t.current, this._className);
      
      this.onDeactivate.fire(this);
    }
  },
  {
    _name: 'ClassToggler',
    
    toString: function() {
      return this._name; 
    }
  }
);
artjs.Event = artjs.events.Event = artjs.Class(
  function(name) {
    this._name = name;
    this._items = [];
  },
  {
    fire: function() {
      this._args = artjs.$A(arguments);
      
      return artjs.Array.map(this._items, this._delegateToResult, this);
    },
    
    add: function(delegate) {
      this._items.push(delegate);
    },
    
    remove: function(delegate) {
      artjs.Array.removeItem(this._items, delegate);
    },
    
    removeAll: function() {
      this._items.splice(0);
    },
    
    getLength: function() {
      return this._items.length;
    },
    
    getName: function() {
      return this._name;
    },
    
    getItems: function() {
      return this._items;
    },
    
    _delegateToResult: function(i) {
      return i.invoke.apply(i, this._args);
    }
  }
);
artjs.Point = artjs.math.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

artjs.Point.prototype = {
  getLength: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  
  dot: function(p) {
    return (this.x * p.x + this.y * p.y);
  },
  
  add: function(p) {
    return new artjs.Point(this.x + p.x, this.y + p.y);
  },
  
  sub: function(p) {
    return this.add(p.getReversed());
  },
  
  getReversed: function() {
    return this.times(-1);
  },
  
  reverseX: function() {
    this.x = - this.x;
    
    return this;
  },
  
  reverseY: function() {
    this.y = - this.y;
    
    return this;
  },
  
  transpose: function() {
    var temp = this.x;
    
    this.x = this.y;
    this.y = temp;
    
    return this;
  },
  
  getTransposed: function() {
    return new artjs.Point(this.y, this.x);
  },
  
  reverse: function() {
    this.reverseX();
    this.reverseY();
    
    return this;
  },
  
  times: function(k) {
    return new artjs.Point(k * this.x, k * this.y);
  },
  
  toString: function() {
    return '[' + this.x + ', ' + this.y + ']';
  }
};
artjs.Rectangle = artjs.math.Rectangle = function(left, top, right, bottom) {
  this.left = left;
  this.top = top;
  this.right = right;
  this.bottom = bottom;
};

artjs.Rectangle.prototype = {
  getWidth: function() {
    return this.right - this.left;
  },
  
  getHeight: function() {
    return this.bottom - this.top;
  },
  
  getArea: function() {
    return this.getWidth() * this.getHeight();
  },
  
  getLeftTop: function() {
    return new artjs.Point(this.left, this.top);
  },
  
  getRightTop: function() {
    return new artjs.Point(this.right, this.top);
  },
  
  getRightBottom: function() {
   return new artjs.Point(this.right, this.bottom);
  },
  
  getLeftBottom: function() {
    return new artjs.Point(this.left, this.bottom);
  },
  
  getSize: function() {
    return new artjs.Point(this.getWidth(), this.getHeight());
  },
  
  moveBy: function(p) {
    this.left += p.x;
    this.top += p.y;
    this.right += p.x;
    this.bottom += p.y;
  }
}; 
artjs.ElementBuilder = artjs.dom.ElementBuilder = artjs.Class(
  function(name, attributes, value, isEmpty) {
    this.name = name;
    this.attributes = attributes;
    this.value = value;
    this.isEmpty = Boolean(isEmpty);
  },
  {
    toString: function() {
      var attributes = this.attributes && artjs.Object.isNotEmpty(this.attributes) 
        ? ' ' + this.ctor._attributesString(this.attributes)
        : '';
      var part;
      
      if (this.value) {
        part = '>' + this.value + '</' + this.name + '>';
      }
      else {
        if (this.empty) {
          part = '/>';
        }
        else {
          part = '></' + this.name + '>';
        }
      }
    
      return '<' + this.name + attributes + part;
    },
    
    getElement: function() {
      var e = document.createElement(this.name);
      var sa = this.ctor._setAttribute;
      
      sa.e = e;
      
      artjs.Object.each(this.attributes, sa);
      
      if (this.value && !this.isEmpty) { e.innerHTML = this.value; }
      
      return e;
    }
  },
  {
    _KEY_TRANSLATOR: {
      className: 'class',
      forField: 'for'
    },
    
    // Shorthand method to return new instance
    build: function(name, attributes, value, empty) {
      return new this(name, attributes, value, empty);
    },
    
    parse: function(str) {
      var node = document.createElement('div');
      
      node.innerHTML = str;
      
      return node.firstChild;
    },
    
    unparse: function(element) {
      var node = document.createElement('div');
      
      artjs.Element.insert(node, element);
      
      return artjs.Element.getContent(node);
    },
    
    create: function(name, attributes, value, empty) {
      return this.parse(this.build(name, attributes, value, empty).toString());
    },
    
    getElement: function(name, attributes, value, empty) {
      return this.build(name, attributes, value, empty).getElement();
    },
    
    getCollection: function(n, element) {
      this._getElement.element = element;
      
      return artjs.Array.build(n, this._getElement).join('');
    },
    
    _getElement: function(i) {
      return arguments.callee.element;
    },
    
    _attributesString: function(attrs) {
      return artjs.Array.map(artjs.Object.toArray(attrs), this._attributePairToString, this).join(' ');
    },
    
    _setAttribute: function(k, v) {
      arguments.callee.e.setAttribute(k, v);
    },
  
    _attributePairToString: function(arr) {
      var key = this._KEY_TRANSLATOR[arr[0]] || arr[0];
      var value = arr[1];
      
      return key + '="' + value + '"';
    }
  }
);
artjs.Selector = artjs.dom.Selector = {
  findAll: function(element, selector) {
    return this.getElements(selector, element);
  },
  
  find: function(element, selector) {
    return this.getElement(selector, element);
  },

  parent: function(element) {
    return element.parentNode;
  },
  
  getElement: function(selector, element) {
    return (element || document).querySelector(selector);
  },
  
  getElements: function(selector, element) {
    return artjs.$A((element || document).querySelectorAll(selector));
  },
  
  isDescendantOf: function(element, ref) {
    var ancestors = this.getAncestors(element, ref);

    return artjs.Object.isPresent(ancestors);
  },
  
  isSelfOrDescendantOf: function(element, ref) {
    return element == ref || this.isDescendantOf(element, ref);
  },
  
  getElementById: function(id) {
    return document.getElementById(id);
  },
  
  getElementsByTagName: function(tagName) {
    return artjs.$A(document.getElementsByTagName(tagName));
  },
  
  isOnStage: function(element) {
    return this.isDescendantOf(element);
  },
  
  getAncestors: function(element, ref) {
    var result = [];
    
    while (element = this.parent(element)) {
      result.push(element);
    }
    
    var index = result.indexOf(ref || document.body);
    
    return index == -1 ? null : result.slice(0, index);
  }
};
artjs.Ajax = artjs.net.Ajax = artjs.Class(
  function(url, data, method) {
    this._onReadyStateChangeDC = artjs.$DC(this, this._onReadyStateChange, true);
    this._onProgressDC = artjs.$DC(this, this._onProgress, true);
    this._onErrorDC = artjs.$DC(this, this._onError, true);
    this.onSuccess = new artjs.Event('Ajax:onSuccess');
    this.onFailure = new artjs.Event('Ajax:onFailure');
    this.onProgress = new artjs.Event('Ajax:onProgress');
    
    var methods = artjs.Ajax.Methods;
    
    this.url = url;
    this.data = data;
    this.method = method;
    this.requestData = data;
    this.requestMethod = method || methods.GET;
    
    if (!artjs.Array.includes(artjs.Ajax.SupportedMethods, this.requestMethod)) {
      this.requestData = this.requestData || {};
      this.requestData._method = this.requestMethod;
      this.requestMethod = methods.POST;
    }
    
    this._request = new XMLHttpRequest();
    
    this.requestUrl = this.url;
    
    if (this.requestData) {
      this.requestQueryData = artjs.Object.toQueryString(this.requestData);
      
      if (this.requestMethod == methods.GET) {
        this.requestUrl += ('?' + this.requestQueryData);
        this.requestQueryData = null;
      }
    }
  
    this._request.open(this.requestMethod, this.requestUrl, true);
    
    this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.setRequestHeader('X-artjs-Version', artjs.VERSION);
    this.setRequestHeader('Accept', 'text/javascript, text/html, application/xml, text/xml, */*');
  
    if (this.requestMethod == methods.POST) {
      this.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    
    this._request.onreadystatechange = this._onReadyStateChangeDC;
    this._request.onprogress = this._onProgressDC;
    this._request.onerror = this._onErrorDC;
  },
  {
    request: function() {
      this._request.send(this.requestQueryData);
    },
    
    abort: function() {
      this._request.abort();
    },
    
    getReadyState: function() {
      return this._request.readyState;
    },
    
    getStatus: function() {
      return this._request.status;
    },
    
    getStatusText: function() {
      return this._request.statusText;
    },
    
    getResponseText: function() {
      return this._request.responseText;
    },
    
    getResponseXML: function() {
      return this._request.responseXML;
    },
    
    setRequestHeader: function(header, value) {
      return this._request.setRequestHeader(header, value);
    },
    
    getResponseHeader: function(header) {
      return this._request.getResponseHeader(header);
    },
    
    getAllResponseHeaders: function() {
      return this._request.getAllResponseHeaders();
    },
  
    _onProgress: function(request, event) {
      var r = event.loaded / event.total;
  
      this.onProgress.fire(this, r);
    },
  
    _onError: function(request, event) {
      this.onFailure.fire(this);
    },
  
    _onReadyStateChange: function(request) {
      if (this.getReadyState() == artjs.Ajax.ReadyState.LOADED) {
        this.onSuccess.fire(this);
      }
    }
  },
  {
    Methods: {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE'
    },
    
    ReadyState: {
      UNINITIALIZED: 0,
      OPEN: 1,
      SENT: 2,
      RECEIVING: 3,
      LOADED: 4
    },
    
    get: function(url, data, onSuccess) {
      return artjs.Ajax.request(url, data, artjs.Ajax.Methods.GET, onSuccess);
    },
    
    post: function(url, data, onSuccess) {
      return artjs.Ajax.request(url, data, artjs.Ajax.Methods.POST, onSuccess);
    },
    
    put: function(url, data, onSuccess) {
      return artjs.Ajax.request(url, data, artjs.Ajax.Methods.PUT, onSuccess);
    },
    
    del: function(url, data, onSuccess) {
      return artjs.Ajax.request(url, data, artjs.Ajax.Methods.DELETE, onSuccess);
    },
    
    request: function(url, data, method, onSuccess) {
      var ajax = new artjs.Ajax(url, data, method);
      
      if (onSuccess) { ajax.onSuccess.add(onSuccess); }
      
      ajax.request();
      
      return ajax;
    }
  }
);

artjs.Ajax.SupportedMethods = [artjs.Ajax.Methods.GET, artjs.Ajax.Methods.POST];
artjs.Controller = artjs.net.Controller = artjs.Class(
  null,
  {
    load: function() {
    },
    
    index: function() {
    }
  }
);
artjs.Route = artjs.net.Route = artjs.Class(
  function(options) {
    var path = artjs.String.toS(artjs.String.match(location.hash, this.ctor.RE));
    var fragments = path.split('/');
    var controllerId = artjs.String.nullifyEmpty(fragments.shift());
    var controller = artjs.Router.mapping[controllerId];
    var action = fragments.shift();
    var request = {params: fragments};
    
    if (!controller) {
      controller = artjs.Router.defaultController;
      request.controllerId = controllerId;
    }
    
    this._delegate = artjs.$D(controller, options && options.action || action || 'index');
    this._request = request;
  },
  {
    go: function() {
      this._delegate.invoke(this._request);
    },
    
    getRequest: function() {
      return this._request;
    }
  },
  {
    RE: new RegExp('#!?/(.*)')
  },
  artjs.Delegate
);
artjs.Router = artjs.net.Router = {
  defaultController: new artjs.Controller(),
  
  mapping: {
  },
  
  _name: 'Router',
  
  init: function() {
    this.onNavigate = new artjs.Event('Router:onNavigate');
    
    addEventListener('popstate', artjs.$DC(this, '_onPopState'));
    
    artjs.TemplateLibrary.onLoad.add(artjs.$D(this, '_onLibraryLoad'));
  },
  
  toString: function() {
    return this._name;
  },
  
  _navigateTo: function(route) {
    this.onNavigate.fire(route);
    
    route.go();
  },
  
  _reload: function() {
    var route = new artjs.Route();
    
    this._navigateTo(route);
  },
  
  _onLibraryLoad: function() {
    var route = new artjs.Route({action: 'load'});
    
    this._navigateTo(route);
    this._reload();
  },
  
  _onPopState: function() {
    this._reload();
  }
};
artjs.List = artjs.data.List = artjs.Class(
  function(items) {
    this.items = items || {};
    this.i = 0;
    this.onChange = new artjs.Event('List::onChange');
    this.allowDuplicates = true;
    this.loop = false;
  },
  {
    addItem: function(item, noEvent) {
      if (this.allowDuplicates || !this.hasItem(item)) {
        this.items.push(item);
        
        if (!noEvent) { this.onChange.fire(this); }
      }
      
      return this.getLength();
    },
    
    addItemAt: function(item, position, noEvent) {
      if (this.allowDuplicates || !this.hasItem(item)) {
        this.items = artjs.Array.insertAt(this.items, position, item);
        
        if (!noEvent) { this.onChange.fire(this); }
      }
      
      return this.getLength();
    },
    
    removeItem: function(item, onlyFirst, noEvent) {
      artjs.Array.removeItem(this.items, item, onlyFirst);
      
      if (!noEvent) { this.onChange.fire(this); }
      
      return this.getLength();
    },
    
    removeItemAt: function(position, noEvent) {
      artjs.Array.removeAt(this.items, position);
      
      if (!noEvent) { this.onChange.fire(this); }
      
      return this.getLength();
    },
    
    removeAll: function(noEvent) {
      this.items.splice(0);
      
      if (!noEvent) { this.onChange.fire(this); }
    },
    
    getItemAt: function(position) {
      position = this.loop ? (artjs.Math.sawtooth(position, 0, this.getLength())) : position;
    
      return this.items[position];
    },
    
    getItemIndex: function(item) {
      return this.items.indexOf(item);
    },
    
    moveItem: function(fromIndex, toIndex) {
      var item = this.getItemAt(fromIndex);
      
      this.removeItemAt(fromIndex, true);
      this.addItemAt(item, toIndex);
    },
    
    getLength: function() {
      return this.items.length;
    },
    
    getItems: function() {
      return this.items.concat();
    },
    
    setItems: function(items) {
      this.items = items;
    
      this.onChange.fire(this);
    },
    
    hasItem: function(item) {
      return artjs.Array.includes(this.items, item);
    },
    
    setPointerAtItem: function(item) {
      if (!this.hasItem(item)) {
        artjs.p("{List} There is no item " + item + " in List!");
        return;
      }
    
      this.setPointer(this.getItemIndex(item));
    },
    
    reset: function() {
      this.i = 0;
    },
    
    getPointer: function() {
      return this.i;
    },
    
    setPointer: function(i) {
      this.i = i;
    },
    
    decrease: function() {
      this.i--;
    },
    
    increase: function() {
      this.i++;
    },
    
    getCurrent: function() {
      return this.getItemAt(this.i);
    },
    
    getPrevious: function() {
      return this.getItemAt(this.i - 1);
    },
    
    getNext: function() {
      return this.getItemAt(this.i + 1);
    },
    
    getFirst: function() {
      return artjs.Array.first(this.items);
    },
    
    getLast: function() {
      return artjs.Array.last(this.items);
    },
  
    isEmpty: function() {
      return artjs.Array.isEmpty(this.items);
    },
    
    isLast: function() {
      return this.i == (this.getLength() - 1);
    },
    
    toString: function() {
      return this.items.toString();
    }
  }
);
artjs.Queue = artjs.data.Queue = artjs.Class(
  function(data) {
    this.onChange = new artjs.Event('Queue::onChange');
    this.list = new artjs.List(data);
    this.list.onChange.add(artjs.$D(this, '_onChange'));
  },
  {
    _onChange: function() {
      this.onChange.fire(this);
    },
  
    addItem: function(item) {
      return this.list.addItem(item);
    },
    
    getItem: function() {
      var item = this.list.getItemAt(0);
      
      this.list.removeItemAt(0);
      
      return item;
    },
    
    setData: function(data) {
      this.list = new artjs.List(data);
    },
    
    getLength: function() {
      return this.list.getLength();
    },
  
    isEmpty: function() {
      return this.list.isEmpty();
    },
    
    toString: function() {
      return this.list.toString();
    }
  }
);
artjs.Channel = artjs.events.Channel = artjs.Class(
  function(name) {
    this._name = name;
    this._events = {};
  },
  {
    register: function(id) {
      this._events[id] = new artjs.Event(id);
    },
    
    addListener: function(id, delegate) {
      this._getEvent(id).add(delegate);
    },
    
    removeListener: function(id, delegate) {
      this._getEvent(id).remove(delegate);
    },
    
    fire: function(id, data) {
      this._getEvent(id).fire(data);
    },
    
    getEvents: function() {
      return this._events;
    },
    
    toString: function() {
      return this._name;
    },
    
    _getEvent: function(id) {
      var result = this._findEvent(id);
      
      if (!result) {
        this.register(id);
        
        result = this._findEvent(id);
      }
      
      return result;
    },
    
    _findEvent: function(id) {
      return this._events[id];
    }
  }
);
artjs.Clock = artjs.events.Clock = artjs.Class(
  function(interval, repeat) {
    this._interval = interval;
    this._repeat = repeat;
    this._id = null;
    this._counter = 0;
    this._tickDC = artjs.$DC(this, '_tick'); 
    this.onChange = new artjs.Event('Clock:onChange');
    this.onComplete = new artjs.Event('Clock:onComplete');
  }, 
  {
    start: function(now) {
      this.stop();
      this.resume(now);
    },
    
    stop: function() {
      this.pause();
      
      this._counter = 0;
    },
    
    pause: function() {
      clearInterval(this._id);
      this._id = null;
    },
    
    resume: function(now) {
      this._id = setInterval(this._tickDC, this._interval);
      
      if (now) {
        this._tick();
      }
    },
    
    isRunning: function() {
      return (this._id !== null);
    },
    
    _tick: function() {
      this._counter++;
      this.onChange.fire(this);
      
      if (this._counter == this._repeat) {
        this.stop();
        this.onComplete.fire(this);
      }
    }
  }
);
artjs.ElementEvent = artjs.events.Element = artjs.Class(
  function(element, name, delegate) {
    this._element = element;
    this._delegate = delegate;
    
    element.addEventListener(name, artjs.$DC(this, '_onEvent'), false);
  },
  {
    getElement: function () {
      return this._element;
    },
    
    getTargets: function(e, over) {
      if (e.target) {
        return {origin: e.target, current: e.currentTarget, related: e.relatedTarget};
      }
      else {
        var originRelated = [e.fromElement, e.toElement];

        if (over) originRelated.reverse();

        return {origin: originRelated[0], current: this._element, related: originRelated[1]};
      }
    },
    
    _onEvent: function(e) {
      this._delegate.invoke(e, this);
    }
  }
);

artjs.MouseEvent = artjs.events.Mouse = artjs.Class(
  function(element, name, delegate, on) {
    this.super(element, name, delegate);

    this.over = false;
    this.on = on;
  },
  {
    _onEvent: function(e) {
      if (this._edge(e) && !(this.on == this.over)) {
        this.over = this.on;
        this.super(e);
      }
    },
    
    _edge: function(e) {
      var targets = this.getTargets(e, this.on);
      var t = targets.origin;
      var ct = targets.current;
      var rt = targets.related;
      var s = artjs.Selector;
      
      return (t == ct) && !s.isDescendantOf(rt, ct) || s.isDescendantOf(t, ct) && !s.isSelfOrDescendantOf(rt, ct);
    }
  }, null, artjs.ElementEvent
);

artjs.AbstractClickEvent = artjs.events.AbstractClick = artjs.Class(
  function(element, name, delegate, selector) {
    this.super(element, name, delegate);
    
    this._selector = selector;
  }, 
  {
    _onEvent: function(e) {
      if (!this._selector || this._matchesSelector(e)) {
        this.super(e);
      }
    },
    
    _matchesSelector: function(e) {
      var elements = artjs.$findAll(this._element, this._selector);

      return artjs.Array.contains(elements, e.target);
    }
  }, null, artjs.ElementEvent
);

artjs.ClickEvent = artjs.events.Click = artjs.Class(
  function(element, delegate, selector) {
    this.super(element, 'click', delegate, selector);
  },
  null,
  null,
  artjs.AbstractClickEvent
);
  
artjs.DoubleClickEvent = artjs.events.DoubleClick = artjs.Class(
  function(element, delegate, selector) {
    this.super(element, 'dblclick', delegate, selector);
  },
  null,
  null,
  artjs.AbstractClickEvent
);

artjs.KeyEvent = artjs.events.Key = artjs.Class(
  function(element, delegate, key) {
    this.super(element, 'keydown', delegate);
    
    this._key = key;
  }, 
  {
    _onEvent: function(e) {
      var char = e.which || e.keyCode;
      
      if (!this._key || this._key == char) {
        this.super(e);
      }
    }
  }, null, artjs.ElementEvent
);

artjs.MouseMoveEvent = artjs.events.MouseMove = artjs.Class(
  function(element, delegate) {
    this.super(element, 'mousemove', delegate);
  }, null, null, artjs.ElementEvent
);

artjs.MouseOverEvent = artjs.events.MouseOver = artjs.Class(
  function(element, delegate) {
    this.super(element, 'mouseover', delegate, true);
  }, null, null, artjs.MouseEvent
);

artjs.MouseOutEvent = artjs.events.MouseOut = artjs.Class(
  function(element, delegate) {
    this.super(element, 'mouseout', delegate);
  }, null, null, artjs.MouseEvent
);

artjs.ChangeEvent = artjs.events.Change = artjs.Class(
  function(element, delegate) {
    this.super(element, 'change', delegate);
  }, null, null, artjs.ElementEvent
);

artjs.BlurEvent = artjs.events.Blur = artjs.Class(
  function(element, delegate) {
    this.super(element, 'blur', delegate);
  }, null, null, artjs.ElementEvent
);

artjs.EventMapping = {
  mousemove: 'MouseMoveEvent',
  mouseover: 'MouseOverEvent',
  mouseout: 'MouseOutEvent',
  click: 'ClickEvent',
  dblclick: 'DoubleClickEvent',
  change: 'ChangeEvent',
  keydown: 'KeyEvent',
  blur: 'BlurEvent'
};

artjs.on = function(eventName, target, delegate, selectorOrKey) {
  return new artjs[artjs.EventMapping[eventName]](target, delegate, selectorOrKey);
};
artjs.Timeline = artjs.events.Timeline = artjs.Class(
  null, 
  {
    mark: function() {
      this._t2 = artjs.Date.getTime();
      
      var interval = this._t2 - (this._t1 || this._t2);
      
      this._t1 = this._t2;
      
      return interval;
    }
  }
);
artjs.Timeout = artjs.events.Timeout = artjs.Class(
  function(delay) {
    artjs.$BA(this);
    
    this._delay = delay;
    this.onComplete = new artjs.Event('Timeout:onComplete');
  }, 
  {
    start: function() {
      this._id = setTimeout(this._onTimeout, this._delay);
    },
    
    isRunning: function() {
      return (this._id !== null);
    },
    
    getDelay: function() {
      return this._delay;
    },
    
    _onTimeout: function() {
      delete this._id;
      
      this.onComplete.fire(this);
    }
  },
  {
    fire: function(delegate, delay) {
      var instance = new this(delay);
      
      instance.onComplete.add(delegate);
      instance.start();
      
      return instance;
    },
    
    defer: function(delegate) {
      return this.fire(delegate, 0);
    }
  }
);
artjs.Model = artjs.model.Base = artjs.Class(
  function() {
    this._channel = new artjs.Channel('Model channel');
    this.onChange = new artjs.Event('Model::onChange');
  },
  {
    addProperties: function(props) {
      var properties = artjs.Object.mapValue(props, this._toProperty, this);
      
      Object.defineProperties(this, properties);
      
      artjs.Object.each(props, this._setProperty, this);
    },
    
    addProperty: function(prop, value) {
      Object.defineProperty(this, prop, this._toProperty(prop));
      
      this._setProperty(prop, value);
    },
    
    addPropertyListener: function(prop, delegate, fire) {
      this._channel.addListener(prop, delegate);
      
      if (fire) {
        this._channel.fire(prop, {newValue: this.getProperty(prop)});
      }
    },
    
    getChannel: function() {
      return this._channel;
    },
    
    getProperty: function(prop) {
      return this[this.ctor.toPrivate(prop)];
    },
    
    onPropertyChange: function(prop, value, oldValue) {
      this._channel.fire(prop, {newValue: value, oldValue: oldValue});
      this.onChange.fire(this, prop, value, oldValue);
    },
    
    removePropertyListener: function(prop, delegate) {
      this._channel.removeListener(prop, delegate);
    },
    
    setProperties: function(props) {
      artjs.Object.each(props, this.setProperty, this);
    },
    
    setProperty: function(prop, value) {
      this._setProperty(this.ctor.toPrivate(prop), value);
    },
    
    _createGetter: function(name) {
      var result = function() {
        return this.getProperty(arguments.callee.prop);
      };
      
      result.prop = name;
      
      return result;
    },
    
    _createSetter: function(name) {
      var result = function(value) {
        var prop = arguments.callee.prop;
        var oldValue = this.getProperty(prop);

        this.setProperty(prop, value);
        
        this.onPropertyChange(prop, value, oldValue);
      };
      
      result.prop = name;
      
      return result;
    },
    
    _setProperty: function(prop, value) {
      this[prop] = value;
    },
    
    _toProperty: function(name) {
      return {
        configurable: false,
        enumerable: true,
        get: this._createGetter(name),
        set: this._createSetter(name)
      };
    }
  },
  {
    toPrivate: function(i) {
      return '_' + i;
    }
  }
);
artjs.ListModel = artjs.model.List = artjs.Class(
  function() {
    this.super();
    
    this.addProperty('items', []);
    this.addPropertyListener('items', artjs.$D(this, '_onItemsChange'));
    this._onItemChangeDelegate = artjs.$D(this, '_onItemChange');
    this.onItemChange = new artjs.Event('ListModel::onItemChange');
    this.onItemAdd = new artjs.Event('ListModel::onItemAdd');
    this.onItemRemove = new artjs.Event('ListModel::onItemRemove');
  },
  {
    addItem: function(item) {
      this._listenItem(item);
      
      var result = this.items.push(item);
      
      this.onItemAdd.fire(this, item);
      
      return result;
    },
    
    removeItem: function(item) {
      item.onChange.remove(this._onItemChangeDelegate);

      var result = artjs.Array.removeItem(this.items, item, true);
      
      this.onItemRemove.fire(this, item);
      
      return result;
    },
    
    _listenItem: function(item) {
      item.onChange.add(this._onItemChangeDelegate);
    },
    
    _onItemChange: function(item, property) {
      this.onItemChange.fire(this, item, property);
    },
    
    _onItemsChange: function() {
      artjs.Array.each(this.items, this._listenItem, this);
    }
  },
  null,
  artjs.Model
);
artjs.LocalStorage = artjs.model.LocalStorage = artjs.Class(
  function(namespace) {
    this._namespace = namespace;
  },
  {
    getItem: function(name) {
      var key = this._getKey(name);
      
      return JSON.parse(localStorage.getItem(key));
    },
    
    getNamespace: function() {
      return this._namespace;
    },
    
    setItem: function(name, value) {
      var key = this._getKey(name);
      
      if (artjs.Object.isNull(value)) {
        localStorage.removeItem(key);
      }
      else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    
    _getKey: function(name) {
      return this.getNamespace() + ':' + name;
    }
  }
);
artjs.TransitionBase = artjs.transition.Base = artjs.Class(
  function(property, element, value, duration, type, delay, from) {
    this._onDeferredDelegate = artjs.$D(this, '_onDeferred');
    
    this.property = property;
    this.element = element;
    this.duration = artjs.Object.getDefault(duration, 1);
    this.value = value;
    this.type = type || this.ctor.LINEAR;
    this.delay = delay || 0;
    this.from = from;
  },
  {
    run: function() {
      if (artjs.Object.isPresent(this.from)) {
        this._setEffectStyle('none');
        this._setStyle(this.from);
      }
      
      artjs.Timeout.fire(this._onDeferredDelegate, 100);
    },
    
    _onDeferred: function() {
      this._setEffectStyle(this.property);
      this._setStyle(this.value);
    },
    
    _setStyle: function(value) {
      artjs.Element.setStyle(this.element, this.property, value);
    },
    
    _setEffectStyle: function(prop) {
      var effectStyle = artjs.Element.transitionStyle(prop, this.duration, this.type, this.delay);

      artjs.Element.extendStyle(this.element, effectStyle);
    }
  },
  {
    LINEAR: 'linear',
    EASE: 'ease',
    EASE_IN: 'ease-in',
    EASE_IN_OUT: 'ease-in-out',
    EASE_OUT: 'ease-out',
    
    run: function (e, value, duration, type, delay, from) {
      var instance = new this(e, value, duration, type, delay, from);
      
      instance.run();
    }
  }
);
artjs.Blind = artjs.transition.Blind = artjs.Class(
  function(element, value, duration, type, delay, from) {
    this.super('height', element, value, duration, type, delay, from);
  },
  {
    _setStyle: function(value) {
      this.super(value + 'px');
      
      artjs.Element.setStyle(this.element, 'overflow', 'hidden');
    }
  },
  {
    toggle: function (e, value, duration, type, delay) {
      var v = e.style.height == '0px' ? value : 0;
      
      this.run(e, v, duration, type, delay);
    }
  },
  artjs.TransitionBase
);
artjs.Fade = artjs.transition.Fade = artjs.Class(
  function(element, value, duration, type, delay, from) {
    this.super('opacity', element, value, duration, type, delay, from);
  },
  null,
  null,
  artjs.TransitionBase
);
artjs.BaseMatcher = artjs.spec.matcher.Base = artjs.Class(
  function(expected, toText) {
    this.expected = expected;
    this.toText = toText || 'be';
  },
  {
    resolve: function(actual) {
      return actual.value === this.expected;
    },
    
    _failureData: function(actual) {
      var result = [String(actual.value), 'expected to', this.toText, String(this.expected)];
      
      if (actual.not) {
        result.splice(2, 0, 'not');
      }
      
      return result;
    },

    failureText: function(actual) {
      return this._failureData(actual).join(' ');
    }
  }
);
artjs.AMatcher = artjs.spec.matcher.A = artjs.Class(
  function(expected) {
    this.super(expected);
  },
  {
    resolve: function(actual) {
      return typeof actual.value === this.expected;
    }
  },
  null,
  artjs.BaseMatcher
);
artjs.ContainMatcher = artjs.spec.matcher.Contain = artjs.Class(
  function(expected) {
    this.super(expected, 'contain');
  },
  {
    resolve: function(actual) {
      return artjs.Array.contains(actual.value, this.expected);
    }
  },
  null,
  artjs.BaseMatcher
);
artjs.EqMatcher = artjs.spec.matcher.Eq = artjs.Class(
  function(expected) {
    this.super(expected, 'equal');
  },
  {
    resolve: function(actual) {
      if (artjs.Object.isArray(actual.value)) {
        return artjs.Array.equal([actual.value, this.expected]);
      }
      else {
        return this.super(actual);
      }
    }
  },
  null,
  artjs.BaseMatcher
);
artjs.FalseMatcher = artjs.spec.matcher.False = artjs.Class(
  function() {
    this.super(false);
  },
  null,
  null,
  artjs.BaseMatcher
);
artjs.NullMatcher = artjs.spec.matcher.Null = artjs.Class(
  function() {
    this.super(null);
  },
  null,
  null,
  artjs.BaseMatcher
);
artjs.ReceiveMatcher = artjs.spec.matcher.Receive = artjs.Class(
  function(expected) {
    this.super(expected, 'receive');
  },
  {
    resolve: function(actual) {
      this.receiver = new artjs.SpecReceiver(this, actual);
      
      return this.receiver;
    },
    
    _isFailed: function(result) {
      return !result.success;
    },
    
    _failureData: function(actual) {
      var result = this.super(actual);
      var results = this.receiver.getResults();
      var times = this.receiver.getTimes();
      
      if (artjs.Object.isPresent(times)) {
        var success = artjs.Array.reject(results, this._isFailed);
        
        result.push(times + ' times, but was ' + success.length);
      }
      else {
        var failure = artjs.Array.detect(results, this._isFailed);
        
        if (failure) {
          result.push(
            'with' + this._argsString(failure.args.expected) 
            + ', but was ' +  this._argsString(failure.args.actual)
          );
        }
      }
      
      return result;
    },
    
    _mapArgs: function(i) {
      return '[' + i.join(', ') + ']';
    },
    
    _argsString: function(args) {
      return '(' + (this.receiver.isInSeries() ? artjs.Array.map(args, this._mapArgs, this) : args).join(', ') + ')';
    }
  },
  null,
  artjs.BaseMatcher
);
artjs.TrueMatcher = artjs.spec.matcher.True = artjs.Class(
  function() {
    this.super(true);
  },
  null,
  null,
  artjs.BaseMatcher
);
artjs.BaseSpecNode = artjs.spec.node.Base = artjs.Class(
  function(facet, body, focus) {
    this.facet = facet;
    this.body = body;
    this.focus = Boolean(focus);
  },
  {
    register: function() {
      artjs.Spec.updateFocus(this.focus);
    },
    
    execute: function() {
      this.ctor.execute(this);
    },
    
    toString: function() {
      return this.facet.toString();
    }
  },
  {
    _path: [],
    
    getPath: function() {
      return this._path;
    },
    
    execute: function(node) {
      this._path.push(node);
      node.body();
      this._cleanTrailingBefores();
      this._path.pop()
    },
    
    _cleanTrailingBefores: function() {
      var item;
      
      while ((item = artjs.Array.last(this._path)) && (item.ctor == artjs.Before)) {
        this._path.pop();
      }
    }
  }
);
artjs.AutoExecNode = artjs.spec.node.AutoExec = artjs.Class(
  null, 
  {
    register: function() {
      this.super();
      
      this.execute();
    }
  }, 
  null, 
  artjs.BaseSpecNode
);
artjs.Before = artjs.spec.node.Before = artjs.Class(
  function(body) {
    this.super('before', body, false);
  }, 
  {
    register: function() {
      if (artjs.Spec.isRealRun()) {
        this.ctor.getPath().push(this);
      }
    }
  }, 
  null, 
  artjs.AutoExecNode
);
artjs.Context = artjs.spec.node.Context = artjs.Class(
  null, 
  null, 
  null, 
  artjs.AutoExecNode
);
artjs.Describe = artjs.spec.node.Describe = artjs.Class(
  null, 
  null, 
  null, 
  artjs.AutoExecNode
);
artjs.It = artjs.spec.node.It = artjs.Class(
  function(facet, body, focus) {
    this.super(facet, body, focus);
    
    this._results = [];
  }, 
  {
    register: function() {
      this.super();
      
      this.ctor.instances.push(this);
    },
    
    execute: function() {
      artjs.Spec.setCurrentTest(this);
      
      this._path = this.ctor.getPath().concat();
      
      if (artjs.Spec.isRealRun()) {
        if (!artjs.Spec.hasFocus() || this.hasFocus()) {
          this._receivers = [];
          
          this._runBefores();
          
          this.super();
          
          artjs.Array.each(this._receivers, this._testReceiver, this);
          
          artjs.Spec.getRunner().testComplete();
        }
      }
    },
    
    pushResult: function(result) {
      this._results.push(result);
    },
    
    isSuccess: function() {
      return artjs.Array.all(artjs.Array.pluck(this._results, 'value'));
    },
    
    failureText: function() {
      return artjs.Array.detect(this._results, this._isFailedResult).failureText();
    },
    
    pushReceiver: function(receiver) {
      this._receivers.push(receiver);
    },
    
    getPath: function() {
      return this._path;
    },
    
    _isFailedResult: function(result) { 
      return !result.value; 
    },
    
    _testReceiver: function(receiver) {
      var result = receiver.getResult();
      
      this.pushResult(result);
      
      receiver.rollback();
    },
    
    hasFocus: function() {
      return artjs.Array.any(artjs.Array.pluck(this._path, 'focus')) || this.focus;
    },
    
    _runBefores: function() {
      var instances = artjs.Array.select(this._path, this.ctor._isBefore);
      
      artjs.Array.invoke(instances, 'execute');
    }
  }, 
  {
    instances: [],
    
    resetInstances: function() {
      this.instances = [];
    },
    
    instancesWithFocus: function() {
      return artjs.Array.select(this.instances, this._hasFocus, this);
    },
    
    getRunInstances: function() {
      return artjs.Spec.hasFocus() ? this.instancesWithFocus() : this.instances;
    },
    
    _hasFocus: function(instance) {
      return instance.hasFocus();
    },
    
    _isBefore: function(i) {
      return i.ctor == artjs.Before;
    }
  }, 
  artjs.AutoExecNode
);
artjs.Specify = artjs.spec.node.Specify = artjs.Class(
  null, 
  {
    register: function() {
      this.super();
      
      this.ctor.instances.push(this);
    },
    
    execute: function() {
      artjs.Spec.setSubject(this.facet);
      
      this.super();
    }
  },
  {
    instances: []
  }, 
  artjs.BaseSpecNode
);
artjs.BaseSpecRunner = artjs.spec.runner.Base = artjs.Class(
  function() {
    this._it = undefined;
  },
  {
    run: function() {
      artjs.Array.invoke(artjs.Specify.instances, 'execute');
    },
    
    setSubject: function(subject) {
      this._subject = subject;
    },
    
    getSubject: function() {
      return this._subject;
    },
    
    setCurrentTest: function(it) {
      this._it = it;
    },
    
    getCurrentTest: function() {
      return this._it;
    }
  }
);
artjs.RealSpecRunner = artjs.spec.runner.Real = artjs.Class(
  function() {
    this._duration = undefined;
    this._timeline = new artjs.Timeline();
    this._subject = undefined;
    this.onComplete = new artjs.Event('artjs.SpecRunner::onComplete');
    this.onItComplete = new artjs.Event('artjs.SpecRunner::onItComplete');
  },
  {
    run: function () {
      this._timeline.mark();

      this.super();

      this._duration = this._timeline.mark();

      this.onComplete.fire(this);
    },

    getDuration: function() {
      return this._duration;
    },
    
    pushResult: function(result) {
      this._it.pushResult(result);
    },
    
    testComplete: function() {
      this.onItComplete.fire(this);
    }
  },
  null,
  artjs.BaseSpecRunner
);
artjs.DrySpecRunner = artjs.spec.runner.Dry = artjs.Class(
  null,
  null,
  null,
  artjs.BaseSpecRunner
);
artjs.BaseSpecView = artjs.spec.view.Base = artjs.Class(
  null,
  {
    beforeRun: function() {
    },
    
    afterDryRun: function() {
    }
  }
);
artjs.BrowserSpecView = artjs.spec.view.Browser = artjs.Class(
  function(container) {
    this.super();
    
    this._container = container || document.body;
    this._runnerTemplate = artjs.$C('div', {className: 'runner'});
    this._testTemplate = artjs.$C('span', {className: 'test'});
    this._resultsTemplate = artjs.$C('div', {className: 'results'});
  },
  {
    beforeRun: function() {
      this.super();
      
      this._element = artjs.$I(this._container, this._runnerTemplate);
      this._resultsElement = artjs.$I(this._container, this._resultsTemplate);
    },
    
    onItComplete: function(runner) {
      var success = runner.getCurrentTest().isSuccess();
      
      artjs.Element.setContent(this._testTemplate, success ? '.' : 'F');
      this._testTemplate.className = success ? 'success' : 'failure';
      artjs.Element.insert(this._element, this._testTemplate);
    },
    
    onComplete: function(runner) {
      var its = artjs.It.getRunInstances();
      var duration = runner.getDuration();
      var failures = artjs.Array.reject(its, this._isSuccess);
      var success = artjs.Array.isEmpty(failures);
      var classNames = ['results'];
      var n = its.length;
      var k = failures.length;
      
      classNames.push(success ? 'success' : 'failure');
      
      this._resultsTemplate.className = classNames.join(' ');
      
      var resultText = success ? 'Success!' : 'Failure!';
      var statsText = success
        ? n + ' tests in total.'
        : k + ' tests failed of ' + n + ' total.';
      var durationText = 'Duration: ' + artjs.Date.msToHMSM(duration);
      var resultElement = artjs.$E('p', {className: 'result'}, resultText);
      var statElement = artjs.$E('p', {className: 'stat'}, statsText + '<br/>' + durationText);
      
      artjs.$I(this._resultsElement, resultElement);
      artjs.$I(this._resultsElement, statElement);
      
      if (!success) {
        var list = artjs.$E('ul');
        
        this._getFailureHtml.list = list;
        
        artjs.Array.each(failures, this._getFailureHtml, this);
        
        artjs.$I(this._resultsElement, list);
      }
    },
    
    _isSuccess: function(it) { 
      return it.isSuccess(); 
    },
    
    _getFailureHtml: function(it) {
      var path = artjs.Array.map(it.getPath(), this._nodeToString).join(' ');
      var info = it.failureText();
      var pathElement = artjs.$E('p', {className: 'path'}, path);
      var infoElement = artjs.$E('p', {className: 'info'}, info);
      var item = artjs.$E('li');
      
      artjs.$I(item, pathElement);
      artjs.$I(item, infoElement);
      artjs.$I(arguments.callee.list, item);
    },
    
    _nodeToString: function(i) {
      var facet = i.facet;
      
      return typeof(facet) == 'string' ? facet : facet._name;
    }
  },
  {
    run: function(container) {
      var view = new this(container);
  
      artjs.Spec.init(view);
      artjs.Spec.run();
    }
  },
  artjs.BaseSpecView
);
artjs.Actual = artjs.spec.Actual = artjs.Class(
  function(value) {
    this.value = value;
    this.not = false;
  },
  {
    to: function(matcher) {
      var value = matcher.resolve(this);
      
      if (typeof value == 'boolean')  {
        artjs.Spec.pushResult(new artjs.SpecResult(this, matcher, Boolean(this.not ^ value)));
      }
      else {
        artjs.Spec.pushReceiver(value);
      }
      
      return value;
    },
    
    toNot: function(matcher) {
      this.not = true;
      
      return this.to(matcher);
    }
  }
);
artjs.SpecApi = artjs.spec.Api = {
  register: function(type, facet, body, focus) {
    var node = new type(facet, body, focus);
    
    node.register();
    
    return node;
  }
};

function spec(facet, body, focus) {
  return artjs.SpecApi.register(artjs.Specify, facet, body, focus);
}

function describe(facet, body, focus) {
  return artjs.SpecApi.register(artjs.Describe, facet, body, focus);
}

function context(facet, body, focus) {
  return artjs.SpecApi.register(artjs.Context, facet, body, focus);
}

function it(facet, body, focus) {
  return artjs.SpecApi.register(artjs.It, facet, body, focus);
}

function before(body) {
  return artjs.SpecApi.register(artjs.Before, body);
}

function eq(expected) {
  return new artjs.EqMatcher(expected);
}

function beA(expected) {
  return new artjs.AMatcher(expected);
}

function beTrue() {
  return new artjs.TrueMatcher();
}

function beFalse() {
  return new artjs.FalseMatcher();
}

function beNull() {
  return new artjs.NullMatcher();
}

function contain(value) {
  return new artjs.ContainMatcher(value);
}

function receive(expected) {
  return new artjs.ReceiveMatcher(expected);
}

function expect(value) {
  return new artjs.Actual(value);
}

function mock() {
  return new artjs.Mock(artjs.$A(arguments));
}

function subject() {
  return artjs.Spec.getSubject();
}

/* focused */
function sspec(facet, body) {
  return spec(facet, body, true);
}

function ddescribe(facet, body, focus) {
  return describe(facet, body, true);
}

function ccontext(facet, body, focus) {
  return context(facet, body, true);
}

function iit(facet, body, focus) {
  return it(facet, body, true);
}
/* end */
artjs.Mock = artjs.spec.Mock = artjs.Class(
  function(stubs) {
    artjs.Array.each(stubs, this.extend, this);
  },
  {
    extend: function(stub) {
      this[stub] = function() {};
    },
    
    toString: function() {
      return this.ctor.toString();
    }
  },
  {
    _name: 'Mock',
    
    toString: function() {
      return this._name;
    }
  }
);
artjs.SpecReceiver = artjs.spec.Receiver = artjs.Class(
  function(matcher, actual) {
    this._matcher = matcher;
    this._actual = actual;
    
    var actualValue = this._actual.value;
    var expected = this._matcher.expected;
    var dc = artjs.$DC(this, 'resolve');
    
    if (!this._isForMock()) {
      this._original = artjs.$D(actualValue, expected);
    }
    
    actualValue[expected] = dc;
    
    this._results = [];
    this._times = null;
    this._args = null;
    this._callOriginal = null;
    this._inSeries = null;
  },
  {
    andCallOriginal: function() {
      var forMock = this._isForMock();
      
      if (forMock) {
        artjs.log('WARNING: Using "andCallOriginal" for mock has no result.');
      }
      
      this._callOriginal = !forMock;
      
      return this;
    },
    
    andReturn: function(returnValue) {
      this._returnValue = returnValue;
  
      return this;
    },
    
    getResult: function() {
      var successfulResults = artjs.Array.select(artjs.Array.pluck(this._results, 'success'));
      var value = this._times == null 
        ? artjs.Array.isNotEmpty(successfulResults) 
        : (this._times == successfulResults.length);
      
      return new artjs.SpecResult(this._actual, this._matcher, Boolean(this._actual.not ^ value));
    },
    
    getResults: function() {
      return this._results;
    },
    
    getTimes: function() {
      return this._times;
    },
    
    inSeries: function() {
      this._inSeries = true;
      
      return this;
    },
    
    isInSeries: function() {
      return this._inSeries;
    },
    
    once: function() {
      this.times(1);
      
      return this;
    },
    
    resolve: function() {
      var args = artjs.$A(arguments);
      
      if (this._args == null) {
        this._results.push({success: true});
      }
      else {
        var expectedArgs = this._inSeries ? this._args[this._results.length] : this._args;
        
        if (artjs.Array.equal([args, expectedArgs])) {
          this._results.push({success: true});
        }
        else {
          this._results.push({success: false, args: {actual: args, expected: expectedArgs}});
        }
      }
      
      var result;
      
      if (this._callOriginal) {
        this._original.args = args;
        result = this._original.invoke();
      }
      else {
        result = this._returnValue;
      }
      
      return result;
    },
    
    rollback: function() {
      if (!this._isForMock()) {
        this._actual.value[this._matcher.expected] = this._original.method;
      }
    },
    
    twice: function() {
      this.times(2);
  
      return this;
    },
    
    times: function(n) {
      this._times = n;
  
      return this;
    },
    
    withArgs: function() {
      this._args = artjs.$A(arguments);
  
      return this;
    },
    
    _isForMock: function() {
      return this._actual.value instanceof artjs.Mock;
    }
  }
);
artjs.SpecResult = artjs.spec.Result = artjs.Class(
  function(actual, matcher, value) {
    this.actual = actual;
    this.matcher = matcher;
    this.value = value;
  },
  {
    failureText: function() {
      return this.matcher.failureText(this.actual);
    }
  }
);
artjs.Spec = artjs.spec.Spec = {
  init: function(view) {
    this._dryRunner = new artjs.DrySpecRunner();
    this._realRunner = new artjs.RealSpecRunner();
    this._realRunner.onComplete.add(artjs.$D(view, 'onComplete'));
    this._realRunner.onItComplete.add(artjs.$D(view, 'onItComplete'));
    this._view = view;
  },
  
  run: function() {
    this._view.beforeRun();
    
    this._runner = this._dryRunner;
    this._runner.run();
    
    this._view.afterDryRun();

    artjs.It.resetInstances();

    this._runner = this._realRunner;
    this._runner.run();
  },

  getRunner: function() {
    return this._runner;
  },
  
  isRealRun: function() {
    return this.getRunner() == this._realRunner;
  },
  
  updateFocus: function(focus) {
    this._hasFocus = this._hasFocus || focus;
  },
  
  hasFocus: function() {
    return this._hasFocus;
  },
  
  getSubject: function() {
    return this.getRunner().getSubject();
  },
  
  pushResult: function(result) {
    this.getRunner().pushResult(result);
  },
  
  pushReceiver: function(receiver) {
    return this.getRunner().getCurrentTest().pushReceiver(receiver);
  },
  
  setSubject: function(subject) {
    this.getRunner().setSubject(subject);
  },
  
  setCurrentTest: function(it) {
    this.getRunner().setCurrentTest(it);
  }
};
artjs.TemplateBase = artjs.template.Base = {
  /**
   * @param content (String) - Html that can contain expressions that can be compiled
   * @param scope (Object) - data that will be compiled into the content
   * @description Renders content into the element with the scope
   */
  render: function(content, scope) {
    return artjs.TemplateCompiler.compile(content, scope);
  },
  
  /**
   * @param element (Element) - container for rendered content
   * @param content (String) - Html that can contain expressions that can be compiled
   * @param scope (Object) - data that will be compiled into the content
   * @description Renders content into the element with the scope
   */
  renderInto: function(element, content, scope) {
    content = this.render(content, scope);
    
    artjs.Element.setContent(element, content);
    
    this.evalScripts(element);
    
    artjs.ComponentScanner.scan(element);
  },
  
  renderOnto: function(element, content, scope) {
    content = this.render(content, scope);
    
    element = artjs.Element.replace(artjs.ElementBuilder.parse(content), element);
    
    if (artjs.Element.toTagString(element) == 'script') {
      this.evalScript(element);
    }
    else {
      this.evalScripts(element);
    }
    
    artjs.ComponentScanner.scan(element);
  },

  /**
   * 
   * @param element (Element) - container for rendered content
   * @param scope (Object) - data that will be compiled into the content
   * 
   * @description Renders internals of the element into itself with scope
   */
  renderElement: function(element, scope) {
    this.renderInto(element, element.innerHTML, scope);
  },
  
  /**
   * 
   * @param element (Element) - container for rendered content
   * @param templateId (String) - id of the template to render
   * @param scope (Object) - data that will be compiled into the template
   * @description Compiles and renders template into the element.
   */
  renderTemplateInto: function(element, templateId, scope) {
    var template = artjs.TemplateLibrary.getTemplate(templateId);
    
    this.renderInto(element, template, scope);
  },
  
  evalScripts: function(element) {
    artjs.Array.each(artjs.Selector.findAll(element, 'script'), this.evalScript, this);
  },
  
  evalScript: function(script) {
    eval(artjs.Element.getContent(script));
  }
};
artjs.TemplateCompiler = artjs.template.Compiler = artjs.Class(
  function(content, scope) {
    this._tagRegEx = /\{\{[^{}]+\}\}/g;
    this._methodRegEx = /^(\w+)\((.*)\)$/;
    this._content = content;
    this._scope = scope || {};
  },
  {
    compile: function() {
      var tags = this._content.match(this._tagRegEx);
      
      artjs.Array.each(tags, this._eachTag, this);
      
      return this._content;
    },
    
    _eachChar: function(char, idx) {
      var inOpening = artjs.Object.isPresent(this._openingQuoteIndex);
      
      if (char == "'") {
        this._openingQuoteIndex = inOpening ? null : idx;
      }
      else if (char == ',' && !inOpening) {
        this._pushToArguments(this._argumentIndex, idx);
        this._argumentIndex = idx + 1;
      }
    },
    
    _eachTag: function(i) {
      var expression = artjs.String.sub(i, 2, -2);
      var result = this._parseExpression(expression);
      
      this._content = this._content.replace(i, result);
    },
    
    _parseArguments: function(argsStr) {
      this._argsStr = argsStr;
      this._arguments = [];
      this._argumentIndex = 0;
      
      for (var i = 0; i < argsStr.length; i++) {
        this._eachChar(argsStr[i], i);
      }
      
      this._pushToArguments(this._argumentIndex, i);
      
      var args = artjs.Array.map(this._arguments, this._trimArg, this);
      
      return artjs.Array.map(args, this._parseArgument, this);
    },
    
    _parseArgument: function(i) {
      var first = artjs.String.first(i);
      var last = artjs.String.last(i);
      
      if (first == "'" && last == "'" || first == '"' && last == '"') {
        return i.substr(1, i.length - 2);
      }
      else {
        return this._parseExpression(i);
      }
    },
      
    _parseExpression: function(expression) {
      this._methodRegEx.lastIndex = 0;
      
      var exec = this._methodRegEx.exec(expression);
      
      return exec ? this._parseMethod(exec) : this._fromScope(expression);
    },
    
    _parseMethod: function(exec) {
      exec.shift();
      
      var action = exec.shift();
      var delegate = artjs.$D(artjs.TemplateHelpers, action);
      
      if (!delegate.method) { throw 'Trying to call unregistered "' + action + '" helper'; }
      
      var argsStr = artjs.Array.first(exec);
      
      delegate.args = this._parseArguments(argsStr);
      
      return delegate.invoke();
    },
    
    _pushToArguments: function(i, j) {
      this._arguments.push(this._argsStr.substring(i, j));
    },
    
    _fromScope: function(i) {
      return artjs.String.toS(this._scope[i]);
    },
    
    _trimArg: function(i) {
      return artjs.String.trim(i);
    }
  },
  {
    _name: 'Compiler',
    
    compile: function(content, scope) {
      var instance = new this(content, scope);
    
      return instance.compile();
    },
    
    toString: function() {
      return this._name;
    }
  }
);
artjs.TemplateHelpers = artjs.template.Helpers = {
  linkTo: function(caption, path) {
    path = artjs.Object.getDefault(path, caption);
    
    var href = (artjs.String.startsWith(path, 'http') ? '' : '#/') + path;
    
    return this.renderElement('a', {href: href}, caption);
  },
  
  render: function(templateId, scope) {
    var template = artjs.TemplateLibrary.getTemplate(templateId);
    
    return artjs.TemplateBase.render(template, scope);
  },
  
  renderInto: function(element, templateId, scope) {
    artjs.TemplateBase.renderTemplateInto(element, templateId, scope);
  },
  
  renderCollection: function(templateId, collection) {
    var callback = artjs.$DC(this, this._renderCollectionItem, false, templateId);
    
    return this._map(collection, callback);
  },
  
  renderIf: function(value, method) {
    return value ? this[method](value) : '';
  },
  
  renderSelect: function(options, selected) {
    this._selectedOption = selected;
    
    return this.renderElement('select', options, this.renderOptions(options));
  },
  
  renderOptions: function(options) {
    return this._map(options, this._renderOption);
  },
  
  renderTable: function(data) {
    var head = data.head ? this.renderElement('thead', null, this._map(data.head || [], this._renderTableHead)) : '';
    var foot = data.foot ? this.renderElement('tfoot', null, this._map(data.foot, this._renderTableFoot)) : '';
    var body = data.body ? this.renderElement('tbody', null, this._map(data.body || [], this._renderTableRow)) : '';
    
    return this.renderElement('table', null, head + foot + body);
  },
  
  renderElement: function(name, attrs, value, compile) {
    if (compile) {
      value = artjs.TemplateBase.render(value);
    }
    
    return artjs.$B(name, attrs, value).toString();
  },
  
  registerAll: function(helpers) {
    artjs.Object.each(helpers, this.register, this);
  },
  
  register: function(name, method) {
    this[name] = method;
  },
  
  renderChecked: function(checked) {
    return checked ? 'checked' : artjs.String.blank();
  },
  
  pluralize: function(n, str) {
    return artjs.String.pluralize(n, str);
  },
  
  _map: function(coll, func) {
    return artjs.Array.map(coll, func, this).join('');
  },
  
  _renderOption: function(i) {
    var attrs = {value: i.value};
    
    if (i.value == this._selectedOption) {
      attrs.selected = 'selected';
    }
    
    return this.renderElement('option', attrs, i.text);
  },
  
  _renderTableHead: function(i) {
    return this._renderTableCell('th', i);
  },
  
  _renderTableFoot: function(i) {
    return this._renderTableElement(i);
  },
  
  _renderTableRow: function(i) {
    return this.renderElement('tr', null, this._map(i, this._renderTableElement));
  },
  
  _renderTableElement: function(i) {
    return this._renderTableCell('td', i);
  },
  
  _renderTableCell: function(type, content) {
    return this.renderElement(type, null, content);
  },
  
  _renderCollectionItem: function(data, idx, arr, templateId) {
    data._index = idx;
    
    return this.render(templateId, data);
  }
};
artjs.TemplateLibrary = artjs.template.Library = {
  config: {
    PATH: '/templates',
    BASE_TEMPLATES: ['artjs/calendar'],
    TEMPLATES: []
  },
  
  _templates: {},
  
  // Returns template as a String
  getTemplate: function(id) {
    return this._templates[id];
  },
  
  // Creates new div inside templates container then loads and initializes given template
  loadTemplate: function(id) {
    artjs.TemplateBase.renderElement(
      artjs.Element.insert(
        this._templatesContainer, 
        artjs.$E('div', null, this.getTemplate(id))
      )
    );
  },
  
  init: function() {
    this.onLoad = new artjs.Event('TemplateLibrary:onLoad');
    
    this._onLoadSuccessDelegate = artjs.$D(this, '_onLoadSuccess');
    
    this._templatesToLoad = this.config.BASE_TEMPLATES.concat(this.config.TEMPLATES);
    
    artjs.Array.each(this._templatesToLoad, this._load, this);
    
    artjs.Element.hide(document.body);
    
    this._loadCheck();
  },
  
  _load: function(i) {
    var request = artjs.$get(this.config.PATH + '/' +  i + '.html', null, this._onLoadSuccessDelegate);
    
    request.id = i;
  },
  
  _onLoadSuccess: function(ajax) {
    this._templates[ajax.id] = ajax.getResponseText();
    
    this._loadCheck();
  },
  
  _loadCheck: function() {
    if (artjs.Object.keys(this._templates).length == this._templatesToLoad.length) {
      this._onAllLoaded();
    }
  },
  
  _onAllLoaded: function() {
    var body = document.body;
    
    artjs.ComponentScanner.scan(body);
    
    this._templatesContainer = artjs.Element.insert(body, artjs.$E('div', {id: 'artjs-templates'}));
    
    artjs.Element.show(body);
    
    this.onLoad.fire(this);
  }
};
artjs.Component = artjs.component.Base = artjs.Class(
  function(element) {
    this._element = element;
    this._handlers = [];
  },
  {
    getElement: function() {
      return this._element;
    },
    
    _fire: function(id) {
      artjs.Broadcaster.fire(id, this);
    },
    
    _handle: function(id, method) {
      this._handleEvent(id, method);
    },
      
    _handleEmit: function(id, method) {
      return this._handleEvent(id, method, artjs.ComponentEventHandler.UP);
    },
    
    _handleBroadcast: function(id, method) {
      return this._handleEvent(id, method, artjs.ComponentEventHandler.DOWN);
    },
    
    _handleEvent: function(id, method, type) {
      var handler = new artjs.ComponentEventHandler(this, id, artjs.$D(this, method), type);
      
      this._handlers.push(handler);
      
      return handler;
    },
    
    _registerAll: function(map) {
      artjs.Object.each(map, this._register, this);
    },
    
    _register: function(k, v) {
      this.ctor.onLoad(k, artjs.$D(this, v));
    },
    
    _destroy: function() {
      artjs.Array.invoke(this._handlers, '_destroy');
      
      delete this._handlers;
    }
  },
  {
    _name: 'Component',
    
    _idToComponent: {},
    
    instances: [],

    register: function(id, instance) {
      this._idToComponent[id] = instance;
    },
    
    find: function(id) {
      return this._idToComponent[id];
    },
    
    onLoad: function(id, delegate) {
      var component = this.find(id);
      
      if (component) {
        delegate.invoke(component);
      }
      else {
        artjs.ComponentScanner.addListener(id, delegate);
      }
    },
    
    toString: function() {
      return this._name;
    }
  }
);
artjs.Button = artjs.component.Button = artjs.Class(
  function(element) {
    this.super(element);
    
    this._eventId = artjs.Element.getDataValue(this._element, 'event');
    
    this.onClick = new artjs.Event('artjs.Button::onClick');
    
    artjs.on('click', this._element, artjs.$D(this, '_onClick'));
  },
  {
    _onClick: function(e) {
      this.onClick.fire(e);
      
      if (this._eventId) {
        this._fire(this._eventId);
      }
    }
  },
  {
    _name: 'artjs.Button'
  },
  artjs.Component
);
artjs.Calendar = artjs.ui.Calendar = artjs.Class(
  function(element) {
    this.super(element);

    this._hide();
    
    this._registerAll({
      'artjs-Calendar-years': '_onYearsSelectLoaded',
      'artjs-Calendar-months': '_onMonthsSelectLoaded',
      'artjs-Calendar-days': '_onDaysTableLoaded',
      'artjs-Calendar-prev': '_onPrevLoaded',
      'artjs-Calendar-next': '_onNextLoaded'
    });
    
    this._onEachDayDelegate = artjs.$D(this, '_onEachDay');
    this._onItemDelegate = artjs.$D(this, '_onItem');
    this._onPrevMonthDelegate = artjs.$D(this, '_onPrevMonth');
    this._onNextMonthDelegate = artjs.$D(this, '_onNextMonth');
    this._onMonthSelectDelegate = artjs.$D(this, '_onMonthSelect');
    this._onYearSelectDelegate = artjs.$D(this, '_onYearSelect');
  },
  {
    setSource: function(source) {
      var rt = artjs.Element.getBounds(source.getElement()).getRightTop();
      var position = rt.add(new artjs.Point(2, 0));
      
      this._source = source;
      this._setPosition(position);
      this._toggle();
    },
    
    _onYearsSelectLoaded: function(select) {
      this._years = select;
      this._years.onChange.add(this._onYearSelectDelegate);
    },
    
    _onMonthsSelectLoaded: function(select) {
      this._months = select;
      this._months.onChange.add(this._onMonthSelectDelegate);
      this._months.setOptions(artjs.Array.map(artjs.Lang.t('datepicker', 'months'), this.ctor._toMonthOption));
    },
    
    _onDaysTableLoaded: function(table) {
      this._days = table;
      this._days.setData({
        head: this._getDaysRow(),
        body: artjs.Array.build(this.ctor.ROWS_NUM, this._getDaysRow)
      });
      this._days.onItem.add(this._onItemDelegate);
    },
    
    _onPrevLoaded: function(prev) {
      prev.onClick.add(this._onPrevMonthDelegate);
    },
    
    _onNextLoaded: function(next) {
      next.onClick.add(this._onNextMonthDelegate);
    },
    
    _getDaysRow: function() {
      return artjs.Array.build(7, artjs.String.blank);
    },
    
    _toggle: function() {
      this._isHidden() ? this._show() : this._hide();
    },
    
    _show: function() {
      var value = this._source.getModel().value;
      
      this._selectedDate = artjs.String.isEmpty(value) 
        ? new Date() 
        : artjs.Date.fromYMD(value, this.ctor.SEPARATOR);
      this._currentDate = new Date(this._selectedDate);
      this._firstDay = this._source.firstDay;
      this._years.setOptions(artjs.Array.map(artjs.Array.fromRange(this._source.yearsRange), this.ctor._toYearOption));
      
      this._update();
      
      artjs.Element.show(this._element);
    },
    
    _update: function() {
      var monthFirstDate = artjs.Date.firstDate(this._currentDate);
      var monthFirstDay = monthFirstDate.getDay();
      var monthDaysNum = artjs.Date.monthDaysNum(this._currentDate);
      
      this._months.setValue(this._currentDate.getMonth() + 1);
      this._years.setValue(this._currentDate.getFullYear());
      this.startIndex = artjs.Math.sawtooth(monthFirstDay - this._firstDay, 0, 7);
      
      var rowsNum = artjs.Math.stairs(this.startIndex + monthDaysNum - 1, 0, 7) + 1;
      
      for (var i = 0; i < this.ctor.ROWS_NUM; i++) {
        this._days.setRowVisible(i, i < rowsNum);
      }

      this._days.updateHead(artjs.Array.build(7, this._eachHeadData, this));
      this._days.iterate(this._onEachDayDelegate);
    },
    
    _eachHeadData: function(idx) {
      var index = artjs.Math.sawtooth(this._firstDay + idx, 0, 7);
      
      return artjs.Lang.t('datepicker', 'days')[index];
    },
    
    _onEachDay: function(item, idx) {
      var date = new Date(this._currentDate);
      
      date.setDate(idx - this.startIndex + 1);
      
      var value = date.getDate();
      var valid = (date.getMonth() == this._currentDate.getMonth());
      var weekend = artjs.Array.includes(this.ctor.WEEKEND_DAYS, (idx + this._firstDay) % 7); 
      var selected = (date.getTime() == this._selectedDate.getTime());
      
      artjs.Element.setClasses(item, {
        weekend: weekend,
        selected: selected,
        invalid: !valid
      });

      artjs.Element.setContent(item, value);
    },
    
    _onItem: function(item) {
      var value = artjs.Element.getContent(item);
      var valid = !artjs.Element.hasClass(item, 'invalid');
      
      if (valid) {
        this._selectedDate.setFullYear(this._currentDate.getFullYear());
        this._selectedDate.setMonth(this._currentDate.getMonth());
        this._selectedDate.setDate(parseInt(value, 10));
        this._update();
        this._source.getModel().value = artjs.Date.toYMD(this._selectedDate, this.ctor.SEPARATOR);
        this._hide();
      }
      
      return false;
    },
    
    _onPrevMonth: function(e) {
      e.preventDefault();
      
      this._onMonth(-1);
    },
    
    _onNextMonth: function(e) {
      e.preventDefault();
      
      this._onMonth(1);
    },
    
    _onMonth: function(v) {
      this._currentDate.setMonth(this._currentDate.getMonth() + v);
      
      this._update();
    },
    
    _onMonthSelect: function(select) {
      this._currentDate.setMonth(parseInt(select.getValue(), 10) - 1);
      
      this._update();
    },
    
    _onYearSelect: function(select) {
      this._currentDate.setFullYear(parseInt(select.getValue(), 10));
      
      this._update();
    },
    
    _setYearSpan: function(span) {
      this.yearSpan = span;
      this.years = artjs.Array.build(this.yearSpan.y - this.yearSpan.x + 1, this._buildYearSpan);
    },
    
    _buildYearSpan: function(i) {
      return this.yearSpan.x + i;
    },
    
    _setPosition: function(position) {
      artjs.Element.setPosition(this._element, position);
    },
    
    _hide: function() {
      artjs.Element.hide(this._element);
    },
    
    _isHidden: function() {
      return artjs.Element.isHidden(this._element);
    }
  },
  {
    WEEKEND_DAYS: [6, 0],
    ROWS_NUM: 7,
    SEPARATOR: '-',
    
    _name:  'artjs.Calendar',
    
    init: function() {
      artjs.TemplateLibrary.onLoad.add(artjs.$D(this, '_onLibraryLoad'));
    },
    
    _toMonthOption: function(i, idx) {
      return {value: idx + 1, text: i};
    },
    
    _toYearOption: function(i, idx) {
      return {value: i, text: i};
    },
    
    _onLibraryLoad: function(library) {
      library.loadTemplate('artjs/calendar');
    }
  },
  artjs.Component
);
artjs.CheckBox = artjs.component.CheckBox = artjs.Class(
  function(element) {
    this.super(element);
    
    this._eventId = artjs.Element.getDataValue(this._element, 'event');
    
    this.onClick = new artjs.Event('artjs.CheckBox::onClick');
    
    artjs.on('click', this._element, artjs.$D(this, '_onClick'));
  },
  {
    isChecked: function() {
      return this._element.checked;
    },
    
    setChecked: function(checked) {
      this._element.checked = checked;
    },
    
    setValue: function(value) {
      this._element.value = value;
    },
    
    getValue: function() {
      return this._element.value;
    },
    
    _onClick: function(e) {
      this.onClick.fire(e);
      
      if (this._eventId) {
        this._fire(this._eventId);
      }
    }
  },
  {
    _name: 'artjs.CheckBox'
  },
  artjs.Component
);
artjs.Link = artjs.component.Link = artjs.Class(
  function(element) {
    this.super(element);
    
    this.onClick = new artjs.Event('artjs.Link::onClick');
    
    artjs.on('click', this._element, artjs.$D(this, '_onClick'));
  },
  {
    getHref: function() {
      return artjs.Element.getAttributes(this._element).href;
    },
    
    _onClick: function(e, ee) {
      this.onClick.fire(e);
    }
  },
  {
    _name: 'artjs.Link'
  },
  artjs.Component
);
artjs.Select = artjs.component.Select = artjs.Class(
  function(element) {
    this.super(element);
    
    this.onChange = new artjs.Event('artjs.Select::onChange');
    
    artjs.on('change', this._element, artjs.$D(this, '_onChange'));
  },
  {
    setOptions: function(options) {
      this._options = options;
      
      this._update();
    },
    
    setValue: function(selected) {
      this._element.value = selected;
    },
    
    getValue: function() {
      return this._element.value;
    },
    
    _update: function() {
      artjs.Element.setContent(this._element, artjs.TemplateHelpers.renderOptions(this._options));
    },
    
    _onChange: function(e) {
      this.onChange.fire(this);
    }
  },
  {
    _name: 'artjs.Select'
  },
  artjs.Component
);
artjs.Table = artjs.component.Table = artjs.Class(
  function(element) {
    this.super(element);
    
    this.onItem = new artjs.Event('artjs.Table::onItem');
    
    artjs.on('click', this._element, artjs.$D(this, '_onItem'), 'td');
  },
  {
    setData: function(data) {
      this._data = data;
      
      this._update();
    },
    
    updateHead: function(data) {
      artjs.Array.each(data, this._updateHead, this);
    },
    
    iterate: function(delegate) {
      artjs.Array.each(this._items, delegate.method, delegate.object);
    },
    
    setRowVisible: function(i, visible) {
      artjs.Element.setVisible(this._rows[i], visible);
    },
    
    _updateHead: function(i, idx) {
      artjs.Element.setContent(this._headCells[idx], i);
    },
    
    _update: function() {
      artjs.Element.setContent(this._element, artjs.TemplateHelpers.renderTable(this._data));
      
      var head = artjs.$find(this._element, 'thead');
      var body = artjs.$find(this._element, 'tbody');
      
      this._headCells = artjs.$findAll(head, 'th');
      this._rows = artjs.$findAll(body, 'tr');
      this._items = artjs.$findAll(body, 'td');
    },
    
    _onItem: function(e) {
      this.onItem.fire(e.target);
    }
  },
  {
    _name: 'artjs.Table'
  },
  artjs.Component
);
artjs.Text = artjs.component.Text = artjs.Class(
  function(element) {
    this.super(element);
    
    this.onChange = new artjs.Event('artjs.Text::onChange');
    
    artjs.on('change', this._element, artjs.$D(this, '_onChange'));
  },
  {
    setValue: function(value) {
      this._element.value = value;
    },
    
    getValue: function() {
      return this._element.value;
    },
    
    clear: function() {
      this.setValue(artjs.String.blank());
    },
    
    _onChange: function(e) {
      this.onChange.fire(this);
    }
  },
  {
    _name: 'artjs.Text'
  },
  artjs.Component
);
artjs.Tree = artjs.component.Tree = artjs.Class(
  function(element, hash) {
    this.super(element);
    
    this._hash = Boolean(hash);
    this._noAction = false;
    this.onNode = new artjs.Event('artjs.Tree::onNode');
    this.onLeaf = new artjs.Event('artjs.Tree::onLeaf');
    artjs.on('click', this._element, artjs.$D(this, '_onClick'), 'li a');
  },
  {
    openAt: function(path) {
      this._openingNode = this.getElement();
      artjs.Array.each(path, this._openAt, this);
      this._openingNode = null;
      this._noAction = false;
    },
    
    getCurrent: function() {
      return this._current;
    },
    
    getData: function() {
      return this._data;
    },
    
    setData: function(data) {
      this._data = data;
      
      var content = artjs.$P(this._renderNode(data));
      
      artjs.Element.insert(this.getElement(), content);
      
      artjs.Array.each(artjs.Selector.findAll(this.getElement(), 'li'), this._eachElement, this);
    },
    
    _openAt: function(i) {
      this._openingNode = artjs.Element.elementAt(artjs.Selector.find(this._openingNode, 'ul'), i);
      
      var element = artjs.Element.firstElement(this._openingNode);
      
      this._onElement(element);
    },
    
    _renderNode: function(node) {
      return artjs.$B('ul', null, artjs.Object.map(node, this._mapNode, this).join('')).toString();
    },
    
    _mapNode: function(k, v) {
      var leaf = artjs.Object.isString(v);
      var href = leaf ? (this._hash ? '#/' + v : v) : '#';
      var value = artjs.$B('a', {href: href}, k).toString() + (leaf ? '' : this._renderNode(v));
      
      return artjs.$B('li', null, value).toString();
    },
    
    _eachElement: function(i) {
      var a = artjs.Element.firstElement(i);
      
      if (this._isNode(a)) {
        artjs.Element.hide(artjs.$find(i, 'ul'));
      }
      else {
        artjs.Element.addClass(i, 'leaf');
      }
    },
    
    _onClick: function(e) {
      this._onElement(e.target, e);
    },
    
    _onElement: function(a, e) {
      this._current = a;
      
      if (this._isNode(this._current)) {
        this._onNode(e);
      }
      else {
        this._onLeaf(e);
      }
    },
    
    _isNode: function(a) {
      var li = artjs.Element.parent(a);
      
      return artjs.Array.isNotEmpty(artjs.Selector.findAll(li, 'ul'));
    },
    
    _onNode: function(e) {
      if (e) {
        e.preventDefault();
      }
      
      var ul = artjs.Element.next(this._current);
      var action = this._openingNode ? 'show' : 'toggle';
      
      artjs.Element[action](ul);
      artjs.Element.setClass(artjs.$parent(this._current), 'expanded', !artjs.Element.isHidden(ul));
      
      this.onNode.fire(this, e);
    },
    
    _onLeaf: function(e) {
      if (!this._openingNode) {
        this.onLeaf.fire(this, e);
      }
    }
  },
  {
    _name: 'artjs.Tree'
  },
  artjs.Component
);
artjs.component.utils.EventHandler = artjs.ComponentEventHandler = artjs.Class(
  function(component, eventId, delegate, type, allowSelf) {
    this._component = component;
    this._eventId = eventId;
    this._delegate = delegate;
    this._type = type;
    this._allowSelf = Boolean(allowSelf);
    this._onEventDelegate = artjs.$D(this, '_onEvent');
    
    artjs.Broadcaster.addListener(this._eventId, this._onEventDelegate);
  },
  {
    _destroy: function() {
      artjs.Broadcaster.removeListener(this._eventId, this._onEventDelegate);
    },
    
    _onEvent: function(component) {
      var source = component.getElement();
      var target = this._component.getElement();
      var fire = false;
  
      switch (this._type) {
        case this.ctor.DOWN:
          fire = artjs.Selector.isDescendantOf(target, source);
          break;
        case this.ctor.UP:
          fire = artjs.Selector.isDescendantOf(source, target);
          break;
        default:
          if ((source != target) || this._allowSelf) {
            fire = true;
          }
      }
  
      if (fire) {
        this._delegate.invoke(component);
      }
    }
  },
  {
    UP: 'UP',
    DOWN: 'DOWN'
  }
);
artjs.component.utils.Scanner = artjs.ComponentScanner = {
  _channel: new artjs.Channel('ComponentScanner'),
  
  scan: function(element) {
    artjs.Array.each(artjs.$findAll(element, '.art'), this._onFound, this);
  },
  
  addListener: function(id, delegate) {
    this._channel.addListener(id, delegate);
  },
  
  _onFound: function(i) {
    this.initElement(i);
  },
  
  initElement: function(i) {
    this._element = i;
    
    var classnames = artjs.Element.getClasses(i);
    
    artjs.Array.removeItem(classnames, 'art');
    artjs.Array.each(classnames, this._eachClassName, this);
  },
  
  _eachClassName: function(i) {
    this.instantiateClass(i, this._element);
  },
  
  instantiateClass: function(className, element) {
    var path = className.split('-');
    var _class = artjs.Array.inject(path, window, this._injectPathChunk);
    var instance = null;
    
    if (_class instanceof Function) {
      instance = new _class(element);
      
      artjs.Component.instances.push(instance);
      
      var id = artjs.Element.getAttributes(instance.getElement()).id;
      
      if (id) {
        artjs.Component.register(id, instance);
        this._channel.fire(id, instance);
      }
    }
    
    return instance;
  },
  
  _injectPathChunk: function(result, i) {
    return result && result[i];
  }
};
artjs.component.utils.Sweeper = artjs.ComponentSweeper = {
  INTERVAL: 1000,
  
  init: function() {
    var sweep = artjs.$D(this, '_onSweep');
    var clock = new artjs.Clock(this.INTERVAL);
    
    clock.onChange.add(sweep);
    
    clock.start();
    
    artjs.$T(sweep, 100);
  },
  
  _onSweep: function() {
    var instances = artjs.Array.partition(artjs.Component.instances, this._isOnStage, this);

    artjs.Array.invoke(instances.y, '_destroy');
    
    artjs.Component.instances = instances.x;
  },
  
  _isOnStage: function(i) {
    return artjs.Selector.isOnStage(i.getElement());
  }
};
artjs.ElementInspector = artjs.ui.ElementInspector = artjs.Class(
  function() {
    artjs.on('mousemove', document, artjs.$D(this, '_onMouseMove'));

    this._toggler = new artjs.Toggler(true);
    this._toggler.onActivate.add(artjs.$D(this, '_onActivate'));
    this._toggler.onDeactivate.add(artjs.$D(this, '_onDeactivate'));
  },
  {
    _onMouseMove: function(e, ee) {
      var targets = ee.getTargets(e);
      var origin = targets.origin;
      
      if (artjs.Array.any(artjs.Element.children(origin), artjs.Element.isText)) {
        this._toggler.toggle(origin);
      }
    },

    _onActivate: function(toggler) {
      var current = toggler.current;
      
      if (current) {
        artjs.Element.addClass(current, 'inspected');
      }
    },

    _onDeactivate: function(toggler) {
      var current = toggler.current;

      if (current) {
        artjs.Element.removeClass(current, 'inspected');
      }
    }
  }
);
artjs.View = artjs.view.Base = artjs.Class(
  function(element) {
    this.super(element);
    
    this._onModelChangeDelegate = artjs.$D(this, '_onModelChange');
  },
  {
    getModel: function() {
      return this._model;
    },
    
    setModel: function(model) {
      this._model = model;
      this._model.onChange.add(this._onModelChangeDelegate);
      
      this._render();
    },
    
    _onModelChange: function() {
      this._render();
    },
    
    _render: function() {
    },
    
    _destroy: function() {
      this.super();
      
      this._model.onChange.remove(this._onModelChangeDelegate);
      
      this._cleanupChannel(this._model.getChannel());
      this._cleanupChannel(artjs.Broadcaster);
    },
    
    _cleanupChannel: function(channel) {
      var events = artjs.Object.values(channel.getEvents());
      var listeners = artjs.Array.invoke(events, 'getItems');
      
      artjs.Array.each(listeners, this._filterListeners, this);
    },
    
    _filterListeners: function(listeners) {
      artjs.Array.$reject(listeners, this._filterListener, this);
    },
    
    _filterListener: function(delegate) {
      return delegate.object == this;
    }
  },
  {
    _name: 'artjs.View'
  },
  artjs.Component
);
artjs.Input = artjs.view.Input = artjs.Class(
  function(element) {
    this.super(element);
    
    var model = new artjs.Model();
    
    model.addProperty('value', element.value);
    model.addPropertyListener('value', artjs.$D(this, '_onModelValueChange'));
    
    this.setModel(model);
    
    artjs.on('change', element, artjs.$D(this, '_onUiValueChange'));
  },
  {
    setReadOnly: function(value) {
      if (value) {
        this._element.setAttribute('readonly', 'readonly');
      }
      else {
        this._element.removeAttribute('readonly');
      }
    },
    
    _onModelValueChange: function(prop) {
      this._element.value = prop.newValue;
    },
    
    _onUiValueChange: function(e) {
      this._model.setProperty(e.currentTarget.value);
    }
  },
  {
    _name: 'artjs.Input'
  },
  artjs.View
);
artjs.ListView = artjs.view.List = artjs.Class(
  function(element) {
    this.super(element);
    
    this.setModel(new artjs.ListModel());
    
    var data = artjs.Element.getData(element);
    
    this._itemTemplate = data.template;
    this._itemClass = data['item-class'];
  },
  {
    addItem: function(item) {
      var index = this._model.addItem(item);
      
      this._renderItem(item, index - 1);
      
      return index;
    },
    
    removeItem: function(item) {
      var index = artjs.Array.first(this._model.removeItem(item));
      
      artjs.Element.removeAt(this._element, index);
      
      return index;
    },
    
    removeItems: function(items) {
      return artjs.Array.map(items, this.removeItem, this);
    },
    
    setItems: function(items) {
      this._model.items = items;
    },
    
    _render: function() {
      artjs.Element.clear(this._element);
      
      artjs.Array.each(this._model.items, this._renderItem, this);
    },
    
    _renderItem: function(item) {
      var element = artjs.$E('li', {'data-template': this._itemTemplate});
      
      element = artjs.Element.insert(this._element, element);
      
      if (this._itemClass) {
        artjs.ComponentScanner.instantiateClass(this._itemClass, element).setModel(item);
      }
    }
  },
  {
    _name: 'artjs.ListView'
  },
  artjs.View
);
artjs.DatePicker = artjs.view.DatePicker = artjs.Class(
  function(element) {
    this.super(element);
    
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var data = artjs.Element.getData(this._element);
    var firstDay = parseInt(data['first-day']);
    
    this.year = year;
    this.month = month;
    this.yearsRange = new artjs.Point(parseInt(data['year-from']) || year - 20, parseInt(data['year-to']) || year + 5);
    this.firstDay = isNaN(firstDay) ? 1 : firstDay;
    this.setReadOnly(true);
    
    artjs.on('click', this._element, artjs.$D(this, '_onClick'));
    
    this.calendar = artjs.Component.onLoad('artjs-Calendar', artjs.$D(this, '_onCalendarLoad'));
  },
  {
    _onCalendarLoad: function(component) {
      this.calendar = component;
    },
    
    _onClick: function(e) {
      e.preventDefault();
      
      this.calendar.setSource(this);
    }
  },
  {
    _name: 'artjs.DatePicker'
  },
  artjs.Input
);
artjs.TemplateView = artjs.view.Template = artjs.Class(
  function(element, model) {
    var replace = artjs.String.toBoolean(artjs.Element.getDataValue(element, 'replace'));
    
    this._renderMethod = replace ? 'renderOnto' : 'renderInto';
    
    var templateId = artjs.Element.getDataValue(element, 'template');
    
    this._template = templateId
        ? artjs.TemplateLibrary.getTemplate(templateId)
        : artjs.Element.getContent(element);
    
    this.super(element, model);
  },
  {
    _render: function() {
      artjs.TemplateBase[this._renderMethod](this._element, this._template, this._model);
    }
  },
  {
    _name: 'artjs.TemplateView'
  },
  artjs.View
);
artjs.$get = artjs.Delegate.callback(artjs.Ajax, 'get');
artjs.$post = artjs.Delegate.callback(artjs.Ajax, 'post');
artjs.$put = artjs.Delegate.callback(artjs.Ajax, 'put');
artjs.$del = artjs.Delegate.callback(artjs.Ajax, 'del');
artjs.$A = artjs.Delegate.callback(artjs.Array, 'arrify');
artjs.$BA = artjs.Delegate.callback(artjs.Delegate, 'bindAll');
artjs.$D = artjs.Delegate.callback(artjs.Delegate, 'create');
artjs.$DC = artjs.Delegate.callback(artjs.Delegate, 'callback');
artjs.$F = artjs.Delegate.callback(artjs.Delegate, 'func');
artjs.$I = artjs.Delegate.callback(artjs.Element, 'insert');
artjs.$B = artjs.Delegate.callback(artjs.ElementBuilder, 'build');
artjs.$C = artjs.Delegate.callback(artjs.ElementBuilder, 'create');
artjs.$E = artjs.Delegate.callback(artjs.ElementBuilder, 'getElement');
artjs.$P = artjs.Delegate.callback(artjs.ElementBuilder, 'parse');
artjs.$ = artjs.Delegate.callback(artjs.Selector, 'getElements');
artjs.$find = artjs.Delegate.callback(artjs.Selector, 'find');
artjs.$findAll = artjs.Delegate.callback(artjs.Selector, 'findAll');
artjs.$parent = artjs.Delegate.callback(artjs.Selector, 'parent');
artjs.$T = artjs.Delegate.callback(artjs.Timeout, 'fire');

artjs.Array.contains = artjs.Array.includes; 
artjs.Array.containsAll = artjs.Array.includesAll; 
artjs.Broadcaster = new artjs.Channel('Broadcaster');
artjs.onDocumentLoad = new artjs.Event('document:load');
artjs.onWindowLoad = new artjs.Event('window:load');

document.addEventListener('DOMContentLoaded', function() {
  artjs.TemplateLibrary.init();
  artjs.ComponentSweeper.init();
  artjs.Calendar.init();
  artjs.Router.init();
  artjs.onDocumentLoad.fire();
}, false);

window.addEventListener('load', function() {
  artjs.onWindowLoad.fire();
}, false);
