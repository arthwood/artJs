artjs.Rectangle = artjs.math.Rectangle = function(left, top, right, bottom) {
  this.left = left;
  this.top = top;
  this.right = right;
  this.bottom = bottom;
};

artjs.Rectangle.prototype = {
  getWidth: function() {
    return this.right - this.left;
  },
  
  getHeight: function() {
    return this.bottom - this.top;
  },
  
  getArea: function() {
    return this.getWidth() * this.getHeight();
  },
  
  getLeftTop: function() {
    return new artjs.Point(this.left, this.top);
  },
  
  getRightTop: function() {
    return new artjs.Point(this.right, this.top);
  },
  
  getRightBottom: function() {
   return new artjs.Point(this.right, this.bottom);
  },
  
  getLeftBottom: function() {
    return new artjs.Point(this.left, this.bottom);
  },
  
  getSize: function() {
    return new artjs.Point(this.getWidth(), this.getHeight());
  },
  
  moveBy: function(p) {
    this.left += p.x;
    this.top += p.y;
    this.right += p.x;
    this.bottom += p.y;
  }
}; 
