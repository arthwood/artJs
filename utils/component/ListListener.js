artjs.utils.component.ListListener = artjs.ListListener = artjs.Class(
  function(component, id, delegate) {
    artjs.$BA(this);
    
    this._delegate = delegate;
    
    artjs.Component.onLoad(id, this._onLoad.delegate);
  },
  {
    _onLoad: function(list) {
      list.getModel().addPropertyListener('items', this._delegate);
    }
  },
  {
    create: function(component, id, delegate) {
      return new this(component, id, delegate);
    }
  }
);
