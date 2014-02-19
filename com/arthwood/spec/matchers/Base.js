ArtJs.BaseMatcher = com.arthwood.spec.matchers.Base = ArtJs.Class(
  function(expected, toText) {
    this.expected = expected;
    this.toText = toText || 'be';
  },
  {
    resolve: function(actual) {
      return actual.value === this.expected;
    },
  
    failureText: function(actual) {
      return ['"' + actual.value + '"', 'expected to', this.toText, String(this.expected)].join(' ');
    }
  }
);
