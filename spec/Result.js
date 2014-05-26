artjs.SpecResult = artjs.spec.Result = artjs.Class(
  function(actual, matcher, value) {
    this.path = runner.path.concat();
    this.actual = actual;
    this.matcher = matcher;
    this.value = value;
  },
  {
    failureText: function() {
      return this.matcher.failureText(this.actual);
    }
  }
);
