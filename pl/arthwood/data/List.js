var List = pl.arthwood.data.List = function(items) {
  this._items = items || new Array();
  this._i = 0;
  this.onChange = new Event('change');
  this.allowDuplicates = true;
  this.loop = false;
};

List.prototype.addItem = function(item) {
  return this.addItemAt(item, this.getLength());
};

List.prototype.addItemAt = function(item, position, noEvent) {
  if (this.allowDuplicates || !this.hasItem(item)) {
    this._items = ArrayUtils.insertAt(this._items, position, item);

    if (!noEvent) {
      this.onChange.fire(this);
    }
  }

  return this._items.length;
};


List.prototype.removeItem = function(item, onlyFirst, noEvent) {
  var n = this.getLength();
  var removed = false;

  ArrayUtils.removeItem(this._items, item, onlyFirst);

  if ((removed = (this.getLength() == n - 1)) && !noEvent) {
    this.onChange.fire(this);
  }

  return removed;
};

List.prototype.removeItemAt = function(position, noEvent) {
  var item = this.getItemAt(position);
  var removed = this.removeItem(item, false, noEvent);

  return {item: item, removed: removed};
};

List.prototype.removeAll = function() {
  this._items.splice(0);
  this.onChange.fire(this);
};

List.prototype.getItemAt = function(position) {
  position = this.loop ? (MathUtils.castToSet(position, 0, this.getLength())) : position;

  return this._items[position];
};

List.prototype.getItemIndex = function(item) {
  return this._items.indexOf(item);
};

List.prototype.moveItem = function(item, idx) {
  this.removeItem(item, false, true);
  this.addItemAt(item, idx);
};

List.prototype.getLength = function() {
  return this._items.length;
};

List.prototype.getItems = function() {
  return this._items;
};

List.prototype.setItems = function(items) {
  this._items = items;

  this.onChange.fire(this);
};

List.prototype.hasItem = function(item) {
  return ArrayUtils.include(this._items, item);
};

List.prototype.setItem = function(item) {
  if (!this.hasItem(item)) {
    p("{List} There is no item " + item + " in List!");
    return;
  }

  this.setPointer(this.getItemIndex(item));
};

List.prototype.reset = function() {
  this._i = 0;
};

List.prototype.getPointer = function() {
  return this._i;
};

List.prototype.setPointer = function(i) {
  this._i = i;
};

List.prototype.decrease = function() {
  this._i--;
};

List.prototype.increase = function() {
  this._i++;
};

List.prototype.getCurrent = function() {
  return this.getItemAt(this._i);
};

List.prototype.getPrevious = function() {
  return this.getItemAt(this._i - 1);
};

List.prototype.getNext = function() {
  return this.getItemAt(this._i + 1);
};

List.prototype.getFirst = function() {
  return ArrayUtils.first(this._items);
};

List.prototype.getLast = function() {
  return ArrayUtils.last(this._items);
};

List.prototype.isEmpty = function() {
  return ArrayUtils.empty(this._items);
};

List.prototype.isLast = function() {
  return this._i == (this.getLength() - 1);
};
