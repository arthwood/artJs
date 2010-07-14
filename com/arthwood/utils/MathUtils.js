ArtJs.MathUtils = com.arthwood.utils.MathUtils = {
  sgn: function(x) {
    return x === 0 ? 0 : Math.abs(x) / x;
  },
  
  limit: function(x, a, b) {
    return Math.min(Math.max(x, a), b);
  },
  
  periodicLimit: function(x, a, b) {
    return x - this.stairs(x, a, b) * (b - a);
  },
  
  stairs: function(x, a, b) {
    return Math.floor((x - a) / (b - a));
  }
};
