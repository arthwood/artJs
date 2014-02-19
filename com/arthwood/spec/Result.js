ArtJs.SpecResult = com.arthwood.spec.Result = ArtJs.Class(
  function(expectation, matcher, value) {
    this.path = runner.path.concat();
    this.expectation = expectation;
    this.matcher = matcher;
    this.value = value;
  }
);
