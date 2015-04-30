artjs.ListModel = artjs.model.List = artjs.Class(
  function() {
    this.super();
    
    this.addProperty('items');
    this.addPropertyListener('items', artjs.$D(this, '_onItemsChange'));
    this._onItemChangeDelegate = artjs.$D(this, '_onItemChange');
    this.onItemChange = new artjs.Event('ListModel::onItemChange');
  },
  {
    addItem: function(item) {
      this._listenItem(item);
      
      return this.items.push(item);
    },
    
    removeItem: function(item) {
      item.onChange.remove(this._onItemChangeDelegate);

      return artjs.Array.removeItem(this.items, item, true);
    },
    
    _listenItem: function(item) {
      item.onChange.add(this._onItemChangeDelegate);
    },
    
    _onItemChange: function(item) {
      this.onItemChange.fire(this, item);
    },
    
    _onItemsChange: function() {
      artjs.Array.each(this.items, this._listenItem, this);
    }
  },
  null,
  artjs.Model
);
