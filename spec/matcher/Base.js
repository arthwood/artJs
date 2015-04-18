artjs.BaseMatcher = artjs.spec.matcher.Base = artjs.Class(
  function(expected, toText) {
    this.expected = expected;
    this.toText = toText || 'be';
  },
  {
    resolve: function(actual) {
      return actual.value === this.expected;
    },
    
    _failureData: function(actual) {
      var result = [actual.value, 'expected to', this.toText, String(this.expected)];
      
      if (actual.not) {
        result.splice(2, 0, 'not');
      }
      
      return result;
    },

    failureText: function(actual) {
      return this._failureData(actual).join(' ');
    }
  }
);
