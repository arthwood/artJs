var Event = pl.arthwood.events.Event = function(name) {
  this.name = name;
  this.delegateCollection = new DelegateCollection();
};

Event.prototype.fire = function() {
  return this.delegateCollection.invoke.apply(this.delegateCollection, $args(arguments));
};

Event.prototype.add = function(delegate) {
  this.delegateCollection.combine(delegate);
};

Event.prototype.remove = function(delegate) {
  this.delegateCollection.removeDelegate(delegate);
};

Event.prototype.removeAll = function() {
  this.delegateCollection.clear();
};

Event.prototype.length = function() {
  return this.delegateCollection.length();
};

Event.prototype.toString = function() {
  return 'Event "' + this.name + '", listeners: ' + this.length();
};
