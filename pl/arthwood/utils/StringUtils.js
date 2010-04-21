ArtJs.StringUtils = pl.arthwood.utils.StringUtils = {
  init: function() {
    this.parseJsonValueDC = ArtJs.$DC(this, this.parseJsonValue);
    this.injected = false;
  },
  
  first: function(str) {
    return str.substr(0, 1);
  },
  
  last: function(str) {
    return str.substr(str.length - 1, 1);
  },
  
  stripSpaces: function(str) {
    return this.replace(str, ' ', '');
  },
  
  stripNewLines: function(str) {
    return this.replace(str, "\n", '');
  },
  
  stripTabs: function(str) {
    return this.replace(str, '	', '');
  },
  
  strip: function(str) {
    return this.stripSpaces(this.stripTabs(this.stripNewLines(str)));
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
  
  sub: function(str, i, j) {
    var n = str.length;
    var jZero = (j == 0);
    
    str += str;
    i = i % n;
    j = j % n;
    if (i < 0) i += n;
    if (j < 0) j += n;
    if (jZero) j = n;
    if (j < i) j += n;
    
    return str.substring(i, j);
  },
  
  toJson: function(str) {
    return ArtJs.ObjectUtils.mapValue(eval('(' + str + ')'), this.parseJsonValueDC);
  },
  
  parseJsonValue: function(i) {
    return (typeof(i) == 'string' && this.first(i) == '{' && this.last(i) == '}') ? this.toJson(i) : i;
  },
  
  doInjection: function() {
    var proto = String.prototype;
    var dc = ArtJs.$DC;
    
    proto.first = dc(this, this.first, true);
    proto.last = dc(this, this.last, true);
    proto.stripSpaces = dc(this, this.stripSpaces, true);
    proto.stripTabs = dc(this, this.stripTabs, true);
    proto.stripNewLines = dc(this, this.stripNewLines, true);
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
    proto.sub = dc(this, this.sub, true);
    proto.toJson = dc(this, this.toJson, true);
    
    this.injected = true;
  }
};
