artjs.Channel = artjs.events.Channel = artjs.Class(
  function(name) {
    this._name = name;
    this._events = {};
  },
  {
    register: function(id) {
      this._events[id] = new artjs.Event(id);
    },
    
    addListener: function(id, delegate) {
      this._getEvent(id).add(delegate);
    },
    
    removeListener: function(id, delegate) {
      this._getEvent(id).remove(delegate);
    },
    
    fire: function(id, data) {
      this._getEvent(id).fire(data);
    },
    
    getEvents: function() {
      return this._events;
    },
    
    toString: function() {
      return this._name;
    },
    
    _getEvent: function(id) {
      var result = this._findEvent(id);
      
      if (!result) {
        this.register(id);
        
        result = this._findEvent(id);
      }
      
      return result;
    },
    
    _findEvent: function(id) {
      return this._events[id];
    }
  }
);
