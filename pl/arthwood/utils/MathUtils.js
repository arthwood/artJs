ArtJs.MathUtils = pl.arthwood.utils.MathUtils = {
  castToSet: function(x, a, b) {
    return x - this.stairs(x, a, b) * (b - a);
  },

  stairs: function(x, a, b) {
    return Math.floor((x - a)/(b - a));
  }
};
