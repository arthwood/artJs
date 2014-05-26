artjs.FalseMatcher = artjs.spec.matchers.False = artjs.Class(
  function() {
    this.super(arguments, false);
  },
  null,
  null,
  artjs.BaseMatcher
);

function beFalse() {
  return new artjs.FalseMatcher();
}
