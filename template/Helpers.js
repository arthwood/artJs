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
  
  renderSelect: function(options, selected) {
    this._selectedOption = selected;
    
    return artjs.$B('select', null, artjs.ArrayUtils.map(options, this._renderOption, this).join()).toString();
  },
  
  renderTable: function(table) {
    return artjs.$B('table', null, artjs.ArrayUtils.map(table, this._renderTableRow, this).join()).toString();
  },
  
  _renderOption: function(i) {
    var attrs = {value: i.value};
    
    if (i.value == this._selectedOption) {
      attrs.selected = 'selected';
    }
    
    return artjs.$B('option', attrs, i.text).toString();
  },
  
  _renderTableRow: function(i) {
    return artjs.$B('tr', null, artjs.ArrayUtils.map(i, this._renderTableCell, this).join()).toString();
  },
  
  _renderTableCell: function(i) {
    return artjs.$B('td', null, i).toString();
  },
  
  bindable: function(i) {
    return i;
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
