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

  getArguments: function(v, idx) {
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
    var vResult = [];
    var n = arr.length;
    
    for (var i = 0; i < n; i++) {
      vResult = vResult.concat(arr[i]);
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
    
    while (copy.length) {
      item = copy[0];
      result.push(item);

      n = copy.length;
      
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
  }
};
var $args = ArrayUtils.getArguments;