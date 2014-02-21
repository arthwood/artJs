ArtJs.ClassToggler = com.arthwood.utils.ClassToggler = ArtJs.Class(
  function(className) {
    this._className = className;
    this._toggler = new ArtJs.Toggler();
    this._toggler.onActivate.add(ArtJs.$D(this, this._onActivate));
    this._toggler.onDeactivate.add(ArtJs.$D(this, this._onDeactivate));
    this.onActivate = new ArtJs.CustomEvent('ClassToggler::onActivate');
    this.onDeactivate = new ArtJs.CustomEvent('ClassToggler::onDeactivate');
  },
  {
    toggle: function(item) {
      this._toggler.toggle(item);
    },
  
    getCurrent: function() {
      return this._toggler.current;
    },
    
    _onActivate: function(t) {
      if (t.current) ArtJs.ElementUtils.addClass(t.current, this._className);
      
      this.onActivate.fire(this);
    },
    
    _onDeactivate: function(t) {
      if (t.current) ArtJs.ElementUtils.removeClass(t.current, this._className);
      
      this.onDeactivate.fire(this);
    }
  },
  {
    name: 'ClassToggler'
  }
);
