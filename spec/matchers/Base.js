artjs.BaseMatcher = artjs.spec.matchers.Base = artjs.Class(
  function(expected, toText) {
    this.expected = expected;
    this.toText = toText || 'be';
  },
  {
    resolve: function(actual) {
      return actual.value === this.expected;
    },
    
    _failureData: function(actual) {
      return [actual.value, 'expected to', this.toText, String(this.expected)];
    },

    failureText: function(actual) {
      return this._failureData(actual).join(' ');
    }
  }
);
