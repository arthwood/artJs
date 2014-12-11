artjs.NullMatcher = artjs.spec.matchers.Null = artjs.Class(
  function() {
    this.super(arguments, null);
  },
  null,
  null,
  artjs.BaseMatcher
);
