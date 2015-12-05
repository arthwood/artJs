artjs.ListView = artjs.view.List = artjs.Class(
  function(element) {
    this.super(element);
  
    this._onItemAddDelegate = artjs.$D(this, '_onItemAdd');
    this._onItemRemoveDelegate = artjs.$D(this, '_onItemRemove');
    this._onItemChangeDelegate = artjs.$D(this, '_onItemChange');
    
    this.setModel(new artjs.ListModel());
    
    var data = artjs.Element.getData(element);
    
    this._itemTemplate = data.template;
    this._itemClass = data['item-class'];
  },
  {
    _onItemAdd: function(item) {
      this._insertItem(item);
    },
  
    _onItemRemove: function(item, index) {
      artjs.Element.removeAt(this._element, index);
    },
  
    _onItemChange: function(item, property) {
      
    },
    
    _render: function() {
      artjs.Element.clear(this._element);
      
      artjs.Array.each(this._model.items, this._insertItem, this);
    },
    
    _insertItem: function(item) {
      var element = artjs.$E('li', {'data-template': this._itemTemplate});
      
      element = artjs.Element.insert(this._element, element);
      
      if (this._itemClass) {
        artjs.ComponentScanner.instantiateClass(this._itemClass, element).setModel(item);
      }
    },
  
    _addModelListeners: function() {
      this.super();
  
      this._model.onItemAdd.add(this._onItemAddDelegate);
      this._model.onItemRemove.add(this._onItemRemoveDelegate);
      this._model.onItemChange.add(this._onItemChangeDelegate);
    },
  
    _removeModelListeners: function() {
      this.super();
      
      this._model.onItemAdd.remove(this._onItemAddDelegate);
      this._model.onItemRemove.remove(this._onItemRemoveDelegate);
      this._model.onItemChange.remove(this._onItemChangeDelegate);
    }
  },
  {
    _name: 'artjs.ListView'
  },
  artjs.View
);
