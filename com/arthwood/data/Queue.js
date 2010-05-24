ArtJs.Queue = com.arthwood.data.Queue = function(data) {
  this.onChange = new ArtJs.CustomEvent('Queue::onChange');
  this._list = new ArtJs.List(data);
  this._list.onChange.add(ArtJs.$D(this, this._onChange));
};

ArtJs.Queue.prototype = {
  _onChange: function() {
    this.onChange.fire(this);
  },

  addItem: function(item) {
    this._list.addItem(item);
  },
  
  getItem: function() {
    var item = this._list.getItemAt(0);
    
    this._list.removeItemAt(0);
    
    return item;
  },
  
  setData: function(data) {
    this._list = new ArtJs.List(data);
  },
  
  getLength: function() {
    return this._list.getLength();
  },
  
  empty: function() {
    return this._list.empty();
  }
};
