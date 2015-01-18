artjs.Event = artjs.events.Event = artjs.Class(
  function(name) {
    this.name = name;
    this.collection = new artjs.DelegateCollection();
  },
  {
    fire: function() {
      return this.collection.invoke.apply(this.collection, artjs.$A(arguments));
    },
    
    add: function(delegate) {
      this.collection.add(delegate);
    },
    
    remove: function(delegate) {
      this.collection.remove(delegate);
    },
    
    removeAll: function() {
      this.collection.clear();
    },
    
    getLength: function() {
      return this.collection.getLength();
    }
  }
);
