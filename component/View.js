artjs.View = artjs.component.View = artjs.Class(
  function(element) {
    this.super(element);
    
    this._templateId = artjs.Element.getDataValue(this._element, 'template');
    
    artjs.$BA(this);
    
    this._model = new artjs.Model();
    
    this._model.onChange.add(this._onModelChange.delegate);
    this.onUpdate = new artjs.Event('View::onUpdate');
  },
  {
    getModel: function() {
      return this._model;
    },
    
    _onModelChange: function(property, newValue, oldValue) {
      artjs.TemplateHelpers.renderInto(this._element, this._templateId, this._model);
      
      this.onUpdate.fire(this, property, newValue, oldValue);
    }
  },
  null,
  artjs.Component
);
