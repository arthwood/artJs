ArtJs.Event = pl.arthwood.events.Event = function(name) {
  this.name = name;
  this.delegateCollection = new ArtJs.DelegateCollection();
};

ArtJs.Event.prototype = {
  fire: function() {
    return this.delegateCollection.invoke.apply(this.delegateCollection, ArtJs.$A(arguments));
  },
  
  add: function(delegate) {
    this.delegateCollection.combine(delegate);
  },
  
  remove: function(delegate) {
    this.delegateCollection.removeDelegate(delegate);
  },
  
  removeAll: function() {
    this.delegateCollection.clear();
  },
  
  length: function() {
    return this.delegateCollection.length();
  },
  
  toString: function() {
    return 'Event "' + this.name + '", listeners: ' + this.length();
  }
};
