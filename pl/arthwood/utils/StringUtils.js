ArtJs.StringUtils = pl.arthwood.utils.StringUtils = {
  INJECTED_PROPS: ['stripSpaces', 'stripTabs', 'strip', 'blank', 'empty', 'nullifyEmpty', 'toS', 'replace',
      'countPattern', 'addZeros', 'getMultiPattern', 'formatPrice', 'truncate', 'singularOrPlural', 'capitalize',
      'capitalizeWord', 'trim'
  ],
  
  init: function() {
    this.injected = false;
  },
  
  ownProperty: function(property) {
    return !this.injected || !ArtJs.ArrayUtils.include(this.INJECTED_PROPS, property);
  },

  stripSpaces: function(str) {
    return this.replace(str, ' ', '');
  },
  
  stripTabs: function(str) {
    return this.replace(str, '	', '');
  },
  
  strip: function(str) {
    return this.stripSpaces(this.stripTabs(str));
  },
  
  blank: function(str) {
    return (str == null) || this.empty(str);
  },
  
  empty: function(str) {
    return this.strip(str) == '';
  },
  
  nullifyEmpty: function(str) {
    return this.empty(str) ? null : str;
  },
  
  toS: function(str) {
    return str || '';
  },
  
  replace: function(str, pattern, substitute) {
    return str.split(pattern).join(substitute);
  },
  
  countPattern: function(str, pattern) {
    return str.split(pattern).length - 1;
  },
  
  addZeros: function(str, length, right) {
    var zeros = this.getMultiPattern('0', length - str.length);
  
    return right ? str + zeros : zeros + str;
  },
  
  getMultiPattern: function (pattern, n) {
    var str = '';
  
    while (n-- > 0) {
      str += pattern;
    }
  
    return str;
  },
  
  formatPrice: function(price) {
    var parts = price.toString().split('.');
    var integer = parts[0];
    var decimal = parts[1];
  
    return integer + '.' + (decimal ? this.addZeros(decimal, 2, true) : '00');
  },
  
  truncate: function(text, length, end) {
    return text.substr(0, length) + ((text.length > length)? (end || '...') : '');
  },
  
  singularOrPlural: function(text, n) {
    return text + ((n == 1) ? '' : 's');
  },
  
  capitalize: function(str) {
    return ArtJs.ArrayUtils.map(str.split(' '), this.capitalizeWord).join();
  },
  
  capitalizeWord: function(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  },

  trim: function(str, excludeStart, excludeEnd) {
    var n;
    var i;
    var code;
  
    if (!excludeStart) {
      n = str.length;
  
      for (i = 0; i < n; i++) {
        code = str.charCodeAt(i);
        
        if ((code != 9) && (code != 32) && (code != 10)) {
          str = str.substring(i);
          break;
        }
      }
    }
  
    if (!excludeEnd) {
      n = str.length;
  
      for (i = n - 1; i >= 0; i--) {
        code = str.charCodeAt(i);
        
        if ((code != 9) && (code != 32) && (code != 10)) {
          str = str.substring(0, i + 1);
          break;
        }
      }
    }
  
    return str;
  },

  doInjection: function() {
    var proto = String.prototype;
    var dc = ArtJs.$DC;
    
    proto.stripSpaces = dc(this, this.stripSpaces, true);
    proto.stripTabs = dc(this, this.stripTabs, true);
    proto.strip = dc(this, this.strip, true);
    proto.blank = dc(this, this.blank, true);
    proto.empty = dc(this, this.empty, true);
    proto.nullifyEmpty = dc(this, this.nullifyEmpty, true);
    proto.toS = dc(this, this.toS, true);
    proto.replace = dc(this, this.replace, true);
    proto.countPattern = dc(this, this.countPattern, true);
    proto.addZeros = dc(this, this.addZeros, true);
    proto.getMultiPattern = dc(this, this.getMultiPattern, true);
    proto.formatPrice = dc(this, this.formatPrice, true);
    proto.truncate = dc(this, this.truncate, true);
    proto.singularOrPlural = dc(this, this.singularOrPlural, false);
    proto.capitalize = dc(this, this.capitalize, true);
    proto.capitalizeWord = dc(this, this.capitalizeWord, true);
    proto.trim = dc(this, this.trim, true);
    
    this.injected = true;
  }
};
