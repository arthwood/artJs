artjs.Link = artjs.component.Link = artjs.Class(
  function(element) {
    this.super(element);
    
    this.onClick = new artjs.Event('artjs.Link::onClick');
    
    artjs.on('click', this._element, artjs.$D(this, '_onClick'));
  },
  {
    getHref: function() {
      return artjs.Element.getAttributes(this._element).href;
    },
    
    _onClick: function(e, ee) {
      this.onClick.fire(e);
    }
  },
  {
    _name: 'artjs.Link'
  },
  artjs.Component
);
