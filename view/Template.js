artjs.TemplateView = artjs.view.Template = artjs.Class(
  function(element, model) {
    var replace = artjs.String.toBoolean(artjs.Element.getDataValue(element, 'replace'));
    
    this._renderMethod = replace ? 'renderOnto' : 'renderInto';
    
    var templateId = artjs.Element.getDataValue(element, 'template');
    
    this._template = templateId
        ? artjs.TemplateLibrary.getTemplate(templateId)
        : artjs.Element.getContent(element);
    
    this.super(element, model);
  },
  { 
    _render: function() {
      artjs.TemplateBase[this._renderMethod](this._element, this._template, this._model);
    }
  },
  {
    _name: 'artjs.TemplateView'
  },
  artjs.View
);
