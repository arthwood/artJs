ArtJs.ClassToggler = com.arthwood.utils.ClassToggler = function(className) {
  this.className = className;
  this.onD = new ArtJs.$D(this, this.on);
  this.offD = new ArtJs.$D(this, this.off);
  this.toggler = new Toggler(this.onD, this.offD);
};

ArtJs.ClassToggler.prototype = {
  toggle: function(item) {
    this.toggler.toggle(item);
  },
  
  on: function(item) {
    item.addClass(this.className);
  },
  
  off: function(item) {
    item.removeClass(this.className);
  }
};
