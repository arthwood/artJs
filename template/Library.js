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
      artjs.Element.insert(
        this._templatesContainer, 
        artjs.$E('div', null, this.getTemplate(id))
      )
    );
  },
  
  init: function() {
    this._onLoadSuccessDelegate = artjs.$D(this, '_onLoadSuccess');
    
    this._templatesToLoad = this.BASE_TEMPLATES.concat(this.config.TEMPLATES);
    
    artjs.Array.each(this._templatesToLoad, this._load, this);
    
    this._loadCheck();
  },
  
  _load: function(i) {
    var request = artjs.$get(this.config.PATH + '/' +  i + '.html', null, this._onLoadSuccessDelegate);
    
    request.id = i;
  },
  
  _onLoadSuccess: function(ajax) {
    this._templates[ajax.id] = ajax.getResponseText();
    
    this._loadCheck();
  },
  
  _loadCheck: function() {
    if (artjs.Object.keys(this._templates).length == this._templatesToLoad.length) {
      this._onAllLoaded();
    }
  },
  
  _onAllLoaded: function() {
    var body = document.body;
    
    artjs.ComponentScanner.scan(body);
    
    this._templatesContainer = artjs.Element.insert(body, artjs.$E('div', {id: 'artjs-Templates'}));
    
    artjs.onLibraryLoad.fire(this);
  }
};
