artjs.EqMatcher = artjs.spec.matchers.Eq = artjs.Class(
  function(expected) {
    this.super(arguments, expected, 'equal');
  },
  {
    resolve: function(actual) {
      if (artjs.ObjectUtils.isArray(actual.value)) {
        return artjs.ArrayUtils.equal([actual.value, this.expected]);
      }
      else {
        return this.super(arguments, actual);
      }
    }
  },
  null,
  artjs.BaseMatcher
);
