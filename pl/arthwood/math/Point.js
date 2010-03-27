ArtJs.Point = pl.arthwood.math.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

ArtJs.Point.prototype.getLength = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

ArtJs.Point.prototype.dot = function(p) {
  return (this.x * p.x + this.y * p.y);
};

ArtJs.Point.prototype.add = function(p) {
  return new ArtJs.Point(this.x + p.x, this.y + p.y);
};

ArtJs.Point.prototype.sub = function(p) {
  return this.add(p.getReversed());
};

ArtJs.Point.prototype.getReversed = function() {
  return this.times(-1);
};

ArtJs.Point.prototype.reverseX = function() {
  this.x = - this.x;
  
  return this;
};

ArtJs.Point.prototype.reverseY = function() {
  this.y = - this.y;
  
  return this;
};

ArtJs.Point.prototype.transpose = function() {
  var temp = this.x;
  
  this.x = this.y;
  this.y = temp;
  
  return this;
};

ArtJs.Point.prototype.getTransposed = function() {
  return new ArtJs.Point(this.y, this.x);
};

ArtJs.Point.prototype.reverse = function() {
  this.reverseX();
  this.reverseY();
  
  return this;
};

ArtJs.Point.prototype.times = function(k) {
  return new ArtJs.Point(k * this.x, k * this.y);
};

ArtJs.Point.prototype.toString = function() {
  return '[' + this.x + ', ' + this.y + ']';
};
