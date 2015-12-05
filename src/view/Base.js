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
      if (this._model) {
        this._removeModelListeners();
      }
      
      this._model = model;
      
      this._addModelListeners();
      
      this._render();
    },
    
    _onModelChange: function() {
      this._render();
    },
    
    _render: function() {
    },
    
    _destroy: function() {
      this.super();
      
      this._removeModelListeners();
      
      this._cleanupChannelSet(this._model.getChannelSet());
      this._cleanupChannelSet(artjs.Broadcaster);
    },
    
    _cleanupChannelSet: function(channelSet) {
      var events = artjs.Object.values(channelSet.getChannels());
      var listeners = artjs.Array.invoke(events, 'getItems');
      
      artjs.Array.each(listeners, this._filterListeners, this);
    },
    
    _filterListeners: function(listeners) {
      artjs.Array.$reject(listeners, this._filterListener, this);
    },
    
    _filterListener: function(delegate) {
      return delegate.object == this;
    },
    
    _addModelListeners: function() {
      this._model.onChange.add(this._onModelChangeDelegate);
    },
    
    _removeModelListeners: function() {
      this._model.onChange.remove(this._onModelChangeDelegate);
    }
  },
  {
    _name: 'artjs.View'
  },
  artjs.Component
);
