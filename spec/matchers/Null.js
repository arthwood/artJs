artjs.NullMatcher = artjs.spec.matchers.Null = artjs.Class(
  function() {
    this.super(arguments, null);
  },
  null,
  null,
  artjs.BaseMatcher
);

function beNull() {
  return new artjs.NullMatcher();
}
