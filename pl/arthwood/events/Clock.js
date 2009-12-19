var Clock = pl.arthwood.events.Clock = function(delegate_, interval_, repeat_) {
  this._interval = interval_;
  this._repeat = repeat_;
  this._intervalId = null;
  this._counter = 0;
  this._delegate = delegate_;
  this._onIntervalDelegate = $DC(this, this.onInterval);
  
  var instances = this.constructor.instances;

  this._id = instances.length;
  
  instances.push(this);
};

Clock.getClockById = function(id_) {
  this.found.id = id_;
  
  return ArrayUtils.detect(this.instances, this.found);
};

Clock.found = function(i) {
  return arguments.callee.id == i.getId();
};

Clock.prototype.start = function(now_) {
  var code = 'Clock.getClockById(' + this._id + ')._onIntervalDelegate()';
  
  this.stop();
  this._intervalId = setInterval(code, this._interval);

  if (now_) {
    this.onInterval();
  }
};

Clock.prototype.onInterval = function() {
  this._counter++;
  this._delegate();

  if (this._counter == this._repeat) {
    this.stop();
  }
};

Clock.prototype.stop = function() {
  clearInterval(this._intervalId);
  this._intervalId = null;
  this._counter = 0;
};

Clock.prototype.isRunning = function() {
  return !(this._intervalId == null);
};

Clock.prototype.getCounter = function() {
  return this._counter;
};

Clock.prototype.setDelegate = function(delegate_) {
  this._delegate = delegate_;
};

Clock.prototype.setRepeat = function(repeat_) {
  this._repeat = repeat_;
};

Clock.prototype.setInterval = function(interval_) {
  this._interval = interval_;
};

Clock.prototype.getId = function() {
  return this._id;
};

Clock.prototype.toString = function() {
  return "Clock#" + this._id;
};

Clock.fire = function(delegate_, delay_, repeat_) {
  var clock = new Clock(delegate_, delay_, repeat_);

  clock.trigger();

  return clock;
};

Clock.instances = new Array();