ArtJs.DelegateCollection = com.arthwood.events.DelegateCollection = ArtJs.Class(
  function(items) {
    this._items = items || [];
  },
  {
    invoke: function() {
      this._args = ArtJs.$A(arguments);
      
      return ArtJs.ArrayUtils.map(this._items, this._delegateToResult, this);
    },
  
    add: function(delegate) {
      this._items.push(delegate);
    },
    
    removeAt: function(i) {
      ArtJs.ArrayUtils.removeAt(this._items, i);
    },
    
    remove: function(delegate) {
      ArtJs.ArrayUtils.removeItem(this._items, delegate);
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
