ArtJs.ArrayUtils = pl.arthwood.utils.ArrayUtils = {
  init: function() {
    this.commonElementSelectDelegate = ArtJs.$DC(this, this.commonElementSelect);
    this.includeDelegate = ArtJs.$DC(this, this.include);
    this.invertedIncludeDelegate = ArtJs.$DC(this, this.invertedInclude);
    this.nonEmptyDelegate = ArtJs.$DC(this, this.nonEmpty);
    this.notNullDelegate = ArtJs.$DC(this, this.notNull);
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

  invertedInclude: function(item, arr) {
    return this.include(arr, item);
  },

  include: function(arr, item) {
    return Boolean(arr.indexOf(item) + 1);
  },

  includeAll: function(arr, subset) {
    this.reversedIncludeDelegate.delegate.args = [arr];
    
    return this.all(subset, this.reversedIncludeDelegate);
  },
  
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
    this.includeDelegate.delegate.args = [i];
    
    return this.all(this.commonTestArray, this.includeDelegate);
  },

  selectNonEmpty: function(arr) {
    return this.select(arr, this.nonEmptyDelegate);
  },

  compact: function(arr) {
    return this.select(arr, this.notNullDelegate);
  },

  notNull: function(i) {
    return Boolean(i);
  },

  empty: function(arr) {
    return arr.length == 0;
  },

  nonEmpty: function(arr) {
    return !this.empty(arr);
  },

  numerize: function(arr) {
    return this.map(arr, this.numerizeCallback);
  },

  numerizeCallback: function (i) {
    return Number(i);
  },

  sum: function(arr) {
    return Number(this.inject(arr, this.sumCallback, 0));
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

  print: function(arr) {
    this.each(arr, p);
  },

  doInjection: function() {
    var proto = Array.prototype;
    var dc = ArtJs.$DC;

    proto.first = dc(this, this.first, true);
    proto.second = dc(this, this.second, true);
    proto.third = dc(this, this.third, true);
    proto.beforeLast = dc(this, this.beforeLast, true);
    proto.last = dc(this, this.last, true);
    proto.getItem = dc(this, this.getItem, true);
    proto.include = dc(this, this.include, true);
    proto.includeAll = dc(this, this.includeAll, true);
    proto.insertAt = dc(this, this.insertAt, true);
    proto.removeAt = dc(this, this.removeAt, true);
    proto.removeItem = dc(this, this.removeItem, true);
    proto.map = dc(this, this.map, true);
    proto.each = dc(this, this.each, true);
    proto.eachIndex = dc(this, this.eachIndex, true);
    proto.eachPair = dc(this, this.eachPair, true);
    proto.inject = dc(this, this.inject, true);
    proto.flatten = dc(this, this.flatten, true);
    proto.flattenHtmlCollections = dc(this, this.flattenHtmlCollections, true);
    proto.select = dc(this, this.select, true);
    proto.reject = dc(this, this.reject, true);
    proto.$reject = dc(this, this.$reject, true);
    proto.detect = dc(this, this.detect, true);
    proto.all = dc(this, this.all, true);
    proto.any = dc(this, this.any, true);
    proto.uniq = dc(this, this.uniq, true);
    proto.commonElement = dc(this, this.commonElement, true);
    proto.selectNonEmpty = dc(this, this.selectNonEmpty, true);
    proto.compact = dc(this, this.compact, true);
    proto.empty = dc(this, this.empty, true);
    proto.nonEmpty = dc(this, this.nonEmpty, true);
    proto.numerize = dc(this, this.numerize, true);
    proto.sum = dc(this, this.sum, true);
    proto.stringify = dc(this, this.stringify, true);
    proto.print = dc(this, this.print, true);
  }
};

ArtJs.$args = ArtJs.ArrayUtils.arrify;
