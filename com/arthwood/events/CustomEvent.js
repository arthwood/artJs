ArtJs.CustomEvent = com.arthwood.events.CustomEvent = ArtJs.Class(
  function(name) {
    this.name = name;
    this.collection = new ArtJs.DelegateCollection();
  },
  {
    fire: function() {
      return this.collection.invoke.apply(this.collection, ArtJs.$A(arguments));
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
