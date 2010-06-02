ArtJs.StringUtils = com.arthwood.utils.StringUtils = {
  init: function() {
    this.parseJsonValueDC = ArtJs.$DC(this, this.parseJsonValue);
  },
  
  first: function(str) {
    return str.substr(0, 1);
  },
  
  last: function(str) {
    return str.substr(str.length - 1, 1);
  },
  
  stripSpaces: function(str) {
    return str.replace(' ', '');
  },
  
  stripNewLines: function(str) {
    return str.replace("\n", '');
  },
  
  stripTabs: function(str) {
    return str.replace("	", '');
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
  
  countPattern: function(str, pattern) {
    return str.match(pattern, 'g').length;
  },
  
  align: function(str, n, char, left) {
    var zeros = this.getMultiPattern(char, n - str.length);
    
    return left ? str + zeros : zeros + str;
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
  
  addZeros: function(str, n, left) {
    return this.align(str, n, '0', left);
  },
  
  truncate: function(text, length, end) {
    return text.substr(0, length) + ((text.length > length)? (end || '...') : '');
  },
  
  singularOrPlural: function(text, n) {
    return text + ((n == 1) ? '' : 's');
  },
  
  capitalize: function(str) {
    return ArtJs.ArrayUtils.map(str.split(' '), this.capitalizeWord).join(' ');
  },
  
  capitalizeWord: function(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  },
  
  capitalizeUnderscored: function(str) {
    return this.stripSpaces(this.capitalize(str.replace('_', ' ')));
  },

  trim: function(str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
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
    proto.countPattern = dc(this, this.countPattern, true);
    proto.align = dc(this, this.align, true);
    proto.getMultiPattern = dc(this, this.getMultiPattern, true);
    proto.truncate = dc(this, this.truncate, true);
    proto.singularOrPlural = dc(this, this.singularOrPlural, false);
    proto.capitalize = dc(this, this.capitalize, true);
    proto.capitalizeWord = dc(this, this.capitalizeWord, true);
    proto.capitalizeUnderscored = dc(this, this.capitalizeUnderscored, true);
    proto.trim = dc(this, this.trim, true);
    proto.sub = dc(this, this.sub, true);
    proto.toJson = dc(this, this.toJson, true);
  }
};
