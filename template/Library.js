artjs.TemplateLibrary = artjs.template.Library = {
  BASE_TEMPLATES: ['artjs/calendar'],
  
  config: {
    PATH: '/templates',
    TEMPLATES: []
  },
  
  _templates: {},
  
  // Returns template as a String
  getTemplate: function(id) {
    return this._templates[id];
  },
  
  // Creates new div inside templates container then loads and initializes given template
  loadTemplate: function(id) {
    artjs.TemplateBase.renderElement(
      artjs.ElementUtils.insert(
        this._templatesContainer, 
        artjs.$E('div', null, artjs.TemplateLibrary.getTemplate(id))
      )
    );
  },
  
  init: function() {
    artjs.$BA(this);
    
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
  
  _loadCheck: function() {
    if (artjs.ObjectUtils.keys(this._templates).length == this._templatesToLoad.length) {
      this._onAllLoaded();
    }
  },
  
  _onAllLoaded: function() {
    var body = document.body;
    
    artjs.ElementUtils.show(body);
    artjs.TemplateBase.renderElement(body, window);
    this._templatesContainer = artjs.ElementUtils.insert(document.body, artjs.$E('div', {id: 'artjs-Templates'}));
    artjs.onLibraryLoad.fire(this);
  }
};
