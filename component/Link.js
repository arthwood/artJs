artjs.Link = artjs.component.Link = artjs.Class(
  function(element) {
    this.super(element);
    
    this.onClick = new artjs.CustomEvent('artjs.Link::onClick');
    
    artjs.on('click', this.element, artjs.$D(this, '_onClick'));
  },
  {
    _onClick: function(e) {
      this.onClick.fire(e);
    }
  },
  null,
  artjs.Component
);
