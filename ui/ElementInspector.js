artjs.ElementInspector = artjs.ui.ElementInspector = artjs.Class(
  function() {
    artjs.on(document, 'mousemove', artjs.$D(this, this._onMouseMove));

    this._toggler = new artjs.Toggler(true);
    this._toggler.onActivate.add(artjs.$D(this, this._onActivate));
    this._toggler.onDeactivate.add(artjs.$D(this, this._onDeactivate));
  },
  {
    _onMouseMove: function(e, ee) {
      var targets = ee.getTargets(e);
      var origin = targets.origin;
      var eu = artjs.ElementUtils;
      
      if (eu.children(origin).any(eu.isText)) {
        this._toggler.toggle(origin);
      }
    },

    _onActivate: function(toggler) {
      var current = toggler.current;
      
      if (current) {
        artjs.ElementUtils.addClass(current, 'inspected');
      }
    },

    _onDeactivate: function(toggler) {
      var current = toggler.current;

      if (current) {
        artjs.ElementUtils.removeClass(current, 'inspected');
      }
    }
  }
);
