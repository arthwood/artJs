artjs.ListView = artjs.view.List = artjs.Class(
  function(element) {
    this.super(element);
    
    this.setModel(new artjs.ListModel());
    
    var data = artjs.Element.getData(element);
    
    this._itemTemplate = data.template;
    this._itemClass = data['item-class'];
  },
  {
    addItem: function(item) {
      var index = this._model.addItem(item);
      
      this._renderItem(item, index - 1);
      
      return index;
    },
    
    removeItem: function(item) {
      var index = artjs.Array.first(this._model.removeItem(item));
      
      artjs.Element.removeAt(this._element, index);
      
      return index;
    },
    
    removeItems: function(items) {
      return artjs.Array.map(items, this.removeItem, this);
    },
    
    setItems: function(items) {
      this._model.items = items;
    },
    
    _render: function() {
      artjs.Element.clear(this._element);
      
      artjs.Array.each(this._model.items, this._renderItem, this);
    },
    
    _renderItem: function(item) {
      var element = artjs.$E('li', {'data-template': this._itemTemplate});
      
      element = artjs.Element.insert(this._element, element);
      
      if (this._itemClass) {
        artjs.ComponentScanner.instantiateClass(this._itemClass, element).setModel(item);
      }
    }
  },
  {
    _name: 'artjs.ListView'
  },
  artjs.View
);
