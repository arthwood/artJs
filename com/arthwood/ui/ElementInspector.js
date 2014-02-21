ArtJs.ElementInspector = com.arthwood.ui.ElementInspector = ArtJs.Class(
  function() {
    this._mc = new ArtJs.MouseController(document);
    this._mc.onMove.add(ArtJs.$D(this, this._onMouseMove));
    this._toggler = new ArtJs.Toggler(true);
    this._toggler.onActivate.add(ArtJs.$D(this, this._onActivate));
  },
  {
    _onMouseMove: function(e, mc) {
      var targets = mc.getTargets(e);
      
      this._toggler.toggle(targets.origin);
    },

    _onActivate: function(toggler) {
      console.log(toggler.current);
    }
  }
);
