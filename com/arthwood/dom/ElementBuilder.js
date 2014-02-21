ArtJs.ElementBuilder = com.arthwood.dom.ElementBuilder = function(name, attributes, value, isEmpty) {
  this.name = name;
  this.attributes = attributes;
  this.value = value;
  this.isEmpty = Boolean(isEmpty);
};

ArtJs.ElementBuilder.prototype = {
  toString: function() {
    var attributes = this.attributes && !ArtJs.ObjectUtils.isEmpty(this.attributes) 
      ? (' ' + this.attributesString() + ' ') 
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
    var sa = ArtJs.ElementBuilder.setAttribute;
    
    sa.e = e;
    
    ArtJs.ObjectUtils.eachPair(this.attributes, sa);
    
    if (this.value && !this.isEmpty) { e.innerHTML = this.value; }
    
    return e;
  },
  
  attributesString: function() {
    return ArtJs.ArrayUtils.map(
      ArtJs.ObjectUtils.toArray(this.attributes), 
      ArtJs.ElementBuilder.attributePairToString, 
      ArtJs.ElementBuilder
    ).join(' ');
  }
};

ArtJs.ObjectUtils.extend(ArtJs.ElementBuilder, {
  init: function() {
    ArtJs.$B = ArtJs.$DC(this, this.build);
    ArtJs.$C = ArtJs.$DC(this, this.create);
    ArtJs.$E = ArtJs.$DC(this, this.getElement);
    ArtJs.$P = ArtJs.$DC(this, this.parse);
  },

  getElement: function(name, attributes, value, empty) {
    return this.build(name, attributes, value, empty).getElement();
  },
  
  _getElement: function(i) {
    return arguments.callee.element;
  },
  
  getCollection: function(n, element) {
    this._getElement.element = element;
    
    return ArtJs.ArrayUtils.build(n, this._getElement).join('');
  },
  
  setAttribute: function(k, v) {
    arguments.callee.e.setAttribute(k, v);
  },

  attributePairToString: function(arr) {
    var key = this.translateKey(arr[0]);
    var value = arr[1];
    
    return key + '="' + value + '"';
  },
  
  translateKey: function(k) {
    var result;
    
    switch (k) {
      case 'className':
        result = 'class';
        break;
      case 'forField':
        result = 'for';
        break;
      default:
        result = k;
    }
    
    return result;
  },
  
  build: function(name, attributes, value, empty) {
    return new this(name, attributes, value, empty);
  },
  
  parse: function(str) {
    var node = document.createElement('div');
    
    node.innerHTML = str;
    
    return node.firstChild;
  },
  
  create: function(name, attributes, value, empty) {
    return this.parse(this.build(name, attributes, value, empty));
  }
});
