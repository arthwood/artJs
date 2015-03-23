artjs.View = artjs.view.Base = artjs.Class(
  function(element) {
    this.super(element);
    
    artjs.$BA(this);
    
    this.setModel(new artjs.Model());
    
    this.onUpdate = new artjs.Event('View::onUpdate');
  },
  {
    getModel: function() {
      return this._model;
    },
    
    setModel: function(model) {
      this._model = model;
      this._model.onChange.add(this._onModelChange.delegate);
    },
    
    _onModelChange: function(property, newValue, oldValue) {
      this.onUpdate.fire(this, property, newValue, oldValue);
    }
  },
  null,
  artjs.Component
);
