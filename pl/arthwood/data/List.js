ArtJs.List = pl.arthwood.data.List = function(items) {
  this._items = items || new Array();
  this._i = 0;
  this.onChange = new ArtJs.Event('change');
  this.allowDuplicates = true;
  this.loop = false;
};

ArtJs.List.prototype.addItem = function(item) {
  return this.addItemAt(item, this.getLength());
};

ArtJs.List.prototype.addItemAt = function(item, position, noEvent) {
  if (this.allowDuplicates || !this.hasItem(item)) {
    this._items = ArtJs.ArrayUtils.insertAt(this._items, position, item);

    if (!noEvent) {
      this.onChange.fire(this);
    }
  }

  return this._items.length;
};


ArtJs.List.prototype.removeItem = function(item, onlyFirst, noEvent) {
  ArtJs.ArrayUtils.removeItem(this._items, item, onlyFirst);

  if (!noEvent) {
    this.onChange.fire(this);
  }
};

ArtJs.List.prototype.removeItemAt = function(position, noEvent) {
  ArtJs.ArrayUtils.removeAt(this._items, position);

  if (!noEvent) {
    this.onChange.fire(this);
  }
};

ArtJs.List.prototype.removeAll = function() {
  this._items.splice(0);
  this.onChange.fire(this);
};

ArtJs.List.prototype.getItemAt = function(position) {
  position = this.loop ? (ArtJs.MathUtils.castToSet(position, 0, this.getLength())) : position;

  return this._items[position];
};

ArtJs.List.prototype.getItemIndex = function(item) {
  return this._items.indexOf(item);
};

ArtJs.List.prototype.moveItem = function(item, idx) {
  this.removeItem(item, false, true);
  this.addItemAt(item, idx);
};

ArtJs.List.prototype.getLength = function() {
  return this._items.length;
};

ArtJs.List.prototype.getItems = function() {
  return this._items;
};

ArtJs.List.prototype.setItems = function(items) {
  this._items = items;

  this.onChange.fire(this);
};

ArtJs.List.prototype.hasItem = function(item) {
  return ArtJs.ArrayUtils.include(this._items, item);
};

ArtJs.List.prototype.setItem = function(item) {
  if (!this.hasItem(item)) {
    ArtJs.p("{List} There is no item " + item + " in List!");
    return;
  }

  this.setPointer(this.getItemIndex(item));
};

ArtJs.List.prototype.reset = function() {
  this._i = 0;
};

ArtJs.List.prototype.getPointer = function() {
  return this._i;
};

ArtJs.List.prototype.setPointer = function(i) {
  this._i = i;
};

ArtJs.List.prototype.decrease = function() {
  this._i--;
};

ArtJs.List.prototype.increase = function() {
  this._i++;
};

ArtJs.List.prototype.getCurrent = function() {
  return this.getItemAt(this._i);
};

ArtJs.List.prototype.getPrevious = function() {
  return this.getItemAt(this._i - 1);
};

ArtJs.List.prototype.getNext = function() {
  return this.getItemAt(this._i + 1);
};

ArtJs.List.prototype.getFirst = function() {
  return ArtJs.ArrayUtils.first(this._items);
};

ArtJs.List.prototype.getLast = function() {
  return ArtJs.ArrayUtils.last(this._items);
};

ArtJs.List.prototype.isEmpty = function() {
  return ArtJs.ArrayUtils.empty(this._items);
};

ArtJs.List.prototype.isLast = function() {
  return this._i == (this.getLength() - 1);
};
