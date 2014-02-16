ArtJs.NullMatcher = com.arthwood.spec.matchers.Null = function () {
};

ArtJs.NullMatcher.prototype = {
  resolve: function(actual) {
    return actual.value === null;
  },

  failureText: function(actual) {
    return ['"' + actual.value + '"', 'expected to be null'].join(' ');
  }
};

function beNull() {
  return new ArtJs.NullMatcher();
}
