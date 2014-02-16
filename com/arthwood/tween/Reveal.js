ArtJs.Reveal = com.arthwood.tween.Reveal = ArtJs.ClassUtils.extend(com.arthwood.tween.Base, function(e, delta, interval) {
  arguments.callee.$super(e, delta, interval, 'Reveal:onComplete');
  
  var eu = ArtJs.ElementUtils;
  
  this.heightWithPadding = eu.getSize(e, true).y;
  this.padding = eu.getPadding(e);
  this.height = this.heightWithPadding - (this.padding.top + this.padding.bottom);
  
  ArtJs.Reveal.instances.push(this);
}, {
  update: function() {
    arguments.callee.$super();
    
    var mu = ArtJs.MathUtils;
    var height = this.height;
    var h = this.p * this.heightWithPadding;
    var pt = this.padding.top;
    var pb = this.padding.bottom;
    var s = this.element.style;
    var p1 = Math.round(mu.limit(h, 0, pt));
    var p2 = Math.round(mu.limit(h - pt, 0, height));
    var p3 = Math.round(mu.limit(h - height - pt, 0, pb));
    
    s.paddingTop = p1 + 'px';
    s.height = p2 + 'px';
    s.paddingBottom = p3 + 'px';
  },
  
  before: function() {
    arguments.callee.$super();
    
    if (this.isInInitialState() && this.on) {
      ArtJs.ElementUtils.show(this.element);
    }
  },
  
  after: function() {
    arguments.callee.$super();
    
    if (this.isInInitialState() && !this.on) {
      ArtJs.ElementUtils.hide(this.element);
    }
  }
});

ArtJs.Locator.register(ArtJs.Reveal);

ArtJs.ObjectUtils.extend(ArtJs.Reveal, {
  doInjection: function() {
    var proto = Element.prototype;
    
    proto.reveal = function(delta, interval) {
      return new ArtJs.Reveal(this, delta, interval);
    };
  }
});
