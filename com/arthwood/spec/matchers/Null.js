ArtJs.NullMatcher = com.arthwood.spec.matchers.Null = ArtJs.Class(
  function() {
    this.super(arguments, null);
  },
  null,
  null,
  ArtJs.BaseMatcher
);

function beNull() {
  return new ArtJs.NullMatcher();
}
