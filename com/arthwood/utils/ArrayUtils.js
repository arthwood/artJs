ArtJs.ArrayUtils = com.arthwood.utils.Array = {
  name: 'ArrayUtils',
  
  build: function(n, func) {
    var arr = new Array(n);
    
    for (var i = 0; i < n; i++) {
      arr[i] = func(i);
    }
    
    return arr;
  },
  
  first: function(arr) {
    return this.getItem(arr, 0);
  },
  
  second: function(arr) {
    return this.getItem(arr, 1);
  },
  
  third: function(arr) {
    return this.getItem(arr, 2);
  },
  
  last: function(arr) {
    return this.getItem(arr, arr.length - 1);
  },
  
  beforeLast: function(arr) {
    return this.getItem(arr, arr.length - 2);
  },
  
  getItem: function(arr, i) {
    return arr[i];
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

  _includesAll: function(i, idx) {
    return this.includesInv(i, arguments.callee.arr);
  },
  
  insertAt: function(arr, idx, insertion) {
    return arr.slice(0, idx).concat(insertion).concat(arr.slice(idx));
  },
  
  removeAt: function(arr, idx) {
    return arr.splice(idx, 1);
  },

  removeItem: function(arr, item, onlyFirst) {
    var n = arr.length;

    while (n-- > 0) {
      if (arr[n] === item) {
        arr.splice(n, 1);
        if (onlyFirst) { return; }
      }
    }
  },

  arrify: function(v, idx) {
    var args = [];
    var n = v.length;

    for (var i = idx || 0; i < n; i++) {
      args.push(v[i]);
    }

    return args;
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

  invoke: function(arr, meth, args) {
    this._invoke.meth = meth;
    this._invoke.args = args;
    
    return this.map(arr, this._invoke, this);
  },
  
  _invoke: function(i) {
    return i[arguments.callee.meth].apply(i, arguments.callee.args);
  },
  
  pluck: function(arr, prop) {
    this._pluck.prop = prop;
    
    return this.map(arr, this._pluck, this);
  },

  _pluck: function(i) {
    return i[arguments.callee.prop];
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

  eachItem: function(arr, func, context) {
    var item;

    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];

        func.call(context, item, arr);
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
  
  flatten: function(arr) {
    return this.inject(arr, [], this._flattenCallback, this);
  },
  
  _flattenCallback: function(mem, i, idx) {
    mem.splice.apply(mem, [mem.length, 0].concat(i));
  },
  
  select: function(arr, func, context) {
    var result = [];
    var test = func || this._defaultTestFunction;
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        if (func.call(context, item, parseInt(i, 10), arr)) { 
          result.push(item); 
        }
      }
    }
    
    return result;
  },
  
  reject: function(arr, func, context) {
    var result = [];
    var test = func || this._defaultTestFunction;
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
    var test = func || this._defaultTestFunction;
    var item;
    
    for (var i = n; i >= 0; i--) {
      item = arr[i];
      
      if (test.call(context || this, item, parseInt(i, 10), arr)) { 
        arr.splice(i, 1); 
      }
    }
  },
  
  detect: function(arr, func, context) {
    var test = func || this._defaultTestFunction;
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

  equal: function(arr) {
    return this.all(this.transpose(arr), this.itemsEqual, this);
  },

  itemsEqual: function(arr) {
    return this.uniq(arr).length == 1;
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

  all: function(arr, func, context) {
    var test = func || this._defaultTestFunction;
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
    var test = func || this._defaultTestFunction;
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
  
  _defaultTestFunction: function(i) {
    return i;
  },
  
  partition: function(arr, func, context) {
    var point = new ArtJs.Point([], []);
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        (func.call(context, item, i, arr) ? point.x : point.y).push(item);
      }
    }
    
    return point;
  },
  
  uniq: function(arr, func, context) {
    var groups = this.groupBy(arr, func, context, true);
    
    return this.map(this.pluck(groups, 'y'), this.first, this);
  },

  groupBy: function(arr, func, context, keepOrder) {
    var test = func || this._defaultTestFunction;
    var result = [];
    var values = {};
    var group;
    var item;
    
    for (var i in arr) {
      if (arr.hasOwnProperty(i)) {
        item = arr[i];
        
        group = String(test.call(context || this, item, parseInt(i, 10)));
        
        if (values[group] == undefined) {
          result.push(new ArtJs.Point(group, values[group] = []));
        }
        
        values[group].push(item);
      }
    }
    
    if (!keepOrder) {
      result = ArtJs.ObjectUtils.fromPoints(result);
    }
    
    return result;
  },
  
  indexOf: function(arr, item) {
    return arr.indexOf ? arr.indexOf(item) : this._indexOf(arr, item);
  },
  
  intersection: function(arr) {
    this._intersectionSelect.array = arr.slice(1);
    
    return this.select(arr[0], this._intersectionSelect, this);
  },
  
  _intersectionSelect: function(i) {
    this._intersectionInclude.item = i;
    
    return this.all(arguments.callee.array, this._intersectionInclude, this);
  },
  
  _intersectionInclude: function(arr, idx) {
    return this.includes(arr, arguments.callee.item);
  },
  
  selectNonEmpty: function(arr) {
    return this.select(arr, this.isNotEmpty, this);
  },
  
  compact: function(arr) {
    return this.reject(arr, this.isNullLike, this);
  },

  isNullLike: function(i) {
    return i === null || i === undefined;
  },

  isEmpty: function(arr) {
    return arr.length == 0;
  },

  isNotEmpty: function(arr) {
    return !this.isEmpty(arr);
  },
  
  numerize: function(arr) {
    return this.map(arr, this._numerizeCallback);
  },

  print: function(arr) {
    this.eachItem(arr, this._printEach, this);
  },
  
  _printEach: function(i) {
    ArtJs.p(i);
  },
  
  _numerizeCallback: function (i) {
    return Number(i);
  },
  
  sum: function(arr) {
    return Number(this.inject(arr, 0, this._sumCallback, this));
  },
  
  _sumCallback: function(sum, i) {
    return sum + i;
  },
  
  stringify: function(arr) {
    return this.map(arr, this._stringifyCallback, this);
  },
  
  _stringifyCallback: function(i) {
    return this.isNullLike(i) ? '' : i.toString();
  },

  _indexOf: function(arr, item) {
    for (var i in arr) {
      if (arr.hasOwnProperty(i) && arr[i] === item) {
        return parseInt(i);
      }
    }

    return -1;
  },
  
  doInjection: function() {
    var proto = Array.prototype;
    var dc = ArtJs.$DC;

    proto.all = dc(this, this.all, true);
    proto.any = dc(this, this.any, true);
    proto.beforeLast = dc(this, this.beforeLast, true);
    proto.compact = dc(this, this.compact, true);
    proto.detect = dc(this, this.detect, true);
    proto.each = dc(this, this.each, true);
    proto.eachIndex = dc(this, this.eachIndex, true);
    proto.eachItem = dc(this, this.eachItem, true);
    proto.equal = dc(this, this.equal, true);
    proto.first = dc(this, this.first, true);
    proto.flatten = dc(this, this.flatten, true);
    proto.getItem = dc(this, this.getItem, true);
    proto.includes = dc(this, this.includes, true);
    proto.includesAll = dc(this, this.includesAll, true);
    proto.inject = dc(this, this.inject, true);
    proto.insertAt = dc(this, this.insertAt, true);
    proto.intersection = dc(this, this.intersection, true);
    proto.invoke = dc(this, this.invoke, true);
    proto.isEmpty = dc(this, this.isEmpty, true);
    proto.itemsEqual = dc(this, this.itemsEqual, true);
    proto.last = dc(this, this.last, true);
    proto.map = dc(this, this.map, true);
    proto.isNotEmpty = dc(this, this.isNotEmpty, true);
    proto.numerize = dc(this, this.numerize, true);
    proto.partition = dc(this, this.partition, true);
    proto.pluck = dc(this, this.pluck, true);
    proto.print = dc(this, this.print, true);
    proto.reject = dc(this, this.reject, true);
    proto.$reject = dc(this, this.$reject, true);
    proto.removeAt = dc(this, this.removeAt, true);
    proto.removeItem = dc(this, this.removeItem, true);
    proto.second = dc(this, this.second, true);
    proto.select = dc(this, this.select, true);
    proto.selectNonEmpty = dc(this, this.selectNonEmpty, true);
    proto.stringify = dc(this, this.stringify, true);
    proto.sum = dc(this, this.sum, true);
    proto.third = dc(this, this.third, true);    
    proto.transpose = dc(this, this.transpose, true);    
    proto.uniq = dc(this, this.uniq, true);
  }
};

ArtJs.$A = ArtJs.ArrayUtils.arrify;
