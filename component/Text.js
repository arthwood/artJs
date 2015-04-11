artjs.Text = artjs.component.Text = artjs.Class(
  function(element) {
    this.super(element);
    
    this.onChange = new artjs.Event('artjs.Text::onChange');
    
    artjs.on('change', this._element, this._onChange.delegate);
  },
  {
    setValue: function(value) {
      this._element.value = value;
    },
    
    getValue: function() {
      return this._element.value;
    },
    
    clear: function() {
      this.setValue(artjs.String.blank());
    },
    
    _onChange: function(e) {
      this.onChange.fire(this);
    }
  },
  {
    _name: 'artjs.Text'
  },
  artjs.Component
);
