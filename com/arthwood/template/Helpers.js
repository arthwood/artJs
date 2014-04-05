ArtJs.TemplateHelpers = com.arthwood.template.Helpers = {
  render: function(templateId, scope) {
    return ArtJs.TemplateBase.renderTemplate(templateId, scope);
  },
  
  renderInto: function(element, templateId, scope) {
    return ArtJs.TemplateBase.renderTemplateInto(element, templateId, scope);
  },
  
  renderCollection: function(template, collection) {
    var callback = ArtJs.$DC(this, this._renderCollectionItem, false, template);
    
    return ArtJs.ArrayUtils.map(collection, callback).join('');
  },
  
  renderIf: function(value, method) {
    return value ? this[method](value) : '';
  },
  
  list: function(items) {
    var ul = ArtJs.$B('ul');
    
    return ArtJs.ArrayUtils.map(items, this.renderItem, this).toString();
  },
  
  renderItem: function(i) {
    return ArtJs.$B('li', null, i.render()).toString();
  },
  
  registerAll: function(helpers) {
    ArtJs.ObjectUtils.eachPair(helpers, this.register, this);
  },
  
  register: function(name, method) {
    this[name] = method;
  },
  
  perform: function(action, args) {
    return this[action].apply(this, args);
  },
  
  _renderCollectionItem: function(scope, idx, arr, template) {
    scope._index = idx;
    
    return this.render(template, scope);
  }
};
