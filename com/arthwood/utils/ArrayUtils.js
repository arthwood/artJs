ArtJs.ArrayUtils = com.arthwood.utils.Array = {
  _name: 'ArrayUtils',
  
  INJECTABLES: [
    'all',
    'any',
    'beforeLast',
    'compact',
    'detect',
    'each',
    'eachIndex',
    'eachItem',
    'equal',
    'first',
    'flatten',
    'getItem',
    'includes',
    'includesAll', 
    'inject',
    'insertAt',
    'intersection',
    'invoke',
    'isEmpty',
    'itemsEqual',
    'last',
    'map',
    'isNotEmpty',
    'numerize',
    'partition',
    'pluck',
    'print',
    'reject',
    '$reject',
    'removeAt',
    'removeItem',
    'second',
    'select',
    '$select',
    'selectNonEmpty',
    'stringify',
    'sum',
    'third',
    'transpose',
    'uniq'
  ],
  
  _init: function() {
    this._areItemsEqualCallback = ArtJs.$DC(this, this.areItemsEqual);
    this._invokeCallback = ArtJs.$DC(this, this._invoke);
  },
  
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
        this.removeAt(arr, n);
        
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

  invoke: function(arr, meth) {
    this._invokeCallback.delegate.args = [meth, this.arrify(arguments, 2)];
    
    return this.map(arr, this._invokeCallback);
  },
  
  _invoke: function(i, idx, arr, meth, args) {
    return i[meth].apply(i, args);
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
    var test = func || this.identity;
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
    
    for (var i = n; i >= 0; i--) {
      item = arr[i];
      
      if (test.call(context || this, item, parseInt(i, 10), arr)) {
        this.removeAt(arr, i);
      }
    }
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

  equal: function(arr, func, context) {
    this._areItemsEqualCallback.delegate.args = [func, context];
    
    return this.all(this.transpose(arr), this._areItemsEqualCallback, this);
  },

  areItemsEqual: function(i, idx, arr, func, context) {
    return this.uniq(i, func, context).length == 1;
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
  
  identity: function(i) {
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
    return this.reject(arr, ArtJs.ObjectUtils.isNull, this);
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
    return ArtJs.ObjectUtils.isNull(i) ? '' : i.toString();
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
    ArtJs.ObjectUtils.prototypify(this, Array);
  }
};

ArtJs.$A = ArtJs.ArrayUtils.arrify;
