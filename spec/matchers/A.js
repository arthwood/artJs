artjs.AMatcher = artjs.spec.matchers.A = artjs.Class(
  function(expected) {
    this.super(arguments, expected);
  },
  {
    resolve: function(actual) {
      return typeof actual.value === this.expected;
    }
  },
  null,
  artjs.BaseMatcher
);

function beA(expected) {
  return new artjs.AMatcher(expected);
}
