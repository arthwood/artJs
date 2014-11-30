artjs.Actual = artjs.spec.Actual = artjs.Class(
  function(value) {
    this.value = value;
  },
  {
    to: function(matcher) {
      var value = matcher.resolve(this);
  
      if (typeof value == 'boolean')  {
        artjs.SpecRunner.pushResult(new artjs.SpecResult(this, matcher, value));
      }
      
      return value;
    }
  }
);

function expect(value) {
  return new artjs.Actual(value);
}
