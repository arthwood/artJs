ArtJs.Point = com.arthwood.math.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

ArtJs.Point.prototype = {
  getLength: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  
  dot: function(p) {
    return (this.x * p.x + this.y * p.y);
  },
  
  add: function(p) {
    return new ArtJs.Point(this.x + p.x, this.y + p.y);
  },
  
  sub: function(p) {
    return this.add(p.getReversed());
  },
  
  getReversed: function() {
    return this.times(-1);
  },
  
  reverseX: function() {
    this.x = - this.x;
    
    return this;
  },
  
  reverseY: function() {
    this.y = - this.y;
    
    return this;
  },
  
  transpose: function() {
    var temp = this.x;
    
    this.x = this.y;
    this.y = temp;
    
    return this;
  },
  
  getTransposed: function() {
    return new ArtJs.Point(this.y, this.x);
  },
  
  reverse: function() {
    this.reverseX();
    this.reverseY();
    
    return this;
  },
  
  times: function(k) {
    return new ArtJs.Point(k * this.x, k * this.y);
  },
  
  toString: function() {
    return '[' + this.x + ', ' + this.y + ']';
  }
};
