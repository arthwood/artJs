artjs.TemplateHelpers = artjs.template.Helpers = {
  render: function(templateId, scope) {
    return artjs.TemplateBase.renderTemplate(templateId, scope);
  },
  
  renderInto: function(element, templateId, scope) {
    artjs.TemplateBase.renderTemplateInto(element, templateId, scope);
  },
  
  renderCollection: function(templateId, collection) {
    var callback = artjs.$DC(this, this._renderCollectionItem, false, templateId);
    
    return artjs.ArrayUtils.map(collection, callback).join('');
  },
  
  renderIf: function(value, method) {
    return value ? this[method](value) : '';
  },
  
  registerAll: function(helpers) {
    artjs.ObjectUtils.eachPair(helpers, this.register, this);
  },
  
  register: function(name, method) {
    this[name] = method;
  },
  
  perform: function(action, args) {
    return this[action].apply(this, args);
  },
  
  _renderCollectionItem: function(scope, idx, arr, templateId) {
    scope._index = idx;
    
    return this.render(templateId, scope);
  }
};
