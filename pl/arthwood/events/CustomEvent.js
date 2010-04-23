ArtJs.CustomEvent = pl.arthwood.events.CustomEvent = function(name) {
  this.name = name;
  this.collection = new ArtJs.DelegateCollection();
};

ArtJs.CustomEvent.prototype = {
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
  
  length: function() {
    return this.collection.length();
  },
  
  toString: function() {
    return 'CustomEvent "' + this.name + '", listeners: ' + this.length();
  }
};
