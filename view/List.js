artjs.ListView = artjs.view.List = artjs.Class(
  function(element) {
    var model = new artjs.Model();

    model.addProperty('items', []);
    
    this.super(element, model);
    
    var data = artjs.Element.getData(element);
    
    this._itemTemplate = data.template;
    this._itemClass = data['item-class'];
  },
  {
    add: function(model) {
      var items = this._model.items;
      var idx = items.push(model);
      
      this._renderEach(model, idx - 1);
      
      this._model.onPropertyChange('items', items, items);
    },
    
    remove: function(model) {
      var items = this._model.items;
      var idx = artjs.Array.removeItem(items, model);
      
      artjs.Element.removeAt(this._element, idx);
      
      this._model.onPropertyChange('items', items, items);
    },
    
    _render: function() {
      artjs.Element.clear(this._element);
      
      artjs.Array.each(this._model.items, this._renderEach, this);
    },
    
    _renderEach: function(model, idx) {
      var element = artjs.$E('li', {'data-template': this._itemTemplate});
      
      element = artjs.Element.insert(this._element, element);
      
      var instance = artjs.ComponentScanner.instantiateClass(this._itemClass, element);
      
      model.setProperty('index', idx);
      
      instance.setModel(model);
    }
  },
  {
    _name: 'artjs.ListView'
  },
  artjs.View
);
