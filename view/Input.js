artjs.Input = artjs.view.Input = artjs.Class(
  function(element) {
    this.super(element);
    
    this._model.addProperty('value');
    this._model.value = element.value;
    this._model.addPropertyListener('value', this._onModelValueChange.delegate);
    
    artjs.on('change', element, this._onUiValueChange);
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
