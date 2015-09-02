artjs.Router = artjs.net.Router = {
  defaultController: new artjs.Controller(),
  
  mapping: {
  },
  
  _name: 'Router',
  
  init: function() {
    this.onNavigate = new artjs.Event('Router:onNavigate');
    
    addEventListener('popstate', artjs.$DC(this, '_onPopState'));
    
    artjs.TemplateLibrary.onLoad.add(artjs.$D(this, '_onLibraryLoad'));
  },
  
  toString: function() {
    return this._name;
  },
  
  _navigateTo: function(route) {
    this.onNavigate.fire(route);
    
    route.go();
  },
  
  _reload: function() {
    var route = new artjs.Route();
    
    this._navigateTo(route);
  },
  
  _onLibraryLoad: function() {
    var route = new artjs.Route({action: 'load'});
    
    this._navigateTo(route);
    this._reload();
  },
  
  _onPopState: function() {
    this._reload();
  }
};
