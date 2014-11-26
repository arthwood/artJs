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
  
  renderTable: function(data) {
    var head = data.head ? this._renderElement('thead', null, this._map(data.head || [], this._renderTableHead)) : '';
    var foot = data.foot ? this._renderElement('tfoot', null, this._map(data.foot, this._renderTableFoot)) : '';
    var body = data.body ? this._renderElement('tbody', null, this._map(data.body || [], this._renderTableRow)) : '';
    
    return this._renderElement('table', null, head + foot + body);
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
  
  _renderTableHead: function(i) {
    return this._renderTableCell('th', i);
  },
  
  _renderTableFoot: function(i) {
    return this._renderTableElement(i);
  },
  
  _renderTableRow: function(i) {
    return this._renderElement('tr', null, this._map(i, this._renderTableElement));
  },
  
  _renderTableElement: function(i) {
    return this._renderTableCell('td', i);
  },
  
  _renderTableCell: function(type, content) {
    return this._renderElement(type, null, content);
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
