var Element = pl.arthwood.dom.Element = function(name, attributes, value, empty) {
  this.name = name;
  this.attributes = attributes;
  this.value = value;
  this.empty = Boolean(empty);
};

Element.prototype.toString = function() {
  var attributes = ObjectUtils.isEmpty(this.attributes) ? '' : (' ' + this.attributesString() + ' ');
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
}

Element.prototype.attributesString = function() {
  return ArrayUtils.map(ObjectUtils.toArray(this.attributes), Element.attributePairToString).join(' ');
};

Element.attributePairToString = function(arr) {
  return arr[0] + '="' + arr[1] + '"';
};
