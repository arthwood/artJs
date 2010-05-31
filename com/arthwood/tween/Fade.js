ArtJs.Fade = com.arthwood.tween.Fade = ArtJs.ClassUtils.extend(com.arthwood.tween.Base, function(e, p1, p2, delta, interval) {
  arguments.callee.$super(e, p1, p2, delta || 0.05, interval  || 20, 'Fade:onFinish');
}, {
  update: function() {
    ArtJs.ElementUtils.setAlpha(this.element, this.p);
  }
});
