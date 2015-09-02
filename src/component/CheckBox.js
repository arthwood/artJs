artjs.CheckBox = artjs.component.CheckBox = artjs.Class(
  function(element) {
    this.super(element);
    
    this._eventId = artjs.Element.getDataValue(this._element, 'event');
    
    this.onClick = new artjs.Event('artjs.CheckBox::onClick');
    
    artjs.on('click', this._element, artjs.$D(this, '_onClick'));
  },
  {
    isChecked: function() {
      return this._element.checked;
    },
    
    setChecked: function(checked) {
      this._element.checked = checked;
    },
    
    setValue: function(value) {
      this._element.value = value;
    },
    
    getValue: function() {
      return this._element.value;
    },
    
    _onClick: function(e) {
      this.onClick.fire(e);
      
      if (this._eventId) {
        this._fire(this._eventId);
      }
    }
  },
  {
    _name: 'artjs.CheckBox'
  },
  artjs.Component
);
