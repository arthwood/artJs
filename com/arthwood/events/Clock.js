ArtJs.Clock = com.arthwood.events.Clock = function(interval, repeat) {
  this.interval = interval;
  this.repeat = repeat;
  this.intervalId = null;
  this.counter = 0;
  this.onChange = new ArtJs.CustomEvent('Clock:onChange');
  this.onFinish = new ArtJs.CustomEvent('Clock:onFinish');
  
  var instances = arguments.callee.instances;
  
  this.id = instances.length;
  
  instances.push(this);
};

ArtJs.ObjectUtils.extend(ArtJs.Clock, {
  findById: function(id) {
    this.found.id = id;
    
    return ArtJs.ArrayUtils.detect(this.instances, this.found);
  },
  
  found: function(i) {
    return arguments.callee.id == i.id;
  },

  fire: function(delegate, delay, repeat) {
    var clock = new ArtJs.Clock(delegate, delay, repeat);
    
    clock.start();
    
    return clock;
  }
});

ArtJs.Clock.prototype = {
  start: function(now) {
    var code = 'Clock.findById(' + this.id + ').tick()';
    
    this.stop();
    this.intervalId = setInterval(code, this.interval);
    
    if (now) {
      this.tick();
    }
  },
  
  tick: function() {
    this.counter++;
    this.onChange.fire(this);
  
    if (this.counter == this.repeat) {
      this.stop();
      this.onFinish.fire(this);
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
  
  isRunning: function() {
    return !(this.intervalId == null);
  }
};

ArtJs.Clock.instances = new Array();
