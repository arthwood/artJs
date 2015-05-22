artjs.Route = artjs.net.Route = artjs.Class(
  function(options) {
    var path = artjs.String.toS(artjs.String.match(location.hash, this.ctor.RE));
    var fragments = path.split('/');
    var controllerId = artjs.String.nullifyEmpty(fragments.shift());
    var controller = artjs.Router.mapping[controllerId];
    var action = fragments.shift();
    var request = {params: fragments};
    
    if (!controller) {
      controller = artjs.Router.defaultController;
      request.controllerId = controllerId;
    }
    
    this._delegate = artjs.$D(controller, options && options.action || action || 'index');
    this._request = request;
  },
  {
    go: function() {
      this._delegate.invoke(this._request);
    },
    
    getRequest: function() {
      return this._request;
    }
  },
  {
    RE: new RegExp('#!?/(.*)')
  },
  artjs.Delegate
);
