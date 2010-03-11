ArtJs.Point = pl.arthwood.math.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

ArtJs.Point.prototype.getLength = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

ArtJs.Point.dot = function(p1, p2) {
  return (p1.x * p2.x + p1.y * p2.y);
};

ArtJs.Point.add = function(p) {
  return new ArtJs.Point(this.x + p.x, this.y + p.y);
};

ArtJs.Point.sub = function(p) {
  return this.add(p.getReversed());
};

ArtJs.Point.getReversed = function() {
  return this.times(-1);
};

ArtJs.Point.reverseX = function() {
  this.x = - this.x;
};

ArtJs.Point.reverseY = function() {
  this.y = - this.y;
};

ArtJs.Point.reverse = function() {
  this.reverseX();
  this.reverseY();
};

ArtJs.Point.times = function(k) {
  return new ArtJs.Point(k * this.x, k * this.y);
};

