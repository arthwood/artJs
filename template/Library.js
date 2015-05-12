artjs.TemplateLibrary = artjs.template.Library = {
  config: {
    PATH: '/templates',
    BASE_TEMPLATES: ['artjs/calendar'],
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
    this.onLoad = new artjs.Event('TemplateLibrary:onLoad');
    
    this._onLoadSuccessDelegate = artjs.$D(this, '_onLoadSuccess');
    
    this._templatesToLoad = this.config.BASE_TEMPLATES.concat(this.config.TEMPLATES);
    
    artjs.Array.each(this._templatesToLoad, this._load, this);
    
    artjs.Element.hide(document.body);
    
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
    
    this._templatesContainer = artjs.Element.insert(body, artjs.$E('div', {id: 'artjs-templates'}));
    
    artjs.Element.show(body);
    
    this.onLoad.fire(this);
  }
};
