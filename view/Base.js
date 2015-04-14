artjs.View = artjs.view.Base = artjs.Class(
  null,
  {
    getModel: function() {
      return this._model;
    },
    
    setModel: function(model) {
      this._model = model;
      this._model.addListener(this._onModelChange.delegate);
      
      this._render();
    },
    
    _onModelChange: function() {
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
