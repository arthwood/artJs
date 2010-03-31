ArtJs.Rectangle = pl.arthwood.math.Rectangle = function(left, top, right, bottom) {
  this.left = left;
  this.top = top;
  this.right = right;
  this.bottom = bottom;
};

ArtJs.Rectangle.prototype = {
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
    return new ArtJs.Point(this.left, this.top);
  },
  
  getRightBottom: function() {
   return new ArtJs.Point(this.right, this.bottom);
  },
  
  getSize: function() {
    return new ArtJs.Point(this.getWidth(), this.getHeight());
  }
}; 
