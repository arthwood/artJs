artjs.Table = artjs.ui.Table = artjs.Class(
  function() {
    this.super(arguments);
    
    artjs.$BA(this);
    
    this.onItem = new artjs.CustomEvent('artjs.Table::onItem');
  },
  {
    setData: function(data) {
      this._data = data;
      
      this._update();
    },
    
    updateHead: function(data) {
      artjs.ArrayUtils.each(data, this._updateHead, this);
    },
    
    iterate: function(delegate) {
      artjs.ArrayUtils.each(this._items, delegate.method, delegate.object);
    },
    
    setRowVisible: function(i, visible) {
      artjs.ElementUtils.setVisible(this._rows[i], visible);
    },
    
    _updateHead: function(i, idx) {
      artjs.ElementUtils.setContent(this._headCells[idx], i);
    },
    
    _update: function() {
      artjs.ElementUtils.setContent(this.element, artjs.TemplateHelpers.renderTable(this._data));
      
      var head = artjs.$first(this.element, 'thead');
      var body = artjs.$first(this.element, 'tbody');
      
      this._headCells = artjs.$find(head, 'th');
      this._rows = artjs.$find(body, 'tr');
      this._items = artjs.$find(body, 'td');
      
      artjs.ArrayUtils.each(this._items, this._initItem, this);
    },
    
    _initItem: function(item) {
      artjs.ElementUtils.onClick(item, this._onItem.delegate);
    },
    
    _onItem: function(e) {
      this.onItem.fire(e.currentTarget);
    }
  },
  null,
  artjs.Component
);
