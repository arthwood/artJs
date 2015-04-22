artjs.Component = artjs.component.Base = artjs.Class(
  function(element) {
    this._element = element;
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
      return new artjs.ComponentEventHandler(this, id, artjs.$D(this, method), type);
    },
    
    _register: function(map) {
      artjs.Object.eachPair(map, this._registerEach, this);
    },
    
    _registerEach: function(k, v) {
      this.ctor.onLoad(k, artjs.$D(this, v));
    }
  },
  {
    _name: 'Component',
    
    _idToComponent: {},
    
    _onExtended: function() {
      this.super();
    },
    
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
