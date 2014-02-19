ArtJs.TrueMatcher = com.arthwood.spec.matchers.True = ArtJs.Class(
  function() {
    this.super(arguments, true);
  },
  null,
  null,
  ArtJs.BaseMatcher
);

function beTrue() {
  return new ArtJs.TrueMatcher();
}
