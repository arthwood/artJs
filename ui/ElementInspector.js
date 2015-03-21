artjs.ElementInspector = artjs.ui.ElementInspector = artjs.Class(
  function() {
    artjs.$BA(this);
    
    artjs.on('mousemove', document, this._onMouseMove.delegate);

    this._toggler = new artjs.Toggler(true);
    this._toggler.onActivate.add(this._onActivate.delegate);
    this._toggler.onDeactivate.add(this._onDeactivate.delegate);
  },
  {
    _onMouseMove: function(e, ee) {
      var targets = ee.getTargets(e);
      var origin = targets.origin;
      
      if (artjs.Array.any(artjs.Element.children(origin), artjs.Element.isText)) {
        this._toggler.toggle(origin);
      }
    },

    _onActivate: function(toggler) {
      var current = toggler.current;
      
      if (current) {
        artjs.Element.addClass(current, 'inspected');
      }
    },

    _onDeactivate: function(toggler) {
      var current = toggler.current;

      if (current) {
        artjs.Element.removeClass(current, 'inspected');
      }
    }
  }
);
