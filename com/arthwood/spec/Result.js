ArtJs.SpecResult = com.arthwood.spec.Result = function(expectation, matcher, value) {
  this.path = runner.path.concat();
  this.expectation = expectation;
  this.matcher = matcher;
  this.value = value;
};
