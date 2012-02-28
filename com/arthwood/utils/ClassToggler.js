ArtJs.ClassToggler = com.arthwood.utils.ClassToggler = function(className) {
  this.className = className;
  this.toggler = new ArtJs.Toggler();
  this.toggler.onActivate.add(ArtJs.$D(this, this._onActivate));
  this.toggler.onDeactivate.add(ArtJs.$D(this, this._onDeactivate));
  this.onActivate = new ArtJs.CustomEvent('ClassToggler::onActivate');
  this.onDeactivate = new ArtJs.CustomEvent('ClassToggler::onDeactivate');
};

ArtJs.ClassToggler.prototype = {
  toggle: function(item) {
    this.toggler.toggle(item);
  },
  
  _onActivate: function(t) {
    if (t.current) t.current.addClass(this.className);
    
    this.onActivate.fire(this);
  },
  
  _onDeactivate: function(t) {
    if (t.current) t.current.removeClass(this.className);
    
    this.onDeactivate.fire(this);
  },
  
  getCurrent: function() {
    return this.toggler.current;
  }
};
