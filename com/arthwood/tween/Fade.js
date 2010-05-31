ArtJs.Fade = com.arthwood.tween.Fade = ArtJs.$E(com.arthwood.tween.Base, function(e, delta, interval) {
  arguments.callee.$super(e, delta || 0.05, interval || 20, 'Fade:onFinish');
  
  ArtJs.Reveal.instances.push(this);
}, {
  update: function() {
    arguments.callee.$super();
    
    ArtJs.ElementUtils.setAlpha(this.element, this.p);
  }
});

ArtJs.Locator.init(ArtJs.Fade);

ArtJs.ObjectUtils.extend(ArtJs.Fade, {
  doInjection: function() {
    var proto = Element.prototype;
    
    proto.fade = function(delta, interval) {
      return new ArtJs.Fade(this, delta, interval);
    };
  }
});
