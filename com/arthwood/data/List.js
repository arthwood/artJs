ArtJs.List = com.arthwood.data.List = function(items) {
  this._items = items || new Array();
  this._i = 0;
  this.onChange = new ArtJs.CustomEvent('List::onChange');
  this.allowDuplicates = true;
  this.loop = false;
};

ArtJs.List.prototype = {
  addItem: function(item) {
    return this.addItemAt(item, this.getLength());
  },
  
  addItemAt: function(item, position, noEvent) {
    if (this.allowDuplicates || !this.hasItem(item)) {
      this._items = ArtJs.ArrayUtils.insertAt(this._items, position, item);
  
      if (!noEvent) {
        this.onChange.fire(this);
      }
    }
  
    return this._items.length;
  },
  
  removeItem: function(item, onlyFirst, noEvent) {
    ArtJs.ArrayUtils.removeItem(this._items, item, onlyFirst);
  
    if (!noEvent) {
      this.onChange.fire(this);
    }
  },
  
  removeItemAt: function(position, noEvent) {
    ArtJs.ArrayUtils.removeAt(this._items, position);
  
    if (!noEvent) {
      this.onChange.fire(this);
    }
  },
  
  removeAll: function() {
    this._items.splice(0);
    this.onChange.fire(this);
  },
  
  getItemAt: function(position) {
    position = this.loop ? (ArtJs.MathUtils.periodicLimit(position, 0, this.getLength())) : position;
  
    return this._items[position];
  },
  
  getItemIndex: function(item) {
    return this._items.indexOf(item);
  },
  
  moveItem: function(item, idx) {
    this.removeItem(item, false, true);
    this.addItemAt(item, idx);
  },
  
  getLength: function() {
    return this._items.length;
  },
  
  getItems: function() {
    return this._items.concat();
  },
  
  setItems: function(items) {
    this._items = items;
  
    this.onChange.fire(this);
  },
  
  hasItem: function(item) {
    return ArtJs.ArrayUtils.include(this._items, item);
  },
  
  setItem: function(item) {
    if (!this.hasItem(item)) {
      ArtJs.p("{List} There is no item " + item + " in List!");
      return;
    }
  
    this.setPointer(this.getItemIndex(item));
  },
  
  reset: function() {
    this._i = 0;
  },
  
  getPointer: function() {
    return this._i;
  },
  
  setPointer: function(i) {
    this._i = i;
  },
  
  decrease: function() {
    this._i--;
  },
  
  increase: function() {
    this._i++;
  },
  
  getCurrent: function() {
    return this.getItemAt(this._i);
  },
  
  getPrevious: function() {
    return this.getItemAt(this._i - 1);
  },
  
  getNext: function() {
    return this.getItemAt(this._i + 1);
  },
  
  getFirst: function() {
    return ArtJs.ArrayUtils.first(this._items);
  },
  
  getLast: function() {
    return ArtJs.ArrayUtils.last(this._items);
  },
  
  empty: function() {
    return ArtJs.ArrayUtils.empty(this._items);
  },
  
  isLast: function() {
    return this._i == (this.getLength() - 1);
  }
};