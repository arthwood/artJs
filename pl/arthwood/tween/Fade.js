ArtJs.Fade = pl.arthwood.tween.Fade = function(e, p1, p2, delta) {
  this.element = e;
  this.p1 = p1;
  this.p2 = p2;
  this.p = null;
  this.dir = ArtJs.MathUtils.sgn(this.p2 - this.p1);
  this.delta = delta * this.dir;
  this.clock = new ArtJs.Clock(50);
  this.clock.onChange.add(ArtJs.$D(this, this.onTick));
  this.onFinish = new ArtJs.Event('Fade:onFinish');
};

ArtJs.Fade.prototype = {
  start: function(e) {
    this.p = this.p1;
    
    this.clock.start();
  },
  
  stop: function() {
    this.clock.stop();
  },
  
  onTick: function(clock) {
    var opacity;
    
    this.p += this.delta;
    
    if ((this.p2 - this.p) * this.dir < 0) {
      this.clock.stop();
      this.p = this.p2;
      this.onFinish.fire(this);
    }
    
    this.element.style.opacity = this.p; 
  },
  
  isRunning: function() {
    this.clock.isRunning();
  }
};
