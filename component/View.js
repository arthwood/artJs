artjs.View = artjs.component.View = artjs.Class(
  function(element) {
    this.super(element);
    
    artjs.$BA(this);
    
    var replace = artjs.String.toBoolean(artjs.Element.getDataValue(this._element, 'replace'));
    
    this._renderMethod = replace ? 'renderOnto' : 'renderInto';
    this._template = this._getTemplate();
    
    this.setModel(new artjs.Model());
    
    this.onUpdate = new artjs.Event('View::onUpdate');
  },
  {
    getModel: function() {
      return this._model;
    },
    
    setModel: function(model) {
      this._model = model;
      this._model.onChange.add(this._onModelChange.delegate);
      this._render();
    },
    
    _onModelChange: function(property, newValue, oldValue) {
      this._render();
      
      this.onUpdate.fire(this, property, newValue, oldValue);
    },
    
    _render: function() {
      artjs.TemplateBase[this._renderMethod](this._element, this._template, this._model);
    },
    
    _getTemplate: function() {
      var templateId = artjs.Element.getDataValue(this._element, 'template');
      
      return templateId
        ? artjs.TemplateLibrary.getTemplate(templateId)
        : artjs.Element.getContent(this._element);
    }
  },
  null,
  artjs.Component
);
