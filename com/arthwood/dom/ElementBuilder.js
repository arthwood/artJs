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
  
  attributesString: function() {
    return ArtJs.ArrayUtils.map(ArtJs.ObjectUtils.toArray(this.attributes), ArtJs.ElementBuilder.attributePairToString).join(' ');
  }
};

ArtJs.ElementBuilder.attributePairToString = function(arr) {
  return arr[0] + '="' + arr[1] + '"';
};

ArtJs.$P = ArtJs.ElementBuilder.parse = function(str) {
  var node = document.createElement('div');
  
  node.innerHTML = str;
  
  return node.firstChild;
};

ArtJs.$B = ArtJs.ElementBuilder.create = function(name, attributes, value, empty) {
  return (new ElementBuilder(name, attributes, value, empty)).toString();
};
