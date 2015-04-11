artjs.View = artjs.view.Base = artjs.Class(
  function(element, model) {
    this.super(element);
    
    this.setModel(model || new artjs.Model());
    
    this.onUpdate = new artjs.Event('View::onUpdate');
  },
  {
    getModel: function() {
      return this._model;
    },
    
    setModel: function(model) {
      this._model = model;
      this._model.onChange.add(this._onModelChange.delegate);
      
      this._render();
    },
    
    _onModelChange: function(property, newValue, oldValue) {
      this.onUpdate.fire(this, property, newValue, oldValue);
      
      this._render();
    },
    
    _render: function() {
    }
  },
  {
    _name: 'artjs.View'
  },
  artjs.Component
);
