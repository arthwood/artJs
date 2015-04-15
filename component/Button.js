artjs.Button = artjs.component.Button = artjs.Class(
  function(element) {
    this.super(element);
    
    this._eventId = artjs.Element.getDataValue(this._element, 'event');
    
    this.onClick = new artjs.Event('artjs.Button::onClick');
    
    artjs.on('click', this._element, this._onClick.delegate);
  },
  {
    _onClick: function(e) {
      this.onClick.fire(e);
      
      if (this._eventId) {
        this._fire(this._eventId);
      }
    }
  },
  {
    _name: 'artjs.Button'
  },
  artjs.Component
);
