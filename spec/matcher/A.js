artjs.AMatcher = artjs.spec.matcher.A = artjs.Class(
  function(expected) {
    this.super(expected);
  },
  {
    resolve: function(actual) {
      return typeof actual.value === this.expected;
    }
  },
  null,
  artjs.BaseMatcher
);
