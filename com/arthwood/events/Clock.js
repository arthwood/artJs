ArtJs.Clock = com.arthwood.events.Clock = function(interval, repeat) {
  this.interval = interval;
  this.repeat = repeat;
  this.intervalId = null;
  this.counter = 0;
  this.onChange = new ArtJs.CustomEvent('Clock:onChange');
  this.onComplete = new ArtJs.CustomEvent('Clock:onComplete');
  
  var instances = arguments.callee.instances;
  
  this.id = instances.length;
  
  instances.push(this);
};

ArtJs.Clock.prototype = {
  start: function(now) {
    this.stop();
    this.resume(now);
  },
  
  tick: function() {
    this.counter++;
    this.onChange.fire(this);
  
    if (this.counter == this.repeat) {
      this.stop();
      this.onComplete.fire(this);
    }
  },
  
  stop: function() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.counter = 0;
  },
  
  pause: function() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  },
  
  resume: function(now) {
    var code = 'Clock.find(' + this.id + ').tick()';
    
    this.intervalId = setInterval(code, this.interval);
    
    if (now) {
      this.tick();
    }
  },
  
  isRunning: function() {
    return !(this.intervalId == null);
  },
  
  getIdentifier: function() {
    return this.id;
  }
};

ArtJs.Locator.init(ArtJs.Clock);

ArtJs.ObjectUtils.extend(ArtJs.Clock, {
  fire: function(delegate, delay, repeat) {
    var clock = new ArtJs.Clock(delegate, delay, repeat);
    
    clock.start();
    
    return clock;
  }
});
