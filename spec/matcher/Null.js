artjs.NullMatcher = artjs.spec.matcher.Null = artjs.Class(
  function() {
    this.super(arguments, null);
  },
  null,
  null,
  artjs.BaseMatcher
);
