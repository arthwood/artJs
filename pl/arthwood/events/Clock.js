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

ArtJs.Clock.findById = function(id_) {
  this.found.id = id_;
  
  return ArtJs.ArrayUtils.detect(this.instances, this.found);
};

ArtJs.Clock.found = function(i) {
  return arguments.callee.id == i.getId();
};

ArtJs.Clock.prototype.start = function(now_) {
  var code = 'Clock.findById(' + this._id + ')._onIntervalDelegate()';
  
  this.stop();
  this._intervalId = setInterval(code, this._interval);

  if (now_) {
    this.tick();
  }
};

ArtJs.Clock.prototype.tick = function() {
  this._counter++;
  this.onChange.fire(this);

  if (this._counter == this._repeat) {
    this.stop();
  }
};

ArtJs.Clock.prototype.stop = function() {
  clearInterval(this._intervalId);
  this._intervalId = null;
  this._counter = 0;
};

ArtJs.Clock.prototype.isRunning = function() {
  return !(this._intervalId == null);
};

ArtJs.Clock.prototype.getCounter = function() {
  return this._counter;
};

ArtJs.Clock.prototype.setRepeat = function(repeat_) {
  this._repeat = repeat_;
};

ArtJs.Clock.prototype.setInterval = function(interval_) {
  this._interval = interval_;
};

ArtJs.Clock.prototype.getId = function() {
  return this._id;
};

ArtJs.Clock.prototype.toString = function() {
  return "Clock#" + this._id;
};

ArtJs.Clock.fire = function(delegate_, delay_, repeat_) {
  var clock = new ArtJs.Clock(delegate_, delay_, repeat_);

  clock.trigger();

  return clock;
};

ArtJs.Clock.instances = new Array();
