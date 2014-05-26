artjs.StringUtils = artjs.utils.String = {
  _name: 'StringUtils',
  
  first: function(str) {
    return str.substr(0, 1);
  },
  
  last: function(str) {
    return str.substr(str.length - 1, 1);
  },
  
  strip: function(str) {
    return str.replace(/\s/g, '');
  },

  isBlank: function(str) {
    return (str === null) || (str === undefined) || this.isEmpty(str);
  },

  isEmpty: function(str) {
    return this.strip(str) == '';
  },
  
  nullifyEmpty: function(str) {
    return this.isEmpty(str) ? null : str;
  },
  
  toS: function(str) {
    return str || '';
  },
  
  countPattern: function(str, pattern) {
    return str.match(new RegExp(pattern, 'g')).length;
  },
  
  align: function(str, n, char, left) {
    var c = this.getMultiPattern(char, n - str.length);
    
    return left ? str + c : c + str;
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

  _subtruncation: function(text, index, end) {
    return this._truncation(text.substr(0, index), end);
  },
  
  _truncation: function(text, end) {
    return text + (end || '...');
  },
  
  singularOrPlural: function(text, n) {
    return text + ((n == 1) ? '' : 's');
  },
  
  capitalize: function(str) {
    return artjs.ArrayUtils.map(str.split(' '), this.capitalizeWord).join(' ');
  },
  
  capitalizeWord: function(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  },
  
  capitalizeUnderscored: function(str) {
    return this.strip(this.capitalize(str.replace(new RegExp('_', 'g'), ' ')));
  },

  trim: function(str, character, replacement) {
    var c = character || ' ';
    var r = replacement || '';
    
    return str
      .replace(new RegExp('^' + c + '+'), r)
      .replace(new RegExp(c + '+$'), r);
  },
  
  sub: function(str, i, j) {
    var n = str.length;
    var jZero = (j === 0);
    
    str += str;
    i = i % n;
    j = j % n;
    if (i < 0) { i += n; }
    if (j < 0) { j += n; }
    if (jZero) { j = n; }
    if (j < i) { j += n; }
    
    return str.substring(i, j);
  },
  
  toJson: function(str) {
    return JSON.parse(str);
  },
  
  startsWith: function(str, substr) {
    return str.match(new RegExp('^' + substr));
  }
};
