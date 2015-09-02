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
      this._model.onChange.add(this._onModelChangeDelegate);
      
      this._render();
    },
    
    _onModelChange: function() {
      this._render();
    },
    
    _render: function() {
    },
    
    _destroy: function() {
      this.super();
      
      this._model.onChange.remove(this._onModelChangeDelegate);
      
      this._cleanupChannel(this._model.getChannel());
      this._cleanupChannel(artjs.Broadcaster);
    },
    
    _cleanupChannel: function(channel) {
      var events = artjs.Object.values(channel.getEvents());
      var listeners = artjs.Array.invoke(events, 'getItems');
      
      artjs.Array.each(listeners, this._filterListeners, this);
    },
    
    _filterListeners: function(listeners) {
      artjs.Array.$reject(listeners, this._filterListener, this);
    },
    
    _filterListener: function(delegate) {
      return delegate.object == this;
    }
  },
  {
    _name: 'artjs.View'
  },
  artjs.Component
);
