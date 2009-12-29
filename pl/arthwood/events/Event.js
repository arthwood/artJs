ArtJs.Event = pl.arthwood.events.Event = function(name) {
  this.name = name;
  this.delegateCollection = new ArtJs.DelegateCollection();
};

ArtJs.Event.prototype.fire = function() {
  return this.delegateCollection.invoke.apply(this.delegateCollection, ArtJs.$args(arguments));
};

ArtJs.Event.prototype.add = function(delegate) {
  this.delegateCollection.combine(delegate);
};

ArtJs.Event.prototype.remove = function(delegate) {
  this.delegateCollection.removeDelegate(delegate);
};

ArtJs.Event.prototype.removeAll = function() {
  this.delegateCollection.clear();
};

ArtJs.Event.prototype.length = function() {
  return this.delegateCollection.length();
};

ArtJs.Event.prototype.toString = function() {
  return 'Event "' + this.name + '", listeners: ' + this.length();
};
