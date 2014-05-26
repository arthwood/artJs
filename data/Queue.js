artjs.Queue = artjs.data.Queue = artjs.Class(
  function(data) {
    this.onChange = new artjs.CustomEvent('Queue::onChange');
    this.list = new artjs.List(data);
    this.list.onChange.add(artjs.$D(this, this._onChange));
  },
  {
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
      this.list = new artjs.List(data);
    },
    
    getLength: function() {
      return this.list.getLength();
    },
  
    isEmpty: function() {
      return this.list.isEmpty();
    },
    
    toString: function() {
      return this.list.toString();
    }
  }
);
