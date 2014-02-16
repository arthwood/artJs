ArtJs.Actual = com.arthwood.spec.Actual = function(value) {
  this.value = value;
};

ArtJs.Actual.prototype = {
  to: function(matcher) {
    var value = matcher.resolve(this);

    if (typeof value == 'boolean')  {
      runner.pushResult(new ArtJs.SpecResult(this, matcher, value));
    }
    
    return value;
  }
};

function expect(value) {
  return new ArtJs.Actual(value);
}
