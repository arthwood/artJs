artjs.Component = artjs.component.Base = artjs.Class(
  function(element) {
    this._element = element;
    this._handlers = [];
  },
  {
    getElement: function() {
      return this._element;
    },
    
    _fire: function(id) {
      artjs.Broadcaster.fire(id, this);
    },
    
    _handle: function(id, method) {
      this._handleEvent(id, method);
    },
      
    _handleEmit: function(id, method) {
      return this._handleEvent(id, method, artjs.ComponentEventHandler.UP);
    },
    
    _handleBroadcast: function(id, method) {
      return this._handleEvent(id, method, artjs.ComponentEventHandler.DOWN);
    },
    
    _handleEvent: function(id, method, type) {
      var handler = new artjs.ComponentEventHandler(this, id, artjs.$D(this, method), type);
      
      this._handlers.push(handler);
      
      return handler;
    },
    
    _registerAll: function(map) {
      artjs.Object.each(map, this._register, this);
    },
    
    _register: function(k, v) {
      this.ctor.onLoad(k, artjs.$D(this, v));
    },
    
    _destroy: function() {
      artjs.Array.invoke(this._handlers, '_destroy');
      
      delete this._handlers;
    }
  },
  {
    _name: 'Component',
    
    _idToComponent: {},
    
    instances: [],

    register: function(id, instance) {
      this._idToComponent[id] = instance;
    },
    
    find: function(id) {
      return this._idToComponent[id];
    },
    
    onLoad: function(id, delegate) {
      var component = this.find(id);
      
      if (component) {
        delegate.invoke(component);
      }
      else {
        artjs.ComponentScanner.addListener(id, delegate);
      }
    },
    
    toString: function() {
      return this._name;
    }
  }
);
