ArtJs.Fade = com.arthwood.tween.Fade = function(e, p1, p2, delta, interval) {
  this.element = e;
  this.p1 = p1;
  this.p2 = p2;
  this.p = null;
  this.dir = ArtJs.MathUtils.sgn(this.p2 - this.p1);
  this.delta = (delta || 0.05) * this.dir;
  this.interval = interval || 20;
  this.clock = new ArtJs.Clock(this.interval);
  this.clock.onChange.add(ArtJs.$D(this, this.onTick));
  this.onFinish = new ArtJs.CustomEvent('Fade:onFinish');
};

ArtJs.Fade.prototype = {
  start: function() {
    this.p = this.p1;
    
    this.clock.start();
  },
  
  stop: function() {
    this.clock.stop();
  },
  
  onTick: function(clock) {
    var opacity;
    var eu = ArtJs.ElementUtils;
    
    this.p += this.delta;
    
    if ((this.p2 - this.p) * this.dir < 0) {
      this.clock.stop();
      this.p = this.p2;
      eu.setAlpha(this.element, this.p);
      this.onFinish.fire(this);
    }
    else {
      eu.setAlpha(this.element, this.p);
    }
  },
  
  isRunning: function() {
    this.clock.isRunning();
  }
};
