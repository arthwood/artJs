ArtJs.Queue = pl.arthwood.data.Queue = function(queue) {
  this.onModelChange = new ArtJs.Event('onModelChange');
  this._onModelChangeDelegate = ArtJs.$D(this, this._onModelChange);
  this._list = new ArtJs.List(queue);
  this._list.onChange.add(this._onModelChangeDelegate);
};

ArtJs.Queue.prototype._onModelChange = function() {
  this.onModelChange.fire(this);
};

ArtJs.Queue.prototype.addItem = function(item) {
  this._list.addItem(item);
};

ArtJs.Queue.prototype.getItem = function() {
  var item = this._list.getItemAt(0);

  this._list.removeItemAt(0);

  return item;
};

ArtJs.Queue.prototype.setQueue = function(queue) {
  this._list = new ArtJs.List(queue);
};

ArtJs.Queue.prototype.getLength = function() {
  return this._list.getLength();
};

ArtJs.Queue.prototype.isEmpty = function() {
  return this._list.isEmpty();
};
