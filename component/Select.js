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
    
    setValue: function(selected) {
      this._element.value = selected;
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
