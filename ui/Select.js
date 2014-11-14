artjs.Select = artjs.ui.Select = artjs.Class(
  null,
  {
    setOptions: function(options) {
      this._options = options;
      
      this._update();
    },
    
    setSelected: function(selected) {
      var oldOption = artjs.$first(this.element, 'option[selected=selected]');
      
      if (oldOption) {
        oldOption.removeAttribute('selected');
      }
      
      var newOption = artjs.$first(this.element, 'option[value=' + selected + ']');
      
      newOption.setAttribute('selected', 'selected');
    },
    
    _update: function() {
      artjs.ElementUtils.setContent(this.element, artjs.TemplateHelpers.renderOptions(this._options));
    }
  },
  null,
  artjs.Component
);
