artjs.EqMatcher = artjs.spec.matcher.Eq = artjs.Class(
  function(expected) {
    this.super(expected, 'equal');
  },
  {
    resolve: function(actual) {
      if (artjs.ObjectUtils.isArray(actual.value)) {
        return artjs.ArrayUtils.equal([actual.value, this.expected]);
      }
      else {
        return this.super(actual);
      }
    }
  },
  null,
  artjs.BaseMatcher
);
