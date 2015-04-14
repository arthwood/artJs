artjs.ListView = artjs.view.List = artjs.Class(
  function(element) {
    this.super(element);
    
    var model = new artjs.Model();
    
    model.addProperty('items');
    
    this.setModel(model);
    
    var data = artjs.Element.getData(element);
    
    this._itemTemplate = data.template;
    this._itemClass = data['item-class'];
  },
  {
    setItems: function(items) {
      artjs.Array.each(items, this._listenItem, this);
      
      this._model.items = items;
    },
    
    _onItemModelChange: function() {
      var items = this._model.items;
      
      this._model.onPropertyChange('items', items, items);
    },
    
    addItem: function(item) {
      var items = this._model.items;
      var idx = items.push(item);
      
      this._renderEach(item, idx - 1);
      this._listenItem(item);
      
      this._model.onPropertyChange('items', items, items);
    },
    
    removeItem: function(item) {
      var items = this._model.items;
      var idx = artjs.Array.removeItem(items, item);
      
      artjs.Element.removeAt(this._element, idx);
      
      item.removeListener(this._onItemModelChange.delegate);
      
      this._model.onPropertyChange('items', items, items);
    },
    
    _render: function() {
      artjs.Element.clear(this._element);
      
      artjs.Array.each(this._model.items, this._renderEach, this);
    },
    
    _renderEach: function(item, index) {
      var element = artjs.$E('li', {'data-template': this._itemTemplate});
      
      element = artjs.Element.insert(this._element, element);
      
      item.setProperty('index', index);
      
      artjs.ComponentScanner.instantiateClass(this._itemClass, element).setModel(item);
    },
    
    _listenItem: function(item) {
      item.addListener(this._onItemModelChange.delegate);
    }
  },
  {
    _name: 'artjs.ListView'
  },
  artjs.View
);
