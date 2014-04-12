ArtJs.TemplateLibrary = com.arthwood.template.Library = {
  config: {
    PATH: '/templates',
    TEMPLATES: []
  },
  
  _templates: {},
  
  _init: function() {
    this._onLoadSuccessBind = ArtJs.$D(this, this._onLoadSuccess);
    ArtJs.onDocumentLoad.add(ArtJs.$D(this, this._loadAll));
  },
  
  _loadAll: function() {
    ArtJs.ArrayUtils.each(this.config.TEMPLATES, this._load, this);
    
    this._loadCheck();
  },
  
  _load: function(i) {
    var request = ArtJs.$get(this.config.PATH + '/' +  i + '.html', null, this._onLoadSuccessBind);
    
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
    if (ArtJs.ObjectUtils.keys(this._templates).length == this.config.TEMPLATES.length) {
      ArtJs.TemplateBase.renderInto(document.body, document.body.innerHTML);
      
      ArtJs.onLibraryLoad.fire(this);
    }
  }
};
