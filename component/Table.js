artjs.Table = artjs.component.Table = artjs.Class(
  function(element) {
    this.super(element);
    
    artjs.$BA(this);
    
    this.onItem = new artjs.Event('artjs.Table::onItem');
    
    artjs.on('click', this._element, this._onItem.delegate, 'td');
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
      artjs.ElementUtils.setContent(this._element, artjs.TemplateHelpers.renderTable(this._data));
      
      var head = artjs.$find(this._element, 'thead');
      var body = artjs.$find(this._element, 'tbody');
      
      this._headCells = artjs.$findAll(head, 'th');
      this._rows = artjs.$findAll(body, 'tr');
      this._items = artjs.$findAll(body, 'td');
    },
    
    _onItem: function(e) {
      this.onItem.fire(e.target);
    }
  },
  null,
  artjs.Component
);
