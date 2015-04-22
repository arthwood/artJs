artjs.Input = artjs.view.Input = artjs.Class(
  function(element) {
    this.super(element);
    
    var model = new artjs.Model();
    
    model.addProperty('value', element.value);
    model.addPropertyListener('value', artjs.$D(this, '_onModelValueChange'));
    
    this.setModel(model);
    
    artjs.on('change', element, artjs.$D(this, '_onUiValueChange'));
  },
  {
    setReadOnly: function(value) {
      if (value) {
        this._element.setAttribute('readonly', 'readonly');
      }
      else {
        this._element.removeAttribute('readonly');
      }
    },
    
    _onModelValueChange: function(prop) {
      this._element.value = prop.newValue;
    },
    
    _onUiValueChange: function(e) {
      this._model.setProperty(e.currentTarget.value);
    }
  },
  {
    _name: 'artjs.Input'
  },
  artjs.View
);
