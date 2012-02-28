ArtJs.Toggler = com.arthwood.utils.Toggler = function() {
  this.current = null;
  this.onActivate = new ArtJs.CustomEvent('Toggler::onActivate');
  this.onDeactivate = new ArtJs.CustomEvent('Toggler::onDeactivate');
};

ArtJs.Toggler.prototype = {
  toggle: function(item) {
    this.onDeactivate.fire(this);
    
    this.current = item;
    
    this.onActivate.fire(this);
  }
};
