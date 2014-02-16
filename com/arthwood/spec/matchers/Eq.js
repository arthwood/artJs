ArtJs.EqMatcher = com.arthwood.spec.matchers.Eq = function(expected) {
  this.expected = expected;
};

ArtJs.EqMatcher.prototype = {
  resolve: function(actual) {
    if (ArtJs.ObjectUtils.isArray(actual.value)) {
      return ArtJs.ArrayUtils.equal([actual.value, this.expected]);
    }
    else {
      return actual.value === this.expected;
    }
  },

  failureText: function(actual) {
    return ['"' + actual.value + '"', 'expected to equal', '"' + this.expected + '"'].join(' ');
  }
};

function eq(expected) {
  return new ArtJs.EqMatcher(expected);
}
