artjs.View = artjs.view.Base = artjs.Class(
  function(element) {
    this.super(element);
    
    this._onModelChangeDelegate = artjs.$D(this, '_onModelChange');
  },
  {
    getModel: function() {
      return this._model;
    },
    
    setModel: function(model) {
      this._model = model;
      this._model.addListener(this._onModelChangeDelegate);
      
      this._render();
    },
    
    _onModelChange: function() {
      this._render();
    },
    
    _render: function() {
    },
    
    _destroy: function() {
      this.super();
      
      this._model.removeListener(this._onModelChangeDelegate);
    }
  },
  {
    _name: 'artjs.View'
  },
  artjs.Component
);
