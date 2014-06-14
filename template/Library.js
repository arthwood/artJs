artjs.TemplateLibrary = artjs.template.Library = {
  BASE_TEMPLATES: ['calendar'],
  
  config: {
    PATH: '/templates',
    TEMPLATES: []
  },
  
  _templates: {},
  
  _init: function() {
    artjs.$BA(this);
    
    artjs.onDocumentLoad.add(this._onLoadAll.delegate);
  },
  
  _onLoadAll: function() {
    this._templatesToLoad = this.BASE_TEMPLATES.concat(this.config.TEMPLATES);
    
    artjs.ElementUtils.hide(document.body);
    
    artjs.ArrayUtils.each(this._templatesToLoad, this._load, this);
    
    this._loadCheck();
  },
  
  _load: function(i) {
    var request = artjs.$get(this.config.PATH + '/' +  i + '.html', null, this._onLoadSuccess.delegate);
    
    request.id = i;
  },
  
  _onLoadSuccess: function(ajax) {
    this._templates[ajax.id] = ajax.getResponseText();
    
    this._loadCheck();
  },
  
  getTemplate: function(id) {
    return this._templates[id];
  },
  
  _loadCheck: function() {
    if (artjs.ObjectUtils.keys(this._templates).length == this._templatesToLoad.length) {
      var body = document.body;
      
      artjs.ElementUtils.show(body);
      artjs.TemplateBase.renderElement(body);
      artjs.onLibraryLoad.fire(this);
    }
  }
};
