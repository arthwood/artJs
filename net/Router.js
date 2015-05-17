artjs.Router = artjs.net.Router = {
  ROUTE_RE: new RegExp('#!?/(.*)'),
  
  defaultController: null,
  
  mapping: {
  },
  
  _name: 'Router',
  
  getCurrentPath: function() {
    return this.getPath(location.hash);
  },
  
  getPath: function(hash) {
    return artjs.String.match(hash, this.ROUTE_RE);
  },
  
  getRoute: function() {
    return this._route;
  },
  
  init: function() {
    this.navigateTo(null, true);
    
    addEventListener('popstate', artjs.$DC(this, '_onPopState'));
  },
  
  navigateTo: function(hash, first) {
    var path = artjs.String.toS(this.getPath(hash || location.hash));
    var fragments = path.split('/');
    var controllerId = artjs.String.nullifyEmpty(fragments.shift());
    var action = fragments.shift();
    var declaredController = this.mapping[controllerId];
    var controller = declaredController || this.defaultController;
    var delegate;
    
    if (controller) {
      delegate = new artjs.Delegate(controller, action || 'index');
    
      if (controller == this.defaultController) {
         delegate.args.push(controllerId);
      }
      
      delegate.args.push(first);
      
      delegate.invoke();
    }
    
    this._route = delegate;
  },
  
  toString: function() {
    return this._name;
  },
  
  _onPopState: function() {
    this.navigateTo();
  }
};
