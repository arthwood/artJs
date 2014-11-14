artjs.TemplateHelpers = artjs.template.Helpers = {
  render: function(templateId, scope) {
    var template = artjs.TemplateLibrary.getTemplate(templateId);
    
    return artjs.TemplateBase.render(template, scope);
  },
  
  renderInto: function(element, templateId, scope) {
    artjs.TemplateBase.renderTemplateInto(element, templateId, scope);
  },
  
  renderCollection: function(templateId, collection) {
    var callback = artjs.$DC(this, this._renderCollectionItem, false, templateId);
    
    return this._map(collection, callback);
  },
  
  renderIf: function(value, method) {
    return value ? this[method](value) : '';
  },
  
  renderSelect: function(options, selected) {
    this._selectedOption = selected;
    
    return this._renderElement('select', options, this.renderOptions(options));
  },
  
  renderOptions: function(options) {
    return this._map(options, this._renderOption);
  },
  
  renderTable: function(table) {
    return this._renderElement('table', null, this._map(table, this._renderTableRow));
  },
  
  _map: function(coll, func) {
    return artjs.ArrayUtils.map(coll, func, this).join('');
  },
  
  _renderOption: function(i) {
    var attrs = {value: i.value};
    
    if (i.value == this._selectedOption) {
      attrs.selected = 'selected';
    }
    
    return this._renderElement('option', attrs, i.text);
  },
  
  _renderTableRow: function(i) {
    return this._renderElement('tr', null, this._map(i, this._renderTableCell));
  },
  
  _renderTableCell: function(i) {
    return this._renderElement('td', null, i);
  },
  
  _renderElement: function(name, attrs, value) {
    return artjs.$B(name, attrs, value).toString();
  },
  
  registerAll: function(helpers) {
    artjs.ObjectUtils.eachPair(helpers, this.register, this);
  },
  
  register: function(name, method) {
    this[name] = method;
  },
  
  perform: function(action, args, scope) {
    return this[action].apply(this, args.concat(scope));
  },
  
  _renderCollectionItem: function(scope, idx, arr, templateId) {
    scope._index = idx;
    
    return this.render(templateId, scope);
  }
};
