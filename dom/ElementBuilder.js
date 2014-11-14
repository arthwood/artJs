artjs.ElementBuilder = artjs.dom.ElementBuilder = artjs.Class(
  function(name, attributes, value, isEmpty) {
    this.name = name;
    this.attributes = attributes;
    this.value = value;
    this.isEmpty = Boolean(isEmpty);
  },
  {
    toString: function() {
      var attributes = this.attributes && artjs.ObjectUtils.isNotEmpty(this.attributes) 
        ? (' ' + this.ctor._attributesString(this.attributes) + ' ') 
        : '';
      var part;
      
      if (this.value) {
        part = '>' + this.value + '</' + this.name + '>';
      }
      else {
        if (this.empty) {
          part = '/>';
        }
        else {
          part = '></' + this.name + '>';
        }
      }
    
      return '<' + this.name + attributes + part;
    },
    
    getElement: function() {
      var e = document.createElement(this.name);
      var sa = this.ctor._setAttribute;
      
      sa.e = e;
      
      artjs.ObjectUtils.eachPair(this.attributes, sa);
      
      if (this.value && !this.isEmpty) { e.innerHTML = this.value; }
      
      return e;
    }
  },
  {
    _KEY_TRANSLATOR: {
      className: 'class',
      forField: 'for'
    },
    
    init: function() {
      artjs.$B = artjs.$DC(this, 'build');
      artjs.$C = artjs.$DC(this, 'create');
      artjs.$E = artjs.$DC(this, 'getElement');
      artjs.$P = artjs.$DC(this, 'parse');
    },
    
    // Shorthand method to return new instance
    build: function(name, attributes, value, empty) {
      return new this(name, attributes, value, empty);
    },
    
    parse: function(str) {
      var node = document.createElement('div');
      
      node.innerHTML = str;
      
      return node.firstChild;
    },
    
    create: function(name, attributes, value, empty) {
      return this.parse(this.build(name, attributes, value, empty).toString());
    },
    
    getElement: function(name, attributes, value, empty) {
      return this.build(name, attributes, value, empty).getElement();
    },
    
    getCollection: function(n, element) {
      this._getElement.element = element;
      
      return artjs.ArrayUtils.build(n, this._getElement).join('');
    },
    
    _getElement: function(i) {
      return arguments.callee.element;
    },
    
    _attributesString: function(attrs) {
      return artjs.ArrayUtils.map(artjs.ObjectUtils.toArray(attrs), this._attributePairToString, this).join(' ');
    },
    
    _setAttribute: function(k, v) {
      arguments.callee.e.setAttribute(k, v);
    },
  
    _attributePairToString: function(arr) {
      var key = this._KEY_TRANSLATOR[arr[0]] || arr[0];
      var value = arr[1];
      
      return key + '="' + value + '"';
    }
  }
);
