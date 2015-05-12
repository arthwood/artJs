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
  
  init: function() {
    this._update();
    
    addEventListener('popstate', artjs.$DC(this, '_onPopState'));
  },
  
  navigateTo: function(hash) {
    this._navigateTo(artjs.String.toS(this.getPath(hash)));
  },
  
  toString: function() {
    return this._name;
  },
  
  _onPopState: function() {
    this._update();
  },
  
  _navigateTo: function(path) {
    var fragments = path.split('/');
    var controllerId = fragments.shift();
    var action = fragments.shift();
    var declaredController = this.mapping[controllerId];
    var controller = declaredController || this.defaultController;
    
    if (controller) {
      var delegate = new artjs.Delegate(controller, action || 'index');
    
      delegate.args = fragments;
      
      if (!declaredController) {
         delegate.args.unshift(controllerId);
      }
      
      delegate.invoke();
    }
  },
  
  _update: function() {
    this.navigateTo(location.hash);
  }
};
