ArtJs.TrueMatcher = com.arthwood.spec.matchers.True = function () {
};

ArtJs.TrueMatcher.prototype = {
  resolve: function(actual) {
    return actual.value === true;
  },

  failureText: function(actual) {
    return ['"' + actual.value + '"', 'expected to be true'].join(' ');
  }
};

function beTrue() {
  return new ArtJs.TrueMatcher();
}
