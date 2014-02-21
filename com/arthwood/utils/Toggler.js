ArtJs.Toggler = com.arthwood.utils.Toggler = ArtJs.Class(
  function(unique) {
    this.unique = unique;
    this.current = null;
    this.onActivate = new ArtJs.CustomEvent('Toggler::onActivate');
    this.onDeactivate = new ArtJs.CustomEvent('Toggler::onDeactivate');
  },
  {
    toggle: function(item) {
      if (!(this.unique && this.current == item)) {
        this.onDeactivate.fire(this);

        this.current = item;

        this.onActivate.fire(this);
      }
    }
  }
);
