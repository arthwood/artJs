ArtJs.ElementInspector = com.arthwood.ui.ElementInspector = ArtJs.Class(
  function() {
    ArtJs.on(document, 'mousemove', ArtJs.$D(this, this._onMouseMove));

    this._toggler = new ArtJs.Toggler(true);
    this._toggler.onActivate.add(ArtJs.$D(this, this._onActivate));
    this._toggler.onDeactivate.add(ArtJs.$D(this, this._onDeactivate));
  },
  {
    _onMouseMove: function(e, ee) {
      var targets = ee.getTargets(e);
      var origin = targets.origin;
      var eu = ArtJs.ElementUtils;
      
      if (eu.children(origin).any(eu.isText)) {
        this._toggler.toggle(origin);
      }
    },

    _onActivate: function(toggler) {
      var current = toggler.current;
      
      if (current) {
        ArtJs.ElementUtils.addClass(current, 'inspected');
      }
    },

    _onDeactivate: function(toggler) {
      var current = toggler.current;

      if (current) {
        ArtJs.ElementUtils.removeClass(current, 'inspected');
      }
    }
  }
);
