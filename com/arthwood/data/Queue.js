ArtJs.Queue = com.arthwood.data.Queue = function(data) {
  this.onChange = new ArtJs.CustomEvent('Queue::onChange');
  this.list = new ArtJs.List(data);
  this.list.onChange.add(ArtJs.$D(this, this._onChange));
};

ArtJs.Queue.prototype = {
  _onChange: function() {
    this.onChange.fire(this);
  },

  addItem: function(item) {
    return this.list.addItem(item);
  },
  
  getItem: function() {
    var item = this.list.getItemAt(0);
    
    this.list.removeItemAt(0);
    
    return item;
  },
  
  setData: function(data) {
    this.list = new ArtJs.List(data);
  },
  
  getLength: function() {
    return this.list.getLength();
  },
  
  empty: function() {
    return this.list.empty();
  },
  
  toString: function() {
    return this.list.toString();
  }
};
