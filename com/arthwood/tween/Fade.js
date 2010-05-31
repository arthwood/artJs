ArtJs.Fade = com.arthwood.tween.Fade = ArtJs.$E(com.arthwood.tween.Base, function(e, delta, interval) {
  arguments.callee.$super(e, delta || 0.05, interval || 20, 'Fade:onFinish');
}, {
  update: function() {
    arguments.callee.$super();
    
    ArtJs.ElementUtils.setAlpha(this.element, this.p);
  }
});
