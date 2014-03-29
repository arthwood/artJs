ArtJs.MathUtils = com.arthwood.utils.Math = {
  name: 'MathUtils',
  
  sgn: function(x) {
    return x === 0 ? 0 : Math.abs(x) / x;
  },
  
  limit: function(x, a, b) {
    return Math.min(Math.max(x, a), b);
  },

  sawtooth: function(x, a, b) {
    return x - this.stairs(x, a, b) * (b - a);
  },
  
  stairs: function(x, a, b) {
    return Math.floor((x - a) / (b - a));
  },

  isNonNegative: function(x) {
    return Boolean(this.sgn(x) + 1);
  }
};
