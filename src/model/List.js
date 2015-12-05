artjs.ListModel = artjs.model.List = artjs.Class(
  function() {
    this.super();
    
    this.addProperty('items', []);
    this.addPropertyListener('items', artjs.$D(this, '_onItemsChange'));
    this._onItemChangeDelegate = artjs.$D(this, '_onItemChange');
    this.onItemChange = new artjs.Event('ListModel::onItemChange');
    this.onItemAdd = new artjs.Event('ListModel::onItemAdd');
    this.onItemRemove = new artjs.Event('ListModel::onItemRemove');
  },
  {
    addItem: function(item) {
      this._listenItem(item);
      
      var index = this.items.push(item);
      
      this.onItemAdd.fire(item, index);
    },
    
    removeItem: function(item) {
      item.onChange.remove(this._onItemChangeDelegate);

      var index = artjs.Array.removeItem(this.items, item, true);
      
      this.onItemRemove.fire(item, index);
    },
    
    removeItems: function(items) {
      artjs.Array.each(items, this.removeItem, this);
    },
    
    _listenItem: function(item) {
      item.onChange.add(this._onItemChangeDelegate);
    },
    
    _onItemChange: function(item, property) {
      this.onItemChange.fire(item, property);
    },
    
    _onItemsChange: function() {
      artjs.Array.each(this.items, this._listenItem, this);
    }
  },
  null,
  artjs.Model
);
