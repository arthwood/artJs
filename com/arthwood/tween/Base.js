com.arthwood.tween.Base = function(e, delta, interval, eventName) {
  var defaults = arguments.callee.DEFAULTS;
  
  this.element = e;
  this.on = true;
  this.p = 0;
  this.setDelta(delta || defaults.delta);
  this.interval = interval;
  this.clock = new ArtJs.Clock(this.interval || defaults.interval);
  this.clock.onChange.add(ArtJs.$D(this, this.onTick));
  this.onComplete = new ArtJs.CustomEvent(eventName);
};
ArtJs.ObjectUtils.extend(com.arthwood.tween.Base, {
  DEFAULTS: {delta: 0.05, interval: 20}
});
com.arthwood.tween.Base.prototype = {
  start: function() {
    this.beforeStart();
    this.clock.start();
  },
  
  stop: function() {
    this.clock.stop();
  },
  
  onTick: function(clock) {
    this.p += this.delta;
    
    if (this.on && this.p < 1 || !this.on && this.p > 0) {
      this.update();
    }
    else {
      this.clock.stop();
      this.p = Number(this.on);
      this.update();
      this.afterFinish();
      this.onComplete.fire(this);
    }
  },
  
  toggle: function() {
    this.setDelta(- this.delta);
  },
  
  setDelta: function(d) {
    this.delta = d;
    this.on = Boolean(ArtJs.MathUtils.sgn(this.delta) + 1);
  },
  
  getDelta: function() {
    return this.delta;
  },
  
  update: function() {
  },
  
  isRunning: function() {
    this.clock.isRunning();
  },
  
  beforeStart: function() {
    this.update();
  },
  
  afterFinish: function() {
  },
  
  setInitialState: function() {
    this.p = 0;
  },
  
  setFinalState: function() {
    this.p = 1;
  },
  
  inInitialState: function() {
    return this.p == 0;
  },
  
  inFinalState: function() {
    return this.p == 1;
  },
  
  getIdentifier: function() {
    return this.element;
  }
};
