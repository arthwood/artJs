ArtJs.TemplateLibrary = com.arthwood.template.Library = {
  config: {
    PATH: '/templates',
    TEMPLATES: []
  },
  
  _templates: {},
  
  init: function() {
    this.onLoad = new ArtJs.CustomEvent('Library::Load');
    this._onLoadSuccessBind = ArtJs.$D(this, this.onLoadSuccess);
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
  
  onLoadSuccess: function(ajax) {
    this._templates[ajax.id] = ajax.getResponseText();
    
    this._loadCheck();
  },
  
  getTemplate: function(id) {
    return this._templates[id];
  },
  
  _loadCheck: function() {
    if (ArtJs.ObjectUtils.keys(this._templates).length == this.config.TEMPLATES.length) {
      ArtJs.ElementUtils.setContent(document.body, ArtJs.TemplateBase.compile(document.body.innerHTML));
      ArtJs.Component.scan(document.body);

      ArtJs.onLibraryLoad.fire(this);
    }
  }
};
