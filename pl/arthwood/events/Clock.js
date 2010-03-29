ArtJs.Clock = pl.arthwood.events.Clock = function(interval_, repeat_) {
  this._interval = interval_;
  this._repeat = repeat_;
  this._intervalId = null;
  this._counter = 0;
  this.onChange = new ArtJs.Event('Clock:onChange');
  
  var instances = arguments.callee.instances;

  this._id = instances.length;
  
  instances.push(this);
};

ArtJs.ObjectUtils.extend(ArtJs.Clock, {
  findById: function(id_) {
    this.found.id = id_;
  
    return ArtJs.ArrayUtils.detect(this.instances, this.found);
  },

  found: function(i) {
    return arguments.callee.id == i.getId();
  },

  fire: function(delegate_, delay_, repeat_) {
    var clock = new ArtJs.Clock(delegate_, delay_, repeat_);
  
    clock.trigger();
  
    return clock;
  }
});

ArtJs.Clock.prototype = {
  start: function(now_) {
    var code = 'Clock.findById(' + this._id + ').tick()';
    
    this.stop();
    this._intervalId = setInterval(code, this._interval);
  
    if (now_) {
      this.tick();
    }
  },

  tick: function() {
    this._counter++;
    this.onChange.fire(this);
  
    if (this._counter == this._repeat) {
      this.stop();
    }
  },

  stop: function() {
    clearInterval(this._intervalId);
    this._intervalId = null;
    this._counter = 0;
  },

  isRunning: function() {
    return !(this._intervalId == null);
  },

  getCounter: function() {
    return this._counter;
  },

  setRepeat: function(repeat_) {
    this._repeat = repeat_;
  },

  setInterval: function(interval_) {
    this._interval = interval_;
  },

  getId: function() {
    return this._id;
  },

  toString: function() {
    return "Clock#" + this._id;
  }
};

ArtJs.Clock.instances = new Array();
