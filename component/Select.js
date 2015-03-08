artjs.Select = artjs.component.Select = artjs.Class(
  function(element) {
    this.super(element);
    
    this.onChange = new artjs.Event('artjs.Select::onChange');
    
    artjs.on('change', this._element, artjs.$D(this, '_onChange'));
  },
  {
    setOptions: function(options) {
      this._options = options;
      
      this._update();
    },
    
    setSelected: function(selected) {
      var oldOption = artjs.$find(this._element, 'option[selected=selected]');
      
      if (oldOption) {
        oldOption.removeAttribute('selected');
      }
      
      var newOption = artjs.$find(this._element, 'option[value="' + selected + '"]');
      
      newOption.setAttribute('selected', 'selected');
    },
    
    getValue: function() {
      return this._element.value;
    },
    
    _update: function() {
      artjs.Element.setContent(this._element, artjs.TemplateHelpers.renderOptions(this._options));
    },
    
    _onChange: function(e) {
      this.onChange.fire(this);
    }
  },
  null,
  artjs.Component
);
