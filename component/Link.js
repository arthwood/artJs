artjs.Link = artjs.component.Link = artjs.Class(
  function(element) {
    this.super(element);
    
    this.onClick = new artjs.Event('artjs.Link::onClick');
    
    artjs.on('click', this._element, artjs.$D(this, '_onClick'));
  },
  {
    _onClick: function(e) {
      this.onClick.fire(e);
    }
  },
  {
    _name: 'artjs.Link'
  },
  artjs.Component
);
