ArtJs.EqMatcher = com.arthwood.spec.matchers.Eq = ArtJs.Class(
  function(expected) {
    this.super(arguments, expected, 'equal');
  },
  {
    resolve: function(actual) {
      if (ArtJs.ObjectUtils.isArray(actual.value)) {
        return ArtJs.ArrayUtils.equal([actual.value, this.expected]);
      }
      else {
        return this.super(arguments, actual);
      }
    }
  },
  null,
  ArtJs.BaseMatcher
);

function eq(expected) {
  return new ArtJs.EqMatcher(expected);
}
