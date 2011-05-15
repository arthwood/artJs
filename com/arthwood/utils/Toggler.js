ArtJs.Toggler = com.arthwood.utils.Toggler = function(onDelegate, offDelegate) {
  this.current = null;
  this.onDelegate = onDelegate;
  this.offDelegate = offDelegate;
};

ArtJs.Toggler.prototype = {
  toggle: function(item) {
    if (this.current) this.offDelegate.invoke(this.current);
    
    this.current = item;
    
    if (this.current) this.onDelegate.invoke(this.current);
  }
};
