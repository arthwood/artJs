artjs.ClassToggler = artjs.utils.ClassToggler = artjs.Class(
  function(className) {
    this._className = className;
    this._toggler = new artjs.Toggler();
    this._toggler.onActivate.add(artjs.$D(this, this._onActivate));
    this._toggler.onDeactivate.add(artjs.$D(this, this._onDeactivate));
    this.onActivate = new artjs.CustomEvent('ClassToggler::onActivate');
    this.onDeactivate = new artjs.CustomEvent('ClassToggler::onDeactivate');
  },
  {
    toggle: function(item) {
      this._toggler.toggle(item);
    },
  
    getCurrent: function() {
      return this._toggler.current;
    },
    
    _onActivate: function(t) {
      if (t.current) artjs.ElementUtils.addClass(t.current, this._className);
      
      this.onActivate.fire(this);
    },
    
    _onDeactivate: function(t) {
      if (t.current) artjs.ElementUtils.removeClass(t.current, this._className);
      
      this.onDeactivate.fire(this);
    }
  },
  {
    _name: 'ClassToggler'
  }
);
