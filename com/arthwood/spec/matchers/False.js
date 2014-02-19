ArtJs.FalseMatcher = com.arthwood.spec.matchers.False = ArtJs.Class(
  function() {
    this.super(arguments, false);
  },
  null,
  null,
  ArtJs.BaseMatcher
);

function beFalse() {
  return new ArtJs.FalseMatcher();
}
