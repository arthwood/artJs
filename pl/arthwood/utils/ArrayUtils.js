var ArrayUtils = pl.arthwood.utils.ArrayUtils = {
  insertAt: function(arr, at, obj) {
    return arr.slice(0, at).concat(obj).concat(arr.slice(at));
  },
  
  removeAt: function(arr, at) {
    return arr.splice(at, 1);
  },

  removeItem: function(arr, item, onlyFirst) {
    var n = arr.length;

    while (n-- > 0) {
      if (arr[n] === item) {
        arr.splice(n, 1);
        if (onlyFirst) return;
      }
    }
  },

  arrify: function(v, idx) {
    var args = new Array();

    var n = v.length;

    for (var i = idx || 0; i < n; i++) {
      args.push(v[i]);
    }

    return args;
  },

  map: function(arr, func) {
    var result = new Array();
    var n = arr.length;

    for (var i = 0; i < n; i++) {
      result.push(func(arr[i], i));
    }

    return result;
  },

  each: function(arr, func) {
    var n = arr.length;
    var vArgs = $args(arguments, 2);
    
    for (var i = 0; i < n; i++) {
      func.apply(null, [arr[i]].concat(vArgs));
    }
  },

  eachIndex: function(arr_, func_) {
    var n = arr_.length;
    var vArgs = $args(arguments, 2);

    for (var i = 0; i < n; i++) {
      func_.apply(null, [i].concat(vArgs));
    }
  },

  eachPair: function(arr_, func_) {
    var n = arr_.length;
    var vArgs =  $args(arguments, 2);

    for (var i = 0; i < n; i++) {
      func_.apply(null, [i, arr_[i]].concat(vArgs));
    }
  },

  inject: function(arr, func, init) {
    var vResult = init;
    var n = arr.length;
    
    for (var i = 0; i < n; i++) {
      vResult = func(vResult, arr[i]);
    }

    return vResult;
  },

  flatten: function(arr) {
    return this.inject(arr, this.flattenCallback, []);
  },
  
  flattenCallback: function(mem, i) {
    return mem.concat(i);
  },

  flattenHtmlCollections: function(arr) {
    var vResult = new Array();
    var n = arr.length;
    var collection;

    for (var i = 0; i < n; i++) {
      collection = arr[i];

      for (var j = 0; j < collection.length; j++) {
        vResult.push(collection[j]);
      }
    }
    
    return vResult;
  },

  select: function(arr, func) {
    var vResult = new Array();

    this.each(arr, function(i) {
      if (func(i)) {
        vResult.push(i);
      }
    });
    
    return vResult;
  },

  reject: function(arr, func) {
    var vResult = new Array();

    this.each(arr, function(i) {
      if (!func(i)) {
        vResult.push(i);
      }
    });
    
    return vResult;
  },

  $reject: function(arr, func) {
    var n = arr.length - 1;

    for (var i = n; i >= 0; i--) {
      if (func(arr[i])) {
        arr.splice(i, 1);
      }
    }
  },

  detect: function(arr, func) {
    var n = arr.length;

    for (var i = 0; i < n; i++) {
      if (func(arr[i])) return arr[i];
    }

    return null;
  },

  all: function(arr, func) {
    var n = arr.length;

    for (var i = 0; i < n; i++) {
      if (!func(arr[i])) return false;
    }

    return true;
  },

  any: function (arr, func) {
    var n = arr.length;

    for (var i = 0; i < n; i++) {
      if (func(arr[i])) return true;
    }

    return false;
  },

  uniq: function(arr, func) {
    var comparison = func || this.uniqDefault;
    var copy = arr.concat();
    var result = new Array();
    var item, n;
    
    while (n = copy.length) {
      item = copy[0];
      result.push(item);

      while (n-- > 0) {
        if (comparison(copy[n], item)) {
          copy.splice(n, 1);
        }
      }
    }

    return result;
  },

  uniqDefault: function(i, j) {
    return i === j;
  },

  commonElement: function(arr) {
    this.commonTestArray = arr.slice(1);

    return this.select(arr[0], this.commonElementSelectDelegate);
  },

  commonElementSelect: function(i) {
    this.testElement = i;
    
    return this.all(this.commonTestArray, this.hasTestElementDelegate);
  },

  hasTestElement: function(arr) {
    var has = Boolean(arr.indexOf(this.testElement) + 1);
    
    return has;
  },

  selectNonEmpty: function(arr) {
    return this.select(arr, this.nonEmptyDelegate);
  },

  nonEmpty: function(arr) {
    return !(arr.length == 0);
  },

  numerize: function(arr) {
    return this.map(arr, this.numerizeCallback);
  },

  sum: function(arr) {
    return Number(this.inject(arr, this.sumCallback, 0));
  },

  numerizeCallback: function (i) {
    return Number(i);
  },

  sumCallback: function(sum, i) {
    return sum + i;
  },

  stringify: function(arr) {
    return this.map(arr, this.stringifyCallback);
  },

  stringifyCallback: function(i) {
    return i.toString();
  },

  toString: function(arr) {
    return '[' + arr.join(', ') + ']';
  },

  print: function(arr) {
    this.each(arr, p);
  }
};
var $args = ArrayUtils.arrify;

ArrayUtils.commonElementSelectDelegate = $DC(ArrayUtils, ArrayUtils.commonElementSelect);
ArrayUtils.hasTestElementDelegate = $DC(ArrayUtils, ArrayUtils.hasTestElement);
ArrayUtils.nonEmptyDelegate = $DC(ArrayUtils, ArrayUtils.nonEmpty);
