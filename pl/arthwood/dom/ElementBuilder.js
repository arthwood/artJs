ArtJs.ElementBuilder = pl.arthwood.dom.ElementBuilder = function(name, attributes, value, empty) {
  this.name = name;
  this.attributes = attributes;
  this.value = value;
  this.empty = Boolean(empty);
};

ArtJs.ElementBuilder.prototype.toString = function() {
  var attributes = ArtJs.ObjectUtils.isEmpty(this.attributes) ? '' : (' ' + this.attributesString() + ' ');
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
};

ArtJs.ElementBuilder.prototype.attributesString = function() {
  return ArtJs.ArrayUtils.map(ArtJs.ObjectUtils.toArray(this.attributes), this.constructor.attributePairToString).join(' ');
};

ArtJs.ElementBuilder.attributePairToString = function(arr) {
  return arr[0] + '="' + arr[1] + '"';
};
