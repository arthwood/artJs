artjs.Event = artjs.events.Event = artjs.Class(
  function(name) {
    this._name = name;
    this._items = [];
  },
  {
    fire: function() {
      this._args = artjs.$A(arguments);
      
      return artjs.Array.map(this._items, this._delegateToResult, this);
    },
    
    add: function(delegate) {
      this._items.push(delegate);
    },
    
    remove: function(delegate) {
      artjs.Array.removeItem(this._items, delegate);
    },
    
    removeAll: function() {
      this._items.splice(0);
    },
    
    getLength: function() {
      return this._items.length;
    },
    
    getName: function() {
      return this._name;
    },
    
    _delegateToResult: function(i, idx, arr) {
      return i.invoke.apply(i, this._args);
    }
  }
);
