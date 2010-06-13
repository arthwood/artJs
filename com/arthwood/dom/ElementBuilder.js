ArtJs.ElementBuilder = com.arthwood.dom.ElementBuilder = function(name, attributes, value, empty) {
  this.name = name;
  this.attributes = attributes;
  this.value = value;
  this.empty = Boolean(empty);
};

ArtJs.ElementBuilder.prototype = {
  toString: function() {
    var attributes = ArtJs.ObjectUtils.empty(this.attributes) ? '' : (' ' + this.attributesString() + ' ');
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
    
    !this.empty && (e.innerHTML = this.value);
    
    return e;
  },
  
  attributesString: function() {
    return ArtJs.ArrayUtils.map(
      ArtJs.ObjectUtils.toArray(this.attributes), 
      ArtJs.ElementBuilder.attributePairToString
    ).join(' ');
  }
};

ArtJs.ObjectUtils.extend(ArtJs.ElementBuilder, {
  init: function() {
    ArtJs.$B = ArtJs.$DC(this, this.build);
    ArtJs.$P = ArtJs.$DC(this, this.parse);
    ArtJs.$C = ArtJs.$DC(this, this.create);
  },
  
  getElement: function(i) {
    return arguments.callee.element;
  },
  
  getCollection: function(n, element) {
    this.getElement.element = element;
    
    return ArtJs.ArrayUtils.build(n, this.getElement).join('');
  },
  
  setAttribute: function(k, v) {
    arguments.callee.e.setAttribute(k, v);
  },

  attributePairToString: function(arr) {
    return arr[0] + '="' + arr[1] + '"';
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

ArtJs.ElementBuilder.init();
