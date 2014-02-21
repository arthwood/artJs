ArtJs.Mock = com.arthwood.spec.Mock = ArtJs.Class(
  function() {
  },
  {
    toString: function() {
      return 'mock';
    }
  }
);

function mock() {
  return new ArtJs.Mock();
}
