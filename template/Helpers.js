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
    
    return this.renderElement('select', options, this.renderOptions(options));
  },
  
  renderOptions: function(options) {
    return this._map(options, this._renderOption);
  },
  
  renderTable: function(data) {
    var head = data.head ? this.renderElement('thead', null, this._map(data.head || [], this._renderTableHead)) : '';
    var foot = data.foot ? this.renderElement('tfoot', null, this._map(data.foot, this._renderTableFoot)) : '';
    var body = data.body ? this.renderElement('tbody', null, this._map(data.body || [], this._renderTableRow)) : '';
    
    return this.renderElement('table', null, head + foot + body);
  },
  
  renderElement: function(name, attrs, value) {
    return artjs.$B(name, attrs, value).toString();
  },
  
  registerAll: function(helpers) {
    artjs.Object.each(helpers, this.register, this);
  },
  
  register: function(name, method) {
    this[name] = method;
  },
  
  renderChecked: function(checked) {
    return checked ? 'checked' : artjs.String.blank();
  },
  
  pluralize: function(n, str) {
    return artjs.String.pluralize(n, str);
  },
  
  _map: function(coll, func) {
    return artjs.Array.map(coll, func, this).join('');
  },
  
  _renderOption: function(i) {
    var attrs = {value: i.value};
    
    if (i.value == this._selectedOption) {
      attrs.selected = 'selected';
    }
    
    return this.renderElement('option', attrs, i.text);
  },
  
  _renderTableHead: function(i) {
    return this._renderTableCell('th', i);
  },
  
  _renderTableFoot: function(i) {
    return this._renderTableElement(i);
  },
  
  _renderTableRow: function(i) {
    return this.renderElement('tr', null, this._map(i, this._renderTableElement));
  },
  
  _renderTableElement: function(i) {
    return this._renderTableCell('td', i);
  },
  
  _renderTableCell: function(type, content) {
    return this.renderElement(type, null, content);
  },
  
  _renderCollectionItem: function(data, idx, arr, templateId) {
    data._index = idx;
    
    return this.render(templateId, data);
  }
};
