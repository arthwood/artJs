artjs.Table = artjs.component.Table = artjs.Class(
  function(element) {
    this.super(element);
    
    this.onItem = new artjs.Event('artjs.Table::onItem');
    
    artjs.on('click', this._element, artjs.$D(this, '_onItem'), 'td');
  },
  {
    setData: function(data) {
      this._data = data;
      
      this._update();
    },
    
    updateHead: function(data) {
      artjs.Array.each(data, this._updateHead, this);
    },
    
    iterate: function(delegate) {
      artjs.Array.each(this._items, delegate.method, delegate.object);
    },
    
    setRowVisible: function(i, visible) {
      artjs.Element.setVisible(this._rows[i], visible);
    },
    
    _updateHead: function(i, idx) {
      artjs.Element.setContent(this._headCells[idx], i);
    },
    
    _update: function() {
      artjs.Element.setContent(this._element, artjs.TemplateHelpers.renderTable(this._data));
      
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
  {
    _name: 'artjs.Table'
  },
  artjs.Component
);
