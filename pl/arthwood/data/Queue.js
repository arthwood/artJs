var Queue = pl.arthwood.data.Queue = function(queue) {
  this.onModelChange = new Event('onModelChange');
  this._onModelChangeDelegate = $D(this, this._onModelChange);
  this._list = new List(queue);
  this._list.onChange.add(this._onModelChangeDelegate);
};

Queue.prototype._onModelChange = function() {
  this.onModelChange.fire(this);
};
Queue.prototype.addItem = function(item) {
  this._list.addItem(item);
};

Queue.prototype.getItem = function() {
  var item = this._list.getItemAt(0);

  this._list.removeItemAt(0);

  return item;
};

Queue.prototype.setQueue = function(queue) {
  this._list = new List(queue);
};

Queue.prototype.getLength = function() {
  return this._list.getLength();
};

Queue.prototype.isEmpty = function() {
  return this._list.isEmpty();
};
