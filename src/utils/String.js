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
