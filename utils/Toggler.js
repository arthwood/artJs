artjs.Toggler = artjs.utils.Toggler = artjs.Class(
  function(unique) {
    this.unique = unique;
    this.current = null;
    this.onActivate = new artjs.Event('Toggler::onActivate');
    this.onDeactivate = new artjs.Event('Toggler::onDeactivate');
  },
  {
    toggle: function(item) {
      if (!(this.unique && this.current == item)) {
        this.onDeactivate.fire(this);

        this.current = item;

        this.onActivate.fire(this);
      }
    }
  },
  {
    _name: 'Toggler',
    
    toString: function() {
      return this._name;
    }
  }
);
