ArtJs.Fade = com.arthwood.transition.Fade = ArtJs.Class(
  function() {
    this.super(arguments, 'opacity');
  },
  null,
  {
    doInjection: function () {
      var proto = Element.prototype;

      proto.fadeTo = ArtJs.$DC(this, this.run, true);
    }
  },
  ArtJs.TransitionBase
);
