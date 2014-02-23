ArtJs.AMatcher = com.arthwood.spec.matchers.A = ArtJs.Class(
  function(expected) {
    this.super(arguments, expected);
  },
  {
    resolve: function(actual) {
      return typeof actual.value === this.expected;
    }
  },
  null,
  ArtJs.BaseMatcher
);

function beA(expected) {
  return new ArtJs.AMatcher(expected);
}
