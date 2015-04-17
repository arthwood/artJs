artjs.Router = artjs.net.Router = {
  ROUTE_RE: new RegExp('#/(.*)'),
  
  defaultController: null,
  
  mapping: {
  },
  
  navigateTo: function(hash) {
    var path = artjs.String.match(hash, this.ROUTE_RE);
      
    if (!artjs.Object.isNull(path)) {
      this._navigateTo(path);
    }
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
  }
};
