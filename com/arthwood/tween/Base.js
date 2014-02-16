com.arthwood.tween.Base = function(e, delta, interval, eventName) {
  var defaults = arguments.callee.DEFAULTS;
  
  this.element = e;
  this.on = true;
  this.p = 0;
  this.setDelta(delta || defaults.delta);
  this.clock = new ArtJs.Clock(interval || defaults.interval);
  this.clock.onChange.add(ArtJs.$D(this, this._onTick));
  this.onComplete = new ArtJs.CustomEvent(eventName);
};
ArtJs.ObjectUtils.extend(com.arthwood.tween.Base, {
  DEFAULTS: {delta: 0.05, interval: 10}
});
com.arthwood.tween.Base.prototype = {
  start: function() {
    this.before();
    this.clock.start();
  },
  
  stop: function() {
    this.clock.stop();
  },
  
  _onTick: function(clock) {
    this.p += this.delta;
    
    if (this.on && this.p < 1 || !this.on && this.p > 0) {
      this.update();
    }
    else {
      this.clock.stop();
      this.p = Number(this.on);
      this.update();
      this.after();
      this.onComplete.fire(this);
    }
  },
  
  toggle: function() {
    this.setDelta(- this.delta);
  },
  
  setDelta: function(d) {
    this.delta = d;
    this.on = ArtJs.MathUtils.isNonNegative(this.delta);
  },
  
  getDelta: function() {
    return this.delta;
  },
  
  update: function() {
  },
  
  isRunning: function() {
    this.clock.isRunning();
  },
  
  before: function() {
    this.update();
  },
  
  after: function() {
  },
  
  setInitialState: function() {
    this.p = 0;
  },
  
  setFinalState: function() {
    this.p = 1;
  },
  
  isInInitialState: function() {
    return this.p === 0;
  },
  
  isInFinalState: function() {
    return this.p === 1;
  },
  
  getIdentifier: function() {
    return this.element;
  }
};
