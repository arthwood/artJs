ArtJs.FalseMatcher = com.arthwood.spec.matchers.False = function () {
};

ArtJs.FalseMatcher.prototype = {
  resolve: function(actual) {
    return actual.value === false;
  },

  failureText: function(actual) {
    return ['"' + actual.value + '"', 'expected to be false'].join(' ');
  }
};

function beFalse() {
  return new ArtJs.FalseMatcher();
}
