artjs.DelegateCollection = artjs.events.DelegateCollection = artjs.Class(
  function(items) {
    this._items = items || [];
  },
  {
    invoke: function() {
      this._args = artjs.$A(arguments);
      
      return artjs.ArrayUtils.map(this._items, this._delegateToResult, this);
    },
  
    add: function(delegate) {
      this._items.push(delegate);
    },
    
    removeAt: function(i) {
      artjs.ArrayUtils.removeAt(this._items, i);
    },
    
    remove: function(delegate) {
      artjs.ArrayUtils.removeItem(this._items, delegate);
    },
    
    clear: function() {
      this._items.splice(0);
    },
    
    getLength: function() {
      return this._items.length;
    },
    
    _delegateToResult: function(i, idx, arr) {
      return i.invoke.apply(i, this._args);
    }
  }
);
