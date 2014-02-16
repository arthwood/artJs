ArtJs.Fade = com.arthwood.tween.Fade = ArtJs.ClassUtils.extend(com.arthwood.tween.Base, function(e, delta, interval) {
  arguments.callee.$super(e, delta, interval, 'Fade:onComplete');
  
  ArtJs.Reveal.instances.push(this);
}, {
  update: function() {
    arguments.callee.$super();
    
    ArtJs.ElementUtils.setAlpha(this.element, this.p);
  }
});

ArtJs.Locator.register(ArtJs.Fade);

ArtJs.ObjectUtils.extend(ArtJs.Fade, {
  doInjection: function() {
    var proto = Element.prototype;
    
    proto.fade = function(delta, interval) {
      return new ArtJs.Fade(this, delta, interval);
    };
  }
});
