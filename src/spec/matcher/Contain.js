artjs.ContainMatcher = artjs.spec.matcher.Contain = artjs.Class(
  function(expected) {
    this.super(expected, 'contain');
  },
  {
    resolve: function(actual) {
      return artjs.Array.contains(actual.value, this.expected);
    }
  },
  null,
  artjs.BaseMatcher
);
