ArtJs.List = com.arthwood.data.List = function(items) {
  this.items = items || {};
  this.i = 0;
  this.onChange = new ArtJs.CustomEvent('List::onChange');
  this.allowDuplicates = true;
  this.loop = false;
};

ArtJs.List.prototype = {
  addItem: function(item, noEvent) {
    if (this.allowDuplicates || !this.hasItem(item)) {
      this.items.push(item);
      
      if (!noEvent) { this.onChange.fire(this); }
    }
    
    return this.getLength();
  },
  
  addItemAt: function(item, position, noEvent) {
    if (this.allowDuplicates || !this.hasItem(item)) {
      this.items = ArtJs.ArrayUtils.insertAt(this.items, position, item);
      
      if (!noEvent) { this.onChange.fire(this); }
    }
    
    return this.getLength();
  },
  
  removeItem: function(item, onlyFirst, noEvent) {
    ArtJs.ArrayUtils.removeItem(this.items, item, onlyFirst);
    
    if (!noEvent) { this.onChange.fire(this); }
    
    return this.getLength();
  },
  
  removeItemAt: function(position, noEvent) {
    ArtJs.ArrayUtils.removeAt(this.items, position);
    
    if (!noEvent) { this.onChange.fire(this); }
    
    return this.getLength();
  },
  
  removeAll: function(noEvent) {
    this.items.splice(0);
    
    if (!noEvent) { this.onChange.fire(this); }
  },
  
  getItemAt: function(position) {
    position = this.loop ? (ArtJs.MathUtils.sawtooth(position, 0, this.getLength())) : position;
  
    return this.items[position];
  },
  
  getItemIndex: function(item) {
    return this.items.indexOf(item);
  },
  
  moveItem: function(fromIndex, toIndex) {
    var item = this.getItemAt(fromIndex);
    
    this.removeItemAt(fromIndex, true);
    this.addItemAt(item, toIndex);
  },
  
  getLength: function() {
    return this.items.length;
  },
  
  getItems: function() {
    return this.items.concat();
  },
  
  setItems: function(items) {
    this.items = items;
  
    this.onChange.fire(this);
  },
  
  hasItem: function(item) {
    return ArtJs.ArrayUtils.includes(this.items, item);
  },
  
  setPointerAtItem: function(item) {
    if (!this.hasItem(item)) {
      ArtJs.p("{List} There is no item " + item + " in List!");
      return;
    }
  
    this.setPointer(this.getItemIndex(item));
  },
  
  reset: function() {
    this.i = 0;
  },
  
  getPointer: function() {
    return this.i;
  },
  
  setPointer: function(i) {
    this.i = i;
  },
  
  decrease: function() {
    this.i--;
  },
  
  increase: function() {
    this.i++;
  },
  
  getCurrent: function() {
    return this.getItemAt(this.i);
  },
  
  getPrevious: function() {
    return this.getItemAt(this.i - 1);
  },
  
  getNext: function() {
    return this.getItemAt(this.i + 1);
  },
  
  getFirst: function() {
    return ArtJs.ArrayUtils.first(this.items);
  },
  
  getLast: function() {
    return ArtJs.ArrayUtils.last(this.items);
  },

  isEmpty: function() {
    return ArtJs.ArrayUtils.isEmpty(this.items);
  },
  
  isLast: function() {
    return this.i == (this.getLength() - 1);
  },
  
  toString: function() {
    return this.items.toString();
  }
};
